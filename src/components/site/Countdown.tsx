/** @jsxImportSource @/lib/tx */
import { useLang } from "@/lib/i18n";
import { translate } from "@/lib/tx/core";
import { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";
import { getRemaining } from "@/lib/countdown";
import { deadlines } from "@/config/site";
import { cn } from "@/lib/utils";

const units = [
  { key: "days", label: "Jours" },
  { key: "hours", label: "Heures" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Secondes" },
] as const;

function useNow() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/** Nombre de jours restants (affichage compact, ex. pastille du bandeau d'accueil). */
export function DaysLeft({ iso, className }: { iso: string; className?: string }) {
  const now = useNow();
  const r = now === null ? null : getRemaining(iso, now);
  if (r?.ended) return <span className={className}>—</span>;
  return <span className={cn("tabular-nums", className)}>{r ? r.days : "--"}</span>;
}

export function Countdown({
  iso,
  label,
  dateLabel,
  text,
  tone = "cyan",
}: {
  iso: string;
  label: string;
  dateLabel: string;
  text: string;
  tone?: "cyan" | "gold";
}) {
  const { lang } = useLang();
  const now = useNow();
  const r = now === null ? null : getRemaining(iso, now);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border bg-card p-6 shadow-card sm:p-8",
        tone === "gold" ? "border-gold/40" : "border-border",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl",
          tone === "gold" ? "bg-gold/20" : "bg-primary/15",
        )}
      />
      <div className="relative">
        <p className={cn("text-[11px] font-bold uppercase tracking-[0.2em]", tone === "gold" ? "text-gold" : "text-primary")}>
          {label}
        </p>
        <p className="mt-3 flex items-center gap-2 font-display text-xl font-semibold sm:text-2xl text-foreground">
          <CalendarClock className="h-5 w-5 shrink-0 text-muted-foreground" /> {dateLabel}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>

        {r?.ended ? (
          <p role="status" className="mt-6 rounded-2xl border border-border bg-secondary px-4 py-5 text-center font-display text-lg font-semibold text-foreground">
            {deadlines.endedText}
          </p>
        ) : (
          <div
            className="mt-7 grid grid-cols-4 divide-x divide-border rounded-2xl border border-border bg-background/70"
            aria-live="off"
            aria-label={lang === "en" ? `Time remaining until ${translate(dateLabel, "en")}` : `Temps restant jusqu'au ${dateLabel}`}
          >
            {units.map((u) => (
              <div key={u.key} className="px-1 py-4 text-center">
                <span className="block font-display text-3xl font-semibold tabular-nums leading-none text-foreground sm:text-[2.6rem]">
                  {r ? String(r[u.key]).padStart(2, "0") : "--"}
                </span>
                <span className="mt-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground sm:text-[11px]">
                  {u.label}
                </span>
              </div>
            ))}
          </div>
        )}
        <p className="mt-3 text-xs text-muted-foreground">Heure de Porto-Novo (UTC+1).</p>
      </div>
    </div>
  );
}
