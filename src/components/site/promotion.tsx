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
      {left > 0 ? <Countdown left={left} /> : null}
      {left <= 0 ? (
        <p className="mt-4 text-sm text-muted">
          {tr("Cette promotion est close. Le compte à rebours n'est plus affiché. Le programme pourra être révisé.")}
        </p>
      ) : (
        <p className="mx-auto mt-4 max-w-[16rem] text-balance text-sm leading-relaxed text-muted">
          {tr("Minimum 2 000 SDA sur SidraStart, jusqu'au 30 novembre 2026.")}
        </p>
      )}
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
    <div className="grid grid-cols-4 gap-1.5" aria-live="polite">
      {parts.map(([value, label]) => (
        <div key={label} className="rounded-xl border border-white/10 px-0.5 py-2 text-center">
          <p suppressHydrationWarning className="font-display text-2xl font-semibold tabular-nums leading-none">
            {String(value).padStart(2, "0")}
          </p>
          <p className="mt-1.5 text-[9px] leading-none font-medium text-gold capitalize">{label}</p>
        </div>
      ))}
    </div>
  );
}
