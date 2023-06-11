import { getPosts } from "services/accessToTop";
import PostCard from "components/card";
import Pagination from "components/pagination";
import { PER_PAGE } from "constants/setting";

export default function Page() {
  const posts = getPosts();
  return (
    <div className="container mx-auto max-w-5xl mb-14">
      <div className="grid lg:grid-cols-2 gap-6">
        {posts.posts.slice(0, 2).map((post) => {
          return (
            <>
              {/* @ts-expect-error Server Component */}
              <PostCard key={post.slug} data={post} size="large" />
            </>
          );
        })}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {posts.posts.slice(2, PER_PAGE - 2).map((post) => {
          return (
            <>
              {/* @ts-expect-error Server Component */}
              <PostCard key={post.slug} data={post} size="small" />
            </>
          );
        })}
      </div>

      <Pagination
        type="all"
        currentPage={1}
        totalPage={posts.totalPage}
        prefix={""}
      />
    </div>
  );
}
