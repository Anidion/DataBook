import express from "express";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";

import mysql from "mysql2/promise";

const app = express();
const port = 3001;

try {
  // We're hardcoding the connection details here since the DB is local
  // In a production environment, we would store this in a .env file
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "databook",
    database: "db",
    password: "cpsc471",
  });

  const db = drizzle(connection);
  await migrate(db, { migrationsFolder: "drizzle" });
} catch (err) {
  console.error("Error connecting to the database: ", err);
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`DataBook backend listening at http://localhost:${port}`);
});
