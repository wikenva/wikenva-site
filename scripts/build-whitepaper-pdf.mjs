import { createWriteStream } from "node:fs";
import { finished } from "node:stream/promises";
import PDFDocument from "pdfkit";
import { founderDecisions, paperMeta, paperSections } from "../src/content/whitepaper.ts";

const out = new URL("../public/wikenva-livre-blanc.pdf", import.meta.url);
const doc = new PDFDocument({ size: "A4", margin: 56, bufferPages: true });
const stream = createWriteStream(out);
doc.pipe(stream);

const navy = "#07101c";
const gold = "#8a6a1f";
const muted = "#334155";

function h1(text) {
  doc.moveDown(0.4);
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(22).text(text, { align: "left" });
  doc.moveDown(0.3);
}

function h2(index, text) {
  doc.moveDown(0.8);
  doc.fillColor(gold).font("Helvetica-Bold").fontSize(11).text(index);
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(16).text(text);
  doc.moveDown(0.3);
}

function p(text) {
  doc.fillColor(navy).font("Helvetica").fontSize(11).text(text, { align: "left", lineGap: 3 });
  doc.moveDown(0.45);
}

function note(text) {
  doc.fillColor(gold).font("Helvetica-Bold").fontSize(11).text(text, { align: "left", lineGap: 3 });
  doc.moveDown(0.45);
}

doc.rect(0, 0, doc.page.width, 8).fill("#1b56c9");
doc.fillColor(navy).font("Helvetica-Bold").fontSize(12).text("WIKENVA", 56, 72, { characterSpacing: 2 });
doc.moveDown(1.2);
doc.fontSize(28).text(paperMeta.coverTitle.fr);
doc.moveDown(0.4);
doc.fillColor(muted).font("Helvetica").fontSize(12).text(paperMeta.coverLede.fr, { lineGap: 3 });
doc.moveDown(1);
p(`${paperMeta.status.fr}`);
p(`Fondateur : ${paperMeta.founder}, ${paperMeta.role.fr}`);
p("Écosystème : SidraChain — sidrachain.com");
p(`Site indiqué : ${paperMeta.website}`);
p("Campagne : SidraStart — Digital Marketplace Ebook Halal");
note(paperMeta.disclaimer.fr);
p("Ce fichier est la version de relecture. Il ne constitue pas une offre, un conseil en investissement, ni un contrat.");

doc.addPage();
h1("Sommaire");
for (const section of paperSections) {
  doc.fillColor(navy).font("Helvetica").fontSize(11).text(`${section.index}   ${section.title.fr}`);
}
doc.moveDown(0.4);
doc.font("Helvetica").fontSize(11).text("Décisions à prendre par le fondateur");

for (const section of paperSections) {
  h2(section.index, section.title.fr);
  for (const block of section.blocks) {
    if (block.type === "note" && block.text) note(block.text.fr);
    else if (block.type === "items" && block.items) {
      for (const item of block.items) {
        doc.fillColor(navy).font("Helvetica").fontSize(11).text(`•  ${item.fr}`, { lineGap: 2 });
        doc.moveDown(0.25);
      }
      doc.moveDown(0.3);
    } else if (block.text) p(block.text.fr);
  }
}

h2("", "Décisions à prendre par le fondateur");
founderDecisions.forEach((item, index) => {
  doc.fillColor(navy).font("Helvetica").fontSize(11).text(`${index + 1}.  ${item.fr}`, { lineGap: 2 });
  doc.moveDown(0.3);
});

const range = doc.bufferedPageRange();
for (let i = range.start; i < range.start + range.count; i += 1) {
  doc.switchToPage(i);
  doc.fillColor(muted).font("Helvetica").fontSize(9).text(
    `WIKENVA  ·  Livre blanc  ·  version de relecture  ·  ${i + 1} / ${range.count}`,
    56,
    doc.page.height - 42,
    { width: doc.page.width - 112, align: "left", lineBreak: false },
  );
}

doc.end();
await finished(stream);
console.log("wrote", out.pathname);
