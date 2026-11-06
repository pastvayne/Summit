const BASE58 = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export function isSolanaAddress(value: string | undefined | null): value is string {
  return typeof value === "string" && BASE58.test(value);
}

export function explorerAddress(address: string) {
  return `https://explorer.solana.com/address/${encodeURIComponent(address)}`;
}

export function formatSol(lamports: number) {
  return (lamports / 1_000_000_000).toLocaleString("en-US", {
    maximumFractionDigits: 6,
  });
}
