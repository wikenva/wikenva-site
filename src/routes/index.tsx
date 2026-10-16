import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/content/site";
import { HomePage } from "@/components/site/home";
import { SiteShell } from "@/components/site/shell";

export const Route = createFileRoute("/")({
  head: () => ({
    ...pageMeta(
      "WIKENVA — Site officiel",
      "Présentation officielle de WIKENVA et du WIKENVA TOKEN : vision, feuille de route, token, investisseurs et communauté.",
    ),
    links: [
      { rel: "preload", as: "image", href: "/media/logo-mark-ui.webp" },
      { rel: "preload", as: "image", href: "/media/globe.jpg" },
    ],
  }),
  component: function Home() {
    return (
      <SiteShell>
        <HomePage />
      </SiteShell>
    );
  },
});
