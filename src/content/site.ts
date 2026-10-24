/**
 * Contenu officiel du site WIKENVA.
 * Remplacez les valeurs `null` et les textes « À compléter » par les
 * informations confirmées. Ne renseignez un lien, un chiffre ou un document
 * que lorsqu'il est officiel.
 */

export const PENDING = "À compléter";

export type Phase = {
  id: string;
  index: string;
  name: string;
  title: string;
  status: string;
  summary: string;
  points: string[];
};

export type TokenomicRow = {
  label: string;
  share: string;
  detail: string;
};

export type NewsCategory =
  | "projet"
  | "developpement"
  | "annonce"
  | "partenariat"
  | "evenement"
  | "roadmap"
  | "publication";

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  category: NewsCategory;
  excerpt: string;
  paragraphs: string[];
  /** Image optionnelle. Laisser vide tant qu'aucun visuel officiel n'est fourni. */
  image?: string;
};

export type SocialLink = {
  id: string;
  name: string;
  href: string | null;
  hint: string;
};

export type OfficialDocument = {
  id: string;
  title: string;
  description: string;
  href: string | null;
};

export type ProseBlock = {
  heading: string;
  paragraphs: string[];
};

export const categoryLabels: Record<NewsCategory, string> = {
  projet: "Projet",
  developpement: "Développement",
  annonce: "Annonce officielle",
  partenariat: "Partenariat",
  evenement: "Événement",
  roadmap: "Feuille de route",
  publication: "Publication",
};

export const site = {
  name: "WIKENVA",
  tokenName: "WIKENVA TOKEN",
  /** Phrase qui décrit la plateforme. */
  slogan: "Une vision claire, un écosystème pour tous.",
  /** Fiche du projet sur SidraStart. */
  investUrl: "https://www.sidrastart.com/project/a05c52a6-22e8-4c81-8049-cb5484422759",
  /**
   * Fin officielle de la promotion SidraStart, au format ISO.
   * `null` tant que la date n'est pas publiée : aucun compte à rebours.
   */
  partnerPromotionEnds: "2026-11-30T23:59:59+01:00",
  /** Site officiel de l'écosystème. */
  sidrachainUrl: "https://www.sidrachain.com",
  /** Interface WIKENVA. Intégration après validation de la core team SidraChain. */
  platformUrl: "https://www.wikenva.com",
  whitepaper: {
    readUrl: "/white-paper",
    downloadUrl: "/wikenva-livre-blanc.pdf",
  },
  /** URL qui recevra les candidatures actionnaires en POST JSON. */
  shareholderSubmissionUrl: null as string | null,
  /**
   * Seuil évoqué. Il n'est affiché comme condition du programme
   * que si `thresholdConfirmed` passe à true.
   */
  pendingThreshold: "1 000 SDA",
  thresholdConfirmed: false,
  /**
   * Conditions du programme actionnaires. À mettre à jour lorsque
   * les modalités définitives sont publiées.
   */
  shareholderProgram: {
    minimum: "1 000 SDA",
    revenueShare: "15 %",
    revenueLabel: "Part prévue des revenus de la plateforme",
    status: "Conditions du programme à officialiser",
    revenueNote: "15 % des revenus prévus pour les actionnaires. Ce n'est pas un rendement.",
    sidraStartShare: "34 %",
    sidraStartNote:
      "Les 34 % des actions sont confirmés par la plateforme SidraStart. Cette allocation est distincte des 15 % des revenus de la plateforme prévus pour les actionnaires WIKENVA. Elle n'est pas un rendement garanti.",
  },
  token: {
    name: "WIKENVA TOKEN",
    symbol: "En préparation, en attendant la confirmation officielle",
    blockchain: "À confirmer officiellement",
    totalSupply: "100 000 000 de tokens",
    contractAddress: null as string | null,
    utility: null as string | null,
    status: "Projet en préparation, lancement sur SidraStart en attente",
  },
  /** Lignes officielles uniquement. Laisser vide plutôt que d'estimer. */
  tokenomics: [
    { label: "Sidra Holding", share: "16,5 %", detail: "16 500 000 actions" },
    { label: "Contributeurs SDA", share: "16,5 %", detail: "16 500 000 actions" },
    { label: "Contributeurs en espèces", share: "33 %", detail: "33 000 000 actions" },
    { label: "Contributeurs de l'équipe", share: "34 %", detail: "34 000 000 actions" },
    { label: "Total", share: "100 %", detail: "100 000 000 actions" },
  ],
  /** Modèle économique officiel. `null` tant qu'il n'est pas défini. */
  economicModel: null as string | null,
  /** Droits officiellement décrits. Vide = aucun droit publié. */
  shareholderRights: [] as string[],
  /** Pièces officiellement demandées. */
  shareholderDocuments: [] as string[],
  /** Conditions d'éligibilité officiellement publiées, hors seuil. */
  shareholderEligibility: [] as string[],
};

