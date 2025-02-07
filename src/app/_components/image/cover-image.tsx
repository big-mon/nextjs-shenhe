"use client";

import { CldImage } from "next-cloudinary";

type Props = {
  title: string;
  src: string;
  size: "large" | "small";
  blurredSrc: string;
};

const imageConfig = {
  large: {
    width: 1600,
    height: 900,
    class: "object-cover rounded-xl",
    priority: true,
  },
  small: {
    width: 640,
    height: 427,
    class: "w-full object-cover rounded-xl aspect-w-2 aspect-h-1",
    priority: false,
  },
};

const CoverImage = ({ title, src, size, blurredSrc }: Props) => {
  const config = imageConfig[size];

  return (
    <CldImage
      src={src}
      width={config.width}
      height={config.height}
      alt={`Cover Image for ${title}`}
      className={config.class}
      placeholder="blur"
      blurDataURL={blurredSrc}
      priority={config.priority}
    />
  );
};

export default CoverImage;
