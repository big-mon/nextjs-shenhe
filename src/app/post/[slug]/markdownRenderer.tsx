import { remark } from "remark";
import remarkGfm from "remark-gfm";
import { remarkBlockLink } from "@lib/markdown/remark-block-link";
import CustomImage from "./custom-image";

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
      case "inlineCode": {
        // インラインコードノード
        return <InlineCodeNode key={index} node={node} />;
      }
      case "blockquote": {
        // ブロック引用ノード
        return <BlockQuoteNode key={index} node={node} />;
      }
      case "link": {
        // リンクノード
        return <LinkNode key={index} node={node} />;
      }
      case "list": {
        // リストノード
        return <ListNode key={index} node={node} />;
      }
      case "listItem": {
        // リストアイテムノード
        return <ListItemNode key={index} node={node} />;
      }
      case "strong": {
        // 太字ノード
        return <StrongNode key={index} node={node} />;
      }
      case "image": {
        // 画像ノード
        return <ImageNode key={index} node={node} />;
      }
      case "code": {
        // コードブロックノード
        return <CodeNode key={index} node={node} />;
      }
      case "delete": {
        // 削除ノード
        return <DeleteNode key={index} node={node} />;
      }
      case "table": {
        // 表ノード
        return <TableNode key={index} node={node} />;
      }
      case "thematicBreak": {
        // 水平線ノード
        return <ThematicBreakNode key={index} node={node} />;
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
 * インラインコードノードのレンダリング定義
 */
const InlineCodeNode = ({ node }) => {
  return <code>{node.value}</code>;
};

/**
 * ブロック引用ノードのレンダリング定義
 */
const BlockQuoteNode = ({ node }) => {
  return (
    <blockquote>
      <NodesRenderer nodes={node.children} />
    </blockquote>
  );
};

/**
 * リンクノードのレンダリング定義
 */
const LinkNode = ({ node }) => {
  return (
    <a href={node.url} target="_blank" rel="noreferrer">
      <NodesRenderer nodes={node.children} />
    </a>
  );
};

/**
 * リストノードのレンダリング定義
 */
const ListNode = ({ node }) => {
  return node.ordered ? (
    <ol>
      <NodesRenderer nodes={node.children} />
    </ol>
  ) : (
    <ul>
      <NodesRenderer nodes={node.children} />
    </ul>
  );
};

/**
 * リストアイテムノードのレンダリング定義
 */
const ListItemNode = ({ node }) => {
  if (node.children.length === 1 && node.children[0].type === "paragraph") {
    return (
      <li>
        <NodesRenderer nodes={node.children[0].children} />
      </li>
    );
  }

  return (
    <li>
      <NodesRenderer nodes={node.children} />
    </li>
  );
};

/**
 * 太字ノードのレンダリング定義
 */
const StrongNode = ({ node }) => {
  return (
    <strong>
      <NodesRenderer nodes={node.children} />
    </strong>
  );
};

/**
 * 画像ノードのレンダリング定義
 */
const ImageNode = ({ node }) => {
  return (
    <a href={node.url} target="_blank" rel="noreferrer">
      <CustomImage src={node.url} alt={node.alt ?? ""} />
    </a>
  );
};

/**
 * 削除ノードのレンダリング定義
 */
const DeleteNode = ({ node }) => {
  return (
    <del>
      <NodesRenderer nodes={node.children} />
    </del>
  );
};

/**
 * 表ノードのレンダリング定義
 */
const TableNode = ({ node }) => {
  const [headRow, ...bodyRows] = node.children;
  return (
    <table>
      <thead>
        <tr>
          {headRow.children.map((cell, index) => (
            <th
              key={index}
              style={{ textAlign: node.align?.[index] ?? undefined }}
            >
              <NodesRenderer nodes={cell.children} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {bodyRows.map((row, index) => (
          <tr key={index}>
            {row.children.map((cell, index) => (
              <td
                key={index}
                style={{ textAlign: node.align?.[index] ?? undefined }}
              >
                <NodesRenderer nodes={cell.children} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

/**
 * 水平線ノードのレンダリング定義
 */
const ThematicBreakNode = () => {
  return <hr />;
};

/**
 * コードブロックノードのレンダリング定義
 */
const CodeNode = ({ node }) => {
  const lang = node.lang ?? "";
  return <div dangerouslySetInnerHTML={{ __html: node.value }} />;
};

/**
 * ブロックリンクノードのレンダリング定義
 */
const BlockLinkNode = ({ node }) => {
  return (
    <div>
      <RichLinkCard href={node.url} isExternal />
    </div>
  );
};
