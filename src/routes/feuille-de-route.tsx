import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/content/site";
import { Roadmap } from "@/components/site/blocks";
import { SiteShell } from "@/components/site/shell";
import { PageHero } from "@/components/site/ui";

export const Route = createFileRoute("/feuille-de-route")({
  head: () =>
    pageMeta(
      "Feuille de route — WIKENVA",
      "Phases publiques de WIKENVA : fondation, développement, communauté, expansion et écosystème.",
    ),
  component: RoadmapPage,
});

function RoadmapPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Feuille de route"
        title="Cinq phases, prêtes à recevoir les vraies étapes."
        lede="Sélectionnez une phase pour en lire l'intention. Les statuts restent « À préciser » tant que WIKENVA n'a pas annoncé où en est le projet."
      />
      <div className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8">
        <Roadmap />
      </div>
    </SiteShell>
  );
}
