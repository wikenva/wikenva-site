import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Link } from "@tanstack/react-router";
import { categoryLabels, narrative, news, site } from "@/content/site";
import { ui } from "@/content/ui-copy";
import { useLang, useTr } from "@/lib/locale";
import { RoleBoard } from "./blocks";
import { PathBoard } from "./paths";
import { PromotionClock } from "./promotion";
import { ExternalLink, Eyebrow, PartnerButton, PlatformButton, Section, TextLink } from "./ui";

export function HomePage() {
  const { lang } = useLang();
  const text = ui(lang);
  const tr = useTr();

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-8 px-5 py-8 md:px-8 md:py-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="min-w-0">
            <h1 className="font-display text-3xl font-semibold tracking-wide md:text-4xl">{tr("Actualités WIKENVA")}</h1>
            <p className="mt-2 max-w-xl text-sm text-muted md:text-base">
              {tr("Annonces, mises à jour et événements confirmés de la plateforme.")}
            </p>
            <NewsCarousel />
            <TextLink to="/actualites" variant="ghost" className="mt-4">
              {tr("Voir toutes les actualités")}
            </TextLink>
          </div>
          <div>
            <div className="max-w-sm rounded-2xl border border-gold/50 bg-panel p-3">
              <PromotionClock compact />
            </div>
            <div className="mt-4 flex max-w-md flex-col gap-3">
              <a href="#decouvrir" className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-5 text-sm font-semibold text-ink">
                {text.discover}
              </a>
              <PartnerButton className="w-full" />
              <ExternalLink href={site.investUrl ?? ""} variant="ghost" className="w-full">
                {text.invest}
              </ExternalLink>
            </div>
          </div>
        </div>
      </section>

      <Section
        id="decouvrir"
        eyebrow="Découvrir"
        title="Découvrir WIKENVA"
        lede="Créer, lire et participer. Le catalogue n'est pas encore ouvert."
      >
        <RoleBoard />
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <TextLink to="/vision">{tr("En savoir plus")}</TextLink>
          <TextLink to="/communaute" variant="ghost">
            {text.community}
          </TextLink>
          <PlatformButton />
        </div>
      </Section>

      <Section
        eyebrow="Statut"
        title="WIKENVA est en cours de développement"
        lede="Les six espaces sont envisagés. Ils peuvent évoluer. Aucun n'est ouvert."
      >
        <TextLink to="/presentation">{tr("Voir la présentation")}</TextLink>
      </Section>

      <Section
        eyebrow="Mission"
        title="Notre mission et notre vision"
        lede="Créer, partager et découvrir au même endroit."
        className="border-y border-line bg-panel/40"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-3xl border border-line bg-ink p-6">
            <h3 className="font-display text-2xl font-semibold">{tr("Mission")}</h3>
            <p className="mt-3 text-muted">{tr(narrative.mission[1])}</p>
          </article>
          <article className="rounded-3xl border border-line bg-ink p-6">
            <h3 className="font-display text-2xl font-semibold">{tr("Vision")}</h3>
            <p className="mt-3 text-muted">{tr(narrative.vision[2])}</p>
          </article>
        </div>
      </Section>

      <Section eyebrow="Fonctionnement" title="Comment ça marche" lede="La vente n'est pas encore ouverte.">
        <ol className="grid gap-4 md:grid-cols-2">
          <Step
            index="1"
            title="Comprendre le projet"
            text="Le site dit ce qui est confirmé. Le reste n'est pas inventé."
          />
          <Step
            index="2"
            title="Les produits numériques"
            text="Les ebooks sont en préparation. Aucun achat sur ce site."
          />
          <Step
            index="3"
            title="La communauté"
            text="Les annonces passent par Facebook, WhatsApp, Telegram et X."
          />
          <Step
            index="4"
            title="Participer"
            text="Investir, devenir partenaire et le programme actionnaires sont trois parcours distincts."
          />
        </ol>
      </Section>

      <Section
        id="partenariat"
        eyebrow="Partenaires"
        title="Devenir partenaire"
        lede="Jusqu'au 30 novembre 2026. Minimum 2 000 SDA. La demande est vérifiée."
        className="border-y border-line bg-panel"
      >
        <ol className="mt-6 grid gap-3">
          {[
            "Lire les conditions.",
            "Ouvrir la fiche SidraStart.",
            "Investir au minimum 2 000 SDA depuis son compte.",
            "Envoyer la demande. Ne jamais donner une clé privée.",
            "Attendre la confirmation.",
          ].map((item, index) => (
            <li key={item} className="flex gap-4 rounded-2xl border border-line bg-ink px-4 py-4">
              <span className="font-display text-lg font-semibold text-gold">{index + 1}</span>
              <p>{tr(item)}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="parcours"
        eyebrow="Parcours"
        title="Trois parcours, trois décisions"
        lede="Trois décisions distinctes. Aucun rendement n'est promis."
      >
        <PathBoard />
      </Section>

      <Section
        eyebrow="SidraChain"
        title="SidraChain et SidraStart"
        lede="WIKENVA fait partie de SidraChain."
      >
        <div className="mt-6">
          <TextLink to="/sidrachain" variant="gold" className="w-full sm:w-auto">
            {tr("Découvrir SidraChain")}
          </TextLink>
          <p className="mt-3 max-w-xl text-sm text-muted">
            {tr("Découvrez le projet SidraChain, son fondateur, sa technologie blockchain et les initiatives de son écosystème.")}
          </p>
        </div>
      </Section>

      <Section eyebrow="FAQ" title="Questions fréquentes" className="border-t border-line">
        <div className="grid gap-3">
          <Faq
            q="Qu'est-ce que WIKENVA ?"
            a="Une marketplace d'ebooks, dans SidraChain. Elle réunit auteurs, lecteurs, créateurs et partenaires."
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
            q="Investir, partenaire et actionnaire, est-ce la même chose ?"
            a="Non. L'investissement se fait sur SidraStart. Le partenaire se demande après 2 000 SDA. Le programme actionnaires est une autre règle, sans rendement garanti."
          />
          <Faq
            q="Un investissement garantit-il un rendement ?"
            a="Non. Ce site ne promet aucun rendement."
          />
          <Faq
            q="Où lire les documents et nous écrire ?"
            a="Le livre blanc est sur la page White paper. Les canaux officiels — Facebook, WhatsApp, Telegram et X — sont sur la page Communauté. Aucune adresse e-mail générale n'est publiée pour l'instant."
          />
        </div>
        <div className="mt-6">
          <TextLink to="/white-paper" variant="ghost">
            {tr("Lire le white paper")}
          </TextLink>
        </div>
      </Section>

      <section className="border-t border-line py-8 md:py-12">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
          <Eyebrow>Suite</Eyebrow>
          <h2 className="font-display text-3xl font-semibold">{tr("Aller plus loin")}</h2>
          <p className="mt-3 max-w-2xl text-muted">
            {tr("La feuille de route, le token, les actualités et les documents restent disponibles. Ils ne sont pas répétés ici.")}
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            <More to="/feuille-de-route" title="Feuille de route" text="Les cinq phases publiques du projet." />
            <More to="/token" title="WIKENVA TOKEN" text="La fiche du token, sans chiffre inventé." />
            <More to="/actualites" title="Actualités" text="Les annonces confirmées, au fur et à mesure." />
            <More to="/documents" title="Documents officiels" text="Livre blanc, fiche du token et liens Sidra." />
          </ul>
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
  const drag = useRef(0);
  const start = useRef<{ x: number; y: number; locked: boolean | null } | null>(null);

  function go(next: number) {
    if (count < 1) return;
    setIndex(((next % count) + count) % count);
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse") return;
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
    if (!start.current && drag.current === 0 && !dragging) return;
    const dx = drag.current;
    start.current = null;
    drag.current = 0;
    setDragging(false);
    setOffset(0);
    if (dx <= -48) go(index + 1);
    else if (dx >= 48) go(index - 1);
  }

  if (count === 0) return null;

  return (
    <div className="relative mt-5" role="region" aria-roledescription="carousel" aria-label={tr("Actualités WIKENVA")}>
      <div
        className="relative h-64 overflow-hidden rounded-3xl border border-line bg-panel sm:h-60"
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="flex h-full w-full"
          style={{
            transform: `translate3d(calc(${-index * 100}% + ${offset}px), 0, 0)`,
            transition: dragging ? "none" : "transform 420ms cubic-bezier(.22,.8,.24,1)",
          }}
        >
          {news.map((item, slide) => (
            <article
              key={item.slug}
              className="flex h-full w-full shrink-0 basis-full flex-col overflow-hidden px-5 py-5 md:px-14"
              aria-hidden={slide !== index}
            >
              <p className="text-xs font-semibold tracking-wide text-gold uppercase">
                {tr(categoryLabels[item.category])} · {tr(item.date)}
              </p>
              <h2 className="mt-3 line-clamp-3 font-display text-xl font-semibold md:text-2xl">
                <Link to="/actualites/$slug" params={{ slug: item.slug }} className="hover:text-gold">
                  {tr(item.title)}
                </Link>
              </h2>
              <p className="mt-3 line-clamp-4 text-sm text-muted">{tr(item.excerpt)}</p>
            </article>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center gap-2">
          {news.map((item, dot) => (
            <button
              key={item.slug}
              type="button"
              aria-label={tr("Actualité") + " " + (dot + 1)}
              aria-current={dot === index}
              onClick={() => go(dot)}
              className={
                "pointer-events-auto h-2 rounded-full transition-all " +
                (dot === index ? "w-6 bg-gold" : "w-2 bg-white/35")
              }
            />
          ))}
        </div>
      </div>
      <button
        type="button"
        aria-label={tr("Actualité précédente")}
        onClick={() => go(index - 1)}
        className="absolute top-1/2 left-2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-ink/80 text-gold md:grid"
      >
        <span aria-hidden>‹</span>
      </button>
      <button
        type="button"
        aria-label={tr("Actualité suivante")}
        onClick={() => go(index + 1)}
        className="absolute top-1/2 right-2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-ink/80 text-lg text-gold md:grid"
      >
        <span aria-hidden>›</span>
      </button>
    </div>
  );
}

function Step({ index, title, text }: { index: string; title: string; text: string }) {
  const tr = useTr();
  return (
    <li className="rounded-3xl border border-line bg-panel p-5">
      <p className="font-display text-sm font-semibold text-gold">{index}</p>
      <h3 className="mt-2 font-display text-xl font-semibold">{tr(title)}</h3>
      <p className="mt-2 text-sm text-muted">{tr(text)}</p>
    </li>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  const tr = useTr();
  return (
    <details className="rounded-3xl border border-line bg-panel px-5 py-4">
      <summary className="font-semibold">{tr(q)}</summary>
      <p className="mt-3 text-sm text-muted">{tr(a)}</p>
    </details>
  );
}

function More({ to, title, text }: { to: string; title: string; text: string }) {
  const tr = useTr();
  return (
    <li>
      <TextLink to={to} variant="ghost" className="h-auto w-full flex-col items-start gap-1 rounded-3xl px-5 py-4 text-left">
        <span className="font-display text-lg">{tr(title)}</span>
        <span className="text-sm font-normal text-muted">{tr(text)}</span>
      </TextLink>
    </li>
  );
}
