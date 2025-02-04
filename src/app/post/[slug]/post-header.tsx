import Avatar from "@components/avatar";
import CoverImage from "@components/image/cover-image";
import { getCloudinaryBlurredSrc } from "@lib/cloudinary";
import DateFormatter from "@components/date-formatter";
import { PostTitle } from "./post-title";
import { type Author } from "@interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
};

export async function PostHeader({ title, coverImage, date, author }: Props) {
  const imageBlurUrl = await getCloudinaryBlurredSrc(coverImage);

  return (
    <div className="px-5 py-5">
      <PostTitle>{title}</PostTitle>
      <div className="mb-8">
        <CoverImage
          title={title}
          src={coverImage}
          size={"large"}
          blurredSrc={imageBlurUrl}
        />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </div>
  );
}
