import { createFileRoute } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { SiteShell } from "@/components/site/shell";
import { Panel } from "@/components/site/ui";
import { useTr } from "@/lib/locale";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const tr = useTr();
  return (
    <SiteShell>
      <div className="mx-auto grid w-full max-w-md px-5 py-16">
        <Panel>
          <h1 className="font-display text-3xl font-semibold">{tr("Espace administrateurs")}</h1>
          <p className="mt-3 text-sm text-muted">
            {tr("Connexion réservée aux CEO autorisés. Le site public reste ouvert sans compte.")}
          </p>
          {authEnabled ? (
            <div className="mt-6 grid gap-3">
              {GROK_PROVIDERS.map((provider) => (
                <button
                  key={provider.providerId}
                  type="button"
                  onClick={() => signIn(provider.providerId, { callbackURL: "/administration" })}
                  className="min-h-12 rounded-full bg-gold px-5 text-sm font-semibold text-ink"
                >
                  {tr("Continuer avec")} {provider.label}
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm text-muted">{tr("La connexion administrateur n'est pas activée.")}</p>
          )}
        </Panel>
      </div>
    </SiteShell>
  );
}
