import { getCldImageUrl } from "next-cloudinary";

export function getCloudinaryImageUrl(
  publicId: string,
  namedTransformations: "hero" | "post" | "ogp" | "blur"
) {
  return getCldImageUrl({
    src: publicId.slice(1),
    namedTransformations: namedTransformations,
  });
}
