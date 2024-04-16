import { Router } from "express";
import { UserService } from "../services/user.js";
import { DbService } from "../services/db.js";
import { BookService } from "../services/book.js";
import { ErrorService } from "../services/error.js";
import * as schema from "../../db/schema.js";
import { eq, desc, and } from "drizzle-orm";

const router = Router();

router.post("/", async (req, res) => {
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
    if (res.headersSent) {
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
router.get("/", async (req, res) => {
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
    if (res.headersSent) {
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

router.delete("/", async (req, res) => {
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
    if (res.headersSent) {
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

export const reviewRouter = router;
