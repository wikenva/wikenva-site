import { configuredAdminEmails } from "@/lib/admin-allowlist.server";
import { getSql } from "@/lib/db";
import { assertSameSiteRequest } from "@/lib/auth/isolation.server";
import { resolveAdminEmail } from "@/lib/admin-login.server";
import {
  receptionStatus,
  type ApplicationDecision,
  type ApplicationLookup,
  type CaptureInput,
  type CaptureResult,
  type CaptureRow,
  type InterestInput,
  type InterestKind,
  type InterestList,
  type SubmitResult,
} from "@/lib/interest-config";

export type { CaptureInput, CaptureResult, CaptureRow, InterestInput, InterestKind, InterestList, InterestRow, SubmitResult } from "@/lib/interest-config";

function currentReception() {
  return receptionStatus({
    databaseUrl: process.env.DATABASE_URL,
    authEnabled: process.env.VITE_AUTH_ENABLED,
    adminEmails: process.env.WIKENVA_ADMIN_EMAILS?.trim() || configuredAdminEmails,
    notifyWebhook: process.env.WIKENVA_NOTIFY_WEBHOOK,
  });
}

function parseAmount(value: string): number | null {
  const cleaned = value.trim().toLowerCase().replace(/sda/g, "").replace(/\s/g, "");
  if (!cleaned) return null;
  if (/^\d{1,3}(\.\d{3})+$/.test(cleaned)) return Number(cleaned.replace(/\./g, ""));
  const normalized = cleaned.replace(",", ".");
  if (!/^\d+(\.\d+)?$/.test(normalized)) return null;
  const amount = Number(normalized);
  return Number.isFinite(amount) ? amount : null;
}

function clean(value: string, max: number) {
  return value.trim().slice(0, max);
}

export async function submitInterestRequest(input: InterestInput): Promise<SubmitResult> {
  assertSameSiteRequest();
  const empty: SubmitResult = { recorded: false, notified: false, missing: [], id: null, error: null };
  if (input.kind !== "contribution" && input.kind !== "actionnaire") return { ...empty, error: "kind" };
  if (input.consent !== true) return { ...empty, error: "consent" };
  const email = clean(input.email, 160);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ...empty, error: "email" };
  const name = clean(input.name, 120);
  if (input.kind === "actionnaire" && name.length < 2) return { ...empty, error: "name" };
  const amountText = clean(input.amount, 40);
  const amount = amountText ? parseAmount(amountText) : null;
  if (input.kind === "actionnaire" && (amount === null || amount < 1000)) return { ...empty, error: "amount" };
  if (input.kind === "contribution" && amountText && amount === null) return { ...empty, error: "amount" };

  const reception = currentReception();
  if (!reception.operational) return { ...empty, missing: reception.missing };

  const id = `WK-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const sql = await getSql();
  await sql`
    insert into interest_requests (id, kind, name, email, sidra_username, amount_sda, status, consent)
    values (
      ${id},
      ${input.kind},
      ${name || null},
      ${email},
      ${clean(input.sidraUsername, 80) || null},
      ${amountText || null},
      ${"recue"},
      ${true}
    )
  `;

  let notified = false;
  if (reception.webhook) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    try {
      const response = await fetch(reception.webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          event: "wikenva.interest.received",
          id,
          kind: input.kind,
          at: new Date().toISOString(),
        }),
        signal: controller.signal,
      });
      notified = response.ok;
    } catch {
      notified = false;
    } finally {
      clearTimeout(timer);
    }
  }

  return { recorded: true, notified, missing: [], id, error: null };
}

export async function listInterestRequests(): Promise<InterestList> {
  assertSameSiteRequest();
  const reception = currentReception();
  if (!reception.operational) {
    return { operational: false, authorized: false, missing: reception.missing, requests: [] };
  }
  const email = (await resolveAdminEmail()) ?? "";
  if (!email || !reception.admins.includes(email)) {
    return { operational: true, authorized: false, missing: [], requests: [] };
  }
  const sql = await getSql();
  const rows = await sql<{
    id: string;
    created_at: string | Date;
    kind: InterestKind;
    name: string | null;
    email: string;
    sidra_username: string | null;
    amount_sda: string | null;
    status: string;
  }>`
    select id, created_at, kind, name, email, sidra_username, amount_sda, status
    from interest_requests
    order by created_at desc
    limit 200
  `;
  return {
    operational: true,
    authorized: true,
    missing: [],
    requests: rows.map((row) => ({
      id: row.id,
      createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at),
      kind: row.kind,
      name: row.name,
      email: row.email,
      sidraUsername: row.sidra_username,
      amount: row.amount_sda,
      status: row.status,
    })),
  };
}

const ALLOWED_CAPTURES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function submitCaptureRequest(input: CaptureInput): Promise<CaptureResult> {
  assertSameSiteRequest();
  const email = input.email.trim().slice(0, 160);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { recorded: false, id: null, error: "email", missing: [] };
  }
  const contentType = input.contentType.trim().toLowerCase();
  const imageData = input.imageData.trim();
  if (!ALLOWED_CAPTURES.has(contentType) || !/^[A-Za-z0-9+/=\s]+$/.test(imageData) || imageData.length < 32 || imageData.length > 1_800_000) {
    return { recorded: false, id: null, error: "file", missing: [] };
  }
  const reception = currentReception();
  if (!reception.operational) return { recorded: false, id: null, error: null, missing: reception.missing };

  const id = `WK-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const sql = await getSql();
  await sql`
    insert into interest_captures (id, email, name, content_type, image_data, status)
    values (${id}, ${email}, ${input.name.trim().slice(0, 120) || null}, ${contentType}, ${imageData}, ${"recue"})
  `;
  return { recorded: true, id, error: null, missing: [] };
}

