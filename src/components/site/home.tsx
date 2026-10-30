import { Link } from "@tanstack/react-router";
import { narrative, site, socials } from "@/content/site";
import { useTr } from "@/lib/locale";
import { PartnerButton } from "./ui";

export function HomePage() {
  const tr = useTr();
  const points = [
    "Partager des ebooks et des idées. La boutique n'est pas ouverte.",
    "Demander le partenariat après 1 000 SDA. La demande est vérifiée.",
    "Rejoindre SidraChain après examen de la Core Team.",
    "Aucun rendement n'est promis.",
  ];

  return (
    <>
      <section className="mx-auto w-full max-w-lg px-5 pt-8 pb-2 text-center">
        <h1 className="font-display text-4xl font-semibold tracking-wide">WIKENVA</h1>
        <div className="mx-auto mt-6 flex max-w-sm items-center gap-3 rounded-full border border-line bg-panel py-2 pr-5 pl-2">
          <img src="/media/logo-mark-ui.webp" alt="" width={480} height={266} className="h-14 w-auto" />
          <span className="font-display text-xl font-semibold tracking-wide text-gold">WIKENVA</span>
        </div>
        <p className="mt-6 text-lg font-semibold leading-snug">
          {tr("Lecteurs, auteurs et créateurs, dans le même écosystème.")}
        </p>
      </section>

      <section className="mx-auto grid w-full max-w-lg grid-cols-[1fr_auto] items-center gap-4 px-5 py-6">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-gold">WIKENVA</p>
          <p className="mt-2 font-display text-2xl font-semibold leading-tight">{tr("Commerce numérique licite.")}</p>
        </div>
        <div className="relative h-28 w-36">
          <img src="/media/book.jpg" alt="" className="absolute top-3 left-0 size-16 rounded-full border-2 border-gold object-cover" />
          <img src="/media/globe.jpg" alt="" className="absolute top-0 left-10 size-20 rounded-full border-4 border-ink object-cover ring-2 ring-gold" />
          <img src="/media/token-coin.png" alt="" className="absolute top-4 right-0 size-14 rounded-full border-2 border-gold bg-ink object-cover" />
        </div>
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
        <p className="text-sm leading-relaxed text-muted">{tr(narrative.vision[0])}</p>
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
          <h3 className="mt-6 text-base font-semibold text-gold">{tr("Ce que WIKENVA prépare")}</h3>
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