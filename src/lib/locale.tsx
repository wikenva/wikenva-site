import { createContext, useContext, useLayoutEffect, useState, type ReactNode } from "react";
import { ar } from "@/content/ar";
import { en } from "@/content/en";
import { es } from "@/content/es";
import { pt } from "@/content/pt";

export type Lang = "fr" | "en" | "ar" | "es" | "pt";

export const languages = [
  { id: "fr", label: "Français", short: "FR", flag: "🇫🇷" },
  { id: "en", label: "English", short: "EN", flag: "🇬🇧" },
  { id: "ar", label: "العربية", short: "AR", flag: "🇸🇦" },
  { id: "es", label: "Español", short: "ES", flag: "🇪🇸" },
  { id: "pt", label: "Português", short: "PT", flag: "🇵🇹" },
] as const;

const KEY = "wikenva-lang";
const packs: Record<Exclude<Lang, "fr">, Record<string, string>> = { en, es, pt, ar };

const LocaleContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void }>({
  lang: "fr",
  setLang: () => {},
});

function isLang(value: string | null): value is Lang {
  return value === "fr" || value === "en" || value === "ar" || value === "es" || value === "pt";
}

function browserLang(): Lang {
  const list = typeof navigator === "undefined" ? [] : navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const item of list) {
    const code = item.toLowerCase();
    if (code.startsWith("ar")) return "ar";
    if (code.startsWith("es")) return "es";
    if (code.startsWith("pt")) return "pt";
    if (code.startsWith("en")) return "en";
    if (code.startsWith("fr")) return "fr";
  }
  return "fr";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useLayoutEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch {
      saved = null;
    }
    setLangState(isLang(saved) ? saved : browserLang());
  }, []);

  useLayoutEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  function setLang(next: Lang) {
    setLangState(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* préférence non enregistrée si le stockage est bloqué */
    }
  }

  return <LocaleContext.Provider value={{ lang, setLang }}>{children}</LocaleContext.Provider>;
}

export function useLang() {
  return useContext(LocaleContext);
}

export function useTr() {
  const { lang } = useLang();
  return (text: string) => {
    if (lang === "fr") return text;
    return packs[lang][text] ?? (lang === "en" ? text : en[text] ?? text);
  };
}
