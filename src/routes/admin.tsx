/** @jsxImportSource @/lib/tx */
import { translate } from "@/lib/tx/core";
import { txMeta } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import type { Session } from "@supabase/supabase-js";
import { Download, Loader2, LogOut, RefreshCw, Search, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Container } from "@/components/site/Section";
import {
  getAdminStatus,
  listPartnerApplications,
  updatePartnerApplication,
} from "@/lib/applications.functions";
import { cn } from "@/lib/utils";
import { txCheckLabels, type TxCheckStatus } from "@/lib/sidrachain";
import { createCsv } from "@/lib/csv";

export const Route = createFileRoute("/admin")({
  head: ({ match }) => ({
    meta: txMeta(
      [
        { title: "Espace équipe — WIKENVA" },
        { name: "description", content: "Espace privé réservé à l'équipe WIKENVA." },
        { property: "og:title", content: "Espace équipe — WIKENVA" },
        { property: "og:description", content: "Espace privé réservé à l'équipe WIKENVA." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        { name: "robots", content: "noindex, nofollow" },
      ],
      match.context.lang,
    ),
  }),
  component: AdminPage,
});

type Status = "nouvelle" | "en_examen" | "acceptee" | "refusee";
/** Trois statuts visibles : « nouvelle » et « en_examen » sont tous deux « En attente ». */
const statuses = [
  { value: "en_examen", label: "En attente", action: "Mettre en attente" },
  { value: "acceptee", label: "Approuvée", action: "Approuver" },
  { value: "refusee", label: "Refusée", action: "Refuser" },
] as const;
type Group = (typeof statuses)[number]["value"];
const group = (s: string): Group => (s === "acceptee" || s === "refusee" ? s : "en_examen");
const labelOf = (s: string | null) => (s ? statuses.find((x) => x.value === group(s))!.label : "—");

const statusStyle: Record<Group, string> = {
  en_examen: "border-gold/40 bg-gold/10 text-gold",
  acceptee: "border-success/40 bg-success/10 text-success",
  refusee: "border-destructive/40 bg-destructive/10 text-destructive",
};

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const clearPrivateData = () => {
      queryClient.removeQueries({ queryKey: ["admin-status"] });
      queryClient.removeQueries({ queryKey: ["applications"] });
    };
    const { data: sub } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (event === "SIGNED_OUT" || event === "SIGNED_IN" || event === "USER_UPDATED")
        clearPrivateData();
      setSession(nextSession);
      setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, [queryClient]);

  if (!ready) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  return session ? <AdminGate userId={session.user.id} /> : <LoginForm />;
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) setError("Identifiants incorrects ou accès non autorisé.");
    setLoading(false);
  }

  return (
    <section className="py-20">
      <Container className="max-w-md">
        <form
          onSubmit={onSubmit}
          className="space-y-5 rounded-3xl border border-border bg-card-glass p-8 shadow-card"
        >
          <div>
            <h1 className="text-2xl font-bold text-foreground">Espace équipe</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Accès réservé aux membres de l'équipe WIKENVA. Aucune inscription publique.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-email">E-mail</Label>
            <Input
              id="admin-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl bg-background/60"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-password">Mot de passe</Label>
            <Input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-xl bg-background/60"
            />
          </div>
          {error && (
            <p role="alert" className="text-sm font-medium text-destructive">
              {error}
            </p>
          )}
          <Button type="submit" variant="hero" size="xl" className="w-full" disabled={loading}>
            {loading && <Loader2 className="animate-spin" />} Se connecter
          </Button>
        </form>
      </Container>
    </section>
  );
}

function AdminGate({ userId }: { userId: string }) {
  const fetchStatus = useServerFn(getAdminStatus);
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-status", userId],
    queryFn: () => fetchStatus(),
  });

  if (isLoading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  if (error || !data?.isAdmin) {
    return (
      <section className="py-20">
        <Container className="max-w-md text-center">
          <ShieldAlert className="mx-auto h-10 w-10 text-gold" />
          <h1 className="mt-4 text-2xl font-bold text-foreground">Accès non autorisé</h1>
          <p className="mt-2 text-muted-foreground">Ce compte n'a pas accès à l'espace équipe.</p>
          <Button variant="glass" className="mt-6" onClick={() => supabase.auth.signOut()}>
            <LogOut /> Se déconnecter
          </Button>
        </Container>
      </section>
    );
  }
  return <Applications userId={userId} />;
}

