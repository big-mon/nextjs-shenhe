import { Post } from "@interfaces/post";
import { PostPreview } from "./post-preview";

type Props = {
  posts: Post[];
  title?: string;
};

export function MoreStories({ posts, title }: Props) {
  return (
    <section>
      {title && (
        <h2 className="mb-8 text-2xl tracking-tighter leading-tight">
          {title.toUpperCase()}
        </h2>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 mb-16">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            slug={post.slug}
            category={post.category}
            isTopPage={!title}
          />
        ))}
      </div>
    </section>
  );
}
