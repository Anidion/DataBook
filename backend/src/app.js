import express from "express";
import cors from "cors";

import * as schema from "../db/schema.js";
import AuthService from "./services/auth.js";
import DbService from "./services/db.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Connect to the database
const db = await DbService.createConnection();

// Define routes
app.get("/", async (req, res) => {
  console.log("Received request at /:", req.query);
  const result = await db.select().from(schema.user);
  console.log("Returning:", result);
  res.send(result);
});

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
  console.log("Received request at /auth/signup:", req.query);
  const { email, password, username } = req.query;
  const result = await AuthService.signup(email, password, username);
  if (result?.error) {
    res.status(401);
  }
  console.log("Returning:", result);
  res.send(result);
});

const port = 3001;

app.listen(port, () => {
  console.log(`DataBook backend listening at http://localhost:${port}`);
});
