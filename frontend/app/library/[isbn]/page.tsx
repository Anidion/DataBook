"use client";

import { Card, CardBody, Link, Spinner } from "@nextui-org/react";
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
      <Card
        className="mb-10 px-4 py-8 md:mx-auto md:w-[50%] md:py-10"
        radius="lg"
      >
        <CardBody>
          <Link href="/library" className="mb-5">
            ⬅️ Back to Library
          </Link>
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
            <Spinner />
          )}
        </CardBody>
      </Card>
    </>
  );
}
