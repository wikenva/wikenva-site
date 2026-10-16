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
        title="Les informations du token, rien que les informations confirmées."
        lede="L'offre totale est de 100 000 000 de tokens. Le symbole, la blockchain et l'adresse du contrat attendent une confirmation officielle. Le token n'est pas présenté comme déployé."
      />
      <div className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8">
        <TokenPanel />
      </div>
    </SiteShell>
  );
}
