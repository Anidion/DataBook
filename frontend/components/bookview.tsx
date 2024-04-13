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
        <h1 className="mt-3 text-center text-5xl font-bold leading-10 text-foreground max-md:ml-2.5 max-md:text-4xl">
          {title}
        </h1>
        <p className="mt-2.5 justify-center text-center text-2xl leading-5 text-foreground-900 max-md:ml-2.5">
          {author}
        </p>
      </div>
      <div className="mt-2.5">
        <h4 className="text-sm">ISBN: {isbn}</h4>
        {genre && <h4>Genre: {genre}</h4>}
      </div>
      <div>
        <p className="md-5 mb-5 mt-5 w-full text-center text-sm leading-6 text-foreground max-md:mt-5 max-md:max-w-full">
          {description}
        </p>
      </div>
      <Button type="button" variant="solid" color="primary" className="mb-2">
        Reserve
      </Button>
      <br></br>
      <Button type="button" variant="ghost" color="primary">
        Save For Later
      </Button>
    </article>
  );
};

export default BookView;
