import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useState } from "react";
import {
  categoryLabels,
  documents,
  isPending,
  isUrl,
  news,
  phases,
  shown,
  site,
  socials,
  roles,
  type NewsItem,
  type Phase,
} from "@/content/site";
import { cn } from "@/lib/cn";
import { useTr } from "@/lib/locale";
import { Button, ExternalLink, Panel, PendingDialog, PendingValue, TextLink } from "./ui";
import { InterestSignal } from "./interest-form";

export function Roadmap({ compact = false }: { compact?: boolean }) {
  const [current, setCurrent] = useState(0);
  const tr = useTr();
  const phase = phases[current] ?? phases[0];

  return (
    <div>
      <ol className="flex gap-2 overflow-x-auto pb-1 lg:grid lg:grid-cols-5 lg:overflow-visible">
        {phases.map((item, index) => (
          <li key={item.id} className="min-w-[8.5rem] shrink-0 lg:min-w-0">
            <button
              type="button"
              aria-pressed={index === current}
              onClick={() => setCurrent(index)}
              className={cn(
                "flex h-full w-full flex-col items-start rounded-2xl border px-4 py-4 text-left transition-[background-color,border-color] duration-150",
                index === current
                  ? "border-gold bg-panel-2"
                  : "border-line bg-panel hover:border-faint",
              )}
            >
              <span className="font-display text-sm font-semibold text-gold">{item.index}</span>
              <span className="mt-2 font-display text-lg font-semibold">{tr(item.name)}</span>
              <span className="mt-3 text-sm text-muted">{tr(item.status)}</span>
            </button>
          </li>
        ))}
      </ol>
      {phase ? <PhaseDetail phase={phase} /> : null}
      <p className="mt-6 text-sm text-muted">
        {tr("Aucune phase n'est présentée comme achevée. Les dates et les livrables précis seront ajoutés avec les annonces officielles.")}
      </p>
      {compact ? (
        <TextLink to="/feuille-de-route" variant="ghost" className="mt-6">
          {tr("Voir la feuille de route")}
        </TextLink>
      ) : null}
    </div>
  );
}

