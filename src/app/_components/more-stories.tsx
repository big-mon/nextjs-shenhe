"use client";

import { usePathname } from "next/navigation";
import { Post } from "@interfaces/post";
import { PostPreview } from "./post-preview";

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  const pathname = usePathname();
  const isTopPage = pathname === "/";

  return (
    <section>
      {!isTopPage && (
        <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
          More Stories
        </h2>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 mb-24">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            slug={post.slug}
            category={post.category}
            isTopPage={isTopPage}
          />
        ))}
      </div>
    </section>
  );
}
