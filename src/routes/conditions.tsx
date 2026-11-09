/** @jsxImportSource @/lib/tx */
import { createFileRoute } from "@tanstack/react-router";
import { contact, deadlines, partnership } from "@/config/site";
import { pageHead } from "@/lib/seo";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/conditions")({
  head: ({ match }) =>
    pageHead(
      "Conditions d'utilisation",
      "Conditions d'utilisation du site de présentation WIKENVA et cadre du programme de partenariat.",
      "/conditions", match.context.lang,
    ),
  component: () => (
    <LegalPage
      eyebrow="Cadre d'utilisation"
      title="Conditions d'utilisation"
      updated="7 novembre 2026"
      sections={[
        {
          title: "Objet du site",
          body: <p>Ce site présente le projet WIKENVA — Digital Marketplace Ebook Halal et permet de déposer une candidature au programme de partenariat. Sa consultation ne nécessite aucun compte.</p>,
        },
        {
          title: "Nature des informations",
          body: <p>Les fonctionnalités de la marketplace sont présentées avec leur statut (disponible, en développement, prévu). Les éléments en développement ou prévus constituent des objectifs et ne sont pas garantis dans leur forme ni leur date.</p>,
        },
        {
          title: "Contributions",
          body: (
            <p>
              Les contributions s'effectuent exclusivement sur la page officielle du projet sur SidraStart, selon les
              conditions propres à cette plateforme, jusqu'au {deadlines.campaign.dateLabel} (heure de Porto-Novo). WIKENVA
              ne collecte aucun fonds via ce site.
            </p>
          ),
        },
        {
          title: "Programme de partenariat",
          body: (
            <>
              <p>{partnership.review}</p>
              <ul className="list-disc space-y-2 pl-5">
                {partnership.limits.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <p>Les candidatures sont acceptées jusqu'au {deadlines.partnership.dateLabel} (heure de Porto-Novo).</p>
            </>
          ),
        },
        {
          title: "Absence de conseil financier",
          body: <p>Rien sur ce site ne constitue un conseil en investissement, une offre de titres financiers ni une promesse de rendement. Tout engagement doit être réfléchi et effectué en connaissance de cause.</p>,
        },
        {
          title: "Liens externes",
          body: <p>Le site renvoie vers des plateformes tierces (SidraChain, SidraStart, SidraDex, réseaux sociaux) qui disposent de leurs propres conditions. WIKENVA n'est pas responsable de leur contenu.</p>,
        },
        {
          title: "Propriété intellectuelle",
          body: <p>Le nom WIKENVA, son logo et les contenus du site sont protégés. Toute reproduction sans autorisation est interdite.</p>,
        },
        {
          title: "Contact",
          body: <p>Pour toute question : {contact.email}.</p>,
        },
      ]}
    />
  ),
});
