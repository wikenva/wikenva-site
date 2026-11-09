import { z } from "zod";

/** Numéro international : + indicatif puis 7 à 15 chiffres au total. */
export const WHATSAPP_REGEX = /^\+[1-9]\d{6,14}$/;

/** Hash de transaction SidraChain (EVM) : 0x + 64 caractères hexadécimaux. */
export const TX_HASH_REGEX = /^0x[0-9a-f]{64}$/i;

/**
 * Clé d'unicité d'une adresse e-mail (identique à la colonne générée `email_key`).
 * Pour Gmail, les points et le suffixe « +… » ne changent pas la boîte de réception :
 * jean.dupont+1@gmail.com et jeandupont@googlemail.com donnent la même clé.
 */
export function emailKey(email: string): string {
  const e = email.trim().toLowerCase();
  const at = e.lastIndexOf("@");
  if (at < 0) return e;
  const local = e.slice(0, at);
  const domain = e.slice(at + 1);
  if (domain === "gmail.com" || domain === "googlemail.com") {
    return `${(local.split("+")[0] ?? "").replace(/\./g, "")}@gmail.com`;
  }
  return e;
}

const optionalText = (max: number, message: string) =>
  z
    .string()
    .trim()
    .max(max, { message })
    .optional()
    .transform((v) => (v ? v : undefined));

export const applicationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Indiquez votre nom complet." })
    .max(100, { message: "100 caractères maximum." }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Adresse e-mail invalide." })
    .max(255, { message: "255 caractères maximum." }),
  country: z
    .string()
    .trim()
    .min(2, { message: "Indiquez votre pays de résidence." })
    .max(80, { message: "80 caractères maximum." }),
  txHash: z
    .string({ required_error: "Collez le hash de votre transaction de contribution." })
    .trim()
    .toLowerCase()
    .regex(TX_HASH_REGEX, {
      message: "Hash invalide : il commence par 0x suivi de 64 caractères (chiffres et lettres a à f).",
    }),
  whatsapp: z
    .string()
    .transform((v) => v.replace(/[\s().-]/g, ""))
    .refine((v) => v === "" || WHATSAPP_REGEX.test(v), {
      message: "Format international attendu, par ex. +229 01 23 45 67 89.",
    })
    .optional()
    .transform((v) => (v ? v : undefined)),
  motivation: optionalText(1000, "1000 caractères maximum."),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "Cette confirmation est obligatoire." }),
  }),
  acceptPrivacy: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter la politique de confidentialité." }),
  }),
});

export type ApplicationInput = z.input<typeof applicationSchema>;
export type ApplicationData = z.output<typeof applicationSchema>;

/** Données envoyées au serveur : formulaire + champs anti-spam. */
export const submissionSchema = applicationSchema.extend({
  website: z.string().max(200).optional(), // champ piège invisible
  startedAt: z.number().int().positive(),
});
export type SubmissionInput = z.input<typeof submissionSchema>;

/** Page « Vérifier ma candidature » : Gmail + code de suivi. */
export const verifySchema = z.object({
  email: z.string().trim().toLowerCase().email().max(255),
  code: z.string().trim().min(4).max(40),
});
