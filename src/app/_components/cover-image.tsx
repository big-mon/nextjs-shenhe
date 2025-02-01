import { CldImage, getCldImageUrl } from "next-cloudinary";

type Props = {
  title: string;
  src: string;
  size: "large" | "small";
};

const CoverImage = ({ title, src, size }: Props) => {
  const imageUrl = getCldImageUrl({
    src: src,
  });

  return (
    <CldImage
      src={src}
      width={640}
      height={427}
      alt={`Cover Image for ${title}`}
      className="w-full object-cover rounded-xl aspect-video"
      placeholder="blur"
      blurDataURL={imageUrl}
      priority={size == "large"}
    />
  );
};

export default CoverImage;
