"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Icon from "../icon.svg";
import { SITE_NAME } from "@lib/constants";

export default function Logo() {
  const pathname = usePathname();
  const isTopPage = pathname === "/";

  return React.createElement(
    isTopPage ? "h1" : "div",
    { className: "flex justify-center items-center" },
    <>
      <Image
        className="mr-3 inline"
        src={Icon}
        alt={SITE_NAME}
        width={32}
        height={32}
      />
      <span className="text-xl">{SITE_NAME}</span>
    </>
  );
}
