import { Router } from "express";
import { UserService } from "../services/user.js";
import { DbService } from "../services/db.js";
import { ErrorService } from "../services/error.js";
import * as schema from "../../db/schema.js";
import { eq, and, inArray, sql } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
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
    if (res.headersSent) {
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

router.get("/all", async (req, res) => {
  try {
    console.log("Received request at /genre/all");

    const db = DbService.getDb();
    const results = await db.select().from(schema.genre);

    res.status(200).json(results);
  } catch (err) {
    if (res.headersSent) {
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

router.put("/", async (req, res) => {
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
    if (res.headersSent) {
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

export const genreRouter = router;
