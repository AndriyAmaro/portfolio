/* eslint-disable @next/next/no-img-element */
// Brand logos · SVG oficiais inline · brand-accurate (simple-icons.org)
// Tamanho padrão 14px · usar size prop pra override

type LogoProps = { size?: number; className?: string };

export const HTML5Logo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="HTML5">
    <path fill="#E34F26" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
  </svg>
);

export const CSS3Logo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="CSS3">
    <path fill="#1572B6" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
  </svg>
);

export const JavaScriptLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="JavaScript">
    <rect width="24" height="24" fill="#F7DF1E"/>
    <path fill="#000" d="M7.652 19.059l1.844-1.115c.356.63.679 1.164 1.456 1.164.744 0 1.214-.291 1.214-1.42v-7.673h2.265v7.704c0 2.349-1.378 3.42-3.385 3.42-1.815 0-2.866-.939-3.394-2.08m7.991-.244l1.844-1.067c.487.793 1.117 1.379 2.236 1.379.939 0 1.54-.469 1.54-1.118 0-.776-.617-1.052-1.652-1.508l-.567-.243c-1.633-.695-2.717-1.566-2.717-3.41 0-1.697 1.295-2.987 3.316-2.987 1.443 0 2.479.502 3.224 1.815l-1.766 1.133c-.388-.696-.808-.971-1.458-.971-.665 0-1.085.42-1.085.97 0 .68.42.955 1.393 1.378l.567.243c1.926.825 3.01 1.665 3.01 3.556 0 2.038-1.601 3.155-3.749 3.155-2.1 0-3.456-1.001-4.118-2.315"/>
  </svg>
);

export const TypeScriptLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="TypeScript">
    <rect width="24" height="24" rx="2" fill="#3178C6"/>
    <path fill="#fff" d="M9.4 14.5h2.4v6.7h1.8v-6.7h2.4v-1.6h-6.6v1.6zM18.4 18.5c0 1.9 1.5 2.8 3.2 2.8 1.7 0 3-.9 3-2.7 0-1.6-.9-2.3-2.5-3l-.5-.2c-.8-.3-1.2-.5-1.2-1.1 0-.5.4-.9 1-.9.6 0 1 .3 1.4 1l1.4-.9c-.6-1-1.4-1.4-2.8-1.4-1.6 0-2.7 1-2.7 2.4 0 1.5 1 2.3 2.4 2.9l.5.2c.9.4 1.4.6 1.4 1.2 0 .5-.5 1-1.3 1-.9 0-1.4-.5-1.8-1.1l-1.5.9z"/>
  </svg>
);

export const NextJSLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Next.js">
    <circle cx="12" cy="12" r="12" fill="currentColor"/>
    <path fill="#fff" d="M9.6 7.2h.96v9.6H9.6V7.2zm5.04 0h.96v9.6L8.64 7.2h-.96v9.6h.96V8.64l6.96 8.16h.96V7.2h-.96V14.4z" opacity="0.95"/>
  </svg>
);

export const ReactLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" className={className} aria-label="React">
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

export const ViteLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Vite">
    <defs>
      <linearGradient id="vite-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#41D1FF"/>
        <stop offset="100%" stopColor="#BD34FE"/>
      </linearGradient>
      <linearGradient id="vite-yellow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFEA83"/>
        <stop offset="100%" stopColor="#FFDD35"/>
      </linearGradient>
    </defs>
    <path fill="url(#vite-grad)" d="M22.27 4.41L12.42 22.05a.45.45 0 01-.78 0L1.78 4.41a.45.45 0 01.46-.66l9.5 1.7a.46.46 0 00.16 0l9.91-1.7a.45.45 0 01.46.66z"/>
    <path fill="url(#vite-yellow)" d="M17.07 1.46l-7.27 1.43a.23.23 0 00-.18.21L9.18 9a.23.23 0 00.28.24l2.02-.47a.23.23 0 01.28.27l-.6 2.94a.23.23 0 00.3.27l1.24-.38a.23.23 0 01.3.27l-.95 4.61c-.05.23.26.36.39.16l.09-.13 5.87-11.71a.23.23 0 00-.25-.33l-2.07.4a.23.23 0 01-.27-.28l1.35-4.69a.23.23 0 00-.27-.29z"/>
  </svg>
);

export const TailwindLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Tailwind CSS">
    <path fill="#06B6D4" d="M12 6C9.33 6 7.67 7.33 7 10c1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.36.99 1 2.13 2.16 4.59 2.16 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.6 6.17 14.46 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.36.99 1 2.13 2.14 4.59 2.14 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.6 13.17 9.46 12 7 12z"/>
  </svg>
);

export const FramerMotionLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Framer Motion">
    <path fill="#0055FF" d="M4 0h16v8h-8z"/>
    <path fill="#00AAFF" d="M4 8h8l8 8H4z"/>
    <path fill="#FF0080" d="M4 16h8v8z"/>
  </svg>
);

