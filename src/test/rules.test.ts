import { describe, expect, it } from "vitest";

import { getRemaining, isPast } from "@/lib/countdown";
import { applicationSchema } from "@/lib/application-schema";
import { deadlines } from "@/config/site";

const base = {
  fullName: "Amina Diallo",
  email: "amina@gmail.com",
  country: "Bénin",
  txHash: "0x" + "a1".repeat(32),
  acceptTerms: true,
  acceptPrivacy: true,
} as const;

describe("Échéances", () => {
  it("la fin des candidatures est le 10 décembre 2026 à 23h59 heure de Porto-Novo (22h59 UTC)", () => {
    expect(new Date(deadlines.partnership.iso).toISOString()).toBe("2026-12-10T22:59:00.000Z");
  });

  it("la campagne se termine le 24 décembre 2026 à 23h59 heure de Porto-Novo (22h59 UTC)", () => {
    expect(new Date(deadlines.campaign.iso).toISOString()).toBe("2026-12-24T22:59:00.000Z");
  });

  it("le compte à rebours est terminé une fois l'échéance passée", () => {
    const after = new Date("2026-12-10T23:00:00Z").getTime();
    expect(getRemaining(deadlines.partnership.iso, after).ended).toBe(true);
    expect(isPast(deadlines.partnership.iso, after)).toBe(true);
  });

  it("calcule jours, heures, minutes et secondes restants", () => {
    const now = new Date("2026-12-09T21:58:59Z").getTime();
    expect(getRemaining(deadlines.partnership.iso, now)).toEqual({
      ended: false,
      days: 1,
      hours: 1,
      minutes: 0,
      seconds: 1,
    });
  });
});

describe("Formulaire de candidature", () => {
  it("accepte une candidature complète", () => {
    expect(applicationSchema.safeParse(base).success).toBe(true);
  });

  it("exige le hash de la transaction de contribution SidraStart", () => {
    const { txHash: _omit, ...noHash } = base;
    expect(applicationSchema.safeParse(noHash).success).toBe(false);
  });

  it("refuse un hash de transaction mal formé", () => {
    expect(applicationSchema.safeParse({ ...base, txHash: "0x123" }).success).toBe(false);
    expect(applicationSchema.safeParse({ ...base, txHash: "a1".repeat(32) }).success).toBe(false);
  });

  it("n'exige aucun montant minimum", () => {
    expect("amount" in applicationSchema.shape).toBe(false);
  });

  it("exige la case de confirmation des conditions", () => {
    expect(applicationSchema.safeParse({ ...base, acceptTerms: false }).success).toBe(false);
  });

  it("exige l'acceptation de la politique de confidentialité", () => {
    expect(applicationSchema.safeParse({ ...base, acceptPrivacy: false }).success).toBe(false);
  });

  it("refuse un numéro WhatsApp sans indicatif international", () => {
    expect(applicationSchema.safeParse({ ...base, whatsapp: "0123456789" }).success).toBe(false);
    expect(applicationSchema.safeParse({ ...base, whatsapp: "+229 01 23 45 67 89" }).success).toBe(true);
  });
});

describe("Suggestions de pays", () => {
  it("propose le Bénin quand on tape « ben », sans accent", async () => {
    const { searchCountries } = await import("@/lib/countries");
    expect(searchCountries("ben", "fr")[0]?.name).toBe("Bénin");
  });

  it("retrouve la Côte d'Ivoire en tapant « ivoire »", async () => {
    const { searchCountries } = await import("@/lib/countries");
    expect(searchCountries("ivoire", "fr").map((c) => c.code)).toContain("CI");
  });

  it("corrige « cote d'ivoire » vers le nom officiel", async () => {
    const { matchCountry } = await import("@/lib/countries");
    expect(matchCountry("cote d'ivoire", "fr")?.code).toBe("CI");
  });
});

describe("une seule candidature par e-mail", () => {
  it("variantes Gmail (points, +suffixe, majuscules, googlemail) = même adresse", async () => {
    const { emailKey } = await import("@/lib/application-schema");
    const key = emailKey("amina.diallo@gmail.com");
    expect(emailKey("AminaDiallo+wik@Gmail.com")).toBe(key);
    expect(emailKey(" amina.dial.lo@googlemail.com ")).toBe(key);
    expect(key).toBe("aminadiallo@gmail.com");
  });
  it("hors Gmail, seule la casse est ignorée", async () => {
    const { emailKey } = await import("@/lib/application-schema");
    expect(emailKey("Jean.Dupont@Yahoo.fr")).toBe("jean.dupont@yahoo.fr");
    expect(emailKey("jean.dupont@yahoo.fr")).not.toBe(emailKey("jeandupont@yahoo.fr"));
  });
  it("même résultat que la colonne générée de la base", async () => {
    const { emailKey } = await import("@/lib/application-schema");
    expect(emailKey("Test.Migration+x@GMAIL.com")).toBe("testmigration@gmail.com");
  });
});

describe("Code de suivi", () => {
  it("format WKV-XXXX-XXXX-XXXX, imprévisible et unique", async () => {
    const { generateTrackingCode } = await import("@/lib/tracking-code");
    const a = generateTrackingCode();
    expect(a).toMatch(/^WKV-[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4}$/);
    const set = new Set(Array.from({ length: 500 }, generateTrackingCode));
    expect(set.size).toBe(500);
  });
  it("tolère minuscules, espaces et absence de tirets à la saisie", async () => {
    const { normalizeTrackingCode } = await import("@/lib/tracking-code");
    expect(normalizeTrackingCode(" wkv abcd-efgh 2345 ")).toBe("WKV-ABCD-EFGH-2345");
  });
  it("trois statuts visibles : en attente, approuvée, refusée", async () => {
    const { publicStatus } = await import("@/lib/tracking-code");
    expect(publicStatus("nouvelle")).toBe("en_attente");
    expect(publicStatus("en_examen")).toBe("en_attente");
    expect(publicStatus("acceptee")).toBe("approuvee");
    expect(publicStatus("refusee")).toBe("refusee");
  });
});
