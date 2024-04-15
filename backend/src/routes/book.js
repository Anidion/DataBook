import { Router } from "express";
import { DbService } from "../services/db.js";
import { ErrorService } from "../services/error.js";
import * as schema from "../../db/schema.js";
import { eq, or, like } from "drizzle-orm";

const router = Router();

router.get("/search", async (req, res) => {
  try {
    console.log("Received request at /search:", req.query);
    let { search } = req.query;

    const db = DbService.getDb();

    if (!search) {
      return res.status(400).send("Missing required fields.");
    }

    search = `%${search}%`;
    console.log("search:", search);
    const results = await db
      .select({ book: schema.book, author: schema.author, genre: schema.genre })
      .from(schema.book)
      .leftJoin(schema.writtenby, eq(schema.book.isbn, schema.writtenby.isbn))
      .leftJoin(schema.author, eq(schema.writtenby.author, schema.author.id))
      .leftJoin(
        schema.bookisgenre,
        eq(schema.book.isbn, schema.bookisgenre.isbn),
      )
      .leftJoin(schema.genre, eq(schema.bookisgenre.genre, schema.genre.id))
      .where(
        or(
          like(schema.book.title, search),
          like(schema.author.name, search),
          like(schema.book.isbn, search),
          like(schema.genre.name, search),
        ),
      );

    if (!results || !results.length) {
      return res.status(200).json([]);
    }

    const booksWithGenres = results.map((result) => {
      console.log("book:", result);
      console.log(
        "this results genres:",
        results
          .filter((r) => r.book.isbn === result.book.isbn)
          .map((r) => r.genre),
      );
      const bookWithGenre = {
        ...result,
        genres: results
          .filter((r) => r.book.isbn === result.book.isbn)
          .map((r) => r.genre),
      };
      delete bookWithGenre.genre;
      console.log("bookWithGenre:", bookWithGenre);
      return bookWithGenre;
    });

    // Deduplicate books
    const seen = new Set();

    const booksWithGenresDeduped = booksWithGenres.filter((book) => {
      const duplicate = seen.has(book.book.isbn);
      seen.add(book.book.isbn);
      return !duplicate;
    });

    res.status(200).json(booksWithGenresDeduped);
  } catch (err) {
    if (res.headersSent) {
      return;
    }
    return res
      .status(err.status || 500)
      .send(
        ErrorService.handleError(
          err,
          "An error occurred while fetching books.",
        ),
      );
  }
});

router.get("/", async (req, res) => {
  try {
    console.log("Received request at /book:", req.query);
    let { isbn } = req.query;

    const db = DbService.getDb();

    if (!isbn) {
      return res.status(400).send("Missing required fields.");
    }

    const book = await db
      .select({ book: schema.book, author: schema.author, genre: schema.genre })
      .from(schema.book)
      .leftJoin(schema.writtenby, eq(schema.book.isbn, schema.writtenby.isbn))
      .leftJoin(schema.author, eq(schema.writtenby.author, schema.author.id))
      .leftJoin(
        schema.bookisgenre,
        eq(schema.book.isbn, schema.bookisgenre.isbn),
      )
      .leftJoin(schema.genre, eq(schema.bookisgenre.genre, schema.genre.id))
      .where(eq(schema.book.isbn, isbn));

    if (!book || !book.length) {
      return res
        .status(400)
        .send(
          ErrorService.handleError(`"${isbn}" doesn't exist in this library.`),
        );
    }

    const bookWithGenres = {
      ...book[0],
      genres: book.map((b) => b.genre),
    };
    delete bookWithGenres.genre;

    res.status(200).json(bookWithGenres);
  } catch (err) {
    if (res.headersSent) {
      return;
    }
    return res
      .status(err.status || 500)
      .send(
        ErrorService.handleError(
          err,
          "An error occurred while fetching books.",
        ),
      );
  }
});

export const bookRouter = router;