export const phases: Phase[] = [
  {
    id: "fondation",
    index: "01",
    name: "Fondation",
    title: "Phase 1 — Fondation",
    status: "À préciser",
    summary: "Identité, informations confirmées, premiers documents.",
    points: ["Présentation officielle", "Ce site comme source", "Documents après validation"],
  },
  {
    id: "developpement",
    index: "02",
    name: "Développement",
    title: "Phase 2 — Développement",
    status: "En cours",
    summary: "Les livrables seront nommés quand ils seront annoncés.",
    points: ["Développements confirmés", "Mises à jour publiées"],
  },
  {
    id: "communaute",
    index: "03",
    name: "Communauté",
    title: "Phase 3 — Communauté",
    status: "À préciser",
    summary: "Rassembler celles et ceux qui suivent WIKENVA.",
    points: ["Comptes officiels confirmés", "Annonces au même endroit"],
  },
  {
    id: "expansion",
    index: "04",
    name: "Expansion",
    title: "Phase 4 — Expansion",
    status: "À préciser",
    summary: "Rien n'est annoncé tant que ce n'est pas officiel.",
    points: ["Étapes confirmées seulement", "Collaborations documentées"],
  },
  {
    id: "ecosysteme",
    index: "05",
    name: "Écosystème",
    title: "Phase 5 — Écosystème",
    status: "À préciser",
    summary: "Token, communauté, partenaires et outils, quand ils sont définis.",
    points: ["Chaque brique nommée", "Rôle du token sans extrapolation"],
  },
];

export const goals = [
  "Partager livres et idées.",
  "Découvrir et apprendre.",
  "Valoriser la créativité.",
  "Présenter des produits numériques.",
  "Collaborer et entreprendre.",
  "Échanger et apprendre.",
];

export const roles = [
  { name: "Auteurs", detail: goals[0] },
  { name: "Lecteurs", detail: goals[1] },
  { name: "Créateurs de contenu", detail: goals[2] },
  { name: "Concepteurs", detail: goals[3] },
  { name: "Entrepreneurs", detail: goals[4] },
  { name: "Communauté", detail: goals[5] },
];

export const narrative = {
  vision: [
    "WIKENVA propose des produits numériques licites, selon les principes de l'Islam.",
    "Les échanges reposent sur l'honnêteté, la transparence et l'équité.",
    "L'innovation se fait sans tromperie.",
  ],
  mission: [
    "La mission est de relier les créateurs, les entrepreneurs et les lecteurs.",
    "Les ebooks, les formations et les logiciels sont prévus. La boutique n'est pas encore ouverte.",
  ],
  problem: [
    "Les produits doivent être clairs, sans fraude.",
    "Les droits des créateurs sont protégés.",
  ],
  place: [
    "WIKENVA s'inscrit dans SidraChain. L'investissement passe par SidraStart.",
    "Aucun certificat charia n'est publié ici.",
  ],
  africa: [
    "WIKENVA veut servir l'économie numérique africaine.",
    "Les créations doivent devenir accessibles à un plus large public.",
  ],
};

