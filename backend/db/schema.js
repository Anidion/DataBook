import {
  mysqlTable,
  varchar,
  serial,
  boolean,
  datetime,
} from "drizzle-orm/mysql-core";

import { sql } from "drizzle-orm";

// DB Schema

const defaultTimestamps = {
  createdAt: datetime("createdAt").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updatedAt").default(
    sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
  ),
};

export const user = mysqlTable("user", {
  id: serial("id"),
  username: varchar("username", { length: 255 }),
  password: varchar("password", { length: 255 }),
  email: varchar("email", { length: 255 }),
  isAdmin: boolean("isAdmin"),
  ...defaultTimestamps,
});
