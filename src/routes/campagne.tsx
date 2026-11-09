/** @jsxImportSource @/lib/tx */
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { CampaignBlock } from "@/components/site/CampaignBlock";
import { PartnerCta } from "@/components/site/PartnerCta";

export const Route = createFileRoute("/campagne")({
  head: ({ match }) =>
    pageHead(
      "Campagne de contribution SidraStart",
      "Comptes à rebours officiels : fin des candidatures le 10 décembre 2026, clôture de la campagne SidraStart le 24 décembre 2026.",
      "/campagne", match.context.lang,
    ),
  component: () => (
    <>
      <CampaignBlock headingLevel="h1" />
      <PartnerCta />
    </>
  ),
});
