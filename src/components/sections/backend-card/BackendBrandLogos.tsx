/* eslint-disable @next/next/no-img-element */
// Backend brand logos · SVG oficiais inline · brand-accurate

type LogoProps = { size?: number; className?: string };

export const NodejsLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Node.js">
    <path fill="#5FA04E" d="M12 21.985c-.275 0-.532-.073-.772-.202l-2.439-1.448c-.365-.203-.182-.277-.072-.314.496-.165.586-.201 1.099-.493.056-.037.129-.02.185.017l1.871 1.12c.074.036.166.036.221 0l7.319-4.237c.074-.036.111-.11.111-.202V7.768c0-.091-.037-.165-.111-.202l-7.319-4.219c-.074-.036-.166-.036-.221 0L4.552 7.566c-.073.036-.11.128-.11.202v8.457c0 .073.037.165.11.201l2 1.157c1.085.548 1.762-.095 1.762-.74V8.502c0-.111.091-.221.219-.221h.933c.111 0 .22.092.22.221v8.34c0 1.449-.787 2.286-2.164 2.286-.422 0-.752 0-1.687-.459l-1.925-1.099a1.55 1.55 0 0 1-.771-1.34V7.786c0-.55.293-1.063.771-1.34l7.316-4.237a1.637 1.637 0 0 1 1.544 0l7.317 4.237c.479.276.771.79.771 1.34v8.476c0 .55-.293 1.062-.771 1.34l-7.317 4.236c-.241.11-.516.166-.773.166Z"/>
  </svg>
);

export const TypeScriptLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="TypeScript">
    <rect width="24" height="24" rx="2" fill="#3178C6"/>
    <path fill="#fff" d="M9.4 14.5h2.4v6.7h1.8v-6.7h2.4v-1.6h-6.6v1.6zM18.4 18.5c0 1.9 1.5 2.8 3.2 2.8 1.7 0 3-.9 3-2.7 0-1.6-.9-2.3-2.5-3l-.5-.2c-.8-.3-1.2-.5-1.2-1.1 0-.5.4-.9 1-.9.6 0 1 .3 1.4 1l1.4-.9c-.6-1-1.4-1.4-2.8-1.4-1.6 0-2.7 1-2.7 2.4 0 1.5 1 2.3 2.4 2.9l.5.2c.9.4 1.4.6 1.4 1.2 0 .5-.5 1-1.3 1-.9 0-1.4-.5-1.8-1.1l-1.5.9z"/>
  </svg>
);

export const RestApiLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="REST API">
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

export const ExpressLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Express">
    <rect width="24" height="24" rx="4" fill="currentColor" opacity="0.1"/>
    <path fill="currentColor" d="M12.95 11.66L18 18.5h-2.6l-3.78-5.18-3.8 5.18H5.25l5.04-6.85L5.6 5.46h2.59l3.4 4.7 3.43-4.7h2.46l-4.53 6.2zM6.8 17.34c-.74.04-1.04-.27-1.04-1.07v-3.85c0-.43.07-.79.21-1.07h.83v3.85c0 .8.3 1.12 1.04 1.07v.07z"/>
  </svg>
);

export const HonoLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Hono">
    <defs>
      <linearGradient id="hono-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FF6900"/>
        <stop offset="100%" stopColor="#FF3D00"/>
      </linearGradient>
    </defs>
    <path fill="url(#hono-grad)" d="M12 2C7 6 4 10 4 14a8 8 0 1016 0c0-4-3-8-8-12zm0 18a6 6 0 01-6-6c0-2.5 2-5.5 6-9 4 3.5 6 6.5 6 9a6 6 0 01-6 6z"/>
  </svg>
);

export const PostgresLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="PostgreSQL">
    <path fill="#336791" d="M17.128 0c-.937 0-1.84.18-2.692.535-1.052.39-1.97 1.078-2.633 1.969a8.213 8.213 0 00-1.74 4.69c-.196 2.213.36 4.41 1.586 6.265.61.918 1.422 1.69 2.385 2.268a.36.36 0 00.452-.067l.45-.498a.36.36 0 00-.103-.572 6.213 6.213 0 01-1.85-1.69c-.99-1.487-1.43-3.276-1.252-5.04.193-1.93 1.135-3.696 2.6-4.873.812-.65 1.815-1.052 2.872-1.144.59-.05 1.18.005 1.748.16.55.15 1.057.4 1.493.74.85.66 1.45 1.61 1.69 2.675a5.7 5.7 0 01-.124 3.137c-.34.99-.95 1.85-1.74 2.45-.55.41-1.18.7-1.85.85-.5.11-1.02.13-1.53.07a.36.36 0 00-.395.317l-.05.66a.36.36 0 00.32.39c.65.07 1.32.04 1.96-.1a6.43 6.43 0 002.4-1.09c1.03-.78 1.82-1.89 2.26-3.16a7.4 7.4 0 00.15-4.06A6.42 6.42 0 0019.91.93C19.12.34 18.16.02 17.13 0z"/>
    <ellipse cx="12" cy="6" rx="10" ry="3.5" fill="#336791" opacity="0.15"/>
    <path fill="#336791" d="M2 6v12c0 1.93 4.48 3.5 10 3.5s10-1.57 10-3.5V6c0 1.93-4.48 3.5-10 3.5S2 7.93 2 6z" opacity="0.4"/>
  </svg>
);

