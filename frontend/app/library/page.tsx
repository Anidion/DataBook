"use client";

import { Button, ButtonGroup, Card, CardBody, Input } from "@nextui-org/react";
import BookCard from "@/components/bookcard";
import SearchBar from "@/components/searchbar";
import BookView from "@/components/bookview";
import { FormEvent, useState } from "react";
import { backend } from "@/services/axios";

export default function Home() {
  async function showBooks(event: FormEvent): Promise<void> {
    event.preventDefault();
    const result = await backend.get("/library", { params: { search: query } });
    setResults(result.data);
    setHasSearched(true);
  }

  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <Card
      className="my-auto px-4 py-8 md:mx-auto md:w-[50%] md:py-10"
      radius="lg"
    >
      <CardBody>
        <div className="mx-auto flex w-full max-w-xl p-2 text-xl">
          <form className="w-full" onSubmit={(event) => showBooks(event)}>
            <Input
              type="text"
              className="w-full p-4 text-gray-900 placeholder-gray-400"
              placeholder="Search"
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="submit" className="bg-white p-4">
              🔍
            </button>
          </form>
        </div>
        <ButtonGroup className="mb-10">
          <Button variant="solid" color="danger">
            Author
          </Button>
          <Button variant="solid" color="danger">
            Genre
          </Button>
          <Button variant="solid" color="danger">
            Title
          </Button>
        </ButtonGroup>
        {!!results?.length &&
          results.map((result: any, index) => (
            <div key={result.book.isbn}>
              <BookCard
                title={result.book?.title}
                author={result.author?.name}
                coverImage={result.book?.coverUrl}
                isbn={result.book.isbn}
                book={result}
              ></BookCard>
            </div>
          ))}
        {!results?.length && hasSearched && <p>No results found</p>}
      </CardBody>
    </Card>
  );
}
