import { createFileRoute } from "@tanstack/react-router";
import { narrative, pageMeta, principles } from "@/content/site";
import { useTr } from "@/lib/locale";
import { SiteShell } from "@/components/site/shell";
import { RoleBoard } from "@/components/site/blocks";
import { PageHero, TextLink } from "@/components/site/ui";

const chapters = [
  { title: "La vision", paragraphs: narrative.vision },
  { title: "La mission", paragraphs: narrative.mission },
  { title: "L'Afrique", paragraphs: narrative.africa },
  { title: "SidraChain", paragraphs: narrative.place },
];

export const Route = createFileRoute("/vision")({
  head: () =>
    pageMeta(
      "Vision — WIKENVA",
      "Une plateforme de produits numériques licites, dans le respect des valeurs islamiques. La boutique n'est pas encore ouverte.",
    ),
  component: VisionPage,
});

function VisionPage() {
  const tr = useTr();
  return (
    <SiteShell>
      <PageHero
        eyebrow="Vision"
        title="Le commerce numérique au service des valeurs islamiques."
        lede="Acheter et vendre des produits numériques licites. La boutique n'est pas encore ouverte. Aucun rendement n'est promis."
      />
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-5 py-8 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="grid gap-10">
          {chapters.map((chapter) => (
            <section key={chapter.title}>
              <h2 className="font-display text-3xl font-semibold">{tr(chapter.title)}</h2>
              <div className="mt-4 grid gap-4">
                {chapter.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-muted">
                    {tr(paragraph)}
                  </p>
                ))}
              </div>
            </section>
          ))}
          <section>
            <h2 className="font-display text-3xl font-semibold">{tr("Nos principes")}</h2>
            <ul className="mt-4 grid gap-3">
              {principles.map(([title, text]) => (
                <li key={title} className="rounded-2xl border border-line px-4 py-4">
                  <p className="font-semibold">{tr(title)}</p>
                  <p className="mt-2 text-sm text-muted">{tr(text)}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <figure className="lg:sticky lg:top-24">
          <img
            src="/media/planes.jpg"
            alt={tr("Plans de verre bleu traversés d'une ligne dorée.")}
            width={1600}
            height={1200}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full rounded-2xl border border-line object-cover"
          />
          <figcaption className="mt-3 text-sm text-muted">
            {tr("Visuel d'accompagnement. Il n'illustre pas un lieu, un produit ou un partenariat réel.")}
          </figcaption>
        </figure>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8">
          <h2 className="font-display text-3xl font-semibold">{tr("Ce que cet espace rend possible")}</h2>
          <RoleBoard />
          <TextLink to="/feuille-de-route" variant="ghost" className="mt-8">
            {tr("Voir comment ces objectifs se lisent dans la feuille de route")}
          </TextLink>
        </div>
      </div>
    </SiteShell>
  );
}
