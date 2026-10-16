import { createFileRoute } from "@tanstack/react-router";
import { pageMeta, risques } from "@/content/site";
import { LegalPage } from "@/components/site/legal";

export const Route = createFileRoute("/risques")({
  head: () =>
    pageMeta(
      "Risques — WIKENVA",
      "Avertissement sur les risques liés aux crypto-actifs et à toute participation au projet WIKENVA.",
    ),
  component: function Risks() {
    return (
      <LegalPage
        title="Avertissement sur les risques"
        lede="À lire avant d'utiliser un lien d'investissement, lorsqu'il existera, ou de déposer une candidature."
        blocks={risques}
      />
    );
  },
});
