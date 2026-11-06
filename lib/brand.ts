export const brand = {
  name: "SUMMIT",
  tagline: "Beyond the Horizon.",
  line: "Designed to turn trading fees into SUMMIT buybacks and KNTQ distributions for eligible holders.",
  universe: "Ascend",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://summitascend.site",
  ascend: "https://x.com/AscendLaunch",
  x: "https://x.com/SummitElysium",
} as const;

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/ascent", label: "Ascent" },
  { href: "/record", label: "Record" },
  { href: "/about", label: "About" },
] as const;

export const recordFields = [
  { label: "Ecosystem", value: "Ascend" },
  { label: "Token", value: "SUMMIT" },
  { label: "Contract", value: "Pending" },
  { label: "Buybacks", value: "Not yet recorded" },
  { label: "KNTQ purchases", value: "Not yet recorded" },
  { label: "KNTQ distributions", value: "Not yet recorded" },
] as const;
