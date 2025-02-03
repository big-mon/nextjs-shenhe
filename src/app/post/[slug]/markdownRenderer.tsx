import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { CustomImage } from "./custom-image";
import styles from "@styles/markdown.module.scss";

/**
 * Markdownテキストを解析してReactコンポーネントを生成する
 */
export const MarkdownRenderer = async ({ children }) => {
  // remarkインスタンスを生成しプラグインを適用
  const parseMarkdown = remark().use(remarkBreaks).use(remarkGfm);

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
      case "text":
      case "linkReference":
      case "definition": {
        // テキストノード
        return node.value;
      }
      case "paragraph": {
        // 段落ノード
        return (
          <p className={styles.paragraph}>
            <NodesRenderer nodes={node.children} />
          </p>
        );
      }
      case "inlineCode": {
        // インラインコードノード
        return <code>{node.value}</code>;
      }
      case "blockquote": {
        // ブロック引用ノード
        return (
          <blockquote className={styles.blockquote}>
            <NodesRenderer nodes={node.children} />
          </blockquote>
        );
      }
      case "link": {
        // リンクノード
        return (
          <a href={node.url} target="_blank" rel="noreferrer">
            <NodesRenderer nodes={node.children} />
          </a>
        );
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
        return (
          <strong>
            <NodesRenderer nodes={node.children} />
          </strong>
        );
      }
      case "emphasis": {
        // 斜体ノード
        return (
          <em>
            <NodesRenderer nodes={node.children} />
          </em>
        );
      }
      case "break": {
        // 改行ノード
        return <br />;
      }
      case "image": {
        // 画像ノード
        return <CustomImage src={node.url} alt={node.alt} title={node.title} />;
      }
      case "code": {
        // コードブロックノード
        return (
          <div
            className={styles.codeblock}
            dangerouslySetInnerHTML={{ __html: node.value }}
          />
        );
      }
      case "delete": {
        // 削除ノード
        return (
          <del>
            <NodesRenderer nodes={node.children} />
          </del>
        );
      }
      case "table": {
        // 表ノード
        return <TableNode key={index} node={node} />;
      }
      case "thematicBreak": {
        // 水平線ノード
        return <hr className={styles.line} />;
      }
      case "html": {
        // HTMLノード
        return (
          <div
            className={styles.box}
            key={index}
            dangerouslySetInnerHTML={{ __html: node.value }}
          />
        );
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
    <Component id={encodeURIComponent(childrenText)} className={styles.heading}>
      <NodesRenderer nodes={node.children} />
    </Component>
  );
};

/**
 * リストノードのレンダリング定義
 */
const ListNode = ({ node }) => {
  return node.ordered ? (
    <ol className={styles.list}>
      <NodesRenderer nodes={node.children} />
    </ol>
  ) : (
    <ul className={styles.list}>
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
 * 表ノードのレンダリング定義
 */
const TableNode = ({ node }) => {
  const [headRow, ...bodyRows] = node.children;
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {headRow.children.map((cell, index) => (
            <th key={index} className={styles[node.align?.[index] ?? "left"]}>
              <NodesRenderer nodes={cell.children} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {bodyRows.map((row, index) => (
          <tr key={index}>
            {row.children.map((cell, index) => (
              <td key={index} className={styles[node.align?.[index] ?? "left"]}>
                <NodesRenderer nodes={cell.children} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
