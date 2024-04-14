import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { DbService } from "./services/db.js";

import { transactionRouter } from "./routes/transaction.js";
import { authRouter } from "./routes/auth.js";
import { reviewRouter } from "./routes/review.js";
import { reservationRouter } from "./routes/reservation.js";
import { adminRouter } from "./routes/admin.js";
import { bookRouter } from "./routes/book.js";
import { genreRouter } from "./routes/genre.js";

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
app.use("/auth", authRouter);
app.use("/review", reviewRouter);
app.use("/reservation", reservationRouter);
app.use("/transaction", transactionRouter);
app.use("/admin", adminRouter);
app.use("/book", bookRouter);
app.use("/genre", genreRouter);

const port = 3001;

app.listen(port, () => {
  console.log(`DataBook backend listening at http://localhost:${port}`);
});
