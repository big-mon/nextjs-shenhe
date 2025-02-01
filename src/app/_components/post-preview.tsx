import Link from "next/link";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  slug: string;
};

export function PostPreview({ title, coverImage, date, excerpt, slug }: Props) {
  const coverImageSrc =
    "https://res.cloudinary.com/damonge/image/upload/illust/" + coverImage;

  return (
    <article>
      <Link href={`/posts/${slug}`}>
        <CoverImage title={title} src={coverImageSrc} size={"small"} />
      </Link>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
    </article>
  );
}
