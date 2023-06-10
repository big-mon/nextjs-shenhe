/** 内部URLのパスを公開URLに変換 */
export const convertInnerUrl = (url: string) => {
  const isOuter = url && url.startsWith("http");
  const isAnchor = url && url.startsWith("#");
  return isOuter || isAnchor ? url : "/" + url;
};

/** 絶対URLかを判別 */
export const isAbsoluteExternalUrl = (url: string) => {
  return url.startsWith("http");
};
