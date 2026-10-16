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
  const locale = lang === "en" ? "en-GB" : "fr-FR";
  const zone = "Africa/Lagos";
  const when = new Date(ends);
  const day = when.toLocaleDateString(locale, { day: "numeric", timeZone: zone });
  const month = when.toLocaleDateString(locale, { month: "long", timeZone: zone });
  const year = when.toLocaleDateString(locale, { year: "numeric", timeZone: zone });

  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.22em] text-gold uppercase">{tr("Offre partenaire temporaire")}</p>
      <div className="mt-3 flex items-end gap-3">
        <p className={compact ? "font-display text-6xl leading-none font-semibold tabular-nums" : "font-display text-7xl leading-none font-semibold tabular-nums"}>
          {day}
        </p>
        <div className="pb-1">
          <p className="font-display text-2xl leading-none font-semibold capitalize">{month}</p>
          <p className="mt-1 text-sm tracking-[0.18em] text-muted">{year}</p>
        </div>
      </div>
      {left > 0 ? <Countdown left={left} /> : null}
      {left <= 0 ? (
        <p className="mt-4 text-sm text-muted">
          {tr("Cette promotion est close. Le compte à rebours n'est plus affiché. Le programme pourra être révisé.")}
        </p>
      ) : null}
      <p className="mt-4 border-t border-line pt-3 text-sm text-muted">
        {tr("Jusqu'à cette date, une demande de partenaire peut suivre un investissement d'au moins 1 000 SDA sur SidraStart. Aucun rendement n'est garanti.")}
      </p>
    </div>
  );
}

function Countdown({ left }: { left: number }) {
  const tr = useTr();
  const total = Math.floor(left / 1000);
  const parts = [
    [Math.floor(total / 86400), tr("jours")],
    [Math.floor((total % 86400) / 3600), tr("heures")],
    [Math.floor((total % 3600) / 60), tr("minutes")],
    [total % 60, tr("secondes")],
  ] as const;
  return (
    <div className="mt-5 grid grid-cols-4 overflow-hidden rounded-2xl border border-line bg-ink" aria-live="polite">
      {parts.map(([value, label], index) => (
        <div key={label} className={index ? "border-l border-line px-1 py-3 text-center" : "px-1 py-3 text-center"}>
          <p suppressHydrationWarning className="font-display text-2xl font-semibold tabular-nums sm:text-3xl">
            {String(value).padStart(2, "0")}
          </p>
          <p className="mt-1 text-[10px] font-semibold tracking-[0.14em] text-gold uppercase">{label}</p>
        </div>
      ))}
    </div>
  );
}
