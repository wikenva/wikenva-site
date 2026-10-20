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
        title="Documents officiels."
        lede="Un lien n'apparaît que si le document est publié."
      />
      <div className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8">
        <DocumentList />
      </div>
    </SiteShell>
  );
}
