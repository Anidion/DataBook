// eslint-disable-next-line import/named
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";
import * as schema from "../../db/schema.js";

let db;

export const DbService = {
  getDb: () => db,
  createConnection: async () => {
    try {
      // We're hardcoding the connection details here since the DB is local
      // In a production environment, we would store this in a .env file
      const connection = await mysql.createConnection({
        host: "localhost",
        user: "databook",
        database: "db",
        password: "cpsc4711",
      });

      db = drizzle(connection, { schema, mode: "mysql" });
      await migrate(db, { migrationsFolder: "drizzle" });
      return db;
    } catch (err) {
      console.error(err);
      throw new Error("Error connecting to the database:", err);
    }
  },
};
