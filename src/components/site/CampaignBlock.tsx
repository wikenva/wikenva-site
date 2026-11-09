/** @jsxImportSource @/lib/tx */
import { ExternalLink, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deadlines, links } from "@/config/site";
import { Countdown } from "./Countdown";
import { Container, Eyebrow, SectionHeading } from "./Section";

export function CampaignBlock({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Title = headingLevel;
  return (
    <section className="relative overflow-hidden bg-surface py-20 sm:py-28" aria-labelledby="campagne-titre">
      <div className="pointer-events-none absolute inset-0 pattern-star opacity-60" />
      <Container className="relative">
        {headingLevel === "h1" ? (
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Campagne SidraStart</Eyebrow>
            <Title id="campagne-titre" className="mt-5 text-[2.4rem] font-semibold leading-[1.06] text-foreground sm:text-6xl">
              La campagne de contribution WIKENVA entre dans sa phase finale.
            </Title>
          </div>
        ) : (
          <SectionHeading
            eyebrow="Campagne SidraStart"
            title={<span id="campagne-titre">La campagne de contribution WIKENVA entre dans sa phase finale.</span>}
          />
        )}
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Countdown {...deadlines.partnership} />
          <Countdown {...deadlines.campaign} tone="gold" />
        </div>
        <div className="mt-6 flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 shadow-card sm:flex-row sm:items-center sm:justify-between">
          <p className="flex max-w-2xl gap-3 text-sm leading-relaxed text-muted-foreground">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <span>
              « Toute contribution doit être effectuée uniquement à travers la page officielle du projet sur SidraStart.
              Consultez les conditions de participation avant toute transaction. »
            </span>
          </p>
          <Button asChild variant="ink" size="xl" className="h-auto min-h-13 shrink-0 whitespace-normal py-3 text-center">
            <a href={links.sidraStartProject} target="_blank" rel="noopener noreferrer">
              Soutenir le projet sur SidraStart <ExternalLink />
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
