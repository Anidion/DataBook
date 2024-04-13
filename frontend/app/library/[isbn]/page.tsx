"use client";

import { Card, CardBody } from "@nextui-org/react";
import BookView from "@/components/bookview";
import { backend } from "@/services/axios";
import { useEffect, useState } from "react";

export default function Home({ isbn }: { isbn: string }) {
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await backend.get("/book", { params: { isbn: isbn } });
        setBook(response.data);
      } catch (error) {
        console.error("Failed to fetch book:", error);
      }
    };

    fetchBook();
  }, [isbn]);

  return (
    <>
      <a href="javascript:history.go(-1)">
        <button type="button">Back to Library</button>
      </a>
      <Card
        className="my-auto px-4 py-8 md:mx-auto md:w-[50%] md:py-10"
        radius="lg"
      >
        <CardBody>
          {book ? (
            <BookView
              isbn={isbn}
              genre={book.genre}
              title={book.title}
              author={book.author}
              description={book.description}
              coverImage={book.coverImage || "/img/library.jpg"}
            />
          ) : (
            <p>Loading book...</p>
          )}
        </CardBody>
      </Card>
    </>
  );
}
