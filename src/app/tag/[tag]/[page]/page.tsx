import { MoreStories } from "@components/more-stories";
import Pagination from "@components/pagination";
import { getAllPosts } from "@lib/blogService";
import { howTotalPages } from "@lib/pagination";
import { PER_PAGE } from "@lib/constants";

type Params = {
  params: Promise<{
    tag: string;
    page: number;
  }>;
};

export default async function Page(props: Params) {
  const tag = decodeURIComponent((await props.params).tag);
  const page = (await props.params).page;
  const allPosts = getAllPosts().filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
  const pagePosts = allPosts.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPage = howTotalPages(allPosts);

  return (
    <main className="container mx-auto max-w-5xl">
      <MoreStories posts={pagePosts} title={tag} />

      <div className="mb-16">
        <Pagination
          type={"tag"}
          currentPage={page}
          totalPage={totalPage}
          prefix={tag}
        />
      </div>
    </main>
  );
}