export const PrismaLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Prisma">
    <path fill="#2D3748" d="M21.807 18.285L13.553.757a1.348 1.348 0 00-1.137-.755 1.32 1.32 0 00-1.2.65L2.388 15.572a1.358 1.358 0 00.026 1.434l4.638 7.214a1.355 1.355 0 001.42.605l12.642-3.094a1.35 1.35 0 00.99-1.685l-.297-1.762zM12.515 2.952l8.024 17.31-12.224 2.998L4.16 16.04 12.515 2.952z"/>
  </svg>
);

export const PgvectorLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="pgvector">
    <circle cx="12" cy="12" r="11" fill="#336791" opacity="0.1"/>
    <path stroke="#336791" strokeWidth="1.5" fill="none" d="M4 12l4-4M4 12l4 4M4 12h16M20 12l-4-4M20 12l-4 4"/>
    <circle cx="4" cy="12" r="1.5" fill="#336791"/>
    <circle cx="20" cy="12" r="1.5" fill="#336791"/>
    <circle cx="12" cy="12" r="2" fill="#336791"/>
  </svg>
);

export const RedisLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Redis">
    <path fill="#DC382D" d="M12 2C6 2 2 4 2 6.5v11C2 20 6 22 12 22s10-2 10-4.5v-11C22 4 18 2 12 2zm0 2c4.41 0 8 1.13 8 2.5S16.41 9 12 9 4 7.87 4 6.5 7.59 4 12 4zm0 16c-4.41 0-8-1.13-8-2.5V14c1.83 1.21 4.71 2 8 2s6.17-.79 8-2v3.5c0 1.37-3.59 2.5-8 2.5zm0-6c-4.41 0-8-1.13-8-2.5V8c1.83 1.21 4.71 2 8 2s6.17-.79 8-2v3.5c0 1.37-3.59 2.5-8 2.5z"/>
  </svg>
);

export const BullMQLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="BullMQ">
    <rect width="24" height="24" rx="4" fill="#FF6B6B" opacity="0.12"/>
    <path fill="#FF6B6B" d="M5 8h3v8H5zm5-3h3v14h-3zm5 5h3v6h-3z"/>
    <circle cx="6.5" cy="6" r="1.2" fill="#FF6B6B"/>
    <circle cx="11.5" cy="3" r="1.2" fill="#FF6B6B"/>
    <circle cx="16.5" cy="8" r="1.2" fill="#FF6B6B"/>
  </svg>
);

export const SocketIOLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Socket.io">
    <circle cx="12" cy="12" r="11" fill="currentColor"/>
    <path fill="#fff" d="M12 4l-2 7h2l-3 9 8-11h-3l3-5z"/>
  </svg>
);

export const JwtLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="JWT">
    <rect width="24" height="24" rx="4" fill="#000"/>
    <path fill="#FB015B" d="M11 7V5h2v2zm0 12v-2h2v2z"/>
    <path fill="#00F2E6" d="M16.5 9.5l-1.4-1.4 1.4-1.5 1.4 1.4zm-9 7l-1.4-1.4 1.4-1.5 1.4 1.4z"/>
    <path fill="#00B9F1" d="M17.9 11h2v2h-2zm-13.8 0h2v2h-2z"/>
    <path fill="#D63AFF" d="M16.5 14.5l1.4 1.4-1.4 1.5-1.4-1.4zm-9-7L9 6.1l1.4 1.4L9 9z"/>
  </svg>
);

export const BcryptLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="bcrypt">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4"/>
    <circle cx="12" cy="16" r="1"/>
  </svg>
);

export const HelmetLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Helmet">
    <path fill="#0AB78A" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 16l-4-4 1.41-1.41L11 14.17l5.59-5.59L18 10l-7 7z"/>
  </svg>
);

export const ZodLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Zod">
    <path fill="#3E67B1" d="M22 5L18 0H6L2 5l10 19z"/>
    <path fill="#274D82" d="M22 5H2l10 12z"/>
    <path fill="#fff" d="M18.5 5h-13L12 13z"/>
  </svg>
);

