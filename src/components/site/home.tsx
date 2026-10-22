import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { narrative, news, site } from "@/content/site";
import { ui } from "@/content/ui-copy";
import { useLang, useTr } from "@/lib/locale";
import { RoleBoard } from "./blocks";
import { PathBoard } from "./paths";
import { PromotionClock } from "./promotion";
import { PartnerButton, PlatformButton, Section, TextLink } from "./ui";

export function HomePage() {
  const { lang } = useLang();
  const text = ui(lang);
  const tr = useTr();

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto w-full max-w-md px-5 py-12 text-center md:py-16">
          <p className="text-xs font-semibold tracking-[0.28em] text-gold uppercase">WIKENVA</p>
          <h1 className="mx-auto mt-4 font-display text-[1.7rem] font-semibold leading-tight md:text-4xl">
            {tr("Lecteurs, auteurs et créateurs, dans le même écosystème.")}
          </h1>
          <div className="mx-auto mt-5 h-px w-12 bg-gold" aria-hidden />
          <PartnerButton className="mt-6 min-h-12 w-full text-base" />
          <div className="mt-5 rounded-2xl border border-gold/40 bg-panel px-3 py-4">
            <p className="text-sm font-semibold tracking-wide text-gold">{tr("2 000 SDA · jusqu'au 30 novembre 2026")}</p>
            <div className="mx-auto mt-3 max-w-xs">
              <PromotionClock compact />
            </div>
          </div>
          <div className="mt-10 grid gap-3 text-left">
            <a href="#decouvrir" className="mr-6 flex min-h-12 items-center justify-between gap-3 rounded-2xl border border-line px-4 text-sm font-semibold">
              <span>{text.discover}</span>
              <span className="grid size-7 shrink-0 place-items-center rounded-full border border-gold/50 text-gold" aria-hidden>
                <ChevronRight className="size-4" />
              </span>
            </a>
            <a href={site.investUrl ?? ""} target="_blank" rel="noreferrer" className="ml-6 flex min-h-12 items-center justify-between gap-3 rounded-2xl border border-line px-4 text-sm font-semibold">
              <span>{text.invest}</span>
              <span className="grid size-7 shrink-0 place-items-center rounded-full border border-gold/50 text-gold" aria-hidden>
                <ChevronRight className="size-4" />
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto w-full max-w-xl px-5 py-8 md:px-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{tr("Actualités")}</p>
          <h2 className="mt-1 text-base font-semibold">{tr("Ce qui est confirmé")}</h2>
          <NewsCarousel />
          <TextLink to="/actualites" variant="ghost" className="mt-3 w-full">
            {tr("Toutes les actualités")}
          </TextLink>
        </div>
      </section>

      <Section
        id="decouvrir"
        eyebrow="Découvrir"
        title="Découvrir WIKENVA"
        lede="Créer, lire et participer. Le catalogue n'est pas encore ouvert."
      >
        <RoleBoard />
        <div className="mt-5 flex flex-col gap-3">
          <TextLink to="/vision" className="w-full">
            {tr("En savoir plus")}
          </TextLink>
          <TextLink to="/communaute" variant="ghost" className="w-full">
            {text.community}
          </TextLink>
          <PlatformButton variant="ghost" className="w-full" />
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-panel">
          <div className="px-4 py-3.5">
            <p className="text-base font-semibold leading-snug">{tr("WIKENVA est en cours de développement")}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              {tr("Les six espaces sont envisagés. Ils peuvent évoluer. Aucun n'est ouvert.")}
            </p>
          </div>
          <div className="border-t border-line px-4 py-3">
            <TextLink to="/presentation" className="w-full">
              {tr("Voir la présentation")}
            </TextLink>
          </div>
        </div>
      </Section>

      <section className="border-y border-line bg-panel/40 py-8">
        <div className="mx-auto grid w-full min-w-0 max-w-6xl gap-3 px-5 md:grid-cols-2 md:px-8">
          <article className="rounded-2xl border border-line bg-ink p-5">
            <h2 className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{tr("Mission")}</h2>
            <p className="mt-3 text-base leading-relaxed">{tr(narrative.mission[1])}</p>
          </article>
          <article className="rounded-2xl border border-line bg-ink p-5">
            <h2 className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{tr("Vision")}</h2>
            <p className="mt-3 text-base leading-relaxed">{tr(narrative.vision[2])}</p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8">
        <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{tr("Fonctionnement")}</p>
        <ol className="mt-4 grid gap-3">
          {[
            ["1", "Comprendre le projet", "Le site dit ce qui est confirmé. Le reste n'est pas inventé."],
            ["2", "Les produits numériques", "Les ebooks sont en préparation. Aucun achat sur ce site."],
            ["3", "La communauté", "Les annonces passent par Facebook, WhatsApp, Telegram et X."],
            ["4", "Participer", "Investir et devenir partenaire sont deux parcours distincts."],
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

      <section id="partenariat" className="border-y border-line bg-panel/40 py-8">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{tr("Partenaires")}</p>
          <h2 className="mt-2 text-xl font-semibold">{tr("Devenir partenaire")}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {tr("Jusqu'au 30 novembre 2026. Minimum 2 000 SDA. La demande est vérifiée.")}
          </p>
          <ul className="mt-4 grid gap-2">
            {[
              "Publication gratuite des articles",
              "Boutique en ligne gratuite",
              "Fonctions Premium",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 rounded-2xl border border-line bg-ink px-4 py-3 text-sm font-semibold">
                <span className="text-gold" aria-hidden>
                  ✓
                </span>
                {tr(item)}
              </li>
            ))}
          </ul>
          <ol className="mt-4 grid gap-2">
            {[
              "Lire les conditions.",
              "Ouvrir la fiche SidraStart.",
              "Investir au minimum 2 000 SDA depuis son compte.",
              "Envoyer la demande. Ne jamais donner une clé privée.",
              "Attendre la confirmation.",
            ].map((item, index) => (
              <li key={item} className="flex items-start gap-3 rounded-2xl border border-line bg-ink px-4 py-3">
                <span className="font-semibold text-gold">{index + 1}</span>
                <p className="text-sm leading-relaxed">{tr(item)}</p>
              </li>
            ))}
          </ol>
          <TextLink to="/partenaires" className="mt-4 w-full">
            {tr("Devenir partenaire")}
          </TextLink>
        </div>
      </section>

      <section id="parcours" className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8">
        <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{tr("Parcours")}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {tr("Deux décisions distinctes. Aucun rendement n'est promis.")}
        </p>
        <div className="mt-4">
          <PathBoard auto={false} />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8">
        <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{tr("SidraChain")}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{tr("WIKENVA souhaite faire partie de SidraChain.")}</p>
        <p className="mt-2 text-sm leading-relaxed">
          {tr("Découvrez le projet, le fondateur et les initiatives. Aucun rendement n'est promis.")}
        </p>
        <TextLink to="/sidrachain" variant="gold" className="mt-4 w-full">
          {tr("Découvrir SidraChain")}
        </TextLink>
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
              a="Investir au moins 2 000 SDA sur SidraStart, puis déposer une demande. Elle est vérifiée."
            />
            <Faq
              q="Investir et devenir partenaire, est-ce la même chose ?"
              a="Non. Investir se fait sur SidraStart. Le partenaire se demande ensuite, après vérification."
            />
            <Faq
              q="Un investissement garantit-il un rendement ?"
              a="Non. Ce site ne promet aucun rendement."
            />
            <Faq
              q="Où lire les documents et nous écrire ?"
              a="White paper, page Communauté, contact.wikenva@gmail.com, +229 01 96 41 21 17."
            />
          </div>
          <TextLink to="/white-paper" variant="ghost" className="mt-4 w-full">
            {tr("Lire le white paper")}
          </TextLink>
        </div>
      </section>

      <section className="border-t border-line py-8">
        <ul className="mx-auto grid w-full max-w-6xl gap-2 px-5 md:px-8">
          <More to="/feuille-de-route" title="Feuille de route" text="Les cinq phases publiques du projet." />
          <More to="/token" title="WIKENVA TOKEN" text="La fiche du token, sans chiffre inventé." />
          <More to="/actualites" title="Actualités" text="Les annonces confirmées, au fur et à mesure." />
          <More to="/documents" title="Documents officiels" text="Livre blanc, fiche du token et liens Sidra." />
        </ul>
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
      className="relative mt-5"
      role="region"
      aria-roledescription="carousel"
      aria-label={tr("Actualités WIKENVA")}
    >
      <div
        className="relative h-[7.25rem] overflow-hidden rounded-2xl border border-line bg-panel"
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="flex h-full"
          style={{
            width: `${count * 100}%`,
            transform: `translate3d(calc(${(-index * 100) / count}% + ${offset}px), 0, 0)`,
            transition: dragging || reduced ? "none" : "transform 480ms cubic-bezier(.22,.8,.24,1)",
          }}
        >
          {news.map((item, slide) => (
            <article key={item.slug} className="h-full shrink-0" style={{ width: `${100 / count}%` }} aria-hidden={slide !== index}>
              <Link
                to="/actualites/$slug"
                params={{ slug: item.slug }}
                className="flex h-full items-center gap-3 px-4 pb-5"
              >
                <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                  <NewsMark slug={item.slug} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-semibold tracking-[0.14em] text-gold uppercase">{tr(item.date)}</span>
                  <span className="mt-1 line-clamp-2 text-[15px] leading-snug font-semibold text-balance">{tr(item.title)}</span>
                </span>
                <span aria-hidden className="shrink-0 text-lg leading-none text-gold">
                  ›
                </span>
              </Link>
            </article>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/10" aria-hidden>
          <div
            key={paused || dragging || reduced ? "hold" : index}
            className="h-full bg-gold"
            style={
              paused || dragging || reduced
                ? { width: "0%" }
                : { animation: "news-run 4.5s linear forwards" }
            }
          />
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
            <span className={"block rounded-full " + (dot === index ? "h-1 w-3 bg-gold" : "h-1 w-1 bg-white/35")} />
          </button>
        ))}
      </div>
    </div>
  );
}

