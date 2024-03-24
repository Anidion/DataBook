import express from 'express';
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const app = express();
const port = 3001;


try {
    const connection = await mysql.createConnection({
        host: "host",
        user: "user",
        database: "database",
        // Placeholder, fill this out later
    });

    const db = drizzle(connection);
} catch (err) {
    console.error("Error connecting to the database: ", err);
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`DataBook backend listening at http://localhost:${port}`);
});

