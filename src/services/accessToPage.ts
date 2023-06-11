import { PER_PAGE } from "constants/setting";
import { getSortedPostsMeta } from "repositories/local/post";

/** トップページ(ページ指定あり)向けの記事一覧と全ページ数を取得 */
export const getPosts = (page: number) => {
  const allPosts = getSortedPostsMeta();
  const posts = allPosts.slice((page - 1) * PER_PAGE - 1, page * PER_PAGE);

  return {
    posts: posts,
    totalPage: Math.ceil(allPosts.length / PER_PAGE),
  };
};
