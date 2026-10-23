import tls from "node:tls";
import type { PartnerStatus } from "@/lib/partner";

export const adminGmail = "contact.wikenva@gmail.com";

export type OutboundMail = {
  to: string;
  subject: string;
  text: string;
};

const statusLabel: Record<Exclude<PartnerStatus, "en_attente">, string> = {
  verification: "En vérification",
  approuvee: "Approuvée",
  refusee: "Refusée",
};

function line(value: string, max = 300) {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, max);
}

export function adminInbox() {
  const configured = process.env.WIKENVA_ADMIN_MAIL?.trim().toLowerCase();
  return configured && configured.includes("@") ? configured : adminGmail;
}

export function adminApplicationMail(input: {
  id: string;
  name: string;
  email: string;
  country: string;
  txRef: string;
}): OutboundMail {
  return {
    to: adminInbox(),
    subject: line(`WIKENVA — candidature ${input.id}`),
    text: [
      "Nouvelle candidature partenaire.",
      "Statut : En attente.",
      "Aucune approbation n'est automatique, même si un hash est fourni.",
      "",
      `Référence : ${line(input.id, 20)}`,
      `Nom : ${line(input.name)}`,
      `E-mail : ${line(input.email)}`,
      `Pays : ${line(input.country)}`,
      `Hash de transaction : ${line(input.txRef, 128)}`,
      "",
      "Décision : espace /administration, compte autorisé uniquement.",
    ].join("\n"),
  };
}

export function candidateDecisionMail(input: {
  id: string;
  name: string;
  email: string;
  status: PartnerStatus;
}): OutboundMail | null {
  if (input.status === "en_attente") return null;
  const label = statusLabel[input.status];
  return {
    to: line(input.email),
    subject: line(`WIKENVA — candidature ${input.id} : ${label}`),
    text: [
      `Bonjour ${line(input.name)},`,
      "",
      `Votre candidature ${line(input.id, 20)} a le statut : ${label}.`,
      "Cette décision vient d'un administrateur autorisé.",
      "Un hash de transaction ne suffit jamais à approuver une demande.",
      "",
      "WIKENVA",
    ].join("\n"),
  };
}

export async function deliverMail(mail: OutboundMail): Promise<boolean> {
  const key = process.env.RESEND_API_KEY?.trim();
  if (key) return sendResend(mail, key);
  const user = process.env.GMAIL_USER?.trim();
  const pass = process.env.GMAIL_APP_PASSWORD?.trim();
  if (user && pass) return sendGmail(mail, user, pass);
  return false;
}

async function sendResend(mail: OutboundMail, key: string) {
  const from = process.env.WIKENVA_MAIL_FROM?.trim() || "WIKENVA <onboarding@resend.dev>";
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify({ from, to: [mail.to], subject: mail.subject, text: mail.text }),
      signal: controller.signal,
    });
    return response.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

function sendGmail(mail: OutboundMail, user: string, pass: string) {
  return new Promise<boolean>((resolve) => {
    const socket = tls.connect({ host: "smtp.gmail.com", port: 465, servername: "smtp.gmail.com" });
    const steps = [
      "EHLO wikenva.com",
      "AUTH LOGIN",
      Buffer.from(user).toString("base64"),
      Buffer.from(pass).toString("base64"),
      `MAIL FROM:<${user}>`,
      `RCPT TO:<${mail.to}>`,
      "DATA",
    ];
    let step = 0;
    let wroteBody = false;
    const timer = setTimeout(() => {
      socket.destroy();
      resolve(false);
    }, 8000);
    const done = (ok: boolean) => {
      clearTimeout(timer);
      socket.end();
      resolve(ok);
    };
    socket.on("data", (chunk) => {
      const text = chunk.toString();
      const code = Number(text.slice(0, 3));
      if (!Number.isFinite(code) || code >= 400) return done(false);
      if (step === 0 && code !== 220) return;
      if (step < steps.length) {
        socket.write(`${steps[step++]}\r\n`);
        return;
      }
      if (!wroteBody) {
        wroteBody = true;
        const body = [
          `From: WIKENVA <${user}>`,
          `To: ${mail.to}`,
          `Subject: ${mail.subject}`,
          "MIME-Version: 1.0",
          "Content-Type: text/plain; charset=UTF-8",
          "",
          mail.text.replace(/^\./gm, ".."),
          ".",
        ].join("\r\n");
        socket.write(`${body}\r\n`);
        return;
      }
      socket.write("QUIT\r\n");
      done(code === 250);
    });
    socket.on("error", () => done(false));
  });
}
