import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { pageMeta } from "@/content/site";
import { listCaptures, listInterests, type CaptureRow, type InterestList } from "@/lib/interest";
import { decidePartner, listPartners, type PartnerList, type PartnerStatus } from "@/lib/partner";
import { signIn } from "@/lib/auth/client";
import { GROK_PROVIDERS } from "@/lib/auth/providers";
import { useTr } from "@/lib/locale";
import { SiteShell } from "@/components/site/shell";
import { PageHero, Panel } from "@/components/site/ui";

export const Route = createFileRoute("/administration")({
  head: () =>
    pageMeta(
      "Espace administrateurs — WIKENVA",
      "Consultation réservée aux CEO autorisés des intentions et candidatures réellement reçues.",
    ),
  component: AdminPage,
});

const gapText = {
  database: "Base durable : renseigner DATABASE_URL.",
  auth: "Connexion des administrateurs : activer VITE_AUTH_ENABLED.",
  admins: "Accès CEO : renseigner WIKENVA_ADMIN_EMAILS avec les e-mails autorisés.",
} as const;

function AdminPage() {
  const tr = useTr();
  const [data, setData] = useState<InterestList | null>(null);
  const [captures, setCaptures] = useState<CaptureRow[]>([]);

  useEffect(() => {
    let active = true;
    listInterests()
      .then(async (next) => {
        if (!active) return;
        setData(next);
        if (next.authorized) setCaptures((await listCaptures()).captures);
      })
      .catch(() => {
        if (active) setData({ operational: false, authorized: false, missing: ["database", "auth", "admins"], requests: [] });
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <SiteShell>
      <PageHero
        eyebrow="Administrateurs"
        title="Intentions et candidatures."
        lede="Seules les demandes réellement reçues apparaissent ici, et seulement pour un CEO dont l'e-mail est autorisé. Aucun exemple n'est affiché."
      />
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-5 py-8 md:px-8">
        {!data ? (
          <p className="text-muted">{tr("Chargement…")}</p>
        ) : !data.operational ? (
          <Panel>
            <h2 className="font-display text-2xl font-semibold">{tr("Réception non opérationnelle")}</h2>
            <p className="mt-3 text-muted">
              {tr("Aucune demande n'est consultable et aucune notification n'est envoyée tant que ces éléments ne sont pas configurés.")}
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-muted">
              {data.missing.map((item) => (
                <li key={item}>{tr(gapText[item])}</li>
              ))}
              <li>{tr("Notification : WIKENVA_NOTIFY_WEBHOOK, une adresse https. Sans elle, aucun avis n'est envoyé.")}</li>
            </ul>
          </Panel>
        ) : !data.authorized ? (
          <Panel>
            <h2 className="font-display text-2xl font-semibold">{tr("Accès réservé")}</h2>
            <p className="mt-3 text-muted">
              {tr("Connectez-vous avec un compte dont l'e-mail figure dans WIKENVA_ADMIN_EMAILS. Les coordonnées ne sont pas affichées aux autres visiteurs.")}
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              {GROK_PROVIDERS.map((provider) => (
                <button
                  key={provider.providerId}
                  type="button"
                  className="min-h-12 rounded-full bg-gold px-5 text-sm font-semibold text-ink"
                  onClick={() => signIn(provider.providerId, { callbackURL: "/administration" })}
                >
                  {provider.label}
                </button>
              ))}
            </div>
          </Panel>
        ) : data.requests.filter((item) => item.kind !== "actionnaire").length === 0 ? (
          <Panel>
            <h2 className="font-display text-2xl font-semibold">{tr("Aucune demande reçue")}</h2>
            <p className="mt-3 text-muted">{tr("L'espace est ouvert. Aucune intention ni candidature n'a encore été enregistrée.")}</p>
          </Panel>
        ) : (
          <ul className="grid gap-4">
            {data.requests.filter((item) => item.kind !== "actionnaire").map((item) => (
              <li key={item.id}>
                <Panel>
                  <p className="text-sm font-semibold text-gold">{tr("Intérêt pour contribuer au projet sur SidraStart")}</p>
                  <h2 className="mt-2 font-display text-2xl font-semibold">{item.name || tr("Nom non fourni")}</h2>
                  <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-faint">{tr("Adresse e-mail")}</dt>
                      <dd>{item.email}</dd>
                    </div>
                    <div>
                      <dt className="text-faint">{tr("Nom d'utilisateur SidraChain")}</dt>
                      <dd>{item.sidraUsername || tr("Non fourni")}</dd>
                    </div>
                    <div>
                      <dt className="text-faint">{tr("Montant envisagé en SDA")}</dt>
                      <dd>{item.amount || tr("Non renseigné")}</dd>
                    </div>
                    <div>
                      <dt className="text-faint">{tr("Réception")}</dt>
                      <dd>
                        {new Date(item.createdAt).toLocaleString("fr")} · {tr("Reçue")}
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-3 text-sm text-muted tabular-nums">{item.id}</p>
                </Panel>
              </li>
            ))}
          </ul>
        )}
        {data?.authorized && captures.length > 0 ? (
          <ul className="grid gap-4">
            {captures.map((item) => (
              <li key={item.id}>
                <Panel>
                  <p className="text-sm font-semibold text-gold">{tr("Capture reçue")}</p>
                  <p className="mt-2 text-sm">{item.name || tr("Nom non fourni")} · {item.email}</p>
                  <img
                    src={`data:${item.contentType};base64,${item.imageData}`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="mt-4 max-h-80 w-full rounded-2xl object-contain"
                  />
                  <p className="mt-3 text-sm text-muted tabular-nums">{item.id}</p>
                </Panel>
              </li>
            ))}
          </ul>
        ) : null}
        <PartnerQueue />
      </div>
    </SiteShell>
  );
}

const partnerStatusLabel: Record<PartnerStatus, string> = {
  en_attente: "En attente",
  verification: "En cours de vérification",
  approuvee: "Approuvée",
  refusee: "Refusée",
};

function PartnerQueue() {
  const tr = useTr();
  const [data, setData] = useState<PartnerList | null>(null);

  useEffect(() => {
    let active = true;
    listPartners()
      .then((next) => {
        if (active) setData(next);
      })
      .catch(() => {
        if (active) setData({ operational: false, authorized: false, missing: ["database"], requests: [] });
      });
    return () => {
      active = false;
    };
  }, []);

  if (!data?.authorized) return null;

  async function choose(id: string, status: PartnerStatus) {
    const result = await decidePartner({ data: { id, status } });
    if (!result.ok) return;
    setData((current) =>
      current
        ? {
            ...current,
            requests: current.requests.map((item) =>
              item.id === id ? { ...item, status, decidedAt: new Date().toISOString() } : item,
            ),
          }
        : current,
    );
  }

  return (
    <section className="grid gap-4">
      <h2 className="font-display text-2xl font-semibold">{tr("Candidatures partenaires")}</h2>
      {data.requests.length === 0 ? (
        <Panel>
          <p className="text-sm text-muted">{tr("Aucune candidature partenaire enregistrée.")}</p>
        </Panel>
      ) : (
        <ul className="grid gap-4">
          {data.requests.map((item) => (
            <li key={item.id}>
              <Panel>
                <p className="text-sm font-semibold text-gold">{tr(partnerStatusLabel[item.status])}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold">{item.name}</h3>
                <p className="mt-2 text-sm text-muted">
                  {item.email} · {item.country} · {item.profile}
                </p>
                {item.whatsapp ? <p className="mt-1 text-sm text-muted">{item.whatsapp}</p> : null}
                {item.txRef ? <p className="mt-1 text-sm text-muted tabular-nums">{item.txRef}</p> : null}
                {item.message ? <p className="mt-3 text-sm">{item.message}</p> : null}
                <p className="mt-3 text-sm text-faint tabular-nums">{item.id}</p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  {(Object.keys(partnerStatusLabel) as PartnerStatus[]).map((status) => (
                    <button
                      key={status}
                      type="button"
                      className="min-h-12 rounded-full border border-line px-4 text-sm font-semibold"
                      onClick={() => choose(item.id, status)}
                    >
                      {tr(partnerStatusLabel[status])}
                    </button>
                  ))}
                </div>
              </Panel>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
