import { createServerFn } from "@tanstack/react-start";
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
  error: "consent" | "email" | "name" | "country" | "profile" | "message" | "proof" | "phone" | "hash" | null;
  duplicate: boolean;
  status: PartnerStatus | null;
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
  .validator((input: { id: string; status: PartnerStatus }) => input)
  .handler(async ({ data }): Promise<{ ok: boolean; notified: boolean }> => {
    const { decidePartnerApplication } = await import("./partner.server");
    return decidePartnerApplication(data);
  });

export type ShopInput = {
  partnerId: string;
  email: string;
  shopName: string;
  description: string;
};

export type ShopSubmitResult = {
  recorded: boolean;
  id: string | null;
  error: "closed" | "name" | "description" | "match" | null;
};

export type ShopRow = {
  id: string;
  createdAt: string;
  partnerId: string;
  email: string;
  shopName: string;
  description: string;
  status: PartnerStatus;
  decidedAt: string | null;
};

export type ShopList = {
  operational: boolean;
  authorized: boolean;
  shops: ShopRow[];
};

export const submitShop = createServerFn({ method: "POST" })
  .validator((input: ShopInput) => input)
  .handler(async ({ data }): Promise<ShopSubmitResult> => {
    const { submitPartnerShop } = await import("./partner.server");
    return submitPartnerShop(data);
  });

export const listShops = createServerFn({ method: "GET" }).handler(async (): Promise<ShopList> => {
  const { listPartnerShops } = await import("./partner.server");
  return listPartnerShops();
});

export const decideShop = createServerFn({ method: "POST" })
  .validator((input: { id: string; status: PartnerStatus }) => input)
  .handler(async ({ data }): Promise<{ ok: boolean }> => {
    const { decidePartnerShop } = await import("./partner.server");
    return decidePartnerShop(data);
  });

