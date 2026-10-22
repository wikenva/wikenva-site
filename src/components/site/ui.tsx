import { Link } from "@tanstack/react-router";
import { AppWindow, Handshake } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { PENDING, isPending } from "@/content/site";
import { ui } from "@/content/ui-copy";
import { useLang, useTr } from "@/lib/locale";

type Variant = "primary" | "gold" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-blue text-fg hover:bg-blue-deep",
  gold: "bg-gold text-ink hover:opacity-90",
  ghost: "border border-line bg-transparent text-fg hover:bg-panel",
};

const control =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-center text-sm font-semibold transition-[transform,background-color,opacity] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold active:not-disabled:scale-[0.98] disabled:opacity-50";

export function PlatformButton({
  className,
  appearance = "default",
  variant = "primary",
}: {
  className?: string;
  appearance?: "default" | "app";
  variant?: "primary" | "ghost";
}) {
  const [open, setOpen] = useState(false);
  const { lang } = useLang();
  const text = ui(lang);
  return (
    <>
      {appearance === "app" ? (
        <button
          type="button"
          className={cn(
            control,
            "border border-line bg-panel text-fg not-italic shadow-none hover:bg-panel-2",
            className,
          )}
          onClick={() => setOpen(true)}
        >
          <AppWindow aria-hidden className="size-4 shrink-0" />
          WIKENVA APP
        </button>
      ) : (
        <Button variant={variant} className={className} onClick={() => setOpen(true)}>
          {text.platform}
        </Button>
      )}
      <AppSoonDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export function PartnerButton({ className }: { className?: string }) {
  const tr = useTr();
  return (
    <Link
      to="/partenaires"
      className={cn(
        control,
        "bg-gold text-ink shadow-none hover:brightness-105",
        className,
      )}
    >
      <Handshake aria-hidden className="size-4 shrink-0" />
      <span>{tr("Devenir partenaire")}</span>
    </Link>
  );
}

export function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={cn(control, variants[variant], className)} {...props} />;
}

export function TextLink({
  to,
  variant = "primary",
  className,
  children,
}: {
  to: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link to={to} className={cn(control, variants[variant], className)}>
      {children}
    </Link>
  );
}

export function ExternalLink({
  href,
  variant = "ghost",
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      download={href.endsWith(".pdf") ? "" : undefined}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className={cn(control, variants[variant], className)}
    >
      {children}
    </a>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  const tr = useTr();
  return (
    <p className="mb-3 flex items-center gap-3 text-sm font-semibold tracking-widest text-gold uppercase">
      <span className="h-0.5 w-8 bg-gold" aria-hidden />
      {typeof children === "string" ? tr(children) : children}
    </p>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
  className,
  compact = false,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  lede?: string;
  children?: ReactNode;
  className?: string;
  compact?: boolean;
}) {
  const tr = useTr();
  return (
    <section id={id} className={cn(compact ? "py-8 md:py-12" : "py-12 md:py-16", className)}>
      <div className={cn("mx-auto w-full min-w-0 max-w-6xl px-5 md:px-8", compact && "text-center")}>
        {eyebrow ? (
          <div className={compact ? "flex justify-center" : undefined}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        ) : null}
        <h2
          className={cn(
            "max-w-3xl font-display font-semibold text-fg",
            compact ? "mx-auto text-[1.7rem] leading-tight md:text-4xl" : "text-2xl leading-tight md:text-3xl",
          )}
        >
          {tr(title)}
        </h2>
        {lede ? (
          <p
            className={cn(
              "max-w-2xl",
              compact ? "mx-auto mt-2 text-base leading-relaxed text-faint md:text-lg" : "mt-3 text-base text-muted",
            )}
          >
            {tr(lede)}
          </p>
        ) : null}
        {children ? <div className={compact ? "mt-5" : "mt-6"}>{children}</div> : null}
      </div>
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  lede,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  compact?: boolean;
}) {
  const tr = useTr();
  return (
    <header className="border-b border-line">
      <div className={cn("mx-auto w-full max-w-6xl px-5 md:px-8", compact ? "py-6 text-center md:py-8" : "py-8 md:py-12")}>
        <div className={compact ? "flex justify-center" : undefined}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h1
          className={cn(
            "max-w-3xl text-balance font-display font-semibold leading-tight",
            compact ? "mx-auto text-[1.7rem] md:text-4xl" : "text-[1.7rem] md:text-4xl",
          )}
        >
          {tr(title)}
        </h1>
        <div className={cn("mt-4 h-px w-12 bg-gold", compact && "mx-auto")} aria-hidden />
        <p
          className={cn(
            "max-w-xl text-sm leading-relaxed text-muted md:text-base",
            compact ? "mx-auto mt-4" : "mt-4",
          )}
        >
          {tr(lede)}
        </p>
      </div>
    </header>
  );
}

export function PendingValue({ value }: { value: string | null | undefined }) {
  const tr = useTr();
  if (isPending(value)) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-line bg-ink px-3 py-1 text-sm font-semibold text-gold">
        <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
        {tr(PENDING)}
      </span>
    );
  }
  return <span className="font-semibold text-fg">{tr(value ?? "")}</span>;
}

