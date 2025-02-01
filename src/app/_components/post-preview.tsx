import Link from "next/link";
import CoverImage from "./cover-image";

type Props = {
  title: string;
  coverImage: string;
  slug: string;
  category: string;
  isTopPage: boolean;
};

export function PostPreview({
  title,
  coverImage,
  slug,
  category,
  isTopPage,
}: Props) {
  const publicId = "/illust/" + coverImage;

  return (
    <article className="group hover:bg-gray-200 rounded-xl p-5 transition-all">
      <Link href={`/post/${slug}`} className="block mb-4">
        <CoverImage title={title} src={publicId} size={"small"} />
      </Link>

      {isTopPage ? (
        <h3 className="mb-4 text-xs">
          <Link href={`/category/${category}`}>{category}</Link>
        </h3>
      ) : (
        <div className="mb-4 text-xs">
          <Link href={`/category/${category}`}>{category}</Link>
        </div>
      )}

      {isTopPage ? (
        <h2 className="mb-2 text-lg leading-snug font-semibold">
          <Link href={`/post/${slug}`}>{title}</Link>
        </h2>
      ) : (
        <h3 className="mb-2 text-lg leading-snug font-semibold">
          <Link href={`/post/${slug}`}>{title}</Link>
        </h3>
      )}

      <p className="text-sm">
        <Link
          href={`/post/${slug}`}
          className="inline-flex items-center gap-x-2"
        >
          Read more
        </Link>
      </p>
    </article>
  );
}
