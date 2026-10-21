import { useEffect, useId, useMemo, useRef, useState } from "react";
import { filterCountries, findCountry, type CountryOption } from "@/lib/countries";
import { useLang, useTr } from "@/lib/locale";

export function CountrySelect({
  id,
  label,
  value,
  onChange,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (iso: string) => void;
  hint?: string;
}) {
  const listId = useId();
  const tr = useTr();
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const nameLang = lang === "fr" ? "fr" : "en";
  const selected = findCountry(value, nameLang);
  const results = useMemo(() => filterCountries(query, nameLang), [query, nameLang]);

  useEffect(() => {
    if (!open) return;
    function onPointer(event: MouseEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [open]);

  function choose(item: CountryOption) {
    onChange(item.iso);
    setOpen(false);
    setQuery("");
  }

  return (
    <div ref={root} className="relative grid gap-2 text-sm font-semibold">
      <span id={`${id}-label`}>{label}</span>
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        className="flex min-h-12 items-center justify-between rounded-full border border-line bg-ink px-4 text-left font-normal"
        onClick={() => setOpen((current) => !current)}
      >
        {selected ? `${selected.flag} ${selected.name} — ${selected.iso} — +${selected.callingCode}` : tr("Sélectionner un pays")}
      </button>
      {hint ? <span className="font-normal text-muted">{hint}</span> : null}
      {open ? (
        <div className="absolute top-full z-30 mt-2 w-full rounded-3xl border border-line bg-panel p-3 shadow-none">
          <input
            autoFocus
            value={query}
            aria-label={tr("Rechercher un pays, un indicatif ou un code ISO")}
            placeholder={tr("Nom, indicatif ou code ISO")}
            className="min-h-12 w-full rounded-full border border-line bg-ink px-4 font-normal"
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActive((index) => Math.min(index + 1, results.length - 1));
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                setActive((index) => Math.max(index - 1, 0));
              } else if (event.key === "Enter" && results[active]) {
                event.preventDefault();
                choose(results[active]);
              } else if (event.key === "Escape") {
                setOpen(false);
              }
            }}
          />
          <ul id={listId} role="listbox" aria-labelledby={`${id}-label`} className="mt-2 max-h-64 overflow-auto">
            {results.map((item, index) => (
              <li key={item.iso} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={item.iso === value}
                  className={`flex min-h-12 w-full items-center rounded-2xl px-3 text-left font-normal ${index === active ? "bg-ink" : ""}`}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => choose(item)}
                >
                  {item.flag} {item.name} — {item.iso} — +{item.callingCode}
                </button>
              </li>
            ))}
            {results.length === 0 ? <li className="px-3 py-3 font-normal text-muted">{tr("Aucun pays")}</li> : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
