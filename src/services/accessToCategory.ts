import { PER_PAGE } from "constants/setting";
import { getSortedPostsMeta } from "repositories/local/post";

/** カテゴリー一覧ページ向けの記事一覧とページ数を取得 */
export const getPosts = (category: string, page: number) => {
  // カテゴリーとページに該当する記事に絞り込み
  const allPosts = getSortedPostsMeta().filter(
    (meta) => meta.category.toLowerCase() == category.toLowerCase()
  );
  const currentPagePosts = allPosts.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  return {
    posts: currentPagePosts,
    totalPage: allPosts.length,
  };
};
