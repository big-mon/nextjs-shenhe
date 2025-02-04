import { MoreStories } from "@components/more-stories";
import Pagination from "@components/pagination";
import { getAllPosts } from "@lib/blogService";
import { howTotalPages } from "@lib/pagination";
import { PER_PAGE } from "@lib/constants";

export default async function Page() {
  const page = 1;
  const allPosts = getAllPosts();
  const pagePosts = allPosts.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPage = howTotalPages(allPosts);

  return (
    <main className="container mx-auto max-w-5xl">
      <MoreStories posts={pagePosts} />

      <div className="mb-16">
        <Pagination
          type={"all"}
          currentPage={page}
          totalPage={totalPage}
          prefix={""}
        />
      </div>
    </main>
  );
}
