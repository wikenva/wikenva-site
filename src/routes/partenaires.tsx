import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Compass, Megaphone, ShieldCheck, Wallet } from "lucide-react";
import { narrative, pageMeta, site } from "@/content/site";
import { SiteShell } from "@/components/site/shell";
import { ExternalLink, PageHero, Panel } from "@/components/site/ui";
import { PathBoard, HSlide } from "@/components/site/paths";
import { PromotionClock } from "@/components/site/promotion";
import { CountrySelect } from "@/components/site/country-select";
import { findCountry, toInternational } from "@/lib/countries";
import { useTr } from "@/lib/locale";
import {
  lookupPartner,
  partnerProfiles,
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

const profiles = {
  entrepreneur: "Entrepreneur",
  createur: "Créateur numérique",
  commercial: "Partenaire commercial",
  technique: "Partenaire technique",
  autre: "Autre",
} as const;

const statusCopy = {
  en_attente: "En attente. La candidature est reçue. Elle n'est pas approuvée.",
  verification: "En cours de vérification. Aucun partenariat n'est encore confirmé.",
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
        lede="Participez au développement de l'économie numérique au sein de l'écosystème SidraChain."
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
          <p className="text-sm font-semibold text-gold">{tr("Vous êtes sur le parcours partenaire")}</p>
          <p className="mt-2 text-muted">
            {tr("Ce formulaire demande le statut de partenaire. Il ne remplace pas l'investissement sur SidraStart et il ne crée pas le statut d'actionnaire.")}
          </p>
        </Panel>

        <PathBoard here="partner" auto={false} />

        <Panel className="border-gold/50">
          <p className="text-sm font-semibold tracking-widest text-gold uppercase">{tr("Seuil actuel")}</p>
          <p className="mt-2 font-display text-4xl font-semibold">2 000 SDA</p>
          <p className="mt-3 text-muted">
            {tr("Minimum de 2 000 SDA sur SidraStart pour devenir partenaire. 15 % des revenus de la plateforme sont prévus pour le programme de partenariat, selon les conditions de rémunération définies par la plateforme. 3 % des revenus sont destinés à la zakat, dans le respect des principes de la charia et avec une gestion transparente. Ce seuil ne confirme pas un partenariat et ne promet aucun rendement.")}
          </p>
          <ExternalLink href={site.investUrl ?? ""} variant="gold" className="mt-5 w-full sm:w-auto">
            {tr("Investir sur SidraStart")}
          </ExternalLink>
        </Panel>

        <section id="programme" className="scroll-mt-24">
          <h2 className="font-display text-3xl font-semibold">{tr("Comment fonctionne le partenariat ?")}</h2>
          <HSlide auto={false} className="mt-5" label={tr("Comment fonctionne le partenariat ?")}>
            <Step icon={Compass} index="1" title="Lire les conditions de partenariat." text="Cette page décrit la promotion en cours. Elle ne valide aucune candidature." />
            <Step icon={Megaphone} index="2" title="Ouvrir la fiche officielle sur SidraStart." text="Le projet s'appelle Digital Marketplace Ebook. Les conditions de contribution sont celles publiées là-bas." />
            <Step icon={Wallet} index="3" title="Investir depuis son propre compte." text="Minimum de 2 000 SDA pendant la promotion, qui se termine le 30 novembre 2026. L'investissement ne se fait pas sur ce site." />
            <Step icon={ShieldCheck} index="4" title="Fournir les informations de vérification." text="Le formulaire demande un nom, un e-mail et, si vous le souhaitez, une référence publique de transaction. N'envoyez jamais une clé privée ou un mot de passe." />
            <Step icon={ShieldCheck} index="5" title="Attendre la confirmation du statut." text="La demande part en attente. Seule une décision d'un administrateur autorisé confirme le partenariat. Après le 30 novembre 2026, les conditions pourront changer et ne sont pas encore définies." />
          </HSlide>
        </section>

        <section>
          <h2 className="font-display text-3xl font-semibold">{tr("Avantages du partenariat")}</h2>
          <HSlide auto={false} className="mt-5" label={tr("Avantages du partenariat")}>
            <Panel>
              <h3 className="font-semibold">{tr("Participer au développement")}</h3>
              <p className="mt-2 text-sm text-muted">{tr("Une candidature exprime l'intérêt de participer au développement de WIKENVA. Elle ne crée aucun droit.")}</p>
            </Panel>
            <Panel>
              <h3 className="font-semibold">{tr("Campagne SidraStart")}</h3>
              <p className="mt-2 text-sm text-muted">{tr("Les avantages liés à la contribution sont ceux écrits sur la campagne officielle. Ce site ne les recopie pas et n'en ajoute aucun.")}</p>
            </Panel>
            <Panel>
              <h3 className="font-semibold">{tr("Communications officielles")}</h3>
              <p className="mt-2 text-sm text-muted">{tr("Les annonces confirmées sont publiées sur le site et sur les canaux officiels de la communauté.")}</p>
            </Panel>
            <Panel>
              <h3 className="font-semibold">{tr("Bonus de partenariat")}</h3>
              <p className="mt-2 text-sm text-muted">
                {tr("15 % des revenus de la plateforme sont prévus pour le programme de partenariat, selon les conditions de rémunération définies par la plateforme. Cette part n'est pas un rendement garanti et aucun versement n'est simulé ici.")}
              </p>
            </Panel>
          </HSlide>
        </section>

        <Panel>
          <PromotionClock />
        </Panel>

        <section>
          <h2 className="font-display text-3xl font-semibold">{tr("Transparence et éthique")}</h2>
          <ul className="mt-4 grid gap-3 text-muted">
            <li>{tr("L'usage précis des contributions sera publié lorsqu'il sera officiel. Il n'est pas détaillé sur cette page.")}</li>
            <li>{tr("Les conditions doivent rester compréhensibles. Celles qui manquent sont indiquées comme non publiées.")}</li>
            <li>{tr("WIKENVA se présente comme une marketplace d'ebooks et d'activités numériques licites.")}</li>
            <li>{tr("3 % des revenus sont destinés à la zakat, dans le respect des principes de la charia et avec une gestion transparente.")}</li>
            <li>{tr("Les crypto-actifs peuvent perdre toute leur valeur. Aucun rendement n'est garanti.")}</li>
            <li>{tr("Les modalités financières doivent être vérifiées par une personne compétente en finance islamique. Ce site ne présente pas de certification de conformité à la charia.")}</li>
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
    phoneCountry: "",
    phoneCountryChosen: false,
    nationalNumber: "",
    profile: "entrepreneur",
    txRef: "",
    message: "",
    consentTerms: false,
    consentPrivacy: false,
  });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<PartnerSubmitResult | null>(null);

  function set<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function chooseResidence(iso: string) {
    setValues((current) => ({
      ...current,
      country: iso,
      phoneCountry: !current.phoneCountryChosen && current.nationalNumber.trim() === "" ? iso : current.phoneCountry,
    }));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setResult(null);
    if (values.name.trim().length < 2) return setError(tr("Indiquez votre nom complet."));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) return setError(tr("Indiquez un email valide."));
    const residence = findCountry(values.country);
    if (!residence) return setError(tr("Sélectionnez votre pays de résidence."));
    let whatsapp = "";
    if (values.nationalNumber.trim()) {
      const phoneCountry = findCountry(values.phoneCountry);
      if (!phoneCountry) return setError(tr("Sélectionnez l'indicatif du numéro."));
      const formatted = toInternational(values.nationalNumber, phoneCountry.iso);
      if (!formatted) return setError(tr("Ce numéro n'est pas valide pour l'indicatif choisi. Il n'est pas vérifié comme un compte WhatsApp."));
      whatsapp = formatted;
    }
    if (values.message.trim().length < 10) return setError(tr("Le message doit contenir au moins 10 caractères."));
    if (!values.consentTerms || !values.consentPrivacy) return setError(tr("Les deux cases sont nécessaires."));
    setPending(true);
    try {
      const next = await submitPartner({
        data: {
          name: values.name,
          email: values.email,
          country: `${residence.name} (${residence.iso})`,
          whatsapp,
          profile: values.profile,
          txRef: values.txRef,
          message: values.message,
          consentTerms: values.consentTerms,
          consentPrivacy: values.consentPrivacy,
        },
      });
      setResult(next);
      if (next.error === "proof") setError(tr("N'envoyez pas de phrase secrète, de clé privée ou de mot de passe. Seul un identifiant public de transaction est accepté."));
      if (next.error === "phone") setError(tr("Ce numéro n'est pas valide pour l'indicatif choisi. Il n'est pas vérifié comme un compte WhatsApp."));
    } finally {
      setPending(false);
    }
  }

  const phoneCountry = findCountry(values.phoneCountry);

  return (
    <section id="candidature" className="scroll-mt-24">
      <Panel>
        <h2 className="font-display text-3xl font-semibold">{tr("Candidature")}</h2>
        <p className="mt-3 text-sm text-muted">
          {tr("La demande est enregistrée seulement lorsque la réception est opérationnelle. Ne communiquez jamais une phrase secrète, une clé privée ou un mot de passe de portefeuille.")}
        </p>
        <form className="mt-6 grid gap-4" onSubmit={onSubmit} noValidate>
          <Field id="partner-name" label={tr("Nom complet")} value={values.name} onChange={(value) => set("name", value)} />
          <Field id="partner-email" label={tr("Adresse e-mail")} type="email" value={values.email} onChange={(value) => set("email", value)} />
          <CountrySelect id="partner-country" label={tr("Pays de résidence")} value={values.country} onChange={chooseResidence} />
          <div className="grid gap-2">
            <CountrySelect
              id="partner-phone-country"
              label={tr("Indicatif du numéro")}
              value={values.phoneCountry}
              hint={tr("Facultatif. Ce choix ne confirme pas qu'un compte WhatsApp est actif.")}
              onChange={(iso) => setValues((current) => ({ ...current, phoneCountry: iso, phoneCountryChosen: true }))}
            />
            <label className="grid gap-2 text-sm font-semibold" htmlFor="partner-whatsapp">
              {tr("Numéro, sans répéter l'indicatif")}
              <span className="flex min-h-12 items-center rounded-full border border-line bg-ink">
                <span className="px-4 text-muted">{phoneCountry ? `+${phoneCountry.callingCode}` : "+"}</span>
                <input
                  id="partner-whatsapp"
                  inputMode="tel"
                  autoComplete="tel-national"
                  value={values.nationalNumber}
                  onChange={(event) => set("nationalNumber", event.target.value)}
                  className="min-h-12 w-full bg-transparent pr-4 font-normal outline-none"
                />
              </span>
            </label>
          </div>
          <label className="grid gap-2 text-sm font-semibold" htmlFor="partner-profile">
            {tr("Type de profil")}
            <select
              id="partner-profile"
              value={values.profile}
              onChange={(event) => set("profile", event.target.value)}
              className="min-h-12 rounded-full border border-line bg-ink px-4 font-normal"
            >
              {partnerProfiles.map((item) => (
                <option key={item} value={item}>
                  {tr(profiles[item])}
                </option>
              ))}
            </select>
          </label>
          <Field
            id="partner-tx"
            label={tr("Identifiant public de transaction, facultatif")}
            value={values.txRef}
            onChange={(value) => set("txRef", value)}
            required={false}
            hint={tr("Uniquement une référence publique. Jamais une phrase secrète ni une clé privée.")}
          />
          <label className="grid gap-2 text-sm font-semibold" htmlFor="partner-message">
            {tr("Message de présentation")}
            <textarea
              id="partner-message"
              value={values.message}
              onChange={(event) => set("message", event.target.value)}
              className="min-h-32 rounded-3xl border border-line bg-ink px-4 py-3 font-normal"
            />
          </label>
          <Check
            checked={values.consentTerms}
            onChange={(value) => set("consentTerms", value)}
            label={tr("J'accepte les conditions publiées du partenariat. Les éléments non publiés ne sont pas acceptés comme des droits.")}
          />
          <Check
            checked={values.consentPrivacy}
            onChange={(value) => set("consentPrivacy", value)}
            label={tr("J'accepte que mes coordonnées soient consultées par les administrateurs autorisés, conformément à la politique de confidentialité.")}
          />
          <button type="submit" disabled={pending} className="min-h-12 rounded-full bg-gold px-5 text-sm font-semibold text-ink">
            {pending ? tr("Chargement…") : tr("Envoyer la candidature")}
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
  if (!result.recorded) {
    return (
      <p className="text-sm text-muted" role="status">
        {tr("Demande non enregistrée. Aucune notification n'a été envoyée.")}{" "}
        {result.missing.length > 0 ? tr("La réception n'est pas encore opérationnelle.") : null}
      </p>
    );
  }
  return (
    <p className="text-sm" role="status">
      {tr("Candidature enregistrée.")} {tr("Référence")} <span className="tabular-nums">{result.id}</span>. {tr(statusCopy.en_attente)}{" "}
      {result.notified
        ? tr("Un avis a été envoyé, sans vos coordonnées.")
        : tr("Aucun e-mail ne vous a été envoyé. Le suivi se fait avec la référence et l'adresse e-mail.")}
    </p>
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
        {tr("La référence et l'e-mail utilisés à l'envoi affichent le statut réel. Une approbation ne confirme pas un versement.")}
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
          {tr("Les fonctions premium et la demande de boutique sont réservées à un partenaire approuvé. Le statut n'est pas accordé automatiquement, et ce site ne vérifie pas le paiement SDA.")}
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
          {tr("Présentez les articles que vous souhaitez proposer. La boutique n'est pas ouverte tant qu'un administrateur ne l'a pas approuvée. Aucun article n'est mis en vente ici.")}
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
    ["Quel est le minimum requis pour devenir partenaire pendant la promotion ?", "2 000 SDA, pour la campagne de promotion en cours sur SidraStart. Ce minimum ne valide pas la candidature WIKENVA."],
    ["Comment participer à la campagne WIKENVA sur SidraStart ?", "Ouvrez la fiche officielle du projet sur SidraStart depuis le bouton de cette page, puis suivez les étapes affichées là-bas."],
    ["Comment fonctionne le bonus de partenariat ?", "Il n'est pas publié ici. Le taux, le calcul, les conditions et la période ne sont pas confirmés. Aucun versement n'est simulé."],
    ["Comment ma candidature sera-t-elle vérifiée ?", "Un CEO autorisé peut la consulter, la passer en vérification, l'approuver ou la refuser. Le statut de départ est « en attente »."],
    ["Que se passera-t-il après la clôture de la promotion ?", "La promotion SidraStart se termine le 30 novembre 2026. Ensuite, les conditions pourront être révisées. Aucune nouvelle condition n'est déjà définie ici."],
    ["Comment mes données personnelles sont-elles protégées ?", "Elles sont réservées aux administrateurs autorisés. Le suivi public ne montre que le statut, avec la référence et l'e-mail."],
    ["Existe-t-il des risques liés à la contribution ?", "Oui. Les crypto-actifs peuvent perdre toute leur valeur. Aucun rendement n'est promis."],
  ] as const;
  return (
    <section>
      <h2 className="font-display text-3xl font-semibold">{tr("Questions fréquentes")}</h2>
      <div className="mt-4 grid gap-3">
        {items.map(([question, answer]) => (
          <details key={question} className="rounded-3xl border border-line bg-panel px-5 py-4">
            <summary className="cursor-pointer font-semibold">{tr(question)}</summary>
            <p className="mt-3 text-sm text-muted">{tr(answer)}</p>
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
