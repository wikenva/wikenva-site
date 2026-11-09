/** @jsxImportSource @/lib/tx */
import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb } from "lucide-react";
import { pageHead } from "@/lib/seo";
import { AudiencePage } from "@/components/site/AudiencePage";

export const Route = createFileRoute("/createurs")({
  head: ({ match }) =>
    pageHead(
      "Espace des créateurs de contenu",
      "Présentez et commercialisez vos créations digitales sur WIKENVA : guides PDF, formations, ressources éducatives, modèles et contenus professionnels.",
      "/createurs", match.context.lang,
    ),
  component: () => (
    <AudiencePage
      eyebrow="Espace des créateurs"
      title="Donnez de la valeur à vos créations digitales."
      intro="Formateurs, designers, experts et créateurs : WIKENVA veut vous permettre de présenter et commercialiser vos produits numériques originaux."
      icon={Lightbulb}
      listTitle="Les créations accueillies"
      items={[
        "Guides et documents PDF.",
        "Formations numériques.",
        "Ressources éducatives.",
        "Modèles et fichiers numériques.",
        "Contenus professionnels.",
        "Produits numériques originaux.",
      ]}
      note="Chaque créateur devra détenir les droits sur les contenus proposés. Les conditions de publication seront communiquées à l'ouverture de l'espace créateurs."
    />
  ),
});
