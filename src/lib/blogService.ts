import { Post } from "@interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join, resolve } from "path";

// ブログ記事のディレクトリパス
const postsDirectory = join(process.cwd(), "_posts");

/**
 * 指定されたディレクトリ内のファイルパスを再帰的に取得する関数
 * @param directory - 検索対象のディレクトリパス
 * @returns ファイルパスの配列
 */
const retrieveFiles = (directory: string): string[] => {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const fullPath = resolve(directory, entry.name); // 相対パスを解決

    if (entry.isDirectory()) {
      return retrieveFiles(fullPath); // 再帰呼び出し
    } else {
      return fullPath; // ファイルパスを返す
    }
  });
};

/**
 *  全ブログ記事のファイルパスを取得する関数
 * @returns ブログ記事のファイルパスの配列
 */
function getPostPaths(): string[] {
  return retrieveFiles(postsDirectory);
}

/**
 * ファイルパスからブログ記事を取得する関数
 * @param path - ブログ記事のファイルパス
 * @returns ブログ記事
 */
export function getPostByPath(path: string): Post {
  const fileContents = fs.readFileSync(path, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: data.slug, content } as Post;
}

/**
 * スラッグからブログ記事を取得する関数
 * @param slug - ブログ記事のスラッグ
 * @returns ブログ記事
 */
export function getPostBySlug(slug: string): Post | undefined {
  const allPosts = getAllPosts();
  return allPosts.find((post) => post.slug === slug);
}

/**
 * 全ブログ記事を取得する関数
 * @returns ブログ記事の配列
 */
export function getAllPosts(): Post[] {
  const paths = getPostPaths();
  const posts = paths
    .map((slug) => getPostByPath(slug))
    // 日付の降順でソート
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
