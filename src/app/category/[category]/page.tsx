import { MoreStories } from "@components/more-stories";
import Pagination from "@components/pagination";
import { getAllPosts } from "@lib/blogService";
import { howTotalPages } from "@lib/pagination";
import { PER_PAGE } from "@lib/constants";

type Params = {
  params: Promise<{
    category: string;
  }>;
};

export default async function Page(props: Params) {
  const category = decodeURIComponent((await props.params).category);
  const page = 1;
  const allPosts = getAllPosts().filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
  const pagePosts = allPosts.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPage = howTotalPages(allPosts);

  return (
    <main className="container mx-auto max-w-5xl">
      <MoreStories posts={pagePosts} />

      <div className="mb-16">
        <Pagination
          type={"category"}
          currentPage={page}
          totalPage={totalPage}
          prefix={category}
        />
      </div>
    </main>
  );
}
