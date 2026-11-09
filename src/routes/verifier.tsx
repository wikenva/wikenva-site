/** @jsxImportSource @/lib/tx */
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { BadgeCheck, Clock, Loader2, Search, Sparkles, XCircle } from "lucide-react";
import { pageHead } from "@/lib/seo";
import { Container, Eyebrow } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { verifyPartnerApplication } from "@/lib/applications.functions";
import type { PublicStatus } from "@/lib/tracking-code";

export const Route = createFileRoute("/verifier")({
  head: ({ match }) =>
    pageHead(
      "Vérifier ma candidature",
      "Suivez l'évolution de votre candidature au programme de partenariat WIKENVA avec l'adresse e-mail utilisée lors de votre inscription et votre code de suivi.",
      "/verifier",
      match.context.lang,
    ),
  component: VerifyPage,
});

type Result = { status: PublicStatus; fullName: string };

function VerifyPage() {
  const verify = useServerFn(verifyPartnerApplication);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await verify({ data: { email, code } });
      if (res.ok) setResult({ status: res.status, fullName: res.fullName });
      else setError(res.error);
    } catch {
      setError("Service momentanément indisponible. Merci de réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative overflow-hidden py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-hero opacity-80" />
      <Container className="relative max-w-2xl">
        <div className="text-center">
          <Eyebrow>Espace candidat</Eyebrow>
          <h1 className="mt-5 text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            VÉRIFIEZ VOTRE DEMANDE DE PARTENARIAT
          </h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Vous avez soumis une candidature pour rejoindre le programme de partenariat WIKENVA ?
          </p>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Suivez facilement son évolution grâce à l'adresse e-mail utilisée lors de votre
            inscription et au code de suivi reçu à la fin de votre candidature.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-10 space-y-5 rounded-3xl border border-border bg-card-glass p-6 shadow-card sm:p-10"
        >
          <div className="space-y-2">
            <Label htmlFor="verify-email" className="font-semibold">
              Adresse e-mail de votre candidature
            </Label>
            <Input
              id="verify-email"
              type="email"
              required
              autoComplete="email"
              maxLength={255}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl bg-background/60 text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="verify-code" className="font-semibold">
              Votre code de vérification
            </Label>
            <Input
              id="verify-code"
              required
              autoComplete="off"
              spellCheck={false}
              maxLength={40}
              placeholder="WKV-XXXX-XXXX-XXXX"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-12 rounded-xl bg-background/60 font-mono text-base uppercase tracking-wider"
            />
          </div>
          {error && (
            <p
              role="alert"
              className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm font-medium text-foreground"
            >
              {error}
            </p>
          )}
          <Button
            type="submit"
            variant="gold"
            size="xl"
            disabled={loading}
            className="grid h-20 w-full grid-cols-[auto_minmax(0,1fr)] gap-3 whitespace-normal px-4 text-sm leading-5 tracking-normal sm:h-13 sm:px-7 sm:text-base"
          >
            {loading ? (
              <Loader2 aria-hidden="true" className="animate-spin" />
            ) : (
              <Search aria-hidden="true" />
            )}
            <span className="min-w-0 text-center">VÉRIFIER MA DEMANDE DE PARTENARIAT</span>
          </Button>
        </form>

        {result && <StatusPanel result={result} />}

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Pas encore de candidature ?{" "}
          <Link to="/candidature" className="text-primary underline underline-offset-2">
            Déposer ma candidature
          </Link>
        </p>
      </Container>
    </section>
  );
}

function StatusPanel({ result }: { result: Result }) {
  if (result.status === "approuvee") {
    return (
      <div
        role="status"
        className="relative mt-8 overflow-hidden rounded-3xl border border-gold/50 bg-surface-strong p-8 text-center shadow-gold sm:p-12"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <Sparkles
            key={i}
            aria-hidden="true"
            className="pointer-events-none absolute h-4 w-4 animate-pulse text-gold"
            style={{
              left: `${i % 2 ? 90 + (i % 3) * 2 : 3 + (i % 3) * 2}%`,
              top: `${8 + i * 9}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
        <span className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-gold-gradient">
          <span className="absolute inset-0 animate-ping rounded-full bg-gold/30" />
          <BadgeCheck className="relative h-11 w-11 text-gold-foreground" />
        </span>
        <h2 className="relative mt-6 text-3xl font-extrabold text-foreground">
          FÉLICITATIONS ! 🎉🎉🎉
        </h2>
        <div className="relative mx-auto mt-5 max-w-xl space-y-3 leading-relaxed text-foreground/90">
          <p>
            Votre candidature a été officiellement <strong className="text-gold">APPROUVÉE</strong>{" "}
            !
          </p>
          <p>Nous sommes heureux de vous accueillir parmi les partenaires de WIKENVA.</p>
          <p>
            Vous faites désormais partie d'un écosystème qui rassemble lecteurs, auteurs, créateurs
            et entrepreneurs autour des opportunités du numérique.
          </p>
          <p className="font-semibold">Bienvenue dans la communauté des partenaires WIKENVA !</p>
          <p>Notre équipe vous contactera pour les prochaines étapes.</p>
        </div>
      </div>
    );
  }
  if (result.status === "refusee") {
    return (
      <div
        role="status"
        className="mt-8 rounded-3xl border border-border bg-surface p-8 text-center sm:p-10"
      >
        <XCircle className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-foreground/90">
          Après examen de votre candidature, nous sommes au regret de vous informer que celle-ci n'a
          pas été approuvée pour le moment.
        </p>
        <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted-foreground">
          Nous vous remercions sincèrement pour votre intérêt envers WIKENVA.
        </p>
      </div>
    );
  }
  return (
    <div
      role="status"
      className="mt-8 rounded-3xl border border-primary/40 bg-primary/10 p-8 text-center sm:p-10"
    >
      <Clock className="mx-auto h-12 w-12 text-primary" />
      <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">En attente</p>
      <p className="mx-auto mt-4 max-w-xl leading-relaxed text-foreground/90">
        Votre candidature a bien été enregistrée et est actuellement en cours d'examen par notre
        équipe. Nous vous informerons dès qu'une décision sera prise. Merci de votre intérêt pour
        WIKENVA.
      </p>
    </div>
  );
}
