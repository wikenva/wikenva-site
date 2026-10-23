import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ChevronRight, Compass, Megaphone, ShieldCheck, Wallet } from "lucide-react";
import { narrative, pageMeta, site } from "@/content/site";
import { SiteShell } from "@/components/site/shell";
import { ExternalLink, PageHero, Panel } from "@/components/site/ui";
import { PathBoard, HSlide } from "@/components/site/paths";
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
      "Participez au développement de l'économie numérique au sein de l'écosystème SidraChain. Minimum promotionnel : 2 000 SDA sur SidraStart.",
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
  return (
    <SiteShell>
      <PageHero
        eyebrow="Partenaires"
        title="Devenez partenaire de WIKENVA."
        lede="Le minimum est de 2 000 SDA sur SidraStart. La demande est vérifiée."
      />
      <div className="mx-auto grid w-full min-w-0 max-w-6xl grid-cols-1 gap-8 px-5 py-8 md:px-8">
        <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row">
          <a href="#candidature" className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-gold px-5 text-sm font-semibold text-ink sm:flex-1">
            {tr("Devenir partenaire")}
          </a>
          <a href="#programme" className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-line px-5 text-sm font-semibold sm:flex-1">
            {tr("Comprendre le programme")}
          </a>
        </div>

        <HSlide auto={false} label={tr("Vision")}>
          <Panel>
            <h2 className="font-display text-xl font-semibold">{tr("Vision")}</h2>
            <p className="mt-3 text-sm text-muted">{tr(narrative.vision[0])}</p>
          </Panel>
          <Panel>
            <h2 className="font-display text-xl font-semibold">{tr("Mission")}</h2>
            <p className="mt-3 text-sm text-muted">{tr(narrative.mission[0])}</p>
          </Panel>
          <Panel>
            <h2 className="font-display text-xl font-semibold">{tr("Objectif")}</h2>
            <p className="mt-3 text-sm text-muted">{tr(narrative.vision[2])}</p>
          </Panel>
        </HSlide>

        <Panel className="border-gold/50">
          <p className="text-sm font-semibold text-gold">{tr("Partenaires")}</p>
          <p className="mt-1 text-sm text-muted">{tr("La demande se fait ici. L'investissement se fait sur SidraStart.")}</p>
        </Panel>

        <PathBoard here="partner" auto={false} />

        <Panel className="border-gold/50">
          <p className="text-sm font-semibold tracking-widest text-gold uppercase">{tr("Partenaires")}</p>
          <p className="mt-2 font-display text-4xl font-semibold">2 000 SDA</p>
          <ul className="mt-4 grid gap-2">
            {[
              "Publication gratuite des articles",
              "Boutique en ligne gratuite",
              "Fonctions Premium",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm font-semibold">
                <span className="text-gold" aria-hidden>✓</span>
                {tr(item)}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">{tr("L'investissement se fait sur SidraStart. La demande est vérifiée, et aucun rendement n'est promis.")}</p>
          <p className="mt-1 text-sm text-muted">{tr("15 % des revenus sont prévus pour le partenariat, et 3 % pour la zakat.")}</p>
          <ExternalLink href={site.investUrl ?? ""} variant="gold" className="mt-5 w-full sm:w-auto">
            {tr("Investir sur SidraStart")}
          </ExternalLink>
        </Panel>

        <section id="programme" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-semibold">{tr("Le parcours")}</h2>
          <HSlide auto={false} className="mt-4" label={tr("Le parcours")}>
            <Step icon={Compass} index="1" title="Lire les conditions." text="Cette page explique la promotion. Elle ne valide aucune demande." />
            <Step icon={Megaphone} index="2" title="Ouvrir SidraStart." text="La fiche s'appelle Digital Marketplace Ebook." />
            <Step icon={Wallet} index="3" title="Investir 2 000 SDA." text="Depuis votre compte, jusqu'au 30 novembre 2026." />
            <Step icon={ShieldCheck} index="4" title="Envoyer la demande." text="Indiquez votre nom et votre e-mail. Ne donnez jamais une clé privée." />
            <Step icon={ShieldCheck} index="5" title="Attendre la confirmation." text="Un CEO décide. Rien n'est accordé automatiquement." />
          </HSlide>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold">{tr("L'affiche des avantages")}</h2>
          <img
            src="/media/wikenva-avantages-partenaires.png"
            alt={tr("Affiche des avantages prévus pour les partenaires WIKENVA à 2 000 SDA")}
            width={1080}
            height={1080}
            className="mt-4 w-full max-w-sm rounded-2xl border border-line"
          />
        </section>

        <PromotionClock />

        <section>
          <h2 className="font-display text-2xl font-semibold">{tr("À savoir")}</h2>
          <ul className="mt-3 grid gap-2 text-sm text-muted">
            <li>{tr("WIKENVA est une marketplace d'ebooks licites.")}</li>
            <li>{tr("3 % des revenus sont destinés à la zakat.")}</li>
            <li>{tr("Aucun rendement n'est garanti.")}</li>
            <li>{tr("Aucune certification charia n'est publiée ici.")}</li>
          </ul>
        </section>

        <PartnerForm />
        <PartnerLookupPanel />
        <Faq />
      </div>
    </SiteShell>
  );
}

function Step({
  icon: Icon,
  index,
  title,
  text,
}: {
  icon: typeof Compass;
  index: string;
  title: string;
  text: string;
}) {
  const tr = useTr();
  return (
    <article className="rounded-3xl border border-line bg-panel p-5">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-full bg-ink text-gold">
          <Icon aria-hidden className="size-5" />
        </span>
        <span className="text-sm font-semibold text-gold">{index}</span>
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold">{tr(title)}</h3>
      <p className="mt-2 text-sm text-muted">{tr(text)}</p>
    </article>
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
    ["Minimum pour être partenaire ?", "2 000 SDA sur SidraStart. Cela ne valide pas la demande."],
    ["Comment investir ?", "Ouvrez la fiche SidraStart, puis suivez les étapes là-bas."],
    ["Le bonus ?", "15 % prévus. Pas un rendement. Rien n'est versé ici."],
    ["Qui vérifie ?", "Un CEO. Le départ est « en attente »."],
    ["Après le 30 novembre 2026 ?", "Les conditions pourront changer. Rien n'est encore défini."],
    ["Mes données ?", "Réservées aux administrateurs. Le public ne voit que le statut."],
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
