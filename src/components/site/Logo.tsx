/** @jsxImportSource @/lib/tx */
import { Link } from "@tanstack/react-router";
import logo from "@/assets/wikenva_logo_official.webp.asset.json";
import { cn } from "@/lib/utils";

/**
 * Logo officiel WIKENVA sans cadre, couleurs d'origine (W blanc, plis bleus, trait or).
 * Le W étant blanc, il se place uniquement sur un fond encre (.theme-ink).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src={logo.url}
      alt="Logo WIKENVA"
      width={512}
      height={278}
      className={cn("h-7 w-auto shrink-0 object-contain", className)}
    />
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" aria-label="WIKENVA — Accueil" className={cn("flex min-w-0 items-center gap-2", className)}>
      <LogoMark />
      <span className="font-sans text-[12.5px] font-extrabold leading-none tracking-[0.12em] text-foreground">WIKENVA</span>
    </Link>
  );
}
