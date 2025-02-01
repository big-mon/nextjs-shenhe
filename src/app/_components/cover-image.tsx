"use client";

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

  return size === "large" ? (
    <CldImage
      src={src}
      width={1600}
      height={900}
      alt={`Cover Image for ${title}`}
      className="w-full object-cover rounded-xl aspect-w-2 aspect-h-1"
      placeholder="blur"
      blurDataURL={imageUrl}
      namedTransformations={["hero"]}
      priority
    />
  ) : (
    <CldImage
      src={src}
      width={640}
      height={427}
      alt={`Cover Image for ${title}`}
      className="w-full object-cover rounded-xl aspect-w-2 aspect-h-1"
      placeholder="blur"
      blurDataURL={imageUrl}
      namedTransformations={["eyecatch"]}
    />
  );
};

export default CoverImage;