function NewsMark({ slug }: { slug: string }) {
  const common = { viewBox: "0 0 24 24", className: "size-4", fill: "none", stroke: "currentColor", strokeWidth: 1.8 };
  if (slug === "promotion-partenaire") {
    return (
      <svg {...common}>
        <path d="M8 13l2.5 2.5L16 9" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="8" />
      </svg>
    );
  }
  if (slug === "fiche-sidrastart") {
    return (
      <svg {...common}>
        <path d="M7 4.5h7l3 3V19.5H7z" strokeLinejoin="round" />
        <path d="M14 4.5V8h3.5M9 12h6M9 15.5h4" strokeLinecap="round" />
      </svg>
    );
  }
  if (slug === "espace-information-en-ligne") {
    return (
      <svg {...common}>
        <path d="M5 7.5h14M5 12h14M5 16.5h9" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16M12 4c2.2 2.4 3.3 5.1 3.3 8S14.2 17.6 12 20c-2.2-2.4-3.3-5.1-3.3-8S9.8 6.4 12 4z" />
    </svg>
  );
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

function More({ to, title, text }: { to: string; title: string; text: string }) {
  const tr = useTr();
  return (
    <li>
      <TextLink to={to} variant="ghost" className="h-auto w-full flex-col items-start gap-1 rounded-2xl px-4 py-3 text-left">
        <span className="text-base font-semibold">{tr(title)}</span>
        <span className="text-sm font-normal text-muted">{tr(text)}</span>
      </TextLink>
    </li>
  );
}
