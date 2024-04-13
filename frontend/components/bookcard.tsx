import { Button, Image } from "@nextui-org/react";
import Link from "next/link";
import * as React from "react";

interface BookProps {
  title: string;
  author: string;
  coverImage: string;
  isbn: string;
  book: any;
}

const BookCard: React.FC<BookProps> = ({
  title,
  author,
  coverImage,
  isbn,
  book,
}) => {
  return (
    <article className="margin:20px mb-10 w-full max-w-[550px] rounded-2xl bg-slate-300 px-5 py-5 shadow-md max-md:px-5">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex w-[33%] flex-col items-center max-md:ml-0 max-md:w-full">
          <Image
            loading="lazy"
            src={coverImage}
            alt={title}
            className="mt-1.5 aspect-[0.75] w-[127px] max-w-full shrink-0 grow shadow-sm max-md:mt-10"
          />
        </div>
        <div className="ml-5 flex w-[67%] flex-col max-md:ml-0 max-md:w-full">
          <div className="flex flex-col text-base text-black max-md:mt-10">
            <Link
              href={`/library/${isbn}`}
              className="mt-3 text-center text-2xl font-bold leading-5 text-foreground max-md:ml-2.5 max-md:text-3xl"
            >
              {title}
            </Link>
            <p className="my-2">by {author}</p>
            <Button
              type="button"
              variant="solid"
              color="primary"
              className="mb-2"
            >
              Reserve
            </Button>
            <br></br>
            <Button type="button" variant="ghost" color="primary">
              Save For Later
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};
export default BookCard;
