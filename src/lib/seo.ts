import { pick, type Bi, type Lang } from "@/lib/i18n";
import { translate } from "@/lib/tx/core";
import { links } from "@/config/site";

/** Traduit les balises title/description d'un head() existant. */
export function txMeta<T extends { title?: string; content?: string }>(meta: T[], lang: Lang): T[] {
  return meta.map((m) => ({
    ...m,
    ...(m.title ? { title: translate(m.title, lang) } : {}),
    ...(m.content ? { content: translate(m.content, lang) } : {}),
  }));
}

/** Métadonnées d'une page. Dans head(), passez `match.context.lang`. */
export function pageHead(
  title: Bi | string,
  description: Bi | string,
  path: string,
  lang: Lang = "fr",
) {
  const fullTitle = `${translate(pick(title, lang), lang)} — WIKENVA`;
  const desc = translate(pick(description, lang), lang);
  const url = new URL(path, links.officialSite).toString();
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: desc },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: desc },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:locale", content: lang === "en" ? "en_US" : "fr_FR" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: desc },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
