import { connection } from "next/server";
import type { TreasuryResponse } from "@/lib/treasury";

export async function GET() {
  await connection();

  const body: TreasuryResponse = {
    status: "unconfigured",
    reason: "Summit has not published a ledger.",
    checkedAt: new Date().toISOString(),
    cluster: "mainnet-beta",
    wallet: null,
    mint: null,
    balances: null,
  };

  return Response.json(body, {
    headers: { "cache-control": "no-store" },
  });
}
