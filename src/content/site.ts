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
    revenueNote:
      "WIKENVA prévoit d'allouer 15 % des revenus de la plateforme aux actionnaires de la plateforme WIKENVA, selon les modalités officielles qui seront définies et publiées. Cette part n'est pas un rendement garanti.",
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
    summary:
      "Établir la base publique du projet : identité, informations confirmées et premiers documents.",
    points: [
      "Présentation officielle de WIKENVA",
      "Ouverture de ce site comme source d'information",
      "Préparation des documents qui seront publiés après validation",
    ],
  },
  {
    id: "developpement",
    index: "02",
    name: "Développement",
    title: "Phase 2 — Développement",
    status: "Lancement visé le 25 octobre 2026",
    summary:
      "Faire avancer les briques du projet. Les livrables techniques seront nommés ici lorsqu'ils seront annoncés.",
    points: [
      "Décrire les développements officiellement engagés",
      "Lancement de la plateforme visé le 25 octobre 2026",
      "Publier les mises à jour au fil de l'eau",
      "Relier chaque avancée à une information vérifiable",
    ],
  },
  {
    id: "communaute",
    index: "03",
    name: "Communauté",
    title: "Phase 3 — Communauté",
    status: "À préciser",
    summary:
      "Rassembler les personnes qui suivent WIKENVA et ouvrir les canaux officiels de discussion.",
    points: [
      "Publier les comptes officiels dès qu'ils sont confirmés",
      "Partager les annonces au même endroit",
      "Rendre les échanges identifiables",
    ],
  },
  {
    id: "expansion",
    index: "04",
    name: "Expansion",
    title: "Phase 4 — Expansion",
    status: "À préciser",
    summary:
      "Élargir la portée du projet. Aucun marché, partenariat ou calendrier n'est indiqué tant qu'il n'est pas officiel.",
    points: [
      "Annoncer les étapes d'élargissement lorsqu'elles existent",
      "Documenter les collaborations confirmées",
      "Mettre à jour la feuille de route en conséquence",
    ],
  },
  {
    id: "ecosysteme",
    index: "05",
    name: "Écosystème",
    title: "Phase 5 — Écosystème",
    status: "À préciser",
    summary:
      "Relier le token, la communauté, les partenaires et les outils de WIKENVA en un ensemble cohérent.",
    points: [
      "Décrire chaque brique lorsqu'elle est définie",
      "Expliquer le rôle du WIKENVA TOKEN sans extrapoler",
      "Offrir une lecture unique au public et aux partenaires",
    ],
  },
];

