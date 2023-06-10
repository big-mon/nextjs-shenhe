import { getPosts } from "services/accessToTag";
import PostCard from "components/card";

export default async function Page({
  params,
}: {
  params: { tag: string; page: number };
}) {
  const tagData = getPosts(params.tag, params.page);
  return (
    <div className="container mx-auto max-w-5xl mb-14">
      <div className="grid lg:grid-cols-2 gap-6">
        {tagData.posts.map((post) => {
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
