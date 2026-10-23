import { getRequest, setCookie } from "@tanstack/react-start/server";
import { configuredAdminEmails } from "@/lib/admin-allowlist.server";
import { assertSameSiteRequest } from "@/lib/auth/isolation.server";
import { getSessionUser } from "@/lib/auth/verify.server";
import { getSql } from "@/lib/db";
import { deliverMail } from "@/lib/partner-mail.server";

const COOKIE = "wikenva_admin";

function hash(value: string) {
  return crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)).then((buffer) =>
    [...new Uint8Array(buffer)].map((item) => item.toString(16).padStart(2, "0")).join(""),
  );
}

function same(left: string, right: string) {
  if (left.length !== right.length) return false;
  let diff = 0;
  for (let index = 0; index < left.length; index += 1) diff |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return diff === 0;
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

async function ready(sql: Awaited<ReturnType<typeof getSql>>) {
  await sql`
    create table if not exists admin_codes (
      email text primary key,
      code_hash text not null,
      expires_at timestamptz not null,
      attempts integer not null default 0
    )
  `;
  await sql`
    create table if not exists admin_sessions (
      token_hash text primary key,
      email text not null,
      expires_at timestamptz not null
    )
  `;
}

export async function resolveAdminEmail() {
  try {
    const allowed = admins();
    const session = await getSessionUser();
    const sessionEmail = session?.email?.trim().toLowerCase() ?? "";
    if (sessionEmail && allowed.includes(sessionEmail)) return sessionEmail;
    const token = readCookie();
    if (!token) return null;
    const sql = await getSql();
    await ready(sql);
    const rows = await sql<{ email: string }>`
      select email from admin_sessions
      where token_hash = ${await hash(token)} and expires_at > now()
      limit 1
    `;
    const email = rows[0]?.email.trim().toLowerCase() ?? "";
    return email && allowed.includes(email) ? email : null;
  } catch (error) {
    console.error("[admin-session]", error);
    return null;
  }
}

export async function requestAdminCode(emailInput: string) {
  try {
    assertSameSiteRequest();
    const email = emailInput.trim().toLowerCase();
    if (!admins().includes(email)) return { sent: false, error: "denied" as const };
    const code = String(crypto.getRandomValues(new Uint32Array(1))[0] % 900000 + 100000);
    const sql = await getSql();
    await ready(sql);
    const expires = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    await sql`
      insert into admin_codes (email, code_hash, expires_at, attempts)
      values (${email}, ${await hash(code)}, ${expires}, 0)
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
  } catch (error) {
    console.error("[admin-code]", error);
    return { sent: false, error: "mail" as const };
  }
}

export async function confirmAdminCode(emailInput: string, codeInput: string) {
  try {
    assertSameSiteRequest();
    const email = emailInput.trim().toLowerCase();
    const code = codeInput.replace(/\s/g, "");
    if (!admins().includes(email) || !/^\d{6}$/.test(code)) return { ok: false };
    const sql = await getSql();
    await ready(sql);
    const rows = await sql<{ code_hash: string; attempts: number }>`
      select code_hash, attempts from admin_codes
      where email = ${email} and expires_at > now()
      limit 1
    `;
    const row = rows[0];
    if (!row || row.attempts >= 5) return { ok: false };
    if (!same(row.code_hash, await hash(code))) {
      await sql`update admin_codes set attempts = attempts + 1 where email = ${email}`;
      return { ok: false };
    }
    const token = [...crypto.getRandomValues(new Uint8Array(32))].map((item) => item.toString(16).padStart(2, "0")).join("");
    const expires = new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString();
    await sql`
      insert into admin_sessions (token_hash, email, expires_at)
      values (${await hash(token)}, ${email}, ${expires})
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
  } catch (error) {
    console.error("[admin-code-confirm]", error);
    return { ok: false };
  }
}