export function Panel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("rounded-2xl border border-line bg-panel p-5", className)}>
      {children}
    </div>
  );
}

export function AppSoonDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang } = useLang();
  const text = ui(lang);
  const [canClose, setCanClose] = useState(false);
  useEffect(() => {
    if (!open) {
      setCanClose(false);
      return;
    }
    const timer = window.setTimeout(() => setCanClose(true), 350);
    return () => window.clearTimeout(timer);
  }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-3 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Fermer"
        className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
        onClick={() => {
          if (canClose) onClose();
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="app-soon-title"
        className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-line bg-[#07111f] text-center"
      >
        <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="px-6 pt-8 pb-6">
          <div className="mx-auto grid size-16 place-items-center rounded-full border border-gold/35 bg-ink">
            <AppWindow aria-hidden className="size-7 text-gold" />
          </div>
          <p className="mt-5 text-[11px] font-semibold tracking-[0.22em] text-gold uppercase">{text.platformSoon}</p>
          <h2 id="app-soon-title" className="mt-2 font-display text-[1.65rem] font-semibold tracking-wide">
            WIKENVA APP
          </h2>
          <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted">{text.platformBody}</p>
          <div className="mx-auto mt-6 h-1 w-28 overflow-hidden rounded-full bg-line" aria-hidden>
            <div className="h-full w-2/5 rounded-full bg-gradient-to-r from-gold to-blue" />
          </div>
          <Button variant="gold" className="mt-6 w-full" onClick={onClose}>
            {text.understood}
          </Button>
          <Link
            to="/actualites"
            onClick={onClose}
            className="mt-3 inline-flex min-h-11 items-center justify-center px-3 text-sm font-semibold text-muted hover:text-fg"
          >
            {text.platformFollow}
          </Link>
        </div>
      </div>
    </div>
  );
}

export function PendingDialog({
  open,
  title,
  body,
  onClose,
}: {
  open: boolean;
  title: string;
  body: string;
  onClose: () => void;
}) {
  const { lang } = useLang();
  const [canClose, setCanClose] = useState(false);
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => setCanClose(true), 400);
    return () => window.clearTimeout(timer);
  }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        aria-label="Fermer"
        className="absolute inset-0 bg-black/75"
        onClick={() => {
          if (canClose) onClose();
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pending-title"
        className="relative w-full max-w-md rounded-3xl border border-gold/50 bg-panel p-6"
      >
        <h2 id="pending-title" className="font-display text-2xl font-semibold">
          {title}
        </h2>
        <p className="mt-4 text-base text-fg">{body}</p>
        <Button className="mt-6 w-full" onClick={onClose}>
          {ui(lang).understood}
        </Button>
      </div>
    </div>
  );
}

export function GmailMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden>
      <path fill="#4285F4" d="M22 7.1v10.4c0 1.1-.9 2-2 2H16V10.1z" />
      <path fill="#34A853" d="M2 17.5V7.1l6 3.1V19.5H4c-1.1 0-2-.9-2-2z" />
      <path fill="#FBBC04" d="M22 7.1 16 10.2 12 7.3 8 10.2 2 7.1 4.6 4.5h14.8z" />
      <path fill="#EA4335" d="M8 10.2v9.3h8v-9.3L12 13.4z" />
    </svg>
  );
}
