import { PostMeta } from "models/Post";
import { getPosts } from "services/accessToCategory";
import PostCard from "components/card";

export default async function Page({
  params,
}: {
  params: { category: PostMeta["category"]; page: number };
}) {
  const categoryData = getPosts(params.category, params.page);
  return (
    <div className="container mx-auto max-w-5xl mb-14">
      <div className="grid lg:grid-cols-2 gap-6">
        {categoryData.posts.map((post) => {
          return (
            <>
              {/* @ts-expect-error Server Component */}
              <PostCard key={post.slug} data={post} size="large" />
            </>
          );
        })}
      </div>
    </div>
  );
}
