/** @jsxImportSource @/lib/tx */
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-gold",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-6 bg-gold-gradient" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 text-[2rem] font-semibold leading-[1.1] text-foreground sm:text-[2.75rem]">{title}</h2>
      {intro && <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{intro}</p>}
    </div>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>{children}</div>;
}

/** Bandeau d'ouverture des pages intérieures : encre, motif géométrique, titre éditorial. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="theme-ink relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-hero" />
      <div className="pointer-events-none absolute inset-0 pattern-star opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background/60" />
      <Container className="relative py-16 sm:py-24">
        <div className="mx-auto flex max-w-3xl animate-fade-up flex-col items-center text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-[2.4rem] font-semibold leading-[1.06] text-foreground sm:text-6xl">{title}</h1>
          {intro && <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">{intro}</p>}
          {children && <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap">{children}</div>}
        </div>
      </Container>
    </section>
  );
}

export function GlassCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-6 shadow-card", className)}>{children}</div>
  );
}
