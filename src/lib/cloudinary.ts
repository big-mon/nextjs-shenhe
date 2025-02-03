import { getCldImageUrl } from "next-cloudinary";

export function getCloudinaryImageUrl(publicId: string) {
  return getCldImageUrl({ src: publicId.slice(1) });
}

export function getCloudinaryImageOgpUrl(publicId: string) {
  return getCldImageUrl({
    src: publicId.slice(1),
    namedTransformations: "ogp",
  });
}
