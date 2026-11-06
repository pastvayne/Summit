export const site = {
  name: "PaperMill",
  ticker: "$MILL",
  network: "Solana",
  ecosystem: "Papertrade",
  tagline: "The Mill Never Stops.",
  subtitle: "A Solana-native treasury strategy built around the Papertrade ecosystem.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://papermill.website",
  treasuryWallet: "8kKtHPN7AiwZLoDUukwvR6fgc6hXQ1oXV44stEaZXamQ",
} as const;

export const navItems = [
  { href: "/#overview", label: "Overview" },
  { href: "/#mechanism", label: "How It Works" },
  { href: "/treasury", label: "Treasury" },
  { href: "/#faq", label: "FAQ" },
] as const;

export const stages = [
  {
    id: "collect",
    index: "01",
    title: "Collect",
    summary: "Eligible trading activity generates fees.",
    body: "The raw material is a fee that trading activity produces and that reaches PaperMill. A creator fee on Solana and a Token-2022 transfer fee are different mechanisms. They are not interchangeable.",
    check: "A fee another program keeps is not a PaperMill fee.",
  },
  {
    id: "accumulate",
    index: "02",
    title: "Accumulate",
    summary: "Fees enter the PaperMill treasury.",
    body: "Eligible fees settle in a Solana treasury wallet. The treasury is a holding place with a public address, not a yield product.",
    check: "SOL and token accounts for a treasury wallet can be read on a Solana explorer.",
  },
  {
    id: "deploy",
    index: "03",
    title: "Deploy",
    summary: "Treasury assets are allocated toward supported PAPER-related strategies.",
    body: "The design allocates treasury assets toward PAPER-related strategies that Papertrade actually supports. PAPER is not assumed to be freely buyable, transferable, bridgeable, or stakeable. If the venue does not support a step, that step stays off.",
    check: "An allocation is real only after a transaction leaves the treasury for a destination the protocol has identified.",
  },
  {
    id: "harvest",
    index: "04",
    title: "Harvest",
    summary: "Eligible strategy rewards are collected.",
    body: "If a supported strategy pays a reward, that reward is collected and accounted for after it arrives. PaperMill does not advertise a rate, and expected rewards are not treated as realized ones.",
    check: "Reward accounting should point at the receipt, not at a projection.",
  },
  {
    id: "recycle",
    index: "05",
    title: "Recycle",
    summary: "Realized rewards fund $MILL buybacks and burns.",
    body: "Value that has been received funds market buybacks of $MILL. A burn is a separate action from a buyback.",
    check: "A buyback or burn is a Solana transaction with a signature anyone can open.",
  },
] as const;

export const allocationRows = [
  { name: "Incoming fees" },
  { name: "Treasury reserves" },
  { name: "Supported PAPER strategies" },
  { name: "Realized rewards reserved for buybacks" },
  { name: "Burns" },
] as const;

export const tokenFields = [
  { label: "Token", value: "PaperMill", note: "Asset name" },
  { label: "Ticker", value: "$MILL", note: "Symbol" },
  { label: "Network", value: "Solana", note: "Chain" },
] as const;

export const risks = [
  {
    title: "PAPER support",
    body: "The strategy uses Papertrade functionality, asset transferability, and any cross-chain path a step requires.",
  },
  {
    title: "Rewards",
    body: "No rate is quoted. A strategy can pay nothing.",
  },
  {
    title: "Markets and liquidity",
    body: "Thin liquidity can move price or prevent a trade.",
  },
  {
    title: "Contracts, keys, and operations",
    body: "Bugs and operational mistakes can lose funds.",
  },
  {
    title: "Cross-chain infrastructure",
    body: "Bridges and message layers can halt, censor, or fail.",
  },
  {
    title: "The token can lose all value",
    body: "Nothing here is a quote of price, yield, or return of capital.",
  },
] as const;

export const faqs = [
  {
    question: "What is PaperMill?",
    answer:
      "PaperMill is a Solana token and treasury strategy in the Papertrade ecosystem. Trading fees accumulate in a treasury, treasury assets go to supported PAPER strategies, and realized rewards fund buybacks of $MILL. A burn is separate from a buyback.",
  },
  {
    question: "How does the treasury work?",
    answer:
      "Eligible fees settle in a PaperMill treasury wallet on Solana. Assets from that wallet are allocated to PAPER strategies the protocol can use. Rewards that have been received fund buybacks.",
  },
  {
    question: "What is the relationship between PaperMill and Papertrade?",
    answer:
      "PaperMill sits in the Papertrade ecosystem. It is a separate project. It does not control Papertrade, and it does not inherit Papertrade balances, users, or product guarantees.",
  },
  {
    question: "Where do trading fees come from?",
    answer:
      "From trading activity that generates an eligible creator or protocol fee payable to PaperMill. Solana creator fees and Token-2022 transfer fees are different mechanisms and are not the same thing.",
  },
  {
    question: "How are rewards generated?",
    answer:
      "Treasury assets allocated to a PAPER-related strategy can pay a reward. The reward counts when it is collected. PaperMill does not quote a rate.",
  },
  {
    question: "How do buybacks work?",
    answer:
      "Realized rewards buy $MILL in the market. Those purchases are ordinary Solana transactions. A buyback is not a burn.",
  },
  {
    question: "Can I verify treasury activity?",
    answer:
      "Wallet balances, transfers, buybacks, and burns on Solana can be opened in a Solana explorer. On-chain records are the check.",
  },
  {
    question: "What risks are involved?",
    answer:
      "PAPER mechanisms can block a step. Fees can be absent. Rewards can be zero. Buybacks can fail for liquidity reasons. Cross-chain transfers can fail. Keys and operational mistakes can lose funds. Tokens can go to zero.",
  },
  {
    question: "Is PaperMill officially affiliated with Papertrade?",
    answer:
      "No official affiliation has been verified. PaperMill is independent.",
  },
] as const;
