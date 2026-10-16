import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/content/site";
import { DocumentList } from "@/components/site/blocks";
import { SiteShell } from "@/components/site/shell";
import { PageHero } from "@/components/site/ui";

export const Route = createFileRoute("/documents")({
  head: () =>
    pageMeta("Documents officiels — WIKENVA", "Documents publics de WIKENVA. Les fichiers non publiés restent indiqués."),
  component: DocumentsPage,
});

function DocumentsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Documents"
        title="Les pièces officielles, au fur et à mesure."
        lede="White paper, fiche du token et feuille de route. Un document externe n'est lié que lorsqu'il est publié."
      />
      <div className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8">
        <DocumentList />
      </div>
    </SiteShell>
  );
}
