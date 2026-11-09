/** @jsxImportSource @/lib/tx */
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { deadlines } from "@/config/site";
import { useIsPast } from "@/lib/use-is-past";
import { cn } from "@/lib/utils";
import { DaysLeft } from "./Countdown";

const HIDDEN_ON = ["/candidature", "/admin"];

/** Barre d'action fixe sur mobile : rappelle l'échéance et mène à la candidature. */
export function StickyCta() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [visible, setVisible] = useState(false);
  const closed = useIsPast(deadlines.partnership.iso);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (closed || HIDDEN_ON.includes(pathname)) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-3 bottom-3 z-40 transition-all duration-500 sm:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      inert={!visible}
      aria-hidden={!visible}
    >
      <div className="theme-ink flex items-center gap-3 rounded-2xl border border-border p-2 pl-4 shadow-card">
        <div className="min-w-0 flex-1 leading-tight">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
            Candidatures
          </p>
          <p className="truncate text-sm font-semibold text-foreground">
            <DaysLeft iso={deadlines.partnership.iso} /> <span>jours restants</span>
          </p>
        </div>
        <Link
          to="/candidature"
          className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl bg-gold-gradient px-4 text-sm font-bold text-gold-foreground"
        >
          Devenir partenaire <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