export const goals = [
  "Les auteurs peuvent partager leurs livres et leurs idées.",
  "Les lecteurs peuvent découvrir des œuvres et enrichir leurs connaissances.",
  "Les créateurs de contenu peuvent valoriser leur créativité.",
  "Les concepteurs de produits digitaux peuvent présenter et développer leurs créations.",
  "Les entrepreneurs peuvent saisir de nouvelles opportunités et collaborer.",
  "Les communautés peuvent échanger, apprendre et grandir ensemble.",
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
    "WIKENVA veut une plateforme d'achat et de vente de produits numériques licites, dans le respect des principes de l'Islam.",
    "L'économie visée est responsable : honnêteté, transparence, équité et création de valeur utile.",
    "Innover avec éthique, entreprendre avec intégrité et créer de la valeur dans le respect des principes de l'Islam.",
  ],
  mission: [
    "Mettre en relation les créateurs, les entrepreneurs et les consommateurs pour des échanges commerciaux licites.",
    "Les produits visés sont des livres électroniques, des formations, des logiciels et d'autres ressources utiles, lorsque leur contenu respecte les principes de la charia. La boutique n'est pas encore ouverte.",
  ],
  problem: [
    "Le commerce numérique doit rester licite : produits clairs, prix clairs, et refus de la tromperie, de la contrefaçon et des fausses promesses.",
    "Les droits des créateurs et la propriété intellectuelle doivent être protégés. Les activités interdites par les principes de l'Islam sont écartées.",
  ],
  place: [
    "WIKENVA s'inscrit dans l'écosystème SidraChain. Le site officiel de cet écosystème est sidrachain.com. L'accès pour investir passe par SidraStart, sur la fiche Digital Marketplace Ebook.",
    "Toute utilisation de la blockchain, des actifs numériques ou d'un paiement devra être examinée pour sa compatibilité avec les principes de la finance islamique. Ce site ne présente pas de certificat de conformité à la charia.",
  ],
  africa: [
    "WIKENVA veut contribuer à l'économie numérique africaine : entrepreneuriat, créativité et nouvelles opportunités.",
    "L'ambition est de permettre aux talents africains de valoriser leurs compétences et de rendre leurs créations accessibles à un public plus large.",
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
    slug: "lancement-25-octobre",
    title: "Lancement visé le 25 octobre 2026",
    date: "19 octobre 2026",
    category: "annonce",
    excerpt: "WIKENVA vise l'ouverture de la plateforme le 25 octobre 2026. Elle n'est pas encore ouverte.",
    paragraphs: [
      "WIKENVA prévoit de lancer la plateforme le 25 octobre 2026.",
      "À cette date visée, la plateforme n'est pas encore ouverte. Les espaces peuvent encore évoluer.",
      "L'intégration à SidraChain reste soumise à l'examen de la Core Team.",
    ],
  },
  {
    slug: "interface-wikenva",
    title: "L'interface WIKENVA est www.wikenva.com",
    date: "17 octobre 2026",
    category: "annonce",
    excerpt:
      "Elle réunira lecteurs, auteurs, créateurs et communauté. L'intégration attend l'examen de la Core Team de SidraChain.",
    paragraphs: [
      "Le site officiel de l'interface WIKENVA est www.wikenva.com. Cette plateforme a pour vocation de réunir les lecteurs, les auteurs, les créateurs de contenu, les créateurs de produits numériques et la communauté autour d'un écosystème de partage de connaissances, de collaboration et d'opportunités.",
      "Avant toute intégration officielle à l'écosystème SidraChain, WIKENVA devra être présentée à la Core Team de SidraChain pour examen et validation, conformément aux procédures applicables.",
      "L'ambition est de développer une plateforme structurée, professionnelle et utile à la communauté, tout en respectant les exigences de l'écosystème SidraChain.",
    ],
  },
  {
    slug: "promotion-partenaire",
    title: "La promotion partenaire est ouverte",
    date: "17 octobre 2026",
    category: "partenariat",
    excerpt: "Jusqu'au 30 novembre 2026, le minimum est de 2 000 SDA sur SidraStart. La demande est vérifiée.",
    paragraphs: [
      "WIKENVA ouvre une promotion pour devenir partenaire. Elle est valable jusqu'au 30 novembre 2026. Le minimum indiqué est de 2 000 SDA, investis depuis son propre compte sur SidraStart. L'investissement ne se fait pas sur ce site.",
      "Atteindre ce minimum ne confirme pas le statut. Il faut déposer une demande. Seule une décision d'un administrateur autorisé confirme le partenariat.",
      "WIKENVA prévoit 15 % des revenus de la plateforme pour le programme de partenariat, selon les conditions de rémunération définies par la plateforme. 3 % des revenus sont destinés à la zakat, dans le respect des principes de la charia et avec une gestion transparente. Ces parts ne sont pas un rendement garanti.",
      "Après le 30 novembre 2026, les conditions pourront être révisées. Elles ne sont pas encore définies.",
    ],
  },
  {
    slug: "fiche-sidrastart",
    title: "La fiche du projet est ouverte sur SidraStart",
    date: "12 octobre 2026",
    category: "annonce",
    excerpt:
      "WIKENVA, marketplace digitale d'ebooks, est présentée dans l'écosystème SidraChain. L'accès pour investir passe par SidraStart.",
    paragraphs: [
      "WIKENVA est une marketplace digitale d'ebooks, dans l'écosystème SidraChain. La fiche publique du projet porte le nom Digital Marketplace Ebook.",
      "Le bouton Investir de ce site ouvre cette fiche sur SidraStart. Aucun rendement n'est promis ici, et les données du token qui ne sont pas encore officielles restent indiquées « À compléter ».",
    ],
  },
  {
    slug: "espace-information-en-ligne",
    title: "L'espace d'information WIKENVA est en ligne",
    date: "12 octobre 2026",
    category: "annonce",
    excerpt:
      "Le site officiel rassemble la présentation du projet. Les prochaines nouvelles y seront publiées lorsqu'elles seront confirmées.",
    paragraphs: [
      "WIKENVA ouvre son espace d'information public. On y trouve la vision du projet, la feuille de route, la fiche du WIKENVA TOKEN, les documents officiels et les voies prévues pour la communauté, les investisseurs et les partenaires.",
      "Les développements, partenariats, événements et nouvelles étapes de la feuille de route seront ajoutés ici au moment où ils seront annoncés. Tant qu'une information n'est pas confirmée, le site l'indique par la mention « À compléter » plutôt que de la supposer.",
      "Aucune performance, aucune donnée de marché et aucun lien d'investissement ne sont publiés dans cette annonce.",
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
      "Le site présente le projet WIKENVA. Le contact public passe par les canaux officiels indiqués sur la page Communauté : Facebook, WhatsApp, Telegram et X.",
      "Gmail : wikenva@gmail.com. Numéro : +229 01 96 41 21 17.",
    ],
  },
  {
    heading: "Éditeur — non publié",
    paragraphs: [
      "La forme juridique, le siège, le numéro d'immatriculation et le directeur de la publication ne figurent dans aucun document officiel déjà intégré. Ils ne sont pas inventés ici.",
      "Dès que WIKENVA les confirme, ils remplaceront cette mention.",
    ],
  },
  {
    heading: "Hébergeur — non publié",
    paragraphs: [
      "Le nom et l'adresse de l'hébergeur ne sont pas encore confirmés. Ils seront ajoutés ici, et seulement à ce moment-là.",
    ],
  },
  {
    heading: "Propriété intellectuelle",
    paragraphs: [
      "Le nom WIKENVA, le logo et les contenus publiés sur ce site sont réservés. Toute reproduction non autorisée est interdite.",
    ],
  },
];

