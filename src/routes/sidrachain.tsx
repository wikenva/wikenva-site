/** @jsxImportSource @/lib/tx */
import { createFileRoute } from "@tanstack/react-router";
import { Blocks, Code2, ExternalLink, Network, SearchCheck, UsersRound, Waypoints } from "lucide-react";
import { Button } from "@/components/ui/button";
import { links } from "@/config/site";
import { pageHead } from "@/lib/seo";
import { Container, GlassCard, PageHeader, SectionHeading } from "@/components/site/Section";
import { SidraCards, SidraDisclaimer } from "@/components/site/blocks";
import { PartnerCta } from "@/components/site/PartnerCta";

export const Route = createFileRoute("/sidrachain")({
  head: ({ match }) =>
    pageHead(
      "WIKENVA dans l'écosystème SidraChain",
      "Blockchain, transparence, SidraStart et SidraDex : comprendre l'écosystème SidraChain auquel WIKENVA souhaite s'intégrer.",
      "/sidrachain", match.context.lang,
    ),
  component: SidraPage,
});

const explainers = [
  { icon: Blocks, title: "La technologie blockchain", text: "Un registre partagé où chaque opération est enregistrée dans des blocs liés entre eux, difficiles à modifier après coup." },
  { icon: SearchCheck, title: "La transparence sur chaîne", text: "Les transactions sont consultables publiquement, par exemple via l'explorateur de SidraChain, grâce à leur hash." },
  { icon: Network, title: "L'écosystème numérique", text: "Portefeuille, plateforme de lancement de projets, échange décentralisé : un ensemble d'outils interconnectés." },
  { icon: Code2, title: "Le développement d'applications", text: "SidraChain étant compatible EVM, des applications et contrats intelligents peuvent y être déployés." },
  { icon: Waypoints, title: "Les perspectives Web3", text: "Traçabilité des œuvres, preuves de propriété ou paiements : des pistes que WIKENVA souhaite explorer." },
  { icon: UsersRound, title: "La collaboration communautaire", text: "Une communauté qui soutient les projets et participe à leur développement." },
];

function SidraPage() {
  return (
    <>
      <PageHeader
        eyebrow="Écosystème SidraChain"
        title="WIKENVA dans l'écosystème SidraChain."
        intro="SidraChain est l'environnement blockchain auquel le projet WIKENVA souhaite s'intégrer. Voici l'essentiel, expliqué simplement."
      >
        <Button asChild variant="hero" size="xl">
          <a href={links.sidraChain} target="_blank" rel="noopener noreferrer">
            Site officiel SidraChain <ExternalLink />
          </a>
        </Button>
      </PageHeader>
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Comprendre" title="La blockchain, en six notions." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {explainers.map((e) => (
              <GlassCard key={e.title}>
                <e.icon className="h-7 w-7 text-primary" />
                <h3 className="mt-4 text-lg font-bold text-foreground">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.text}</p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>
      <section className="border-y border-border bg-surface py-20">
        <Container>
          <SectionHeading eyebrow="Trois plateformes" title="SidraChain, SidraStart et SidraDex." />
          <div className="mt-10">
            <SidraCards />
            <SidraDisclaimer />
          </div>
          <Button asChild variant="link" className="mt-4 px-0">
            <a href={links.sidraChainExplorer} target="_blank" rel="noopener noreferrer">
              Explorateur public des transactions SidraChain <ExternalLink />
            </a>
          </Button>
        </Container>
      </section>
      <PartnerCta />
    </>
  );
}
