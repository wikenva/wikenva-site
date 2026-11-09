/** @jsxImportSource @/lib/tx */
import { createFileRoute } from "@tanstack/react-router";
import { contact } from "@/config/site";
import { pageHead } from "@/lib/seo";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/confidentialite")({
  head: ({ match }) =>
    pageHead(
      "Politique de confidentialité",
      "Comment WIKENVA collecte, utilise et protège les données personnelles transmises via le formulaire de candidature au partenariat.",
      "/confidentialite",
      match.context.lang,
    ),
  component: () => (
    <LegalPage
      eyebrow="Données personnelles"
      title="Politique de confidentialité"
      updated="8 novembre 2026"
      sections={[
        {
          title: "Responsable du traitement",
          body: (
            <p>
              Les données sont traitées par l'équipe WIKENVA, joignable à l'adresse {contact.email}.
            </p>
          ),
        },
        {
          title: "Données collectées",
          body: (
            <>
              <p>
                Lors d'une candidature au partenariat : nom complet, adresse e-mail, pays de
                résidence et, si vous les indiquez, numéro WhatsApp et motivation. Un code de suivi
                vous est remis ; seule son empreinte de hachage est conservée.
              </p>
              <p>
                Pour contrôler la contribution déclarée, nous enregistrons le hash de transaction et
                les informations techniques associées : adresses source et destination, montant,
                numéro de bloc, date et résultat du contrôle SidraChain.
              </p>
              <p>
                Pour lutter contre les abus, une empreinte de hachage non réversible de votre
                adresse IP est conservée. Aucune phrase secrète, clé privée, mot de passe ni
                connexion de portefeuille n'est jamais demandé.
              </p>
            </>
          ),
        },
        {
          title: "Finalités",
          body: (
            <p>
              Examiner votre candidature, vérifier la transaction déclarée, prévenir les
              utilisations abusives, vous permettre de suivre son statut, vous recontacter et, le
              cas échéant, formaliser l'accord de partenariat. Les données ne sont ni vendues ni
              utilisées à des fins publicitaires.
            </p>
          ),
        },
        {
          title: "Accès et sécurité",
          body: (
            <p>
              Les candidatures sont stockées dans une base de données sécurisée, accessible
              uniquement aux membres autorisés de l'équipe WIKENVA via un espace privé protégé.
            </p>
          ),
        },
        {
          title: "Durée de conservation",
          body: (
            <p>
              Les données sont conservées pendant la durée nécessaire à l'examen des candidatures et
              à la gestion du partenariat, puis supprimées ou anonymisées, sauf obligation légale
              contraire.
            </p>
          ),
        },
        {
          title: "Vos droits",
          body: (
            <p>
              Vous pouvez demander l'accès, la rectification ou la suppression de vos données, ou
              retirer votre candidature, en écrivant à {contact.email}.
            </p>
          ),
        },
        {
          title: "Cookies",
          body: (
            <p>
              Le site public n'utilise pas de cookies publicitaires. Seul l'espace privé de l'équipe
              utilise une session de connexion.
            </p>
          ),
        },
      ]}
    />
  ),
});
