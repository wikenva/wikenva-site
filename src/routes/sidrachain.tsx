import { createFileRoute } from "@tanstack/react-router";
import { pageMeta, site } from "@/content/site";
import { SiteShell } from "@/components/site/shell";
import { Portrait } from "@/components/site/portrait";
import { ExternalLink, TextLink } from "@/components/site/ui";
import { useTr } from "@/lib/locale";

export const Route = createFileRoute("/sidrachain")({
  head: () =>
    pageMeta(
      "Découvrir SidraChain — WIKENVA",
      "Présentation du Dr. Mohammed Al Jefairi et de l'écosystème SidraChain. Informations à vérifier sur les sources officielles. Aucun rendement n'est promis.",
    ),
  component: SidraChainPage,
});

const sections = [
  {
    title: "La blockchain SidraChain",
    text: "SidraChain est présenté comme un projet de blockchain. Son objectif affiché est de rapprocher cette technologie des principes de la finance islamique, et de développer un écosystème numérique inspiré des valeurs de la charia. Cette page ne présente pas cette approche comme une certification officielle.",
  },
  {
    title: "Le système de récompenses",
    text: "SidraChain décrit, sur ses supports officiels, un mécanisme de récompenses pour les participants. Les montants, la fréquence et les conditions d'utilisation sont ceux publiés par SidraChain. Cette page n'en ajoute aucun et n'en garantit aucun.",
  },
  {
    title: "SidraStart et les autres initiatives",
    text: "SidraStart est l'espace où la fiche WIKENVA est publiée, sous le nom Digital Marketplace Ebook. Les autres initiatives sont celles que SidraChain publie sur son site officiel. Seules ces sources font foi.",
  },
] as const;

function SidraChainPage() {
  const tr = useTr();
  return (
    <SiteShell>
      <header className="border-b border-line">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-start gap-6 px-5 py-8 sm:flex-row sm:items-center md:gap-8 md:px-8 md:py-12">
          <img
            src="/media/sidra-logo.png"
            alt={tr("Logo SidraChain")}
            width={1024}
            height={1024}
            decoding="async"
            className="h-40 w-40 shrink-0 bg-black object-contain sm:h-44 sm:w-44"
          />
          <div>
            <p className="text-sm font-semibold tracking-widest text-gold uppercase">{tr("Écosystème")}</p>
            <h1 className="mt-2 font-display text-3xl font-semibold md:text-5xl">{tr("Découvrir SidraChain")}</h1>
            <p className="mt-3 max-w-xl text-base text-muted">
              {tr("Le projet, son fondateur et ses initiatives. À lire avant toute participation. Aucun rendement n'est promis.")}
            </p>
            <TextLink to="/presentation" variant="ghost" className="mt-5">
              {tr("Retour à WIKENVA")}
            </TextLink>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-3xl gap-10 px-5 py-8 md:px-8 md:py-12">
        <section>
          <Portrait
            src="/media/sidra-founder.jpg"
            alt="Portrait du Dr. Mohammed Al Jefairi."
            name="Dr. Mohammed Al Jefairi"
            role="Présenté comme le fondateur de SidraChain"
          />
          <p className="mt-3 text-muted">
            {tr("Le Dr. Mohammed Al Jefairi, souvent désigné par les initiales MJ, est présenté comme un entrepreneur, inventeur et auteur qatari associé au projet SidraChain.")}
          </p>
          <p className="mt-3 text-sm text-muted">
            {tr("Informations sous réserve des sources officielles.")}
          </p>
        </section>

        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-2xl font-semibold">{tr(section.title)}</h2>
            <p className="mt-3 text-muted">{tr(section.text)}</p>
          </section>
        ))}

        <section className="rounded-3xl border border-line bg-panel p-5">
          <h2 className="font-display text-2xl font-semibold">{tr("L'ambition de WIKENVA")}</h2>
          <p className="mt-3 text-muted">
            {tr("Découvrir l'écosystème. Aucun rendement promis.")}
          </p>
          <p className="mt-4 text-sm font-semibold text-gold">{tr("WIKENVA et SidraChain — découvrir, comprendre et innover.")}</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <ExternalLink href={site.sidrachainUrl} variant="gold" className="w-full sm:w-auto">
              {tr("Site officiel SidraChain")}
            </ExternalLink>
            <ExternalLink href={site.investUrl ?? ""} variant="ghost" className="w-full sm:w-auto">
              {tr("Fiche SidraStart")}
            </ExternalLink>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
