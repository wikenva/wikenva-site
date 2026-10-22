import { createFileRoute } from "@tanstack/react-router";
import { pageMeta, type ProseBlock } from "@/content/site";
import { LegalPage } from "@/components/site/legal";

export const Route = createFileRoute("/confidentialite")({
  head: () =>
    pageMeta(
      "Confidentialité — WIKENVA",
      "Politique de confidentialité du site WIKENVA.",
    ),
  component: PrivacyPage,
});

function PrivacyPage() {
  const blocks: ProseBlock[] = [
    {
      heading: "Responsable",
      paragraphs: [
        "L'identité du responsable de traitement est à compléter. Responsable — À compléter. Contact confidentialité — contact.wikenva@gmail.com. Téléphone — +229 01 96 41 21 17.",
      ],
    },
    {
      heading: "Compte",
      paragraphs: [
        "Les informations communiquées au site restent réservées aux administrateurs autorisés. Elles ne confirment pas un investissement.",
      ],
    },
    {
      heading: "Durée et effacement",
      paragraphs: [
        "Une demande d'accès, de rectification ou d'effacement peut être adressée à contact.wikenva@gmail.com.",
      ],
    },
    {
      heading: "Cookies et mesure d'audience",
      paragraphs: [
        "Ce site ne décrit pas de cookie publicitaire. Aucun outil de mesure d'audience n'est déclaré ici. S'il en est ajouté un, cette page sera mise à jour.",
      ],
    },
  ];

  return (
    <LegalPage
      title="Politique de confidentialité"
      lede="Ce que le site recueille réellement, et ce qu'il ne transmet pas encore."
      blocks={blocks}
    />
  );
}
