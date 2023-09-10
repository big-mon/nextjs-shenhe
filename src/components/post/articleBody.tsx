import styles from "styles/article.module.scss";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import PostImage from "./image";
import CodeBlock from "./codeBlock";
import CustomLink from "./customLink";

/** 記事本文 */
export default function ArticleBody({ content }: { content: string }) {
  return (
    <ReactMarkdown
      className={styles.article}
      remarkPlugins={[remarkGfm, remarkBreaks]}
      rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }], rehypeRaw]}
      components={{
        h1: "h2",
        h2: "h3",
        h3: "h4",
        h4: "h5",
        h5: "h6",
        img: PostImage,
        code: CodeBlock,
        a: CustomLink,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
