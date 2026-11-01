import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ChevronRight, FileText, Sparkles, Store } from "lucide-react";
import { pageMeta, site } from "@/content/site";
import { SiteShell } from "@/components/site/shell";
import { ExternalLink, Panel } from "@/components/site/ui";
import { PromotionClock } from "@/components/site/promotion";
import { CountrySelect } from "@/components/site/country-select";
import { findCountry } from "@/lib/countries";
import { useTr } from "@/lib/locale";
import {
  lookupPartner,
  submitPartner,
  submitShop,
  type PartnerLookup,
  type PartnerSubmitResult,
  type ShopSubmitResult,
} from "@/lib/partner";

export const Route = createFileRoute("/partenaires")({
  head: () =>
    pageMeta(
      "Devenez partenaire de WIKENVA",
      "Contribuez sur SidraStart, puis envoyez une demande.",
    ),
  component: PartnersPage,
});

const statusCopy = {
  en_attente: "En attente. La candidature est reçue. Elle n'est pas approuvée.",
  verification: "En vérification. Aucun partenariat n'est encore confirmé.",
  approuvee: "Approuvée par un CEO autorisé. Cela ne confirme pas un versement ni un rendement.",
  refusee: "Refusée. La candidature n'a pas été retenue.",
} as const;

function PartnersPage() {
  const tr = useTr();
  const advantages = [
    [FileText, "Articles gratuits"],
    [Store, "Boutique gratuite"],
    [Sparkles, "Accès Premium"],
  ] as const;
  const facts = [
    ["SidraStart", "Contribuer"],
    ["Demande", "Sur cette page"],
    ["Minimum", "Aucun"],
    ["Zakat", "3 %"],
    ["Fin", "24 décembre 2026"],
  ] as const;
  return (
    <SiteShell>
      <section className="border-b border-line">
        <div className="mx-auto w-full max-w-3xl px-5 py-10 md:px-8">
          <p className="text-xs font-semibold tracking-[0.22em] text-gold uppercase">{tr("Partenariat")}</p>
          <h1 className="mt-2 font-display text-3xl font-semibold">{tr("Devenir partenaire")}</h1>
          <p className="mt-4 rounded-2xl border border-line bg-panel px-4 py-4 text-sm leading-relaxed">
            {tr("Contribuez sur SidraStart, puis envoyez une demande.")}
          </p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-line">
            <p className="bg-gold px-4 py-3 text-sm font-semibold tracking-wide text-ink uppercase">{tr("À retenir")}</p>
            <dl>
              {facts.map(([label, value]) => (
                <div key={label} className="grid grid-cols-2 gap-3 border-t border-line px-4 py-3 text-sm">
                  <dt className="text-muted">{tr(label)}</dt>
                  <dd className="text-right font-semibold">{tr(value)}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {advantages.map(([Icon, label]) => (
              <article key={label} className="rounded-2xl border border-line bg-panel px-4 py-4 text-sm font-semibold">
                <Icon className="mb-2 size-5 text-gold" aria-hidden />
                {tr(label)}
              </article>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <ExternalLink href={site.investUrl ?? ""} className="w-full">
              SidraStart
            </ExternalLink>
            <a href="#candidature" className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-5 text-sm font-semibold text-ink">
              {tr("Envoyer la demande")}
            </a>
          </div>
        </div>
      </section>
      <div className="mx-auto grid w-full min-w-0 max-w-3xl gap-8 px-5 py-8 md:px-8">
        <PromotionClock />
        <PartnerForm />
        <PartnerLookupPanel />
        <Faq />
      </div>
    </SiteShell>
  );
}

function PartnerForm() {
  const tr = useTr();
  const [values, setValues] = useState({
    name: "",
    email: "",
    country: "",
    txRef: "",
    consent: false,
  });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<PartnerSubmitResult | null>(null);

  function set<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function chooseResidence(iso: string) {
    set("country", iso);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setResult(null);
    if (values.name.trim().length < 2) return setError(tr("Indiquez votre nom complet."));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) return setError(tr("Indiquez un email valide."));
    const residence = findCountry(values.country);
    if (!residence) return setError(tr("Sélectionnez votre pays de résidence."));
    const hash = values.txRef.trim();
    if (hash.length < 8 || /\s/.test(hash)) return setError(tr("Indiquez le hash de transaction."));
    if (!values.consent) return setError(tr("Cochez la case pour envoyer."));
    setPending(true);
    try {
      const next = await submitPartner({
        data: {
          name: values.name,
          email: values.email,
          country: `${residence.name} (${residence.iso})`,
          whatsapp: "",
          profile: "entrepreneur",
          txRef: values.txRef,
          message: "",
          consentTerms: true,
          consentPrivacy: true,
        },
      });
      if (next.error === "hash") {
        setError(tr("Ce hash de transaction a déjà été utilisé."));
        return;
      }
      setResult(next);
      if (next.error === "proof") setError(tr("Indiquez le hash de transaction."));
    } finally {
      setPending(false);
    }
  }

  return (
    <section id="candidature" className="scroll-mt-24">
      <Panel>
        <h2 className="font-display text-2xl font-semibold">{tr("Envoyer la demande")}</h2>
        <p className="mt-2 text-sm text-muted">{tr("Nom, e-mail, pays et le hash de transaction. Jamais de clé privée.")}</p>
        <form className="mt-5 grid gap-4" onSubmit={onSubmit} noValidate>
          <Field id="partner-name" label={tr("Nom complet")} value={values.name} onChange={(value) => set("name", value)} />
          <Field id="partner-email" label={tr("Adresse e-mail")} type="email" value={values.email} onChange={(value) => set("email", value)} />
          <CountrySelect id="partner-country" label={tr("Pays")} value={values.country} onChange={chooseResidence} />
          <Field
            id="partner-tx"
            label={tr("Hash de transaction")}
            value={values.txRef}
            onChange={(value) => set("txRef", value)}
          />
          <p className="-mt-2 text-xs leading-relaxed text-gold">
            {tr("N'envoyez jamais votre clé privée ni votre phrase de récupération.")}
          </p>
          <Check
            checked={values.consent}
            onChange={(value) => set("consent", value)}
            label={tr("J'accepte que les administrateurs lisent ces informations.")}
          />
          <button type="submit" disabled={pending} className="min-h-12 rounded-full bg-gold px-5 text-sm font-semibold text-ink">
            {pending ? tr("Chargement…") : tr("Envoyer")}
          </button>
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          {result ? <PartnerResult result={result} /> : null}
        </form>
      </Panel>
    </section>
  );
}

function PartnerResult({ result }: { result: PartnerSubmitResult }) {
  const tr = useTr();
  const [copied, setCopied] = useState(false);
  if (!result.recorded || !result.id) {
    return (
      <p className="text-sm text-muted" role="status">
        {tr("Demande non enregistrée. Aucune notification n'a été envoyée.")}{" "}
        {result.missing.length > 0 ? tr("La réception n'est pas encore opérationnelle.") : null}
      </p>
    );
  }
  return (
    <div className="text-sm" role="status">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 rounded-2xl border border-gold/55 bg-gold/10 px-4 py-3"
        onClick={() => {
          void navigator.clipboard.writeText(result.id ?? "").then(() => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
          });
        }}
      >
        <span className="font-display text-lg font-semibold tracking-[0.16em] text-gold">{result.id}</span>
        <span className="shrink-0 text-xs font-semibold tracking-wide text-gold uppercase">{copied ? tr("Copié.") : tr("Copier")}</span>
      </button>
      <p className="mt-2 text-gold">
        {result.duplicate ? tr("Déjà soumis.") : tr("Copiez cette référence pour suivre votre demande.")}
      </p>
      <p className="mt-1 text-muted">
        {result.duplicate
          ? tr(result.status === "approuvee" ? "Approuvée." : result.status === "refusee" ? "Refusée." : result.status === "verification" ? "En vérification." : "En attente.")
          : result.notified
            ? tr("En attente. E-mail après la décision.")
            : tr("Enregistrée. E-mail non envoyé.")}
      </p>
    </div>
  );
}

function PartnerLookupPanel() {
  const tr = useTr();
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<PartnerLookup | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    try {
      setResult(await lookupPartner({ data: { id, email } }));
    } finally {
      setPending(false);
    }
  }

  return (
    <Panel>
      <h2 className="font-display text-2xl font-semibold">{tr("Suivre ma candidature")}</h2>
      <p className="mt-3 text-sm text-muted">
        {tr("Référence et e-mail pour voir le statut.")}
      </p>
      <form className="mt-5 grid gap-4" onSubmit={onSubmit}>
        <Field id="lookup-id" label={tr("Référence")} value={id} onChange={setId} />
        <Field id="lookup-email" label={tr("Adresse e-mail")} type="email" value={email} onChange={setEmail} />
        <button type="submit" disabled={pending} className="min-h-12 rounded-full border border-line px-5 text-sm font-semibold">
          {pending ? tr("Chargement…") : tr("Voir le statut")}
        </button>
      </form>
      {result?.unavailable ? <p className="mt-4 text-sm text-muted">{tr("Le suivi n'est pas disponible.")}</p> : null}
      {result && !result.unavailable && !result.found ? <p className="mt-4 text-sm text-muted">{tr("Aucune candidature ne correspond.")}</p> : null}
      {result?.found && result.status === "approuvee" ? (
        <>
          <ApprovedMark />
          <PartnerSpace partnerId={id} email={email} />
        </>
      ) : null}
      {result?.found && result.status && result.status !== "approuvee" ? (
        <p className="mt-4 text-sm font-semibold text-gold">{tr(statusCopy[result.status])}</p>
      ) : null}
      {result?.found && result.status !== "approuvee" ? (
        <p className="mt-3 text-sm text-muted">
          {tr("Premium et boutique : partenaire approuvé seulement.")}
        </p>
      ) : null}
    </Panel>
  );
}

function PartnerSpace({ partnerId, email }: { partnerId: string; email: string }) {
  const tr = useTr();
  const [shopName, setShopName] = useState("");
  const [description, setDescription] = useState("");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<ShopSubmitResult | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    try {
      setResult(await submitShop({ data: { partnerId, email, shopName, description } }));
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mt-6 grid gap-4">
      <div>
        <h3 className="font-display text-xl font-semibold">{tr("Espace partenaire")}</h3>
        <p className="mt-2 text-sm text-muted">
          {tr("Fonctions premium : annonces réservées, demande de boutique et suivi du statut. La vente n'est pas ouverte.")}
        </p>
      </div>
      <form className="grid gap-4" onSubmit={onSubmit}>
        <h3 className="font-semibold">{tr("Demander l'ouverture d'une boutique")}</h3>
        <p className="text-sm text-muted">
          {tr("Boutique fermée tant qu'un CEO ne l'a pas approuvée.")}
        </p>
        <Field id="shop-name" label={tr("Nom de la boutique")} value={shopName} onChange={setShopName} />
        <label className="grid gap-2 text-sm font-semibold" htmlFor="shop-description">
          {tr("Description des articles")}
          <textarea
            id="shop-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="min-h-28 rounded-2xl border border-line bg-ink px-3 py-3 font-normal"
          />
        </label>
        <button type="submit" disabled={pending} className="min-h-12 rounded-2xl bg-gold px-5 text-sm font-semibold text-ink">
          {pending ? tr("Chargement…") : tr("Envoyer la demande de boutique")}
        </button>
        {result?.recorded ? (
          <p className="text-sm text-muted">
            {tr("La demande de boutique est enregistrée. Elle n'ouvre pas la boutique.")} {result.id}
          </p>
        ) : null}
        {result && !result.recorded && result.error === "closed" ? (
          <p className="text-sm text-muted">{tr("Une boutique est déjà en cours pour ce partenaire.")}</p>
        ) : null}
        {result && !result.recorded && result.error === "match" ? (
          <p className="text-sm text-muted">{tr("Seule une candidature approuvée peut demander une boutique.")}</p>
        ) : null}
        {result && !result.recorded && (result.error === "name" || result.error === "description") ? (
          <p className="text-sm text-muted">{tr("Indiquez un nom et une description d'au moins 10 caractères.")}</p>
        ) : null}
      </form>
    </div>
  );
}

function ApprovedMark() {
  return (
    <div className="mt-5 flex justify-center">
      <p
        className="rounded-full bg-green-500/15 px-6 py-3 text-center text-2xl font-bold tracking-wide text-green-400 shadow-[0_0_28px_rgba(74,222,128,0.55)]"
        style={{ animation: "wikenva-float 2.4s ease-in-out infinite" }}
      >
        APPROUVE🎉
      </p>
      <style>{`@keyframes wikenva-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}</style>
    </div>
  );
}

function Faq() {
  const tr = useTr();
  const items = [
    ["Y a-t-il un montant minimum ?", "Non."],
    ["Comment contribuer ?", "Sur SidraStart."],
    ["Comment devenir partenaire ?", "SidraStart, puis la demande."],
    ["Qui vérifie ?", "Un CEO."],
    ["Après le 24 décembre 2026 ?", "Les conditions pourront changer."],
    ["Mes données ?", "Réservées aux administrateurs."],
    ["Y a-t-il un risque ?", "Oui. La valeur peut tomber à zéro."],
  ] as const;
  return (
    <section>
      <h2 className="text-lg font-semibold">{tr("Questions fréquentes")}</h2>
      <div className="mt-2 border-t border-line">
        {items.map(([question, answer]) => (
          <details key={question} className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-center gap-2 py-2.5 text-sm font-semibold [&::-webkit-details-marker]:hidden">
              <ChevronRight className="size-3.5 shrink-0 text-gold transition-transform group-open:rotate-90" aria-hidden />
              {tr(question)}
            </summary>
            <p className="pb-2.5 pl-6 text-sm leading-relaxed text-muted">{tr(answer)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = true,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  hint?: string;
}) {
  const tr = useTr();
  return (
    <label className="grid gap-2 text-sm font-semibold" htmlFor={id}>
      {tr(label)}
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 rounded-full border border-line bg-ink px-4 font-normal"
      />
      {hint ? <span className="font-normal text-muted">{tr(hint)}</span> : null}
    </label>
  );
}

function Check({ checked, onChange, label }: { checked: boolean; onChange: (value: boolean) => void; label: string }) {
  const tr = useTr();
  return (
    <label className="flex items-start gap-3 text-sm">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="mt-1 size-5 accent-gold" />
      <span>{tr(label)}</span>
    </label>
  );
}
