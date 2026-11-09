/**
 * Configuration centrale du site WIKENVA.
 * Modifiez ici les textes clés, liens, dates, avantages et coordonnées :
 * toutes les pages lisent ces valeurs.
 */

import felixPhoto from "@/assets/team/felix_adjibodou_portrait.jpg.asset.json";
import evaristePhoto from "@/assets/team/evariste_gbaguidi_portrait.jpg.asset.json";
import collinsPhoto from "@/assets/team/collins_isibor_portrait.jpg.asset.json";

/** Équipe affichée sur la page Vision (cartes profils). Une ligne par fonction dans `roles`. */
export const team = [
  {
    firstName: "Félix",
    lastName: "ADJIBODOU",
    roles: ["CEO WIKENVA", "Fondateur"],
    photo: felixPhoto.url,
  },
  {
    firstName: "Evariste",
    lastName: "GBAGUIDI",
    roles: ["Développeur web"],
    photo: evaristePhoto.url,
  },
  {
    firstName: "Collins",
    lastName: "ISIBOR",
    roles: ["Spécialiste Marketing"],
    photo: collinsPhoto.url,
  },
];

export const brand = {
  name: "WIKENVA",
  project: "Digital Marketplace Ebook Halal",
  slogan: "Lire. Créer. Partager. Gagner.",
  sloganWords: ["Lire.", "Créer.", "Partager.", "Gagner."],
  tagline: "L'avenir du commerce numérique et du savoir.",
  description:
    "Une marketplace digitale internationale qui rapproche les auteurs, les lecteurs et les créateurs de contenu dans un environnement éthique, innovant et accessible.",
};

export const links = {
  officialSite: "https://wikenva-platforme.com",
  sidraStartProject: "https://www.sidrastart.com/project/a05c52a6-22e8-4c81-8049-cb5484422759",
  sidraStart: "https://www.sidrastart.com",
  sidraChain: "https://www.sidrachain.com",
  sidraChainExplorer: "https://ledger.sidrachain.com",
  sidraDex: "https://sidradex.com",
};

export const contact = {
  email: "contact.wikenva@gmail.com",
  /** Lien WhatsApp utilisé par le bouton « Contacter l'équipe ». */
  whatsapp: "https://chat.whatsapp.com/F4uZIGgqIYzDTP4PnInAIa",
};

export type SocialKey = "x" | "facebook" | "whatsapp" | "youtube" | "telegram";

/**
 * Liens officiels des réseaux sociaux. Laissez une valeur vide ("") tant que le compte
 * officiel n'existe pas : l'icône correspondante est alors masquée automatiquement.
 */
export const social: Record<SocialKey, { label: string; url: string }> = {
  x: { label: "X (Twitter)", url: "https://x.com/Wikenva" },
  facebook: { label: "Facebook", url: "https://www.facebook.com/people/Wikenva/61594737553362/" },
  whatsapp: { label: "WhatsApp", url: "https://chat.whatsapp.com/F4uZIGgqIYzDTP4PnInAIa" },
  youtube: { label: "YouTube", url: "" },
  telegram: { label: "Telegram", url: "https://t.me/+-vHI1dIZj-xlMzE0" },
};

/** Échéances officielles — fuseau Africa/Porto-Novo (UTC+1, sans heure d'été). */
export const deadlines = {
  timeZone: "Africa/Porto-Novo",
  partnership: {
    iso: "2026-12-10T23:59:00+01:00",
    label: "Fin des candidatures au partenariat",
    dateLabel: "10 décembre 2026 à 23 h 59",
    text: "Les candidatures au programme de partenariat WIKENVA seront clôturées le 10 décembre 2026.",
  },
  campaign: {
    iso: "2026-12-24T23:59:00+01:00",
    label: "Clôture de la campagne de contribution",
    dateLabel: "24 décembre 2026 à 23 h 59",
    text: "La campagne de contribution du projet Digital Marketplace Ebook Halal sur SidraStart prendra fin le 24 décembre 2026.",
  },
  endedText: "Cette période est terminée.",
};

