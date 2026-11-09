/** Codes de suivi des candidatures : WKV-XXXX-XXXX-XXXX (≈ 59 bits aléatoires). */
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sans 0/O/1/I ambigus (32 signes)

export function generateTrackingCode(): string {
  const bytes = new Uint8Array(12);
  crypto.getRandomValues(bytes);
  const chars = Array.from(bytes, (b) => ALPHABET[b & 31]).join("");
  return `WKV-${chars.slice(0, 4)}-${chars.slice(4, 8)}-${chars.slice(8, 12)}`;
}

export function normalizeTrackingCode(input: string): string {
  const raw = input.toUpperCase().replace(/[^A-Z0-9]/g, "").replace(/^WKV/, "");
  return `WKV-${raw.slice(0, 4)}-${raw.slice(4, 8)}-${raw.slice(8, 12)}`;
}

export async function hashTrackingCode(code: string): Promise<string> {
  const data = new TextEncoder().encode(`wikenva-track:${normalizeTrackingCode(code)}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

export type PublicStatus = "en_attente" | "approuvee" | "refusee";

export function publicStatus(status: string): PublicStatus {
  if (status === "acceptee") return "approuvee";
  if (status === "refusee") return "refusee";
  return "en_attente";
}
