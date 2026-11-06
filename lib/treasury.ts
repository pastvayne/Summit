export type TreasuryResponse = {
  status: "unconfigured" | "live" | "error";
  reason: string | null;
  checkedAt: string;
  cluster: "mainnet-beta";
  wallet: string | null;
  mint: string | null;
  balances: null | {
    solLamports: number;
    usdc: null;
    paper: null;
    treasuryValueUsd: null;
    rewards: null;
    buybacks: null;
    burned: null;
  };
};

export const emptyHistories = {
  buybacks: [] as const,
  burns: [] as const,
  transactions: [] as const,
};
