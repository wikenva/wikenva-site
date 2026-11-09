/** @jsxImportSource @/lib/tx */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
  useRouterState,
} from "@tanstack/react-router";
import { readLang, restoreStoredLang, useLang } from "@/lib/i18n";
import { useEffect, type ReactNode } from "react";
import { Compass } from "lucide-react";

import { ScrollEffects } from "@/components/site/ScrollEffects";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { NavigationLoader } from "@/components/site/NavigationLoader";
import { StickyCta } from "@/components/site/StickyCta";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { links } from "@/config/site";

function NotFoundComponent() {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-hero" />
      <div className="relative mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 py-20 text-center">
        <Compass className="h-12 w-12 text-gold" />
        <p className="mt-6 font-display text-7xl font-bold text-gradient">404</p>
        <h1 className="mt-4 text-2xl font-bold text-foreground">
          {t("Cette page est introuvable", "This page cannot be found")}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {t(
            "La page que vous cherchez n'existe pas ou a été déplacée. Poursuivez la découverte de WIKENVA depuis l'accueil.",
            "The page you are looking for does not exist or has moved. Continue exploring WIKENVA from the home page.",
          )}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="hero" size="xl">
            <Link to="/">{t("Retour à l'accueil", "Back to home")}</Link>
          </Button>
          <Button asChild variant="glass" size="xl">
            <Link to="/contact">{t("Contacter l'équipe", "Contact the team")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  const { t } = useLang();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {t("Cette page n'a pas pu se charger", "This page could not load")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t(
            "Une erreur est survenue de notre côté. Vous pouvez réessayer ou revenir à l'accueil.",
            "Something went wrong on our side. You can try again or go back home.",
          )}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button
            variant="hero"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            {t("Réessayer", "Try again")}
          </Button>
          <Button asChild variant="glass">
            <a href="/">{t("Accueil", "Home")}</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  beforeLoad: () => ({ lang: readLang() }),
  head: ({ match }) => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0f1a3c" },
      { title: "WIKENVA — Digital Marketplace Ebook Halal" },
      {
        name: "description",
        content:
          "WIKENVA, marketplace digitale internationale et éthique pour auteurs, lecteurs et créateurs. Lire. Créer. Partager. Gagner.",
      },
      { name: "author", content: "WIKENVA" },
      { property: "og:site_name", content: "WIKENVA" },
      { property: "og:locale", content: match.context.lang === "en" ? "en_US" : "fr_FR" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Wikenva" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon-48x48.png?v=2" },
      { rel: "icon", type: "image/png", sizes: "512x512", href: "/favicon.png?v=2" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png?v=2" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..600&family=Manrope:wght@400;500;600;700;800&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "WIKENVA",
          url: links.officialSite,
          email: "contact.wikenva@gmail.com",
          slogan: "Lire. Créer. Partager. Gagner.",
          sameAs: [
            "https://x.com/Wikenva",
            "https://www.facebook.com/people/Wikenva/61594737553362/",
            "https://t.me/+-vHI1dIZj-xlMzE0",
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const lang = useRouterState({
    select: (s) => (s.matches[0]?.context as { lang?: string } | undefined)?.lang ?? "fr",
  });
  return (
    <html lang={lang}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { lang, setLang } = useLang();
  useEffect(() => {
    // Laisse React terminer l'hydratation avant de changer la langue.
    const id = window.setTimeout(() => restoreStoredLang(lang, setLang), 400);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-gold-foreground"
      >
        Aller au contenu
      </a>
      <div className="flex min-h-screen flex-col overflow-x-clip">
        <ScrollEffects />
        <NavigationLoader />
        <SiteHeader />
        <main id="contenu" className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
        <StickyCta />
      </div>
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}
