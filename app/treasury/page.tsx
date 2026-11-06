import type { Metadata } from "next";
import { TreasuryDashboard } from "@/components/treasury-dashboard";

export const metadata: Metadata = {
  title: "Treasury",
  description:
    "PaperMill treasury record for Solana. Balances, rewards, buybacks, and burns stay blank until a verified source is configured.",
  alternates: { canonical: "/treasury" },
};

export default function TreasuryPage() {
  return <TreasuryDashboard />;
}
