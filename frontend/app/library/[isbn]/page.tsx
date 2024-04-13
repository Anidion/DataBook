"use client";

import { Card, CardBody } from "@nextui-org/react";
import BookView from "@/components/bookview";
import { backend } from "@/services/axios";
import { useEffect, useState } from "react";

export default function Home({
  params: { isbn },
}: {
  params: { isbn: string };
}) {
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await backend.get("/book", { params: { isbn: isbn } });
        setBook(response.data[0]);
      } catch (error) {
        console.error("Failed to fetch book:", error);
      }
    };

    fetchBook();
  }, [isbn]);

  return (
    <>
      <a href="/library">
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
              genre={book.genre?.name}
              title={book.book?.title}
              author={book.author?.name}
              description={book.book?.description}
              coverImage={book.book?.coverUrl || "/img/library.jpg"}
            />
          ) : (
            <p>Loading book...</p>
          )}
        </CardBody>
      </Card>
    </>
  );
}
