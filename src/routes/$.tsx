import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/shell";
import { TextLink } from "@/components/site/ui";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Page introuvable — WIKENVA" },
      { name: "description", content: "Cette page n'existe pas sur le site officiel WIKENVA." },
    ],
  }),
  component: function Missing() {
    return (
      <SiteShell>
        <div className="mx-auto w-full max-w-3xl px-5 py-24 md:px-8">
          <p className="text-sm font-semibold tracking-widest text-gold uppercase">404</p>
          <h1 className="mt-4 font-display text-4xl font-semibold">Cette page n'existe pas.</h1>
          <p className="mt-4 text-muted">Le lien est peut-être ancien. Revenez à l'accueil officiel.</p>
          <TextLink to="/" className="mt-8">
            Retour à l'accueil
          </TextLink>
        </div>
      </SiteShell>
    );
  },
});
