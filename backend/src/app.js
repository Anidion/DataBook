import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import * as schema from "../db/schema.js";
import { AuthService } from "./services/auth.js";
import { DbService } from "./services/db.js";
import { UserService } from "./services/user.js";
import { ErrorService } from "./services/error.js";

import { desc, eq, lt, or, like, and, isNull, inArray, sql } from "drizzle-orm";

import { BookService } from "./services/book.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log("Received request:", req.method, req.url);
  const err = new Error("Not Found");
  err.status = 404;
  next();
});

// Connect to the database
DbService.createConnection();

// Define routes

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
  console.log("Received request at /auth/signup:", req.body);
  const params = req?.body?.params;
  if (!params) {
    res.status(400);
    res.send("No parameters provided.");
    return;
  }
  const { email, password, username } = params;
  const result = await AuthService.signup(email, password, username);
  if (result?.error) {
    res.status(401);
  }
  console.log("Returning:", result);
  res.send(result);
});

app.post("/review", async (req, res) => {
  try {
    console.log("Received request at /review:", req.body, req.cookies);
    const user = await UserService.getUserIfAuthorized(req, res);
    console.log("user authed:", user);
    const { review } = req.body;

    if (!review.isbn || !review.rating || !review.content) {
      return res.status(400).send("Missing required fields.");
    }

    const db = DbService.getDb();

    const book = await BookService.getBookIfExists(review.isbn);

    if (!book) {
      return res
        .status(400)
        .send(
          ErrorService.handleError(
            `Book with ISBN "${review.isbn}" doesn't exist in this library.`,
          ),
        );
    }

    await db.insert(schema.review).values({ user: user.id, ...review });

    res.status(200).json({});
  } catch (err) {
    if (res.closed) {
      return;
    }
    return res
      .status(err.status || 500)
      .send(
        ErrorService.handleError(
          err,
          "An error occurred while creating a review.",
        ),
      );
  }
});

// Get reviews for a given book or a given user
app.get("/review", async (req, res) => {
  try {
    console.log("Received request at /review:", req.query);
    const { isbn } = req.query;

    const db = DbService.getDb();

    // If no ISBN is provided, return all reviews from the logged-in user
    if (!isbn) {
      const user = await UserService.getUserIfAuthorized(req, res);
      const reviews = await db
        .select()
        .from(schema.review)
        .innerJoin(schema.book, eq(schema.review.isbn, schema.book.isbn))
        .leftJoin(schema.writtenby, eq(schema.book.isbn, schema.writtenby.isbn))
        .leftJoin(schema.author, eq(schema.writtenby.author, schema.author.id))
        .leftJoin(
          schema.adminapproves,
          eq(schema.review.id, schema.adminapproves.review),
        )
        .where(eq(schema.review.user, user.id))
        .orderBy(desc(schema.review.createdAt));
      console.log("Returning reviews:", reviews);
      return res.status(200).json(reviews);
    }

    const book = await BookService.getBookIfExists(isbn);

    if (!book) {
      return res
        .status(400)
        .send(
          ErrorService.handleError(
            `Book with ISBN "${isbn}" doesn't exist in this library.`,
          ),
        );
    }

    const reviews = await db
      .select({ review: schema.review })
      .from(schema.review)
      .innerJoin(
        schema.adminapproves,
        eq(schema.review.id, schema.adminapproves.review),
      )
      .where(
        and(
          eq(schema.review.isbn, isbn),
          eq(schema.adminapproves.approved, true),
        ),
      )
      .orderBy(desc(schema.review.createdAt));

    res.status(200).json(reviews);
  } catch (err) {
    if (res.closed) {
      return;
    }
    return res
      .status(err.status || 500)
      .send(
        ErrorService.handleError(
          err,
          "An error occurred while fetching reviews.",
        ),
      );
  }
});

