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
        title="Cinq phases."
        lede="Les statuts restent « À préciser » tant qu'ils ne sont pas annoncés."
      />
      <div className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8">
        <Roadmap />
      </div>
    </SiteShell>
  );
}
