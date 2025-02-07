import GlobalHeader from "@components/header";
import Footer from "@components/footer";
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  TWITTER,
  SITE_IMAGE,
} from "@lib/constants";
import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import "@styles/globals.css";

const mainFont = Noto_Serif_JP({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | " + SITE_NAME,
    default: SITE_NAME,
  },
  description: SITE_DESCRIPTION,
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    site: "@" + TWITTER,
    images: SITE_IMAGE,
    creator: "@" + TWITTER,
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "website",
    images: [SITE_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000" />
      </head>
      <body
        className={`${mainFont.className} bg-white text-gray-900 overflow-x-hidden`}
      >
        <GlobalHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
