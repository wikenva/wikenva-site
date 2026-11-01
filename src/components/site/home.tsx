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
      { threshold: 0.22, rootMargin: "0px 0px -6% 0px" },
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
      <section className="relative min-h-[86vh] overflow-hidden">
        <img
          src="/media/hero-accueil.jpg"
          alt={tr("Un créateur WIKENVA sur une plateforme internationale.")}
          width={1024}
          height={1024}
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07101c] via-[#07101c]/72 to-[#07101c]/25" />
        <div className="relative mx-auto flex min-h-[86vh] w-full max-w-6xl flex-col justify-end px-5 pt-20 pb-12 md:px-8 md:pb-16">
          <p className="rise text-xs font-semibold tracking-[0.28em] text-gold uppercase">WIKENVA</p>
          <h1 className="rise d1 mt-3 max-w-xl font-display text-5xl leading-[0.92] font-semibold text-white md:text-7xl">
            Digital
            <span className="mt-1 block text-gold">Marketplace</span>
          </h1>
          <p className="rise d2 mt-5 max-w-md text-lg leading-snug text-white/90 md:text-xl">
            {tr("Là où le savoir, le commerce et l'innovation se rejoignent.")}
          </p>
          <p className="rise d3 mt-6 text-3xl font-semibold text-white md:text-4xl">24 {tr("décembre")} 2026</p>
          <a
            href={site.investUrl}
            target="_blank"
            rel="noreferrer"
            className="rise d3 mt-6 inline-flex min-h-14 w-fit items-center justify-center rounded-full bg-gold px-7 text-base font-semibold text-ink"
          >
            {tr("Contribuer dans WIKENVA")}
          </a>
          <div className="rise d3 mt-6 max-w-xs">
            <PromotionClock caption={false} />
          </div>
        </div>
      </section>

      <section className="bg-[#f6f1e6] text-[#172033]">
        <div className="mx-auto w-full max-w-3xl px-5 py-14 md:px-8 md:py-20">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.22em] text-[#9a7420] uppercase">{tr("Notre vision")}</p>
            <p className="mt-4 text-2xl leading-snug font-semibold md:text-3xl">{tr(narrative.vision[0])}</p>
            <p className="mt-4 text-lg text-[#3d4b63]">{tr(narrative.vision[6])}</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.22em] text-gold uppercase">{tr("Qui nous réunissons")}</p>
        </Reveal>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {people.map(([title, text]) => (
            <Reveal key={title}>
              <article className="h-full border-t-2 border-gold pt-4">
                <h2 className="font-semibold">{tr(title)}</h2>
                <p className="mt-2 text-sm text-muted">{tr(text)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden">
        <img
          src="/media/marketplace-commerce.jpg"
          alt={tr("La marketplace : boutique, paiement et livraison.")}
          width={1376}
          height={768}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#07101c]/78" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-8 px-5 py-16 md:px-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.22em] text-gold uppercase">{tr("Programme de partenariat")}</p>
            <h2 className="mt-3 font-display text-4xl font-semibold">{tr("Devenir partenaire")}</h2>
            <p className="mt-3 max-w-md text-muted">{tr("Contribuez sur SidraStart, puis envoyez une demande.")}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={site.investUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-6 text-sm font-semibold text-ink">
                SidraStart
              </a>
              <Link to="/partenaires" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-semibold">
                {tr("Envoyer la demande")}
              </Link>
            </div>
          </Reveal>
          <Reveal>
            <dl className="overflow-hidden rounded-2xl border border-white/15 bg-[#07101c]/70">
              {facts.map(([label, value]) => (
                <div key={label} className="grid grid-cols-2 gap-3 border-t border-white/10 px-4 py-3 text-sm first:border-t-0">
                  <dt className="text-muted">{tr(label)}</dt>
                  <dd className="text-right font-semibold">{tr(value)}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.22em] text-gold uppercase">{tr("À retenir")}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {advantages.map((label) => (
              <p key={label} className="rounded-2xl border border-line px-4 py-5 font-semibold">
                {tr(label)}
              </p>
            ))}
          </div>
        </Reveal>
        <Reveal className="mt-10">
          <ul className="grid gap-2">
            {points.map((point) => (
              <li key={point} className="border-b border-line py-3 text-sm">
                {tr(point)}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="relative overflow-hidden">
        <img
          src="/media/vision-afrique.jpg"
          alt={tr("Une plateforme numérique ouverte au monde.")}
          width={1376}
          height={768}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#07101c]/75" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-16 md:px-8">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.22em] text-gold uppercase">{tr("Internationale")}</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold">{tr(narrative.africa[0])}</h2>
            <p className="mt-3 max-w-xl text-muted">{tr(narrative.africa[1])}</p>
          </Reveal>
          <Reveal className="mt-8">
            <div className="flex flex-wrap gap-2">
              {spaces.map((space) => (
                <span key={space} className="rounded-full border border-white/20 px-4 py-2 text-sm">
                  {tr(space)}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-14 md:px-8 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.22em] text-gold uppercase">SidraChain</p>
          <p className="mt-3 text-lg">{tr(narrative.place[0])}</p>
          <p className="mt-2 text-sm text-muted">{tr(narrative.vision[7])}</p>
          <Link to="/sidrachain" className="mt-5 inline-flex min-h-11 items-center font-semibold text-gold">
            {tr("Découvrir SidraChain")}
          </Link>
        </Reveal>
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.22em] text-gold uppercase">{tr("Contact")}</p>
          <a href="mailto:contact.wikenva@gmail.com" className="mt-3 block font-semibold">contact.wikenva@gmail.com</a>
          <a href="tel:+2290196412117" className="mt-2 block font-semibold">+229 01 96 41 21 17</a>
          <p className="mt-4 text-sm text-muted">{tr("Félix Adjibodou est le CEO de WIKENVA.")}</p>
        </Reveal>
      </section>
    </>
  );
}
