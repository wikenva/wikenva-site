import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Languages, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { mainNav, moreNav, site, socials } from "@/content/site";
import { ui } from "@/content/ui-copy";
import { cn } from "@/lib/cn";
import { useLang, useTr, type Lang } from "@/lib/locale";
import { ExternalLink, PartnerButton } from "./ui";

function isActive(pathname: string, to: string) {
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function SiteShell({ children }: { children: ReactNode }) {
  return <Shell>{children}</Shell>;
}

function LanguageMenu() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const text = ui(lang);

  function choose(next: Lang) {
    setLang(next);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        className="inline-flex h-9 items-center gap-1 rounded-full border border-line px-2.5 text-[11px] font-semibold tracking-wide"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={text.language}
        onClick={() => setOpen((value) => !value)}
      >
        <Languages className="size-3.5" aria-hidden />
        {lang === "fr" ? "FR" : "EN"}
      </button>
      {open ? (
        <ul
          role="listbox"
          aria-label={text.language}
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-line bg-panel shadow-none"
        >
          {(
            [
              ["fr", "Français"],
              ["en", "English"],
            ] as const
          ).map(([code, label]) => (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={lang === code}
                className={cn(
                  "flex min-h-12 w-full items-center px-4 text-left text-sm font-semibold",
                  lang === code ? "text-gold" : "text-fg hover:bg-ink",
                )}
                onClick={() => choose(code)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function MoreMenu() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);
  const { lang } = useLang();
  const text = ui(lang);
  const tr = useTr();
  const active = moreNav.some((item) => isActive(pathname, item.to));

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="relative">
      <button
        type="button"
        className={cn(
          "inline-flex h-12 items-center gap-1 border-b-2 border-transparent pb-1 text-sm font-semibold",
          active ? "text-fg" : "text-muted",
        )}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        {text.more}
        <ChevronDown className="size-4" aria-hidden />
      </button>
      {open ? (
        <ul role="menu" className="absolute left-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-line bg-panel">
          {moreNav.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                role="menuitem"
                className={cn(
                  "flex min-h-12 items-center px-4 text-sm font-semibold",
                  isActive(pathname, item.to) ? "text-gold" : "text-fg hover:bg-ink",
                )}
              >
                {text.nav[item.to] ?? tr(item.label)}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function Shell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { lang } = useLang();
  const text = ui(lang);
  const tr = useTr();
  const label = (to: string, fallback: string) => text.nav[to] ?? fallback;
  const moreActive = moreNav.some((item) => isActive(pathname, item.to));

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink text-fg">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
      >
        {text.skip}
      </a>
      <header className="sticky top-0 z-40 border-b border-line bg-ink print:hidden">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 px-4 md:h-16 md:px-8">
          <Link to="/" aria-label="WIKENVA" className="flex min-w-0 items-center gap-2">
            <img
              src="/media/logo-mark-ui.webp"
              alt=""
              width={480}
              height={266}
              decoding="async"
              fetchPriority="high"
              className="h-6 w-auto shrink-0 md:h-7"
            />
            <span className="truncate text-sm font-semibold tracking-wide text-fg sm:text-base">
              WIKENVA
            </span>
          </Link>
          <nav className="hidden items-center gap-5 lg:flex" aria-label="Navigation principale">
            {mainNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "border-b-2 border-transparent pb-1 text-sm font-semibold text-muted hover:text-fg",
                  isActive(pathname, item.to) && "border-gold text-fg",
                )}
              >
                {label(item.to, item.label)}
              </Link>
            ))}
            <MoreMenu />
          </nav>
          <div className="flex items-center gap-2">
            <PartnerButton className="hidden px-4 lg:inline-flex" />
            <LanguageMenu />
            <button
              type="button"
              className="grid h-12 w-12 place-items-center rounded-full border border-line lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              onClick={() => {
                setOpen((value) => {
                  const next = !value;
                  if (next && moreActive) setMoreOpen(true);
                  return next;
                });
              }}
            >
              {open ? <X aria-hidden /> : <Menu aria-hidden />}
              <span className="sr-only">{open ? text.closeMenu : text.openMenu}</span>
            </button>
          </div>
        </div>
        {open ? (
          <nav id="menu-mobile" className="border-t border-line bg-ink lg:hidden" aria-label="Menu">
            <div className="mx-auto flex w-full max-w-6xl flex-col px-5 py-3">
              <PartnerButton className="mb-2 w-full" />
              {mainNav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex min-h-12 items-center border-b border-line text-base font-semibold"
                >
                  {label(item.to, item.label)}
                </Link>
              ))}
              <button
                type="button"
                className="flex min-h-12 items-center justify-between text-base font-semibold"
                aria-expanded={moreOpen}
                onClick={() => setMoreOpen((value) => !value)}
              >
                {text.more}
                <ChevronDown className={cn("size-4 transition-transform", moreOpen && "rotate-180")} aria-hidden />
              </button>
              {moreOpen ? (
                <div className="border-t border-line">
                  {moreNav.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="flex min-h-12 items-center border-b border-line pl-3 text-base text-muted"
                    >
                      {label(item.to, item.label)}
                    </Link>
                  ))}
                  <ExternalLink href={site.investUrl ?? ""} variant="ghost" className="mt-3 w-full">
                    {text.invest}
                  </ExternalLink>
                </div>
              ) : null}
            </div>
          </nav>
        ) : null}
      </header>
      <main id="contenu" className="min-w-0 overflow-x-hidden">{children}</main>
      <footer className="border-t border-line bg-ink pb-8 text-fg print:hidden">
        <div className="mx-auto w-full max-w-6xl px-5 py-10 md:px-8">
          <div className="flex items-center gap-3">
            <img
              src="/media/logo-mark-ui.webp"
              alt="WIKENVA"
              width={480}
              height={266}
              loading="lazy"
              decoding="async"
              className="h-10 w-auto"
            />
            <span className="text-sm font-semibold tracking-wide">WIKENVA</span>
          </div>
          <div className="mt-4 h-px w-12 bg-gold" aria-hidden />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            {tr("La plateforme des créateurs, des auteurs et des lecteurs.")}
          </p>
          <p className="mt-5 flex flex-col gap-1.5 text-sm">
            <a href="mailto:wikenva@gmail.com" className="font-semibold text-gold">
              wikenva@gmail.com
            </a>
            <a href="tel:+2290196412117" className="font-semibold">
              +229 01 96 41 21 17
            </a>
          </p>
          <nav className="mt-8" aria-label={tr("Liens du bas de page")}>
            <ul className="grid max-w-md grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <li>
                <Link to="/vision" className="text-muted hover:text-fg">
                  {tr("À propos")}
                </Link>
              </li>
              <li>
                <Link to="/communaute" className="text-muted hover:text-fg">
                  {tr("Contact")}
                </Link>
              </li>
              <li>
                <Link to="/confidentialite" className="text-muted hover:text-fg">
                  {label("/confidentialite", "Politique de confidentialité")}
                </Link>
              </li>
              <li>
                <Link to="/conditions" className="text-muted hover:text-fg">
                  {label("/conditions", "Conditions d'utilisation")}
                </Link>
              </li>
            </ul>
          </nav>
          <ul className="mt-8 flex items-center gap-4">
            {socials.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.name}
                  className={
                    "grid size-11 place-items-center rounded-full " +
                    (item.id === "twitter" ? "bg-white" : "")
                  }
                >
                  <img
                    src={
                      item.id === "facebook"
                        ? "/media/social/facebook.svg"
                        : item.id === "whatsapp"
                          ? "/media/social/whatsapp.svg"
                          : item.id === "telegram"
                            ? "/media/social/telegram.svg"
                            : "/media/social/x.svg"
                    }
                    alt=""
                    width={28}
                    height={28}
                    className={item.id === "twitter" ? "size-5" : "size-7"}
                  />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 border-t border-line pt-4 text-xs text-faint">{tr("© 2026 WIKENVA")}</p>
        </div>
      </footer>
    </div>
  );
}
