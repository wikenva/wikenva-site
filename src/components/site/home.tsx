import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Link } from "@tanstack/react-router";
import { BadgeCheck, ChevronRight, FileText, Globe, Megaphone } from "lucide-react";
import { narrative, news } from "@/content/site";
import { useTr } from "@/lib/locale";
import { PromotionClock } from "./promotion";
import { PartnerButton } from "./ui";

export function HomePage() {
  const tr = useTr();

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto w-full max-w-md px-5 py-8 text-center md:py-10">
          <p className="text-xs font-semibold tracking-[0.28em] text-gold uppercase">WIKENVA</p>
          <h1 className="mx-auto mt-4 font-display text-[1.7rem] font-semibold leading-tight md:text-4xl">
            {tr("Lecteurs, auteurs et créateurs, dans le même écosystème.")}
          </h1>
          <div className="mx-auto mt-5 h-px w-12 bg-gold" aria-hidden />
          <p className="mt-5 text-xs font-semibold tracking-[0.2em] text-gold uppercase">{tr("Vision")}</p>
          <p className="mt-2 font-display text-xl font-semibold leading-tight">{tr("Commerce numérique licite.")}</p>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">{tr(narrative.vision[0])}</p>
          <PartnerButton className="mt-6 min-h-12 w-full text-base" />
          <div className="mt-5 rounded-2xl border border-gold/40 bg-panel px-3 py-4">
            <p className="text-sm font-semibold">{tr("Temps restant pour demander le partenariat")}</p>
            <p className="mt-1 text-sm font-semibold tracking-wide text-gold">{tr("1 000 SDA · jusqu'au 30 novembre 2026")}</p>
            <div className="mx-auto mt-3 max-w-xs">
              <PromotionClock compact />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto w-full max-w-xl px-5 py-6 md:px-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{tr("Actualités")}</p>
          <h2 className="mt-1 text-base font-semibold">{tr("Ce qui est confirmé")}</h2>
          <NewsCarousel />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8">
        <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{tr("Fonctionnement")}</p>
        <ol className="mt-4 grid gap-3">
          {[
            ["1", "Comprendre le projet", "Le site dit ce qui est confirmé. La boutique n'est pas ouverte."],
            ["2", "Devenir partenaire", "Jusqu'au 30 novembre 2026. Minimum 1 000 SDA. La demande est vérifiée."],
            ["3", "Aucun rendement promis", "Investir se fait sur SidraStart. Le partenariat se demande ensuite."],
          ].map(([index, title, text]) => (
            <li key={index} className="flex gap-3 rounded-2xl border border-line bg-panel p-4">
              <span className="font-semibold text-gold">{index}</span>
              <div>
                <p className="font-semibold">{tr(title)}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{tr(text)}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-line py-8">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{tr("FAQ")}</p>
          <div className="mt-4 grid gap-2">
            <Faq
              q="Qu'est-ce que WIKENVA ?"
              a="www.wikenva.com. Intégration SidraChain après la Core Team."
            />
            <Faq
              q="Peut-on déjà acheter un ebook ?"
              a="Non. Ce site présente le projet. Il ne vend pas encore."
            />
            <Faq
              q="Comment devenir partenaire avant le 30 novembre 2026 ?"
              a="Investir au moins 1 000 SDA sur SidraStart, puis déposer une demande. Elle est vérifiée."
            />
            <Faq
              q="Un investissement garantit-il un rendement ?"
              a="Non. Ce site ne promet aucun rendement."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function NewsCarousel() {
  const tr = useTr();
  const count = news.length;
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const drag = useRef(0);
  const pressing = useRef(false);
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
    if (paused || dragging || count < 2) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % count), 4500);
    return () => window.clearTimeout(timer);
  }, [paused, dragging, count, index]);

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse") return;
    pressing.current = true;
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
    pressing.current = false;
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
    <div
      className="relative mt-3"
      role="region"
      aria-roledescription="carousel"
      aria-label={tr("Actualités WIKENVA")}
    >
      <div
        className="relative overflow-hidden rounded-2xl border border-line bg-panel"
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className={"flex " + (reduced || dragging ? "" : "transition-transform duration-700 ease-[cubic-bezier(.22,.8,.24,1)]")}
          style={{
            width: `${count * 100}%`,
            transform: `translate3d(calc(${(-index * 100) / count}% + ${offset}px), 0, 0)`,
          }}
        >
          {news.map((item, slide) => (
            <article
              key={item.slug}
              className={"shrink-0 " + (reduced ? "" : "transition-opacity duration-700 ") + (slide === index ? "opacity-100" : "opacity-40")}
              style={{ width: `${100 / count}%` }}
              aria-hidden={slide !== index}
            >
              <Link
                to="/actualites/$slug"
                params={{ slug: item.slug }}
                className="flex min-h-[5.25rem] items-center gap-4 px-4 py-4"
              >
                <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-2xl border border-gold/40 bg-ink text-gold">
                  <NewsMark slug={item.slug} />
                </span>
                <span className="min-w-0 flex-1 font-display text-lg leading-snug font-semibold text-balance">
                  {tr(item.title)}
                </span>
                <ChevronRight className="size-4 shrink-0 stroke-[1.75] text-gold" aria-hidden />
              </Link>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        {news.map((item, dot) => (
          <button
            key={item.slug}
            type="button"
            aria-label={tr("Actualité") + " " + (dot + 1)}
            aria-current={dot === index}
            onClick={() => go(dot)}
            className="grid h-3 w-3 place-items-center"
          >
            <span className={"block rounded-full transition-all duration-500 " + (dot === index ? "h-1 w-4 bg-gold" : "h-1 w-1 bg-white/35")} />
          </button>
        ))}
      </div>
    </div>
  );
}

function NewsMark({ slug }: { slug: string }) {
  const icon = "size-5 stroke-[1.75]";
  if (slug === "promotion-partenaire") return <BadgeCheck className={icon} aria-hidden />;
  if (slug === "fiche-sidrastart") return <FileText className={icon} aria-hidden />;
  if (slug === "espace-information-en-ligne") return <Megaphone className={icon} aria-hidden />;
  return <Globe className={icon} aria-hidden />;
}

function Faq({ q, a }: { q: string; a: string }) {
  const tr = useTr();
  return (
    <details className="rounded-2xl border border-line bg-panel px-4 py-3">
      <summary className="cursor-pointer text-sm font-semibold leading-snug text-balance">{tr(q)}</summary>
      <p className="mt-3 text-sm text-muted">{tr(a)}</p>
    </details>
  );
}
