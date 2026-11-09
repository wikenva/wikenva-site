/** @jsxImportSource @/lib/tx */
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/seo";
import { Container, PageHeader } from "@/components/site/Section";
import { FaqList } from "@/components/site/FaqList";

export const Route = createFileRoute("/faq")({
  head: ({ match }) =>
    pageHead(
      "Questions fréquentes",
      "Tout comprendre sur WIKENVA, SidraChain, SidraStart, SidraDex, la contribution et le programme de partenariat.",
      "/faq", match.context.lang,
    ),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <PageHeader eyebrow="FAQ" title="Questions fréquentes" intro="Des réponses simples, transparentes et professionnelles." />
      <section className="py-16 sm:py-20">
        <Container className="max-w-4xl">
          <FaqList />
          <div className="mt-10 flex flex-col items-center gap-3 text-center">
            <p className="text-muted-foreground">Vous ne trouvez pas votre réponse ?</p>
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">Contacter l'équipe</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
