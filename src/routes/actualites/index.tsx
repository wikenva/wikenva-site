import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { categoryLabels, news, pageMeta, type NewsCategory } from "@/content/site";
import { NewsCards } from "@/components/site/blocks";
import { SiteShell } from "@/components/site/shell";
import { PageHero } from "@/components/site/ui";
import { cn } from "@/lib/cn";
import { useTr } from "@/lib/locale";

const filters: Array<{ id: "toutes" | NewsCategory; label: string }> = [
  { id: "toutes", label: "Toutes" },
  { id: "projet", label: categoryLabels.projet },
  { id: "developpement", label: categoryLabels.developpement },
  { id: "annonce", label: categoryLabels.annonce },
  { id: "partenariat", label: categoryLabels.partenariat },
  { id: "evenement", label: categoryLabels.evenement },
  { id: "roadmap", label: categoryLabels.roadmap },
  { id: "publication", label: categoryLabels.publication },
];

export const Route = createFileRoute("/actualites/")({
  head: () =>
    pageMeta(
      "Actualités — WIKENVA",
      "Annonces officielles, mises à jour, partenariats, événements et étapes de la feuille de route de WIKENVA.",
    ),
  component: NewsPage,
});

function NewsPage() {
  const tr = useTr();
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("toutes");
  const items = filter === "toutes" ? news : news.filter((item) => item.category === filter);

  return (
    <SiteShell>
      <PageHero
        eyebrow="Actualités"
        title="Annonces confirmées."
        lede="Rien n'est publié tant que ce n'est pas confirmé."
      />
      <div className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label={tr("Catégories")}>
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={filter === item.id}
              onClick={() => setFilter(item.id)}
              className={cn(
                "min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold",
                filter === item.id ? "border-gold bg-gold text-ink" : "border-line text-muted",
              )}
            >
              {tr(item.label)}
            </button>
          ))}
        </div>
        <div className="mt-8">
          <NewsCards items={items} />
        </div>
      </div>
    </SiteShell>
  );
}
