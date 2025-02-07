import { visit } from "unist-util-visit";
import { Plugin } from "unified";

const remarkTwitter: Plugin = () => {
  return (tree) => {
    visit(tree, "code", (node: any, index, parent) => {
      if (node.lang === "twitter") {
        const twitterNode = {
          type: "twitter",
          value: node.value,
        };
        parent.children.splice(index, 1, twitterNode);
      }
    });
  };
};

export default remarkTwitter;

declare module "mdast" {
  export interface TwitterBlock extends Resource {
    type: "twitter";
    value: string;
  }

  interface RootContentMap {
    twitter: TwitterBlock;
  }
}
