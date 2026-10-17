import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";
import { useTr } from "@/lib/locale";

const FALLBACK_MESSAGE = "Une erreur inattendue s'est produite. Rechargez la page.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  const tr = useTr();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink px-6 text-center text-fg">
      <TriangleAlert className="size-10 text-gold" aria-hidden />
      <h1 className="font-display text-2xl font-semibold">{tr("Une erreur est survenue")}</h1>
      <p className="max-w-md text-sm break-words text-muted">{tr(errorMessage(error))}</p>
    </main>
  );
}