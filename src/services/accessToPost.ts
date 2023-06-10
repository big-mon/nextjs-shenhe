import { getPostDataBySlug, getSortedPostsMeta } from "repositories/local/post";

/** 記事詳細ページ向けの記事データを取得 */
export const getPost = async (slug: string) => {
  const postData = await getPostDataBySlug(slug);
  return postData;
};
