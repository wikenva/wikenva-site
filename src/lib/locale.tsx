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

const KEY = "wikenva-lang-2";
const packs: Record<Exclude<Lang, "fr">, Record<string, string>> = { en, es, pt, ar };

const LocaleContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});

function isLang(value: string | null): value is Lang {
  return value === "fr" || value === "en" || value === "ar" || value === "es" || value === "pt";
}

function browserLang(): Lang {
  return "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

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
