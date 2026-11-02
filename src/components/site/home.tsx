import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { narrative, site } from "@/content/site";
import { useTr } from "@/lib/locale";
import { PromotionClock } from "./promotion";

const people = [
  ["Auteurs", "Publier un ebook"],
  ["Lecteurs", "Lire un ouvrage licite"],
  ["Créateurs", "Partager un contenu"],
  ["Entreprises", "Présenter une activité"],
  ["Partenaires", "Rejoindre le programme"],
] as const;

const facts = [
  ["SidraStart", "Contribuer"],
  ["Demande", "À envoyer"],
  ["Minimum", "Aucun"],
  ["Zakat", "3 %"],
  ["Fin", "24 décembre 2026"],
] as const;

const advantages = ["Articles gratuits", "Boutique gratuite", "Accès Premium"] as const;

const spaces = ["Créateurs", "Auteurs", "Lecteurs", "Communauté", "Marketplace", "Outils", "Boutiques"] as const;

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setOn(entry.isIntersecting),
      { threshold: 0.18 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={"reveal " + (on ? "on " : "") + className}>
      {children}
    </div>
  );
}

export function HomePage() {
  const tr = useTr();
  const points = narrative.vision.slice(1, 6);

  return (
    <>
      <section className="mx-auto grid w-full max-w-6xl items-center gap-8 px-5 py-8 md:px-8 md:py-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-gold uppercase">WIKENVA</p>
          <h1 className="mt-3 max-w-xl font-display text-4xl leading-tight font-semibold md:text-5xl">
            {tr("Marketplace numérique d'ebooks licites")}
          </h1>
          <p className="mt-4 max-w-lg text-lg text-muted">
            {tr("Là où le savoir, le commerce et l'innovation se rejoignent.")}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={site.investUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-6 text-sm font-semibold text-ink"
            >
              {tr("Contribuer dans WIKENVA")}
            </a>
            <Link
              to="/partenaires"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-line px-6 text-sm font-semibold"
            >
              {tr("Devenir partenaire")}
            </Link>
          </div>
        </div>
        <figure className="relative">
          <img
            src="/media/hero-accueil.jpg"
            alt={tr("Un créateur WIKENVA sur une plateforme internationale.")}
            width={1024}
            height={1024}
            decoding="async"
            fetchPriority="high"
            className="aspect-[4/5] w-full rounded-[2rem] object-cover object-top ring-1 ring-gold/50"
          />
          <figcaption className="absolute right-4 bottom-4 left-4 rounded-2xl border border-white/10 bg-[#07101c]/80 p-4 backdrop-blur-md">
            <p className="text-xs font-semibold tracking-[0.16em] text-gold uppercase">24 {tr("décembre")} 2026</p>
            <p className="mt-1 text-sm">{tr("Fin de la contribution WIKENVA sur SidraStart")}</p>
            <div className="mt-3">
              <PromotionClock caption={false} />
            </div>
          </figcaption>
        </figure>
      </section>

      <section className="border-y border-line">
        <div className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.22em] text-gold uppercase">{tr("Notre vision")}</p>
            <p className="mt-3 max-w-3xl text-2xl leading-snug font-semibold">{tr(narrative.vision[0])}</p>
            <p className="mt-3 max-w-2xl text-muted">{tr(narrative.vision[6])}</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.22em] text-gold uppercase">{tr("Qui nous réunissons")}</p>
        </Reveal>
        <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {people.map(([title, text]) => (
            <Reveal key={title} className="bg-ink">
              <article className="h-full px-4 py-5">
                <h2 className="font-semibold">{tr(title)}</h2>
                <p className="mt-2 text-sm text-muted">{tr(text)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-panel/40">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-12 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <img
              src="/media/marketplace-commerce.jpg"
              alt={tr("La marketplace : boutique, paiement et livraison.")}
              width={1376}
              height={768}
              loading="lazy"
              decoding="async"
              className="aspect-video w-full rounded-3xl object-cover ring-1 ring-line"
            />
          </Reveal>
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.22em] text-gold uppercase">{tr("Programme de partenariat")}</p>
            <h2 className="mt-2 font-display text-3xl font-semibold">{tr("Devenir partenaire")}</h2>
            <p className="mt-3 text-muted">{tr("Contribuez sur SidraStart, puis envoyez une demande.")}</p>
            <dl className="mt-5 overflow-hidden rounded-2xl border border-line">
              {facts.map(([label, value]) => (
                <div key={label} className="grid grid-cols-2 gap-3 border-t border-line px-4 py-3 text-sm first:border-t-0">
                  <dt className="text-muted">{tr(label)}</dt>
                  <dd className="text-right font-semibold">{tr(value)}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a href={site.investUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full bg-gold px-5 text-sm font-semibold text-ink">
                SidraStart
              </a>
              <Link to="/partenaires" className="inline-flex min-h-11 items-center justify-center rounded-full border border-line px-5 text-sm font-semibold">
                {tr("Envoyer la demande")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.22em] text-gold uppercase">{tr("À retenir")}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {advantages.map((label) => (
              <p key={label} className="rounded-2xl border border-gold/30 px-4 py-5 font-semibold">
                {tr(label)}
              </p>
            ))}
          </div>
          <ul className="mt-6 grid gap-2">
            {points.map((point) => (
              <li key={point} className="border-b border-line py-3 text-sm">
                {tr(point)}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-12 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.22em] text-gold uppercase">{tr("Internationale")}</p>
            <h2 className="mt-2 font-display text-3xl font-semibold">{tr(narrative.africa[0])}</h2>
            <p className="mt-3 text-muted">{tr(narrative.africa[1])}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {spaces.map((space) => (
                <span key={space} className="rounded-full border border-line px-3 py-1.5 text-sm">
                  {tr(space)}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <img
              src="/media/vision-afrique.jpg"
              alt={tr("Une plateforme numérique ouverte au monde.")}
              width={1376}
              height={768}
              loading="lazy"
              decoding="async"
              className="aspect-video w-full rounded-3xl object-cover ring-1 ring-line"
            />
            <div className="mt-5">
              <p className="text-xs font-semibold tracking-[0.22em] text-gold uppercase">SidraChain</p>
              <p className="mt-2">{tr(narrative.place[0])}</p>
              <Link to="/sidrachain" className="mt-3 inline-flex font-semibold text-gold">
                {tr("Découvrir SidraChain")}
              </Link>
              <a href="mailto:contact.wikenva@gmail.com" className="mt-4 block font-semibold">contact.wikenva@gmail.com</a>
              <a href="tel:+2290196412117" className="mt-1 block font-semibold">+229 01 96 41 21 17</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
