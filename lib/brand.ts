export const brand = {
  name: "SUMMIT",
  tagline: "Beyond the Horizon.",
  line: "A new horizon awaits. The ascent begins here.",
  universe: "Ascend",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://summitascend.site",
  ascend: "https://x.com/AscendLaunch",
} as const;

export const navItems = [
  { href: "/#ascent", label: "Ascent" },
  { href: "/#record", label: "Record" },
  { href: "/ascent", label: "Notes" },
] as const;

export const movements = [
  {
    index: "I",
    title: "Cloud sea",
    body: "The first ground is not ground. It moves, and it hides how far the stone really is.",
  },
  {
    index: "II",
    title: "Night stone",
    body: "The face is almost black. Only the edges take a little violet, as if the light above had leaked.",
  },
  {
    index: "III",
    title: "Lit summit",
    body: "The peak is small against the sky and brighter than anything around it. That is the whole invitation.",
  },
] as const;

export const recordFields = [
  { label: "Name", value: "Summit" },
  { label: "Line", value: "Beyond the Horizon." },
  { label: "Universe", value: "Ascend" },
  { label: "Token", value: "Unpublished" },
  { label: "Contract", value: "Unpublished" },
  { label: "Ledger", value: "Not open" },
] as const;

export const questions = [
  {
    q: "What is Summit?",
    a: "A horizon with a name. The mountain is the work you can see. Anything that can be traded or accounted for will be written down only when it exists.",
  },
  {
    q: "What is Ascend?",
    a: "The visual universe this project sits inside: night, distance, and a light that is not quite dawn. Summit is independent. No official affiliation has been verified.",
  },
  {
    q: "Is there a token or a contract?",
    a: "Not published. This site will not invent a supply, a fee, or an address.",
  },
  {
    q: "Where is the record?",
    a: "Closed. When a ledger exists, it will be linked here as a thing you can open, not as a promise.",
  },
] as const;
