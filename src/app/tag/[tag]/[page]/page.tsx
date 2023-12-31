import { getPosts } from "services/accessToTag";
import PostCard from "components/card";
import Pagination from "components/pagination";

export default async function Page({
  params,
}: {
  params: { tag: string; page: number };
}) {
  const tag = decodeURIComponent(params.tag);
  const PostData = getPosts(tag, params.page);
  return (
    <div className="container mx-auto max-w-5xl mb-14">
      <h1 className="mt-5 uppercase text-2xl font-bold">{tag}</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
        {PostData.posts.map((post) => {
          return (
            <>
              <PostCard
                key={"tag_" + post.slug}
                data={post}
                size="small"
                isTitleH1={false}
              />
            </>
          );
        })}
      </div>

      <Pagination
        type="tag"
        currentPage={params.page}
        totalPage={PostData.totalPage}
        prefix={tag}
      />
    </div>
  );
}
