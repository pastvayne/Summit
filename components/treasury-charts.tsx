"use client";

import { useReducedMotion } from "framer-motion";
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { sampleAllocation, sampleDisclosure, sampleSeries, type RangeKey } from "@/lib/fixtures";

const pieColors = ["#241f1a", "#8a7b68", "#c4b49a", "#5c564c"];

export function TreasuryCharts({
  preview,
  range,
}: {
  preview: boolean;
  range: RangeKey;
}) {
  const reduced = useReducedMotion() === true;
  const series = sampleSeries[range];

  if (!preview) {
    return (
      <div className="flex h-full min-h-64 flex-col justify-between border border-dashed border-line p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">History</p>
          <p className="font-mono text-[10px] tracking-[0.16em] text-brass uppercase">{range}</p>
        </div>
        <div>
          <div className="h-px bg-brass/50" />
          <p className="mt-4 font-serif text-3xl text-paper">No history</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sample-stamp relative h-full min-h-72 border border-brass/50 p-4">
      <div className="mb-2 flex items-start justify-between gap-3">
        <p className="font-mono text-[10px] tracking-[0.16em] text-brass uppercase">Fixture index · {range}</p>
        <p className="font-mono text-[10px] tracking-[0.16em] text-brass uppercase">Sample</p>
      </div>
      <p className="mb-3 max-w-xl text-xs leading-5 text-muted">{sampleDisclosure}</p>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={series} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="fillBrass" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#241f1a" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#241f1a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(36,31,26,0.08)" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: "#6f675c", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#6f675c", fontSize: 11 }} axisLine={false} tickLine={false} width={32} />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const point = payload[0];
                const label = (point.payload as { label?: string } | undefined)?.label;
                return (
                  <div className="border border-line bg-ink px-3 py-2 text-xs">
                    <p className="text-muted">Sample point {label}</p>
                    <p className="font-mono text-paper">Fixture {String(point.value)}</p>
                  </div>
                );
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#241f1a"
              fill="url(#fillBrass)"
              strokeWidth={1.6}
              isAnimationActive={!reduced}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function AllocationChart({ preview }: { preview: boolean }) {
  const reduced = useReducedMotion() === true;

  if (!preview) {
    return (
      <div className="flex h-full min-h-64 flex-col justify-between border border-dashed border-line p-5">
        <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">Allocation</p>
        <div>
          <p className="font-serif text-3xl text-paper">No allocation mix</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sample-stamp border border-brass/50 p-4">
      <p className="font-mono text-[10px] tracking-[0.16em] text-brass uppercase">Sample weights · not a policy</p>
      <div className="mx-auto h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={sampleAllocation}
              dataKey="value"
              nameKey="name"
              innerRadius={52}
              outerRadius={78}
              paddingAngle={2}
              stroke="#14120e"
              isAnimationActive={!reduced}
            >
              {sampleAllocation.map((entry, index) => (
                <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const point = payload[0];
                return (
                  <div className="border border-line bg-ink px-3 py-2 text-xs">
                    <p className="text-paper">{String(point.name)}</p>
                    <p className="font-mono text-muted">Sample {String(point.value)}</p>
                  </div>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="grid grid-cols-2 gap-2 text-xs text-muted">
        {sampleAllocation.map((entry, index) => (
          <li key={entry.name} className="flex items-center gap-2">
            <span className="h-2 w-2" style={{ background: pieColors[index] }} />
            {entry.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
