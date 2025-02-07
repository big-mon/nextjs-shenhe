import React from "react";
import { Heading, Text, Parent } from "mdast";
import { NodesRenderer } from "./markdownRenderer";
import styles from "@styles/markdown.module.scss";

interface HeadingNodeProps {
  node: Heading;
}

const HeadingNode = ({ node }: HeadingNodeProps) => {
  const Component = (
    {
      1: "h2",
      2: "h3",
      3: "h4",
      4: "h5",
      5: "h6",
      6: "p",
    } as const
  )[node.depth];

  const childrenText = (function getChildrenText(
    children: (Text | Parent)[]
  ): string {
    return children.reduce((acc, child) => {
      if ("value" in child) {
        return acc + (child as Text).value;
      }
      if ("children" in child) {
        return acc + getChildrenText(child.children as (Text | Parent)[]);
      }
      return acc;
    }, "");
  })(node.children as (Text | Parent)[]);

  return (
    <Component id={encodeURIComponent(childrenText)} className={styles.heading}>
      <NodesRenderer nodes={node.children} />
    </Component>
  );
};

export default HeadingNode;
