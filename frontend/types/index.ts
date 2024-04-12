import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Book = {
  isbn: number;
  title: string;
  author: string;
  publisher?: string;
};

export type StoredReview = {
  review: {
    id: number;
    isbn: number;
    rating: number;
    content: string;
  };
  book: Book;
  adminapproves: {
    approved: boolean;
  };
};
