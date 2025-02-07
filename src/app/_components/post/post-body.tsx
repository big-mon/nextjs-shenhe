import { MarkdownRenderer } from "@lib/markdown/markdownRenderer";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="mx-auto max-w-2xl px-5 md:px-0 leading-relaxed tracking-wider">
      <MarkdownRenderer>{content}</MarkdownRenderer>
    </div>
  );
}
