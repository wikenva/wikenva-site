/** @jsxImportSource @/lib/tx */
import { statusLabels, type ModuleStatus } from "@/config/site";
import { cn } from "@/lib/utils";

const styles: Record<ModuleStatus, string> = {
  disponible: "border-success/40 bg-success/10 text-success",
  "en-developpement": "border-primary/35 bg-primary/10 text-primary",
  prevu: "border-gold/40 bg-gold/10 text-gold",
};

export function StatusBadge({ status, className }: { status: ModuleStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider",
        styles[status],
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full bg-current", status === "en-developpement" && "animate-pulse")} />
      {statusLabels[status]}
    </span>
  );
}