type Row = Awaited<ReturnType<typeof listPartnerApplications>>[number];

function toCsv(rows: Row[]) {
  const headers = [
    "Date",
    "Nom",
    "E-mail",
    "Pays",
    "Hash",
    "SidraStart",
    "WhatsApp",
    "Motivation",
    "Statut",
    "Notes",
  ];
  const lines = rows.map((r) => [
    r.created_at,
    r.full_name,
    r.email,
    r.country,
    r.tx_hash,
    r.sidrastart_username,
    r.whatsapp,
    r.motivation,
    labelOf(r.status),
    r.admin_notes,
  ]);
  return createCsv(headers, lines);
}

function Applications({ userId }: { userId: string }) {
  const list = useServerFn(listPartnerApplications);
  const qc = useQueryClient();
  const {
    data = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({ queryKey: ["applications", userId], queryFn: () => list() });
  const [filter, setFilter] = useState<Group | "all">("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return data.filter(
      (r) =>
        (filter === "all" || group(r.status) === filter) &&
        (!term ||
          [r.full_name, r.email, r.country, r.whatsapp].some((v) =>
            v?.toLowerCase().includes(term),
          )),
    );
  }, [data, filter, q]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: data.length };
    for (const s of statuses) c[s.value] = data.filter((r) => group(r.status) === s.value).length;
    return c;
  }, [data]);

  function exportCsv() {
    const blob = new Blob([toCsv(filtered)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `candidatures-wikenva-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="py-12">
      <Container>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold text-foreground sm:text-3xl">
              Candidatures au partenariat
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {data.length} candidature(s) reçue(s)
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Button variant="glass" size="sm" onClick={() => refetch()} aria-label="Actualiser">
              <RefreshCw className={cn(isFetching && "animate-spin")} />
            </Button>
            <Button
              variant="glass"
              size="sm"
              onClick={exportCsv}
              disabled={!filtered.length}
              aria-label="Exporter CSV"
            >
              <Download /> <span className="hidden sm:inline">Exporter CSV</span>
            </Button>
            <Button
              variant="glass"
              size="sm"
              onClick={() => supabase.auth.signOut()}
              aria-label="Se déconnecter"
            >
              <LogOut />
            </Button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex flex-wrap gap-2">
            {[{ value: "all", label: "Toutes" } as const, ...statuses].map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setFilter(s.value)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                  filter === s.value
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {s.label} ({counts[s.value] ?? 0})
              </button>
            ))}
          </div>
          <div className="relative md:ml-auto md:w-72">
            <Label htmlFor="application-search" className="sr-only">
              Rechercher une candidature
            </Label>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="application-search"
              placeholder="Rechercher…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="h-10 rounded-full bg-background/60 pl-9"
            />
          </div>
        </div>

        {data.length === 1000 && (
          <p
            role="status"
            className="mt-6 rounded-xl border border-gold/40 bg-gold/10 p-4 text-sm text-foreground"
          >
            Les 1 000 candidatures les plus récentes sont affichées. La recherche et l’export CSV
            portent sur cette sélection.
          </p>
        )}

        {isLoading ? (
          <div className="grid place-items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <div
            role="alert"
            className="mt-10 rounded-2xl border border-destructive/40 bg-destructive/10 p-8 text-center"
          >
            <p className="font-medium text-foreground">
              Les candidatures n’ont pas pu être chargées.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Vérifiez votre connexion puis réessayez. Vos données n’ont pas été modifiées.
            </p>
            <Button variant="glass" className="mt-5" onClick={() => refetch()}>
              <RefreshCw /> Réessayer
            </Button>
          </div>
        ) : filtered.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-border bg-surface p-10 text-center text-muted-foreground">
            {data.length === 0
              ? "Aucune candidature pour le moment."
              : "Aucun résultat pour cette recherche ou ce filtre."}
          </p>
        ) : (
          <ul className="mt-6 grid gap-4">
            {filtered.map((r) => (
              <ApplicationCard
                key={r.id}
                row={r}
                onSaved={() => qc.invalidateQueries({ queryKey: ["applications"] })}
              />
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("fr-FR", { timeZone: "Africa/Porto-Novo" });

function ApplicationCard({ row, onSaved }: { row: Row; onSaved: () => void }) {
  const update = useServerFn(updatePartnerApplication);
  const [notes, setNotes] = useState(row.admin_notes ?? "");
  const [saving, setSaving] = useState(false);

  async function save(patch: { status?: Status; adminNotes?: string }) {
    setSaving(true);
    try {
      await update({ data: { id: row.id, ...patch } });
      toast.success(translate("Candidature mise à jour.", document.documentElement.lang));
      onSaved();
    } catch {
      toast.error(translate("La mise à jour a échoué.", document.documentElement.lang));
    } finally {
      setSaving(false);
    }
  }

  return (
    <li className="rounded-2xl border border-border bg-card-glass p-5 sm:p-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <p className="truncate font-display text-lg font-bold text-foreground">{row.full_name}</p>
          <p className="truncate text-sm text-muted-foreground">
            <a href={`mailto:${row.email}`} className="hover:text-primary">
              {row.email}
            </a>{" "}
            · {row.country}
          </p>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
            statusStyle[group(row.status)],
          )}
        >
          {labelOf(row.status)}
        </span>
      </div>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
        {row.tx_hash && (
          <div className="min-w-0 sm:col-span-2">
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">
              Hash de transaction
            </dt>
            <dd className="mt-1 break-all font-mono text-xs">
              <a
                href={`https://ledger.sidrachain.com/tx/${row.tx_hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {row.tx_hash}
              </a>
            </dd>
            <dd className="mt-1 text-xs text-muted-foreground">
              Contrôle automatique :{" "}
              <span className="font-semibold text-foreground">
                {txCheckLabels[(row.tx_check_status ?? "non_verifiee") as TxCheckStatus]}
              </span>
              {row.tx_value_sda != null && (
                <> · {Number(row.tx_value_sda).toLocaleString("fr-FR")} SDA</>
              )}
              {row.tx_to && (
                <>
                  {" "}
                  · vers <span className="font-mono">{row.tx_to.slice(0, 10)}…</span>
                </>
              )}
              . À confirmer manuellement sur SidraStart.
            </dd>
          </div>
        )}
        {row.sidrastart_username && (
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">SidraStart</dt>
            <dd className="mt-1 text-foreground">{row.sidrastart_username}</dd>
          </div>
        )}
        <div>
          <dt className="text-xs uppercase tracking-wider text-muted-foreground">WhatsApp</dt>
          <dd className="mt-1 text-foreground">{row.whatsapp || "—"}</dd>
        </div>
      </dl>
      {row.motivation && (
        <p className="mt-4 whitespace-pre-line rounded-xl bg-background/50 p-4 text-sm leading-relaxed text-foreground/90">
          {row.motivation}
        </p>
      )}
      <div className="mt-4 grid gap-3 lg:grid-cols-[auto_1fr_auto] lg:items-end">
        <div className="flex flex-wrap gap-2">
          {statuses.map((s) => (
            <Button
              key={s.value}
              type="button"
              size="sm"
              variant={group(row.status) === s.value ? "default" : "glass"}
              disabled={saving || group(row.status) === s.value}
              onClick={() => save({ status: s.value })}
            >
              {s.action}
            </Button>
          ))}
        </div>
        <div>
          <Label htmlFor={`notes-${row.id}`} className="sr-only">
            Notes internes pour {row.full_name}
          </Label>
          <Textarea
            id={`notes-${row.id}`}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            maxLength={2000}
            rows={1}
            placeholder="Notes internes…"
            className="min-h-9 rounded-xl bg-background/60 text-sm"
          />
        </div>
        <Button
          type="button"
          size="sm"
          variant="glass"
          disabled={saving || notes === (row.admin_notes ?? "")}
          onClick={() => save({ adminNotes: notes })}
        >
          Enregistrer la note
        </Button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Reçue le {fmt(row.created_at)}</p>
      {row.application_decisions?.length > 0 && (
        <details className="mt-3 rounded-xl border border-border bg-background/40 p-3 text-xs">
          <summary className="cursor-pointer font-semibold text-foreground">
            Historique des décisions ({row.application_decisions.length})
          </summary>
          <ol className="mt-2 space-y-1 text-muted-foreground">
            {[...row.application_decisions]
              .sort((a, b) => a.created_at.localeCompare(b.created_at))
              .map((d) => (
                <li key={d.id}>
                  {fmt(d.created_at)} — {labelOf(d.from_status)} →{" "}
                  <span className="font-semibold text-foreground">{labelOf(d.to_status)}</span>
                  {d.admin_email && <> · par {d.admin_email}</>}
                </li>
              ))}
          </ol>
        </details>
      )}
    </li>
  );
}
