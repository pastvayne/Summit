export function StaticPinwheel({ animate = false, className = "" }: { animate?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 320 320"
      className={`${animate ? "pinwheel-spin" : ""} ${className}`}
      role="img"
      aria-label="Origami pinwheel"
    >
      <defs>
        <linearGradient id="blade-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fffdf8" />
          <stop offset="48%" stopColor="#f4ecdf" />
          <stop offset="100%" stopColor="#e7dcc8" />
        </linearGradient>
        <linearGradient id="blade-b" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbf6ee" />
          <stop offset="55%" stopColor="#efe4d2" />
          <stop offset="100%" stopColor="#ddd0ba" />
        </linearGradient>
        <filter id="paper-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#2a2520" floodOpacity="0.12" />
        </filter>
      </defs>
      <g filter="url(#paper-shadow)">
        {[0, 90, 180, 270].map((angle, index) => (
          <path
            key={angle}
            transform={`rotate(${angle} 160 160)`}
            d="M160 160 C168 118 196 78 214 46 C188 92 176 132 160 160 C142 128 118 86 92 58 C124 96 146 132 160 160 Z"
            fill={index % 2 === 0 ? "url(#blade-a)" : "url(#blade-b)"}
            stroke="#d9ccb6"
            strokeWidth="1"
          />
        ))}
      </g>
      <circle cx="160" cy="160" r="11" fill="#f7f1e6" stroke="#d9ccb6" />
      <circle cx="160" cy="160" r="4.5" fill="#2c2a26" />
    </svg>
  );
}
