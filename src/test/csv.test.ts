import { describe, expect, it } from "vitest";

import { createCsv, csvCell } from "@/lib/csv";

describe("Export CSV de l'administration", () => {
  it.each(["=1+1", "+SUM(A1:A2)", "-2+3", "@commande", "\t=1+1", "  =1+1"])(
    "neutralise la formule %s",
    (value) => {
      expect(csvCell(value)).toBe(`"'${value}"`);
    },
  );

  it("conserve les numéros WhatsApp comme du texte non exécutable", () => {
    expect(csvCell("+229 01 23 45 67 89")).toBe('"\'+229 01 23 45 67 89"');
  });

  it("échappe les guillemets et conserve les valeurs ordinaires", () => {
    expect(csvCell('Amina "A." Diallo')).toBe('"Amina ""A."" Diallo"');
    expect(createCsv(["Nom"], [["Amina"], ["Benoît"]])).toBe('\uFEFF"Nom"\n"Amina"\n"Benoît"');
  });
});
