import sharp, { Metadata } from "sharp";

export const getImageSize = async (
  src: string
): Promise<{ width: number; height: number }> => {
  const response = await fetch(src);
  const buffer = await response.arrayBuffer();
  const metadata: Metadata = await sharp(Buffer.from(buffer)).metadata();
  return { width: metadata.width ?? 0, height: metadata.height ?? 0 };
};
