import {
  Award,
  Building2,
  Cable,
  Cctv,
  CircuitBoard,
  Handshake,
  House,
  Lightbulb,
  Ruler,
  ShieldCheck,
  type LucideProps,
} from "lucide-react";
import type { ServiceIcon } from "@/data/services";

type SvgProps = React.SVGProps<SVGSVGElement> & { size?: number };

export function BoltMark({ size = 20, ...props }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M13.5 2 4.5 13.5h6L9.5 22l10-12.5h-6.2L13.5 2Z" fill="currentColor" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 20, ...props }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.17-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.07.9.92-2.99-.2-.31a8.2 8.2 0 1 1 6.83 3.73Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.17.25-.64.8-.78.97-.14.17-.29.18-.53.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.86 2.04 4.76 4.76 0 0 0 1 2.53 10.9 10.9 0 0 0 4.17 3.68c1.55.67 2.16.73 2.94.61.47-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.15-1.17-.06-.11-.22-.17-.47-.29Z"
      />
    </svg>
  );
}

export function InstagramIcon({ size = 20, ...props }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ThreadsIcon({ size = 20, ...props }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M16.7 11.1c-.1-.05-.2-.1-.3-.14-.18-3.3-1.98-5.2-5.01-5.22h-.04c-1.81 0-3.32.77-4.25 2.18l1.67 1.14c.69-1.05 1.78-1.28 2.58-1.28h.03c1 0 1.75.3 2.24.87.35.41.59.99.71 1.71-.9-.15-1.86-.2-2.9-.14-2.92.17-4.8 1.87-4.67 4.24.06 1.2.66 2.23 1.68 2.9.86.57 1.97.85 3.13.79 1.52-.08 2.72-.66 3.55-1.73.63-.81 1.03-1.86 1.21-3.19.72.44 1.26 1.01 1.55 1.7.5 1.18.53 3.11-1.05 4.69-1.38 1.38-3.05 1.98-5.57 2-2.8-.02-4.91-.92-6.29-2.67C3.68 17.37 3.02 15 3 12c.02-3 .68-5.37 1.97-7.02C6.35 3.22 8.46 2.32 11.26 2.3c2.82.02 4.97.92 6.4 2.69.7.87 1.23 1.95 1.58 3.22l1.96-.52c-.42-1.56-1.08-2.9-1.98-4.01C17.4 1.42 14.74.32 11.27.3h-.01C7.8.32 5.17 1.42 3.42 3.62 1.86 5.6 1.06 8.35 1.03 11.99v.02c.03 3.64.83 6.4 2.39 8.37 1.75 2.2 4.38 3.3 7.84 3.32h.01c3.08-.02 5.25-.83 7.04-2.61 2.34-2.34 2.27-5.27 1.5-7.07-.55-1.29-1.6-2.33-3.04-3.02Zm-5.32 5c-1.27.07-2.6-.5-2.66-1.73-.05-.91.65-1.93 2.75-2.05l.71-.02c.76 0 1.48.07 2.13.21-.24 3-1.65 3.52-2.93 3.59Z"
      />
    </svg>
  );
}

const SERVICE_ICONS: Record<ServiceIcon, React.ComponentType<LucideProps>> = {
  cable: Cable,
  panel: CircuitBoard,
  smart: Lightbulb,
  lowvoltage: Cctv,
  house: House,
  business: Building2,
};

export function ServiceGlyph({ name, ...props }: { name: ServiceIcon } & LucideProps) {
  const Icon = SERVICE_ICONS[name];
  return <Icon aria-hidden="true" strokeWidth={1.6} {...props} />;
}

const TRUST_ICONS = {
  experience: Award,
  neat: Ruler,
  norms: ShieldCheck,
  agreement: Handshake,
} as const;

export function TrustGlyph({ name, ...props }: { name: keyof typeof TRUST_ICONS } & LucideProps) {
  const Icon = TRUST_ICONS[name];
  return <Icon aria-hidden="true" strokeWidth={1.6} {...props} />;
}