export async function listCaptureRequests(): Promise<{ authorized: boolean; captures: CaptureRow[] }> {
  assertSameSiteRequest();
  const reception = currentReception();
  if (!reception.operational) return { authorized: false, captures: [] };
  const email = (await resolveAdminEmail()) ?? "";
  if (!email || !reception.admins.includes(email)) return { authorized: false, captures: [] };
  const sql = await getSql();
  const rows = await sql<{
    id: string;
    created_at: string | Date;
    email: string;
    name: string | null;
    content_type: string;
    image_data: string;
    status: string;
  }>`
    select id, created_at, email, name, content_type, image_data, status
    from interest_captures
    order by created_at desc
    limit 20
  `;
  return {
    authorized: true,
    captures: rows.map((row) => ({
      id: row.id,
      createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at),
      email: row.email,
      name: row.name,
      contentType: row.content_type,
      imageData: row.image_data,
      status: row.status,
    })),
  };
}

function asStatus(value: string): "recue" | "approuvee" | "refusee" {
  if (value === "approuvee" || value === "refusee") return value;
  return "recue";
}

export async function lookupApplicationStatus(input: { id: string; email: string }): Promise<ApplicationLookup> {
  assertSameSiteRequest();
  const id = input.id.trim().toUpperCase();
  const email = input.email.trim().toLowerCase();
  const empty = { found: false, status: null, unavailable: false };
  if (!/^WK-[A-Z0-9]{8}$/.test(id) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return empty;
  const reception = currentReception();
  if (!reception.operational) return { found: false, status: null, unavailable: true };
  const sql = await getSql();
  const rows = await sql<{ kind: string; status: string; email: string }>`
    select kind, status, email from interest_requests where id = ${id} limit 1
  `;
  const row = rows[0];
  if (!row || row.email.trim().toLowerCase() !== email || row.kind !== "actionnaire") return empty;
  return { found: true, status: asStatus(row.status), unavailable: false };
}

export async function decideApplicationRequest(
  input: { id: string; decision: ApplicationDecision },
  userId: string,
): Promise<{ ok: boolean }> {
  assertSameSiteRequest();
  if (input.decision !== "approuvee" && input.decision !== "refusee") return { ok: false };
  const id = input.id.trim().toUpperCase();
  if (!/^WK-[A-Z0-9]{8}$/.test(id)) return { ok: false };
  const reception = currentReception();
  if (!reception.operational) return { ok: false };
  const sql = await getSql();
  const users = await sql<{ email: string }>`select email from "user" where id = ${userId} limit 1`;
  const email = users[0]?.email?.trim().toLowerCase() ?? "";
  if (!email || !reception.admins.includes(email)) return { ok: false };
  const updated = await sql<{ id: string }>`
    update interest_requests set status = ${input.decision}
    where id = ${id} and kind = ${"actionnaire"}
    returning id
  `;
  return { ok: updated.length > 0 };
}
