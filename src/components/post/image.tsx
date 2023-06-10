import Image from "next/image";
import { GetExternalImageInfo } from "utils/image";

export default async function PostImage({
  title,
  src,
  alt = "",
}: {
  title: string;
  src: string;
  alt: string;
}) {
  return (
    <>
      <Image
        src={await GetExternalImageInfo(src, "post")}
        alt={alt}
        sizes="(max-width: 672px) 100vw, 672px"
      />
      {title ? <span className="block text-center">{title}</span> : <></>}
    </>
  );
}
