import { MoreStories } from "@components/more-stories";
import Pagination from "@components/pagination";
import { getAllPosts } from "@lib/blogService";
import { howTotalPages } from "@lib/pagination";
import { PER_PAGE } from "@lib/constants";

export default function Index() {
  const allPosts = getAllPosts();
  const totalPage = howTotalPages(allPosts);

  return (
    <main className="container mx-auto max-w-5xl">
      {allPosts.length > 0 && (
        <MoreStories posts={allPosts.slice(0, PER_PAGE)} />
      )}
      <div className="mb-16">
        <Pagination
          type={"all"}
          currentPage={1}
          totalPage={totalPage}
          prefix={""}
        />
      </div>
    </main>
  );
}
