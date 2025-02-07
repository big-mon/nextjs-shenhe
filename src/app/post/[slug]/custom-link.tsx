import Link from "next/link";
import { Link as MdastLink, RootContent } from "mdast";
import { NodesRenderer } from "./markdownRenderer";
import { isExternalLink } from "@lib/url";
import styles from "@styles/markdown.module.scss";

interface CustomLinkProps {
  node: MdastLink;
}

export const CustomLink = ({ node }: CustomLinkProps) => {
  return (
    <Link
      href={node.url}
      title={node.title ?? undefined}
      className={styles.link}
      target={isExternalLink(node.url) ? "_blank" : undefined}
      rel={isExternalLink(node.url) ? "noopener noreferrer" : undefined}
    >
      <NodesRenderer nodes={node.children as RootContent[]} />
    </Link>
  );
};
