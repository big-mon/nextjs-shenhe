import Link from "next/link";
import { Link as MdastLink, RootContent } from "mdast";
import { NodesRenderer } from "./markdownRenderer";
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
    >
      <NodesRenderer nodes={node.children as RootContent[]} />
    </Link>
  );
};
