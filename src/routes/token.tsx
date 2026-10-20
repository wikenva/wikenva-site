import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/content/site";
import { TokenPanel } from "@/components/site/blocks";
import { SiteShell } from "@/components/site/shell";
import { PageHero } from "@/components/site/ui";

export const Route = createFileRoute("/token")({
  head: () =>
    pageMeta(
      "WIKENVA TOKEN",
      "Fiche du WIKENVA TOKEN : nom, symbole, blockchain, offre, contrat, utilité et tokenomics.",
    ),
  component: TokenPage,
});

function TokenPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="WIKENVA TOKEN"
        title="Token : seulement ce qui est confirmé."
        lede="100 000 000 de tokens. Symbole, chaîne et contrat : à confirmer."
      />
      <div className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8">
        <TokenPanel />
      </div>
    </SiteShell>
  );
}
