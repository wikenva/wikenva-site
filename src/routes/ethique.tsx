/** @jsxImportSource @/lib/tx */
import { createFileRoute, Link } from "@tanstack/react-router";
import { Ban, BookCheck, Copyright, Eye, FileText, Flag, Handshake, Info, ScrollText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contact } from "@/config/site";
import { pageHead } from "@/lib/seo";
import { Container, GlassCard, PageHeader, SectionHeading } from "@/components/site/Section";
import { PartnerCta } from "@/components/site/PartnerCta";

export const Route = createFileRoute("/ethique")({
  head: ({ match }) =>
    pageHead(
      "Engagement éthique et principes islamiques",
      "Transparence, respect des droits d'auteur, honnêteté commerciale et modération : la charte éthique de la marketplace WIKENVA.",
      "/ethique", match.context.lang,
    ),
  component: EthicsPage,
});

const principles = [
  { icon: Eye, text: "La transparence des transactions." },
  { icon: Copyright, text: "Le respect des droits d'auteur." },
  { icon: ShieldCheck, text: "La protection de la propriété intellectuelle." },
  { icon: Ban, text: "L'interdiction des contenus illicites." },
  { icon: Handshake, text: "L'absence de tromperie commerciale." },
  { icon: FileText, text: "Des descriptions honnêtes des produits." },
  { icon: ScrollText, text: "Des conditions de vente compréhensibles." },
  { icon: BookCheck, text: "Le respect des engagements entre vendeurs et acheteurs." },
  { icon: Ban, text: "L'exclusion des activités et produits incompatibles avec les principes islamiques." },
];

const moderation = [
  { n: "1", title: "Signalement", text: "Tout visiteur peut signaler un contenu ou un comportement contraire à la charte." },
  { n: "2", title: "Examen", text: "L'équipe analyse le signalement et peut demander des précisions au vendeur." },
  { n: "3", title: "Décision", text: "Le contenu est maintenu, corrigé ou retiré ; les manquements répétés peuvent entraîner la fermeture d'une boutique." },
];

function EthicsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Engagement éthique"
        title="Une marketplace construite autour de valeurs éthiques et islamiques."
        intro="WIKENVA souhaite offrir un environnement où chaque échange est honnête, chaque création respectée et chaque produit compatible avec les principes islamiques."
      />
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Nos principes" title="Ce que WIKENVA souhaite favoriser." />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p) => (
              <li key={p.text} className="flex items-start gap-4 rounded-2xl border border-border bg-card-glass p-5">
                <p.icon className="h-6 w-6 shrink-0 text-gold" />
                <span className="font-medium text-foreground">{p.text}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <section className="border-y border-border bg-surface py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHeading
              eyebrow="Signalement et modération"
              title="Un processus clair pour protéger la communauté."
            />
            <Button asChild variant="hero" size="xl" className="mt-8">
              <a href={`mailto:${contact.email}?subject=${encodeURIComponent("Signalement de contenu WIKENVA")}`}>
                <Flag /> Signaler un contenu
              </a>
            </Button>
          </div>
          <ol className="grid gap-4">
            {moderation.map((m) => (
              <li key={m.n} className="flex gap-4 rounded-2xl border border-border bg-card-glass p-6">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand font-display font-bold text-foreground">{m.n}</span>
                <div>
                  <h3 className="font-bold text-foreground">{m.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <section className="py-20">
        <Container>
          <GlassCard className="flex gap-4 border-gold/40 p-8">
            <Info className="h-6 w-6 shrink-0 text-gold" />
            <div>
              <h2 className="text-xl font-bold text-foreground">Une démarche, pas une certification</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                WIKENVA ne détient à ce jour aucune certification religieuse officielle. Notre engagement est présenté
                comme une démarche éthique et de conformité aux principes islamiques, avec la possibilité d'une
                validation par des spécialistes qualifiés à l'avenir. Toute évolution sera communiquée officiellement.
              </p>
              <Link to="/faq" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
                Pourquoi un positionnement halal ? Voir la FAQ
              </Link>
            </div>
          </GlassCard>
        </Container>
      </section>
      <PartnerCta />
    </>
  );
}
