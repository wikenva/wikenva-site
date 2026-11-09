/** @jsxImportSource @/lib/tx */
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "./Section";
import { deadlines } from "@/config/site";
import { useIsPast } from "@/lib/use-is-past";

export function PartnerCta({
  title = "Prenez part à la construction de WIKENVA.",
  text = "Le programme de partenariat est ouvert aux contributeurs éligibles jusqu'au 10 décembre 2026. La candidature se fait en quelques minutes, sans création de compte.",
}: {
  title?: string;
  text?: string;
}) {
  const closed = useIsPast(deadlines.partnership.iso);

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="theme-ink relative overflow-hidden rounded-[2rem] p-8 sm:p-14">
          <div className="pointer-events-none absolute inset-0 bg-hero" />
          <div className="pointer-events-none absolute inset-0 pattern-star opacity-70" />
          <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold leading-tight text-foreground sm:text-[2.75rem]">
                {title}
              </h2>
              <p className="mt-4 text-muted-foreground">
                {closed
                  ? "Les candidatures au programme de partenariat sont actuellement clôturées. Consultez les conditions du programme et les prochaines actualités de WIKENVA."
                  : text}
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              {!closed && (
                <Button asChild variant="gold" size="xl">
                  <Link to="/candidature">
                    Devenir partenaire <ArrowRight />
                  </Link>
                </Button>
              )}
              <Button asChild variant="glass" size="xl">
                <Link to="/partenariat">Voir le programme</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
