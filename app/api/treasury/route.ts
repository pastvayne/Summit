import { connection } from "next/server";
import { site } from "@/lib/protocol";
import { isSolanaAddress } from "@/lib/solana";
import type { TreasuryResponse } from "@/lib/treasury";

export async function GET() {
  await connection();

  const verified = process.env.TREASURY_SOURCE_VERIFIED === "true";
  const override = process.env.TREASURY_WALLET?.trim() ?? "";
  const wallet = verified && isSolanaAddress(override) ? override : site.treasuryWallet;
  const mint = process.env.MILL_MINT?.trim() ?? "";
  const checkedAt = new Date().toISOString();
  const publishedMint = isSolanaAddress(mint) ? mint : null;

  if (!isSolanaAddress(wallet)) {
    const body: TreasuryResponse = {
      status: "unconfigured",
      reason: "No verified treasury wallet is configured for this deployment.",
      checkedAt,
      cluster: "mainnet-beta",
      wallet: null,
      mint: publishedMint,
      balances: null,
    };
    return Response.json(body, {
      headers: { "cache-control": "no-store" },
    });
  }

  const rpc = process.env.SOLANA_RPC_URL?.trim() || "https://api.mainnet-beta.solana.com";

  try {
    const response = await fetch(rpc, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: [wallet],
      }),
      cache: "no-store",
    });
    const json = (await response.json()) as { result?: { value?: unknown } };
    const lamports = json.result?.value;

    if (!response.ok || typeof lamports !== "number") {
      const body: TreasuryResponse = {
        status: "error",
        reason: "The Solana RPC response did not include a balance.",
        checkedAt,
        cluster: "mainnet-beta",
        wallet,
        mint: publishedMint,
        balances: null,
      };
      return Response.json(body, { status: 502, headers: { "cache-control": "no-store" } });
    }

    const body: TreasuryResponse = {
      status: "live",
      reason: null,
      checkedAt,
      cluster: "mainnet-beta",
      wallet,
      mint: publishedMint,
      balances: {
        solLamports: lamports,
        usdc: null,
        paper: null,
        treasuryValueUsd: null,
        rewards: null,
        buybacks: null,
        burned: null,
      },
    };
    return Response.json(body, { headers: { "cache-control": "no-store" } });
  } catch {
    const body: TreasuryResponse = {
      status: "error",
      reason: "The treasury source could not be reached.",
      checkedAt,
      cluster: "mainnet-beta",
      wallet,
      mint: publishedMint,
      balances: null,
    };
    return Response.json(body, { status: 502, headers: { "cache-control": "no-store" } });
  }
}
