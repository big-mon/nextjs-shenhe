import Avatar from "@components/avatar";
import CoverImage from "@components/image/cover-image";
import { getCloudinaryBlurredSrc } from "@lib/cloudinary";
import DateFormatter from "@components/date-formatter";
import { PostTitle } from "./post-title";
import { type Author } from "@interfaces/author";
import Link from "next/link";

type Props = {
  title: string;
  category: string;
  tags: string[];
  coverImage: string;
  date: string;
  author: Author;
};

export async function PostHeader({
  title,
  category,
  tags,
  coverImage,
  date,
  author,
}: Props) {
  const imageBlurUrl = await getCloudinaryBlurredSrc(coverImage);

  return (
    <header className="px-5 py-5">
      <div className="mx-auto max-w-2xl text-sm text-gray-500 md:flex mb-2">
        <Link
          href={"/category/" + category.toLowerCase() + "/1"}
          className="hover:text-teal-500"
        >
          {category}
        </Link>
      </div>

      <div className="mx-auto max-w-2xl text-xs text-gray-500">
        <DateFormatter dateString={date} />
      </div>

      <div className="mx-auto max-w-2xl break-keep break-words">
        <PostTitle>{title}</PostTitle>
      </div>

      {tags.length > 0 && (
        <div className="mx-auto max-w-2xl mb-3 md:mb-4 text-xs text-gray-500">
          {tags.map((tag) => (
            <Link
              href={"/tag/" + tag.toLowerCase() + "/1"}
              className="ml-4 md:ml-0 md:mr-4 hover:text-teal-500"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      <div className="mb-8">
        <CoverImage
          title={title}
          src={coverImage}
          size={"large"}
          blurredSrc={imageBlurUrl}
        />
      </div>
    </header>
  );
}
