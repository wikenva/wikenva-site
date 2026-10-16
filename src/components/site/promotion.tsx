import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { useLang, useTr } from "@/lib/locale";

export function PromotionClock({ compact = false }: { compact?: boolean }) {
  const tr = useTr();
  const { lang } = useLang();
  const ends = site.partnerPromotionEnds;
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!ends) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [ends]);

  if (!ends) return null;
  const end = new Date(ends).getTime();
  const left = end - now;
  const dateLabel = new Date(ends).toLocaleDateString(lang === "en" ? "en-GB" : "fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Lagos",
  });

  return (
    <div>
      <p className="text-sm font-semibold tracking-widest text-gold uppercase">{tr("Offre partenaire temporaire")}</p>
      <p className={compact ? "mt-1 font-display text-2xl font-semibold" : "mt-2 text-lg text-fg"}>
        {compact ? `${tr("Jusqu'au")} ${dateLabel}` : `${tr("La promotion SidraStart se termine le")} ${dateLabel}.`}
      </p>
      {left > 0 ? <Countdown left={left} compact={compact} /> : null}
      {left <= 0 ? (
        <p className="mt-4 text-sm text-muted">
          {tr("Cette promotion est close. Le compte à rebours n'est plus affiché. Le programme pourra être révisé.")}
        </p>
      ) : null}
      <p className="mt-3 text-sm text-muted">
        {compact
          ? tr("Jusqu'à cette date, une demande de partenaire peut suivre un investissement d'au moins 3 000 SDA sur SidraStart. Aucun rendement n'est garanti.")
          : tr("Le programme actuel prendra fin avec la promotion. Ensuite, WIKENVA pourra réviser les conditions, les critères et les avantages. Rien de nouveau n'est annoncé ici.")}
      </p>
    </div>
  );
}

function Countdown({ left, compact = false }: { left: number; compact?: boolean }) {
  const tr = useTr();
  const total = Math.floor(left / 1000);
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  const parts = [
    [days, tr("jours")],
    [hours, tr("heures")],
    [minutes, tr("minutes")],
    [seconds, tr("secondes")],
  ] as const;
  return (
    <div className={compact ? "mt-3 grid grid-cols-4 gap-2" : "mt-5 grid grid-cols-4 gap-2"} aria-live="polite">
      {parts.map(([value, label]) => (
        <div key={label} className="rounded-2xl border border-line bg-ink px-2 py-3 text-center">
          <p suppressHydrationWarning className={compact ? "font-display text-xl font-semibold tabular-nums" : "font-display text-2xl font-semibold tabular-nums sm:text-3xl"}>{value}</p>
          <p className="mt-1 text-xs text-muted">{label}</p>
        </div>
      ))}
    </div>
  );
}
