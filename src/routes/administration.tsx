import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { pageMeta } from "@/content/site";
import { decideApplication, listCaptures, listInterests, type CaptureRow, type InterestList } from "@/lib/interest";
import { decidePartner, decideShop, listPartners, listShops, type PartnerList, type PartnerStatus, type ShopList } from "@/lib/partner";
import { confirmAdminCode, requestAdminCode } from "@/lib/admin-login";
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

function AdminPage() {
  const tr = useTr();
  const [data, setData] = useState<InterestList | null>(null);
  const [captures, setCaptures] = useState<CaptureRow[]>([]);

  useEffect(() => {
    let active = true;
    listInterests()
      .then((next) => {
        if (!active) return;
        setData(next);
        if (!next.authorized) return;
        listCaptures()
          .then((result) => {
            if (active) setCaptures(result.captures);
          })
          .catch(() => {
            if (active) setCaptures([]);
          });
      })
      .catch(() => {
        if (active) setData({ operational: true, authorized: true, missing: [], requests: [] });
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
        lede="Réservé aux CEO autorisés. Aucun exemple."
      />
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-5 py-8 md:px-8">
        {!data ? (
          <p className="text-muted">{tr("Chargement…")}</p>
        ) : !data.operational ? null : !data.authorized ? (
          <AdminCodeForm />
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
        <ShopQueue />
        {data?.authorized ? <ShareholderQueue requests={data.requests.filter((item) => item.kind === "actionnaire")} /> : null}
      </div>
    </SiteShell>
  );
}

function AdminCodeForm() {
  const tr = useTr();
  const [email, setEmail] = useState("adjibodoufelix7@gmail.com");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function sendCode() {
    setPending(true);
    setMessage("");
    try {
      const result = await requestAdminCode({ data: { email } });
      if (result.sent) {
        setSent(true);
        setMessage(tr("Code envoyé. Ouvrez adjibodoufelix7@gmail.com, pas l'autre adresse."));
        return;
      }
      setMessage(tr(result.error === "denied" ? "Cet e-mail n'est pas autorisé." : "Le code n'a pas pu être envoyé. Réessayez."));
    } catch {
      setMessage(tr("Le code n'a pas pu être envoyé. Réessayez."));
    } finally {
      setPending(false);
    }
  }

  async function enter() {
    setPending(true);
    const result = await confirmAdminCode({ data: { email, code } });
    setPending(false);
    if (!result.ok) {
      setMessage(tr("Code incorrect."));
      return;
    }
    window.location.reload();
  }

  return (
    <Panel>
      <h2 className="font-display text-2xl font-semibold">{tr("Accès réservé")}</h2>
      <p className="mt-3 text-sm text-muted">{tr("Un code est envoyé au Gmail administrateur. Google n'est pas nécessaire.")}</p>
      <label className="mt-5 block text-sm font-semibold" htmlFor="admin-email">
        {tr("Adresse e-mail")}
      </label>
      <input
        id="admin-email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="mt-2 min-h-12 w-full rounded-full border border-line bg-ink px-4"
      />
      {sent ? (
        <>
          <label className="mt-4 block text-sm font-semibold" htmlFor="admin-code">
            {tr("Code reçu")}
          </label>
          <input
            id="admin-code"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            className="mt-2 min-h-12 w-full rounded-full border border-line bg-ink px-4 tracking-[0.3em]"
          />
          <button type="button" disabled={pending} onClick={enter} className="mt-4 min-h-12 w-full rounded-full bg-gold px-5 text-sm font-semibold text-ink">
            {pending ? tr("Chargement…") : tr("Entrer")}
          </button>
        </>
      ) : (
        <button type="button" disabled={pending} onClick={sendCode} className="mt-4 min-h-12 w-full rounded-full bg-gold px-5 text-sm font-semibold text-ink">
          {pending ? tr("Chargement…") : tr("Recevoir le code")}
        </button>
      )}
      {message ? <p className="mt-3 text-sm text-gold">{message}</p> : null}
    </Panel>
  );
}

const partnerStatusLabel: Record<PartnerStatus, string> = {
  en_attente: "En attente",
  verification: "En vérification",
  approuvee: "Partenaire validé",
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

  const validated = data.requests.filter((item) => item.status === "approuvee");

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
                <p className="mt-2 break-all text-sm text-muted">
                  {item.email} · {item.country}
                </p>
                {item.txRef ? (
                  <p className="mt-1 break-all text-sm text-muted">
                    {tr("Hash de transaction")} : {item.txRef.replace(/^\.+/, "")}
                  </p>
                ) : null}
                <p className="mt-3 text-sm text-faint tabular-nums">{item.id}</p>
                <button
                  type="button"
                  className={`mt-4 min-h-12 w-full rounded-full px-4 text-sm font-semibold ${item.status === "approuvee" ? "bg-gold text-ink" : "border border-gold text-gold"}`}
                  onClick={() => choose(item.id, "approuvee")}
                >
                  {item.status === "approuvee" ? tr("Partenaire validé") : tr("Valider")}
                </button>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button type="button" className="min-h-11 rounded-full border border-line px-3 text-sm" onClick={() => choose(item.id, "verification")}>
                    {tr("En vérification")}
                  </button>
                  <button type="button" className="min-h-11 rounded-full border border-line px-3 text-sm" onClick={() => choose(item.id, "refusee")}>
                    {tr("Refusée")}
                  </button>
                </div>
              </Panel>
            </li>
          ))}
        </ul>
      )}
      <Panel>
        <h2 className="font-display text-2xl font-semibold">{tr("Partenaires validés")}</h2>
        {validated.length === 0 ? (
          <p className="mt-3 text-sm text-muted">{tr("Aucun partenaire validé.")}</p>
        ) : (
          <table className="mt-4 w-full text-left text-sm">
            <thead>
              <tr className="text-faint">
                <th className="pb-2 font-medium">{tr("Nom")}</th>
                <th className="pb-2 font-medium">{tr("Gmail")}</th>
              </tr>
            </thead>
            <tbody>
              {validated.map((item) => (
                <tr key={item.id} className="border-t border-line">
                  <td className="py-3 pr-3">{item.name}</td>
                  <td className="py-3 break-all">{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Panel>
    </section>
  );
}

function ShopQueue() {
  const tr = useTr();
  const [data, setData] = useState<ShopList | null>(null);

  useEffect(() => {
    let active = true;
    listShops()
      .then((next) => {
        if (active) setData(next);
      })
      .catch(() => {
        if (active) setData({ operational: false, authorized: false, shops: [] });
      });
    return () => {
      active = false;
    };
  }, []);

  async function choose(id: string, status: PartnerStatus) {
    const result = await decideShop({ data: { id, status } });
    if (!result.ok) return;
    setData((current) =>
      current
        ? { ...current, shops: current.shops.map((item) => (item.id === id ? { ...item, status } : item)) }
        : current,
    );
  }

  if (!data?.authorized) return null;

  return (
    <section className="grid gap-4">
      <h2 className="font-display text-2xl font-semibold">{tr("Demandes de boutique")}</h2>
      {data.shops.length === 0 ? (
        <Panel>
          <p className="text-sm text-muted">{tr("Aucune demande de boutique.")}</p>
        </Panel>
      ) : (
        <ul className="grid gap-4">
          {data.shops.map((item) => (
            <li key={item.id}>
              <Panel>
                <p className="text-sm font-semibold text-gold">{tr(partnerStatusLabel[item.status])}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold">{item.shopName}</h3>
                <p className="mt-2 text-sm text-muted">{item.email} · {item.partnerId}</p>
                <p className="mt-3 text-sm">{item.description}</p>
                <p className="mt-3 text-sm text-faint tabular-nums">{item.id}</p>
                <div className="mt-4 grid gap-2">
                  {(Object.keys(partnerStatusLabel) as PartnerStatus[]).map((status) => (
                    <button
                      key={status}
                      type="button"
                      className={`min-h-12 w-full rounded-full px-4 text-sm font-semibold ${item.status === status ? "bg-gold text-ink" : "border border-line"}`}
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

function ShareholderQueue({
  requests,
}: {
  requests: Array<{ id: string; name: string | null; email: string; amount: string | null; status: string }>;
}) {
  const tr = useTr();
  const [rows, setRows] = useState(requests);

  async function choose(id: string, decision: "approuvee" | "refusee") {
    const result = await decideApplication({ data: { id, decision } });
    if (!result.ok) return;
    setRows((current) => current.map((item) => (item.id === id ? { ...item, status: decision } : item)));
  }

  return (
    <section className="grid gap-4">
      <h2 className="font-display text-2xl font-semibold">{tr("Candidatures actionnaires")}</h2>
      <p className="text-sm text-muted">
        {tr("Aucun revenu n'est affiché. Une approbation ne confirme pas un versement.")}
      </p>
      {rows.length === 0 ? (
        <Panel>
          <p className="text-sm text-muted">{tr("Aucune candidature actionnaire.")}</p>
        </Panel>
      ) : (
        <ul className="grid gap-4">
          {rows.map((item) => (
            <li key={item.id}>
              <Panel>
                <p className="text-sm font-semibold text-gold">{item.status}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold">{item.name || tr("Nom non fourni")}</h3>
                <p className="mt-2 text-sm text-muted">{item.email}{item.amount ? ` · ${item.amount}` : ""}</p>
                <p className="mt-3 text-sm text-faint tabular-nums">{item.id}</p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <button type="button" className="min-h-12 rounded-2xl border border-line px-4 text-sm font-semibold" onClick={() => choose(item.id, "approuvee")}>
                    {tr("Approuvée")}
                  </button>
                  <button type="button" className="min-h-12 rounded-2xl border border-line px-4 text-sm font-semibold" onClick={() => choose(item.id, "refusee")}>
                    {tr("Refusée")}
                  </button>
                </div>
              </Panel>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
