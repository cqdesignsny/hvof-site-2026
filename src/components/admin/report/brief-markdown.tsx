import { renderMarkdown } from "./markdown";

type Props = {
  markdown: string;
};

export function BriefMarkdown({ markdown }: Props) {
  return (
    <div
      className="prose-rec space-y-3 text-[15px] leading-relaxed text-foreground/85
        [&>h3]:text-xl [&>h3]:mt-6 [&>h4]:text-lg [&>h4]:mt-5
        [&_p]:text-foreground/75 [&_li]:text-foreground/75
        [&_strong]:text-foreground [&_strong]:font-semibold"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
    />
  );
}
