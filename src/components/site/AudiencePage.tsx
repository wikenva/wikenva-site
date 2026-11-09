/** @jsxImportSource @/lib/tx */
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, GlassCard, PageHeader } from "./Section";
import { StatusBadge } from "./StatusBadge";
import { PartnerCta } from "./PartnerCta";

export function AudiencePage({
  eyebrow,
  title,
  intro,
  icon: Icon,
  listTitle,
  items,
  note,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  icon: LucideIcon;
  listTitle: string;
  items: string[];
  note: string;
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} intro={intro}>
        <Button asChild variant="hero" size="xl">
          <Link to="/marketplace">
            Toute la marketplace <ArrowRight />
          </Link>
        </Button>
        <Button asChild variant="glass" size="xl">
          <Link to="/contact">Être informé de l'ouverture</Link>
        </Button>
      </PageHeader>
      <section className="py-20">
        <Container className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <GlassCard className="p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-foreground">
                <Icon className="h-7 w-7 text-primary" /> {listTitle}
              </h2>
              <StatusBadge status="en-developpement" />
            </div>
            <ul className="mt-6 space-y-3">
              {items.map((i) => (
                <li key={i} className="flex items-start gap-3 text-foreground">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" /> <span>{i}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
          <div className="rounded-2xl border border-border bg-surface p-8">
            <h3 className="text-lg font-bold text-foreground">Bon à savoir</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{note}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Tous les produits proposés sont exclusivement numériques et doivent respecter la{" "}
              <Link to="/ethique" className="text-primary underline underline-offset-2">charte éthique de WIKENVA</Link>.
            </p>
          </div>
        </Container>
      </section>
      <PartnerCta />
    </>
  );
}
