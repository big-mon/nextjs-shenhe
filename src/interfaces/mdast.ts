import { Heading, List, ListItem, Table, RootContent } from "mdast";

export interface MarkdownRendererProps {
  children: string;
}

export interface NodesRendererProps {
  nodes: RootContent[];
}

export interface HeadingNodeProps {
  node: Heading;
}

export interface ListNodeProps {
  node: List;
}

export interface ListItemNodeProps {
  node: ListItem;
}

export interface TableNodeProps {
  node: Table;
}

export interface CustomLinkProps {
  node: {
    type: string;
    url: string;
    title?: string;
    children: RootContent[];
  };
}
