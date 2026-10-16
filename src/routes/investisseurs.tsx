import { createFileRoute, Link } from "@tanstack/react-router";
import { goals, isPending, narrative, pageMeta, site } from "@/content/site";
import { useTr } from "@/lib/locale";
import { DocumentList, InvestActions, Roadmap } from "@/components/site/blocks";
import { PathBoard } from "@/components/site/paths";
import { ShareholderAccess } from "@/components/site/shareholder-form";
import { SiteShell } from "@/components/site/shell";
import { PageHero, Panel } from "@/components/site/ui";

export const Route = createFileRoute("/investisseurs")({
  head: () =>
    pageMeta(
      "Investisseurs — WIKENVA",
      "Espace d'information pour les investisseurs et partenaires de WIKENVA. Aucun rendement n'est promis.",
    ),
  component: InvestorsPage,
});

function InvestorsPage() {
  const tr = useTr();
  return (
    <SiteShell>
      <PageHero
        eyebrow="Investisseurs"
        title="Lire le projet avant toute décision."
        lede="Cette page parle de l'information investisseur et du programme actionnaires. La demande de partenaire est sur une autre page. Aucun rendement n'est promis."
      />
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-8 md:px-8">
        <div className="flex flex-col gap-4">
          <InvestActions />
          <p className="text-sm text-muted">
            {tr("« Investir sur SidraStart » ouvre la fiche Digital Marketplace Ebook Halal. Cela ne crée ni le statut de partenaire, ni celui d'actionnaire.")}
          </p>
        </div>
        <PathBoard here="shareholder" />
        <section id="actionnaires" className="scroll-mt-24">
          <h2 className="font-display text-3xl font-semibold">{tr("Programme actionnaires")}</h2>
          <p className="mt-3 max-w-3xl text-muted">{tr(site.shareholderProgram.revenueNote)}</p>
          <p className="mt-3 max-w-3xl text-sm text-muted">
            {tr("Ce programme n'est pas la promotion partenaire à 3 000 SDA, et il ne se confond pas avec l'investissement effectué sur SidraStart.")}
          </p>
          <div className="mt-6">
            <ShareholderAccess />
          </div>
        </section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel>
            <h2 className="font-display text-2xl font-semibold">{tr("Vision")}</h2>
            <p className="mt-3 text-muted">{tr(narrative.vision[0])}</p>
            <Link to="/vision" className="mt-4 inline-flex min-h-11 items-center font-semibold text-gold">
              {tr("Lire la vision")}
            </Link>
          </Panel>
          <Panel>
            <h2 className="font-display text-2xl font-semibold">{tr("Objectifs")}</h2>
            <ul className="mt-3 grid gap-2">
              {goals.map((goal) => (
                <li key={goal} className="text-muted">
                  {tr(goal)}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
        <Panel>
          <h2 className="font-display text-2xl font-semibold">{tr("Modèle économique")}</h2>
          <p className="mt-3 text-muted">
            {isPending(site.economicModel)
              ? tr("À compléter. Le modèle économique sera présenté lorsqu'il sera officiellement défini. Aucune hypothèse de revenus n'est affichée.")
              : site.economicModel}
          </p>
        </Panel>
        <div>
          <h2 className="font-display text-3xl font-semibold">{tr("Feuille de route")}</h2>
          <div className="mt-6">
            <Roadmap compact />
          </div>
        </div>
        <div>
          <h2 className="font-display text-3xl font-semibold">{tr("Documents officiels")}</h2>
          <div className="mt-6">
            <DocumentList />
          </div>
        </div>
        <Panel>
          <h2 className="font-display text-2xl font-semibold">{tr("Avant toute décision")}</h2>
          <ul className="mt-4 grid gap-3 text-muted">
            <li>{tr("Les crypto-actifs peuvent perdre toute leur valeur.")}</li>
            <li>{tr("Aucun rendement, rachat ou dividende n'est promis.")}</li>
            <li>{tr("Les champs « À compléter » ne sont pas des données manquantes à deviner : elles ne sont pas encore officielles.")}</li>
            <li>{tr("Vérifiez les documents publiés et, si besoin, un conseil indépendant.")}</li>
            <li>
              {tr("L'avertissement complet est sur la page")}{" "}
              <Link to="/risques" className="font-semibold text-fg">
                {tr("Risques")}
              </Link>
              .
            </li>
          </ul>
        </Panel>
      </div>
    </SiteShell>
  );
}
