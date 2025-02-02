import { MarkdownRenderer } from "./markdownRenderer";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <MarkdownRenderer>{content}</MarkdownRenderer>
    </div>
  );
}
