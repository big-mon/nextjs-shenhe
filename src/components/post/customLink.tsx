import Link from "next/link";
import { isAbsoluteExternalUrl } from "utils/url";

export default function CustomLink({
  href = "/",
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  return isAbsoluteExternalUrl(href) ? (
    <a href={href} target="_blank" rel="noopener">
      {children}
    </a>
  ) : (
    <Link href={href}>{children}</Link>
  );
}
