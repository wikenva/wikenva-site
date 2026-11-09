/**
 * Traduction automatique FR → EN au rendu.
 * Les fichiers du site déclarent `@jsxImportSource @/lib/tx` : chaque texte français écrit
 * dans le JSX (ou venant de la configuration) est remplacé par sa version anglaise
 * (dictionnaire en.json) quand le visiteur choisit EN. Le texte français reste la source.
 */
import * as R from "react/jsx-runtime";
import { useLang } from "@/lib/i18n";
import en from "./en.json";

const dict = en as Record<string, string>;
const ATTRS = ["alt", "aria-label", "placeholder", "title"] as const;
const norm = (s: string) => s.replace(/\s+/g, " ").trim();

/** Traduit une chaîne si elle figure au dictionnaire (espaces de bord conservés). */
export function translate(s: string, lang: string): string {
  if (lang !== "en") return s;
  const key = norm(s);
  const hit = dict[key];
  if (!hit) return s;
  const lead = /^\s/.test(s) ? " " : "";
  const trail = /\s$/.test(s) ? " " : "";
  return lead + hit + trail;
}
const has = (s: unknown): s is string => typeof s === "string" && norm(s) in dict;

function Tx({ s }: { s: string }) {
  const { lang } = useLang();
  return translate(s, lang);
}

function TxAttrs({ __type, __props }: { __type: any; __props: any }) {
  const { lang } = useLang();
  const props = { ...__props };
  for (const a of ATTRS) if (typeof props[a] === "string") props[a] = translate(props[a], lang);
  return (Array.isArray(props.children) ? R.jsxs : R.jsx)(__type, props);
}

function mapChild(c: unknown): unknown {
  return has(c) ? R.jsx(Tx, { s: c }) : c;
}

export function prepare(type: any, props: any, key: any, make: (t: any, p: any, k: any) => any) {
  if (props && props.children !== undefined) {
    const c = props.children;
    if (Array.isArray(c)) {
      if (c.some(has)) props = { ...props, children: c.map(mapChild) };
    } else if (has(c)) props = { ...props, children: R.jsx(Tx, { s: c }) };
  }
  if (typeof type === "string" && props && ATTRS.some((a) => has(props[a]))) {
    return make(TxAttrs, { __type: type, __props: props }, key);
  }
  return make(type, props, key);
}
