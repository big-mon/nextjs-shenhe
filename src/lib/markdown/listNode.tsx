import React from "react";
import { List } from "mdast";
import { NodesRenderer } from "./markdownRenderer";
import styles from "@styles/markdown.module.scss";

interface ListNodeProps {
  node: List;
}

const ListNode = ({ node }: ListNodeProps) => {
  return node.ordered ? (
    <ol className={styles.list}>
      <NodesRenderer nodes={node.children} />
    </ol>
  ) : (
    <ul className={styles.list}>
      <NodesRenderer nodes={node.children} />
    </ul>
  );
};

export default ListNode;
