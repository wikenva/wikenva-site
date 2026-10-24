import tls from "node:tls";
import type { PartnerStatus } from "@/lib/partner";

export const adminGmail = "contact.wikenva@gmail.com";

export type OutboundMail = {
  to: string;
  subject: string;
  text: string;
  html?: string;
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
  const reference = line(input.id, 20);
  if (input.status === "approuvee") {
    return {
      to: line(input.email),
      subject: line(`WIKENVA — candidature ${reference} : partenaire validé`),
      text: [
        `Bonjour ${line(input.name)},`,
        "",
        "VALIDÉ 🎉🎉🎉",
        "",
        "Vous êtes maintenant partenaire de WIKENVA.",
        `Référence : ${reference}`,
        "",
        "Restez connecté pour les mises à jour à venir, et pour découvrir l'espace de la plateforme WIKENVA.",
        "https://www.wikenva-platforme.com/espace",
        "",
        "Réseaux WIKENVA",
        "Facebook : https://www.facebook.com/people/Wikenva/61594737553362/",
        "WhatsApp : https://whatsapp.com/channel/0029Vb9KneTEgGfK0t46G00V",
        "Telegram : https://t.me/+-vHI1dIZj-xlMzE0",
        "X : https://x.com/Wikenva",
        "",
        "WIKENVA",
      ].join("\n"),
      html: approvedHtml(line(input.name), reference),
    };
  }
  const label = statusLabel[input.status];
  return {
    to: line(input.email),
    subject: line(`WIKENVA — candidature ${reference} : ${label}`),
    text: [
      `Bonjour ${line(input.name)},`,
      "",
      `Votre candidature ${reference} a le statut : ${label}.`,
      "Cette décision vient d'un administrateur autorisé.",
      "",
      "WIKENVA",
    ].join("\n"),
  };
}

function approvedHtml(name: string, reference: string) {
  const safeName = name
    .replace(/&/g, "&" + "amp;")
    .replace(/</g, "&" + "lt;")
    .replace(/>/g, "&" + "gt;")
    .replace(/"/g, "&" + "quot;");
  const icon = (file: string, label: string, href: string) =>
    `<td align="center" style="padding:0 8px;"><a href="${href}" style="text-decoration:none;"><img src="https://www.wikenva-platforme.com/media/social/${file}" width="36" height="36" alt="${label}" style="display:block;border:0;border-radius:18px;"><span style="display:block;margin-top:6px;font-size:11px;color:#f3d48a;font-family:Arial,sans-serif;">${label}</span></a></td>`;
  return `<!DOCTYPE html><html><body style="margin:0;background:#07111f;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#07111f;padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:440px;background:#10233a;border-radius:24px;">
<tr><td style="padding:28px 22px 24px;font-family:Arial,sans-serif;color:#ffffff;text-align:center;">
<img src="https://www.wikenva-platforme.com/media/logo-mail-card.png" width="180" alt="WIKENVA" style="display:block;margin:0 auto;border:0;">
<p style="margin:18px auto 0;width:42px;height:2px;background:#d4b06a;font-size:0;line-height:0;">&nbsp;</p>
<p style="margin:16px 0 0;font-size:28px;line-height:1.2;color:#f6c453;font-weight:bold;">VALIDÉ 🎉🎉🎉</p>
<p style="margin:12px 0 0;font-size:16px;line-height:1.45;">Vous êtes maintenant partenaire de WIKENVA.</p>
<p style="margin:8px 0 0;color:#c9d4e3;font-size:14px;">Bonjour ${safeName}</p>
<p style="margin:16px 0 0;color:#f3d48a;letter-spacing:0.12em;font-size:13px;">${reference}</p>
<p style="margin:14px 0 0;font-size:14px;line-height:1.5;color:#e8eef6;">Restez connecté pour les mises à jour à venir.</p>
<p style="margin:20px 0 0;"><a href="https://www.wikenva-platforme.com/espace" style="display:inline-block;background:#f6c453;color:#1a1408;text-decoration:none;font-weight:bold;border-radius:999px;padding:13px 26px;">Découvrir WIKENVA</a></p>
<table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:22px auto 0;">
<tr>
${icon("facebook-mail.png", "Facebook", "https://www.facebook.com/people/Wikenva/61594737553362/")}
${icon("whatsapp-mail.png", "WhatsApp", "https://whatsapp.com/channel/0029Vb9KneTEgGfK0t46G00V")}
${icon("telegram-mail.png", "Telegram", "https://t.me/+-vHI1dIZj-xlMzE0")}
${icon("x-mail.png", "X", "https://x.com/Wikenva")}
</tr>
</table>
</td></tr></table>
</td></tr></table></body></html>`;
}

export async function deliverMail(mail: OutboundMail): Promise<boolean> {
  const key = process.env.RESEND_API_KEY?.trim();
  if (key) return sendResend(mail, key);
  const user = process.env.GMAIL_USER?.trim();
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
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
      body: JSON.stringify({ from, to: [mail.to], subject: mail.subject, text: mail.text, html: mail.html }),
      signal: controller.signal,
    });
    return response.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

function messageBody(mail: OutboundMail, user: string) {
  const content = mail.html ?? mail.text;
  const type = mail.html ? "text/html" : "text/plain";
  return [
    `From: WIKENVA <${user}>`,
    `To: ${mail.to}`,
    `Subject: ${mail.subject}`,
    "MIME-Version: 1.0",
    `Content-Type: ${type}; charset=UTF-8`,
    "",
    content.replace(/^\./gm, ".."),
    ".",
  ].join("\r\n");
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
    }, 20000);
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
        socket.write(`${messageBody(mail, user)}\r\n`);
        return;
      }
      socket.write("QUIT\r\n");
      done(code === 250);
    });
    socket.on("error", () => done(false));
  });
}
