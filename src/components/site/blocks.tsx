/** @jsxImportSource @/lib/tx */
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BookOpen,
  ClipboardCheck,
  ExternalLink,
  FileSignature,
  Hash,
  Send,
  Globe2,
  Handshake,
  Layers,
  Lightbulb,
  MessageCircle,
  PenLine,
  Repeat,
  ShieldCheck,
  Sparkles,
  Store,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { contact, ecosystem, links, values } from "@/config/site";
import sidraChainLogo from "@/assets/sidrachain_logo.png.asset.json";
import sidraStartLogo from "@/assets/sidrastart_logo.png.asset.json";
import creatorsImage from "@/assets/creators_workspace_landscape.webp";
import { StatusBadge } from "./StatusBadge";
import { GlassCard } from "./Section";
import { SocialLinks } from "./SocialLinks";
import { ShareButton } from "./ShareButton";
import { cn } from "@/lib/utils";

export function ValuesRow({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap justify-center gap-2", className)}>
      {values.map((v) => (
        <li
          key={v}
          className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-card"
        >
          {v}
        </li>
      ))}
    </ul>
  );
}

/** Bandeau défilant des valeurs, entre deux sections. */
export function ValuesMarquee() {
  const row = [...values, ...values];
  return (
    <div className="relative overflow-hidden border-y border-border bg-surface-strong py-5" aria-label="Valeurs fondamentales">
      <ul className="flex w-max animate-marquee items-center gap-10 pr-10">
        {[...row, ...row].map((v, i) => (
          <li key={`${v}-${i}`} aria-hidden={i >= values.length} className="flex items-center gap-10 whitespace-nowrap font-display text-2xl italic text-foreground sm:text-3xl">
            {v}
            <span aria-hidden="true" className="text-base not-italic text-gold">✦</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const audiences = [
  { to: "/auteurs", icon: PenLine, title: "Espace des auteurs", text: "Publier, présenter et suivre ses livres numériques depuis un espace professionnel." },
  { to: "/lecteurs", icon: BookOpen, title: "Espace des lecteurs", text: "Découvrir, acheter et retrouver ses ebooks dans une bibliothèque personnelle." },
  { to: "/createurs", icon: Lightbulb, title: "Espace des créateurs", text: "Commercialiser guides, formations, modèles et ressources numériques originales." },
  { to: "/marketplace", icon: Store, title: "Boutiques en ligne", text: "Une vitrine numérique personnalisée, gratuite et sans frais de vente pour les partenaires validés." },
] as const;

export function AudienceCards() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr] lg:grid-rows-2">
      <div className="relative min-h-72 overflow-hidden rounded-3xl border border-border shadow-card lg:row-span-2">
        <img
          src={creatorsImage}
          alt="Une autrice et un créateur travaillant sur des contenus numériques"
          width={1400}
          height={939}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="theme-ink absolute inset-x-3 bottom-3 rounded-2xl border border-border bg-background/85 p-5 backdrop-blur-md">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">Notre vision</p>
          <p className="mt-2 font-display text-xl font-semibold leading-snug text-foreground">
            Donner aux créateurs les moyens de diffuser leur savoir.
          </p>
          <Link to="/vision" className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">
            Vision et mission <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:row-span-2">
        {audiences.map((a, i) => (
          <Link
            key={a.title}
            to={a.to}
            className="group relative flex flex-col rounded-3xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
          >
            <div className="flex items-start justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <a.icon className="h-5 w-5" />
              </span>
              <span className="font-display text-sm italic text-muted-foreground">0{i + 1}</span>
            </div>
            <h3 className="mt-6 text-xl font-semibold text-foreground">{a.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary">
              En savoir plus <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function EcosystemGrid() {
  return (
    <div>
      <ol className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
        {ecosystem.map((m, i) => (
          <li
            key={m.name}
            className="grid gap-3 border-b border-border p-5 last:border-b-0 sm:grid-cols-[3rem_14rem_1fr_auto] sm:items-center sm:gap-6 sm:px-7"
          >
            <span className="hidden font-display text-lg italic text-muted-foreground sm:block">0{i + 1}</span>
            <div className="flex items-center justify-between gap-3 sm:block">
              <h3 className="font-sans text-sm font-extrabold tracking-[0.12em] text-foreground">{m.name}</h3>
              <StatusBadge status={m.status} className="sm:hidden" />
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{m.text}</p>
            <StatusBadge status={m.status} className="hidden sm:inline-flex" />
          </li>
        ))}
      </ol>
      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
        « Disponible » : déjà accessible. « En développement » : en cours de construction. « Prévu » : inscrit dans la
        feuille de route, sans date garantie.
      </p>
    </div>
  );
}

export function SidraCards() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <GlassCard className="flex flex-col p-7">
        <div className="flex items-center gap-3">
          <img src={sidraChainLogo.url} alt="Logo SidraChain" width={48} height={48} loading="lazy" className="h-12 w-12 rounded-xl bg-brand-foreground p-1 ring-1 ring-border" />
          <h3 className="text-2xl font-semibold text-foreground">SidraChain</h3>
        </div>
        <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
          Un réseau blockchain compatible EVM pensé pour une finance conforme aux principes islamiques : comptes
          vérifiés, portefeuille intelligent, explorateur public des transactions et outils pour développer des
          applications. C'est l'écosystème auquel WIKENVA souhaite s'intégrer.
        </p>
        <Button asChild variant="glass" size="lg" className="mt-6">
          <a href={links.sidraChain} target="_blank" rel="noopener noreferrer">
            Découvrir SidraChain <ExternalLink />
          </a>
        </Button>
      </GlassCard>

      <div className="theme-ink relative flex flex-col overflow-hidden rounded-2xl border border-gold/40 p-7 shadow-gold">
        <div className="pointer-events-none absolute inset-0 pattern-star opacity-60" />
        <div className="relative flex items-center gap-3">
          <img src={sidraStartLogo.url} alt="Logo SidraStart" width={48} height={48} loading="lazy" className="h-12 w-12 rounded-xl bg-brand-foreground p-1" />
          <h3 className="text-2xl font-semibold text-foreground">SidraStart</h3>
        </div>
        <p className="relative mt-5 text-sm leading-relaxed text-muted-foreground">
          La plateforme de lancement de l'écosystème Sidra : elle permet de présenter des initiatives, de mobiliser
          la participation communautaire et d'accompagner le développement des projets.
        </p>
        <div className="relative mt-5 flex-1 rounded-xl border border-border bg-background/50 p-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">Projet présenté</p>
          <p className="mt-1 font-display text-lg font-semibold text-foreground">Digital Marketplace Ebook Halal</p>
        </div>
        <Button asChild variant="gold" size="lg" className="relative mt-6 h-auto min-h-11 whitespace-normal py-2.5 text-center">
          <a href={links.sidraStartProject} target="_blank" rel="noopener noreferrer">
            Découvrir et soutenir WIKENVA sur SidraStart <ExternalLink />
          </a>
        </Button>
      </div>

      <GlassCard className="flex flex-col p-7">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand text-brand-foreground">
            <Repeat className="h-6 w-6" />
          </span>
          <h3 className="text-2xl font-semibold text-foreground">SidraDex</h3>
        </div>
        <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
          Une plateforme d'échange décentralisé (DEX) associée à SidraChain. Sur un DEX, les échanges d'actifs
          numériques se font directement entre utilisateurs, via des contrats intelligents, sans intermédiaire qui
          détient les fonds. Il ouvre des perspectives d'échanges au sein de l'écosystème.
        </p>
        <Button asChild variant="glass" size="lg" className="mt-6">
          <a href={links.sidraDex} target="_blank" rel="noopener noreferrer">
            Découvrir SidraDex <ExternalLink />
          </a>
        </Button>
      </GlassCard>
    </div>
  );
}

export function SidraDisclaimer() {
  return (
    <p className="mt-6 flex gap-3 rounded-2xl border border-border bg-surface p-4 text-xs leading-relaxed text-muted-foreground">
      <ShieldCheck className="h-4 w-4 shrink-0 text-gold" />
      <span>
        WIKENVA est un projet indépendant présenté sur SidraStart. Aucun partenariat officiel, aucune validation de
        WIKENVA par SidraChain, SidraStart ou SidraDex, aucune cotation ni aucun prix futur ne sont annoncés ici.
        Vérifiez toujours l'adresse des sites officiels avant toute opération et ne communiquez jamais votre phrase
        secrète.
      </span>
    </p>
  );
}

const reasons = [
  { icon: Layers, title: "Un marché exclusivement numérique", text: "Pas de stock ni de logistique : uniquement des produits digitaux, accessibles partout." },
  { icon: Globe2, title: "Une vision internationale", text: "Une marketplace pensée dès le départ pour des auteurs et lecteurs du monde entier." },
  { icon: PenLine, title: "Un environnement pour les créateurs", text: "Des espaces dédiés aux auteurs et créateurs pour publier, présenter et vendre." },
  { icon: Sparkles, title: "Des opportunités entrepreneuriales", text: "Boutiques numériques et outils pour développer une activité en ligne." },
  { icon: ShieldCheck, title: "Une orientation éthique et islamique", text: "Transparence, honnêteté et respect des droits au cœur des échanges." },
  { icon: Handshake, title: "L'écosystème SidraChain en ligne de mire", text: "Une ambition d'intégration aux solutions blockchain de SidraChain." },
];

export function WhyJoin() {
  return (
    <div>
      <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((r) => (
          <div key={r.title} className="bg-card p-7">
            <r.icon className="h-6 w-6 text-gold" />
            <h3 className="mt-5 text-lg font-semibold text-foreground">{r.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
          </div>
        ))}
      </div>
      <figure className="mx-auto mt-16 max-w-3xl text-center">
        <span aria-hidden="true" className="font-display text-6xl leading-none text-gold">“</span>
        <blockquote className="-mt-4 font-display text-2xl font-medium italic leading-snug text-foreground sm:text-3xl">
          « Les grandes plateformes commencent par une vision. WIKENVA veut construire un espace où les idées deviennent
          des créations, où les connaissances deviennent accessibles et où les créateurs peuvent développer leur activité
          numérique. »
        </blockquote>
      </figure>
    </div>
  );
}

const partnerSteps = [
  { icon: ExternalLink, title: "Contribuer sur SidraStart", text: "Contribuez d'abord au projet Digital Marketplace Ebook Halal depuis sa page officielle sur SidraStart, puis gardez le hash de la transaction." },
  { icon: Send, title: "Envoyer la candidature", text: "Remplissez le formulaire en quelques minutes, sans création de compte ni montant imposé." },
  { icon: Hash, title: "Conserver son code", text: "Un code de suivi personnel s'affiche à l'envoi : notez-le pour suivre votre demande." },
  { icon: ClipboardCheck, title: "Examen", text: "L'administration de WIKENVA étudie chaque candidature et la valide ou non." },
  { icon: FileSignature, title: "Accord écrit", text: "Si elle est acceptée, le partenariat est formalisé par un accord signé." },
];

/** Parcours du partenaire, de la contribution à l'accord signé. */
export function PartnerSteps({ className }: { className?: string }) {
  return (
    <ol className={cn("relative grid gap-3", className)}>
      <span aria-hidden="true" className="absolute bottom-6 left-[1.4rem] top-6 w-px bg-border" />
      {partnerSteps.map((s, i) => (
        <li key={s.title} className="relative flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-card sm:p-5">
          <span className="relative grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold-gradient font-display text-sm font-semibold text-gold-foreground">
            {i + 1}
          </span>
          <div className="min-w-0">
            <p className="flex items-center gap-2 font-semibold text-foreground">
              <s.icon className="h-4 w-4 shrink-0 text-primary" /> {s.title}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function CommunityBlock() {
  return (
    <div className="grid grid-cols-1 gap-8 overflow-hidden rounded-[2rem] border border-border bg-card p-6 text-center shadow-card sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:text-left">
      <div className="flex min-w-0 flex-col items-center lg:items-start">
        <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Rejoignez la communauté WIKENVA</h2>
        <p className="mt-4 text-muted-foreground">
          Suivez l'avancement du projet, posez vos questions et échangez avec l'équipe sur nos canaux officiels.
        </p>
        <SocialLinks className="mt-6" />
      </div>
      <div className="flex min-w-0 flex-col gap-3 [&>*]:h-auto [&>*]:min-h-13 [&>*]:w-full [&>*]:whitespace-normal [&>*]:px-4 [&>*]:py-3 [&>*]:text-center [&>*]:text-[15px] sm:[&>*]:text-base">
        <Button asChild variant="hero" size="xl">
          <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
            <MessageCircle /> Contacter l'équipe sur WhatsApp
          </a>
        </Button>
        <Button asChild variant="glass" size="xl">
          <a href={`mailto:${contact.email}`}>
            <Mail /> <span className="min-w-0 text-sm sm:text-base">{contact.email}</span>
          </a>
        </Button>
        <ShareButton />
      </div>
    </div>
  );
}
