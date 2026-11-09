/** @jsxImportSource @/lib/tx */
import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, ClipboardCheck, ExternalLink, FileSignature, Hash, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deadlines, links, partnership } from "@/config/site";
import { pageHead } from "@/lib/seo";
import { Container, GlassCard, PageHeader, SectionHeading } from "@/components/site/Section";
import { Countdown } from "@/components/site/Countdown";

export const Route = createFileRoute("/partenariat")({
  head: ({ match }) =>
    pageHead(
      "Programme officiel de partenariat",
      "Devenez partenaire de WIKENVA : contribuer au projet sur SidraStart, déposer une candidature avec le hash de la transaction et suivre sa demande.",
      "/partenariat", match.context.lang,
    ),
  component: PartnershipPage,
});

const steps = [
  { icon: ExternalLink, title: "Contribuer sur SidraStart", text: "Contribuez au projet Digital Marketplace Ebook Halal depuis sa page officielle sur SidraStart, sans montant minimum." },
  { icon: Hash, title: "Copier le hash", text: "Une fois la transaction réussie, copiez son hash : il est obligatoire dans le formulaire." },
  { icon: Send, title: "Envoyer la candidature", text: "Remplissez le formulaire avec votre hash, sans création de compte." },
  { icon: Hash, title: "Conserver son code", text: "Un code de suivi personnel s'affiche à l'envoi : notez-le pour suivre votre demande." },
  { icon: ClipboardCheck, title: "Examen", text: "L'administration de WIKENVA étudie chaque candidature et la valide ou non." },
  { icon: FileSignature, title: "Accord écrit", text: "Si elle est acceptée, le partenariat est formalisé par un accord signé." },
];

function PartnershipPage() {
  return (
    <>
      <PageHeader
        eyebrow="Programme officiel"
        title="DEVENEZ PARTENAIRE DE WIKENVA"
        intro="Participez à la construction d'une marketplace digitale internationale et prenez part à une vision tournée vers le savoir, la créativité et l'entrepreneuriat numérique."
      >
        <Button asChild variant="gold" size="xl">
          <Link to="/candidature">
            DEVENIR PARTENAIRE <ArrowRight />
          </Link>
        </Button>
        <Button asChild variant="glass" size="xl">
          <a href={links.sidraStartProject} target="_blank" rel="noopener noreferrer">
            Projet sur SidraStart <ExternalLink />
          </a>
        </Button>
      </PageHeader>

      <section className="py-14 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-gold/40 bg-surface-strong p-6 shadow-gold sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Candidature</p>
            <p className="mt-3 font-display text-4xl font-extrabold sm:text-5xl text-foreground">{partnership.threshold}</p>
            <p className="mt-3 text-muted-foreground">{partnership.thresholdText}</p>
            <p className="mt-6 border-t border-border pt-6 text-sm leading-relaxed text-foreground/90">{partnership.review}</p>
          </div>
          <Countdown {...deadlines.partnership} />
        </Container>
      </section>

      <section className="pb-14 sm:pb-20">
        <Container className="grid gap-8 lg:grid-cols-2">
          <GlassCard className="p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Deux démarches distinctes</p>
            <h2 className="mt-3 text-xl font-bold text-foreground sm:text-2xl">CONTRIBUER AU PROJET ET DEVENIR PARTENAIRE DE WIKENVA</h2>
            <div className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>WIKENVA est le nom officiel de la plateforme développée dans le cadre du projet Digital Marketplace Ebook Halal, présenté sur SidraStart.</p>
              <p>Toute personne souhaitant soutenir cette initiative peut effectuer une contribution directement sur SidraStart, dans le projet Digital Marketplace Ebook Halal.</p>
              <p>En choisissant de contribuer au développement de ce projet, vous participez à la construction d'un écosystème numérique ambitieux.</p>
              <p>Pour rejoindre le programme de partenariat WIKENVA, contribuez d'abord sur SidraStart, puis déposez votre candidature avec le hash de votre transaction.</p>
            </div>
            <p className="mt-5 rounded-2xl border border-gold/30 bg-gold/10 p-4 text-sm leading-relaxed text-foreground">
              <strong>Important :</strong> la contribution sur SidraStart est obligatoire pour candidater, mais elle ne garantit pas automatiquement l'approbation d'une candidature. Chaque demande de partenariat est examinée et validée par l'administration de WIKENVA.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="gold"><Link to="/candidature">Déposer ma candidature <ArrowRight /></Link></Button>
              <Button asChild variant="glass"><Link to="/verifier">Vérifier ma demande</Link></Button>
            </div>
          </GlassCard>
          <div className="rounded-3xl border border-gold/40 bg-surface-strong p-6 shadow-gold sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Sur SidraStart</p>
            <h2 className="mt-3 text-xl font-bold text-foreground sm:text-2xl">DIGITAL MARKETPLACE EBOOK HALAL – SUR SIDRASTART</h2>
            <div className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>Le projet Digital Marketplace Ebook Halal est le projet présenté sur SidraStart pour soutenir le développement de WIKENVA.</p>
              <p>WIKENVA est le nom officiel de la future plateforme numérique.</p>
              <p>Notre vision est de construire un écosystème permettant aux lecteurs, auteurs, créateurs de contenus, entrepreneurs et commerçants de se retrouver dans un même environnement numérique.</p>
              <p>Les contributions au projet sont effectuées directement sur SidraStart, via la page officielle du projet.</p>
            </div>
            <Button asChild variant="gold" size="xl" className="mt-6 w-full sm:w-auto">
              <a href={links.sidraStartProject} target="_blank" rel="noopener noreferrer">
                SOUTENIR LE PROJET SUR SIDRASTART <ExternalLink />
              </a>
            </Button>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Avantages proposés" title="Sept avantages pour les partenaires éligibles." />
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {partnership.benefits.map((b, i) => (
              <li key={b.title} className="flex gap-4 rounded-2xl border border-border bg-card-glass p-6">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-gradient font-display font-bold text-gold-foreground">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-foreground">{b.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-2">
          <GlassCard className="border-destructive/30 p-6 sm:p-8">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-foreground">
              <AlertTriangle className="h-6 w-6 shrink-0 text-gold" /> Limites et modalités
            </h2>
            <ul className="mt-6 space-y-3">
              {partnership.limits.map((l) => (
                <li key={l} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" /> {l}
                </li>
              ))}
            </ul>
            <Link to="/conditions" className="mt-6 inline-block text-sm font-semibold text-primary hover:underline">
              Conditions d'utilisation complètes
            </Link>
          </GlassCard>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Comment rejoindre le programme</h2>
            <ol className="mt-6 space-y-3">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4 rounded-2xl border border-border bg-card-glass p-5">
                  <s.icon className="h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">
                      {i + 1}. {s.title}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Button asChild variant="gold" size="xl" className="mt-8 w-full sm:w-auto">
              <Link to="/candidature">
                DEVENIR PARTENAIRE <ArrowRight />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
