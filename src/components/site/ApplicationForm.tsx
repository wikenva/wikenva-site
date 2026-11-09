/** @jsxImportSource @/lib/tx */
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Check, CheckCircle2, Copy, ExternalLink, Loader2, LockKeyhole, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CountryInput } from "@/components/site/CountryInput";
import { applicationSchema } from "@/lib/application-schema";
import { submitPartnerApplication } from "@/lib/applications.functions";
import { deadlines, links } from "@/config/site";
import { useIsPast } from "@/lib/use-is-past";
import { cn } from "@/lib/utils";

type Values = {
  fullName: string;
  email: string;
  country: string;
  txHash: string;
  whatsapp: string;
  motivation: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
};

const empty: Values = {
  fullName: "",
  email: "",
  country: "",
  txHash: "",
  whatsapp: "",
  motivation: "",
  acceptTerms: false,
  acceptPrivacy: false,
};

type Errors = Partial<Record<keyof Values, string>>;

function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string | undefined;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-semibold text-foreground">
        {label}{" "}
        {required ? (
          <span className="text-gold">*</span>
        ) : (
          <span className="font-normal text-muted-foreground">(facultatif)</span>
        )}
      </Label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = "h-12 rounded-xl border-input bg-background/60 text-base";

export function ApplicationForm() {
  const submit = useServerFn(submitPartnerApplication);
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const closed = useIsPast(deadlines.partnership.iso);
  const startedAt = useRef<number>(0);
  const honeypot = useRef<HTMLInputElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function copyCode() {
    if (!code) return;
    setCopied(false);
    setCopyError(false);
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      setCopyError(true);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    const parsed = applicationSchema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof Values;
        if (!next[k]) next[k] = issue.message;
      }
      setErrors(next);
      const first = Object.keys(next)[0];
      if (first) document.getElementById(first)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await submit({
        data: {
          ...values,
          website: honeypot.current?.value ?? "",
          startedAt: startedAt.current,
        } as never,
      });
      if (res.ok) {
        setCode(res.code);
        setStatus("done");
        setValues(empty);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setServerError(res.error);
        if ("field" in res && res.field) {
          const field = res.field;
          setErrors((e) => ({ ...e, [field]: res.error }));
          document.getElementById(field)?.focus();
        }
        setStatus("idle");
      }
    } catch {
      setServerError(
        "Certaines informations sont invalides ou le service est momentanément indisponible. Vérifiez le formulaire et réessayez.",
      );
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-success/40 bg-success/10 p-8 text-center sm:p-12"
      >
        <CheckCircle2 className="mx-auto h-14 w-14 text-success" />
        <h2 className="mt-5 text-2xl font-bold text-foreground">Candidature transmise</h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-foreground/90">
          Merci pour votre intérêt envers WIKENVA. Votre candidature a bien été enregistrée et est
          actuellement en cours d'examen par notre équipe.
        </p>
        {code && (
          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-gold/50 bg-background/60 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
              Votre code personnel de suivi
            </p>
            <p className="mt-3 select-all break-all font-mono text-2xl font-bold tracking-wider text-foreground">
              {code}
            </p>
            <Button type="button" variant="glass" size="sm" className="mt-4" onClick={copyCode}>
              {copied ? <Check /> : <Copy />} {copied ? "Code copié" : "Copier le code"}
            </Button>
            {copyError && (
              <p role="alert" className="mt-3 text-sm font-medium text-destructive">
                Copie impossible : sélectionnez le code ci-dessus et conservez-le.
              </p>
            )}
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Notez-le ou faites une capture d'écran maintenant : il ne sera{" "}
              <strong>pas envoyé par e-mail</strong> et ne pourra pas être affiché à nouveau. Avec
              l'adresse e-mail de votre candidature, il vous permettra de suivre votre demande.
            </p>
          </div>
        )}
        <Button asChild variant="gold" size="xl" className="mt-8 mr-3">
          <Link to="/verifier">Vérifier ma demande</Link>
        </Button>
        <Button asChild variant="glass" size="xl" className="mt-8">
          <Link to="/">Retour à l'accueil</Link>
        </Button>
      </div>
    );
  }

  if (closed) {
    return (
      <div className="rounded-3xl border border-border bg-surface p-8 text-center">
        <h2 className="text-2xl font-bold text-foreground">Les candidatures sont closes</h2>
        <p className="mt-3 text-muted-foreground">
          {deadlines.endedText} Les candidatures au programme de partenariat ont été clôturées le{" "}
          {deadlines.partnership.dateLabel}.
        </p>
      </div>
    );
  }

  const describe = (k: keyof Values, hint?: boolean) =>
    errors[k] ? `${k}-error` : hint ? `${k}-hint` : undefined;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative space-y-6 rounded-3xl border border-border bg-card-glass p-6 shadow-card sm:p-10"
    >
      <div className="flex gap-3 rounded-2xl border border-gold/30 bg-gold/10 p-4 text-sm leading-relaxed text-foreground">
        <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
        <p>
          WIKENVA ne vous demandera <strong>jamais</strong> votre phrase secrète, votre clé privée,
          votre mot de passe ni de connecter votre portefeuille. Votre contribution se fait
          uniquement sur SidraStart : ne l'envoyez jamais à une autre adresse.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="fullName" label="Nom complet" required error={errors.fullName}>
          <Input
            id="fullName"
            required
            autoComplete="name"
            maxLength={100}
            value={values.fullName}
            onChange={(e) => set("fullName", e.target.value)}
            aria-invalid={!!errors.fullName}
            aria-describedby={describe("fullName")}
            className={inputClass}
          />
        </Field>
        <Field id="email" label="Adresse e-mail" required error={errors.email}>
          <Input
            id="email"
            required
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={255}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={describe("email")}
            className={inputClass}
          />
        </Field>
        <Field
          id="country"
          label="Pays de résidence"
          required
          hint="Tapez les premières lettres puis choisissez votre pays."
          error={errors.country}
        >
          <CountryInput
            id="country"
            required
            value={values.country}
            onChange={(v) => set("country", v)}
            invalid={!!errors.country}
            describedBy={describe("country", true)}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="space-y-4 rounded-2xl border border-gold/40 bg-surface-strong p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">
          Étape obligatoire avant la candidature
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-foreground/90">
          <li>
            Contribuez au projet <strong>Digital Marketplace Ebook Halal</strong> depuis sa page
            officielle sur SidraStart (aucun montant minimum).
          </li>
          <li>
            Une fois la transaction réussie, copiez son <strong>hash</strong> depuis votre
            portefeuille ou l'explorateur SidraChain.
          </li>
          <li>Collez ce hash ci-dessous pour envoyer votre candidature.</li>
        </ol>
        <Button asChild variant="glass" size="sm" className="w-full sm:w-auto">
          <a href={links.sidraStartProject} target="_blank" rel="noopener noreferrer">
            Contribuer sur SidraStart <ExternalLink />
          </a>
        </Button>
        <Field
          id="txHash"
          label="Hash de la transaction de contribution"
          required
          hint="Exemple : 0x4f2a…c91e (0x suivi de 64 caractères). Un hash ne peut servir qu'une seule fois."
          error={errors.txHash}
        >
          <Input
            id="txHash"
            required
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            maxLength={80}
            placeholder="0x…"
            value={values.txHash}
            onChange={(e) => set("txHash", e.target.value)}
            aria-invalid={!!errors.txHash}
            aria-describedby={describe("txHash", true)}
            className={cn(inputClass, "font-mono text-sm")}
          />
        </Field>
      </div>

      <Field
        id="whatsapp"
        label="Numéro WhatsApp avec indicatif international"
        hint="Exemple : +229 01 23 45 67 89"
        error={errors.whatsapp}
      >
        <Input
          id="whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={22}
          value={values.whatsapp}
          onChange={(e) => set("whatsapp", e.target.value)}
          aria-invalid={!!errors.whatsapp}
          aria-describedby={describe("whatsapp", true)}
          className={inputClass}
        />
      </Field>

      <Field
        id="motivation"
        label="Pourquoi souhaitez-vous devenir partenaire de WIKENVA ?"
        error={errors.motivation}
      >
        <Textarea
          id="motivation"
          rows={5}
          maxLength={1000}
          value={values.motivation}
          onChange={(e) => set("motivation", e.target.value)}
          aria-invalid={!!errors.motivation}
          aria-describedby={describe("motivation")}
          className="rounded-xl border-input bg-background/60 text-base"
        />
        <p className="text-right text-xs text-muted-foreground">{values.motivation.length}/1000</p>
      </Field>

      {/* Champ piège anti-robots, invisible pour les visiteurs */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Site web</label>
        <input
          ref={honeypot}
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="space-y-4 border-t border-border pt-6">
        <div>
          <div className="flex items-start gap-3">
            <Checkbox
              id="acceptTerms"
              required
              checked={values.acceptTerms}
              onCheckedChange={(c) => set("acceptTerms", c === true)}
              aria-invalid={!!errors.acceptTerms}
              aria-describedby={errors.acceptTerms ? "acceptTerms-error" : undefined}
              className="mt-0.5 h-5 w-5"
            />
            <Label
              htmlFor="acceptTerms"
              className="text-sm font-normal leading-relaxed text-foreground"
            >
              Je confirme que les informations fournies sont exactes et que je comprends les{" "}
              <Link to="/partenariat" className="text-primary underline underline-offset-2">
                conditions du programme de partenariat WIKENVA
              </Link>
              . <span className="text-gold">*</span>
            </Label>
          </div>
          {errors.acceptTerms && (
            <p id="acceptTerms-error" className="mt-2 pl-8 text-xs font-medium text-destructive">
              {errors.acceptTerms}
            </p>
          )}
        </div>
        <div>
          <div className="flex items-start gap-3">
            <Checkbox
              id="acceptPrivacy"
              required
              checked={values.acceptPrivacy}
              onCheckedChange={(c) => set("acceptPrivacy", c === true)}
              aria-invalid={!!errors.acceptPrivacy}
              aria-describedby={errors.acceptPrivacy ? "acceptPrivacy-error" : undefined}
              className="mt-0.5 h-5 w-5"
            />
            <Label
              htmlFor="acceptPrivacy"
              className="text-sm font-normal leading-relaxed text-foreground"
            >
              J'accepte la{" "}
              <Link to="/confidentialite" className="text-primary underline underline-offset-2">
                politique de confidentialité
              </Link>
              . <span className="text-gold">*</span>
            </Label>
          </div>
          {errors.acceptPrivacy && (
            <p id="acceptPrivacy-error" className="mt-2 pl-8 text-xs font-medium text-destructive">
              {errors.acceptPrivacy}
            </p>
          )}
        </div>
      </div>

      {serverError && (
        <p
          role="alert"
          className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm font-medium text-foreground"
        >
          {serverError}
        </p>
      )}

      <Button
        type="submit"
        variant="gold"
        size="xl"
        disabled={status === "sending"}
        className="w-full uppercase tracking-wide"
      >
        {status === "sending" ? <Loader2 className="animate-spin" /> : <Send />}
        {status === "sending" ? "Envoi en cours…" : "Envoyer ma candidature"}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Candidatures ouvertes jusqu'au {deadlines.partnership.dateLabel} (heure de Porto-Novo).
        Aucun compte n'est nécessaire.
      </p>
    </form>
  );
}
