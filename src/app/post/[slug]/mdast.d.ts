import { Node } from "unist";

declare module "mdast" {
  interface TwitterNode extends Node {
    type: "twitter";
    value: string;
  }

  interface YouTubeNode extends Node {
    type: "youtube";
    value: string;
  }
}