export const principles = [
  ["Commerce halal", "Favoriser la vente de produits et de services licites."],
  ["Honnêteté et transparence", "Présenter clairement les produits, les prix et les conditions."],
  ["Équité commerciale", "Encourager des échanges justes entre vendeurs et acheteurs."],
  ["Refus de la fraude", "Écarter la tromperie, la contrefaçon et les fausses promesses."],
  ["Respect des droits", "Protéger les droits des créateurs et la propriété intellectuelle."],
  ["Responsabilité", "Écarter les activités et les contenus interdits par les principes de l'Islam."],
] as const;

export const news: NewsItem[] = [
  {
    slug: "interface-wikenva",
    title: "L'interface WIKENVA est www.wikenva.com",
    date: "17 octobre 2026",
    category: "annonce",
    excerpt: "Lecteurs, auteurs, créateurs. Validation Core Team en attente.",
    paragraphs: [
      "L'interface officielle est www.wikenva.com.",
      "Intégration SidraChain après examen de la Core Team.",
    ],
  },
  {
    slug: "promotion-partenaire",
    title: "La promotion partenaire est ouverte",
    date: "17 octobre 2026",
    category: "partenariat",
    excerpt: "2 000 SDA jusqu'au 30 novembre 2026. Demande vérifiée.",
    paragraphs: [
      "Minimum 2 000 SDA sur SidraStart, jusqu'au 30 novembre 2026.",
      "Le minimum ne confirme pas le statut. Un CEO décide.",
      "Une part de 15 % est prévue pour le partenariat. Une part de 3 % est envisagée pour la zakat. Aucun rendement promis.",
    ],
  },
  {
    slug: "fiche-sidrastart",
    title: "La fiche du projet est ouverte sur SidraStart",
    date: "12 octobre 2026",
    category: "annonce",
    excerpt: "Fiche Digital Marketplace Ebook sur SidraStart.",
    paragraphs: [
      "Marketplace d'ebooks dans SidraChain.",
      "Investir ouvre SidraStart. Aucun rendement promis.",
    ],
  },
  {
    slug: "espace-information-en-ligne",
    title: "L'espace d'information WIKENVA est en ligne",
    date: "12 octobre 2026",
    category: "annonce",
    excerpt: "Le site public est en ligne. Rien n'est inventé.",
    paragraphs: [
      "Vision, feuille de route, token, documents et parcours.",
      "Ce qui n'est pas confirmé reste « À compléter ».",
    ],
  },
];

export const socials: SocialLink[] = [
  { id: "facebook", name: "Facebook", href: "https://www.facebook.com/people/Wikenva/61594737553362/", hint: "Page officielle" },
  { id: "whatsapp", name: "WhatsApp", href: "https://whatsapp.com/channel/0029Vb9KneTEgGfK0t46G00V", hint: "Chaîne officielle" },
  { id: "telegram", name: "Telegram", href: "https://t.me/+-vHI1dIZj-xlMzE0", hint: "Canal officiel" },
  { id: "twitter", name: "Twitter", href: "https://x.com/Wikenva", hint: "Compte officiel" },
];

export const documents: OfficialDocument[] = [
  {
    id: "whitepaper",
    title: "White paper",
    description:
      "Version de relecture du livre blanc. Elle distingue les faits confirmés des points encore ouverts. Elle ne promet aucun rendement.",
    href: "/white-paper",
  },
  {
    id: "token",
    title: "Fiche du token",
    description:
      "Nom, symbole, blockchain, offre totale, contrat et tokenomics. Les champs non confirmés restent ouverts.",
    href: "/token",
  },
  {
    id: "roadmap",
    title: "Feuille de route",
    description:
      "Les cinq phases publiques du projet. Les statuts et les dates seront complétés par les annonces officielles.",
    href: "/feuille-de-route",
  },
  {
    id: "sidrastart",
    title: "Fiche SidraStart",
    description:
      "Page du projet Digital Marketplace Ebook sur SidraStart, dans l'écosystème SidraChain.",
    href: "https://www.sidrastart.com/project/a05c52a6-22e8-4c81-8049-cb5484422759",
  },
  {
    id: "sidrachain",
    title: "SidraChain",
    description: "Site officiel de l'écosystème SidraChain.",
    href: "https://www.sidrachain.com",
  },
];

