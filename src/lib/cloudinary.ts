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

export async function getCloudinaryBlurredSrc(publicId: string) {
  const imageBlurUrl = getCloudinaryImageUrl(publicId, "blur");
  const response = await fetch(imageBlurUrl);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");
  const dataUrl = `data:${response.type};base64,${base64}`;
  return dataUrl;
}
