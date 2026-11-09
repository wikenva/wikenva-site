/** @jsxImportSource @/lib/tx */
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { pageHead } from "@/lib/seo";
import { AudiencePage } from "@/components/site/AudiencePage";

export const Route = createFileRoute("/lecteurs")({
  head: ({ match }) =>
    pageHead(
      "Espace des lecteurs",
      "Découvrez des ebooks sur WIKENVA : catégories, présentations d'ouvrages, achats numériques et bibliothèque personnelle.",
      "/lecteurs", match.context.lang,
    ),
  component: () => (
    <AudiencePage
      eyebrow="Espace des lecteurs"
      title="Découvrez, achetez et retrouvez vos lectures numériques."
      intro="Un catalogue d'ebooks et de contenus numériques présentés honnêtement, dans un environnement respectueux de vos valeurs."
      icon={BookOpen}
      listTitle="Ce que permettra l'espace lecteurs"
      items={[
        "Découvrir des ebooks.",
        "Explorer différentes catégories.",
        "Consulter les présentations des ouvrages.",
        "Acheter des contenus numériques.",
        "Retrouver leurs achats dans leur bibliothèque.",
        "Télécharger leurs fichiers selon les conditions de licence.",
      ]}
      note="L'espace lecteurs ouvrira avec la marketplace. Chaque produit précisera clairement ses conditions de licence et de téléchargement avant l'achat."
    />
  ),
});
