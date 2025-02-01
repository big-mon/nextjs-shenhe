import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";

export default function Index() {
  const allPosts = getAllPosts();

  return (
    <main className="container mx-auto max-w-5xl">
      {allPosts.length > 0 && <MoreStories posts={allPosts} />}
    </main>
  );
}
