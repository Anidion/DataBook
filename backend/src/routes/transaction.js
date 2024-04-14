import { Router } from "express";
import { and, desc, eq, gte, lt } from "drizzle-orm";
import { UserService } from "../services/user.js";
import { DbService } from "../services/db.js";
import * as schema from "../../db/schema.js";
import { BookService } from "../services/book.js";
import { ErrorService } from "../services/error.js";

const router = Router();

router.get("/current", async (req, res) => {
  try {
    const user = await UserService.getUserIfAuthorized(req, res);
    const db = DbService.getDb();

    const currentTransactions = await db
      .select()
      .from(schema.transaction)
      .innerJoin(schema.book, eq(schema.book.isbn, schema.transaction.isbn))
      .leftJoin(schema.writtenby, eq(schema.book.isbn, schema.writtenby.isbn))
      .leftJoin(schema.author, eq(schema.writtenby.author, schema.author.id))
      .where(
        and(
          eq(schema.transaction.user, user.id),
          gte(schema.transaction.enddate, new Date()), // Ensure endDate is NOT before today
        ),
      )
      .orderBy(desc(schema.transaction.enddate));

    res.status(200).json(currentTransactions);
  } catch (err) {
    console.error("Error fetching past transactions:", err);
    res.status(err.status || 500).send({
      error: "An error occurred while fetching current transactions.",
    });
  }
});

router.get("/past", async (req, res) => {
  try {
    const user = await UserService.getUserIfAuthorized(req, res);
    const db = DbService.getDb();

    const pastTransactions = await db
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

    res.status(200).json(pastTransactions);
  } catch (err) {
    console.error("Error fetching past transaction:", err);
    res.status(err.status || 500).send({
      error: "An error occurred while fetching past transactions.",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("Received request at /transaction:", req.body, req.cookies);
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

    const startdate = new Date();
    // Set end date to 14 days from now for 2-week loans
    const enddate = new Date(new Date().setDate(startdate.getDate() + 14));

    await db.insert(schema.transaction).values({
      user: user.id,
      isbn,
      startdate,
      enddate,
    });

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
          "An error occurred while creating a transaction.",
        ),
      );
  }
});

export const transactionRouter = router;
