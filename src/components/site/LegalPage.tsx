/** @jsxImportSource @/lib/tx */
import { useLang } from "@/lib/i18n";
import { translate } from "@/lib/tx/core";
import type { ReactNode } from "react";
import { Container, PageHeader } from "./Section";

export function LegalPage({
  eyebrow,
  title,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  sections: { title: string; body: ReactNode }[];
}) {
  const { lang } = useLang();
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} intro={lang === "en" ? `Last update: ${translate(updated, "en")}` : `Dernière mise à jour : ${updated}`} />
      <section className="py-16">
        <Container className="max-w-3xl">
          <div className="space-y-10">
            {sections.map((s, i) => (
              <article key={s.title}>
                <h2 className="text-xl font-bold text-foreground">
                  {i + 1}. {s.title}
                </h2>
                <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">{s.body}</div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
