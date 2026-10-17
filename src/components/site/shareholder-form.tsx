import { useEffect, useState, type FormEvent } from "react";
import { ExternalLink, Panel } from "./ui";
import { submitCapture, submitInterest, type SubmitResult } from "@/lib/interest";
import { InterestResult } from "./interest-form";
import type { CaptureResult } from "@/lib/interest";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getRegistration, registerOnPlatform, type RegistrationState } from "@/lib/registration";
import { useTr } from "@/lib/locale";

const STORAGE_KEY = "wikenva.shareholder.applications.v2";
const SIDRA_PROJECT = "https://www.sidrastart.com/project/a05c52a6-22e8-4c81-8049-cb5484422759";

type Application = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  sidraUsername: string;
  amount: string;
  message: string;
  transmitted: boolean;
};

const empty = {
  name: "",
  email: "",
  sidraUsername: "",
  amount: "",
  message: "",
  continueToSidra: false,
};

function parseSda(value: string): number | null {
  const cleaned = value.trim().toLowerCase().replace(/sda/g, "").replace(/\s/g, "");
  if (!cleaned) return null;
  if (/^\d{1,3}(\.\d{3})+$/.test(cleaned)) return Number(cleaned.replace(/\./g, ""));
  const normalized = cleaned.replace(",", ".");
  if (!/^\d+(\.\d+)?$/.test(normalized)) return null;
  const amount = Number(normalized);
  return Number.isFinite(amount) ? amount : null;
}

function emailOk(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isApplication(value: unknown): value is Application {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<Application>;
  return (
    typeof item.id === "string" &&
    typeof item.createdAt === "string" &&
    typeof item.name === "string" &&
    typeof item.email === "string" &&
    typeof item.sidraUsername === "string" &&
    typeof item.amount === "string" &&
    typeof item.message === "string" &&
    typeof item.transmitted === "boolean"
  );
}

function readApplications(): Application[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isApplication);
  } catch {
    return [];
  }
}

