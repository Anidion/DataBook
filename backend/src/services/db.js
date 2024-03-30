import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "../../db/schema.js";

let db;

const DbService = {
  getDb: () => db,
  createConnection: async () => {
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
      return db;
    } catch (err) {
      console.error("Error connecting to the database: ", err);
      process.exit(1);
    }
  },
};

export default DbService;
