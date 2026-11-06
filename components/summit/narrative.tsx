import Link from "next/link";
import { brand } from "@/lib/brand";

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
    <section id="kntq" className="section-anchor hype">
      <p className="kntq-mark" aria-hidden="true">
        KNTQ
      </p>
      <div className="hype-copy">
        <p className="eyebrow">Holder mechanics</p>
        <h2 className="display hype-title">Beyond the summit.</h2>
        <div className="hype-prose">
          <p>
            SUMMIT intends to buy KNTQ with part of the trading fees it collects, then distribute that
            KNTQ to eligible holders. What KNTQ is, beyond that role, has not been published here.
          </p>
          <p>
            Who qualifies, how often a distribution happens, and how much is sent are still pending.
            A distribution can only be as large as the fees that were actually collected and the KNTQ
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
        <p className="record-lead">Every buyback. Every KNTQ purchase. Every distribution. One transparent record.</p>
        <p className="record-body">
          The record will list fees collected, SUMMIT repurchased, KNTQ bought, KNTQ distributed, and
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
        verified.
      </p>
      <p className="follow-lead">
        <a className="text-link" href={brand.x} target="_blank" rel="noreferrer">
          Follow Summit
        </a>
      </p>
    </section>
  );
}

