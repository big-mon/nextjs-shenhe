/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/1",
        destination: "/",
        permanent: true,
      },
      {
        source: "/category/:category/1",
        destination: "/category/:category",
        permanent: true,
      },
      {
        source: "/tag/:tag/1",
        destination: "/tag/:tag",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  transpilePackages: ["@big-mon/react-component-amazon"],
};
