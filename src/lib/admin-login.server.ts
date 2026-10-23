import { createHash, randomBytes, randomInt, timingSafeEqual } from "node:crypto";
import { getRequest, setCookie } from "@tanstack/react-start/server";
import { configuredAdminEmails } from "@/lib/admin-allowlist.server";
import { assertSameSiteRequest } from "@/lib/auth/isolation.server";
import { getSessionUser } from "@/lib/auth/verify.server";
import { getSql } from "@/lib/db";
import { deliverMail } from "@/lib/partner-mail.server";

const COOKIE = "wikenva_admin";

function hash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function same(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

function admins() {
  return (process.env.WIKENVA_ADMIN_EMAILS?.trim() || configuredAdminEmails)
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter((item) => item.includes("@"));
}

function readCookie() {
  const raw = getRequest()?.headers.get("cookie") ?? "";
  const part = raw
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${COOKIE}=`));
  return part ? decodeURIComponent(part.slice(COOKIE.length + 1)) : "";
}

export async function resolveAdminEmail() {
  const allowed = admins();
  const session = await getSessionUser();
  const sessionEmail = session?.email?.trim().toLowerCase() ?? "";
  if (sessionEmail && allowed.includes(sessionEmail)) return sessionEmail;
  const token = readCookie();
  if (!token) return null;
  const sql = await getSql();
  const rows = await sql<{ email: string }>`
    select email from admin_sessions
    where token_hash = ${hash(token)} and expires_at > now()
    limit 1
  `;
  const email = rows[0]?.email.trim().toLowerCase() ?? "";
  return email && allowed.includes(email) ? email : null;
}

export async function requestAdminCode(emailInput: string) {
  assertSameSiteRequest();
  const email = emailInput.trim().toLowerCase();
  if (!admins().includes(email)) return { sent: false, error: "denied" as const };
  const code = String(randomInt(100000, 1000000));
  const sql = await getSql();
  await sql`
    insert into admin_codes (email, code_hash, expires_at, attempts)
    values (${email}, ${hash(code)}, now() + interval '10 minutes', 0)
    on conflict (email) do update
    set code_hash = excluded.code_hash, expires_at = excluded.expires_at, attempts = 0
  `;
  const sent = await deliverMail({
    to: email,
    subject: "WIKENVA — code administrateur",
    text: `Votre code WIKENVA est ${code}. Il expire dans 10 minutes. Ne le partagez pas.`,
  });
  if (!sent) return { sent: false, error: "mail" as const };
  return { sent: true, error: null };
}

export async function confirmAdminCode(emailInput: string, codeInput: string) {
  assertSameSiteRequest();
  const email = emailInput.trim().toLowerCase();
  const code = codeInput.replace(/\s/g, "");
  if (!admins().includes(email) || !/^\d{6}$/.test(code)) return { ok: false };
  const sql = await getSql();
  const rows = await sql<{ code_hash: string; attempts: number }>`
    select code_hash, attempts from admin_codes
    where email = ${email} and expires_at > now()
    limit 1
  `;
  const row = rows[0];
  if (!row || row.attempts >= 5) return { ok: false };
  if (!same(row.code_hash, hash(code))) {
    await sql`update admin_codes set attempts = attempts + 1 where email = ${email}`;
    return { ok: false };
  }
  const token = randomBytes(32).toString("hex");
  await sql`
    insert into admin_sessions (token_hash, email, expires_at)
    values (${hash(token)}, ${email}, now() + interval '12 hours')
  `;
  await sql`delete from admin_codes where email = ${email}`;
  setCookie(COOKIE, token, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 12,
  });
  return { ok: true };
}
