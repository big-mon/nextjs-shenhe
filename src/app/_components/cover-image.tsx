"use client";

import { CldImage } from "next-cloudinary";
import { getCloudinaryImageUrl } from "@lib/cloudinary";

type Props = {
  title: string;
  src: string;
  size: "large" | "small" | "ogp";
};

const CoverImage = ({ title, src, size }: Props) => {
  const imageUrl = getCloudinaryImageUrl(src);

  let img = <></>;
  if (size === "large") {
    img = (
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
    );
  } else if (size === "small") {
    img = (
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
  } else {
    img = (
      <CldImage
        src={src}
        width={1200}
        height={630}
        alt={`Cover Image for ${title}`}
        className="w-full object-cover rounded-xl aspect-w-2 aspect-h-1"
        namedTransformations={["ogp"]}
      />
    );
  }

  return img;
};

export default CoverImage;
