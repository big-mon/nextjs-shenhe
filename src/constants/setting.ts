/** web site OGP default image */
export const SITE_IMAGE: string =
  "https://res.cloudinary.com/damonge/image/upload/f_auto,q_auto,fl_progressive,c_limit,h_630,w_1200/Hero/YS4_5968_69_70-2-3_x9dlrp";

/** list articles per page */
export const PER_PAGE: number = 12;

/** Whether to read the image path to the specified external service */
export const IS_USE_EXTERNAL_IMAGE: boolean = true;

/** external image service url (ex. Cloudinary) */
export const EXTERNAL_IMAGE_SERVICE: string =
  "https://res.cloudinary.com/damonge/image/upload";

/** external image's prefix folder setting */
export const EXTERNAL_IMAGE_PREFIX_DIRECTORY = [
  { type: "hero", folder: "/Hero/" },
  { type: "eyeCatch", folder: "/Hero/" },
  { type: "post", folder: "" },
];
