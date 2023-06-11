import { getPosts } from "services/accessToPage";
import PostCard from "components/card";
import Pagination from "components/pagination";

export default function Page({ params }: { params: { page: number } }) {
  const posts = getPosts(params.page);
  return (
    <div className="container mx-auto max-w-5xl mb-14">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.posts.map((post) => {
          return (
            <>
              {/* @ts-expect-error Server Component */}
              <PostCard key={"page_" + post.slug} data={post} size="small" />
            </>
          );
        })}
      </div>

      <Pagination
        type="all"
        currentPage={params.page}
        totalPage={posts.totalPage}
        prefix={""}
      />
    </div>
  );
}
