import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";

import { emailKey, submissionSchema, verifySchema } from "@/lib/application-schema";
import {
  generateTrackingCode,
  hashTrackingCode,
  publicStatus,
  type PublicStatus,
} from "@/lib/tracking-code";
import { deadlines } from "@/config/site";
import { isPast } from "@/lib/countdown";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

import { checkSidraTransaction } from "@/lib/sidrachain";

type SubmitResult =
  { ok: true; code: string | null } | { ok: false; error: string; field?: "email" | "txHash" };
const TX_USED = "Ce hash de transaction a déjà été utilisé pour une candidature.";
const TX_NOT_FOUND =
  "Transaction introuvable sur SidraChain. Vérifiez le hash copié depuis votre portefeuille après votre contribution sur SidraStart.";
const TX_FAILED =
  "Cette transaction a échoué sur SidraChain. Effectuez une contribution réussie sur SidraStart puis utilisez son hash.";

const MIN_FILL_MS = 3000;
const MAX_PER_IP_PER_HOUR = 5;
const EMAIL_USED =
  "Cette adresse e-mail a déjà été utilisée pour une candidature. Une seule candidature est acceptée par adresse.";

async function sha256(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export const submitPartnerApplication = createServerFn({ method: "POST" })
  .validator((input: unknown) => submissionSchema.parse(input))
  .handler(async ({ data }): Promise<SubmitResult> => {
    // Champ piège rempli : robot. On répond comme un succès sans rien enregistrer.
    if (data.website && data.website.trim() !== "") return { ok: true, code: null };
    if (Date.now() - data.startedAt < MIN_FILL_MS) {
      return {
        ok: false,
        error: "Envoi trop rapide. Merci de vérifier vos informations et de réessayer.",
      };
    }
    if (isPast(deadlines.partnership.iso)) {
      return { ok: false, error: "Les candidatures au programme de partenariat sont closes." };
    }

    const ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";
    const ipHash = await sha256(`wikenva:${ip}`);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count: ipCount } = await supabaseAdmin
      .from("partner_applications")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", since);
    if ((ipCount ?? 0) >= MAX_PER_IP_PER_HOUR) {
      return { ok: false, error: "Trop de candidatures envoyées. Merci de réessayer plus tard." };
    }

    // Une seule candidature par adresse e-mail et par hash de transaction.
    const { count: emailCount } = await supabaseAdmin
      .from("partner_applications")
      .select("id", { count: "exact", head: true })
      .eq("email_key", emailKey(data.email));
    if ((emailCount ?? 0) > 0) return { ok: false, field: "email", error: EMAIL_USED };

    const { count: txCount } = await supabaseAdmin
      .from("partner_applications")
      .select("id", { count: "exact", head: true })
      .eq("tx_hash", data.txHash);
    if ((txCount ?? 0) > 0) return { ok: false, field: "txHash", error: TX_USED };

    // La transaction doit exister et avoir réussi sur SidraChain.
    const tx = await checkSidraTransaction(data.txHash);
    if (tx.status === "introuvable") return { ok: false, field: "txHash", error: TX_NOT_FOUND };
    if (tx.status === "echouee") return { ok: false, field: "txHash", error: TX_FAILED };

    const code = generateTrackingCode();
    const codeHash = await hashTrackingCode(code);

    const { error } = await supabaseAdmin.from("partner_applications").insert({
      tracking_code_hash: codeHash,
      full_name: data.fullName,
      email: data.email,
      country: data.country,
      whatsapp: data.whatsapp ?? null,
      tx_hash: data.txHash,
      tx_check_status: tx.status,
      tx_checked_at: new Date().toISOString(),
      tx_value_sda: tx.valueSda,
      tx_from: tx.from,
      tx_to: tx.to,
      tx_block: tx.block,
      motivation: data.motivation ?? null,
      accepted_terms: data.acceptTerms,
      accepted_privacy: data.acceptPrivacy,
      ip_hash: ipHash,
    });

    if (error) {
      if (error.code === "23505") {
        // Course entre deux envois simultanés : les index uniques tranchent.
        if (error.message.includes("email_key"))
          return { ok: false, field: "email", error: EMAIL_USED };
        if (error.message.includes("tx_hash"))
          return { ok: false, field: "txHash", error: TX_USED };
        return { ok: false, error: "Une erreur est survenue. Merci de réessayer." };
      }
      console.error("submitPartnerApplication insert failed", error.message);
      return {
        ok: false,
        error: "Une erreur est survenue. Merci de réessayer dans quelques instants.",
      };
    }
    return { ok: true, code };
  });

export const getAdminStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    return { isAdmin: Boolean(data) };
  });

export const listPartnerApplications = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleError || !isAdmin) throw new Error("Accès réservé à l'équipe WIKENVA.");
    const { data, error } = await context.supabase
      .from("partner_applications")
      .select(
        "id, full_name, email, country, tx_hash, sidrastart_username, whatsapp, motivation, status, admin_notes, created_at, updated_at, tx_check_status, tx_value_sda, tx_to, application_decisions(id, from_status, to_status, admin_email, created_at)",
      )
      .order("created_at", { ascending: false })
      .limit(1000);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

const statusEnum = z.enum(["nouvelle", "en_examen", "acceptee", "refusee"]);

export const updatePartnerApplication = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        status: statusEnum.optional(),
        adminNotes: z.string().max(2000).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleError || !isAdmin) throw new Error("Accès réservé à l'équipe WIKENVA.");
    const patch: { status?: z.infer<typeof statusEnum>; admin_notes?: string } = {};
    if (data.status) patch.status = data.status;
    if (data.adminNotes !== undefined) patch.admin_notes = data.adminNotes;
    const { error } = await context.supabase
      .from("partner_applications")
      .update(patch)
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

type VerifyResult =
  | { ok: true; status: PublicStatus; fullName: string; submittedAt: string }
  | { ok: false; error: string };
const WRONG =
  "Informations incorrectes. Veuillez vérifier l'adresse e-mail de votre candidature et votre code de suivi.";
const MAX_VERIFY_PER_15_MIN = 10;

/** Vérification publique : ne révèle jamais si une adresse existe, ni les notes internes. */
export const verifyPartnerApplication = createServerFn({ method: "POST" })
  .validator((input: unknown) => verifySchema.safeParse(input))
  .handler(async ({ data: parsed }): Promise<VerifyResult> => {
    const ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";
    const ipHash = await sha256(`wikenva-verify:${ip}`);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const since = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const { count } = await supabaseAdmin
      .from("verification_attempts")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", since);
    if ((count ?? 0) >= MAX_VERIFY_PER_15_MIN) {
      return {
        ok: false,
        error: "Trop de tentatives. Merci de patienter 15 minutes avant de réessayer.",
      };
    }
    await supabaseAdmin.from("verification_attempts").insert({ ip_hash: ipHash });
    if (!parsed.success) return { ok: false, error: WRONG };

    const codeHash = await hashTrackingCode(parsed.data.code);
    const { data: row } = await supabaseAdmin
      .from("partner_applications")
      .select("full_name, status, created_at, email_key")
      .eq("tracking_code_hash", codeHash)
      .maybeSingle();
    if (!row || row.email_key !== emailKey(parsed.data.email)) return { ok: false, error: WRONG };
    return {
      ok: true,
      status: publicStatus(row.status),
      fullName: row.full_name,
      submittedAt: row.created_at,
    };
  });
