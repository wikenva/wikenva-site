import { Link } from "@tanstack/react-router";
import { site } from "@/content/site";
import { useTr } from "@/lib/locale";
import { cn } from "@/lib/cn";
import { ExternalLink } from "./ui";

export type PathId = "sidra" | "partner" | "shareholder";

type PathCard = {
  id: PathId;
  title: string;
  where: string;
  text: string;
  not: string;
  action: string;
  href?: string;
  to?: "/partenaires" | "/investisseurs";
  hash?: string;
};

const paths: PathCard[] = [
  {
    id: "sidra" as const,
    title: "Investir sur SidraStart",
    where: "Sur SidraStart, pas sur ce site",
    text: "Vous ouvrez la fiche Digital Marketplace Ebook Halal et vous investissez depuis votre propre compte.",
    not: "Cela ne crée pas le statut de partenaire et ne vous inscrit pas au programme actionnaires.",
    action: "Investir sur SidraStart",
    href: site.investUrl ?? "",
  },
  {
    id: "partner" as const,
    title: "Devenir partenaire",
    where: "Demande sur ce site, après SidraStart",
    text: "Jusqu'au 24 décembre 2026, après au moins 3 000 SDA investis sur SidraStart, vous pouvez demander une vérification.",
    not: "La demande n'est pas l'investissement. Le statut n'est pas automatique. Ce n'est pas le programme actionnaires.",
    action: "Voir la demande partenaire",
    to: "/partenaires" as const,
    hash: "candidature",
  },
  {
    id: "shareholder" as const,
    title: "Programme actionnaires",
    where: "Autre formulaire, autres règles",
    text: "WIKENVA prévoit 15 % des revenus de la plateforme pour les actionnaires. Les modalités ne sont pas encore publiées.",
    not: "Ce n'est pas la promotion à 3 000 SDA. Ce n'est pas un rendement garanti. La part n'est pas encore acquise.",
    action: "Voir le programme actionnaires",
    to: "/investisseurs" as const,
    hash: "actionnaires",
  },
];

export function PathBoard({ here }: { here?: PathId }) {
  const tr = useTr();
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {paths.map((item) => {
        const current = here === item.id;
        return (
          <article
            key={item.id}
            className={cn(
              "flex flex-col rounded-3xl border p-5",
              current ? "border-gold bg-panel" : "border-line bg-ink",
            )}
          >
            <p className="text-sm font-semibold tracking-wide text-gold uppercase">
              {current ? tr("Vous êtes ici") : tr(item.where)}
            </p>
            {current ? <p className="mt-1 text-sm text-muted">{tr(item.where)}</p> : null}
            <h3 className="mt-2 font-display text-2xl font-semibold">{tr(item.title)}</h3>
            <p className="mt-3 text-sm text-fg">{tr(item.text)}</p>
            <p className="mt-3 flex-1 rounded-2xl border border-line bg-ink px-3 py-3 text-sm text-muted">
              <span className="font-semibold text-fg">{tr("Ce n'est pas. ")}</span>
              {tr(item.not)}
            </p>
            {item.href ? (
              <ExternalLink href={item.href} variant={current ? "gold" : "ghost"} className="mt-5 w-full">
                {tr(item.action)}
              </ExternalLink>
            ) : current ? (
              <a
                href={`#${item.hash ?? ""}`}
                className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-5 text-sm font-semibold text-ink"
              >
                {tr(item.action)}
              </a>
            ) : (
              <Link
                to={item.to ?? "/partenaires"}
                hash={item.hash}
                className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full border border-line px-5 text-sm font-semibold"
              >
                {tr(item.action)}
              </Link>
            )}
          </article>
        );
      })}
    </div>
  );
}
