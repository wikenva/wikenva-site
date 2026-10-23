import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { PGlite } from "@electric-sql/pglite";
import { adminApplicationMail, candidateDecisionMail, deliverMail } from "./partner-mail.server.ts";

const admins = ["adjibodoufelix7@gmail.com", "gbaguidievar@gmail.com"];

function allowed(email: string) {
  const value = email.trim().toLowerCase();
  return value.length > 0 && admins.includes(value);
}

test("une candidature prévient le Gmail admin et reste en attente", () => {
  const mail = adminApplicationMail({
    id: "WK-AB12CD34",
    name: "Awa Diallo",
    email: "awa@example.com",
    country: "Bénin",
    txRef: "0xabc123456789",
  });
  assert.equal(mail.to, "contact.wikenva@gmail.com");
  assert.match(mail.text, /En attente/);
  assert.match(mail.text, /0xabc123456789/);
  assert.match(mail.text, /Aucune approbation/);
  assert.equal(
    candidateDecisionMail({ id: "WK-AB12CD34", name: "Awa Diallo", email: "awa@example.com", status: "en_attente" }),
    null,
  );
});

test("le candidat n'est prévenu qu'après une décision", () => {
  const mail = candidateDecisionMail({
    id: "WK-AB12CD34",
    name: "Awa Diallo",
    email: "awa@example.com",
    status: "approuvee",
  });
  assert.ok(mail);
  assert.equal(mail.to, "awa@example.com");
  assert.match(mail.subject, /validé/);
  assert.match(mail.text, /VALIDÉ/);
  assert.match(mail.text, /partenaire de WIKENVA/);
  assert.match(mail.html ?? "", /Découvrir WIKENVA/);
});

test("aucun e-mail ne part sans clé serveur", async () => {
  delete process.env.RESEND_API_KEY;
  delete process.env.GMAIL_USER;
  delete process.env.GMAIL_APP_PASSWORD;
  delete process.env.WIKENVA_ADMIN_MAIL;
  const sent = await deliverMail({ to: "awa@example.com", subject: "test", text: "test" });
  assert.equal(sent, false);
});

test("le formulaire ne peut pas choisir le statut approuvé", () => {
  const source = readFileSync(new URL("./partner.server.ts", import.meta.url), "utf8");
  const submit = source.slice(source.indexOf("export async function submitPartnerApplication"), source.indexOf("export async function listPartnerApplications"));
  assert.match(submit, /"en_attente"/);
  assert.match(submit, /lower\(email\)/);
  assert.ok(submit.indexOf("lower(email)") < submit.indexOf("insert into partner_applications"));
  assert.equal(submit.includes("input.status"), false);
  assert.equal(allowed("visitor@example.com"), false);
  assert.equal(allowed("adjibodoufelix7@gmail.com"), true);
});

test("PostgreSQL enregistre la demande en attente, puis seulement un admin décide", async () => {
  const db = new PGlite();
  await db.exec(`
    create table partner_applications (
      id text primary key,
      created_at timestamptz not null default now(),
      name text not null,
      email text not null,
      country text not null,
      whatsapp text,
      profile text not null,
      tx_ref text,
      message text,
      consent_terms boolean not null,
      consent_privacy boolean not null,
      status text not null default 'en_attente',
      decided_at timestamptz,
      decided_by text
    )
  `);
  await db.query(
    `insert into partner_applications (id, name, email, country, profile, tx_ref, message, consent_terms, consent_privacy, status)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
    ["WK-AB12CD34", "Awa Diallo", "awa@example.com", "Bénin", "entrepreneur", "0xabc123456789", "Demande avec hash de transaction.", true, true, "en_attente"],
  );
  const created = await db.query<{ status: string }>("select status from partner_applications where id = $1", ["WK-AB12CD34"]);
  assert.equal(created.rows[0].status, "en_attente");

  const stranger = "visitor@example.com";
  if (!allowed(stranger)) {
    const blocked = await db.query<{ status: string }>("select status from partner_applications where id = $1", ["WK-AB12CD34"]);
    assert.equal(blocked.rows[0].status, "en_attente");
  }

  assert.equal(allowed("adjibodoufelix7@gmail.com"), true);
  await db.query("update partner_applications set status = $2, decided_at = now(), decided_by = $3 where id = $1", [
    "WK-AB12CD34",
    "approuvee",
    "adjibodoufelix7@gmail.com",
  ]);
  const decided = await db.query<{ status: string; decided_by: string }>("select status, decided_by from partner_applications where id = $1", ["WK-AB12CD34"]);
  assert.equal(decided.rows[0].status, "approuvee");
  assert.equal(decided.rows[0].decided_by, "adjibodoufelix7@gmail.com");
  const letter = candidateDecisionMail({
    id: "WK-AB12CD34",
    name: "Awa Diallo",
    email: "awa@example.com",
    status: "approuvee",
  });
  assert.match(letter?.text ?? "", /VALIDÉ/);
  await db.close();
});
