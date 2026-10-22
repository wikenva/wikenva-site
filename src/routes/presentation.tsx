import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Cpu, PenLine, Store, Sparkles, Users } from "lucide-react";
import { pageMeta, site } from "@/content/site";
import { SiteShell } from "@/components/site/shell";
import { Portrait } from "@/components/site/portrait";
import { ExternalLink, TextLink } from "@/components/site/ui";
import { useTr } from "@/lib/locale";

export const Route = createFileRoute("/presentation")({
  head: () =>
    pageMeta(
      "Présentation — WIKENVA",
      "WIKENVA est en cours de développement. Six espaces sont envisagés pour les créateurs, les auteurs, les lecteurs et la communauté. Aucun rendement n'est promis.",
    ),
  component: PresentationPage,
});

const spaces = [
  {
    icon: Sparkles,
    title: "Espace des créateurs de contenu avec IA",
    text: "Un environnement envisagé pour aider les créateurs à concevoir, organiser et publier leurs contenus avec des outils d'intelligence artificielle. Il n'est pas ouvert.",
  },
  {
    icon: PenLine,
    title: "Espace des auteurs",
    text: "Un espace envisagé pour présenter des œuvres, publier des livres numériques et, si la fonction est développée, les proposer. Il n'est pas ouvert.",
  },
  {
    icon: BookOpen,
    title: "Espace des lecteurs",
    text: "Un espace envisagé pour découvrir des livres et des contenus numériques utiles. Le catalogue n'est pas encore disponible.",
  },
  {
    icon: Users,
    title: "Espace communauté et visiteurs",
    text: "Un accueil envisagé pour découvrir le projet, suivre son évolution et échanger. Les annonces passent aujourd'hui par les réseaux officiels.",
  },
  {
    icon: Store,
    title: "Grande marketplace numérique",
    text: "Une marketplace envisagée pour des livres électroniques, des formations, des logiciels et d'autres produits licites. Aucun achat n'est possible sur ce site.",
  },
  {
    icon: Cpu,
    title: "Technologies avancées pour les créateurs",
    text: "Des outils envisagés pour la création et le développement d'une audience. Ils ne sont pas en service.",
  },
] as const;

const products = [
  { title: "Ebooks", text: "Livres numériques. Pas encore en vente." },
  { title: "Formations", text: "Parcours de formation. Pas encore en vente." },
  { title: "Logiciels", text: "Outils numériques. Pas encore en vente." },
  { title: "Modèles numériques", text: "Modèles et ressources. Pas encore en vente." },
] as const;

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
          <p className="mt-3 text-base text-muted">{tr("La plateforme est en cours de développement. Rien n'est encore ouvert.")}</p>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-3xl gap-10 px-5 py-8 md:px-8 md:py-12">
        <section className="rounded-3xl border border-gold/50 bg-panel p-5">
          <p className="text-sm font-semibold tracking-widest text-gold uppercase">{tr("Statut")}</p>
          <h2 className="mt-2 font-display text-2xl font-semibold">{tr("WIKENVA est en cours de développement")}</h2>
          <p className="mt-3 text-sm text-muted">{tr("Les espaces peuvent encore changer, et aucun n'est ouvert.")}</p>
          <p className="mt-3 text-sm text-muted">{tr("Le site www.wikenva.com sera intégré après validation de la Core Team SidraChain.")}</p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold">{tr("Six espaces envisagés")}</h2>
          <ol className="mt-5 grid gap-4 sm:grid-cols-2">
            {spaces.map((space, index) => (
              <li key={space.title} className="rounded-3xl border border-line bg-ink p-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                    <space.icon className="size-5" aria-hidden />
                  </span>
                  <span className="text-sm font-semibold text-gold">{index + 1}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{tr(space.title)}</h3>
                <p className="mt-2 text-sm text-muted">{tr(space.text)}</p>
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
          <h2 className="font-display text-2xl font-semibold">{tr("Produits envisagés")}</h2>
          <p className="mt-3 text-muted">
            {tr("La boutique est fermée, et aucun prix n'est affiché.")}
          </p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {products.map((item) => (
              <li key={item.title} className="rounded-3xl border border-line bg-ink p-5">
                <p className="text-sm font-semibold text-gold">{tr("Pas encore en vente")}</p>
                <h3 className="mt-2 font-display text-lg font-semibold">{tr(item.title)}</h3>
                <p className="mt-2 text-sm text-muted">{tr(item.text)}</p>
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
          <p className="mt-4 text-muted">
            {tr("WIKENVA souhaite rejoindre l'écosystème SidraChain. Ce n'est pas encore un partenariat officiel.")}
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <TextLink to="/sidrachain" variant="ghost" className="w-full sm:w-auto">
              {tr("Découvrir SidraChain")}
            </TextLink>
            <ExternalLink href={site.sidrachainUrl} variant="ghost" className="w-full sm:w-auto">
              {tr("Site officiel SidraChain")}
            </ExternalLink>
          </div>
        </section>

        <p className="text-sm text-muted">
          <Link to="/communaute" className="font-semibold text-gold">
            {tr("Les annonces officielles sont sur la page Communauté.")}
          </Link>
        </p>
      </div>
    </SiteShell>
  );
}
