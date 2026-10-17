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
        className="inline-flex h-12 items-center gap-1.5 rounded-full border border-line px-3 text-xs font-semibold tracking-wide"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={text.language}
        onClick={() => setOpen((value) => !value)}
      >
        <Languages className="size-4" aria-hidden />
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
    <div className="min-h-screen bg-ink text-fg">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
      >
        {text.skip}
      </a>
      <header className="sticky top-0 z-40 border-b border-line bg-ink/95 backdrop-blur print:hidden">
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
      <main id="contenu">{children}</main>
      <footer className="border-t border-neutral-200 bg-white pb-8 text-neutral-800 print:hidden">
        <div className="border-b border-[#16306e] bg-[#010b40]">
          <div className="mx-auto flex w-full max-w-6xl items-center px-5 py-4 md:px-8">
            <img
              src="/media/logo-mark-ui.webp"
              alt="WIKENVA"
              width={480}
              height={266}
              loading="lazy"
              decoding="async"
              className="h-12 w-auto"
            />
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="max-w-xs text-sm text-neutral-600">
              {tr("La plateforme des créateurs, des auteurs et des lecteurs.")}
            </p>
            <p className="mt-3 flex flex-col gap-1 text-sm">
              <a href="mailto:wikenva@gmail.com" className="font-semibold text-neutral-900 hover:underline">
                wikenva@gmail.com
              </a>
              <a href="tel:+22996412117" className="font-semibold text-neutral-900 hover:underline">
                +229 96 41 21 17
              </a>
            </p>
          </div>
          <nav aria-label={tr("Liens du bas de page")}>
            <ul className="flex flex-col gap-3 text-sm md:flex-row md:gap-6">
              <li>
                <Link to="/vision" className="hover:text-neutral-950">
                  {tr("À propos")}
                </Link>
              </li>
              <li>
                <Link to="/communaute" className="hover:text-neutral-950">
                  {tr("Contact")}
                </Link>
              </li>
              <li>
                <Link to="/confidentialite" className="hover:text-neutral-950">
                  {label("/confidentialite", "Politique de confidentialité")}
                </Link>
              </li>
              <li>
                <Link to="/conditions" className="hover:text-neutral-950">
                  {label("/conditions", "Conditions d'utilisation")}
                </Link>
              </li>
            </ul>
          </nav>
          <ul className="flex items-center gap-3">
            {socials.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.name}
                  className="grid size-11 place-items-center rounded-full"
                  style={item.id === "whatsapp" ? { background: "#25D366" } : undefined}
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
                    width={24}
                    height={24}
                    className="size-6"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mx-auto w-full max-w-6xl px-5 text-xs text-neutral-500 md:px-8">{tr("© 2026 WIKENVA")}</p>
      </footer>
    </div>
  );
}
