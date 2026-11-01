import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Cpu, PenLine, ShoppingBag, Sparkles, Store, Users } from "lucide-react";
import { pageMeta, site } from "@/content/site";
import { SiteShell } from "@/components/site/shell";
import { Portrait } from "@/components/site/portrait";
import { ExternalLink, TextLink } from "@/components/site/ui";
import { useTr } from "@/lib/locale";

export const Route = createFileRoute("/presentation")({
  head: () =>
    pageMeta(
      "Présentation — WIKENVA",
      "Ebooks, auteurs, lecteurs et commerces licites.",
    ),
  component: PresentationPage,
});

const spaces = [
  [Sparkles, "Créateurs"],
  [PenLine, "Auteurs"],
  [BookOpen, "Lecteurs"],
  [Users, "Communauté"],
  [Store, "Marketplace"],
  [Cpu, "Outils"],
  [ShoppingBag, "Boutiques"],
] as const;

const products = ["Ebooks", "Formations", "Logiciels", "Modèles numériques"] as const;

function PresentationPage() {
  const tr = useTr();
  return (
    <SiteShell>
      <header className="border-b border-line">
        <div className="mx-auto w-full max-w-3xl px-5 py-8 md:px-8 md:py-12">
          <img
            src="/media/logo-official.jpg"
            alt="WIKENVA"
            width={480}
            height={266}
            decoding="async"
            className="h-12 w-auto"
          />
          <p className="mt-5 text-sm font-semibold tracking-widest text-gold uppercase">{tr("Présentation")}</p>
          <h1 className="mt-2 font-display text-3xl font-semibold md:text-5xl">
            {tr("La plateforme des créateurs, des auteurs et des lecteurs")}
          </h1>
          <p className="mt-3 text-base text-muted">{tr("Ebooks, auteurs, lecteurs et commerces licites.")}</p>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-3xl gap-10 px-5 py-8 md:px-8 md:py-12">
        <section>
          <h2 className="font-display text-2xl font-semibold">{tr("Sept espaces")}</h2>
          <ol className="mt-5 grid gap-3 sm:grid-cols-2">
            {spaces.map(([Icon, title], index) => (
              <li key={title} className="flex items-center gap-3 rounded-2xl border border-line bg-ink px-4 py-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-gold/40 text-gold">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-semibold text-gold">{index + 1}</p>
                  <h3 className="font-semibold">{tr(title)}</h3>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold">{tr("CEO de WIKENVA")}</h2>
          <div className="mt-5 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <Portrait
              src="/media/wikenva-ceo.jpg"
              alt="Portrait de Félix Adjibodou, CEO de WIKENVA."
              name="Félix Adjibodou"
              role="CEO de WIKENVA"
            />
            <p className="max-w-md text-muted">
              {tr("Félix Adjibodou est le CEO de WIKENVA.")}
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold">{tr("Produits")}</h2>
          <ul className="mt-5 grid grid-cols-2 gap-3">
            {products.map((title) => (
              <li key={title} className="rounded-2xl border border-line bg-ink px-4 py-4 font-semibold">
                {tr(title)}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <img
              src="/media/sidra-logo.png"
              alt={tr("Logo SidraChain")}
              width={1024}
              height={1024}
              decoding="async"
              className="h-14 w-14 shrink-0 object-contain"
            />
            <h2 className="font-display text-2xl font-semibold md:text-3xl">{tr("WIKENVA et l'écosystème SidraChain")}</h2>
          </div>
          <p className="mt-4 text-muted">{tr("Dans l'écosystème SidraChain.")}</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <TextLink to="/sidrachain" variant="ghost" className="w-full sm:w-auto">
              {tr("Découvrir SidraChain")}
            </TextLink>
            <ExternalLink href={site.sidrachainUrl} variant="ghost" className="w-full sm:w-auto">
              {tr("Site officiel SidraChain")}
            </ExternalLink>
          </div>
        </section>

        <p className="text-sm text-muted">{tr("Intégration après validation de la Core Team SidraChain.")}</p>
      </div>
    </SiteShell>
  );
}
