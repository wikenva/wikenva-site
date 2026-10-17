import { createFileRoute } from "@tanstack/react-router";
import { categoryLabels, news, pageMeta } from "@/content/site";
import { SiteShell } from "@/components/site/shell";
import { TextLink } from "@/components/site/ui";
import { useTr } from "@/lib/locale";

export const Route = createFileRoute("/actualites/$slug")({
  head: ({ params }) => {
    const article = news.find((item) => item.slug === params.slug);
    return pageMeta(
      article ? `${article.title} — WIKENVA` : "Actualité — WIKENVA",
      article?.excerpt ?? "Cette actualité est introuvable.",
    );
  },
  component: ArticlePage,
});

function ArticlePage() {
  const tr = useTr();
  const { slug } = Route.useParams();
  const article = news.find((item) => item.slug === slug);

  return (
    <SiteShell>
      <article className="mx-auto w-full max-w-3xl px-5 py-8 md:px-8">
        {article ? (
          <>
            <p className="text-sm font-semibold text-gold">
              {tr(categoryLabels[article.category])} · {tr(article.date)}
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold md:text-5xl">{tr(article.title)}</h1>
            <div className="mt-8 grid gap-5">
              {article.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-lg text-muted">
                  {tr(paragraph)}
                </p>
              ))}
            </div>
          </>
        ) : (
          <>
            <h1 className="font-display text-4xl font-semibold">{tr("Actualité introuvable")}</h1>
            <p className="mt-4 text-muted">{tr("Cette publication n'existe pas ou a été retirée.")}</p>
          </>
        )}
        <TextLink to="/actualites" variant="ghost" className="mt-10">
          {tr("Voir toutes les actualités")}
        </TextLink>
      </article>
    </SiteShell>
  );
}
