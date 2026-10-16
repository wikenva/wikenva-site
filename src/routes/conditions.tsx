import { createFileRoute } from "@tanstack/react-router";
import { conditions, pageMeta } from "@/content/site";
import { LegalPage } from "@/components/site/legal";

export const Route = createFileRoute("/conditions")({
  head: () =>
    pageMeta("Conditions d'utilisation — WIKENVA", "Conditions d'utilisation du site officiel WIKENVA."),
  component: function Terms() {
    return (
      <LegalPage
        title="Conditions d'utilisation"
        lede="Ce site informe. Il ne promet pas un investissement, un rendement ou un droit."
        blocks={conditions}
      />
    );
  },
});
