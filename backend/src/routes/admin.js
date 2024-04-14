import { Router } from "express";
import { UserService } from "../services/user.js";
import { DbService } from "../services/db.js";
import { ErrorService } from "../services/error.js";
import * as schema from "../../db/schema.js";
import { eq, desc, isNull } from "drizzle-orm";

const router = Router();

// Approve or reject a review
router.put("/review", async (req, res) => {
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
router.get("/review", async (req, res) => {
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

export const adminRouter = router;
