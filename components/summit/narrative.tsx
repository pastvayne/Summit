import Link from "next/link";
import { brand, kntqSheet, ledgerColumns } from "@/lib/brand";
import { Arrow } from "@/components/arrow";
import { RIDGE_AREA, RIDGE_LINE, RIDGE_PEAK, RIDGE_POINTS, RIDGE_VIEW } from "@/components/summit/ridge";

export function Hype() {
  return (
    <section id="kntq" className="section-anchor kntq" aria-labelledby="kntq-title">
      <div className="kntq-sheet">
        <div className="sheet-head">
          <p className="sheet-mark" aria-hidden="true">
            KNTQ
          </p>
          <p className="sheet-kicker">Distribution asset · spec sheet</p>
        </div>
        <dl className="facts facts-sheet">
          {kntqSheet.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              <dd className={row.value.startsWith("Not") ? "is-pending" : undefined}>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="kntq-copy">
        <p className="camp-tag">
          <span>Camp II</span>Holder mechanics
        </p>
        <h2 id="kntq-title" className="display section-title">
          Beyond the summit.
        </h2>
        <div className="prose">
          <p>
            SUMMIT intends to buy KNTQ with part of the trading fees it collects, then distribute that
            KNTQ to eligible holders. What KNTQ is, beyond that role, has not been published here.
          </p>
          <p>
            Who qualifies, how often a distribution happens, and how much is sent are still pending.
            A distribution can only be as large as the fees that were actually collected and the KNTQ
            that was actually bought.
          </p>
        </div>
        <ul className="is-not" aria-label="What this is not">
          <li>
            <span className="is-not-mark" aria-hidden="true" />
            Not a yield
          </li>
          <li>
            <span className="is-not-mark" aria-hidden="true" />
            Not running yet
          </li>
          <li>
            <span className="is-not-mark" aria-hidden="true" />
            Not a promise of price
          </li>
        </ul>
      </div>
    </section>
  );
}

/** Waypoints placed up the traced ridge to its summit, one per column of the public record. */
const PEAK_AT = RIDGE_PEAK.x / RIDGE_VIEW.width;
const waypoints = [
  { at: PEAK_AT - 0.155, label: "Fees collected" },
  { at: PEAK_AT - 0.115, label: "SUMMIT repurchased" },
  { at: PEAK_AT - 0.075, label: "KNTQ bought" },
  { at: PEAK_AT - 0.037, label: "KNTQ distributed" },
  { at: PEAK_AT, label: "Transaction" },
] as const;

function ridgeY(x: number) {
  const target = x * RIDGE_VIEW.width;
  for (let i = 1; i < RIDGE_POINTS.length; i += 1) {
    const [x1, y1] = RIDGE_POINTS[i];
    if (x1 >= target) {
      const [x0, y0] = RIDGE_POINTS[i - 1];
      const t = (target - x0) / Math.max(0.001, x1 - x0);
      return y0 + (y1 - y0) * t;
    }
  }
  return RIDGE_POINTS[RIDGE_POINTS.length - 1][1];
}

export function RidgeProfile({ compact = false }: { compact?: boolean }) {
  const pad = 14;
  const h = RIDGE_VIEW.height + pad;
  return (
    <figure className={`ridge${compact ? " is-compact" : ""}`}>
      <svg
        viewBox={`0 ${-pad} ${RIDGE_VIEW.width} ${h}`}
        preserveAspectRatio="none"
        role="img"
        aria-label="The summit's ridge line, with one waypoint for each column the record will carry."
      >
        <defs>
          <linearGradient id="ridge-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--violet)" stopOpacity="0.16" />
            <stop offset="1" stopColor="var(--violet)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1="0"
            x2={RIDGE_VIEW.width}
            y1={RIDGE_VIEW.height * f}
            y2={RIDGE_VIEW.height * f}
            className="ridge-grid"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <path d={RIDGE_AREA} fill="url(#ridge-fill)" />
        <path d={RIDGE_LINE} className="ridge-line" vectorEffect="non-scaling-stroke" />
        {waypoints.map((w) => (
          <line
            key={w.label}
            x1={w.at * RIDGE_VIEW.width}
            x2={w.at * RIDGE_VIEW.width}
            y1={ridgeY(w.at)}
            y2={RIDGE_VIEW.height}
            className="ridge-drop"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <ol className="ridge-points">
        {waypoints.map((w, i) => (
          <li
            key={w.label}
            style={{
              left: `${w.at * 100}%`,
              top: `${((ridgeY(w.at) + pad) / h) * 100}%`,
            }}
            className={i === waypoints.length - 1 ? "is-peak" : undefined}
          >
            <span className="ridge-dot" aria-hidden="true" />
            <span className="ridge-label">
              <span className="ridge-n">{String(i + 1).padStart(2, "0")}</span>
              {w.label}
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function Ledger() {
  return (
    <div className="ledger">
      <div className="ledger-scroll" role="region" aria-label="Public record columns" tabIndex={0}>
        <table>
          <caption className="sr-only">
            Public record of buybacks, KNTQ purchases and distributions. No entries yet.
          </caption>
          <thead>
            <tr>
              {ledgerColumns.map((col, index) => (
                <th key={col} scope="col">
                  {index > 0 ? <span className="ledger-n">{String(index).padStart(2, "0")}</span> : null}
                  {col}
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>
      <p className="ledger-empty">
        <span className="empty-mark" aria-hidden="true" />
        No entries yet. The contract is pending, and figures will not be estimated.
      </p>
    </div>
  );
}

export function Record() {
  return (
    <section id="record" className="section-anchor record" aria-labelledby="record-title">
      <header className="section-head record-head">
        <div>
          <p className="camp-tag">
            <span>Camp III</span>Transparency
          </p>
          <h2 id="record-title" className="display section-title">
            The Record
          </h2>
        </div>
        <div>
          <p className="section-lead">Every buyback. Every KNTQ purchase. Every distribution. One transparent record.</p>
          <p className="section-sub">
            The record will list fees collected, SUMMIT repurchased, KNTQ bought, KNTQ distributed, and
            the transactions behind them. None of that activity is available to show yet.
          </p>
        </div>
      </header>
      <RidgeProfile />
      <Ledger />
      <p className="section-follow">
        <Link href="/record" className="text-link">
          Open the record
          <Arrow direction="right" />
        </Link>
      </p>
    </section>
  );
}

export function Community() {
  return (
    <section id="community" className="section-anchor horizon" aria-labelledby="horizon-title">
      <div className="horizon-plate" aria-hidden="true">
        <picture>
          <source
            media="(max-width: 767px)"
            type="image/webp"
            srcSet="/summit/peak-tall-780.webp 780w, /summit/peak-tall-1170.webp 1170w"
            sizes="100vw"
          />
          <source
            type="image/webp"
            srcSet="/summit/peak-wide-1600.webp 1600w, /summit/peak-wide-2560.webp 2560w"
            sizes="100vw"
          />
          <img src="/summit/peak-wide-1600.jpg" alt="" width={2560} height={1440} loading="lazy" decoding="async" />
        </picture>
      </div>
      <div className="horizon-copy">
        <p className="camp-tag">
          <span>Summit</span>Arrival
        </p>
        <h2 id="horizon-title" className="display horizon-title">
          Beyond the Horizon.
        </h2>
        <p className="horizon-lead">
          SUMMIT is an independent project in the Ascend ecosystem. No official affiliation has been
          verified.
        </p>
        <div className="hero-actions">
          <a className="btn btn-solid" href={brand.x} target="_blank" rel="noreferrer">
            Follow Summit on X
            <Arrow />
          </a>
          <a className="btn btn-line" href={brand.ascend} target="_blank" rel="noreferrer">
            Ascend on X
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
