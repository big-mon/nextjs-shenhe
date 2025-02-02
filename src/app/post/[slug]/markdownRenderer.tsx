import { remark } from "remark";
import remarkGfm from "remark-gfm";
import { remarkBlockLink } from "@lib/markdown/remark-block-link";

/**
 * Markdownテキストを解析してReactコンポーネントを生成する
 */
export const MarkdownRenderer = async ({ children }) => {
  // remarkインスタンスを生成しプラグインを適用
  const parseMarkdown = remark().use(remarkBlockLink).use(remarkGfm);

  // Markdownテキストを解析し、Markdown Abstract Syntax Treeを生成
  const parsed = parseMarkdown.parse(children);

  // MDASTから最終的な構造を取得
  const mdastRoot = await parseMarkdown.run(parsed);

  // MDASTをReactコンポーネントに変換
  return <NodesRenderer nodes={mdastRoot.children} />;
};

/**
 * MDASTノード配列を対応したReactコンポーネントに変換する
 */
const NodesRenderer = ({ nodes }) => {
  return nodes.map((node, index) => {
    switch (node.type) {
      case "heading": {
        // 見出しノード(h1など)
        return <HeadingNode key={index} node={node} />;
      }
      case "text": {
        // テキストノード
        return <TextNode key={index} node={node} />;
      }
      case "paragraph": {
        // 段落ノード
        return <ParagraphNode key={index} node={node} />;
      }
      case "block-link": {
        // ブロックリンクノード
        return <BlockLinkNode key={index} node={node} />;
      }
      default: {
        // 未知のノード
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

/**
 * 見出しノードのレンダリング定義
 */
const HeadingNode = ({ node }) => {
  // 深さに応じて適切なコンポーネントを選択
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

  // 子要素のテキストを再帰的に取得
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

  // ID属性に取得したテキストをエンコードして設定
  return (
    <Component id={encodeURIComponent(childrenText)}>
      <NodesRenderer nodes={node.children} />
    </Component>
  );
};

/**
 * テキストノードのレンダリング定義
 */
const TextNode = ({ node }) => {
  return node.value;
};

/**
 * 段落ノードのレンダリング定義
 */
const ParagraphNode = ({ node }) => {
  return (
    <p>
      <NodesRenderer nodes={node.children} />
    </p>
  );
};

/**
 * ブロックリンクノードのレンダリング定義
 */
const BlockLinkNode = ({ node }) => {
  return (
    <div className={classes.embeded}>
      <RichLinkCard href={node.url} isExternal />
    </div>
  );
};
