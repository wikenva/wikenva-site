import { useRouteContext, useRouter } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

export type Lang = "fr" | "en";
/** Texte bilingue. */
export type Bi = { fr: string; en: string };
export const LANG_COOKIE = "wikenva_lang";

export function normalizeLang(v: unknown): Lang {
  return v === "en" ? "en" : "fr";
}

/**
 * Choix fait dans cet onglet. Prioritaire sur le cookie : dans un iframe (aperçu) ou un
 * navigateur qui bloque les cookies, le cookie ne s'écrit pas et le bouton serait sans effet.
 */
let clientLang: Lang | null = null;

function readStoredLang(): Lang | null {
  try {
    const v = window.localStorage.getItem(LANG_COOKIE);
    return v === "en" || v === "fr" ? v : null;
  } catch {
    return null;
  }
}

function readCookieLang(): Lang | null {
  const v = document.cookie.match(/(?:^|; )wikenva_lang=([^;]+)/)?.[1];
  return v === "en" || v === "fr" ? v : null;
}

/** Langue courante : cookie lu côté serveur (SSR) ou navigateur, sans appel réseau. */
export const readLang = createIsomorphicFn()
  .server((): Lang => normalizeLang(getCookie(LANG_COOKIE)))
  .client((): Lang => clientLang ?? normalizeLang(readCookieLang()));

function persistLang(next: Lang) {
  clientLang = next;
  const maxAge = "max-age=31536000; path=/";
  document.cookie = `${LANG_COOKIE}=${next}; ${maxAge}; samesite=lax`;
  if (readCookieLang() !== next && window.isSecureContext) {
    // Contexte tiers (iframe) : cookie partitionné accepté par Chrome / Edge.
    document.cookie = `${LANG_COOKIE}=${next}; ${maxAge}; samesite=none; secure; partitioned`;
  }
  try {
    window.localStorage.setItem(LANG_COOKIE, next);
  } catch {
    /* stockage indisponible : le choix reste valable pour l'onglet */
  }
  document.documentElement.lang = next;
}

/**
 * Après l'hydratation : si le cookie n'a pas pu être lu par le serveur mais qu'un choix
 * est mémorisé localement, on l'applique.
 */
export function restoreStoredLang(current: Lang, apply: (l: Lang) => void) {
  if (readCookieLang()) return;
  const stored = readStoredLang();
  if (stored && stored !== current) apply(stored);
}

export function pick(value: Bi | string, lang: Lang): string {
  return typeof value === "string" ? value : value[lang];
}

/** Hook de traduction : t("Texte FR", "English text"), p(bi) pour un objet { fr, en }. */
export function useLang() {
  const { lang } = useRouteContext({ from: "__root__" });
  const router = useRouter();
  return {
    lang,
    t: (fr: string, en: string) => (lang === "en" ? en : fr),
    p: (v: Bi | string) => pick(v, lang),
    setLang: (next: Lang) => {
      persistLang(next);
      router.invalidate();
    },
  };
}
