/** @jsxImportSource @/lib/tx */
import { txMeta } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookMarked, Check, Compass, Scale, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/marketplace_hero_landscape.webp";
import { brand, deadlines, links, partnership } from "@/config/site";
import { Container, Eyebrow, SectionHeading } from "@/components/site/Section";
import {
  AudienceCards,
  CommunityBlock,
  EcosystemGrid,
  PartnerSteps,
  SidraCards,
  SidraDisclaimer,
  ValuesMarquee,
  WhyJoin,
} from "@/components/site/blocks";
import { CampaignBlock } from "@/components/site/CampaignBlock";
import { TeamSection } from "@/components/site/TeamCards";
import { DaysLeft } from "@/components/site/Countdown";
import { FaqList } from "@/components/site/FaqList";
import { PartnerCta } from "@/components/site/PartnerCta";
import { StatusBadge } from "@/components/site/StatusBadge";

export const Route = createFileRoute("/")({
  head: ({ match }) => ({
    meta: txMeta(
      [
        { title: "WIKENVA — L'avenir du commerce numérique et du savoir" },
        {
          name: "description",
          content:
            "WIKENVA, Digital Marketplace Ebook Halal : une marketplace digitale internationale et éthique pour auteurs, lecteurs et créateurs. Lire. Créer. Partager. Gagner.",
        },
        { property: "og:title", content: "WIKENVA — L'avenir du commerce numérique et du savoir" },
        {
          property: "og:description",
          content:
            "Une marketplace digitale internationale qui rapproche auteurs, lecteurs et créateurs dans un environnement éthique.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: links.officialSite },
        { name: "twitter:card", content: "summary" },
      ],
      match.context.lang,
    ),
    links: [{ rel: "canonical", href: links.officialSite }],
  }),
  component: Index,
});

const problems = [
  {
    icon: Compass,
    title: "Le problème",
    text: "Auteurs et créateurs indépendants peinent à se faire connaître et à vendre leurs œuvres numériques, tandis que les lecteurs cherchent un espace fiable, aligné sur leurs valeurs.",
  },
  {
    icon: Sparkles,
    title: "Notre réponse",
    text: "Une marketplace exclusivement numérique qui réunit publication, distribution, boutiques et communauté dans un même écosystème.",
  },
  {
    icon: Scale,
    title: "Notre différence",
    text: "Des règles claires : transparence des transactions, respect des droits d'auteur et exclusion des contenus incompatibles avec les principes islamiques.",
  },
];

const principles = [
  "Transparence des transactions",
  "Respect des droits d'auteur",
  "Descriptions honnêtes",
  "Conditions de vente compréhensibles",
  "Exclusion des contenus illicites",
];

function Hero() {
  return (
    <section className="theme-ink relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-hero" />
      <div className="pointer-events-none absolute inset-0 pattern-star opacity-60" />
      <Container className="relative grid items-center gap-12 pb-16 pt-12 sm:pb-24 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="animate-fade-up text-center lg:text-left">
          <Eyebrow>{brand.project}</Eyebrow>
          <h1 className="mt-6 text-[2.75rem] font-semibold leading-[1.02] text-foreground sm:text-7xl">
            <span className="text-gradient">L'avenir du commerce numérique et du savoir.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
            {brand.description}
          </p>
          <p className="mt-6 flex flex-wrap justify-center gap-x-3 gap-y-1 font-display text-xl italic sm:text-2xl lg:justify-start">
            {brand.sloganWords.map((w, i) => (
              <span key={w} className={i % 2 === 0 ? "text-foreground" : "text-gold"}>
                {w}
              </span>
            ))}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Button asChild variant="gold" size="xl">
              <Link to="/candidature">
                Devenir partenaire <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/marketplace">Découvrir WIKENVA</Link>
            </Button>
          </div>

          <dl className="mt-12 grid grid-cols-3 divide-x divide-border border-y border-border py-5 text-center lg:text-left">
            <div className="min-w-0 px-2 lg:pl-0 lg:pr-5">
              <dt className="sr-only">Candidature</dt>
              <dd className="font-display text-base font-semibold leading-tight text-foreground min-[380px]:text-lg sm:text-3xl">
                {partnership.threshold}
              </dd>
              <dd className="mt-1 text-[11px] leading-snug text-muted-foreground sm:text-xs">
                Candidature
              </dd>
            </div>
            <div className="min-w-0 px-2 lg:px-5">
              <dt className="sr-only">Candidatures</dt>
              <dd className="font-display text-lg font-semibold text-gold sm:text-3xl">
                <DaysLeft iso={deadlines.partnership.iso} />
              </dd>
              <dd className="mt-1 text-[11px] leading-snug text-muted-foreground sm:text-xs">
                jours avant la fin des candidatures
              </dd>
            </div>
            <div className="min-w-0 px-2 lg:px-5">
              <dt className="sr-only">Projet présenté</dt>
              <dd className="font-display text-lg font-semibold text-foreground sm:text-3xl">
                SidraStart
              </dd>
              <dd className="mt-1 text-[11px] leading-snug text-muted-foreground sm:text-xs">
                Projet présenté
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute -inset-4 arch border border-gold/30" />
          <div className="absolute -inset-10 rounded-full bg-royal/30 blur-3xl" />
          <img
            src={heroImage}
            alt="Ebooks, ordinateur et smartphones affichant des boutiques numériques"
            width={1400}
            height={966}
            fetchPriority="high"
            className="relative aspect-[4/5] w-full arch border border-border object-cover shadow-glow"
          />
          <div className="absolute -bottom-5 left-1/2 flex w-[85%] -translate-x-1/2 items-center justify-between gap-3 rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-card backdrop-blur-md sm:-left-6 sm:w-auto sm:translate-x-0">
            <span className="font-sans text-xs font-extrabold tracking-[0.12em] text-foreground">
              WIKENVA MARKET
            </span>
            <StatusBadge status="en-developpement" />
          </div>
        </div>
      </Container>
    </section>
  );
}

function Index() {
  return (
    <>
      <Hero />
      <ValuesMarquee />

      {/* Pourquoi */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            align="left"
            className="lg:sticky lg:top-28 lg:self-start"
            eyebrow="Pourquoi WIKENVA existe"
            title="Plus qu'une boutique d'ebooks : un écosystème de création, de savoir et d'entrepreneuriat."
            intro="WIKENVA veut construire un espace numérique où le savoir, la créativité et les produits digitaux circulent librement, avec transparence et respect des droits de chacun."
          />
          <ol className="grid gap-0">
            {problems.map((p, i) => (
              <li
                key={p.title}
                className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-border py-8 last:border-b"
              >
                <span className="font-display text-4xl italic leading-none text-gold">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="flex items-center gap-2 text-2xl font-semibold text-foreground">
                    <p.icon className="h-5 w-5 text-primary" /> {p.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Marketplace */}
      <section className="pb-20 sm:pb-28">
        <Container>
          <SectionHeading
            eyebrow="Découvrir WIKENVA Marketplace"
            title="Un espace pour chacun."
            intro="Auteurs, lecteurs, créateurs et partenaires : la marketplace est pensée pour tous ceux qui font vivre le savoir numérique."
          />
          <div className="mt-12">
            <AudienceCards />
          </div>
        </Container>
      </section>

      {/* Écosystème */}
      <section className="border-y border-border bg-surface py-20 sm:py-28">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              align="left"
              eyebrow="Feuille de route"
              title="L'écosystème WIKENVA"
              intro="Chaque espace affiche son statut réel. Aucune fonctionnalité future n'est présentée comme déjà opérationnelle."
            />
          </div>
          <div className="mt-12">
            <EcosystemGrid />
          </div>
        </Container>
      </section>

      {/* Éthique */}
      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Engagement éthique"
              title="Une marketplace construite autour de valeurs éthiques et islamiques."
              intro="Transparence des transactions, respect des droits d'auteur, descriptions honnêtes, conditions de vente compréhensibles et exclusion des contenus illicites : une démarche de conformité aux principes islamiques, ouverte à une validation spécialisée."
            />
            <Button asChild variant="ink" size="xl" className="mt-9">
              <Link to="/ethique">
                <BookMarked /> Lire notre charte éthique
              </Link>
            </Button>
          </div>
          <div className="theme-ink relative overflow-hidden arch px-8 pb-10 pt-24 sm:px-12 sm:pt-28">
            <div className="pointer-events-none absolute inset-0 pattern-star opacity-80" />
            <div className="pointer-events-none absolute inset-0 bg-hero" />
            <p className="relative text-center text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
              Nos principes
            </p>
            <ul className="relative mt-6 space-y-3">
              {principles.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background/50 px-4 py-3 text-sm font-semibold text-foreground backdrop-blur-sm"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-gradient text-gold-foreground">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Partenariat */}
      <section className="theme-ink relative overflow-hidden py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-hero" />
        <div className="pointer-events-none absolute inset-0 pattern-star opacity-60" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Programme officiel"
                title="Devenez partenaire de WIKENVA."
                intro="Participez à la construction d'une marketplace digitale internationale et prenez part à une vision tournée vers le savoir, la créativité et l'entrepreneuriat numérique."
              />
              <div className="mt-9 flex items-end gap-5 rounded-3xl border border-gold/40 bg-card p-6 shadow-gold">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
                    Candidature
                  </p>
                  <p className="mt-2 font-display text-5xl font-semibold text-foreground">
                    {partnership.threshold}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">{partnership.thresholdText}</p>
                </div>
              </div>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {partnership.benefits.slice(0, 4).map((b) => (
                  <li
                    key={b.title}
                    className="rounded-2xl border border-border bg-background/40 p-5"
                  >
                    <p className="font-display text-lg font-semibold text-foreground">{b.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Ces avantages ne constituent ni un gain garanti, ni un intérêt, ni une promesse de
                rendement financier.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-foreground sm:text-3xl">
                Comment rejoindre le programme
              </h3>
              <PartnerSteps className="mt-6" />
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="gold" size="xl">
                  <Link to="/candidature">
                    Devenir partenaire <ArrowRight />
                  </Link>
                </Button>
                <Button asChild variant="glass" size="xl">
                  <Link to="/partenariat">Conditions du programme</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CampaignBlock />

      <TeamSection />

      {/* SidraChain */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Écosystème blockchain"
            title="WIKENVA dans l'écosystème SidraChain."
            intro="SidraChain est l'environnement blockchain auquel WIKENVA souhaite s'intégrer, pour plus de transparence et de nouvelles perspectives Web3."
          />
          <div className="mt-12">
            <SidraCards />
            <SidraDisclaimer />
          </div>
          <div className="mt-6 text-center">
            <Button asChild variant="link" className="px-0 text-base font-bold">
              <Link to="/sidrachain">
                Comprendre la blockchain et SidraChain <ArrowRight />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Pourquoi rejoindre */}
      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Pourquoi rejoindre WIKENVA ?"
            title="Six raisons de croire en WIKENVA."
            align="center"
          />
          <div className="mt-12">
            <WhyJoin />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              title="Questions fréquentes"
              intro="Des réponses simples et transparentes sur WIKENVA, la campagne et le partenariat."
            />
            <Button asChild variant="glass" size="xl" className="mt-8">
              <Link to="/faq">Toutes les questions</Link>
            </Button>
          </div>
          <FaqList limit={5} />
        </Container>
      </section>

      <section className="pb-4">
        <Container>
          <CommunityBlock />
        </Container>
      </section>

      <PartnerCta />
    </>
  );
}
