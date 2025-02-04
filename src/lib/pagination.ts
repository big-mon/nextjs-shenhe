import { Post } from "@interfaces/post";
import { PER_PAGE } from "@lib/constants";

/**
 * 投稿の数に基づいて総ページ数を計算します。
 *
 * @param posts - Postオブジェクトの配列。
 * @returns 総ページ数（切り上げ）。
 */
export function howTotalPages(posts: Post[]) {
  return Math.ceil((posts.length + 1) / PER_PAGE) - 1;
}
