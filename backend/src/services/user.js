import * as schema from "../../db/schema.js";
import { unsealData } from "iron-session";
import { DbService } from "./db.js";
import { and, eq } from "drizzle-orm";
import { ErrorService } from "./error.js";

export const UserService = {
  getUserIfAuthorized: async (req, res) => {
    if (!req.cookies?.session) {
      return res.status(401).send(ErrorService.handleError("Not logged in"));
    }

    const userFromCookie = await UserService.getUserFromCookie(
      req.cookies?.session,
    );

    if (!userFromCookie) {
      return res
        .status(401)
        .send(ErrorService.handleError("Invalid login session"));
    }

    console.log("userFromCookie:", userFromCookie);

    const db = DbService.getDb();

    const userFromDb = await db
      .select({ id: schema.user.id })
      .from(schema.user)
      .where(
        and(
          eq(schema.user.email, userFromCookie.email),
          eq(schema.user.username, userFromCookie.username),
        ),
      )
      .limit(1);

    console.log("userFromDb:", userFromDb);

    if (!userFromDb || !userFromDb.length) {
      res.status(401).send(ErrorService.handleError("User does not exist"));
    }

    return userFromDb;
  },
  getUserFromCookie: async (cookie) =>
    await unsealData(cookie, {
      password: "complex_password_at_least_32_characters_long",
    }),
};
