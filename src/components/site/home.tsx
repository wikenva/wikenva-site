import { Link } from "@tanstack/react-router";
import { narrative, site } from "@/content/site";
import { useTr } from "@/lib/locale";
import { PromotionClock } from "./promotion";

const people = [
  ["Auteurs", "Ebooks"],
  ["Lecteurs", "Catalogue"],
  ["Créateurs", "Contenus"],
  ["Entreprises", "Activités"],
  ["Partenaires", "Demande vérifiée"],
] as const;

const facts = [
  ["SidraStart", "Contribuer"],
  ["Demande", "À envoyer"],
  ["Minimum", "Aucun"],
  ["Zakat", "3 %"],
  ["Fin", "24 décembre 2026"],
] as const;

export function HomePage() {
  const tr = useTr();
  const points = narrative.vision.slice(1, 6);

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-5 py-10 md:px-8 md:py-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-gold uppercase">WIKENVA</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.05] md:text-5xl">
              {tr("Marketplace numérique d'ebooks licites")}
            </h1>
            <p className="mt-4 text-lg leading-snug font-semibold">
              {tr("Là où le savoir, le commerce et l'innovation se rejoignent.")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/partenaires" className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-6 text-sm font-semibold text-ink">
                {tr("Devenir partenaire")}
              </Link>
              <Link to="/vision" className="inline-flex min-h-12 items-center justify-center rounded-full border border-line px-6 text-sm font-semibold">
                {tr("Notre vision")}
              </Link>
            </div>
            <div className="mt-6 max-w-md rounded-2xl border border-gold/35 bg-ink px-4 py-4">
              <p className="text-center text-xs font-semibold tracking-[0.18em] text-gold uppercase">24 {tr("décembre")} 2026</p>
              <p className="mt-1 text-center text-sm font-semibold">{tr("Fin de la contribution WIKENVA sur SidraStart")}</p>
              <div className="mt-4">
                <PromotionClock caption={false} />
              </div>
            </div>
          </div>
          <img
            src="/media/hero-accueil.jpg"
            alt={tr("Un créateur WIKENVA, avec l'Afrique numérique.")}
            width={1024}
            height={1024}
            decoding="async"
            fetchPriority="high"
            className="aspect-[4/5] w-full rounded-3xl border border-line object-cover object-top lg:aspect-auto lg:max-h-[640px]"
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8">
        <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{tr("Qui nous réunissons")}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {people.map(([title, text]) => (
            <article key={title} className="rounded-2xl border border-line bg-panel p-4">
              <h2 className="font-semibold">{tr(title)}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{tr(text)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-panel/40">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-12 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <img
            src="/media/vision-afrique.jpg"
            alt={tr("L'Afrique reliée, de Dakar à Nairobi.")}
            width={1376}
            height={768}
            decoding="async"
            className="aspect-video w-full rounded-3xl border border-line object-cover"
          />
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{tr("Notre vision")}</p>
            <h2 className="mt-2 font-display text-3xl font-semibold">{tr(narrative.vision[6])}</h2>
            <ul className="mt-5 grid gap-2">
              {points.map((point) => (
                <li key={point} className="rounded-xl border border-line bg-ink px-4 py-3 text-sm">
                  {tr(point)}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm font-semibold text-gold">{tr(narrative.vision[7])}</p>
          </div>
        </div>
      </section>

      <section id="partenariat" className="bg-[#071433]">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{tr("Programme de partenariat")}</p>
              <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">{tr("Devenir partenaire")}</h2>
              <p className="mt-3 text-sm text-muted">{tr("Contribuez sur SidraStart, puis envoyez une demande.")}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href={site.investUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-6 text-sm font-semibold text-ink">
                  SidraStart
                </a>
                <Link to="/partenaires" className="inline-flex min-h-12 items-center justify-center rounded-full border border-gold/40 px-6 text-sm font-semibold text-gold">
                  {tr("Envoyer la demande")}
                </Link>
              </div>
            </div>
            <div>
              <img
                src="/media/marketplace-commerce.jpg"
                alt={tr("La marketplace : boutique, paiement et livraison.")}
                width={1376}
                height={768}
                decoding="async"
                className="mb-4 aspect-video w-full rounded-2xl border border-line object-cover"
              />
              <div className="overflow-hidden rounded-2xl border border-line">
                <p className="bg-gold px-4 py-3 text-sm font-semibold tracking-wide text-ink uppercase">{tr("Partenariat")}</p>
                <dl>
                  {facts.map(([label, value]) => (
                    <div key={label} className="grid grid-cols-2 gap-3 border-t border-line px-4 py-3 text-sm">
                      <dt className="text-muted">{tr(label)}</dt>
                      <dd className="text-right font-semibold">{tr(value)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">SidraChain</p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{tr(narrative.vision[7])}</p>
        </div>
        <Link to="/sidrachain" className="inline-flex min-h-12 items-center justify-center rounded-full border border-line px-6 text-sm font-semibold">
          {tr("Découvrir SidraChain")}
        </Link>
      </section>
    </>
  );
}