function writeApplications(items: Application[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function ShareholderForm({ account }: { account?: { name: string; email: string } }) {
  const tr = useTr();
  const [values, setValues] = useState({
    ...empty,
    name: account?.name ?? "",
    email: account?.email ?? "",
  });
  const [saved, setSaved] = useState<Application[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [recordPending, setRecordPending] = useState(false);
  const [recordResult, setRecordResult] = useState<SubmitResult | null>(null);
  const [capturePending, setCapturePending] = useState(false);
  const [captureResult, setCaptureResult] = useState<CaptureResult | null>(null);

  useEffect(() => {
    setSaved(readApplications());
    setLoaded(true);
  }, []);

  function update<K extends keyof typeof empty>(key: K, value: (typeof empty)[K]) {
    if (account && key === "email") return;
    setValues((current) => ({ ...current, [key]: value }));
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
  }

  const amount = parseSda(values.amount);
  const nameOk = values.name.trim().length >= 2;
  const mailOk = emailOk(values.email);
  const amountOk = amount !== null && amount >= 1000;
  const ready = nameOk && mailOk && amountOk && values.continueToSidra;
  const nameError = values.name.trim().length > 0 && !nameOk ? tr("Indiquez votre nom complet.") : undefined;
  const emailError = values.email.trim().length > 0 && !mailOk ? tr("Indiquez un email valide.") : undefined;
  const amountError =
    values.amount.trim().length > 0 && !amountOk ? tr("Le montant doit être supérieur ou égal à 1 000 SDA.") : undefined;

  function remove(id: string) {
    const next = saved.filter((item) => item.id !== id);
    writeApplications(next);
    setSaved(next);
  }

  async function sendCapture(file: File | undefined) {
    if (!file) return;
    setCapturePending(true);
    try {
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 1_200_000) {
        setCaptureResult({ recorded: false, id: null, error: "file", missing: [] });
        return;
      }
      const dataUrl = await file.arrayBuffer();
      const bytes = new Uint8Array(dataUrl);
      let binary = "";
      for (const byte of bytes) binary += String.fromCharCode(byte);
      const next = await submitCapture({
        data: {
          name: values.name,
          email: values.email,
          contentType: file.type,
          imageData: btoa(binary),
        },
      });
      setCaptureResult(next);
    } finally {
      setCapturePending(false);
    }
  }

  async function recordApplication() {
    setRecordPending(true);
    try {
      const next = await submitInterest({
        data: {
          kind: "actionnaire",
          name: values.name,
          email: values.email,
          sidraUsername: values.sidraUsername,
          amount: values.amount,
          consent: true,
        },
      });
      setRecordResult(next);
    } finally {
      setRecordPending(false);
    }
  }

  return (
    <div className="grid gap-8">
      <Panel>
        <h2 className="font-display text-3xl font-semibold">{tr("Devenir actionnaire")}</h2>
        <p className="mt-3 text-muted">
          {tr("Le bouton s'affiche lorsque le nom, l'e-mail et un montant d'au moins 1 000 SDA sont valides, et que la case est cochée. Il ouvre SidraStart sans ajouter ces informations à l'adresse et ne confirme pas un investissement. L'enregistrement de la candidature est séparé : il n'a lieu que si vous le demandez, et seulement lorsque la réception administrateur est configurée.")}
        </p>
        <form className="mt-6 grid gap-5" onSubmit={onSubmit} noValidate>
            <Field
              id="nom"
              label="Nom complet"
              value={values.name}
              error={nameError}
              autoComplete="name"
              onChange={(value) => update("name", value)}
            />
            <Field
              id="email"
              label="Adresse e-mail"
              type="email"
              value={values.email}
              error={emailError}
              autoComplete="email"
              readOnly={Boolean(account)}
              hint={account ? tr("Cet e-mail est celui du compte inscrit sur la plateforme.") : undefined}
              onChange={(value) => update("email", value)}
            />
            <Field
              id="sidra"
              label="Nom d'utilisateur SidraChain"
              value={values.sidraUsername}
              hint={tr("Si vous en avez un. Ce champ n'est pas obligatoire.")}
              required={false}
              onChange={(value) => update("sidraUsername", value)}
            />
            <Field
              id="montant"
              label="Montant envisagé en SDA"
              value={values.amount}
              error={amountError}
              hint={tr("Minimum prévu : 1 000 SDA.")}
              inputMode="decimal"
              onChange={(value) => update("amount", value)}
            />
            <label className="grid gap-2" htmlFor="message">
              <span className="text-sm font-semibold">{tr("Message facultatif")}</span>
              <textarea
                id="message"
                rows={5}
                value={values.message}
                aria-describedby="message-hint"
                onChange={(event) => update("message", event.target.value)}
                className="w-full rounded-2xl border border-line bg-ink px-4 py-3 text-fg"
              />
              <span id="message-hint" className="text-sm text-muted">
                {tr("Vous pouvez laisser ce champ vide.")}
              </span>
            </label>
            <label className="flex items-start gap-3 py-1 text-sm">
              <input
                type="checkbox"
                checked={values.continueToSidra}
                onChange={(event) => update("continueToSidra", event.target.checked)}
                className="mt-1 h-5 w-5 accent-gold"
              />
              <span>{tr("J'ai lu les conditions du programme actionnaires WIKENVA et je souhaite continuer vers SidraStart.")}</span>
            </label>
            <p className="text-sm text-muted">
              {tr("L'envoi d'une candidature ne garantit ni l'acceptation, ni l'obtention de parts, ni un rendement financier.")}
            </p>
            {ready ? (
              <div className="grid gap-4">
                <div role="status">
                  <p className="font-display text-lg font-semibold text-gold">{tr("Poursuivez votre démarche avec WIKENVA")}</p>
                  <p className="mt-3 text-sm text-fg">
                    {tr("Vous pouvez accéder au projet Digital Marketplace Ebook sur SidraStart pour consulter les informations disponibles et découvrir les modalités de contribution au développement de la plateforme WIKENVA.")}
                  </p>
                  <p className="mt-3 text-sm text-fg">
                    {tr("Cliquez sur le bouton ci-dessous pour accéder à la page du projet sur SidraStart et suivre les étapes proposées pour poursuivre votre démarche.")}
                  </p>
                </div>
                <ExternalLink href={SIDRA_PROJECT} variant="gold" className="w-full uppercase tracking-wide">
                  {tr("Investir sur SidraStart")}
                </ExternalLink>
                <label className="flex min-h-12 cursor-pointer items-center justify-center rounded-full border border-gold px-5 text-center text-sm font-semibold text-gold">
                  {capturePending ? tr("Envoi…") : tr("Envoyer la capture")}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="sr-only"
                    disabled={capturePending}
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      event.target.value = "";
                      void sendCapture(file);
                    }}
                  />
                </label>
                {captureResult ? (
                  <p className="text-sm text-muted" role="status">
                    {captureResult.recorded
                      ? `${tr("Capture enregistrée.")} ${tr("Référence")} ${captureResult.id}. ${tr("Cela ne confirme pas un investissement sur SidraStart.")}`
                      : captureResult.error === "file"
                        ? tr("La capture doit être une image PNG, JPEG ou WebP de moins de 1,2 Mo. Elle n'a pas été enregistrée.")
                        : tr("La capture n'a pas été enregistrée. Aucune notification n'a été envoyée.")}
                  </p>
                ) : null}
                <button
                  type="button"
                  className="min-h-12 rounded-full border border-line px-5 text-sm font-semibold text-fg"
                  disabled={recordPending}
                  onClick={recordApplication}
                >
                  {recordPending ? tr("Enregistrement…") : tr("Enregistrer la candidature au programme actionnaires")}
                </button>
                <p className="text-sm text-muted">
                  {tr("Ce bouton transmet le nom, l'e-mail, l'identifiant SidraChain s'il est rempli et le montant aux administrateurs autorisés. Il ne confirme pas un investissement sur SidraStart.")}
                </p>
                {recordResult ? <InterestResult result={recordResult} /> : null}
              </div>
            ) : null}
          </form>
      </Panel>
      <Panel>
        <h2 className="font-display text-2xl font-semibold">{tr("Demandes conservées sur cet appareil")}</h2>
        {!loaded ? (
          <p className="mt-3 text-muted">{tr("Chargement…")}</p>
        ) : saved.length === 0 ? (
          <p className="mt-3 text-muted">{tr("Aucune demande enregistrée dans ce navigateur.")}</p>
        ) : (
          <ul className="mt-5 grid gap-4">
            {saved.map((item) => (
              <li key={item.id} className="rounded-2xl border border-line bg-ink p-4">
                <p className="font-semibold">
                  {item.name} · <span className="tabular-nums">{item.id}</span>
                </p>
                <p className="mt-1 text-sm text-muted">
                  {item.amount}
                  {item.sidraUsername ? ` · ${item.sidraUsername}` : ""} · {item.transmitted ? tr("Transmise") : tr("Locale uniquement")}
                </p>
                <button
                  type="button"
                  className="mt-3 min-h-11 text-sm font-semibold text-gold"
                  onClick={() => remove(item.id)}
                >
                  {tr("Effacer de cet appareil")}
                </button>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  type = "text",
  required = true,
  inputMode,
  autoComplete,
  readOnly = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  type?: string;
  required?: boolean;
  inputMode?: "decimal" | "text" | "email";
  autoComplete?: string;
  readOnly?: boolean;
}) {
  const tr = useTr();
  return (
    <label className="grid gap-2" htmlFor={id}>
      <span className="text-sm font-semibold">{tr(label)}</span>
      <input
        id={id}
        type={type}
        required={required}
        inputMode={inputMode}
        value={value}
        autoComplete={autoComplete}
        readOnly={readOnly}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 w-full rounded-full border border-line bg-ink px-4 text-fg"
      />
      {hint ? (
        <span id={`${id}-hint`} className="text-sm text-muted">
          {tr(hint)}
        </span>
      ) : null}
      {error ? (
        <span id={`${id}-error`} className="text-sm text-danger">
          {tr(error)}
        </span>
      ) : null}
    </label>
  );
}

export function ShareholderAccess({ intent = "form" }: { intent?: "form" | "account" }) {
  const tr = useTr();
  const { user, isPending } = useCurrentUserState();
  const [access, setAccess] = useState<RegistrationState | null>(null);
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPending) return;
    let active = true;
    getRegistration()
      .then((next) => {
        if (!active) return;
        setAccess(next);
        if (next.name) setName(next.name);
      })
      .catch(() => {
        if (active) setAccess({ signedIn: false, registered: false, unavailable: true, email: null, name: null });
      });
    return () => {
      active = false;
    };
  }, [isPending, user?.id]);

  async function register(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const result = await registerOnPlatform({ data: { name, consent } });
      if (result.ok && access?.email) {
        setAccess({ signedIn: true, registered: true, unavailable: false, email: access.email, name: name.trim() });
      } else if (result.unavailable) {
        setError(tr("L'inscription n'a pas été enregistrée. Le formulaire reste fermé."));
      } else {
        setError(tr("Indiquez votre nom et confirmez l'inscription."));
      }
    } catch {
      setError(tr("Connectez-vous avant de vous inscrire."));
    } finally {
      setPending(false);
    }
  }

  if (isPending || !access || !access.signedIn || !authEnabled) {
    if (intent === "form") {
      return (
        <Panel>
          <h2 className="font-display text-3xl font-semibold">{tr("Programme actionnaires")}</h2>
          <p className="mt-3 text-muted">
            {tr("Ce formulaire n'est pas la demande de partenaire et il ne réalise pas l'investissement SidraStart. Connectez-vous pour l'ouvrir. La connexion ne confirme aucun versement.")}
          </p>
          {authEnabled ? (
            <div className="mt-6 grid gap-3">
              {GROK_PROVIDERS.map((provider) => (
                <button
                  key={provider.providerId}
                  type="button"
                  className="min-h-12 rounded-full bg-gold px-5 text-sm font-semibold text-ink"
                  onClick={() => signIn(provider.providerId, { callbackURL: "/investisseurs" })}
                >
                  {tr("Se connecter avec")} {provider.label}
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm text-muted">{tr("La connexion n'est pas activée. Le formulaire reste fermé.")}</p>
          )}
        </Panel>
      );
    }
    return (
      <Panel>
        <p className="text-sm font-semibold tracking-widest text-gold uppercase">{tr("Étape 1")}</p>
        <h2 className="mt-2 font-display text-3xl font-semibold">{tr("Connexion")}</h2>
        <p className="mt-3 text-muted">
          {tr("Connectez-vous pour créer votre compte sur la plateforme WIKENVA. Cela ne confirme pas un investissement.")}
        </p>
        {authEnabled ? (
          <div className="mt-6 grid gap-3">
            {GROK_PROVIDERS.map((provider) => (
              <button
                key={provider.providerId}
                type="button"
                className="min-h-12 rounded-full bg-gold px-5 text-sm font-semibold text-ink"
                onClick={() => signIn(provider.providerId, { callbackURL: "/" })}
              >
                {tr("Se connecter avec")} {provider.label}
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-muted">{tr("La connexion n'est pas activée. Le formulaire reste fermé.")}</p>
        )}
      </Panel>
    );
  }

  if (!access.registered || !access.email) {
    return (
      <Panel>
        <p className="text-sm font-semibold tracking-widest text-gold uppercase">{tr("Étape 2")}</p>
        <h2 className="mt-2 font-display text-3xl font-semibold">{tr("Inscription sur la plateforme")}</h2>
        <p className="mt-3 text-muted">
          {tr("Votre compte est connecté. Inscrivez-vous pour enregistrer votre compte. Cette inscription ne confirme pas un investissement.")}
        </p>
        <form className="mt-6 grid gap-4" onSubmit={register}>
          <p className="text-sm text-faint">{access.email}</p>
          <label className="grid gap-2 text-sm font-semibold">
            {tr("Nom complet")}
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="min-h-12 rounded-full border border-line bg-ink px-4 font-normal"
              autoComplete="name"
            />
          </label>
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              className="mt-1 h-5 w-5 accent-gold"
            />
            <span>{tr("Je confirme mon inscription sur la plateforme WIKENVA. Cela ne crée aucun droit.")}</span>
          </label>
          <button type="submit" disabled={pending} className="min-h-12 rounded-full bg-gold px-5 text-sm font-semibold text-ink">
            {pending ? tr("Chargement…") : tr("S'inscrire")}
          </button>
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          {access.unavailable ? (
            <p className="text-sm text-muted">{tr("L'inscription n'a pas été enregistrée. Le formulaire reste fermé.")}</p>
          ) : null}
        </form>
      </Panel>
    );
  }

  if (intent === "account") {
    return (
      <Panel>
        <p className="text-sm font-semibold tracking-widest text-gold uppercase">{tr("Compte inscrit")}</p>
        <h2 className="mt-2 font-display text-3xl font-semibold">{access.name}</h2>
        <p className="mt-3 text-sm text-muted">{access.email}</p>
        <p className="mt-3 text-muted">
          {tr("L'inscription est enregistrée. Cela ne confirme pas un investissement et ne crée aucun droit.")}
        </p>
      </Panel>
    );
  }

  return <ShareholderForm account={{ name: access.name || name, email: access.email }} />;
}