export const partnership = {
  threshold: "Sans montant minimum",
  thresholdText:
    "Pour candidater, contribuez d'abord au projet Digital Marketplace Ebook Halal sur SidraStart (aucun montant minimum), puis indiquez le hash de votre transaction dans le formulaire.",
  review:
    "Chaque candidature est examinée par l'équipe WIKENVA. Le partenariat n'est effectif qu'après formalisation par un accord écrit signé avec WIKENVA, selon les conditions qui y sont définies.",
  benefits: [
    {
      title: "Participation aux revenus futurs",
      text: "Possibilité de bénéficier de 15 % des revenus futurs de la plateforme WIKENVA, selon les conditions, les modalités de calcul et la durée définies dans un accord de partenariat signé.",
    },
    {
      title: "Boutique en ligne gratuite, sans frais de vente",
      text: "Seuls les partenaires validés de WIKENVA bénéficieront d'une boutique en ligne gratuite à vie, sans aucun frais de vente, dès l'ouverture de la marketplace, conformément à leur accord de partenariat signé.",
    },
    {
      title: "Fonctionnalités Premium",
      text: "Accès aux fonctionnalités Premium prévues pour les partenaires éligibles, dès leur mise à disposition.",
    },
    {
      title: "Promotion et développement",
      text: "Possibilité de participer à la promotion et au développement de WIKENVA.",
    },
    {
      title: "Reconnaissance officielle",
      text: "Reconnaissance en tant que partenaire du projet selon le rôle et le niveau de participation.",
    },
    {
      title: "Expansion internationale",
      text: "Possibilité de contribuer à l'expansion internationale de la marketplace.",
    },
    {
      title: "Collaborations",
      text: "Opportunités de collaboration avec les auteurs, les créateurs et les autres partenaires.",
    },
  ],
  limits: [
    "Les avantages ne constituent ni un gain garanti, ni un intérêt, ni une promesse de rendement financier.",
    "La part de 15 % porte sur des revenus futurs éventuels de la plateforme : leur existence et leur montant dépendent de l'activité réelle de WIKENVA.",
    "Les modalités de calcul, la durée, les conditions de versement et les éventuelles exclusions sont fixées exclusivement dans l'accord de partenariat signé.",
    "La contribution sur SidraStart est obligatoire pour candidater, mais ne vaut pas, à elle seule, partenariat : la candidature doit être déposée, examinée puis acceptée.",
    "WIKENVA peut refuser une candidature incomplète, inexacte, en doublon ou reçue après la date de clôture.",
    "La boutique en ligne gratuite et sans frais de vente est réservée aux partenaires dont la candidature a été validée et l'accord signé ; elle est fournie, comme les fonctionnalités Premium, dès sa mise en service sur la marketplace.",
  ],
};

export type ModuleStatus = "disponible" | "en-developpement" | "prevu";

export const statusLabels: Record<ModuleStatus, string> = {
  disponible: "Disponible",
  "en-developpement": "En développement",
  prevu: "Prévu",
};

/** Statut de chaque espace de l'écosystème — à mettre à jour à chaque lancement. */
export const ecosystem: { name: string; text: string; status: ModuleStatus }[] = [
  {
    name: "WIKENVA MARKET",
    text: "La marketplace de produits digitaux : ebooks, guides, formations et ressources numériques.",
    status: "en-developpement",
  },
  {
    name: "WIKENVA COMMUNITY",
    text: "Communauté et collaboration. Les canaux communautaires officiels (Telegram, WhatsApp, réseaux sociaux) sont déjà ouverts.",
    status: "disponible",
  },
  {
    name: "WIKENVA AI",
    text: "Des outils intelligents pour aider les auteurs et créateurs à rédiger, présenter et diffuser leurs œuvres.",
    status: "prevu",
  },
  {
    name: "WIKENVA ACADEMY",
    text: "Un espace d'apprentissage et de formations numériques pour développer ses compétences.",
    status: "prevu",
  },
  {
    name: "WIKENVA CREATOR",
    text: "Un programme d'accompagnement des créateurs pour lancer et faire grandir leur activité.",
    status: "prevu",
  },
  {
    name: "WIKENVA CHAIN",
    text: "Traçabilité et innovations blockchain, en lien avec l'écosystème SidraChain.",
    status: "prevu",
  },
];

export const values = [
  "Confiance",
  "Transparence",
  "Innovation",
  "Créativité",
  "Éthique",
  "Collaboration",
];

export const navMain = [
  { to: "/", label: "Accueil" },
  { to: "/vision", label: "Vision" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/ethique", label: "Éthique" },
  { to: "/sidrachain", label: "SidraChain" },
  { to: "/partenariat", label: "Partenariat" },
  { to: "/campagne", label: "Campagne" },
  { to: "/faq", label: "FAQ" },
] as const;

export const navFooter = [
  { to: "/", label: "Accueil" },
  { to: "/vision", label: "Notre vision" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/auteurs", label: "Auteurs" },
  { to: "/lecteurs", label: "Lecteurs" },
  { to: "/createurs", label: "Créateurs" },
  { to: "/partenariat", label: "Partenariat" },
  { to: "/verifier", label: "Vérifier ma candidature" },
  { to: "/sidrachain", label: "SidraChain" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
  { to: "/confidentialite", label: "Politique de confidentialité" },
  { to: "/conditions", label: "Conditions d'utilisation" },
] as const;
