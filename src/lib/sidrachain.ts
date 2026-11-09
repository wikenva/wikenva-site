/**
 * Vérification automatique d'une transaction sur SidraChain (RPC public EVM).
 * Le résultat indique seulement si la transaction existe et a réussi sur la chaîne :
 * il ne prouve PAS qu'elle correspond à une contribution au projet sur SidraStart.
 */
export const SIDRA_RPC_URL = "https://node.sidrachain.com";

export type TxCheckStatus = "confirmee" | "echouee" | "en_attente" | "introuvable" | "non_verifiee";

export type TxCheck = {
  status: TxCheckStatus;
  valueSda: number | null;
  from: string | null;
  to: string | null;
  block: number | null;
};

export const txCheckLabels: Record<TxCheckStatus, string> = {
  confirmee: "Trouvée et réussie sur SidraChain",
  echouee: "Trouvée mais échouée sur SidraChain",
  en_attente: "Trouvée, pas encore confirmée",
  introuvable: "Introuvable sur SidraChain",
  non_verifiee: "Non vérifiée (réseau indisponible)",
};

/** Convertit une valeur hexadécimale en wei vers des SDA (18 décimales). */
export function weiHexToSda(hex: string): number {
  const wei = BigInt(hex);
  const whole = wei / 10n ** 18n;
  const frac = Number(wei % 10n ** 18n) / 1e18;
  return Number(whole) + frac;
}

type Rpc = (method: string, params: unknown[]) => Promise<any>;

export function makeRpc(url = SIDRA_RPC_URL, fetchImpl: typeof fetch = fetch): Rpc {
  return async (method, params) => {
    const res = await fetchImpl(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) throw new Error(`RPC HTTP ${res.status}`);
    const json = (await res.json()) as { result?: unknown; error?: { message: string } };
    if (json.error) throw new Error(json.error.message);
    return json.result;
  };
}

export async function checkSidraTransaction(hash: string, rpc: Rpc = makeRpc()): Promise<TxCheck> {
  const empty: TxCheck = { status: "non_verifiee", valueSda: null, from: null, to: null, block: null };
  try {
    const tx = await rpc("eth_getTransactionByHash", [hash]);
    if (!tx) return { ...empty, status: "introuvable" };
    const base = {
      valueSda: tx.value ? weiHexToSda(tx.value) : null,
      from: tx.from ?? null,
      to: tx.to ?? null,
      block: tx.blockNumber ? Number(BigInt(tx.blockNumber)) : null,
    };
    if (!tx.blockNumber) return { ...base, status: "en_attente" };
    const receipt = await rpc("eth_getTransactionReceipt", [hash]);
    if (!receipt) return { ...base, status: "en_attente" };
    return { ...base, status: receipt.status === "0x1" ? "confirmee" : "echouee" };
  } catch (e) {
    console.error("SidraChain check failed", e instanceof Error ? e.message : e);
    return empty;
  }
}