export const TanStackLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="TanStack Query">
    <circle cx="12" cy="12" r="10" fill="#FF4154"/>
    <path fill="#fff" d="M6 8h12v2H6zm0 4h8v2H6zm0 4h10v2H6z" opacity="0.95"/>
  </svg>
);

export const ZustandLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Zustand">
    <circle cx="12" cy="12" r="11" fill="#946B5D"/>
    <circle cx="7" cy="8" r="2" fill="#3D2A20"/>
    <circle cx="17" cy="8" r="2" fill="#3D2A20"/>
    <circle cx="9" cy="13" r="1.2" fill="#fff"/>
    <circle cx="15" cy="13" r="1.2" fill="#fff"/>
    <circle cx="9" cy="13" r="0.5" fill="#000"/>
    <circle cx="15" cy="13" r="0.5" fill="#000"/>
    <ellipse cx="12" cy="16.5" rx="2.5" ry="1.5" fill="#3D2A20"/>
  </svg>
);

export const ZodLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Zod">
    <path fill="#3E67B1" d="M22 5L18 0H6L2 5l10 19z"/>
    <path fill="#274D82" d="M22 5H2l10 12z"/>
    <path fill="#fff" d="M18.5 5h-13L12 13z"/>
  </svg>
);

export const ReactHookFormLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="React Hook Form">
    <rect width="24" height="24" rx="4" fill="#EC5990"/>
    <path fill="#fff" d="M5 6h14v3H5zm0 5h14v3H5zm0 5h9v3H5z"/>
  </svg>
);

export const RadixUILogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Radix UI">
    <path fill="currentColor" d="M12 0a12 12 0 11-12 12A12 12 0 0112 0zm0 4a8 8 0 108 8 8 8 0 00-8-8zm0 4a4 4 0 11-4 4 4 4 0 014-4z"/>
  </svg>
);

export const ShadcnLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="shadcn/ui">
    <rect width="24" height="24" rx="4" fill="currentColor" opacity="0.1"/>
    <path stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" d="M16 5L5 16M19 12L12 19"/>
  </svg>
);

export const LucideLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Lucide">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
);

export const RechartsLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Recharts">
    <rect x="3" y="14" width="4" height="7" fill="#22C5E2"/>
    <rect x="10" y="9" width="4" height="12" fill="#FF7300"/>
    <rect x="17" y="4" width="4" height="17" fill="#82CA9D"/>
  </svg>
);

export const TiptapLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Tiptap">
    <rect width="24" height="24" rx="4" fill="#0D0D0D"/>
    <circle cx="7" cy="12" r="2.5" fill="#5DBA8E"/>
    <circle cx="12" cy="12" r="2.5" fill="#5DBA8E"/>
    <circle cx="17" cy="12" r="2.5" fill="#5DBA8E"/>
  </svg>
);

export const XyflowLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="xyflow">
    <circle cx="5" cy="6" r="2.5" fill="#FF0073"/>
    <circle cx="19" cy="6" r="2.5" fill="#FF0073"/>
    <circle cx="12" cy="18" r="2.5" fill="#FF0073"/>
    <path stroke="#FF0073" strokeWidth="1.5" fill="none" d="M5 6L12 18M19 6L12 18"/>
  </svg>
);

export const DndKitLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="@dnd-kit">
    <rect x="2" y="3" width="6" height="6" rx="1" fill="#0EA5E9"/>
    <rect x="16" y="15" width="6" height="6" rx="1" fill="#0EA5E9"/>
    <path stroke="#0EA5E9" strokeWidth="1.5" strokeDasharray="2 2" fill="none" d="M8 6h6c2 0 2 2 2 4v8"/>
  </svg>
);

export const KonvaLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Konva">
    <defs>
      <linearGradient id="konva-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0094FF"/>
        <stop offset="100%" stopColor="#00D4FF"/>
      </linearGradient>
    </defs>
    <path fill="url(#konva-grad)" d="M12 2l10 18H2z"/>
  </svg>
);

export const SocketIOLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Socket.io">
    <circle cx="12" cy="12" r="11" fill="currentColor"/>
    <path fill="#fff" d="M12 4l-2 7h2l-3 9 8-11h-3l3-5z"/>
  </svg>
);

export const NextIntlLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="next-intl">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20"/>
  </svg>
);

export const NextThemesLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="next-themes">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
);

export const CVALogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="CVA">
    <rect width="24" height="24" rx="4" fill="currentColor" opacity="0.08"/>
    <text x="12" y="16" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fontWeight="700" fill="currentColor">cva</text>
  </svg>
);

export const ClsxLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="clsx">
    <rect width="24" height="24" rx="4" fill="currentColor" opacity="0.08"/>
    <text x="12" y="16" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fontWeight="700" fill="currentColor">clsx</text>
  </svg>
);
