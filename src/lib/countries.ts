import type { Lang } from "@/lib/i18n";

/** Codes ISO 3166-1 alpha-2 des pays et territoires. Les noms viennent du navigateur (Intl). */
const CODES = (
  "AF ZA AL DZ DE AD AO AG SA AR AM AU AT AZ BS BH BD BB BE BZ BJ BT BY MM BO BA BW BR BN BG BF BI " +
  "KH CM CA CV CF CL CN CY CO KM CG CD KP KR CR CI HR CU DK DJ DM EG AE EC ER ES EE SZ US ET FJ FI FR " +
  "GA GM GE GH GR GD GT GN GW GQ GY HT HN HU IN ID IQ IR IE IS IL IT JM JP JO KZ KE KG KI XK KW LA LS " +
  "LV LB LR LY LI LT LU MK MG MY MW MV ML MT MA MH MU MR MX FM MD MC MN ME MZ NA NR NP NI NE NG NO NZ " +
  "OM UG UZ PK PW PS PA PG PY NL PE PH PL PT QA RO GB RU RW KN SM VC LC SB SV WS ST SN RS SC SL SG SK " +
  "SI SO SD SS LK SE CH SR SY TJ TW TZ TD CZ TH TL TG TO TT TN TM TR TV UA UY VU VA VE VN YE ZM ZW " +
  "HK MO PR RE YT GP MQ GF NC PF EH GL"
).split(" ");

/** Pays mis en avant quand le champ est vide (communauté principale de WIKENVA). */
export const FEATURED = ["BJ", "TG", "CI", "SN", "BF", "ML", "NE", "CM", "MA", "FR", "BE", "CA"];

export type Country = { code: string; name: string; key: string };

/** Minuscules sans accents ni ponctuation, pour comparer « cote d'ivoire » et « Côte d’Ivoire ». */
export function fold(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[’'`\-.,()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const cache = new Map<Lang, Country[]>();

export function getCountries(lang: Lang): Country[] {
  const hit = cache.get(lang);
  if (hit) return hit;
  let names: Intl.DisplayNames | null = null;
  try {
    names = new Intl.DisplayNames([lang], { type: "region" });
  } catch {
    names = null;
  }
  const list = CODES.map((code) => {
    const name = (code === "XK" ? "Kosovo" : names?.of(code)) ?? code;
    return { code, name, key: fold(name) };
  }).sort((a, b) => a.name.localeCompare(b.name, lang));
  cache.set(lang, list);
  return list;
}

/** Suggestions : d'abord les noms qui commencent par la saisie, puis ceux dont un mot commence par elle. */
export function searchCountries(query: string, lang: Lang, limit = 8): Country[] {
  const all = getCountries(lang);
  const q = fold(query);
  if (!q) return FEATURED.map((c) => all.find((x) => x.code === c)).filter((x): x is Country => !!x);
  const starts: Country[] = [];
  const words: Country[] = [];
  for (const c of all) {
    if (c.key.startsWith(q)) starts.push(c);
    else if (c.key.split(" ").some((w) => w.startsWith(q)) || c.key.includes(" " + q)) words.push(c);
  }
  return [...starts, ...words].slice(0, limit);
}

/** Nom officiel si la saisie correspond exactement à un pays (accents et majuscules ignorés). */
export function matchCountry(input: string, lang: Lang): Country | undefined {
  const q = fold(input);
  if (!q) return undefined;
  return getCountries(lang).find((c) => c.key === q);
}
