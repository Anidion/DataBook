import { Router } from "express";
import { desc, eq } from "drizzle-orm";
import { UserService } from "../services/user.js";
import { DbService } from "../services/db.js";
import * as schema from "../../db/schema.js";
import { BookService } from "../services/book.js";
import { ErrorService } from "../services/error.js";

const router = Router();

router.get("/", async (req, res) => {
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

router.post("/", async (req, res) => {
  try {
    console.log("Received request at /reservation:", req.body, req.cookies);
    const user = await UserService.getUserIfAuthorized(req, res);
    console.log("user authed:", user);
    const { isbn } = req.body;

    if (!isbn) {
      return res.status(400).send("Missing required fields.");
    }

    const db = DbService.getDb();

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

    await db.insert(schema.reservation).values({
      user: user.id,
      isbn,
    });

    res.status(200).json({});
  } catch (err) {
    if (res.headersSent) {
      return;
    }
    return res
      .status(err.status || 500)
      .send(
        ErrorService.handleError(
          err,
          "An error occurred while creating a reservation.",
        ),
      );
  }
});

export const reservationRouter = router;
