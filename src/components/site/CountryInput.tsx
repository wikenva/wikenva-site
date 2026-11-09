/** @jsxImportSource @/lib/tx */
import { useId, useMemo, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLang } from "@/lib/i18n";
import { fold, matchCountry, searchCountries } from "@/lib/countries";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
  required?: boolean;
  describedBy?: string | undefined;
  className?: string;
};

/** Met en gras la partie du nom qui correspond à la saisie. */
function Highlight({ name, query }: { name: string; query: string }) {
  const q = fold(query);
  if (!q) return <>{name}</>;
  const key = fold(name);
  const at = key.startsWith(q) ? 0 : key.indexOf(" " + q) + 1;
  // fold() conserve la longueur pour les noms latins usuels ; sinon on n'insiste pas.
  if (at < 0 || key.length !== name.length) return <>{name}</>;
  return (
    <>
      {name.slice(0, at)}
      <strong className="font-bold text-foreground">{name.slice(at, at + q.length)}</strong>
      {name.slice(at + q.length)}
    </>
  );
}

/** Champ pays avec suggestions automatiques (motif ARIA « combobox »). */
export function CountryInput({
  id,
  value,
  onChange,
  invalid,
  required,
  describedBy,
  className,
}: Props) {
  const { lang } = useLang();
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => searchCountries(value, lang), [value, lang]);
  const selected = matchCountry(value, lang);
  const showList = open && results.length > 0 && !(selected && results.length === 1);

  function choose(name: string) {
    onChange(name);
    setOpen(false);
  }

  function move(delta: number) {
    if (!open) setOpen(true);
    const next = (active + delta + results.length) % results.length;
    setActive(next);
    document.getElementById(`${listId}-${next}`)?.scrollIntoView({ block: "nearest" });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      move(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      move(-1);
    } else if (e.key === "Enter" && showList && results[active]) {
      e.preventDefault();
      choose(results[active].name);
    } else if (e.key === "Escape" && open) {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "Tab" && showList && value.trim() && results[active]) {
      choose(results[active].name);
    }
  }

  return (
    <div className="relative">
      <Input
        id={id}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={showList}
        aria-controls={listId}
        aria-activedescendant={showList ? `${listId}-${active}` : undefined}
        aria-invalid={invalid}
        aria-required={required}
        required={required}
        aria-describedby={describedBy}
        autoComplete="off"
        spellCheck={false}
        maxLength={80}
        placeholder="Commencez à écrire, ex. Bénin"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(true)}
        onBlur={() => {
          setOpen(false);
          // « cote d'ivoire » devient « Côte d’Ivoire » si la saisie correspond exactement.
          const exact = matchCountry(value, lang);
          if (exact && exact.name !== value) onChange(exact.name);
        }}
        onKeyDown={onKeyDown}
        className={cn(className, "pr-10")}
      />
      {selected ? (
        <Check
          aria-hidden
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-success"
        />
      ) : (
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
      )}

      {showList && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label="Pays"
          className="absolute inset-x-0 top-full z-30 mt-2 max-h-64 overflow-auto rounded-xl border border-border bg-popover p-1.5 text-popover-foreground shadow-card"
        >
          {!value.trim() && (
            <li
              role="presentation"
              className="px-3 pb-1 pt-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Pays fréquents
            </li>
          )}
          {results.map((c, i) => (
            <li
              key={c.code}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => e.preventDefault()}
              onMouseEnter={() => setActive(i)}
              onClick={() => choose(c.name)}
              className={cn(
                "flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-base text-foreground/85",
                i === active && "bg-accent text-accent-foreground",
              )}
            >
              <span>
                <Highlight name={c.name} query={value} />
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">{c.code}</span>
            </li>
          ))}
        </ul>
      )}
      {open && value.trim().length >= 2 && results.length === 0 && (
        <p className="mt-2 text-xs text-muted-foreground">
          Aucun pays trouvé dans la liste : vous pouvez garder votre saisie.
        </p>
      )}
    </div>
  );
}
