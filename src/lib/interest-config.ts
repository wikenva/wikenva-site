export type ReceptionGap = "database" | "auth" | "admins";

export type InterestKind = "contribution" | "actionnaire";

export type InterestInput = {
  kind: InterestKind;
  name: string;
  email: string;
  sidraUsername: string;
  amount: string;
  consent: boolean;
};

export type SubmitResult = {
  recorded: boolean;
  notified: boolean;
  missing: ReceptionGap[];
  id: string | null;
  error: "consent" | "email" | "name" | "amount" | "kind" | null;
};

export type InterestRow = {
  id: string;
  createdAt: string;
  kind: InterestKind;
  name: string | null;
  email: string;
  sidraUsername: string | null;
  amount: string | null;
  status: string;
};

export type ApplicationStatus = "recue" | "approuvee" | "refusee";

export type ApplicationLookup = {
  found: boolean;
  status: ApplicationStatus | null;
  unavailable: boolean;
};

export type ApplicationDecision = "approuvee" | "refusee";

export type InterestList = {
  operational: boolean;
  authorized: boolean;
  missing: ReceptionGap[];
  requests: InterestRow[];
};

export type CaptureInput = {
  name: string;
  email: string;
  contentType: string;
  imageData: string;
};

export type CaptureResult = {
  recorded: boolean;
  id: string | null;
  error: "email" | "file" | null;
  missing: ReceptionGap[];
};

export type CaptureRow = {
  id: string;
  createdAt: string;
  email: string;
  name: string | null;
  contentType: string;
  imageData: string;
  status: string;
};

export function receptionStatus(env: {
  databaseUrl?: string;
  authEnabled?: string;
  adminEmails?: string;
  notifyWebhook?: string;
}) {
  const admins = (env.adminEmails ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter((item) => item.includes("@"));
  const webhook = env.notifyWebhook?.trim() ?? "";
  const missing: ReceptionGap[] = [];
  if (!env.databaseUrl?.trim()) missing.push("database");
  if (env.authEnabled === "false") missing.push("auth");
  if (admins.length === 0) missing.push("admins");
  return {
    operational: missing.length === 0,
    missing,
    admins,
    webhook: webhook.startsWith("https://") ? webhook : null,
  };
}
