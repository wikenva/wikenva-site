import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { useTr } from "@/lib/locale";

export function PromotionClock(_props?: { compact?: boolean }) {
  const tr = useTr();
  const ends = site.partnerPromotionEnds;
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!ends) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [ends]);

  if (!ends) return null;
  const left = new Date(ends).getTime() - now;

  return (
    <div className="text-center">
      <p className="text-[11px] font-semibold tracking-[0.28em] text-gold uppercase">{tr("Partenaire")}</p>
      {left > 0 ? <Countdown left={left} /> : null}
      {left <= 0 ? (
        <p className="mt-4 text-sm text-muted">
          {tr("Cette promotion est close. Le compte à rebours n'est plus affiché. Le programme pourra être révisé.")}
        </p>
      ) : null}
      <p className="mx-auto mt-6 max-w-[18rem] text-balance text-sm font-semibold leading-relaxed">
        {tr("Minimum 2 000 SDA sur SidraStart pour être partenaire.")}
      </p>
      <p className="mt-3 text-sm text-gold">{tr("Valable jusqu'au 30 novembre 2026.")}</p>
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
    <div className="mt-5 grid grid-cols-4" aria-live="polite">
      {parts.map(([value, label], index) => (
        <div key={label} className={index ? "border-l border-white/10 px-2 text-center" : "px-2 text-center"}>
          <p suppressHydrationWarning className="font-display text-4xl font-semibold tabular-nums tracking-tight">
            {String(value).padStart(2, "0")}
          </p>
          <p className="mt-2 text-[10px] font-semibold tracking-[0.14em] text-gold uppercase">{label}</p>
        </div>
      ))}
    </div>
  );
}