export const conditions: ProseBlock[] = [
  {
    heading: "Nature du site",
    paragraphs: [
      "Ce site présente WIKENVA et le WIKENVA TOKEN à titre d'information. Il ne constitue pas, en lui-même, une offre au public de titres, de parts ou de crypto-actifs, ni un conseil en investissement, juridique ou fiscal.",
    ],
  },
  {
    heading: "Investissement",
    paragraphs: [
      "Le bouton « Investir sur SidraStart » ouvre la fiche du projet sur SidraStart, dans l'écosystème SidraChain. Cette redirection n'est pas, en elle-même, une offre émise par ce site.",
      "Aucun rendement, aucune plus-value et aucune liquidité ne sont promis.",
    ],
  },
  {
    heading: "Évolution des contenus",
    paragraphs: [
      "Les textes, la feuille de route, les actualités et les documents peuvent être mis à jour. Seule la version publiée sur ce site fait foi pour la communication publique de WIKENVA, une fois les éléments confirmés.",
    ],
  },
  {
    heading: "Limitation",
    paragraphs: [
      "Les contenus sont fournis en l'état. Il appartient à chacune et chacun de vérifier les documents officiels avant toute décision.",
    ],
  },
];

export const risques: ProseBlock[] = [
  {
    heading: "Perte possible",
    paragraphs: [
      "Les crypto-actifs sont volatils. Leur valeur peut baisser fortement, jusqu'à une perte totale. N'engagez pas de sommes dont la perte serait insupportable.",
    ],
  },
  {
    heading: "Aucun rendement promis",
    paragraphs: [
      "WIKENVA ne promet pas de rendement, de dividende, de rachat ou de performance.",
    ],
  },
  {
    heading: "Risques techniques et de liquidité",
    paragraphs: [
      "Un contrat, un réseau ou un marché peut être défaillant, indisponible ou illiquide. L'adresse du contrat du WIKENVA TOKEN sera publiée ici lorsqu'elle sera officielle. Jusque-là, elle n'est pas communiquée.",
    ],
  },
  {
    heading: "Cadre réglementaire",
    paragraphs: [
      "Le cadre applicable aux crypto-actifs peut changer. Aucune licence, aucun agrément et aucun statut réglementaire ne sont revendiqués sur ce site tant qu'ils n'ont pas été officiellement communiqués.",
    ],
  },
  {
    heading: "Ce site ne conseille pas",
    paragraphs: [
      "Les informations publiées ne remplacent pas un conseil personnalisé. En cas de doute, rapprochez-vous d'un professionnel habilité.",
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
