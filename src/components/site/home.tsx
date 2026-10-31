import { Link } from "@tanstack/react-router";
import { narrative, site, socials } from "@/content/site";
import { useTr } from "@/lib/locale";
import { PartnerButton } from "./ui";

export function HomePage() {
  const tr = useTr();
  const points = narrative.vision.slice(1, 6);
  const close = narrative.vision[6];
  const powered = narrative.vision[7];

  return (
    <>
      <section className="mx-auto w-full max-w-3xl px-4 pt-4 pb-2">
        <img
          src="/media/hero-marketplace.png"
          alt={tr("WIKENVA, marketplace numérique d'ebooks licites. Là où le savoir, le commerce et l'innovation se rejoignent.")}
          width={1376}
          height={768}
          decoding="async"
          fetchPriority="high"
          className="w-full rounded-2xl border border-line"
        />
        <img
          src="/media/hero-creators.png"
          alt={tr("WIKENVA relie les auteurs, les lecteurs, les créateurs et les entreprises.")}
          width={1376}
          height={768}
          decoding="async"
          className="mt-3 w-full rounded-2xl border border-line"
        />
      </section>

      <section className="mx-auto w-full max-w-lg px-5">
        <div className="rounded-2xl bg-[#071433] px-4 py-4">
          <p className="text-sm font-semibold text-gold">{tr("Informations")}</p>
          <ul className="mt-3 grid gap-3 text-sm">
            <li>
              <a href={site.platformUrl} className="font-semibold">
                www.wikenva.com
              </a>
            </li>
            <li>
              <a href="mailto:contact.wikenva@gmail.com" className="font-semibold">
                contact.wikenva@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+2290196412117" className="font-semibold">
                +229 01 96 41 21 17
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="mx-auto w-full max-w-lg px-5 py-8 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">{tr("Notre vision")}</p>
        <h2 className="mt-3 font-display text-2xl font-semibold leading-tight">{tr("Marketplace numérique d'ebooks licites")}</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">{tr(narrative.vision[0])}</p>
        <ul className="mx-auto mt-5 grid max-w-sm gap-2 text-left text-sm">
          {points.map((point) => (
            <li key={point} className="rounded-xl border border-line bg-panel px-3 py-2">
              {tr(point)}
            </li>
          ))}
        </ul>
        <p className="mt-5 font-semibold">{tr(close)}</p>
        <p className="mt-2 text-sm text-gold">{tr(powered)}</p>
        <PartnerButton className="mx-auto mt-5 min-h-12 w-full max-w-xs rounded-full" />
      </section>

      <Story
        title="Devenir partenaire"
        image="/media/wikenva-avantages-partenaires.png"
        text="Jusqu'au 30 novembre 2026. Minimum 1 000 SDA. La demande est vérifiée."
        to="/partenaires"
      />
      <Story
        title="SidraChain"
        image="/media/sidra-founder.jpg"
        text="Découvrez le projet, le fondateur et les initiatives. Aucun rendement n'est promis."
        to="/sidrachain"
      />
      <Story
        title="Marketplace WIKENVA"
        image="/media/book.jpg"
        text="Acheter et vendre des produits numériques licites. La boutique n'est pas encore ouverte. Aucun rendement n'est promis."
        to="/presentation"
      />

      <section className="bg-black px-5 py-10">
        <div className="mx-auto w-full max-w-lg">
          <h2 className="text-lg font-semibold text-gold">{tr("À propos")}</h2>
          <p className="mt-3 text-sm leading-relaxed">{tr(narrative.vision[0])}</p>
          <h3 className="mt-6 text-base font-semibold text-gold">{tr("Notre vision")}</h3>
          <ul className="mt-3 grid gap-2 text-sm leading-relaxed">
            {points.map((point) => (
              <li key={point} className="flex gap-2">
                <span className="text-gold" aria-hidden>•</span>
                <span>{tr(point)}</span>
              </li>
            ))}
          </ul>
          <h3 className="mt-6 text-base font-semibold text-gold">{tr("Réseaux")}</h3>
          <ul className="mt-3 flex gap-3">
            {socials.map((item) => (
              <li key={item.id}>
                <a href={item.href} target="_blank" rel="noreferrer" aria-label={item.name} className="grid size-11 place-items-center rounded-full bg-white/10">
                  <img src={`/media/social/${item.id === "twitter" ? "x" : item.id}.svg`} alt="" className="size-5" />
                </a>
              </li>
            ))}
          </ul>
          <h3 className="mt-6 text-base font-semibold text-gold">{tr("Contact")}</h3>
          <p className="mt-3 text-sm">
            <a href="mailto:contact.wikenva@gmail.com" className="font-semibold">contact.wikenva@gmail.com</a>
          </p>
          <p className="mt-2 text-sm">
            <a href="tel:+2290196412117" className="font-semibold">+229 01 96 41 21 17</a>
          </p>
        </div>
      </section>
    </>
  );
}

function Story({ title, image, text, to }: { title: string; image: string; text: string; to: "/partenaires" | "/sidrachain" | "/presentation" }) {
  const tr = useTr();
  return (
    <section className="mx-auto w-full max-w-lg px-5 py-6 text-center">
      <h2 className="font-display text-2xl font-semibold">{tr(title)}</h2>
      <img src={image} alt="" className="mt-4 aspect-[16/9] w-full rounded-2xl border border-line object-cover" />
      <p className="mt-4 text-sm leading-relaxed text-muted">{tr(text)}</p>
      <Link to={to} className="mx-auto mt-5 inline-flex min-h-12 w-full max-w-xs items-center justify-center rounded-full bg-gold px-6 text-sm font-semibold text-ink">
        {tr("Lire la suite")}
      </Link>
    </section>
  );
}