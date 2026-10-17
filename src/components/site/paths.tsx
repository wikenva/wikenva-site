import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { site } from "@/content/site";
import { useTr } from "@/lib/locale";
import { cn } from "@/lib/cn";
import { ExternalLink } from "./ui";

export type PathId = "sidra" | "partner" | "shareholder";

type PathCard = {
  id: PathId;
  title: string;
  where: string;
  text: string;
  not: string;
  action: string;
  href?: string;
  to?: "/partenaires" | "/investisseurs";
  hash?: string;
};

const paths: PathCard[] = [
  {
    id: "sidra" as const,
    title: "Investir sur SidraStart",
    where: "Sur SidraStart, pas sur ce site",
    text: "Vous ouvrez la fiche Digital Marketplace Ebook et vous investissez depuis votre propre compte.",
    not: "Cela ne crée pas le statut de partenaire et ne vous inscrit pas au programme actionnaires.",
    action: "Investir sur SidraStart",
    href: site.investUrl ?? "",
  },
  {
    id: "partner" as const,
    title: "Devenir partenaire",
    where: "Demande sur ce site, après SidraStart",
    text: "Jusqu'au 30 novembre 2026, après au moins 2 000 SDA investis sur SidraStart, vous pouvez demander une vérification.",
    not: "La demande n'est pas l'investissement. Le statut n'est pas automatique. Ce n'est pas le programme actionnaires.",
    action: "Voir la demande partenaire",
    to: "/partenaires" as const,
    hash: "candidature",
  },
  {
    id: "shareholder" as const,
    title: "Programme actionnaires",
    where: "Autre formulaire, autres règles",
    text: "WIKENVA prévoit 15 % des revenus de la plateforme pour les actionnaires. Les modalités ne sont pas encore publiées.",
    not: "Ce n'est pas la promotion à 2 000 SDA. Ce n'est pas un rendement garanti. La part n'est pas encore acquise.",
    action: "Voir le programme actionnaires",
    to: "/investisseurs" as const,
    hash: "actionnaires",
  },
];

export function HSlide({ label, children, className = "" }: { label: string; children: ReactNode[]; className?: string }) {
  const tr = useTr();
  const count = children.length;
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const drag = useRef(0);
  const start = useRef<{ x: number; y: number; locked: boolean | null } | null>(null);

  function go(next: number) {
    if (count < 1) return;
    setIndex(((next % count) + count) % count);
  }

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (paused || dragging || reduced || count < 2) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % count), 5000);
    return () => window.clearTimeout(timer);
  }, [paused, dragging, reduced, count, index]);

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse") return;
    setPaused(true);
    start.current = { x: event.clientX, y: event.clientY, locked: null };
    drag.current = 0;
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!start.current) return;
    const dx = event.clientX - start.current.x;
    const dy = event.clientY - start.current.y;
    if (start.current.locked == null) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      start.current.locked = Math.abs(dx) > Math.abs(dy);
      if (!start.current.locked) {
        start.current = null;
        return;
      }
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    drag.current = dx;
    setOffset(dx);
  }

  function onPointerUp() {
    const dx = drag.current;
    const wasDragging = dragging || start.current?.locked === true;
    start.current = null;
    drag.current = 0;
    setDragging(false);
    setOffset(0);
    setPaused(false);
    if (!wasDragging) return;
    if (dx <= -48) go(index + 1);
    else if (dx >= 48) go(index - 1);
  }

  if (count === 0) return null;

  return (
    <div className={"w-full min-w-0 " + className} role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        className="w-full min-w-0 overflow-hidden"
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="flex w-full min-w-0 items-stretch"
          style={{
            transform: `translate3d(calc(${-index * 100}% + ${offset}px), 0, 0)`,
            transition: dragging || reduced ? "none" : "transform 480ms cubic-bezier(.22,.8,.24,1)",
          }}
        >
          {children.map((child, slide) => (
            <div key={slide} className="w-full shrink-0" style={{ flex: "0 0 100%" }} aria-hidden={slide !== index}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label={tr("Précédent")}
          onClick={() => go(index - 1)}
          className="grid size-11 place-items-center rounded-full border border-gold/50 bg-ink text-gold active:scale-95"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <div className="flex items-center gap-1.5 px-1">
          {children.map((_, dot) => (
            <button
              key={dot}
              type="button"
              aria-label={`${label} ${dot + 1}`}
              aria-current={dot === index}
              onClick={() => go(dot)}
              className="grid h-3 w-3 place-items-center"
            >
              <span className={"block rounded-full " + (dot === index ? "h-1.5 w-4 bg-gold" : "h-1.5 w-1.5 bg-white/35")} />
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label={tr("Suivant")}
          onClick={() => go(index + 1)}
          className="grid size-11 place-items-center rounded-full border border-gold/50 bg-ink text-gold active:scale-95"
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}

export function PathBoard({ here }: { here?: PathId }) {
  const tr = useTr();
  return (
    <HSlide label={tr("Parcours")}>
      {paths.map((item) => {
        const current = here === item.id;
        return (
          <article
            key={item.id}
            className={cn(
              "flex h-full flex-col rounded-3xl border p-5",
              current ? "border-gold bg-panel" : "border-line bg-ink",
            )}
          >
            <p className="text-sm font-semibold tracking-wide text-gold uppercase">
              {current ? tr("Vous êtes ici") : tr(item.where)}
            </p>
            {current ? <p className="mt-1 text-sm text-muted">{tr(item.where)}</p> : null}
            <h3 className="mt-2 font-display text-2xl font-semibold">{tr(item.title)}</h3>
            <p className="mt-3 text-sm text-fg">{tr(item.text)}</p>
            <p className="mt-3 flex-1 text-sm text-muted">{tr(item.not)}</p>
            {item.href ? (
              <ExternalLink href={item.href} variant={current ? "gold" : "ghost"} className="mt-5 w-full">
                {tr(item.action)}
              </ExternalLink>
            ) : current ? (
              <a
                href={`#${item.hash ?? ""}`}
                className="mt-5 inline-flex min-h-12 items-center justify-center rounded-2xl bg-gold px-5 text-sm font-semibold text-ink"
              >
                {tr(item.action)}
              </a>
            ) : (
              <Link
                to={item.to ?? "/partenaires"}
                hash={item.hash}
                className="mt-5 inline-flex min-h-12 items-center justify-center rounded-2xl border border-line px-5 text-sm font-semibold"
              >
                {tr(item.action)}
              </Link>
            )}
          </article>
        );
      })}
    </HSlide>
  );
}
