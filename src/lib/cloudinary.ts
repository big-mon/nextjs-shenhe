import { getCldImageUrl } from "next-cloudinary";

export function getCloudinaryImageUrl(publicId: string) {
  return getCldImageUrl({ src: publicId });
}

export function getCloudinaryImageOgpUrl(publicId: string) {
  return getCldImageUrl({ src: publicId, namedTransformations: "ogp" });
}
