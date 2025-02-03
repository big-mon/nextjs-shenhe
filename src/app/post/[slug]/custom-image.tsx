"use client";

import { CldImage } from "next-cloudinary";
import { getCloudinaryImageUrl } from "@lib/cloudinary";
import { isExternalLink } from "@lib/url";
import { CustomLink } from "./custom-link";

type Props = {
  src: string;
  alt?: string;
  title?: string;
};

export const CustomImage = ({ src, alt = "", title = "" }: Props) => {
  const isExternal = isExternalLink(src);
  const imageOgpUrl = getCloudinaryImageUrl(src, "ogp");

  return (
    <span className="relative block">
      <CldImage
        src={src}
        alt={alt}
        width={860}
        height={860}
        placeholder="blur"
        blurDataURL={imageOgpUrl}
        namedTransformations={["post"]}
        sizes="(max-width: 672px) 100vw, 672px"
      />
      {title === "" ? null : (
        <span className="block text-center text-gray-500">{title}</span>
      )}
    </span>
  );
};
