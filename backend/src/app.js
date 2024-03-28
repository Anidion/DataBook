import express from "express";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

import * as schema from "../db/schema.js";

const app = express();
const port = 3001;

let db;

try {
  // We're hardcoding the connection details here since the DB is local
  // In a production environment, we would store this in a .env file
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "databook",
    database: "db",
    password: "cpsc471",
  });

  db = drizzle(connection, { schema, mode: "mysql" });
} catch (err) {
  console.error("Error connecting to the database: ", err);
  process.exit(1);
}

app.get("/", async (req, res) => {
  const result = await db.select().from(schema.user);

  res.send(result);
});

app.listen(port, () => {
  console.log(`DataBook backend listening at http://localhost:${port}`);
});
