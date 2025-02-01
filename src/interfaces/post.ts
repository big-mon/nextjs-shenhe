import { type Author } from "./author";

export type Post = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  description: string;
  ogImage?: string;
  content: string;
  category: string;
  tags: string[];
  preview?: boolean;
};
