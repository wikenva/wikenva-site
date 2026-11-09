import { useRouterState } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";

import { useLang } from "@/lib/i18n";

export function NavigationLoader() {
  const isLoading = useRouterState({ select: (state) => state.isLoading });
  const { t } = useLang();

  if (!isLoading) return null;

  return (
    <div
      className="pointer-events-none fixed left-1/2 top-5 z-[90] -translate-x-1/2"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-center gap-2.5 rounded-full border bg-card/95 px-4 py-2.5 text-sm font-semibold text-card-foreground shadow-card backdrop-blur-md">
        <LoaderCircle className="h-5 w-5 animate-spin text-primary" aria-hidden="true" />
        <span>{t("Chargement…", "Loading…")}</span>
      </div>
    </div>
  );
}
