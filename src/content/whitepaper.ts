export type PaperCopy = { fr: string; en: string };

export type PaperSection = {
  id: string;
  index: string;
  title: PaperCopy;
  blocks: Array<{ type: "p" | "note" | "items"; text?: PaperCopy; items?: PaperCopy[] }>;
};

const t = (fr: string, en: string): PaperCopy => ({ fr, en });

export const paperMeta = {
  status: t("Version de relecture", "Review draft"),
  coverTitle: t("Livre blanc", "White paper"),
  coverLede: t(
    "Marketplace de produits numériques, en développement dans l'écosystème SidraChain.",
    "A digital products marketplace, under development in the SidraChain ecosystem.",
  ),
  founder: "ADJIBADOU FÉLIX",
  role: t("CEO / Fondateur", "CEO / Founder"),
  website: "https://www.wikanva.com",
  disclaimer: t(
    "Ce document présente une vision. Il ne garantit aucun avantage, rendement ou remboursement. Les éléments manquants sont marqués « À confirmer ».",
    "This document presents a vision. It guarantees no benefit, yield or refund. Missing items are marked “TO BE CONFIRMED”.",
  ),
};

export const paperSections: PaperSection[] = [
  {
    id: "resume",
    index: "02",
    title: t("Résumé", "Executive summary"),
    blocks: [
      {
        type: "p",
        text: t(
          "WIKENVA est un projet de marketplace de produits numériques, encore en développement. Le fondateur identifié est ADJIBADOU FÉLIX, CEO. Le projet se présente dans l'écosystème SidraChain. Le site indiqué est https://www.wikanva.com.",
          "WIKENVA is a digital products marketplace project, still under development. The identified founder is ADJIBADOU FÉLIX, CEO. The project is presented within the SidraChain ecosystem. The stated website is https://www.wikanva.com.",
        ),
      },
      {
        type: "p",
        text: t(
          "L'intention est de réunir auteurs, lecteurs, créateurs, concepteurs de produits numériques et entrepreneurs. Le modèle économique envisagé est une commission sur les transactions. Son taux n'est pas défini. Aucune fonctionnalité de vente n'est présentée comme déjà en service.",
          "The intention is to bring together authors, readers, creators, designers of digital products and entrepreneurs. The envisioned economic model is a commission on transactions. Its rate is not defined. No selling feature is presented as already in service.",
        ),
      },
      {
        type: "note",
        text: t(
          "À confirmer : taux de commission, statut juridique, symbole du token, blockchain et adresse du contrat.",
          "TO BE CONFIRMED: commission rate, legal status, token symbol, blockchain and contract address.",
        ),
      },
    ],
  },
  {
    id: "presentation",
    index: "03",
    title: t("Présentation de WIKENVA", "Presentation of WIKENVA"),
    blocks: [
      {
        type: "p",
        text: t(
          "WIKENVA se décrit comme une marketplace digitale d'ebooks halal et, plus largement, comme un espace pour des produits numériques. Le slogan retenu est : « Une vision claire, un écosystème pour tous. »",
          "WIKENVA describes itself as a digital marketplace for halal ebooks and, more broadly, as a place for digital products. The chosen slogan is: “A clear vision, an ecosystem for everyone.”",
        ),
      },
      {
        type: "p",
        text: t(
          "Aujourd'hui, le projet dispose d'un site de présentation, d'une fiche sur SidraStart intitulée Digital Marketplace Ebook Halal, et de canaux communautaires publiés. L'application WIKENVA n'est pas en ligne. Aucune statistique d'usage n'est publiée, parce qu'aucune n'a été fournie.",
          "Today the project has a presentation website, a SidraStart page titled Digital Marketplace Ebook Halal, and published community channels. The WIKENVA application is not online. No usage statistics are published, because none have been provided.",
        ),
      },
    ],
  },
  {
    id: "vision",
    index: "04",
    title: t("Vision, mission et valeurs", "Vision, mission and values"),
    blocks: [
      {
        type: "p",
        text: t(
          "La vision est de réunir, dans un même écosystème, les auteurs, les lecteurs, les créateurs de contenu, les concepteurs de produits digitaux, les entrepreneurs et d'autres acteurs du numérique.",
          "The vision is to bring together, in one ecosystem, authors, readers, content creators, designers of digital products, entrepreneurs and other digital actors.",
        ),
      },
      {
        type: "p",
        text: t(
          "La mission énoncée est de donner à chacun la possibilité de créer, de partager, de découvrir et de développer ses projets. Les valeurs affichées à ce stade sont la clarté, la transparence sur ce qui n'est pas encore décidé, et le refus de promettre un résultat financier.",
          "The stated mission is to give each person a way to create, share, discover and develop projects. The values shown at this stage are clarity, transparency about what is not yet decided, and the refusal to promise a financial result.",
        ),
      },
    ],
  },
  {
    id: "problemes",
    index: "05",
    title: t("Problèmes du marché des produits numériques", "Problems in the digital products market"),
    blocks: [
      {
        type: "p",
        text: t(
          "Le constat retenu, sans chiffre de marché, est qualitatif : auteurs, lecteurs, créateurs, concepteurs et entrepreneurs évoluent souvent séparément. Les œuvres, les produits numériques et les opportunités de collaboration restent dispersés.",
          "The observation used here, with no market figure, is qualitative: authors, readers, creators, designers and entrepreneurs often work apart. Works, digital products and chances to collaborate stay scattered.",
        ),
      },
      {
        type: "p",
        text: t(
          "Pour un public qui cherche des contenus numériques présentés comme licites, l'information sur l'origine d'une œuvre et sur les conditions d'une transaction n'est pas toujours réunie au même endroit. WIKENVA vise ce manque. Il ne prétend pas l'avoir déjà mesuré.",
          "For people looking for digital content presented as lawful, information about a work's origin and about the terms of a transaction is not always gathered in one place. WIKENVA aims at that gap. It does not claim to have measured it.",
        ),
      },
    ],
  },
  {
    id: "solution",
    index: "06",
    title: t("Solution proposée", "Proposed solution"),
    blocks: [
      {
        type: "p",
        text: t(
          "La solution envisagée est une marketplace où des produits numériques pourraient être proposés, découverts et échangés, en commençant par les ebooks. Ce n'est pas une place de marché déjà ouverte.",
          "The envisioned solution is a marketplace where digital products could be offered, discovered and exchanged, starting with ebooks. It is not a marketplace that is already open.",
        ),
      },
      {
        type: "items",
        items: [
          t("Un espace de présentation du projet, déjà en ligne.", "A project presentation space, already online."),
          t("Une campagne de contribution sur SidraStart, selon les conditions de cette plateforme.", "A contribution campaign on SidraStart, under that platform's conditions."),
          t("Une application de marketplace, encore à construire. À confirmer : périmètre exact de la première version.", "A marketplace application, still to be built. TO BE CONFIRMED: the exact scope of the first version."),
        ],
      },
    ],
  },
  {
    id: "fonctions",
    index: "07",
    title: t("Fonctions envisagées", "Envisioned features"),
    blocks: [
      {
        type: "p",
        text: t(
          "Les fonctions ci-dessous sont des objectifs de produit. Aucune n'est déclarée opérationnelle.",
          "The features below are product objectives. None is declared operational.",
        ),
      },
      {
        type: "items",
        items: [
          t("Proposer un produit numérique, en particulier un ebook.", "Offer a digital product, in particular an ebook."),
          t("Rechercher et découvrir des œuvres ou des produits.", "Search and discover works or products."),
          t("Acheter ou accéder à un produit selon des conditions qui restent à écrire.", "Buy or access a product under terms that are still to be written."),
          t("Permettre une forme de distribution ou de mise en relation. À confirmer : le circuit exact.", "Allow a form of distribution or introduction. TO BE CONFIRMED: the exact path."),
        ],
      },
    ],
  },
  {
    id: "public",
    index: "08",
    title: t("Public visé et opportunités", "Audience and opportunities"),
    blocks: [
      {
        type: "p",
        text: t(
          "Le public visé, tel qu'il est décrit par le projet, comprend les auteurs, les lecteurs, les créateurs de contenu, les concepteurs de produits numériques, les entrepreneurs et les communautés qui veulent échanger.",
          "The audience described by the project includes authors, readers, content creators, designers of digital products, entrepreneurs and communities that want to exchange.",
        ),
      },
      {
        type: "note",
        text: t(
          "À confirmer : taille du marché, zones géographiques prioritaires et objectifs chiffrés. Aucun n'est publié ici.",
          "TO BE CONFIRMED: market size, priority geographies and numeric targets. None is published here.",
        ),
      },
    ],
  },
  {
    id: "sidra",
    index: "09",
    title: t("Place dans l'écosystème SidraChain", "Place in the SidraChain ecosystem"),
    blocks: [
      {
        type: "p",
        text: t(
          "WIKENVA se situe dans l'écosystème SidraChain. Le site de cet écosystème est sidrachain.com. La fiche de campagne indiquée est la page SidraStart du projet Digital Marketplace Ebook Halal.",
          "WIKENVA sits in the SidraChain ecosystem. That ecosystem's website is sidrachain.com. The stated campaign page is the SidraStart page for Digital Marketplace Ebook Halal.",
        ),
      },
      {
        type: "p",
        text: t(
          "SidraChain et SidraStart restent des plateformes distinctes de WIKENVA. Ce livre blanc ne décrit pas leur gouvernance interne et ne leur attribue aucun engagement qui n'est pas écrit sur leurs propres pages.",
          "SidraChain and SidraStart remain platforms distinct from WIKENVA. This white paper does not describe their internal governance and does not assign them any commitment that is not written on their own pages.",
        ),
      },
    ],
  },
  {
    id: "modele",
    index: "10",
    title: t("Modèle économique envisagé", "Envisioned economic model"),
    blocks: [
      {
        type: "p",
        text: t(
          "Le modèle envisagé est une commission sur les transactions de la marketplace. Le taux, l'assiette, le moment du prélèvement et la répartition de cette commission ne sont pas définis.",
          "The envisioned model is a commission on marketplace transactions. The rate, the base, the moment it is charged and how it is shared are not defined.",
        ),
      },
      {
        type: "p",
        text: t(
          "L'offre totale affichée pour WIKENVA TOKEN est de 100 000 000 de tokens. Le symbole, la blockchain et l'adresse du contrat ne sont pas confirmés. Le token n'est pas présenté comme déployé. Aucune commission n'est convertie ici en rendement.",
          "The supply shown for WIKENVA TOKEN is 100,000,000 tokens. The symbol, the blockchain and the contract address are not confirmed. The token is not presented as deployed. No commission is turned here into a yield.",
        ),
      },
      {
        type: "note",
        text: t(
          "À confirmer : taux de commission, monnaie de règlement, et lien éventuel entre la commission et le token.",
          "TO BE CONFIRMED: commission rate, settlement currency, and any link between the commission and the token.",
        ),
      },
    ],
  },
  {
    id: "partenaires",
    index: "11",
    title: t("Programme partenaires et campagne SidraStart", "Partner programme and SidraStart campaign"),
    blocks: [
      {
        type: "p",
        text: t(
          "Une campagne de contribution est présentée sur SidraStart. Le seuil indiqué pour la promotion en cours est de 3 000 SDA, selon les conditions officielles de cette campagne. La date de fin indiquée pour cette promotion est le 25 décembre 2026.",
          "A contribution campaign is presented on SidraStart. The threshold shown for the current promotion is 3,000 SDA, under that campaign's official conditions. The end date stated for this promotion is 25 December 2026.",
        ),
      },
      {
        type: "p",
        text: t(
          "Devenir partenaire sur le site WIKENVA est une candidature. Elle ne confirme ni un paiement, ni une approbation, ni un droit économique. Le bonus de partenariat, s'il existe, n'est pas publié : son taux, son calcul et sa période restent à confirmer.",
          "Becoming a partner on the WIKENVA website is an application. It confirms neither a payment, nor an approval, nor an economic right. The partnership bonus, if any, is not published: its rate, its calculation and its period remain to be confirmed.",
        ),
      },
    ],
  },
  {
    id: "ethique",
    index: "12",
    title: t("Principes éthiques", "Ethical principles"),
    blocks: [
      {
        type: "p",
        text: t(
          "WIKENVA exprime l'intention de proposer des activités numériques licites et des ebooks présentés comme halal. Les conditions d'une transaction doivent rester compréhensibles. Aucun rendement n'est garanti.",
          "WIKENVA states an intention to offer lawful digital activities and ebooks presented as halal. The terms of a transaction should stay understandable. No yield is guaranteed.",
        ),
      },
      {
        type: "note",
        text: t(
          "À confirmer : revue par une personne compétente en finance islamique. WIKENVA ne se déclare pas certifié conforme à la finance islamique.",
          "TO BE CONFIRMED: review by a person qualified in Islamic finance. WIKENVA does not claim to be certified as compliant with Islamic finance.",
        ),
      },
    ],
  },
  {
    id: "technique",
    index: "13",
    title: t("Architecture, sécurité et données", "Architecture, security and data"),
    blocks: [
      {
        type: "p",
        text: t(
          "L'architecture définitive de la marketplace n'est pas publiée. Le site actuel est une vitrine d'information. Il ne faut pas le lire comme la description d'un système déjà audité.",
          "The final architecture of the marketplace is not published. The current website is an information showcase. It must not be read as the description of a system that has already been audited.",
        ),
      },
      {
        type: "items",
        items: [
          t("Les candidatures partenaires ne sont enregistrées que si la réception est réellement configurée.", "Partner applications are recorded only when reception is actually configured."),
          t("Les données personnelles de ces candidatures sont réservées aux administrateurs autorisés.", "Personal data from those applications is reserved for authorised administrators."),
          t("Aucune phrase secrète ni clé privée n'est demandée.", "No secret phrase or private key is requested."),
          t("À confirmer : hébergeur, durée de conservation, sous-traitants et audit de sécurité.", "TO BE CONFIRMED: host, retention period, processors and security audit."),
        ],
      },
    ],
  },
  {
    id: "gouvernance",
    index: "14",
    title: t("Gouvernance", "Governance"),
    blocks: [
      {
        type: "p",
        text: t(
          "Le fondateur identifié est ADJIBADOU FÉLIX, CEO. C'est la seule fonction de direction publiée dans ce document. Les règles de décision, la forme juridique et la présence d'autres dirigeants ne sont pas établies ici.",
          "The identified founder is ADJIBADOU FÉLIX, CEO. That is the only leadership role published in this document. Decision rules, legal form and the presence of other officers are not established here.",
        ),
      },
      {
        type: "note",
        text: t(
          "À confirmer : entité juridique, pays d'immatriculation, organe de décision et règles de signature.",
          "TO BE CONFIRMED: legal entity, country of registration, decision body and signing rules.",
        ),
      },
    ],
  },
  {
    id: "feuille",
    index: "15",
    title: t("Feuille de route indicative", "Indicative roadmap"),
    blocks: [
      {
        type: "p",
        text: t(
          "Cinq phases servent de structure. Aucune date et aucun achèvement ne sont annoncés.",
          "Five phases provide the structure. No date and no completion are announced.",
        ),
      },
      {
        type: "items",
        items: [
          t("Phase 1 — Fondation : identité publique et documents.", "Phase 1 — Foundation: public identity and documents."),
          t("Phase 2 — Développement : briques du produit, lorsqu'elles seront nommées.", "Phase 2 — Development: product building blocks, once they are named."),
          t("Phase 3 — Communauté : canaux officiels.", "Phase 3 — Community: official channels."),
          t("Phase 4 — Expansion : à préciser.", "Phase 4 — Expansion: to be specified."),
          t("Phase 5 — Écosystème : à préciser.", "Phase 5 — Ecosystem: to be specified."),
        ],
      },
    ],
  },
  {
    id: "croissance",
    index: "16",
    title: t("Croissance et communauté", "Growth and community"),
    blocks: [
      {
        type: "p",
        text: t(
          "La croissance envisagée passe par la clarté du projet, la campagne SidraStart et les canaux déjà publiés. Aucun objectif d'audience n'est chiffré.",
          "The envisioned growth relies on the clarity of the project, the SidraStart campaign and the channels already published. No audience target is quantified.",
        ),
      },
      {
        type: "note",
        text: t(
          "À confirmer : plan de contenu, partenariats et budget. Aucun partenariat autre que la présence dans l'écosystème SidraChain n'est annoncé.",
          "TO BE CONFIRMED: content plan, partnerships and budget. No partnership other than the presence in the SidraChain ecosystem is announced.",
        ),
      },
    ],
  },
  {
    id: "risques",
    index: "17",
    title: t("Risques, limites et mesures", "Risks, limits and measures"),
    blocks: [
      {
        type: "items",
        items: [
          t("Le projet peut ne pas aboutir, ou aboutir autrement que décrit.", "The project may not be completed, or may be completed differently from this description."),
          t("Les crypto-actifs, dont SDA, peuvent perdre toute valeur. Aucun remboursement n'est promis.", "Crypto-assets, including SDA, can lose all value. No refund is promised."),
          t("Une contribution sur SidraStart suit les règles de SidraStart, pas une promesse de ce document.", "A contribution on SidraStart follows SidraStart's rules, not a promise in this document."),
          t("Mesure actuelle : n'afficher que les faits fournis, et marquer le reste comme à confirmer.", "Current measure: show only the facts provided, and mark the rest as to be confirmed."),
        ],
      },
    ],
  },
  {
    id: "conclusion",
    index: "18",
    title: t("Conclusion", "Conclusion"),
    blocks: [
      {
        type: "p",
        text: t(
          "WIKENVA porte une ambition de marketplace et de rencontre entre talents. Cette ambition est réelle comme intention. Elle n'est pas un service ouvert, ni un produit financier, ni une promesse de gain.",
          "WIKENVA carries an ambition of a marketplace and of a meeting place for talent. That ambition is real as an intention. It is not an open service, nor a financial product, nor a promise of gain.",
        ),
      },
      {
        type: "p",
        text: t(
          "La version définitive de ce livre blanc devra reprendre les décisions encore ouvertes, puis remplacer cette version de relecture.",
          "The final version of this white paper will have to include the decisions that are still open, then replace this review draft.",
        ),
      },
    ],
  },
  {
    id: "mentions",
    index: "19",
    title: t("Mentions et avertissement", "Notices and disclaimer"),
    blocks: [
      {
        type: "p",
        text: t(
          "Ce texte est une version de relecture publiée pour discussion. Il ne constitue pas un conseil en investissement, une offre au public, ni un contrat. Contribuer sur SidraStart est un acte distinct, régi par SidraStart.",
          "This text is a review draft published for discussion. It is not investment advice, a public offer, or a contract. Contributing on SidraStart is a separate act, governed by SidraStart.",
        ),
      },
      {
        type: "p",
        text: t(
          "Aucune licence, aucun agrément et aucune certification ne sont revendiqués. Les noms SidraChain et SidraStart appartiennent à leurs titulaires.",
          "No licence, authorisation or certification is claimed. The names SidraChain and SidraStart belong to their owners.",
        ),
      },
    ],
  },
  {
    id: "ouvrir",
    index: "20",
    title: t("Informations encore à confirmer", "Information still to be confirmed"),
    blocks: [
      {
        type: "items",
        items: [
          t("Taux, assiette et répartition de la commission.", "Commission rate, base and allocation."),
          t("Symbole, blockchain, contrat et utilité du token.", "Token symbol, blockchain, contract and utility."),
          t("Entité juridique, pays et règles de gouvernance.", "Legal entity, country and governance rules."),
          t("Périmètre de la première version de l'application.", "Scope of the first version of the application."),
          t("Hébergement, conservation des données et audit.", "Hosting, data retention and audit."),
          t("Revue de finance islamique, sans certification à ce jour.", "Islamic finance review, with no certification to date."),
          t("Dates et livrables de la feuille de route.", "Roadmap dates and deliverables."),
          t("Orthographe définitive du nom de domaine public, indiqué ici comme wikanva.com.", "Final spelling of the public domain name, stated here as wikanva.com."),
          t("Validation par le fondateur pour remplacer cette relecture par la version officielle figée.", "Founder approval to replace this review draft with the frozen official version."),
        ],
      },
    ],
  },
];

export const founderDecisions: PaperCopy[] = [
  t("Fixer ou non un taux de commission, et sur quelles transactions.", "Whether to set a commission rate, and on which transactions."),
  t("Confirmer le symbole, la chaîne et le contrat, ou maintenir le token comme non déployé.", "Confirm the symbol, chain and contract, or keep the token as not deployed."),
  t("Choisir la forme juridique et qui signe au nom du projet.", "Choose the legal form and who signs for the project."),
  t("Dire si wikanva.com est bien le domaine définitif.", "State whether wikanva.com is the definitive domain."),
  t("Décider s'il existe un bonus partenaires et, sinon, le dire explicitement.", "Decide whether a partner bonus exists and, if not, say so explicitly."),
  t("Faire relire les modalités financières par une personne compétente avant toute mention de conformité.", "Have the financial terms reviewed by a qualified person before any compliance statement."),
  t("Approuver cette version, ou la corriger, avant de la déclarer officielle.", "Approve this version, or correct it, before calling it official."),
];
