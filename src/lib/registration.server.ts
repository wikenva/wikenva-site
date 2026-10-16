import { getSql } from "@/lib/db";
import { receptionStatus } from "@/lib/interest-config";
import { configuredAdminEmails } from "@/lib/admin-allowlist.server";
import type { RegistrationState } from "@/lib/registration";

function operational() {
  return receptionStatus({
    databaseUrl: process.env.DATABASE_URL,
    authEnabled: process.env.VITE_AUTH_ENABLED,
    adminEmails: process.env.WIKENVA_ADMIN_EMAILS || configuredAdminEmails,
  }).operational;
}

export async function readRegistration(userId: string | null, email: string | null): Promise<RegistrationState> {
  if (!userId || !email) {
    return { signedIn: false, registered: false, unavailable: !operational(), email: null, name: null };
  }
  if (!operational()) {
    return { signedIn: true, registered: false, unavailable: true, email, name: null };
  }
  const sql = await getSql();
  const rows = await sql<{ name: string }>`
    select name from platform_registrations where user_id = ${userId} limit 1
  `;
  return {
    signedIn: true,
    registered: rows.length > 0,
    unavailable: false,
    email,
    name: rows[0]?.name ?? null,
  };
}

export async function saveRegistration(
  userId: string,
  input: { name: string; consent: boolean },
): Promise<{ ok: boolean; unavailable: boolean }> {
  const name = input.name.trim().slice(0, 120);
  if (!input.consent || name.length < 2) return { ok: false, unavailable: false };
  if (!operational()) return { ok: false, unavailable: true };
  const sql = await getSql();
  const users = await sql<{ email: string }>`select email from "user" where id = ${userId} limit 1`;
  const email = users[0]?.email?.trim().toLowerCase() ?? "";
  if (!email) return { ok: false, unavailable: false };
  await sql`
    insert into platform_registrations (user_id, email, name, consent)
    values (${userId}, ${email}, ${name}, ${true})
    on conflict (user_id) do update set name = excluded.name, email = excluded.email
  `;
  return { ok: true, unavailable: false };
}
