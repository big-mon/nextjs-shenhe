import styles from "styles/article.module.scss";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import PostImage from "./image";
import CodeBlock from "./codeBlock";
import CustomLink from "./customLink";

/** 記事本文 */
const ArticleBody = ({ content }: { content: string }) => {
  const convertResult = (
    <ReactMarkdown
      className={styles.article}
      remarkPlugins={[remarkGfm, remarkBreaks]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: "h2",
        h2: "h3",
        h3: "h4",
        h4: "h5",
        h5: "h6",
        /* @ts-expect-error Server Component */
        img: PostImage,
        code: CodeBlock,
        a: CustomLink,
      }}
    >
      {content}
    </ReactMarkdown>
  );

  return convertResult;
};

export default ArticleBody;
