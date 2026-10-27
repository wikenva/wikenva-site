import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { useTr } from "@/lib/locale";

export function PromotionClock({ compact = false }: { compact?: boolean }) {
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
      {left > 0 ? <Countdown left={left} compact={compact} /> : null}
      {left <= 0 ? (
        <p className="mt-4 text-sm text-muted">
          {tr("Cette promotion est close. Le compte à rebours n'est plus affiché. Le programme pourra être révisé.")}
        </p>
      ) : compact ? null : (
        <p className="mx-auto mt-4 max-w-[16rem] text-balance text-sm leading-relaxed text-muted">
          {tr("Minimum 1 000 SDA sur SidraStart, jusqu'au 30 novembre 2026.")}
        </p>
      )}
    </div>
  );
}

function Countdown({ left, compact }: { left: number; compact?: boolean }) {
  const tr = useTr();
  const total = Math.floor(left / 1000);
  const parts = [
    [Math.floor(total / 86400), tr("jours")],
    [Math.floor((total % 86400) / 3600), tr("heures")],
    [Math.floor((total % 3600) / 60), tr("minutes")],
    [total % 60, tr("secondes")],
  ] as const;
  return (
    <div className={compact ? "grid grid-cols-4 gap-1" : "grid grid-cols-4 gap-1.5"} aria-live="polite">
      {parts.map(([value, label]) => (
        <div key={label} className={"rounded-xl border border-line bg-ink text-center " + (compact ? "px-0.5 py-2" : "px-0.5 py-2.5")}>
          <p suppressHydrationWarning className={"font-display font-semibold tabular-nums leading-none text-fg " + (compact ? "text-xl" : "text-2xl")}>
            {String(value).padStart(2, "0")}
          </p>
          <p className="mt-1 text-[9px] leading-none font-semibold tracking-wide text-gold uppercase">{label}</p>
        </div>
      ))}
    </div>
  );
}
