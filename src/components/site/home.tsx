import { Link } from "@tanstack/react-router";
import { narrative, site } from "@/content/site";
import { useTr } from "@/lib/locale";
import { PromotionClock } from "./promotion";

export function HomePage() {
  const tr = useTr();

  return (
    <>
      <section className="relative min-h-[82vh] overflow-hidden">
        <img
          src="/media/hero-accueil.jpg"
          alt={tr("Un créateur WIKENVA sur une plateforme internationale.")}
          width={1024}
          height={1024}
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06101f]/88 via-[#06101f]/62 to-[#06101f]/25" />
        <div className="relative mx-auto flex min-h-[82vh] w-full max-w-6xl flex-col justify-end px-5 pt-16 pb-12 md:px-8 md:pb-16">
          <h1 className="max-w-xl font-display text-5xl leading-[0.92] font-semibold text-white md:text-7xl">
            WIKENVA
            <span className="mt-1 block text-[#f3b23a]">Digital</span>
            <span className="block text-[#f3b23a]">Marketplace</span>
          </h1>
          <p className="mt-6 max-w-md text-2xl leading-tight font-semibold text-white md:text-4xl">
            24 {tr("décembre")} 2026
          </p>
          <p className="mt-2 max-w-sm text-sm text-white/85 md:text-base">{tr("Fin de la contribution WIKENVA sur SidraStart")}</p>
          <a
            href={site.investUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-14 w-fit items-center justify-center rounded-xl bg-[#1f6feb] px-7 text-base font-semibold text-white"
          >
            {tr("Contribuer dans WIKENVA")}
          </a>
          <div className="mt-6 max-w-xs">
            <PromotionClock caption={false} />
          </div>
        </div>
      </section>

      <section className="bg-white text-[#172033]">
        <div className="mx-auto w-full max-w-3xl px-5 py-10 md:px-8 md:py-14">
          <p className="text-xl leading-relaxed md:text-2xl">{tr(narrative.vision[0])}</p>
          <p className="mt-5 text-lg leading-relaxed text-[#3d4b63]">{tr(narrative.vision[6])}</p>
          <p className="mt-3 text-lg leading-relaxed text-[#3d4b63]">{tr(narrative.vision[7])}</p>
          <Link to="/partenaires" className="mt-8 inline-flex min-h-12 items-center font-semibold text-[#1f6feb]">
            {tr("Envoyer la demande")}
          </Link>
        </div>
      </section>
    </>
  );
}
