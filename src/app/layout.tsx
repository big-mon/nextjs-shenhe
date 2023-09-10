import type { Metadata } from "next";
import Script from "next/script";
import { Noto_Serif_JP } from "next/font/google";
import "styles/tailwind.css";
import { SITE_NAME, SITE_DESCRIPTION } from "constants/information";
import { TWITTER } from "constants/owner";
import { SITE_IMAGE } from "constants/setting";
import GlobalHeader from "components/header";
import GlobalFooter from "components/footer";

const mainFont = Noto_Serif_JP({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-serif",
});

export const metadata: Metadata = {
  title: {
    template: "%s | " + SITE_NAME,
    default: SITE_NAME,
  },
  description: SITE_DESCRIPTION,
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    site: TWITTER,
    images: SITE_IMAGE,
    creator: TWITTER,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${mainFont.variable}`}>
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6950127103154689"
        crossOrigin="anonymous"
      />
      <body className="font-serif bg-white text-gray-900 overflow-x-hidden">
        <GlobalHeader />
        {children}
        <GlobalFooter />
      </body>
    </html>
  );
}
