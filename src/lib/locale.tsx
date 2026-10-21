import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ar, es, pt } from "@/content/extra-langs";
import { en } from "@/content/en";

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

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (isLang(saved)) setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  function setLang(next: Lang) {
    setLangState(next);
    localStorage.setItem(KEY, next);
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