export const SentryLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Sentry">
    <path fill="#362D59" d="M14.49 5.05c-.78-1.35-2.21-1.4-3 0L9.13 9.16c4.49 2.04 7.34 6.74 7.59 11.66h-2.06c-.24-4.21-2.74-8.27-6.6-9.93l-2.36 4.09a8.13 8.13 0 014.18 5.84h-3a5.13 5.13 0 00-2.65-3.55l-2.06 3.55c-.6 1.06-.04 2.45 1.18 2.45h17.31c1.21 0 1.78-1.39 1.17-2.45z"/>
  </svg>
);

export const WinstonLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Winston">
    <path d="M3 6h18M3 12h18M3 18h12"/>
    <circle cx="20" cy="18" r="1.5" fill="currentColor"/>
  </svg>
);

export const PinoLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Pino">
    <rect width="24" height="24" rx="4" fill="currentColor" opacity="0.08"/>
    <path fill="currentColor" d="M5 7h2v10H5zm4 0h2v10H9zm4 0h2v6h-2zm4 0h2v3h-2z"/>
  </svg>
);

export const StripeLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Stripe">
    <rect width="24" height="24" rx="4" fill="#635BFF"/>
    <path fill="#fff" d="M13.6 10.4c0-.7.6-1 1.5-1 1.3 0 3 .4 4.3 1.1V6.4c-1.4-.6-2.8-.8-4.3-.8-3.5 0-5.8 1.8-5.8 4.9 0 4.7 6.4 3.9 6.4 5.9 0 .8-.7 1.1-1.7 1.1-1.4 0-3.3-.6-4.7-1.4v4.2c1.6.7 3.2 1 4.7 1 3.6 0 6.1-1.8 6.1-5 0-5-6.5-4-6.5-5.9z"/>
  </svg>
);

export const ResendLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Resend">
    <rect width="24" height="24" rx="4" fill="#000"/>
    <path fill="#fff" d="M6 7v10h2.5v-3.5h1.7l2.3 3.5h3l-2.5-3.8c1.5-.5 2.5-1.6 2.5-3.3 0-2.1-1.6-3.3-4-3.3H6zm2.5 2h2c1 0 1.5.4 1.5 1.2s-.5 1.2-1.5 1.2h-2V9z"/>
    <circle cx="18" cy="9" r="1.5" fill="#fff"/>
  </svg>
);

export const SharpLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Sharp">
    <rect width="24" height="24" rx="4" fill="#99CC00" opacity="0.15"/>
    <path stroke="#99CC00" strokeWidth="1.8" fill="none" d="M4 16l5-5 4 4 7-7M14 8h6v6"/>
  </svg>
);

export const CloudflareR2Logo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Cloudflare R2">
    <path fill="#F38020" d="M19.7 14.4c-.4-1.6-1.9-2.7-3.7-2.4-.4-1.6-1.9-2.7-3.7-2.7-1.6 0-3 .9-3.6 2.3-.2-.1-.5-.1-.7-.1-1.5 0-2.7 1.2-2.7 2.7 0 .2 0 .4.1.5H4c-.5 0-.9.4-.9.9s.4.9.9.9h15.2c.7 0 1.3-.5 1.5-1.2.2-.7-.2-1.5-.9-1.7z"/>
  </svg>
);

export const MulterLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Multer">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="12" y1="18" x2="12" y2="12"/>
    <line x1="9" y1="15" x2="15" y2="15"/>
  </svg>
);

export const PuppeteerLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Puppeteer">
    <circle cx="12" cy="12" r="10" fill="#40B5A4"/>
    <circle cx="9" cy="10" r="1.5" fill="#fff"/>
    <circle cx="15" cy="10" r="1.5" fill="#fff"/>
    <path stroke="#fff" strokeWidth="1.5" fill="none" d="M9 15c1 1 2 1.5 3 1.5s2-.5 3-1.5"/>
  </svg>
);

export const SwaggerLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Swagger">
    <circle cx="12" cy="12" r="11" fill="#85EA2D"/>
    <path stroke="#000" strokeWidth="1.5" fill="none" d="M6 9h12M6 12h12M6 15h7"/>
  </svg>
);

export const JoseLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Jose">
    <rect width="24" height="24" rx="4" fill="currentColor" opacity="0.08"/>
    <text x="12" y="16" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fontWeight="700" fill="currentColor">jose</text>
  </svg>
);

export const CorsLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="CORS">
    <rect width="24" height="24" rx="4" fill="currentColor" opacity="0.08"/>
    <text x="12" y="16" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7.5" fontWeight="700" fill="currentColor">cors</text>
  </svg>
);

export const RateLimitLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Rate Limit">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);
