import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import type { ReceptionGap } from "@/lib/interest-config";

export const partnerProfiles = ["entrepreneur", "createur", "commercial", "technique", "autre"] as const;
export type PartnerProfile = (typeof partnerProfiles)[number];
export type PartnerStatus = "en_attente" | "verification" | "approuvee" | "refusee";

export type PartnerInput = {
  name: string;
  email: string;
  country: string;
  whatsapp: string;
  profile: string;
  txRef: string;
  message: string;
  consentTerms: boolean;
  consentPrivacy: boolean;
};

export type PartnerSubmitResult = {
  recorded: boolean;
  notified: boolean;
  id: string | null;
  missing: ReceptionGap[];
  error: "consent" | "email" | "name" | "country" | "profile" | "message" | "proof" | "phone" | null;
};

export type PartnerRow = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  country: string;
  whatsapp: string | null;
  profile: string;
  txRef: string | null;
  message: string | null;
  status: PartnerStatus;
  decidedAt: string | null;
};

export type PartnerList = {
  operational: boolean;
  authorized: boolean;
  missing: ReceptionGap[];
  requests: PartnerRow[];
};

export type PartnerLookup = {
  found: boolean;
  unavailable: boolean;
  status: PartnerStatus | null;
  decidedAt: string | null;
};

export const submitPartner = createServerFn({ method: "POST" })
  .validator((input: PartnerInput) => input)
  .handler(async ({ data }): Promise<PartnerSubmitResult> => {
    const { submitPartnerApplication } = await import("./partner.server");
    return submitPartnerApplication(data);
  });

export const listPartners = createServerFn({ method: "GET" }).handler(async (): Promise<PartnerList> => {
  const { listPartnerApplications } = await import("./partner.server");
  return listPartnerApplications();
});

export const lookupPartner = createServerFn({ method: "POST" })
  .validator((input: { id: string; email: string }) => input)
  .handler(async ({ data }): Promise<PartnerLookup> => {
    const { lookupPartnerApplication } = await import("./partner.server");
    return lookupPartnerApplication(data);
  });

export const decidePartner = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { id: string; status: PartnerStatus }) => input)
  .handler(async ({ data, context }): Promise<{ ok: boolean; notified: boolean }> => {
    const { decidePartnerApplication } = await import("./partner.server");
    return decidePartnerApplication(data, context.userId);
  });
