/** @jsxImportSource @/lib/tx */
import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { partnership } from "@/config/site";
import { Container, Eyebrow } from "@/components/site/Section";
import { ApplicationForm } from "@/components/site/ApplicationForm";

export const Route = createFileRoute("/candidature")({
  head: ({ match }) =>
    pageHead(
      "Candidature au partenariat",
      "Déposez votre candidature pour rejoindre le programme de partenariat WIKENVA, sans création de compte.",
      "/candidature", match.context.lang,
    ),
  component: ApplicationPage,
});

function ApplicationPage() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-hero opacity-80" />
      <Container className="relative grid gap-10 lg:grid-cols-[0.9fr_1.4fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Eyebrow>Programme de partenariat</Eyebrow>
          <h1 className="mt-5 text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            Votre candidature pour rejoindre WIKENVA
          </h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">{partnership.thresholdText}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{partnership.review}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            Avant d'envoyer, consultez les{" "}
            <Link to="/partenariat" className="text-primary underline underline-offset-2">
              conditions et limites du programme
            </Link>
            . Déjà candidat ?{" "}
            <Link to="/verifier" className="text-primary underline underline-offset-2">Vérifiez votre demande</Link>.
          </p>
        </div>
        <ApplicationForm />
      </Container>
    </section>
  );
}
