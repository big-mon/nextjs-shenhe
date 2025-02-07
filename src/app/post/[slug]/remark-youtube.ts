import { visit } from "unist-util-visit";
import { Plugin } from "unified";
import { YouTubeNode } from "mdast";

const remarkYouTube: Plugin = () => {
  return (tree) => {
    visit(tree, "code", (node: any, index, parent) => {
      if (node.lang === "youtube") {
        const youtubeNode: YouTubeNode = {
          type: "youtube",
          value: node.value,
        };
        parent.children.splice(index, 1, youtubeNode);
      }
    });
  };
};

export default remarkYouTube;
