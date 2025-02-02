"use client";

import { CldImage } from "next-cloudinary";
import { getCloudinaryImageUrl } from "@lib/cloudinary";
import Image from "next/image";

type Props = {
  src: string;
  alt?: string;
};

const CustomImage = ({ src, alt = "" }: Props) => {
  const imageUrl = getCloudinaryImageUrl(src);

  return (
    <CldImage
      src={src}
      width={1600}
      height={900}
      alt={alt}
      className="w-full object-cover rounded-xl aspect-w-2 aspect-h-1"
      placeholder="blur"
      blurDataURL={imageUrl}
      namedTransformations={["post"]}
      priority
    />
  );
};

export default CustomImage;
