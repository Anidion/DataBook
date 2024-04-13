import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { DbService } from "./db.js";
import * as schema from "../../db/schema.js";
import { ErrorService } from "./error.js";

const { user } = schema;

const hashPassword = async (password) => await bcrypt.hash(password, 10);

export const AuthService = {
  signin: async (email, password) => {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }
      const db = DbService.getDb();

      const users = await db.select().from(user).where(eq(user.email, email));

      if (!users.length) {
        throw new Error("Invalid email or password.");
      }

      if (users.length > 1) {
        throw new Error("Multiple users found with that email.");
      }

      const passwordCorrect = await bcrypt.compare(password, users[0].password);

      if (!passwordCorrect) {
        throw new Error("Invalid email or password.");
      }

      console.log("Returning:", users[0]);
      return users[0];
    } catch (err) {
      return ErrorService.handleError(
        err,
        "An error occurred while signing in",
      );
    }
  },
  signup: async (email, password, username) => {
    try {
      if (!email || !password || !username) {
        throw new Error("Email, password, and username are required.");
      }
      const db = DbService.getDb();
      const existingUser = await db
        .select()
        .from(user)
        .where(eq(user.email, email));

      if (existingUser.length) {
        console.log("existingUser:", existingUser);
        throw new Error("That email is already registered.");
      }

      const hashedPassword = await hashPassword(password);
      await db.insert(schema.user).values({
        email: email,
        password: hashedPassword,
        username: username,
      });

      return AuthService.signin(email, password);
    } catch (err) {
      return ErrorService.handleError(
        err,
        "An error occurred while signing up",
      );
    }
  },
};
