/** @jsxImportSource @/lib/tx */
import { useLang, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const OPTIONS: { value: Lang; label: string; name: string }[] = [
  { value: "fr", label: "FR", name: "Français" },
  { value: "en", label: "EN", name: "English" },
];

/** Badge de langue FR / EN. */
export function LangSwitch({ className }: { className?: string }) {
  const { lang, setLang, t } = useLang();
  return (
    <div
      role="group"
      aria-label={t("Choisir la langue", "Choose language")}
      className={cn("inline-flex h-9 items-center rounded-full border border-border bg-card-glass p-0.5 text-[11px] font-bold tracking-wider", className)}
    >
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          lang={o.value}
          aria-pressed={lang === o.value}
          aria-label={o.name}
          onClick={() => lang !== o.value && setLang(o.value)}
          className={cn(
            "h-8 min-w-8 cursor-pointer rounded-full px-2.5 transition-colors",
            lang === o.value ? "bg-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
