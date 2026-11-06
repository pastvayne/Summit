export function Mark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M3.5 29 L16 19 L28.5 29 L25.2 29 L16 22.6 L6.8 29 Z"
      />
      <path
        fill="currentColor"
        d="M7.5 20.5 L16.8 12.4 L26.5 20.5 L23.8 20.5 L16.8 15.2 L10.2 20.5 Z"
      />
      <path
        fill="currentColor"
        d="M12 11 L17.8 5.8 L23.6 11 L21.6 11 L17.8 7.6 L14 11 Z"
      />
      <path fill="currentColor" d="M17.8 2.35 L18.75 3.65 L17.8 4.95 L16.85 3.65 Z" />
    </svg>
  );
}
