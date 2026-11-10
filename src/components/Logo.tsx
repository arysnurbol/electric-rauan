import Link from "next/link";
import { BoltMark } from "./Icons";

export function Logo({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="group flex items-center gap-2.5" aria-label={label}>
      <span className="grid size-8 place-items-center rounded-[var(--radius-sm)] bg-volt text-ink transition-transform duration-300 group-hover:rotate-[-8deg]">
        <BoltMark size={18} />
      </span>
      <span translate="no" className="font-display text-[0.95rem] font-bold leading-none tracking-[0.04em] whitespace-nowrap">
        ELECTRIC<span className="text-muted"> RAUAN</span>
      </span>
    </Link>
  );
}
