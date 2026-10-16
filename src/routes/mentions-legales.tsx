import { createFileRoute } from "@tanstack/react-router";
import { mentionsLegales, pageMeta } from "@/content/site";
import { LegalPage } from "@/components/site/legal";

export const Route = createFileRoute("/mentions-legales")({
  head: () => pageMeta("Mentions légales — WIKENVA", "Mentions légales du site officiel WIKENVA."),
  component: function Mentions() {
    return (
      <LegalPage
        title="Mentions légales"
        lede="Identité publiée et identité encore absente. Rien n'est supposé."
        blocks={mentionsLegales}
      />
    );
  },
});