function PhaseDetail({ phase }: { phase: Phase }) {
  const tr = useTr();
  return (
    <Panel className="mt-4" >
      <div aria-live="polite">
        <p className="text-sm font-semibold tracking-widest text-gold uppercase">{tr(phase.title)}</p>
        <h3 className="mt-3 font-display text-2xl font-semibold">{tr(phase.summary)}</h3>
        <ul className="mt-6 grid gap-3">
          {phase.points.map((point) => (
            <li key={point} className="flex gap-3 text-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
              <span>{tr(point)}</span>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}

const tokenFields = [
  { label: "Nom", value: site.token.name },
  { label: "Symbole", value: site.token.symbol },
  { label: "Blockchain", value: site.token.blockchain },
  { label: "Offre totale", value: site.token.totalSupply },
  { label: "Statut", value: site.token.status },
] as const;

export function TokenPanel() {
  const tr = useTr();
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="grid gap-6">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-ink p-4 text-center sm:flex-row sm:items-center sm:gap-6 sm:p-6 sm:text-left">
          <img
            src="/media/logo-official.jpg"
            alt={tr("Logo officiel WIKENVA")}
            width={1254}
            height={1254}
            decoding="async"
            className="h-32 w-32 shrink-0 rounded-2xl object-contain sm:h-40 sm:w-40"
          />
          <div>
            <p className="font-display text-2xl font-semibold tracking-wide sm:text-4xl">WIKENVA TOKEN</p>
            <p className="mt-2 text-sm text-muted">{tr(site.token.status)}</p>
          </div>
        </div>
        <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {tokenFields.map((field) => (
            <div key={field.label} className="bg-panel p-5">
              <dt className="text-sm text-faint">{tr(field.label)}</dt>
              <dd className="mt-2">
                <PendingValue value={field.value} />
              </dd>
            </div>
          ))}
        </dl>
        <Panel>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-sm text-faint">{tr("Adresse du contrat")}</h3>
              <p className="mt-2 font-semibold break-all">
                {isPending(site.token.contractAddress) ? (
                  tr("Pas encore disponible")
                ) : (
                  shown(site.token.contractAddress)
                )}
              </p>
            </div>
            <CopyAddress value={site.token.contractAddress} />
          </div>
        </Panel>
        <Panel>
          <h3 className="font-display text-2xl font-semibold">{tr("Utilité du token")}</h3>
          <p className="mt-4 text-muted">
            {isPending(site.token.utility)
              ? tr("À compléter. Le rôle du WIKENVA TOKEN sera décrit ici lorsqu'il sera officiellement défini. Aucune utilité n'est supposée.")
              : site.token.utility}
          </p>
        </Panel>
        <Panel className="border-gold/40">
          <p className="text-sm font-semibold tracking-widest text-gold uppercase">{tr("Tokenomics")}</p>
          <h3 className="mt-3 font-display text-3xl font-semibold">{tr("Tokenomics")}</h3>
          {site.tokenomics.length === 0 ? (
            <p className="mt-5 text-lg leading-relaxed text-fg">
              {tr("À compléter. La répartition officielle — parts, vestings, éventuelles réserves — sera publiée ici sans estimation.")}
            </p>
          ) : (
            <>
              <p className="mt-5 text-muted">
                {tr("Offre confirmée : 100 000 000 actions WIKENVA. Les calendriers de vesting ne sont pas encore publiés.")}
              </p>
              <ul className="mt-6 grid gap-3 md:hidden">
                {site.tokenomics.map((row) => (
                  <li key={row.label} className="border-t border-line pt-3">
                    <p className="font-semibold">{tr(row.label)}</p>
                    <p className="mt-1 text-gold tabular-nums">{tr(row.share)}</p>
                    <p className="text-sm text-muted">{tr(row.detail)}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 hidden overflow-x-auto md:block">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-line text-sm text-faint">
                      <th className="py-3 font-semibold">{tr("Allocation")}</th>
                      <th className="py-3 font-semibold">{tr("Part")}</th>
                      <th className="py-3 font-semibold">{tr("Quantité")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {site.tokenomics.map((row) => (
                      <tr key={row.label} className="border-b border-line">
                        <td className="py-3 pr-4 font-semibold">{tr(row.label)}</td>
                        <td className="py-3 pr-4 text-gold tabular-nums">{tr(row.share)}</td>
                        <td className="py-3 text-muted">{tr(row.detail)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          <p className="mt-6 border-t border-line pt-4 text-sm text-muted">
            {tr("WIKENVA — Une vision claire, un écosystème à construire.")}
          </p>
        </Panel>
      </div>
      <figure className="overflow-hidden rounded-2xl border border-line bg-ink">
        <img
          src="/media/token-coin.png"
          alt={tr("Visuel conceptuel du WIKENVA TOKEN : médaille bleue et or portant le logo officiel.")}
          width={1254}
          height={1254}
          loading="lazy"
          decoding="async"
          className="aspect-square w-full object-cover"
        />
        <figcaption className="border-t border-line px-5 py-4">
          <img
            src="/media/logo-official.jpg"
            alt=""
            width={480}
            height={266}
            loading="lazy"
            decoding="async"
            className="mb-3 h-7 w-auto"
          />
          <p className="text-sm text-muted">
            {tr("Visuel conceptuel du token. Il ne représente pas une pièce ayant cours légal ni une valeur de marché.")}
          </p>
        </figcaption>
      </figure>
    </div>
  );
}

function CopyAddress({ value }: { value: string | null }) {
  const [copied, setCopied] = useState(false);
  const tr = useTr();
  const disabled = isPending(value);

  async function copy() {
    if (disabled || !value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Button type="button" variant="ghost" onClick={copy} disabled={disabled} aria-live="polite">
      {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
      {disabled ? tr("Copie désactivée") : copied ? tr("Adresse copiée") : tr("Copier l'adresse")}
    </Button>
  );
}

export function useOfficialGate() {
  const [notice, setNotice] = useState<{ title: string; body: string } | null>(null);
  return {
    notice,
    close: () => setNotice(null),
    ask(title: string, body: string) {
      setNotice({ title, body });
    },
  };
}

export function OfficialGate({
  notice,
  onClose,
}: {
  notice: { title: string; body: string } | null;
  onClose: () => void;
}) {
  return (
    <PendingDialog
      open={notice != null}
      title={notice?.title ?? ""}
      body={notice?.body ?? ""}
      onClose={onClose}
    />
  );
}

const INVEST_BODY =
  "La plateforme officielle d'investissement de WIKENVA n'est pas encore reliée. Aucun lien externe n'est proposé tant qu'une adresse officielle n'a pas été configurée.";

const PAPER_BODY =
  "Le white paper officiel n'est pas encore disponible. La lecture et le téléchargement seront activés lorsque le document sera publié.";

export function InvestActions() {
  const gate = useOfficialGate();
  const tr = useTr();
  const investReady = isUrl(site.investUrl);
  const readReady = isUrl(site.whitepaper.readUrl);
  const downloadReady = isUrl(site.whitepaper.downloadUrl);

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {investReady ? (
          <ExternalLink href={site.investUrl ?? ""} variant="gold">
            {tr("Investir sur SidraStart")}
          </ExternalLink>
        ) : (
          <Button variant="gold" onClick={() => gate.ask(tr("Investissement"), tr(INVEST_BODY))}>
            {tr("Investir sur SidraStart")}
          </Button>
        )}
        {downloadReady ? (
          <ExternalLink href={site.whitepaper.downloadUrl ?? ""} variant="primary">
            {tr("Télécharger le white paper")}
          </ExternalLink>
        ) : (
          <Button variant="primary" onClick={() => gate.ask("White paper", tr(PAPER_BODY))}>
            {tr("Télécharger le white paper")}
          </Button>
        )}
      </div>
      <OfficialGate notice={gate.notice} onClose={gate.close} />
      <InterestSignal />
    </>
  );
}

export function WhitepaperActions() {
  const gate = useOfficialGate();
  const tr = useTr();
  const readReady = isUrl(site.whitepaper.readUrl);
  const downloadReady = isUrl(site.whitepaper.downloadUrl);

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row">
        {readReady ? (
          <ExternalLink href={site.whitepaper.readUrl ?? ""} variant="primary">
            {tr("Lire le white paper")}
          </ExternalLink>
        ) : (
          <Button onClick={() => gate.ask("White paper", tr(PAPER_BODY))}>{tr("Lire le white paper")}</Button>
        )}
        {downloadReady ? (
          <ExternalLink href={site.whitepaper.downloadUrl ?? ""} variant="ghost">
            {tr("Télécharger le white paper")}
          </ExternalLink>
        ) : (
          <Button variant="ghost" onClick={() => gate.ask("White paper", tr(PAPER_BODY))}>
            {tr("Télécharger le white paper")}
          </Button>
        )}
      </div>
      <OfficialGate notice={gate.notice} onClose={gate.close} />
    </>
  );
}

export function NewsCards({ items = news }: { items?: NewsItem[] }) {
  const tr = useTr();
  if (items.length === 0) {
    return (
      <Panel>
        <p className="font-display text-2xl font-semibold">{tr("Aucune actualité pour le moment")}</p>
        <p className="mt-3 text-muted">
          {tr("Les nouvelles du projet, les mises à jour, les annonces, les partenariats et les événements confirmés apparaîtront ici.")}
        </p>
      </Panel>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <article key={item.slug} className="rounded-2xl border border-line bg-panel p-6">
          {item.image ? (
            <img
              src={item.image}
              alt=""
              width={640}
              height={360}
              loading="lazy"
              decoding="async"
              className="mb-4 aspect-[16/9] w-full rounded-xl object-cover"
            />
          ) : null}
          <p className="text-sm font-semibold text-gold">
            {tr(categoryLabels[item.category])} · {tr(item.date)}
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold">
            <Link to="/actualites/$slug" params={{ slug: item.slug }} className="hover:text-gold">
              {tr(item.title)}
            </Link>
          </h3>
          <p className="mt-3 text-muted">{tr(item.excerpt)}</p>
          <Link
            to="/actualites/$slug"
            params={{ slug: item.slug }}
            className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-fg"
          >
            {tr("Lire")} <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </article>
      ))}
    </div>
  );
}

export function RoleBoard() {
  const tr = useTr();
  const [active, setActive] = useState(0);
  const role = roles[active];

  return (
    <div className="grid gap-3 lg:grid-cols-[15rem_1fr] lg:items-stretch">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1" role="tablist" aria-label={tr("Choisissez un rôle")}>
        {roles.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.name}
              type="button"
              role="tab"
              aria-selected={selected}
              className={cn(
                "min-h-12 rounded-full border px-3 text-sm font-semibold transition-colors",
                selected ? "border-gold bg-gold text-ink" : "border-line bg-panel text-fg hover:border-gold",
              )}
              onClick={() => setActive(index)}
            >
              {tr(item.name)}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="flex flex-col justify-center rounded-2xl border border-gold/40 bg-panel p-6 md:p-10">
        <p className="text-sm font-semibold tracking-widest text-gold">0{active + 1}</p>
        <h3 className="mt-3 font-display text-4xl font-semibold md:text-6xl">{tr(role.name)}</h3>
        <p className="mt-4 max-w-2xl text-xl leading-relaxed text-fg md:text-2xl">{tr(role.detail)}</p>
      </div>
    </div>
  );
}

const socialMarks: Record<string, { src: string; plate: string }> = {
  facebook: { src: "/media/social/facebook.svg", plate: "transparent" },
  whatsapp: { src: "/media/social/whatsapp.svg", plate: "#25D366" },
  telegram: { src: "/media/social/telegram.svg", plate: "transparent" },
  twitter: { src: "/media/social/x.svg", plate: "#ffffff" },
};

export function SocialGrid() {
  const tr = useTr();
  return (
    <ul className="mx-auto flex items-center justify-center gap-5 sm:gap-6">
      {socials.map((item) => {
        const mark = socialMarks[item.id];
        const icon = (
          <span
            className="grid size-11 shrink-0 place-items-center rounded-2xl border border-line/70 bg-panel shadow-[0_6px_16px_rgba(0,0,0,0.28)] sm:size-12"
            style={{ background: mark?.plate === "transparent" ? undefined : mark?.plate }}
          >
            {mark ? (
              <img
                src={mark.src}
                alt=""
                width={32}
                height={32}
                className={item.id === "whatsapp" || item.id === "twitter" ? "size-4" : "size-6"}
              />
            ) : null}
          </span>
        );
        return (
          <li key={item.id}>
            {isUrl(item.href) ? (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={tr(item.name)}
                className="block"
              >
                {icon}
              </a>
            ) : (
              <div className="opacity-60">{icon}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function DocumentList() {
  const tr = useTr();
  return (
    <ul className="grid gap-4">
      {documents.map((item) => (
        <li key={item.id} className="rounded-2xl border border-line bg-panel p-6 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <h3 className="font-display text-2xl font-semibold">{tr(item.title)}</h3>
            <p className="mt-2 max-w-2xl text-muted">{tr(item.description)}</p>
          </div>
          <div className="mt-5 shrink-0 md:mt-0">
            {isUrl(item.href) ? (
              item.href.startsWith("/") ? (
                <TextLink to={item.href} variant="ghost">
                  {tr("Consulter")}
                </TextLink>
              ) : (
                <ExternalLink href={item.href} variant="ghost">
                  {tr("Ouvrir")}
                </ExternalLink>
              )
            ) : (
              <span className="text-sm font-semibold text-gold">{tr("Document — À compléter")}</span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
