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
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (closed || HIDDEN_ON.includes(pathname)) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-4 bottom-4 z-40 transition-all duration-500 ease-out sm:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-20 opacity-0",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      inert={!visible}
      aria-hidden={!visible}
    >
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-brand/95 p-2 pl-4 shadow-lg backdrop-blur-md">
        <div className="min-w-0 flex-1 leading-tight">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold/90">
            Candidatures
          </p>
          <p className="truncate text-sm font-medium text-white">
            <DaysLeft iso={deadlines.partnership.iso} /> <span className="text-white/80">jours restants</span>
          </p>
        </div>
        <Link
          to="/candidature"
          className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl bg-gold-gradient px-3.5 text-sm font-semibold text-gold-foreground shadow-sm transition-transform active:scale-[0.98]"
        >
          Devenir partenaire
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