export const mainNav = [
  { to: "/vision", label: "Vision" },
  { to: "/partenaires", label: "Partenaires" },
  { to: "/communaute", label: "Communauté" },
] as const;

export const moreNav = [
  { to: "/presentation", label: "Présentation" },
  { to: "/feuille-de-route", label: "Feuille de route" },
  { to: "/token", label: "Token" },
  { to: "/actualites", label: "Actualités" },
  { to: "/white-paper", label: "White paper" },
  { to: "/investisseurs", label: "Investisseurs" },
  { to: "/sidrachain", label: "SidraChain" },
] as const;

export const legalNav = [
  { to: "/mentions-legales", label: "Mentions légales" },
  { to: "/confidentialite", label: "Politique de confidentialité" },
  { to: "/conditions", label: "Conditions d'utilisation" },
  { to: "/risques", label: "Avertissement sur les risques" },
  { to: "/documents", label: "Documents officiels" },
] as const;

export const mentionsLegales: ProseBlock[] = [
  {
    heading: "Ce qui est publié",
    paragraphs: [
      "Contact : page Communauté. Gmail contact.wikenva@gmail.com. +229 01 96 41 21 17.",
    ],
  },
  {
    heading: "Éditeur — non publié",
    paragraphs: [
      "Forme juridique, siège et immatriculation non publiés.",
    ],
  },
  {
    heading: "Hébergeur — non publié",
    paragraphs: [
      "Hébergeur non confirmé.",
    ],
  },
  {
    heading: "Propriété intellectuelle",
    paragraphs: [
      "Nom, logo et contenus réservés.",
    ],
  },
];

export const conditions: ProseBlock[] = [
  {
    heading: "Nature du site",
    paragraphs: [
      "Site d'information. Pas une offre, pas un conseil.",
    ],
  },
  {
    heading: "Investissement",
    paragraphs: [
      "Investir ouvre SidraStart. Aucun rendement promis.",
    ],
  },
  {
    heading: "Évolution des contenus",
    paragraphs: [
      "Seule la version publiée ici fait foi.",
    ],
  },
  {
    heading: "Limitation",
    paragraphs: [
      "Vérifiez les documents officiels avant toute décision.",
    ],
  },
];

export const risques: ProseBlock[] = [
  {
    heading: "Perte possible",
    paragraphs: [
      "La valeur peut tomber à zéro.",
    ],
  },
  {
    heading: "Aucun rendement promis",
    paragraphs: [
      "Pas de rendement, dividende ou rachat promis.",
    ],
  },
  {
    heading: "Risques techniques et de liquidité",
    paragraphs: [
      "Contrat et marché peuvent être indisponibles. Adresse du token non publiée.",
    ],
  },
  {
    heading: "Cadre réglementaire",
    paragraphs: [
      "Aucune licence n'est revendiquée ici.",
    ],
  },
  {
    heading: "Ce site ne conseille pas",
    paragraphs: [
      "Ceci n'est pas un conseil personnalisé.",
    ],
  },
];

export function shown(value: string | null | undefined): string {
  if (value == null) return PENDING;
  const trimmed = value.trim();
  if (!trimmed) return PENDING;
  const lower = trimmed.toLowerCase();
  if (lower === "à compléter" || lower === "a completer") return PENDING;
  return trimmed;
}

export function isPending(value: string | null | undefined): boolean {
  return shown(value) === PENDING;
}

export function isUrl(value: string | null | undefined): value is string {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed || trimmed === "#" || isPending(trimmed)) return false;
  return (
    trimmed.startsWith("/") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("mailto:")
  );
}

export function pageMeta(title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
    ],
  };
}
