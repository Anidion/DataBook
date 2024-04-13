import { Image } from "@nextui-org/react";
import * as React from "react";

interface BookProps {
  title: string;
  author: string;
  coverImage: string;
}

const BookCard: React.FC<BookProps> = ({ title, author, coverImage }) => {
  return (
    <article className="margin:20px max-w-[550px] rounded-2xl bg-zinc-300 px-5 py-5 shadow-sm max-md:px-5">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex w-[33%] flex-col max-md:ml-0 max-md:w-full">
          <Image
            loading="lazy"
            src={coverImage}
            alt={title}
            className="mt-1.5 aspect-[0.75] w-[127px] max-w-full shrink-0 grow shadow-sm max-md:mt-10"
          />
        </div>
        <div className="ml-5 flex w-[67%] flex-col max-md:ml-0 max-md:w-full">
          <div className="flex flex-col text-base text-black max-md:mt-10">
            <h2 className="text-ellipsis text-center text-3xl leading-5">
              {title}
            </h2>
            <p>by {author}</p>
            <button className="mt-8 items-center justify-center whitespace-nowrap rounded-xl bg-rose-600 px-4 py-2 font-medium leading-[150%] text-black shadow-sm max-md:px-5">
              Reserve
            </button>
            <button className="mt-3 items-center justify-center rounded-xl bg-white px-4 py-2 font-medium leading-[150%] text-black shadow-sm max-md:px-5">
              For Later
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
export default BookCard;
