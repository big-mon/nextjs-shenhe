import { PostMeta } from "models/Post";
import { getPosts } from "services/accessToCategory";
import PostCard from "components/card";
import Pagination from "components/pagination";

export default async function Page({
  params,
}: {
  params: { category: PostMeta["category"]; page: number };
}) {
  const category = decodeURIComponent(params.category);
  const PostData = getPosts(category, params.page);
  return (
    <div className="container mx-auto max-w-5xl mb-14">
      <h1 className="mt-5 uppercase text-2xl font-bold">{category}</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
        {PostData.posts.map((post) => {
          return (
            <>
              <PostCard
                key={"category_" + post.slug}
                data={post}
                size="small"
                isTitleH1={false}
              />
            </>
          );
        })}
      </div>

      <Pagination
        type="category"
        currentPage={params.page}
        totalPage={PostData.totalPage}
        prefix={category}
      />
    </div>
  );
}
