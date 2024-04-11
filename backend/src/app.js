import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import * as schema from "../db/schema.js";
import { AuthService } from "./services/auth.js";
import { DbService } from "./services/db.js";
import { UserService } from "./services/user.js";
import { ErrorService } from "./services/error.js";
import { desc, eq, and } from "drizzle-orm";

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

    const book = await db
      .select()
      .from(schema.book)
      .where(eq(schema.book.isbn, review.isbn));

    if (!book.length) {
      return res
        .status(400)
        .send(
          ErrorService.handleError(
            `Book with ISBN "${review.isbn}" doesn't exist in this library.`,
          ),
        );
    }

    await db.insert(schema.review).values({ user: user.id, ...review });

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

// Get reviews for a given book
app.get("/review", async (req, res) => {
  try {
    console.log("Received request at /review:", req.query);
    const { isbn } = req.query;
    if (!isbn) {
      return res.status(400).send("Missing required fields.");
    }

    const db = DbService.getDb();
    const reviews = await db
      .select({ review: schema.review })
      .from(schema.review)
      .innerJoin(
        schema.adminapproves,
        eq(schema.review.id, schema.adminapproves.review),
      )
      .where(
        and(
          eq(schema.review.isbn, isbn),
          eq(schema.adminapproves.approved, true),
        ),
      )
      .orderBy(desc(schema.review.createdAt));

    res.status(200).json(reviews);
  } catch (err) {
    if (res.closed) {
      return;
    }
    return res
      .status(err.status || 500)
      .send(
        ErrorService.handleError(
          err,
          "An error occurred while fetching reviews.",
        ),
      );
  }
});

app.delete("/review", async (req, res) => {
  try {
    console.log("Received delete request at /review:", req.query);
    const { id } = req.query;
    if (!id) {
      return res.status(400).send("Missing required fields.");
    }

    const user = await UserService.getUserIfAuthorized(req, res);

    const db = DbService.getDb();

    await db
      .delete(schema.review)
      .where(and(eq(schema.review.id, id), eq(schema.review.user, user.id)));

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
          "An error occurred while deleting a review.",
        ),
      );
  }
});

const port = 3001;

app.listen(port, () => {
  console.log(`DataBook backend listening at http://localhost:${port}`);
});
