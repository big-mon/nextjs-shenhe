import Image from "next/image";
import Icon from "@/app/icon.svg";
import { SITE_NAME } from "@/lib/constants";

export default function Logo({ size }: { size: 24 | 32 }) {
  const textSize = size == 24 ? "text-base" : "text-xl";
  return (
    <div className="flex justify-center items-center">
      <Image
        className="mr-3 inline"
        src={Icon}
        alt={SITE_NAME}
        width={size}
        height={size}
      />
      <span className={textSize}>{SITE_NAME}</span>
    </div>
  );
}
