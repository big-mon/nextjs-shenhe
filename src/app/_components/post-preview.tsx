import Link from "next/link";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  slug: string;
  isTopPage: boolean;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  slug,
  isTopPage,
}: Props) {
  const publicId = "/illust/" + coverImage;

  return (
    <article>
      <Link href={`/post/${slug}`}>
        <CoverImage title={title} src={publicId} size={"small"} />
      </Link>

      {isTopPage ? (
        <h2 className="text-3xl mb-3 leading-snug">
          <Link href={`/post/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h2>
      ) : (
        <h3 className="text-3xl mb-3 leading-snug">
          <Link href={`/post/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>
      )}

      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
    </article>
  );
}
