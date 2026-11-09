/** @jsxImportSource @/lib/tx */
import { Link } from "@tanstack/react-router";
import { ExternalLink, Mail } from "lucide-react";
import { brand, contact, links, navFooter } from "@/config/site";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

export function SiteFooter() {
  return (
    <footer className="theme-ink relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 pattern-star opacity-50" />
      <div className="relative mx-auto w-full max-w-6xl px-5 pt-16 sm:px-8">
        <p className="max-w-3xl font-display text-4xl font-medium leading-[1.05] text-foreground sm:text-6xl">
          <span className="text-gradient">{brand.slogan}</span>
        </p>
        <div className="mt-14 grid gap-10 border-t border-border pt-12 md:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {brand.name} — {brand.project}
            </p>
            <SocialLinks className="mt-6" />
          </div>
          <div className="grid gap-10 sm:grid-cols-2">
            <nav aria-label="Liens du pied de page">
              <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-gold">Le site</h3>
              <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                {navFooter.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="text-foreground/80 transition-colors hover:text-gold">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-gold">Nous joindre</h3>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 break-all text-foreground/80 hover:text-gold">
                    <Mail className="h-4 w-4 shrink-0" /> {contact.email}
                  </a>
                </li>
                <li>
                  <a href={links.officialSite} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-foreground/80 hover:text-gold">
                    <ExternalLink className="h-4 w-4" /> Site officiel
                  </a>
                </li>
                <li>
                  <a href={links.sidraStartProject} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-foreground/80 hover:text-gold">
                    <ExternalLink className="h-4 w-4" /> Projet sur SidraStart
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="relative mt-14 border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 pb-28 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:pb-6">
          <p>© 2026 WIKENVA. Tous droits réservés.</p>
          <p>WIKENVA n'est ni une banque ni un conseiller financier. Aucune contribution ne garantit un rendement.</p>
        </div>
      </div>
    </footer>
  );
}
