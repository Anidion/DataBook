/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./db/schema.js",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    host: "localhost",
    user: "databook",
    database: "db",
    password: "cpsc471",
  },
};
