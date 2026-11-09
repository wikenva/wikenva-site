/** @jsxImportSource @/lib/tx */
import { createFileRoute } from "@tanstack/react-router";
import { PenLine } from "lucide-react";
import { pageHead } from "@/lib/seo";
import { AudiencePage } from "@/components/site/AudiencePage";

export const Route = createFileRoute("/auteurs")({
  head: ({ match }) =>
    pageHead(
      "Espace des auteurs",
      "Publiez vos livres numériques sur WIKENVA : présentation des ouvrages, gestion des publications, audience et suivi des ventes.",
      "/auteurs", match.context.lang,
    ),
  component: () => (
    <AudiencePage
      eyebrow="Espace des auteurs"
      title="Publiez vos livres numériques et faites grandir votre audience."
      intro="WIKENVA veut offrir aux auteurs indépendants un espace professionnel pour diffuser leurs ouvrages auprès d'un public international."
      icon={PenLine}
      listTitle="Ce que permettra l'espace auteurs"
      items={[
        "Publier leurs livres numériques.",
        "Présenter leurs ouvrages.",
        "Gérer leurs publications.",
        "Développer leur audience.",
        "Suivre leurs ventes.",
        "Accéder à un espace professionnel de gestion.",
      ]}
      note="Ces fonctionnalités sont en cours de développement et seront proposées selon les fonctionnalités disponibles sur la marketplace à son ouverture. Les auteurs conservent la propriété de leurs œuvres."
    />
  ),
});
