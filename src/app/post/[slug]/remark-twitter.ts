import { visit } from "unist-util-visit";
import { Plugin } from "unified";
import { TwitterNode } from "mdast";

const remarkTwitter: Plugin = () => {
  return (tree) => {
    visit(tree, "code", (node: any, index, parent) => {
      if (node.lang === "twitter") {
        const twitterNode: TwitterNode = {
          type: "twitter",
          value: node.value,
        };
        parent.children.splice(index, 1, twitterNode);
      }
    });
  };
};

export default remarkTwitter;
