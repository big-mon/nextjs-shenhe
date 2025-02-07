import React from "react";
import { ListItem, Paragraph } from "mdast";
import { NodesRenderer } from "./markdownRenderer";

interface ListItemNodeProps {
  node: ListItem;
}

const ListItemNode = ({ node }: ListItemNodeProps) => {
  if (node.children.length === 1 && node.children[0].type === "paragraph") {
    return (
      <li>
        <NodesRenderer nodes={(node.children[0] as Paragraph).children} />
      </li>
    );
  }

  return (
    <li>
      <NodesRenderer nodes={node.children} />
    </li>
  );
};

export default ListItemNode;
