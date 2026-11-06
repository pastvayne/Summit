"use client";

import { ExternalLink, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { AllocationChart, TreasuryCharts } from "@/components/treasury-charts";
import { rangeKeys, type RangeKey } from "@/lib/fixtures";
import { site } from "@/lib/protocol";
import { explorerAddress, formatSol } from "@/lib/solana";
import type { TreasuryResponse } from "@/lib/treasury";

type LoadState =
  | { kind: "loading" }
  | { kind: "ready"; data: TreasuryResponse }
  | { kind: "error" };

const metrics = [
  { key: "treasury", label: "Total treasury value" },
  { key: "sol", label: "SOL balance" },
  { key: "usdc", label: "USDC balance" },
  { key: "paper", label: "PAPER holdings" },
  { key: "rewards", label: "Rewards generated" },
  { key: "buybacks", label: "Total buybacks" },
  { key: "burned", label: "Total burned" },
] as const;

function formatChecked(value: string | undefined) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(date) + " UTC";
}

export function TreasuryDashboard() {
  const [state, setState] = useState<LoadState>({ kind: "loading" });
  const [attempt, setAttempt] = useState(0);
  const [preview, setPreview] = useState(false);
  const [range, setRange] = useState<RangeKey>("30D");

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setState({ kind: "loading" });
      try {
        const response = await fetch("/api/treasury", { cache: "no-store", signal: controller.signal });
        const data = (await response.json()) as TreasuryResponse;
        if (!data || !data.status) throw new Error("Empty treasury response");
        setState({ kind: "ready", data });
      } catch {
        if (controller.signal.aborted) return;
        setState({ kind: "error" });
      }
    }
    void load();
    return () => controller.abort();
  }, [attempt]);

  const data = state.kind === "ready" ? state.data : null;
  const liveSol =
    data?.status === "live" && data.balances ? `${formatSol(data.balances.solLamports)} SOL` : null;

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="font-mono text-[11px] tracking-[0.22em] text-brass uppercase">Treasury workspace</p>
          <h1 className="mt-3 font-serif text-5xl tracking-tight text-paper sm:text-6xl">Treasury record.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
            Balances, allocations, rewards, buybacks, and burns. This page does not connect a wallet
            or sign a transaction.
          </p>
        </div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Figure mode">
          <button
            type="button"
            role="tab"
            aria-selected={!preview}
            className={`btn ${preview ? "btn-ghost" : "btn-solid"}`}
            onClick={() => setPreview(false)}
          >
            Published record
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={preview}
            className={`btn ${preview ? "btn-solid" : "btn-ghost"}`}
            onClick={() => setPreview(true)}
          >
            Layout preview
          </button>
        </div>
      </div>

      <dl className="mt-8 grid gap-px bg-line sm:grid-cols-3">
        <div className="bg-ink-2 px-4 py-4">
          <dt className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">Source</dt>
          <dd className="mt-2 text-sm text-paper">
            {state.kind === "loading"
              ? "Checking"
              : data?.status === "live"
                ? "Verified wallet"
                : data?.status === "error"
                  ? "Source error"
                  : "Unconfigured"}
          </dd>
        </div>
        <div className="bg-ink-2 px-4 py-4">
          <dt className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">Cluster</dt>
          <dd className="mt-2 text-sm text-paper">Solana mainnet-beta</dd>
        </div>
        <div className="bg-ink-2 px-4 py-4">
          <dt className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">Last checked</dt>
          <dd className="mt-2 text-sm text-paper">{state.kind === "ready" ? formatChecked(data?.checkedAt) : "—"}</dd>
        </div>
      </dl>

      {preview ? (
        <p className="mt-4 border border-brass bg-brass/10 px-4 py-3 text-sm leading-6 text-paper" role="status">
          Development preview. Charts in this mode use a synthetic fixture index so the layout can be
          reviewed. They are not balances, rewards, prices, or transactions. Addresses and history
          tables stay empty.
        </p>
      ) : null}

      {state.kind === "error" ? (
        <div className="mt-6 border border-line p-5" role="alert">
          <p className="font-serif text-2xl text-paper">The treasury source did not respond.</p>
          <p className="mt-2 text-sm text-muted">No sample balances were substituted for the missing response.</p>
          <button type="button" className="btn btn-ghost mt-4" onClick={() => setAttempt((value) => value + 1)}>
            <RefreshCw aria-hidden="true" size={16} />
            Try again
          </button>
        </div>
      ) : null}

      {data?.status === "error" && data.reason ? (
        <p className="mt-4 text-sm text-brass" role="status">
          {data.reason}
        </p>
      ) : null}

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-busy={state.kind === "loading"}>
        {metrics.map((metric) => (
          <article
            key={metric.key}
            className={`border border-line bg-ink-2 px-5 py-6 shadow-paper ${metric.key === "treasury" ? "xl:col-span-2" : ""}`}
          >
            <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">{metric.label}</p>
            {state.kind === "loading" ? (
              <div className="mt-4 h-10 w-24 animate-pulse bg-panel motion-reduce:animate-none" />
            ) : (
              <p className="mt-3 font-serif text-4xl text-paper">
                {metric.key === "sol" && liveSol ? liveSol : "—"}
              </p>
            )}
            {metric.key === "sol" && liveSol ? (
              <p className="mt-2 text-sm text-brass">Read from the configured wallet</p>
            ) : state.kind === "loading" ? (
              <p className="mt-2 text-sm text-brass">Loading</p>
            ) : null}
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-2" aria-label="History range">
        {rangeKeys.map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={range === key}
            onClick={() => setRange(key)}
            className={`min-h-10 px-3 font-mono text-[11px] tracking-[0.14em] ${
              range === key ? "bg-paper text-ink" : "border border-line text-paper-dim"
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_0.9fr]">
        <TreasuryCharts preview={preview} range={range} />
        <AllocationChart preview={preview} />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <HistoryPanel
          title="Buyback history"
          body="No buyback signatures."
        />
        <HistoryPanel
          title="Burn history"
          body="No burn signatures."
        />
        <HistoryPanel
          title="Strategy allocations"
          body="No allocation transactions."
        />
      </div>

      <section className="mt-8" aria-labelledby="tx-heading">
        <div className="flex items-end justify-between gap-4">
          <h2 id="tx-heading" className="font-serif text-3xl text-paper">
            Treasury transactions
          </h2>
          <p className="text-xs text-muted">No rows are synthesized</p>
        </div>
        <div className="mt-4 overflow-x-auto border border-line">
          <table className="w-full min-w-[720px] text-left text-sm">
            <caption className="sr-only">Treasury transactions. None have been published.</caption>
            <thead className="bg-ink-2 font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
              <tr>
                <th className="px-4 py-3 font-normal">Time</th>
                <th className="px-4 py-3 font-normal">Type</th>
                <th className="px-4 py-3 font-normal">Asset</th>
                <th className="px-4 py-3 font-normal">Amount</th>
                <th className="px-4 py-3 font-normal">Signature</th>
                <th className="px-4 py-3 font-normal">Explorer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-muted">
                  No treasury transactions.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2" aria-label="Addresses">
        <AddressCard
          label="Treasury wallet"
          address={data?.wallet ?? site.treasuryWallet}
          empty="—"
        />
        <AddressCard label="Token mint" address={data?.mint ?? null} empty="—" />
      </section>
    </div>
  );
}

function HistoryPanel({ title, body }: { title: string; body: string }) {
  return (
    <article className="border border-line p-5">
      <h2 className="font-serif text-2xl text-paper">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
      <p className="mt-6 font-serif text-4xl text-paper">—</p>
    </article>
  );
}

function AddressCard({
  label,
  address,
  empty,
}: {
  label: string;
  address: string | null;
  empty: string;
}) {
  return (
    <article className="border border-line p-5">
      <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">{label}</p>
      <p className="mt-3 break-all font-mono text-sm text-paper">{address ?? empty}</p>
      {address ? (
        <a
          href={explorerAddress(address)}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm text-brass hover:text-brass-2"
        >
          Open in Solana explorer
          <ExternalLink aria-hidden="true" size={14} />
        </a>
      ) : (
        <p className="mt-4 text-sm text-muted">No explorer link.</p>
      )}
    </article>
  );
}
