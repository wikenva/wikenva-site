/** Neutralise les formules de tableur sans empêcher la lecture des valeurs texte. */
export function csvCell(value: unknown): string {
  const text = String(value ?? "");
  const first = text.trimStart()[0];
  const safe = first && "=+-@".includes(first) ? `'${text}` : text;
  return `"${safe.replace(/"/g, '""')}"`;
}

export function createCsv(headers: unknown[], rows: unknown[][]): string {
  return "\uFEFF" + [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
}
