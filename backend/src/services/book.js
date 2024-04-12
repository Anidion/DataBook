import * as schema from "../../db/schema.js";
import { DbService } from "./db.js";
import { eq } from "drizzle-orm";

export const BookService = {
  getBookIfExists: async (isbn) => {
    const db = DbService.getDb();

    const book = await db
      .select()
      .from(schema.book)
      .where(eq(schema.book.isbn, isbn));

    return book[0] || null;
  },
};
