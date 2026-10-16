import type { ReactNode } from "react";
import type { ProseBlock } from "@/content/site";
import { useTr } from "@/lib/locale";
import { SiteShell } from "./shell";
import { PageHero } from "./ui";

export function LegalPage({
  title,
  lede,
  blocks,
  extra,
}: {
  title: string;
  lede: string;
  blocks: ProseBlock[];
  extra?: ReactNode;
}) {
  const tr = useTr();
  return (
    <SiteShell>
      <PageHero eyebrow="Transparence" title={title} lede={lede} />
      <div className="mx-auto grid w-full max-w-3xl gap-8 px-5 py-8 md:px-8">
        {blocks.map((block) => (
          <section key={block.heading}>
            <h2 className="font-display text-2xl font-semibold">{tr(block.heading)}</h2>
            <div className="mt-4 grid gap-4">
              {block.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-muted">
                  {tr(paragraph)}
                </p>
              ))}
            </div>
          </section>
        ))}
        {extra}
      </div>
    </SiteShell>
  );
}
