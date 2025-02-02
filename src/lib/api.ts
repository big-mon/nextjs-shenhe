import { Post } from "@/interfaces/post";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_post");

function getPostPaths() {
  return retrieveFiles(postsDirectory);
}

export function getPostByPath(path: string) {
  const fileContents = fs.readFileSync(path, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: data.slug, content } as Post;
}

export function getPostBySlug(slug: string) {
  const allPosts = getAllPosts();
  return allPosts.find((post) => post.slug === slug);
}

export function getAllPosts(): Post[] {
  const paths = getPostPaths();
  const posts = paths
    .map((slug) => getPostByPath(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

/**
 * 指定されたディレクトリ内のファイルパスを再帰的に取得する関数
 * @param directory - 検索対象のディレクトリパス
 * @returns ファイルパスの配列
 */
const retrieveFiles = (directory: string): string[] => {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const fullPath = path.resolve(directory, entry.name); // 相対パスを解決

    if (entry.isDirectory()) {
      return retrieveFiles(fullPath); // 再帰呼び出し
    } else {
      return fullPath; // ファイルパスを返す
    }
  });
};
