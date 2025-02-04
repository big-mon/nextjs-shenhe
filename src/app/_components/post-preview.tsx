import Link from "next/link";
import CoverImage from "@components/image/cover-image";
import { getCloudinaryBlurredSrc } from "@lib/cloudinary";

type Props = {
  title: string;
  coverImage: string;
  slug: string;
  category: string;
  isTopPage: boolean;
};

export async function PostPreview({
  title,
  coverImage,
  slug,
  category,
  isTopPage,
}: Props) {
  const imageBlurUrl = await getCloudinaryBlurredSrc(coverImage);

  return (
    <article className="group hover:bg-gray-200 rounded-xl p-5 transition-all">
      <Link href={`/post/${slug}`} className="block mb-4">
        <CoverImage
          title={title}
          src={coverImage}
          size={"small"}
          blurredSrc={imageBlurUrl}
        />
      </Link>

      {isTopPage ? (
        <h3 className="mb-4 text-xs">
          <Link href={`/category/${category.toLowerCase()}`}>{category}</Link>
        </h3>
      ) : (
        <div className="mb-4 text-xs">
          <Link href={`/category/${category.toLowerCase()}`}>{category}</Link>
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
