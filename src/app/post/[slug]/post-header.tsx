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
    <div className="px-5 py-5">
      <div className="mx-auto">
        <Link href={"/category/" + category.toLowerCase() + "/1"}>
          {category}
        </Link>
      </div>

      <div className="mx-auto">
        <DateFormatter dateString={date} />
      </div>

      <PostTitle>{title}</PostTitle>

      {tags.length > 0 && (
        <div className="mx-auto">
          {tags.map((tag) => (
            <Link href={"/tag/" + tag.toLowerCase() + "/1"}>#{tag}</Link>
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
    </div>
  );
}
