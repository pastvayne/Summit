export function Mark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <g fill="#f7f1e6" stroke="#2c2a26" strokeWidth="0.8">
        {[0, 90, 180, 270].map((angle) => (
          <path
            key={angle}
            transform={`rotate(${angle} 16 16)`}
            d="M16 16 C17 11 20 7 22 4.5 C19.5 8.5 18 12.5 16 16 C14 12 11.5 8 9 5.5 C12 9 14.5 12.5 16 16 Z"
          />
        ))}
      </g>
      <circle cx="16" cy="16" r="1.7" fill="#2c2a26" />
    </svg>
  );
}
