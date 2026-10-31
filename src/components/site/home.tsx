import { Link } from "@tanstack/react-router";
import { narrative, site } from "@/content/site";
import { useTr } from "@/lib/locale";
import { PromotionClock } from "./promotion";

const people = [
  ["Auteurs", "Écrire et proposer des ebooks. La boutique n'est pas encore ouverte."],
  ["Lecteurs", "Découvrir des ouvrages licites, quand le catalogue ouvrira."],
  ["Créateurs", "Préparer des contenus numériques. Rien ne se vend encore ici."],
  ["Entreprises", "Présenter une activité en ligne. L'espace n'est pas ouvert."],
  ["Partenaires", "Demander le statut après 1 000 SDA. La demande est vérifiée."],
] as const;

const advantages = [
  ["Publication gratuite d'articles.", "Prévu pour les partenaires validés."],
  ["Boutique en ligne gratuite.", "Prévue. Elle n'est pas ouverte."],
  ["Fonctions Premium.", "L'accès suit la validation. Ce n'est pas un rendement."],
] as const;

const steps = [
  ["1", "Contribuer sur SidraStart", "Depuis votre propre compte. Jamais auprès d'un membre de WIKENVA."],
  ["2", "Atteindre 1 000 SDA", "Ce seuil permet de demander le statut de partenaire. La demande est vérifiée."],
  ["3", "Envoyer la demande", "Le formulaire est sur la page Partenaires. Rien n'est accordé automatiquement."],
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
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">{tr(narrative.vision[0])}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/partenaires" className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-6 text-sm font-semibold text-ink">
                {tr("Devenir partenaire")}
              </Link>
              <Link to="/vision" className="inline-flex min-h-12 items-center justify-center rounded-full border border-line px-6 text-sm font-semibold">
                {tr("Notre vision")}
              </Link>
            </div>
          </div>
          <img
            src="/media/hero-creators.png"
            alt={tr("WIKENVA relie les auteurs, les lecteurs, les créateurs et les entreprises.")}
            width={1376}
            height={768}
            decoding="async"
            fetchPriority="high"
            className="w-full rounded-3xl border border-line"
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
            src="/media/hero-marketplace.png"
            alt={tr("WIKENVA, marketplace numérique d'ebooks licites. Là où le savoir, le commerce et l'innovation se rejoignent.")}
            width={1376}
            height={768}
            decoding="async"
            className="w-full rounded-3xl border border-line"
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
              <p className="mt-3 text-lg font-semibold text-gold">{tr("1 000 SDA · jusqu'au 30 novembre 2026")}</p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
                {tr("À partir de 1 000 SDA, le contributeur peut demander à devenir partenaire, sous réserve de validation.")}
              </p>
              <ol className="mt-6 grid gap-3">
                {steps.map(([index, title, text]) => (
                  <li key={index} className="flex gap-3">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gold text-sm font-semibold text-ink">{index}</span>
                    <div>
                      <p className="font-semibold">{tr(title)}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{tr(text)}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link to="/partenaires" className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-6 text-sm font-semibold text-ink">
                  {tr("Envoyer la demande")}
                </Link>
                <a href={site.investUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full border border-gold/40 px-6 text-sm font-semibold text-gold">
                  SidraStart
                </a>
              </div>
            </div>
            <div className="rounded-3xl border border-gold/30 bg-ink p-5">
              <PromotionClock compact />
              <ul className="mt-5 grid gap-3">
                {advantages.map(([title, text]) => (
                  <li key={title} className="rounded-2xl border border-line px-4 py-3">
                    <p className="font-semibold">{tr(title)}</p>
                    <p className="mt-1 text-sm text-muted">{tr(text)}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {tr("Une part de 15 % des revenus est prévue pour le partenariat. Une part de 3 % est envisagée pour la zakat. Cela ne remplace pas la zakat personnelle, et les règles seront publiées avant toute répartition.")}
              </p>
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
