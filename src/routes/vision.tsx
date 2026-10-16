import { createFileRoute } from "@tanstack/react-router";
import { narrative, pageMeta } from "@/content/site";
import { useTr } from "@/lib/locale";
import { SiteShell } from "@/components/site/shell";
import { RoleBoard } from "@/components/site/blocks";
import { PageHero, TextLink } from "@/components/site/ui";

const chapters = [
  { title: "La vision", paragraphs: narrative.vision },
  { title: "La mission", paragraphs: narrative.mission },
  { title: "Le problème", paragraphs: narrative.problem },
  { title: "La place dans l'écosystème", paragraphs: narrative.place },
];

export const Route = createFileRoute("/vision")({
  head: () =>
    pageMeta(
      "Vision — WIKENVA",
      "La vision de WIKENVA : réunir auteurs, lecteurs, créateurs, concepteurs, entrepreneurs et communautés.",
    ),
  component: VisionPage,
});

function VisionPage() {
  const tr = useTr();
  return (
    <SiteShell>
      <PageHero
        eyebrow="Vision"
        title="Une vision claire, un écosystème pour tous."
        lede="Réunir auteurs, lecteurs, créateurs de contenu, concepteurs de produits digitaux, entrepreneurs et bien d'autres acteurs du numérique."
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
