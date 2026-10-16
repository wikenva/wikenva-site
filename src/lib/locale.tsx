import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { en } from "@/content/en";

export type Lang = "fr" | "en";

const KEY = "wikenva-lang";

const LocaleContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void }>({
  lang: "fr",
  setLang: () => {},
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved === "en" || saved === "fr") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "fr";
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
  return (text: string) => (lang === "en" ? (en[text] ?? text) : text);
}
