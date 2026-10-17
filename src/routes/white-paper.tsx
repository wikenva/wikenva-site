import { createFileRoute } from "@tanstack/react-router";
import { pageMeta, site } from "@/content/site";
import { founderDecisions, paperMeta, paperSections } from "@/content/whitepaper";
import { SiteShell } from "@/components/site/shell";
import { useLang } from "@/lib/locale";

export const Route = createFileRoute("/white-paper")({
  head: () =>
    pageMeta(
      "White paper — WIKENVA",
      "Version de relecture du livre blanc WIKENVA. Faits confirmés et points encore ouverts. Aucun rendement n'est promis.",
    ),
  component: WhitepaperPage,
});

function WhitepaperPage() {
  const { lang } = useLang();
  const L = lang === "en" ? "en" : "fr";
  return (
    <SiteShell>
      <article className="paper bg-ink text-fg">
        <header className="border-b border-line">
          <div className="mx-auto grid w-full max-w-3xl gap-6 px-5 py-10 md:px-8 md:py-14">
            <img src="/media/logo-official.jpg" alt="" width={1024} height={1024} decoding="async" className="h-12 w-auto" />
            <p className="text-sm font-semibold tracking-[0.18em] text-gold uppercase">{paperMeta.status[L]}</p>
            <div>
              <p className="font-display text-sm tracking-[0.22em] text-muted uppercase">{site.name}</p>
              <h1 className="mt-2 font-display text-4xl font-semibold md:text-6xl">{paperMeta.coverTitle[L]}</h1>
              <p className="mt-4 max-w-xl text-lg text-muted">{paperMeta.coverLede[L]}</p>
            </div>
            <dl className="grid gap-3 border-t border-line pt-5 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-faint">{L === "fr" ? "Fondateur" : "Founder"}</dt>
                <dd className="mt-1 font-semibold">{paperMeta.founder}</dd>
                <dd className="text-muted">{paperMeta.role[L]}</dd>
              </div>
              <div>
                <dt className="text-faint">{L === "fr" ? "Écosystème" : "Ecosystem"}</dt>
                <dd className="mt-1 font-semibold">SidraChain</dd>
                <dd>
                  <a className="text-gold" href={site.sidrachainUrl}>
                    sidrachain.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-faint">{L === "fr" ? "Site indiqué" : "Stated website"}</dt>
                <dd className="mt-1">
                  <a className="text-gold" href={paperMeta.website}>
                    www.wikenva.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-faint">SidraStart</dt>
                <dd className="mt-1">
                  <a className="text-gold" href={site.investUrl ?? ""}>
                    Digital Marketplace Ebook
                  </a>
                </dd>
              </div>
            </dl>
            <p className="border border-gold/40 bg-panel px-4 py-3 text-sm text-muted">{paperMeta.disclaimer[L]}</p>
            <a
              href="/wikenva-livre-blanc.pdf"
              download="WIKENVA-livre-blanc.pdf"
              className="no-print inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gold px-5 text-sm font-semibold text-ink sm:w-auto print:hidden"
            >
              {L === "fr" ? "Télécharger le livre blanc" : "Download the white paper"}
            </a>
          </div>
        </header>

        <nav className="border-b border-line print:hidden" aria-label={L === "fr" ? "Sommaire" : "Contents"}>
          <ol className="mx-auto grid w-full max-w-3xl gap-2 px-5 py-6 md:px-8">
            <li className="font-display text-lg font-semibold">{L === "fr" ? "Sommaire" : "Contents"}</li>
            {paperSections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-sm text-muted hover:text-fg">
                  <span className="mr-2 text-gold tabular-nums">{section.index}</span>
                  {section.title[L]}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mx-auto w-full max-w-3xl px-5 py-8 md:px-8 md:py-10">
          {paperSections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-20 border-b border-line py-8">
              <p className="text-sm font-semibold tracking-[0.16em] text-gold tabular-nums">{section.index}</p>
              <h2 className="mt-2 font-display text-2xl font-semibold md:text-3xl">{section.title[L]}</h2>
              <div className="mt-4 grid gap-4 text-base leading-relaxed text-muted">
                {section.blocks.map((block, index) => {
                  if (block.type === "note" && block.text) {
                    return (
                      <p key={index} className="border-l-2 border-gold pl-4 text-fg">
                        {block.text[L]}
                      </p>
                    );
                  }
                  if (block.type === "items" && block.items) {
                    return (
                      <ul key={index} className="grid list-disc gap-2 pl-5">
                        {block.items.map((item) => (
                          <li key={item.fr}>{item[L]}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={index}>{block.text?.[L]}</p>;
                })}
              </div>
              <p className="mt-6 text-xs tracking-wide text-faint uppercase">WIKENVA · {paperMeta.coverTitle[L]} · {section.index}</p>
            </section>
          ))}

          <section className="py-8">
            <h2 className="font-display text-2xl font-semibold">
              {L === "fr" ? "Décisions à prendre par le fondateur" : "Decisions for the founder"}
            </h2>
            <ol className="mt-4 grid list-decimal gap-3 pl-5 text-muted">
              {founderDecisions.map((item) => (
                <li key={item.fr}>{item[L]}</li>
              ))}
            </ol>
          </section>
        </div>
      </article>
    </SiteShell>
  );
}