app.delete("/review", async (req, res) => {
  try {
    console.log("Received delete request at /review:", req.query);
    const { id } = req.query;
    if (!id) {
      return res.status(400).send("Missing required fields.");
    }

    const user = await UserService.getUserIfAuthorized(req, res);

    const db = DbService.getDb();

    await db
      .delete(schema.review)
      .where(and(eq(schema.review.id, id), eq(schema.review.user, user.id)));

    res.status(200).json({});
  } catch (err) {
    if (res.closed) {
      return;
    }
    return res
      .status(err.status || 500)
      .send(
        ErrorService.handleError(
          err,
          "An error occurred while deleting a review.",
        ),
      );
  }
});

app.get("/reservation", async (req, res) => {
  try {
    console.log("Received request at /reservation:", req.query);
    const user = await UserService.getUserIfAuthorized(req, res);
    console.log("user authed:", user);
    const db = DbService.getDb();
    const result = await db
      .select()
      .from(schema.reservation)
      .innerJoin(schema.book, eq(schema.book.isbn, schema.reservation.isbn))
      .leftJoin(schema.writtenby, eq(schema.book.isbn, schema.writtenby.isbn))
      .leftJoin(schema.author, eq(schema.writtenby.author, schema.author.id))
      .where(eq(schema.reservation.user, user.id))
      .orderBy(desc(schema.reservation.createdAt));
    console.log("Returning:", result);
    res.send(result);
  } catch (err) {
    console.error("Error fetching reservations:", err);
    res.status(err);
  }
});

app.get("/reservation/past", async (req, res) => {
  try {
    const user = await UserService.getUserIfAuthorized(req, res);
    const db = DbService.getDb();
    // const today = new Date().toISOString();

    const pastReservations = await db
      .select()
      .from(schema.transaction)
      .innerJoin(schema.book, eq(schema.book.isbn, schema.transaction.isbn))
      .leftJoin(schema.writtenby, eq(schema.book.isbn, schema.writtenby.isbn))
      .leftJoin(schema.author, eq(schema.writtenby.author, schema.author.id))
      .where(
        and(
          eq(schema.transaction.user, user.id),
          lt(schema.transaction.enddate, new Date()), // Ensure endDate is before today
        ),
      )
      .orderBy(desc(schema.transaction.enddate));

    res.status(200).json(pastReservations);
  } catch (err) {
    console.error("Error fetching past reservations:", err);
    res.status(err.status || 500).send({
      error: "An error occurred while fetching past reservations.",
    });
  }
});

// Approve or reject a review
app.put("/admin/review", async (req, res) => {
  try {
    console.log("Received moderation request at /admin/review:", req.query);
    const user = await UserService.getUserIfAuthorized(req, res);

    if (!user.isAdmin) {
      return res.status(401).send("User is not an admin.");
    }

    const { reviewId, approved } = req.query;
    if (!Number(reviewId) || (approved !== "true" && approved !== "false")) {
      return res.status(400).send("Missing required fields.");
    }

    const db = DbService.getDb();
    await db.insert(schema.adminapproves).values({
      admin: user.id,
      review: Number(reviewId),
      approved: approved === "true" ? 1 : 0,
    });

    return res.status(200).json({});
  } catch (err) {
    if (res.closed) {
      return;
    }
    return res
      .status(err.status || 500)
      .send(
        ErrorService.handleError(
          err,
          "An error occurred while approving a review.",
        ),
      );
  }
});

// Get all non-approved reviews
app.get("/admin/review", async (req, res) => {
  try {
    console.log("Received request at /admin/review:", req.query);
    const user = await UserService.getUserIfAuthorized(req, res);

    if (!user.isAdmin) {
      return res.status(401).send("User is not an admin.");
    }

    const db = DbService.getDb();

    const reviews = await db
      .select({
        review: schema.review,
        book: schema.book,
        author: schema.author,
      })
      .from(schema.review)
      .innerJoin(schema.book, eq(schema.review.isbn, schema.book.isbn))
      .leftJoin(schema.writtenby, eq(schema.book.isbn, schema.writtenby.isbn))
      .leftJoin(schema.author, eq(schema.writtenby.author, schema.author.id))
      .leftJoin(
        schema.adminapproves,
        eq(schema.review.id, schema.adminapproves.review),
      )
      .where(isNull(schema.adminapproves.approved))
      .orderBy(desc(schema.review.createdAt));

    res.status(200).json(reviews);
  } catch (err) {
    if (res.closed) {
      return;
    }
    return res
      .status(err.status || 500)
      .send(
        ErrorService.handleError(
          err,
          "An error occurred while fetching reviews.",
        ),
      );
  }
});

