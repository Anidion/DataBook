import { Button, Image } from "@nextui-org/react";
import * as React from "react";

interface BookViewProps {
  isbn: string;
  genre: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
}

const BookView: React.FC<BookViewProps> = ({
  isbn,
  genre,
  title,
  author,
  description,
  coverImage,
}) => {
  return (
    <article className="align-center flex max-w-[502px] flex-col px-5">
      <div className="align-center justify-center max-md:max-w-full">
        <Image
          loading="lazy"
          src={coverImage}
          alt={`${title} book cover`}
          className="aspect-[0.67] w-[220px] max-w-full self-end"
        />
        <h1 className="mt-3 text-center text-5xl font-bold leading-10 text-white max-md:ml-2.5 max-md:text-4xl">
          {title}
        </h1>
        <p className="text-white-900 mt-2.5 justify-center text-center text-2xl leading-5 max-md:ml-2.5">
          {author}
        </p>
      </div>
      <div>
        <h4>ISBN: {isbn}</h4>
        <h4>Genre: {genre}</h4>
      </div>
      <div>
        <p className="md-5 mb-5 mt-5 w-full text-center text-sm leading-6 text-white max-md:mt-5 max-md:max-w-full">
          {description}
        </p>
      </div>
      <Button
        className={`max-w-[300px] items-center justify-center whitespace-nowrap rounded-xl bg-rose-600 px-4 py-3 text-base font-medium leading-6 text-black shadow-sm`}
      >
        Reserve
      </Button>
      <br></br>
      <Button
        className={`max-w-[300px] items-center justify-center whitespace-nowrap rounded-xl bg-white px-4 py-3 text-base font-medium leading-6 text-black shadow-sm`}
      >
        Save For Later
      </Button>
    </article>
  );
};

export default BookView;
