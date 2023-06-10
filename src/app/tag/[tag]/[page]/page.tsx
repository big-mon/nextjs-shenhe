import { getPosts } from "services/accessToTag";
import PostCard from "components/card";

export default async function Page({
  params,
}: {
  params: { tag: string; page: number };
}) {
  const tag = decodeURIComponent(params.tag);
  const tagData = getPosts(tag, params.page);
  return (
    <div className="container mx-auto max-w-5xl mb-14">
      <h1 className="mt-5 uppercase text-2xl font-bold">{tag}</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
        {tagData.posts.map((post) => {
          return (
            <>
              {/* @ts-expect-error Server Component */}
              <PostCard
                key={post.slug}
                data={post}
                size="small"
                isTitleH1={false}
              />
            </>
          );
        })}
      </div>
    </div>
  );
}
