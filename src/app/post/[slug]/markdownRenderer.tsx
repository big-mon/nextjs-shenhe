import { remark } from "remark";
import remarkGfm from "remark-gfm";
import { remarkBlockLink } from "@lib/markdown/remark-block-link";

const parseMarkdown = remark().use(remarkBlockLink).use(remarkGfm);

export const MarkdownRenderer = async ({ children }) => {
  const parsed = parseMarkdown.parse(children);
  const mdastRoot = await parseMarkdown.run(parsed);

  return <NodesRenderer nodes={mdastRoot.children} />;
};

const NodesRenderer = ({ nodes }) => {
  return nodes.map((node, index) => {
    switch (node.type) {
      case "heading": {
        return <HeadingNode key={index} node={node} />;
      }
      case "text": {
        return <TextNode key={index} node={node} />;
      }
      case "paragraph": {
        return <ParagraphNode key={index} node={node} />;
      }
      case "block-link": {
        return <BlockLinkNode key={index} node={node} />;
      }
      default: {
        return (
          <div key={index}>
            <p style={{ color: "red" }}>Unknown node type: {node.type}</p>
            <pre>{JSON.stringify(node, null, 2)}</pre>
          </div>
        );
      }
    }
  });
};

const BlockLinkNode = ({ node }) => {
  return (
    <div className={classes.embeded}>
      <RichLinkCard href={node.url} isExternal />
    </div>
  );
};

const HeadingNode = ({ node }) => {
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

  const childrenText = (function getChildrenText(children): string {
    return children.reduce((acc, child) => {
      if ("value" in child) {
        return acc + child.value;
      }
      if ("children" in child) {
        return acc + getChildrenText(child.children);
      }
      return acc;
    }, "");
  })(node.children);

  return (
    <Component id={encodeURIComponent(childrenText)}>
      <NodesRenderer nodes={node.children} />
    </Component>
  );
};

const TextNode = ({ node }) => {
  return node.value;
};

const ParagraphNode = ({ node }) => {
  return (
    <p>
      <NodesRenderer nodes={node.children} />
    </p>
  );
};
