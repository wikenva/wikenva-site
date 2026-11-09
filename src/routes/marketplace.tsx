/** @jsxImportSource @/lib/tx */
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Check, LayoutGrid, Palette, Store, UserRound, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/marketplace_hero_landscape.webp";
import { pageHead } from "@/lib/seo";
import { Container, GlassCard, PageHeader, SectionHeading } from "@/components/site/Section";
import { AudienceCards, EcosystemGrid } from "@/components/site/blocks";
import { StatusBadge } from "@/components/site/StatusBadge";
import { PartnerCta } from "@/components/site/PartnerCta";

export const Route = createFileRoute("/marketplace")({
  head: ({ match }) =>
    pageHead(
      "Découvrir la marketplace",
      "Auteurs, lecteurs, créateurs et boutiques en ligne : découvrez comment fonctionnera la marketplace numérique WIKENVA et son écosystème.",
      "/marketplace", match.context.lang,
    ),
  component: MarketplacePage,
});

const shopFeatures = [
  { icon: Store, text: "Disposer d'une boutique numérique." },
  { icon: UserRound, text: "Présenter son identité et ses produits." },
  { icon: Palette, text: "Personnaliser sa vitrine." },
  { icon: LayoutGrid, text: "Organiser son catalogue." },
  { icon: Users, text: "Développer sa clientèle." },
  { icon: BarChart3, text: "Suivre les performances de son activité." },
];

const steps = [
  { n: "01", title: "Publier", text: "Auteurs et créateurs déposent leurs produits numériques avec une description honnête." },
  { n: "02", title: "Vérifier", text: "Les contenus sont soumis à la charte éthique et peuvent être signalés puis modérés." },
  { n: "03", title: "Découvrir", text: "Les lecteurs explorent les catégories et consultent les présentations détaillées." },
  { n: "04", title: "Acheter & lire", text: "Les achats rejoignent la bibliothèque personnelle, selon les conditions de licence." },
];

function MarketplacePage() {
  return (
    <>
      <PageHeader
        eyebrow="WIKENVA Marketplace"
        title="Un écosystème complet de création, de distribution et de savoir."
        intro="WIKENVA n'est pas une simple boutique d'ebooks : c'est un lieu où auteurs, lecteurs, créateurs et entrepreneurs digitaux se rencontrent autour de produits exclusivement numériques."
      >
        <Button asChild variant="gold" size="xl">
          <Link to="/candidature">Devenir partenaire</Link>
        </Button>
      </PageHeader>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Les espaces" title="Quatre catégories d'utilisateurs, une seule marketplace." />
          <div className="mt-10">
            <AudienceCards />
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface py-20">
        <Container>
          <SectionHeading eyebrow="Fonctionnement" title="Comment la marketplace fonctionnera." />
          <ol className="mt-10 grid gap-4 md:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n} className="rounded-2xl border border-border bg-card-glass p-6">
                <span className="font-display text-3xl font-bold text-gradient">{s.n}</span>
                <h3 className="mt-3 text-lg font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="boutiques" className="py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <SectionHeading eyebrow="Boutiques en ligne" title="Votre vitrine numérique, à votre image." />
            </div>
            <p className="mt-4 text-muted-foreground">Chaque partenaire validé pourra, selon les conditions du programme :</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {shopFeatures.map((f) => (
                <li key={f.text} className="flex items-start gap-3 rounded-xl border border-border bg-card-glass p-4 text-sm text-foreground">
                  <f.icon className="h-5 w-5 shrink-0 text-primary" /> {f.text}
                </li>
              ))}
            </ul>
            <GlassCard className="mt-6 border-gold/40">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-display font-bold text-gold">Boutique en ligne gratuite, sans frais de vente</p>
                <StatusBadge status="en-developpement" />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Seuls les partenaires validés de WIKENVA bénéficieront d'une boutique en ligne gratuite à vie, sans aucun
                frais de vente, conformément à leur accord de partenariat signé.
              </p>
            </GlassCard>
          </div>
          <img src={heroImage} alt="Vitrines numériques sur ordinateur et smartphones" width={1400} height={966} loading="lazy" className="w-full rounded-[2rem] border border-border object-cover shadow-glow" />
        </Container>
      </section>

      <section className="border-t border-border bg-surface py-20">
        <Container>
          <SectionHeading
            eyebrow="L'écosystème WIKENVA"
            title="Six espaces pour aller plus loin."
            intro="Disponibles, en développement ou prévus : chaque espace est présenté avec son statut réel."
          />
          <div className="mt-10">
            <EcosystemGrid />
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/ethique">
                Notre charte éthique <ArrowRight />
              </Link>
            </Button>
          </div>
          <p className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="h-4 w-4 text-gold" /> Marché exclusivement numérique : aucun produit physique n'est proposé.
          </p>
        </Container>
      </section>
      <PartnerCta />
    </>
  );
}
