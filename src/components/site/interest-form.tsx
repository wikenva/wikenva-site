import { useState, type FormEvent } from "react";
import { submitInterest, type SubmitResult } from "@/lib/interest";
import { useTr } from "@/lib/locale";
import { Button, Panel } from "./ui";

const gapText = {
  database: "Base durable : renseigner DATABASE_URL.",
  auth: "Connexion des administrateurs : activer VITE_AUTH_ENABLED.",
  admins: "Accès CEO : renseigner WIKENVA_ADMIN_EMAILS avec les e-mails autorisés.",
} as const;

export function InterestResult({ result }: { result: SubmitResult }) {
  const tr = useTr();
  if (result.error === "consent") return <p className="text-sm text-danger">{tr("Confirmez que vous acceptez de communiquer vos coordonnées.")}</p>;
  if (result.error === "email") return <p className="text-sm text-danger">{tr("Indiquez un email valide.")}</p>;
  if (result.error === "name") return <p className="text-sm text-danger">{tr("Indiquez votre nom complet.")}</p>;
  if (result.error === "amount") return <p className="text-sm text-danger">{tr("Le montant doit être supérieur ou égal à 3 000 SDA.")}</p>;
  if (!result.recorded) {
    return (
      <div className="rounded-2xl border border-line bg-ink p-4 text-sm" role="status">
        <p className="font-semibold text-gold">{tr("Demande non enregistrée")}</p>
        <p className="mt-2 text-muted">{tr("Aucune notification n'a été envoyée. La réception n'est pas encore opérationnelle.")}</p>
        <ul className="mt-3 grid gap-1 text-muted">
          {result.missing.map((item) => (
            <li key={item}>{tr(gapText[item])}</li>
          ))}
          <li>{tr("Notification : WIKENVA_NOTIFY_WEBHOOK, une adresse https. Sans elle, aucun avis n'est envoyé.")}</li>
        </ul>
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-gold/40 bg-ink p-4 text-sm" role="status">
      <p className="font-semibold text-fg">
        {tr("Demande enregistrée.")} {tr("Référence")} <span className="tabular-nums">{result.id}</span>. {tr("Statut : reçue.")}
      </p>
      <p className="mt-2 text-muted">
        {result.notified
          ? tr("Un avis a été envoyé, sans vos coordonnées. Cela ne confirme pas un investissement.")
          : tr("Aucun e-mail n'a été envoyé. Les administrateurs autorisés pourront consulter la demande. Cela ne confirme pas un investissement.")}
      </p>
    </div>
  );
}

export function InterestSignal() {
  const tr = useTr();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sidra, setSidra] = useState("");
  const [amount, setAmount] = useState("");
  const [consent, setConsent] = useState(false);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    try {
      const next = await submitInterest({
        data: { kind: "contribution", name, email, sidraUsername: sidra, amount, consent },
      });
      setResult(next);
    } finally {
      setPending(false);
    }
  }

  return (
    <Panel>
      <h3 className="font-display text-2xl font-semibold">{tr("Intérêt pour contribuer au projet sur SidraStart")}</h3>
      <p className="mt-3 text-sm text-muted">
        {tr("Un clic sur Investir ouvre SidraStart. Il ne communique ni votre identité ni la confirmation d'un investissement. Vous pouvez, si vous l'acceptez, laisser vos coordonnées aux administrateurs de WIKENVA.")}
      </p>
      {open ? (
        <form className="mt-5 grid gap-4" onSubmit={onSubmit} noValidate>
          <label className="grid gap-2 text-sm font-semibold">
            {tr("Nom")}
            <input value={name} onChange={(event) => setName(event.target.value)} className="min-h-12 rounded-full border border-line bg-ink px-4 font-normal" />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            {tr("Adresse e-mail")}
            <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="min-h-12 rounded-full border border-line bg-ink px-4 font-normal" />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            {tr("Nom d'utilisateur SidraChain")}
            <input value={sidra} onChange={(event) => setSidra(event.target.value)} className="min-h-12 rounded-full border border-line bg-ink px-4 font-normal" />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            {tr("Montant envisagé en SDA")}
            <input value={amount} inputMode="decimal" onChange={(event) => setAmount(event.target.value)} className="min-h-12 rounded-full border border-line bg-ink px-4 font-normal" />
          </label>
          <label className="flex items-start gap-3 text-sm font-normal">
            <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1 h-5 w-5 accent-gold" />
            <span>{tr("J'accepte de communiquer ces coordonnées aux administrateurs autorisés de WIKENVA. Cela ne confirme pas un investissement.")}</span>
          </label>
          <Button type="submit" variant="gold" disabled={pending || !consent}>
            {pending ? tr("Envoi…") : tr("Envoyer aux administrateurs")}
          </Button>
          {result ? <InterestResult result={result} /> : null}
        </form>
      ) : (
        <Button className="mt-5" variant="ghost" onClick={() => setOpen(true)}>
          {tr("Communiquer mes coordonnées")}
        </Button>
      )}
    </Panel>
  );
}
