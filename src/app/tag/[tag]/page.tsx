import { getPosts } from "services/accessToTag";
import PostCard from "components/card";
import Pagination from "components/pagination";

export default async function Page({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  const PostData = getPosts(tag, 1);
  return (
    <div className="container mx-auto max-w-5xl mb-14">
      <h1 className="mt-5 uppercase text-2xl font-bold">{tag}</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
        {PostData.posts.map((post) => {
          return (
            <>
              {/* @ts-expect-error Server Component */}
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
        currentPage={1}
        totalPage={PostData.totalPage}
        text={tag}
      />
    </div>
  );
}