app.get("/library", async (req, res) => {
  try {
    console.log("Received request at /library:", req.query);
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
    if (res.closed) {
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

app.get("/book", async (req, res) => {
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
    if (res.closed) {
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

// Get genres user likes
app.get("/genre", async (req, res) => {
  try {
    console.log("Received request at /genre:", req.query);
    const user = await UserService.getUserIfAuthorized(req, res);

    const db = DbService.getDb();
    const results = await db
      .select({ genre: schema.genre })
      .from(schema.userlikes)
      .innerJoin(schema.genre, eq(schema.userlikes.genre, schema.genre.id))
      .where(eq(schema.userlikes.user, user.id));

    res.status(200).json(results);
  } catch (err) {
    if (res.closed) {
      return;
    }
    return res
      .status(err.status || 500)
      .send(
        ErrorService.handleError(
          err,
          "An error occurred while fetching genres.",
        ),
      );
  }
});

app.get("/genre/all", async (req, res) => {
  try {
    console.log("Received request at /genre/all");

    const db = DbService.getDb();
    const results = await db.select().from(schema.genre);

    res.status(200).json(results);
  } catch (err) {
    if (res.closed) {
      return;
    }
    return res
      .status(err.status || 500)
      .send(
        ErrorService.handleError(
          err,
          "An error occurred while fetching genres.",
        ),
      );
  }
});

app.put("/genre", async (req, res) => {
  try {
    console.log("Received request at /genre:", req.body);
    const user = await UserService.getUserIfAuthorized(req, res);
    const { genres } = req.body;

    if (!genres) {
      return res.status(400).send("Missing required fields.");
    }

    const db = DbService.getDb();

    const genreIdsToDelete = Object.entries(genres)
      .filter(([id, selected]) => selected === false && id)
      .map(([id]) => Number(id));

    const genreIdsToInsert = Object.entries(genres)
      .filter(([id, selected]) => selected === true && id)
      .map(([id]) => Number(id));

    console.log("genreIdsToDelete:", genreIdsToDelete);
    console.log("genreIdsToInsert:", genreIdsToInsert);

    if (genreIdsToDelete.length) {
      await db
        .delete(schema.userlikes)
        .where(
          and(
            eq(schema.userlikes.user, user.id),
            inArray(schema.userlikes.genre, genreIdsToDelete),
          ),
        );
    }

    if (genreIdsToInsert.length) {
      await db
        .insert(schema.userlikes)
        .values(
          genreIdsToInsert.map((genreId) => ({
            user: user.id,
            genre: genreId,
          })),
        )
        .onDuplicateKeyUpdate({ set: { user: sql`user` } }); // If the user already likes a genre, do nothing
    }

    // Return updated list of likes
    const results = await db
      .select({ genre: schema.genre })
      .from(schema.userlikes)
      .innerJoin(schema.genre, eq(schema.userlikes.genre, schema.genre.id))
      .where(eq(schema.userlikes.user, user.id));

    res.status(200).json(results);
  } catch (err) {
    if (res.closed) {
      return;
    }
    return res
      .status(err.status || 500)
      .send(
        ErrorService.handleError(
          err,
          "An error occurred while updating genres.",
        ),
      );
  }
});

const port = 3001;

app.listen(port, () => {
  console.log(`DataBook backend listening at http://localhost:${port}`);
});
