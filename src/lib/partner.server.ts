import { parsePhoneNumberFromString } from "libphonenumber-js";
import { adminApplicationMail, candidateDecisionMail, deliverMail } from "@/lib/partner-mail.server";
import { configuredAdminEmails } from "@/lib/admin-allowlist.server";
import { assertSameSiteRequest } from "@/lib/auth/isolation.server";
import { resolveAdminEmail } from "@/lib/admin-login.server";
import { getSql } from "@/lib/db";
import { receptionStatus } from "@/lib/interest-config";
import { partnerProfiles, type PartnerInput, type PartnerList, type PartnerLookup, type PartnerStatus, type PartnerSubmitResult, type ShopInput, type ShopList, type ShopSubmitResult } from "@/lib/partner";

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
  if (text.length > 140) return true;
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
    duplicate: false,
    status: null,
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
  const storedMessage = message.length >= 10 ? message : "Demande avec hash de transaction.";
  const txRef = clean(input.txRef, 128);
  if (txRef.length < 8 || unsafeProof(txRef)) return { ...empty, error: "proof" };
  const rawPhone = clean(input.whatsapp, 40);
  let whatsapp: string | null = null;
  if (rawPhone) {
    const parsed = parsePhoneNumberFromString(rawPhone);
    if (!parsed?.isValid()) return { ...empty, error: "phone" };
    whatsapp = parsed.number;
  }
  const reception = currentReception();
  if (!reception.operational) return { ...empty, missing: reception.missing };

  const sql = await getSql();
  const existing = await sql<{ id: string; status: string }>`
    select id, status from partner_applications
    where lower(email) = ${email}
    order by created_at desc
    limit 1
  `;
  const previous = existing[0];
  if (previous) {
    return {
      recorded: true,
      notified: false,
      id: previous.id,
      missing: [],
      error: null,
      duplicate: true,
      status: asStatus(previous.status),
    };
  }

  const id = `WK-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
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
      ${storedMessage},
      ${true},
      ${true},
      ${"en_attente"}
    )
  `;
  const mailed = await deliverMail(adminApplicationMail({ id, name, email, country, txRef }));
  const hooked = await notify("wikenva.partner.received", id, "en_attente");
  return { recorded: true, notified: mailed || hooked, id, missing: [], error: null, duplicate: false, status: "en_attente" };
}

export async function listPartnerApplications(): Promise<PartnerList> {
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

export async function decidePartnerApplication(input: {
  id: string;
  status: PartnerStatus;
}): Promise<{ ok: boolean; notified: boolean }> {
  assertSameSiteRequest();
  if (!["en_attente", "verification", "approuvee", "refusee"].includes(input.status)) return { ok: false, notified: false };
  const id = input.id.trim().toUpperCase();
  if (!/^WK-[A-Z0-9]{8}$/.test(id)) return { ok: false, notified: false };
  const reception = currentReception();
  if (!reception.operational) return { ok: false, notified: false };
  const email = (await resolveAdminEmail()) ?? "";
  if (!email || !reception.admins.includes(email)) return { ok: false, notified: false };
  const sql = await getSql();
  const updated = await sql<{ id: string; name: string; email: string }>`
    update partner_applications
    set status = ${input.status}, decided_at = now(), decided_by = ${email}
    where id = ${id}
    returning id, name, email
  `;
  const row = updated[0];
  if (!row) return { ok: false, notified: false };
  const letter = candidateDecisionMail({ id: row.id, name: row.name, email: row.email, status: input.status });
  const mailed = letter ? await deliverMail(letter) : false;
  const hooked = await notify("wikenva.partner.updated", id, input.status);
  return { ok: true, notified: mailed || hooked };
}

export async function submitPartnerShop(input: ShopInput): Promise<ShopSubmitResult> {
  assertSameSiteRequest();
  const empty: ShopSubmitResult = { recorded: false, id: null, error: null };
  const reception = currentReception();
  if (!reception.operational) return { ...empty, error: "closed" };
  const partnerId = clean(input.partnerId, 20).toUpperCase();
  const email = clean(input.email, 160).toLowerCase();
  const shopName = clean(input.shopName, 80);
  const description = clean(input.description, 800);
  if (!/^WK-[A-Z0-9]{8}$/.test(partnerId) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ...empty, error: "match" };
  if (shopName.length < 2) return { ...empty, error: "name" };
  if (description.length < 10) return { ...empty, error: "description" };
  const sql = await getSql();
  const partners = await sql<{ email: string; status: string }>`
    select email, status from partner_applications where id = ${partnerId} limit 1
  `;
  const partner = partners[0];
  if (!partner || partner.email.trim().toLowerCase() !== email || partner.status !== "approuvee") {
    return { ...empty, error: "match" };
  }
  const existing = await sql<{ id: string }>`
    select id from partner_shops
    where partner_id = ${partnerId} and status in ('en_attente', 'verification', 'approuvee')
    limit 1
  `;
  if (existing.length > 0) return { ...empty, error: "closed" };
  const id = `SH-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  await sql`
    insert into partner_shops (id, partner_id, email, shop_name, description, status)
    values (${id}, ${partnerId}, ${email}, ${shopName}, ${description}, ${"en_attente"})
  `;
  return { recorded: true, id, error: null };
}

export async function listPartnerShops(): Promise<ShopList> {
  assertSameSiteRequest();
  const reception = currentReception();
  if (!reception.operational) return { operational: false, authorized: false, shops: [] };
  const email = (await resolveAdminEmail()) ?? "";
  if (!email || !reception.admins.includes(email)) return { operational: true, authorized: false, shops: [] };
  const sql = await getSql();
  const rows = await sql<{
    id: string;
    created_at: string | Date;
    partner_id: string;
    email: string;
    shop_name: string;
    description: string;
    status: string;
    decided_at: string | Date | null;
  }>`
    select id, created_at, partner_id, email, shop_name, description, status, decided_at
    from partner_shops
    order by created_at desc
    limit 100
  `;
  return {
    operational: true,
    authorized: true,
    shops: rows.map((row) => ({
      id: row.id,
      createdAt: new Date(row.created_at).toISOString(),
      partnerId: row.partner_id,
      email: row.email,
      shopName: row.shop_name,
      description: row.description,
      status: asStatus(row.status),
      decidedAt: row.decided_at ? new Date(row.decided_at).toISOString() : null,
    })),
  };
}

export async function decidePartnerShop(input: { id: string; status: PartnerStatus }): Promise<{ ok: boolean }> {
  assertSameSiteRequest();
  if (!["en_attente", "verification", "approuvee", "refusee"].includes(input.status)) return { ok: false };
  const id = input.id.trim().toUpperCase();
  if (!/^SH-[A-Z0-9]{8}$/.test(id)) return { ok: false };
  const reception = currentReception();
  if (!reception.operational) return { ok: false };
  const email = (await resolveAdminEmail()) ?? "";
  if (!email || !reception.admins.includes(email)) return { ok: false };
  const sql = await getSql();
  const updated = await sql<{ id: string }>`
    update partner_shops
    set status = ${input.status}, decided_at = now(), decided_by = ${email}
    where id = ${id}
    returning id
  `;
  return { ok: updated.length > 0 };
}

