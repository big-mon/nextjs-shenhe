import { MetadataRoute } from "next";
import { getAllPosts } from "@lib/blogService";

const sitemap = (): MetadataRoute.Sitemap => {
  const baseURL = process.env.NEXT_PUBLIC_URL || "";
  const lastModifiedDate = new Date();

  const allPosts = getAllPosts();

  // 静的パス
  const staticPaths: MetadataRoute.Sitemap = [
    {
      // トップページ
      url: `${baseURL}`,
      lastModified: lastModifiedDate,
    },
  ];

  // カテゴリーページ
  const categories = Array.from(new Set(allPosts.map((item) => item.category)));
  const categoryPaths: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseURL}/category/${category.toLowerCase()}/1`,
    lastModified: lastModifiedDate,
  }));

  // タグページ
  const tags = Array.from(new Set(allPosts.flatMap((item) => item.tags)));
  const tagPaths: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${baseURL}/tag/${tag.toLowerCase()}/1`,
    lastModified: lastModifiedDate,
  }));

  // 記事ページ
  const postPaths: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: `${baseURL}/post/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticPaths, ...categoryPaths, ...tagPaths, ...postPaths];
};

export default sitemap;
