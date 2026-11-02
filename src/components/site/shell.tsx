import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Briefcase, Check, ChevronDown, Home, Menu, MessagesSquare, Phone, Store, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { mainNav, moreNav, socials } from "@/content/site";
import { ui } from "@/content/ui-copy";
import { cn } from "@/lib/cn";
import { languages, useLang, useTr, type Lang } from "@/lib/locale";
import { SocialList } from "./blocks";
import { PartnerButton, GmailMark } from "./ui";

function isActive(pathname: string, to: string) {
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function SiteShell({ children }: { children: ReactNode }) {
  return <Shell>{children}</Shell>;
}

function LanguageMenu() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const text = ui(lang);
  const current = languages.find((item) => item.id === lang) ?? languages[0];

  function choose(next: Lang) {
    setLang(next);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    function onPointer(event: MouseEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={root}>
      <button
        type="button"
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-panel/60 px-2.5 text-xs font-semibold"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={text.language}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="text-base leading-none" aria-hidden>
          {current.flag}
        </span>
        <span className="tracking-wide">{current.short}</span>
      </button>
      {open ? (
        <ul
          role="listbox"
          aria-label={text.language}
          className="absolute end-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-line bg-panel py-1 shadow-[0_12px_40px_rgba(0,0,0,0.28)]"
        >
          {languages.map((item) => {
            const selected = lang === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={cn(
                    "flex min-h-11 w-full items-center gap-2.5 px-3 text-start text-sm",
                    selected ? "bg-ink font-semibold text-gold" : "text-fg hover:bg-ink",
                  )}
                  onClick={() => choose(item.id)}
                >
                  <span className="text-lg leading-none" aria-hidden>
                    {item.flag}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {selected ? <Check className="size-3.5 shrink-0 text-gold" aria-hidden /> : null}
                </button>
              </li>
            );
          })}
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
  const { lang } = useLang();
  const text = ui(lang);
  const tr = useTr();
  const label = (to: string, fallback: string) => text.nav[to] ?? fallback;
  const whatsapp = socials.find((item) => item.id === "whatsapp")?.href;
  const facebook = socials.find((item) => item.id === "facebook")?.href;

  useEffect(() => {
    setOpen(false);
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
          <nav className="hidden items-center gap-4 lg:flex" aria-label="Navigation principale">
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
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <PartnerButton className="hidden px-4 lg:inline-flex" />
            <LanguageMenu />
            <button
              type="button"
              className="grid h-12 w-12 place-items-center rounded-full border border-line lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X aria-hidden /> : <Menu aria-hidden />}
              <span className="sr-only">{open ? text.closeMenu : text.openMenu}</span>
            </button>
          </div>
        </div>
        {open ? (
          <nav id="menu-mobile" className="border-t border-line bg-ink lg:hidden" aria-label="Menu">
            <ul className="mx-auto w-full max-w-6xl px-6 py-3">
              {(
                [
                  ["/", "Accueil", Home],
                  ["/vision", "Vision", BookOpen],
                  ["/presentation", "Marketplace", Store],
                  ["/partenaires", "Partenaires", Briefcase],
                  ["/communaute", "Contact", MessagesSquare],
                ] as const
              ).map(([to, name, Icon]) => {
                const active = to === "/" ? pathname === "/" : isActive(pathname, to);
                return (
                  <li key={to}>
                    <Link to={to} className="flex min-h-14 items-center gap-5">
                      <Icon className={cn("size-6 shrink-0 stroke-[1.6]", active ? "text-gold" : "text-faint")} aria-hidden />
                      <span className={cn("text-lg", active ? "text-gold underline decoration-gold underline-offset-4" : "text-muted")}>
                        {tr(name)}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
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
          <div className="mt-5 grid max-w-sm gap-2.5 text-sm">
            <a href="mailto:contact.wikenva@gmail.com" className="inline-flex items-center gap-2.5 font-semibold text-gold">
              <GmailMark />
              <span className="min-w-0 break-all">contact.wikenva@gmail.com</span>
            </a>
            <a href="tel:+2290196412117" className="inline-flex items-center gap-2.5 font-semibold">
              <Phone className="size-5 shrink-0 text-gold" aria-hidden />
              +229 01 96 41 21 17
            </a>
          </div>
          <nav className="mt-6" aria-label={tr("Liens du bas de page")}>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
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
          <div className="mt-8 max-w-xl">
            <SocialList />
          </div>
          <p className="mt-8 border-t border-line pt-4 text-xs text-faint">{tr("© 2026 WIKENVA")}</p>
        </div>
      </footer>
      {whatsapp || facebook ? (
        <div className="fixed right-4 bottom-5 z-40 flex flex-col gap-3 print:hidden">
          {whatsapp ? (
            <a
              href={whatsapp}
              target="_top"
              aria-label={tr("Groupe WhatsApp")}
              className="grid size-14 place-items-center rounded-full bg-[#25D366] shadow-[0_8px_24px_rgba(0,0,0,0.28)]"
            >
              <img src="/media/social/whatsapp.svg" alt="" width={28} height={28} className="size-7" />
            </a>
          ) : null}
          {facebook ? (
            <a
              href={facebook}
              target="_blank"
              rel="noreferrer"
              aria-label={tr("Page Facebook")}
              className="grid size-14 place-items-center rounded-full bg-[#1877F2] shadow-[0_8px_24px_rgba(0,0,0,0.28)]"
            >
              <svg viewBox="0 0 24 24" className="size-7 fill-white" aria-hidden>
                <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
              </svg>
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
