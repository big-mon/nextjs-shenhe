import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkTwitter from "./remark-twitter";
import remarkYouTube from "./remark-youtube";
import { CustomImage } from "app/post/[slug]/_components/custom-image";
import { CustomLink } from "app/post/[slug]/_components/custom-link";
import HeadingNode from "./headingNode";
import ListNode from "./listNode";
import ListItemNode from "./listItemNode";
import TableNode from "./tableNode";
import {
  Root,
  Heading,
  Paragraph,
  List,
  ListItem,
  Table,
  Code,
  Blockquote,
  Text,
  Strong,
  Emphasis,
  Delete,
  InlineCode,
  Image,
  Link,
  Html,
} from "mdast";
import { MarkdownRendererProps, NodesRendererProps } from "@interfaces/mdast";
import { getCloudinaryBlurredSrc } from "@lib/cloudinary";
import styles from "@styles/markdown.module.scss";

/**
 * Markdownテキストを解析してReactコンポーネントを生成する
 */
export const MarkdownRenderer = async ({ children }: MarkdownRendererProps) => {
  // remarkインスタンスを生成しプラグインを適用
  const parseMarkdown = remark()
    .use(remarkBreaks)
    .use(remarkGfm)
    .use(remarkTwitter)
    .use(remarkYouTube);

  // Markdownテキストを解析し、Markdown Abstract Syntax Treeを生成
  const parsed = parseMarkdown.parse(children);

  // MDASTから最終的な構造を取得
  const mdastRoot = (await parseMarkdown.run(parsed)) as Root;

  // MDASTをReactコンポーネントに変換
  return <NodesRenderer nodes={mdastRoot.children} />;
};

/**
 * MDASTノード配列を対応したReactコンポーネントに変換する
 */
export const NodesRenderer = ({ nodes }: NodesRendererProps) => {
  return nodes.map(async (node, index) => {
    switch (node.type) {
      case "heading": {
        // 見出しノード(h1など)
        return <HeadingNode key={index} node={node as Heading} />;
      }
      case "text":
      case "linkReference":
      case "definition": {
        // テキストノード
        return (node as Text).value;
      }
      case "paragraph": {
        // 段落ノード
        return (
          <p className={styles.paragraph}>
            <NodesRenderer nodes={(node as Paragraph).children} />
          </p>
        );
      }
      case "inlineCode": {
        // インラインコードノード
        return <code>{(node as InlineCode).value}</code>;
      }
      case "blockquote": {
        // ブロック引用ノード
        return (
          <blockquote className={styles.blockquote}>
            <NodesRenderer nodes={(node as Blockquote).children} />
          </blockquote>
        );
      }
      case "link": {
        // リンクノード
        return <CustomLink key={index} node={node as Link} />;
      }
      case "list": {
        // リストノード
        return <ListNode key={index} node={node as List} />;
      }
      case "listItem": {
        // リストアイテムノード
        return <ListItemNode key={index} node={node as ListItem} />;
      }
      case "strong": {
        // 太字ノード
        return (
          <strong>
            <NodesRenderer nodes={(node as Strong).children} />
          </strong>
        );
      }
      case "emphasis": {
        // 斜体ノード
        return (
          <em>
            <NodesRenderer nodes={(node as Emphasis).children} />
          </em>
        );
      }
      case "break": {
        // 改行ノード
        return <br />;
      }
      case "image": {
        // 画像ノード
        const imageBlurUrl = await getCloudinaryBlurredSrc(node.url);
        return (
          <CustomImage
            src={(node as Image).url}
            alt={(node as Image).alt ?? undefined}
            title={(node as Image).title ?? undefined}
            blurredSrc={imageBlurUrl}
          />
        );
      }
      case "code": {
        // コードブロックノード
        return (
          <div
            className={styles.codeblock}
            dangerouslySetInnerHTML={{ __html: (node as Code).value }}
          />
        );
      }
      case "delete": {
        // 削除ノード
        return (
          <del>
            <NodesRenderer nodes={(node as Delete).children} />
          </del>
        );
      }
      case "table": {
        // 表ノード
        return <TableNode key={index} node={node as Table} />;
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
            dangerouslySetInnerHTML={{ __html: (node as Html).value }}
          />
        );
      }
      case "twitter": {
        // Twitterノード
        return (
          <div className="twitter-embed">
            <blockquote className="twitter-tweet">
              <a
                href={`https://twitter.com/user/status/${node.value}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter: {node.value}
              </a>
            </blockquote>
            <script async src="https://platform.twitter.com/widgets.js" />
          </div>
        );
      }
      case "youtube": {
        // YouTubeノード
        return (
          <div className="youtube-embed">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${node.value}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
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
