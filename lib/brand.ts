export const brand = {
  name: "SUMMIT",
  tagline: "Beyond the Horizon.",
  line: "An independent project exploring new possibilities within the Ascend ecosystem.",
  universe: "Ascend",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://summitascend.site",
  ascend: "https://x.com/AscendLaunch",
} as const;

export const navItems = [
  { href: "/#ascent", label: "Ascent" },
  { href: "/#record", label: "Status" },
  { href: "/ascent", label: "Notes" },
] as const;

export const movements = [
  {
    index: "I",
    title: "The project",
    body: "SUMMIT is independent. It sits in the Ascend ecosystem without claiming to speak for it.",
  },
  {
    index: "II",
    title: "What is public",
    body: "The name, this site, and the mountain. No token, contract, or ledger has been published.",
  },
  {
    index: "III",
    title: "What follows",
    body: "Further work will be written here when it exists. Until then, the status stays plain.",
  },
] as const;

export const recordFields = [
  { label: "Name", value: "Summit" },
  { label: "Line", value: "Beyond the Horizon." },
  { label: "Ecosystem", value: "Ascend" },
  { label: "Relationship", value: "Independent" },
  { label: "Token", value: "Not published" },
  { label: "Contract", value: "Not published" },
  { label: "Ledger", value: "Not open" },
] as const;
