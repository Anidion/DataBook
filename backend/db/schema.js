import {
  mysqlTable,
  varchar,
  serial,
  boolean,
  datetime,
  bigint,
  text,
  primaryKey,
} from "drizzle-orm/mysql-core";

import { sql } from "drizzle-orm";

// DB Schema

const timestamps = {
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
  ...timestamps,
});

export const book = mysqlTable("book", {
  isbn: varchar("isbn", { length: 13 }).primaryKey(),
  title: varchar("title", { length: 255 }),
  coverUrl: varchar("coverUrl", { length: 1024 }),
  description: varchar("description", { length: 1024 }),
  quantity: bigint("quantity", { mode: "number", unsigned: true }),
  publisher: bigint("publisher", {
    mode: "number",
    unsigned: true,
  }).references(() => publisher.id),
  ...timestamps,
});

export const author = mysqlTable("author", {
  id: serial("id"),
  name: varchar("name", { length: 255 }),
  bio: text("bio"),
  ...timestamps,
});

export const writtenby = mysqlTable(
  "writtenby",
  {
    isbn: varchar("isbn", { length: 13 }).references(() => book.isbn),
    author: bigint("author", { mode: "number", unsigned: true }).references(
      () => author.id,
    ),
    ...timestamps,
  },
  // We need to do this to specify composite primary keys
  (table) => ({
    pk: primaryKey({ columns: [table.isbn, table.author] }),
  }),
);

export const publisher = mysqlTable("publisher", {
  id: serial("id"),
  name: varchar("name", { length: 255 }),
  yearFounded: bigint("yearFounded", { mode: "number", unsigned: true }),
  location: varchar("location", { length: 255 }),
  ...timestamps,
});

export const genre = mysqlTable("genre", {
  id: serial("id"),
  name: varchar("name", { length: 255 }),
  ...timestamps,
});

export const bookisgenre = mysqlTable(
  "bookisgenre",
  {
    isbn: varchar("isbn", { length: 13 }).references(() => book.isbn),
    genre: bigint("genre", { mode: "number", unsigned: true }).references(
      () => genre.id,
    ),
    ...timestamps,
  },
  (table) => ({
    pk: primaryKey({ columns: [table.isbn, table.genre] }),
  }),
);

export const userlikes = mysqlTable(
  "userlikes",
  {
    user: bigint("user", { mode: "number", unsigned: true }).references(
      () => user.id,
    ),
    genre: bigint("genre", { mode: "number", unsigned: true }).references(
      () => genre.id,
    ),
    ...timestamps,
  },
  (table) => ({
    pk: primaryKey({ columns: [table.user, table.genre] }),
  }),
);

export const review = mysqlTable("review", {
  id: serial("id"),
  user: bigint("user", { mode: "number", unsigned: true }).references(
    () => user.id,
  ),
  isbn: varchar("isbn", { length: 13 }).references(() => book.isbn),
  rating: bigint("rating", { mode: "number", unsigned: true }),
  content: text("content"),
  ...timestamps,
});

export const adminapproves = mysqlTable(
  "adminapproves",
  {
    admin: bigint("admin", { mode: "number", unsigned: true }).references(
      () => user.id,
    ),
    review: bigint("review", { mode: "number", unsigned: true }).references(
      () => review.id,
    ),
    approved: boolean("approved"),
    ...timestamps,
  },
  (table) => ({
    pk: primaryKey({ columns: [table.admin, table.review] }),
  }),
);

export const transaction = mysqlTable(
  "transaction",
  {
    id: serial("id"),
    user: bigint("user", { mode: "number", unsigned: true }).references(
      () => user.id,
    ),
    isbn: varchar("isbn", { length: 13 }).references(() => book.isbn),
    startdate: datetime("startdate"),
    enddate: datetime("enddate"),
    ...timestamps,
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id, table.user, table.isbn] }),
  }),
);

export const reservation = mysqlTable(
  "reservation",
  {
    id: serial("id"),
    user: bigint("user", { mode: "number", unsigned: true }).references(
      () => user.id,
    ),
    isbn: varchar("isbn", { length: 13 }).references(() => book.isbn),
    startdate: datetime("startdate"),
    ...timestamps,
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id, table.user, table.isbn] }),
  }),
);
