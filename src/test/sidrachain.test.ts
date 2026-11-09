import { describe, expect, it } from "vitest";
import { checkSidraTransaction, weiHexToSda } from "@/lib/sidrachain";

const H = "0x" + "ab".repeat(32);
const rpcOf = (tx: unknown, receipt: unknown) => async (m: string) => (m === "eth_getTransactionByHash" ? tx : receipt);

describe("SidraChain transaction check", () => {
  it("converts 1000 SDA in wei", () => {
    expect(weiHexToSda("0x" + (1000n * 10n ** 18n).toString(16))).toBe(1000);
  });
  it("marks a mined successful tx as confirmee", async () => {
    const r = await checkSidraTransaction(H, rpcOf({ value: "0x0", blockNumber: "0x10", to: "0xabc" }, { status: "0x1" }));
    expect(r.status).toBe("confirmee");
  });
  it("marks a reverted tx as echouee", async () => {
    const r = await checkSidraTransaction(H, rpcOf({ value: "0x0", blockNumber: "0x10" }, { status: "0x0" }));
    expect(r.status).toBe("echouee");
  });
  it("marks an unknown hash as introuvable", async () => {
    expect((await checkSidraTransaction(H, rpcOf(null, null))).status).toBe("introuvable");
  });
  it("never claims verification when the network fails", async () => {
    const r = await checkSidraTransaction(H, async () => { throw new Error("down"); });
    expect(r.status).toBe("non_verifiee");
  });
});
