/** @jsxImportSource @/lib/tx */
import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navMain } from "@/config/site";
import { Logo } from "./Logo";
import { LangSwitch } from "./LangSwitch";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, p } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "theme-ink sticky top-0 z-50 border-b bg-background/95 backdrop-blur-xl transition-[border-color,box-shadow] duration-300",
        scrolled ? "border-border shadow-card" : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Logo />
        <nav
          aria-label={t("Navigation principale", "Main navigation")}
          className="hidden items-center gap-0.5 lg:flex"
        >
          {navMain.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="relative rounded-full px-3 py-2 text-[13px] font-semibold text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground data-[status=active]:after:absolute data-[status=active]:after:inset-x-3 data-[status=active]:after:-bottom-0.5 data-[status=active]:after:h-0.5 data-[status=active]:after:rounded-full data-[status=active]:after:bg-gold-gradient"
            >
              {p(item.label)}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <LangSwitch />
          <Button
            asChild
            variant="gold"
            size="sm"
            className="hidden h-10 rounded-full px-5 text-[13px] sm:inline-flex"
          >
            <Link to="/candidature">
              {t("Devenir partenaire", "Become a partner")} <ArrowRight />
            </Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="glass"
                size="icon"
                className="h-10 w-10 rounded-full lg:hidden"
                aria-label={t("Ouvrir le menu", "Open menu")}
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="theme-ink w-[88vw] max-w-sm overflow-y-auto border-border"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="pointer-events-none absolute inset-0 pattern-star opacity-60" />
              <div className="relative mt-2">
                <Logo />
              </div>
              <nav
                aria-label={t("Menu mobile", "Mobile menu")}
                className="relative mt-8 flex flex-col"
              >
                {[...navMain, { to: "/contact", label: "Contact" } as const].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: item.to === "/" }}
                    className="flex items-center justify-between border-b border-border px-1 py-3.5 font-display text-xl text-foreground transition-colors hover:text-gold data-[status=active]:text-gold"
                  >
                    {p(item.label)}
                    <ArrowRight className="h-4 w-4 opacity-40" />
                  </Link>
                ))}
              </nav>
              <Button asChild variant="gold" size="xl" className="relative mt-8 w-full">
                <Link to="/candidature" onClick={() => setOpen(false)}>
                  {t("Devenir partenaire", "Become a partner")} <ArrowRight />
                </Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
