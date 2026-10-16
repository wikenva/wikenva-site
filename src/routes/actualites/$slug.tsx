import { createFileRoute } from "@tanstack/react-router";
import { categoryLabels, news, pageMeta } from "@/content/site";
import { SiteShell } from "@/components/site/shell";
import { TextLink } from "@/components/site/ui";

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
  const { slug } = Route.useParams();
  const article = news.find((item) => item.slug === slug);

  return (
    <SiteShell>
      <article className="mx-auto w-full max-w-3xl px-5 py-8 md:px-8">
        {article ? (
          <>
            <p className="text-sm font-semibold text-gold">
              {categoryLabels[article.category]} · {article.date}
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold md:text-5xl">{article.title}</h1>
            <div className="mt-8 grid gap-5">
              {article.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-lg text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </>
        ) : (
          <>
            <h1 className="font-display text-4xl font-semibold">Actualité introuvable</h1>
            <p className="mt-4 text-muted">Cette publication n'existe pas ou a été retirée.</p>
          </>
        )}
        <TextLink to="/actualites" variant="ghost" className="mt-10">
          Voir toutes les actualités
        </TextLink>
      </article>
    </SiteShell>
  );
}
