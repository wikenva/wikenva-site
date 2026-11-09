/** @jsxImportSource @/lib/tx */
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Globe, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contact, links } from "@/config/site";
import { pageHead } from "@/lib/seo";
import { Container, GlassCard, PageHeader } from "@/components/site/Section";
import { CommunityBlock } from "@/components/site/blocks";

export const Route = createFileRoute("/contact")({
  head: ({ match }) =>
    pageHead(
      "Contact et communauté",
      "Contactez l'équipe WIKENVA par e-mail ou WhatsApp et rejoignez la communauté sur les réseaux officiels.",
      "/contact", match.context.lang,
    ),
  component: ContactPage,
});

function ContactPage() {
  const cards = [
    { icon: Mail, title: "E-mail", text: contact.email, href: `mailto:${contact.email}`, cta: "Écrire à l'équipe", external: false },
    { icon: MessageCircle, title: "WhatsApp", text: "Communauté officielle WIKENVA", href: contact.whatsapp, cta: "Ouvrir WhatsApp", external: true },
    { icon: Globe, title: "Site officiel", text: "wikenva-platforme.com", href: links.officialSite, cta: "Visiter", external: true },
    { icon: ExternalLink, title: "SidraStart", text: "Digital Marketplace Ebook Halal", href: links.sidraStartProject, cta: "Voir le projet", external: true },
  ];
  return (
    <>
      <PageHeader eyebrow="Contact" title="Parlons de WIKENVA." intro="Une question sur le projet, la campagne ou le partenariat ? L'équipe vous répond." />
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c) => (
              <GlassCard key={c.title} className="flex flex-col">
                <c.icon className="h-7 w-7 text-primary" />
                <h2 className="mt-4 text-lg font-bold text-foreground">{c.title}</h2>
                <p className="mt-1 flex-1 break-words text-sm text-muted-foreground">{c.text}</p>
                <Button asChild variant="glass" className="mt-5 rounded-full">
                  <a href={c.href} {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {c.cta}
                  </a>
                </Button>
              </GlassCard>
            ))}
          </div>
          <div className="mt-12">
            <CommunityBlock />
          </div>
        </Container>
      </section>
    </>
  );
}
