import { parsePhoneNumberFromString } from "libphonenumber-js";
import { configuredAdminEmails } from "@/lib/admin-allowlist.server";
import { assertSameSiteRequest } from "@/lib/auth/isolation.server";
import { getSessionUser } from "@/lib/auth/verify.server";
import { getSql } from "@/lib/db";
import { receptionStatus } from "@/lib/interest-config";
import { partnerProfiles, type PartnerInput, type PartnerList, type PartnerLookup, type PartnerStatus, type PartnerSubmitResult } from "@/lib/partner";

function currentReception() {
  const databaseUrl =
    process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.DATABASE_URL_UNPOOLED;
  return receptionStatus({
    databaseUrl,
    authEnabled: "true",
    adminEmails: process.env.WIKENVA_ADMIN_EMAILS?.trim() || configuredAdminEmails,
    notifyWebhook: process.env.WIKENVA_NOTIFY_WEBHOOK,
  });
}

function clean(value: string, max: number) {
  return value.trim().slice(0, max);
}

function unsafeProof(value: string) {
  const text = value.trim();
  if (!text) return false;
  if (text.length > 80) return true;
  if (text.trim().split(/\s+/).length >= 8) return true;
  return /seed|mnemonic|passphrase|phrase secr|clé privée|cle privee|private key/i.test(text);
}

function asStatus(value: string): PartnerStatus {
  if (value === "verification" || value === "approuvee" || value === "refusee") return value;
  return "en_attente";
}

async function notify(event: string, id: string, status: PartnerStatus) {
  const webhook = currentReception().webhook;
  if (!webhook) return false;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);
  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ event, id, status, at: new Date().toISOString() }),
      signal: controller.signal,
    });
    return response.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

export async function submitPartnerApplication(input: PartnerInput): Promise<PartnerSubmitResult> {
  assertSameSiteRequest();
  const empty: PartnerSubmitResult = {
    recorded: false,
    notified: false,
    id: null,
    missing: [],
    error: null,
  };
  if (input.consentTerms !== true || input.consentPrivacy !== true) return { ...empty, error: "consent" };
  const email = clean(input.email, 160).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ...empty, error: "email" };
  const name = clean(input.name, 120);
  if (name.length < 2) return { ...empty, error: "name" };
  const country = clean(input.country, 80);
  if (country.length < 2) return { ...empty, error: "country" };
  if (!partnerProfiles.includes(input.profile as (typeof partnerProfiles)[number])) return { ...empty, error: "profile" };
  const message = clean(input.message, 2000);
  if (message.length < 10) return { ...empty, error: "message" };
  const txRef = clean(input.txRef, 80);
  if (unsafeProof(txRef)) return { ...empty, error: "proof" };
  const rawPhone = clean(input.whatsapp, 40);
  let whatsapp: string | null = null;
  if (rawPhone) {
    const parsed = parsePhoneNumberFromString(rawPhone);
    if (!parsed?.isValid()) return { ...empty, error: "phone" };
    whatsapp = parsed.number;
  }
  const reception = currentReception();
  if (!reception.operational) return { ...empty, missing: reception.missing };

  const id = `WK-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const sql = await getSql();
  await sql`
    insert into partner_applications (
      id, name, email, country, whatsapp, profile, tx_ref, message, consent_terms, consent_privacy, status
    ) values (
      ${id},
      ${name},
      ${email},
      ${country},
      ${whatsapp},
      ${input.profile},
      ${txRef || null},
      ${message},
      ${true},
      ${true},
      ${"en_attente"}
    )
  `;
  const notified = await notify("wikenva.partner.received", id, "en_attente");
  return { recorded: true, notified, id, missing: [], error: null };
}

export async function listPartnerApplications(): Promise<PartnerList> {
  assertSameSiteRequest();
  const reception = currentReception();
  if (!reception.operational) {
    return { operational: false, authorized: false, missing: reception.missing, requests: [] };
  }
  const user = await getSessionUser();
  const email = user?.email?.trim().toLowerCase() ?? "";
  if (!email || !reception.admins.includes(email)) {
    return { operational: true, authorized: false, missing: [], requests: [] };
  }
  const sql = await getSql();
  const rows = await sql<{
    id: string;
    created_at: string | Date;
    name: string;
    email: string;
    country: string;
    whatsapp: string | null;
    profile: string;
    tx_ref: string | null;
    message: string | null;
    status: string;
    decided_at: string | Date | null;
  }>`
    select id, created_at, name, email, country, whatsapp, profile, tx_ref, message, status, decided_at
    from partner_applications
    order by created_at desc
    limit 100
  `;
  return {
    operational: true,
    authorized: true,
    missing: [],
    requests: rows.map((row) => ({
      id: row.id,
      createdAt: new Date(row.created_at).toISOString(),
      name: row.name,
      email: row.email,
      country: row.country,
      whatsapp: row.whatsapp,
      profile: row.profile,
      txRef: row.tx_ref,
      message: row.message,
      status: asStatus(row.status),
      decidedAt: row.decided_at ? new Date(row.decided_at).toISOString() : null,
    })),
  };
}

export async function lookupPartnerApplication(input: { id: string; email: string }): Promise<PartnerLookup> {
  assertSameSiteRequest();
  const id = input.id.trim().toUpperCase();
  const email = input.email.trim().toLowerCase();
  const empty = { found: false, unavailable: false, status: null, decidedAt: null };
  if (!/^WK-[A-Z0-9]{8}$/.test(id) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return empty;
  const reception = currentReception();
  if (!reception.operational) return { ...empty, unavailable: true };
  const sql = await getSql();
  const rows = await sql<{ email: string; status: string; decided_at: string | Date | null }>`
    select email, status, decided_at from partner_applications where id = ${id} limit 1
  `;
  const row = rows[0];
  if (!row || row.email.trim().toLowerCase() !== email) return empty;
  return {
    found: true,
    unavailable: false,
    status: asStatus(row.status),
    decidedAt: row.decided_at ? new Date(row.decided_at).toISOString() : null,
  };
}

export async function decidePartnerApplication(
  input: { id: string; status: PartnerStatus },
  userId: string,
): Promise<{ ok: boolean; notified: boolean }> {
  assertSameSiteRequest();
  if (!["en_attente", "verification", "approuvee", "refusee"].includes(input.status)) return { ok: false, notified: false };
  const id = input.id.trim().toUpperCase();
  if (!/^WK-[A-Z0-9]{8}$/.test(id)) return { ok: false, notified: false };
  const reception = currentReception();
  if (!reception.operational) return { ok: false, notified: false };
  const sql = await getSql();
  const users = await sql<{ email: string }>`select email from "user" where id = ${userId} limit 1`;
  const email = users[0]?.email?.trim().toLowerCase() ?? "";
  if (!email || !reception.admins.includes(email)) return { ok: false, notified: false };
  const updated = await sql<{ id: string }>`
    update partner_applications
    set status = ${input.status}, decided_at = now(), decided_by = ${email}
    where id = ${id}
    returning id
  `;
  if (updated.length === 0) return { ok: false, notified: false };
  const notified = await notify("wikenva.partner.updated", id, input.status);
  return { ok: true, notified };
}
