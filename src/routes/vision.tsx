/** @jsxImportSource @/lib/tx */
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Eye, Handshake, Lightbulb, Megaphone, Scale, ShoppingBag, Target } from "lucide-react";
import { pageHead } from "@/lib/seo";
import { Container, GlassCard, PageHeader, SectionHeading } from "@/components/site/Section";
import { ValuesRow } from "@/components/site/blocks";
import { PartnerCta } from "@/components/site/PartnerCta";

export const Route = createFileRoute("/vision")({
  head: ({ match }) =>
    pageHead(
      "Notre vision et notre mission",
      "La vision de WIKENVA : une marketplace digitale internationale qui donne aux auteurs, créateurs et entrepreneurs les moyens de diffuser leur savoir.",
      "/vision", match.context.lang,
    ),
  component: VisionPage,
});

const missions = [
  { icon: BookOpen, text: "Faciliter l'accès au savoir numérique." },
  { icon: Megaphone, text: "Donner de la visibilité aux auteurs indépendants." },
  { icon: Lightbulb, text: "Accompagner les créateurs de contenu." },
  { icon: Target, text: "Favoriser l'entrepreneuriat digital." },
  { icon: ShoppingBag, text: "Connecter les vendeurs et les acheteurs." },
  { icon: Handshake, text: "Promouvoir des échanges transparents et responsables." },
  { icon: Scale, text: "Développer une économie numérique respectueuse des principes islamiques." },
];

const valueDetails = [
  { name: "Confiance", text: "Des règles claires et des engagements tenus entre vendeurs, acheteurs et partenaires." },
  { name: "Transparence", text: "Des descriptions honnêtes, des conditions lisibles et une communication sans zone d'ombre." },
  { name: "Innovation", text: "Des outils modernes, de l'IA à la blockchain, au service des créateurs." },
  { name: "Créativité", text: "Une place pour les œuvres originales et les nouvelles formes de savoir." },
  { name: "Éthique", text: "Une démarche de conformité aux principes islamiques dans chaque échange." },
  { name: "Collaboration", text: "Une communauté où auteurs, créateurs et partenaires avancent ensemble." },
];

function VisionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Notre vision"
        title="Construire l'espace où le savoir et la créativité circulent librement."
        intro="WIKENVA est une marketplace numérique internationale destinée à connecter les auteurs, les lecteurs, les créateurs de contenu et les entrepreneurs digitaux dans un environnement moderne, accessible et fondé sur des principes éthiques conformes aux valeurs islamiques."
      />
      <section className="py-20">
        <Container className="grid gap-6 lg:grid-cols-2">
          <GlassCard className="p-8">
            <Eye className="h-8 w-8 text-primary" />
            <h2 className="mt-4 text-2xl font-bold text-foreground">Notre vision</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Construire une marketplace digitale internationale capable de donner aux auteurs, aux créateurs et aux
              entrepreneurs les moyens de diffuser leurs connaissances, de commercialiser leurs créations numériques et de
              développer leurs activités en ligne.
            </p>
          </GlassCard>
          <GlassCard className="p-8">
            <Target className="h-8 w-8 text-gold" />
            <h2 className="mt-4 text-2xl font-bold text-foreground">Notre ambition</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Bâtir un espace numérique où le savoir, la créativité et les produits digitaux peuvent circuler librement,
              avec transparence et respect des droits de chacun. Un marché exclusivement numérique, sans aucun produit
              physique.
            </p>
          </GlassCard>
        </Container>
      </section>
      <section className="border-y border-border bg-surface py-20">
        <Container>
          <SectionHeading eyebrow="Notre mission" title="Sept engagements concrets." />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {missions.map((m) => (
              <li key={m.text} className="flex items-start gap-4 rounded-2xl border border-border bg-card-glass p-5">
                <m.icon className="h-6 w-6 shrink-0 text-primary" />
                <span className="font-medium text-foreground">{m.text}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Valeurs fondamentales" title="Confiance — Transparence — Innovation — Créativité — Éthique — Collaboration." />
          <div className="mt-8">
            <ValuesRow />
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {valueDetails.map((v) => (
              <GlassCard key={v.name}>
                <h3 className="text-lg font-bold text-gold">{v.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>
      <PartnerCta />
    </>
  );
}
