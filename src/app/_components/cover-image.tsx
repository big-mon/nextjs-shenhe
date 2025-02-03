"use client";

import { CldImage } from "next-cloudinary";
import { getCloudinaryBlurredSrc } from "@lib/cloudinary";

type Props = {
  title: string;
  src: string;
  size: "large" | "small" | "ogp";
};

const CoverImage = async ({ title, src, size }: Props) => {
  const imageBlurUrl = await getCloudinaryBlurredSrc(src);

  let img = <></>;
  if (size === "large") {
    img = (
      <CldImage
        src={src}
        width={1600}
        height={900}
        alt={`Cover Image for ${title}`}
        className="object-cover"
        placeholder="blur"
        blurDataURL={imageBlurUrl}
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
        blurDataURL={imageBlurUrl}
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
