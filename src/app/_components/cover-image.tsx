import Image from "next/image";
import { getImageSize } from "@/lib/getImageSize";

type Props = {
  title: string;
  src: string;
  size: "large" | "small";
};

const CoverImage = async ({ title, src, size }: Props) => {
  const imageData = await getImageSize(src);
  return (
    <Image
      src={src}
      width={imageData.width}
      height={imageData.height}
      alt={`Cover Image for ${title}`}
      className="w-full object-cover rounded-xl aspect-video"
      sizes={
        size == "large"
          ? "(max-width: 1024px) 100vw, 460px"
          : "(max-width: 1024px) 100vw, 286px"
      }
      priority={size == "large"}
    />
  );
};

export default CoverImage;
