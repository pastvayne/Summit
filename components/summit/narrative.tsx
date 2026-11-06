import Link from "next/link";

export function StatusStrip() {
  return (
    <section className="status-strip" aria-label="Project status">
      <p>
        <span>Ecosystem</span> Ascend
      </p>
      <p>
        <span>Token</span> SUMMIT
      </p>
      <p>
        <span>Contract</span> Pending
      </p>
    </section>
  );
}

export function Hype() {
  return (
    <section id="hype" className="section-anchor hype">
      <div className="hype-copy">
        <p className="eyebrow">Holder mechanics</p>
        <h2 className="display hype-title">Hype. Beyond the summit.</h2>
        <div className="hype-prose">
          <p>
            HYPE is the token of Hyperliquid. SUMMIT intends to buy it with part of the trading fees
            the project collects, then distribute that HYPE to eligible holders.
          </p>
          <p>
            Who qualifies, how often a distribution happens, and how much is sent are not published.
            A distribution can only be as large as the fees that were actually collected and the HYPE
            that was actually bought. This is not a yield, and it is not running yet.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Record() {
  return (
    <section id="record" className="section-anchor record">
      <div className="record-scene" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/summit/hero.jpg" alt="" />
      </div>
      <div className="record-copy">
        <p className="eyebrow">Transparency</p>
        <h2 className="display record-title">The Record</h2>
        <p className="record-lead">Every buyback. Every HYPE purchase. Every distribution. One transparent record.</p>
        <p className="record-body">
          The record will list fees collected, SUMMIT repurchased, HYPE bought, HYPE distributed, and
          the transactions behind them. None of that activity is available to show yet. The contract
          is still pending.
        </p>
        <p className="narrative-follow">
          <Link href="/record" className="text-link">
            Open the record
          </Link>
        </p>
      </div>
    </section>
  );
}

export function Community() {
  return (
    <section id="community" className="section-anchor follow">
      <p className="eyebrow">Close</p>
      <h2 className="display follow-title">Beyond the Horizon.</h2>
      <p className="follow-lead">
        SUMMIT is an independent project in the Ascend ecosystem. No official affiliation has been
        verified. An official SUMMIT account has not been published, so this site does not link one.
      </p>
      <p className="follow-lead">
        <Link href="/about" className="text-link">
          About the project
        </Link>
      </p>
    </section>
  );
}

