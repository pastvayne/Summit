export const brand = {
  name: "SUMMIT",
  tagline: "Beyond the Horizon.",
  line: "Designed to turn trading fees into SUMMIT buybacks and KNTQ distributions for eligible holders.",
  universe: "Ascend",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://summitascend.site",
  ascend: "https://x.com/AscendLaunch",
  x: "https://x.com/SummitElysium",
  xHandle: "@SummitElysium",
  ascendHandle: "@AscendLaunch",
} as const;

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/ascent", label: "Ascent" },
  { href: "/record", label: "Record" },
  { href: "/about", label: "About" },
] as const;

/** What is and is not published yet. One source for the hero strip, KNTQ sheet and pages. */
export const status = [
  { label: "Contract", value: "Pending" },
  { label: "Fee split", value: "Not published" },
  { label: "Eligibility", value: "Not published" },
  { label: "Record", value: "No entries yet" },
] as const;

/** The camps the altimeter rail climbs through on the home page, bottom to top. */
export const camps = [
  { id: "overview", short: "Base", label: "Summit" },
  { id: "engine", short: "I", label: "The engine" },
  { id: "kntq", short: "II", label: "KNTQ" },
  { id: "record", short: "III", label: "The record" },
  { id: "community", short: "Top", label: "Horizon" },
] as const;

export const recordFields = [
  { label: "Ecosystem", value: "Ascend" },
  { label: "Token", value: "SUMMIT" },
  { label: "Contract", value: "Pending" },
  { label: "Buybacks", value: "Not yet recorded" },
  { label: "KNTQ purchases", value: "Not yet recorded" },
  { label: "KNTQ distributions", value: "Not yet recorded" },
] as const;

/** Columns the public record will carry once activity exists. */
export const ledgerColumns = [
  "Date",
  "Fees collected",
  "SUMMIT repurchased",
  "KNTQ bought",
  "KNTQ distributed",
  "Transaction",
] as const;

export const kntqSheet = [
  { label: "Role", value: "Distributed to eligible SUMMIT holders" },
  { label: "Source", value: "Bought with a share of collected fees" },
  { label: "Eligibility", value: "Not published" },
  { label: "Frequency", value: "Not published" },
  { label: "Amount", value: "Bounded by fees collected and KNTQ bought" },
  { label: "Status", value: "Not running" },
] as const;
