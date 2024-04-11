import * as React from "react";

interface BookDetailsProps {
  isbn: string;
  genre: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
}

const BookDetails: React.FC<BookDetailsProps> = ({
  isbn,
  genre,
  title,
  author,
  description,
  coverImage,
}) => {
  return (
    <article className="flex max-w-[502px] flex-col px-5">
      <div className="w-full max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex w-[19%] flex-col max-md:ml-0 max-md:w-full">
            <div className="mt-96 flex flex-col text-2xl leading-5 text-black max-md:mt-10">
              <div>ISBN: </div>
              <div className="mt-6">Genre:</div>
            </div>
          </div>
          <div className="ml-5 flex w-[81%] flex-col max-md:ml-0 max-md:w-full">
            <div className="flex grow flex-col max-md:mt-7">
              <div className="flex flex-col items-start pl-20 max-md:pl-5">
                <img
                  loading="lazy"
                  src={coverImage}
                  alt={`${title} book cover`}
                  className="aspect-[0.67] w-[220px] max-w-full self-end"
                />
                <h1 className="mt-3 text-center text-5xl font-bold leading-10 text-black max-md:ml-2.5 max-md:text-4xl">
                  {title}
                </h1>
                <p className="mt-2.5 justify-center text-2xl leading-5 text-zinc-900 max-md:ml-2.5">
                  {author}
                </p>
              </div>
              <div className="mt-9 text-2xl leading-5 text-black">{isbn}</div>
              <div className="mt-6 flex gap-0 text-sm leading-5 text-zinc-900">
                <div className="justify-center">{genre}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-16 w-full text-center text-sm leading-6 text-black max-md:mt-10 max-md:max-w-full">
        {description}
      </p>
    </article>
  );
};
