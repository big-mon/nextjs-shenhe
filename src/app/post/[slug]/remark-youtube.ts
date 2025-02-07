import { visit } from "unist-util-visit";
import { Plugin } from "unified";

const remarkYouTube: Plugin = () => {
  return (tree) => {
    visit(tree, "code", (node: any, index, parent) => {
      if (node.lang === "youtube") {
        const youtubeNode = {
          type: "youtube",
          value: node.value,
        };
        parent.children.splice(index, 1, youtubeNode);
      }
    });
  };
};

export default remarkYouTube;

declare module "mdast" {
  export interface YouTubeBlock extends Resource {
    type: "youtube";
    value: string;
  }

  interface RootContentMap {
    youtube: YouTubeBlock;
  }
}
