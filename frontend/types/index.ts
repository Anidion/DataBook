import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Book = {
  isbn: number;
  title: string;
  author: string;
};
