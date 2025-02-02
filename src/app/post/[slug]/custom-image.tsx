"use client";

import { CldImage } from "next-cloudinary";
import { getCloudinaryImageUrl } from "@lib/cloudinary";
import Image from "next/image";

type Props = {
  src: string;
  alt?: string;
  title?: string;
};

export const CustomImage = ({ src, alt = "", title = "" }: Props) => {
  const imageUrl = getCloudinaryImageUrl(src);

  return (
    <div class="relative block">
      <CldImage
        src={src}
        alt={alt}
        width={860}
        height={860}
        placeholder="blur"
        blurDataURL={imageUrl}
        namedTransformations={["post"]}
        sizes="(max-width: 672px) 100vw, 672px"
      />
      {title === "" ? null : (
        <span className="block text-center text-gray-500">{title}</span>
      )}
    </div>
  );
};
