"use client";

import { Button, Card, CardBody, Input, Spinner } from "@nextui-org/react";
import BookCard from "@/components/bookcard";
import { FormEvent, useState } from "react";
import { backend } from "@/services/axios";

export default function Home() {
  async function showBooks(event: FormEvent): Promise<void> {
    event.preventDefault();
    try {
      setIsLoading(true);
      const result = await backend.get("/book/search", {
        params: { search: query },
      });
      setResults(result.data);
      setHasSearched(true);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Card className="py-4 md:mx-auto md:w-[50%]" radius="lg">
        <CardBody>
          <div className="mx-auto w-full max-w-xl p-2">
            <h1 className="text-center text-2xl font-bold">Find a Book</h1>
            <form
              className="flex w-full"
              onSubmit={(event) => showBooks(event)}
            >
              <Input
                type="text"
                className="w-full p-4 text-gray-900 placeholder-gray-400"
                placeholder="Search for books by title, author, or genre"
                isDisabled={isLoading}
                onChange={(event) => setQuery(event.target.value)}
                endContent={
                  <Button
                    size="sm"
                    type="submit"
                    className="min-w-fit bg-transparent"
                  >
                    🔍
                  </Button>
                }
              />
            </form>
          </div>
        </CardBody>
      </Card>

      <div className="mt-5 flex flex-col items-center">
        {isLoading && <Spinner className="my-10" size="lg" />}

        {!!results?.length &&
          results.map((result: any) => (
            <BookCard
              key={result.book.isbn}
              title={result.book?.title}
              author={result.author?.name}
              coverImage={result.book?.coverUrl}
              isbn={result.book.isbn}
              book={result}
            />
          ))}
        {!results?.length && !isLoading && hasSearched && (
          <p>No results found for &apos;{query}&apos;</p>
        )}
      </div>
    </>
  );
}
