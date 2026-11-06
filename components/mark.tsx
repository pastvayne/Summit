import Image from "next/image";

export function Mark({ className = "h-7 w-7" }: { className?: string }) {
  return <Image src="/icons/mark-lockup.png" alt="" width={256} height={256} className={className} />;
}
