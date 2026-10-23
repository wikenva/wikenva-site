import { createFileRoute, Link } from "@tanstack/react-router";
import { pageMeta } from "@/content/site";
import { SiteShell } from "@/components/site/shell";
import { useTr } from "@/lib/locale";

export const Route = createFileRoute("/espace")({
  head: () =>
    pageMeta(
      "Espace partenaire — WIKENVA",
      "L'application WIKENVA est en cours de développement. Les partenaires validés seront prévenus des prochaines ouvertures.",
    ),
  component: PartnerSpace,
});

const steps = ["Publications", "Boutique", "Communauté"] as const;

function PartnerSpace() {
  const tr = useTr();
  return (
    <SiteShell>
      <main className="mx-auto grid w-full max-w-lg px-5 py-16 text-center">
        <img
          src="/media/logo-mark-ui.webp"
          alt="WIKENVA"
          width={480}
          height={266}
          decoding="async"
          className="mx-auto h-16 w-auto bg-transparent"
        />
        <p className="text-xs font-semibold tracking-[0.22em] text-gold uppercase">{tr("Espace partenaire")}</p>
        <h1 className="mt-4 font-display text-4xl font-semibold">{tr("Bienvenue.")}</h1>
        <p className="mt-3 text-lg text-gold">{tr("VALIDÉ. Vous êtes partenaire de WIKENVA.")}</p>
        <div className="mt-8 rounded-3xl border border-gold/50 bg-gold/10 px-6 py-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{tr("Application")}</p>
          <p className="mt-3 font-display text-2xl font-semibold">{tr("En cours de développement.")}</p>
          <p className="mt-3 text-sm text-muted">
            {tr("Rien n'est encore ouvert. Restez connecté : les mises à jour arriveront ici.")}
          </p>
        </div>
        <ul className="mt-4 grid gap-2">
          {steps.map((step) => (
            <li key={step} className="flex items-center justify-between rounded-2xl border border-line px-4 py-3 text-sm">
              <span>{tr(step)}</span>
              <span className="text-gold">{tr("En préparation")}</span>
            </li>
          ))}
        </ul>
        <Link to="/" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-5 text-sm font-semibold text-ink">
          {tr("Retour à WIKENVA")}
        </Link>
      </main>
    </SiteShell>
  );
}
