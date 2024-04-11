import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import * as schema from "../db/schema.js";
import { AuthService } from "./services/auth.js";
import { DbService } from "./services/db.js";
import { UserService } from "./services/user.js";
import { ErrorService } from "./services/error.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log("Received request:", req.method, req.url);
  const err = new Error("Not Found");
  err.status = 404;
  next();
});

// Connect to the database
DbService.createConnection();

// Define routes

app.get("/auth/signin", async (req, res) => {
  console.log("Received request at /auth/signin:", req.query);
  const { email, password } = req.query;
  const result = await AuthService.signin(email, password);
  if (result?.error) {
    res.status(401);
  }
  console.log("Returning:", result);
  res.send(result);
});

app.post("/auth/signup", async (req, res) => {
  console.log("Received request at /auth/signup:", req.body);
  const params = req?.body?.params;
  if (!params) {
    res.status(400);
    res.send("No parameters provided.");
    return;
  }
  const { email, password, username } = params;
  const result = await AuthService.signup(email, password, username);
  if (result?.error) {
    res.status(401);
  }
  console.log("Returning:", result);
  res.send(result);
});

app.post("/review", async (req, res) => {
  try {
    console.log("Received request at /review:", req.body, req.cookies);
    const user = await UserService.getUserIfAuthorized(req, res);
    console.log("user authed:", user);
    const { review } = req.body;

    if (!review.isbn || !review.rating || !review.content) {
      return res.status(400).send("Missing required fields.");
    }

    const db = DbService.getDb();

    await db
      .insert(schema.review)
      .values({ user: user.id, ...review });

    res.status(200).json({});
  } catch (err) {
    if (res.closed) {
      return;
    }
    return res
      .status(err.status || 500)
      .send(
        ErrorService.handleError(
          err,
          "An error occurred while creating a review.",
        ),
      );
  }
});

// app.get("/review", async (req, res) => {});

// app.put("/review", async (req, res) => {});

// app.delete("/review", async (req, res) => {});

const port = 3001;

app.listen(port, () => {
  console.log(`DataBook backend listening at http://localhost:${port}`);
});
