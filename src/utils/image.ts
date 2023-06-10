import probe from "probe-image-size";
import { isAbsoluteExternalUrl } from "utils/url";
import {
  IS_USE_EXTERNAL_IMAGE,
  EXTERNAL_IMAGE_SERVICE,
  EXTERNAL_IMAGE_PREFIX_DIRECTORY,
} from "constants/setting";

/** Get image info (size) for external link */
export async function GetExternalImageInfo(
  url: string,
  type: "hero" | "eyeCatch" | "post"
) {
  let imageUrl = url;
  if (!isAbsoluteExternalUrl(url)) {
    const prefixFolder = EXTERNAL_IMAGE_PREFIX_DIRECTORY.filter(
      (prefixSetting) => prefixSetting.type == type
    )[0];

    if (IS_USE_EXTERNAL_IMAGE)
      imageUrl = EXTERNAL_IMAGE_SERVICE + prefixFolder.folder + url;
  }

  const image = await probe(imageUrl);
  return {
    src: imageUrl,
    width: image.width,
    height: image.height,
  };
}
