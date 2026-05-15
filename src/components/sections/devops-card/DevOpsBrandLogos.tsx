/* eslint-disable @next/next/no-img-element */
// DevOps brand logos · SVG inline · brand-accurate

type LogoProps = { size?: number; className?: string };

export const DockerLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Docker">
    <path fill="#2496ED" d="M21.81 10.25l-.05-.04c-.32-.21-.71-.32-1.18-.32-.59 0-1.16.13-1.71.32-.07-.43-.22-.83-.42-1.16l-.11-.16-.15.1c-.32.21-.55.5-.69.85-.18.43-.21.91-.07 1.37H2.31a.41.41 0 00-.41.41c-.04.71.05 2.85 1.34 4.51l.13.16.14-.15c.91-.92 2.13-1.43 3.43-1.43h11.84c2.31 0 3.93-1.07 4.55-3.01l.21-.61-.49-.34zM2.49 9.05h2.06c.1 0 .19-.09.19-.19V6.94c0-.1-.09-.19-.19-.19H2.49a.19.19 0 00-.19.19v1.92c.01.1.09.19.19.19zm2.84 0h2.06c.1 0 .19-.09.19-.19V6.94c0-.1-.09-.19-.19-.19H5.33a.19.19 0 00-.19.19v1.92c0 .1.09.19.19.19zm2.89 0h2.06c.1 0 .19-.09.19-.19V6.94c0-.1-.09-.19-.19-.19H8.22a.19.19 0 00-.19.19v1.92c0 .1.08.19.19.19zm2.86 0h2.06c.1 0 .19-.09.19-.19V6.94c0-.1-.09-.19-.19-.19h-2.06a.19.19 0 00-.19.19v1.92c0 .1.08.19.19.19zm-5.75-2.69h2.06c.1 0 .19-.09.19-.19V4.25c0-.1-.09-.19-.19-.19H5.33a.19.19 0 00-.19.19v1.92c0 .11.09.19.19.19zm2.89 0h2.06c.1 0 .19-.09.19-.19V4.25c0-.1-.09-.19-.19-.19H8.22a.19.19 0 00-.19.19v1.92c0 .11.08.19.19.19zm2.86 0h2.06c.1 0 .19-.09.19-.19V4.25c0-.1-.08-.19-.19-.19h-2.06a.19.19 0 00-.19.19v1.92c0 .11.08.19.19.19zm0-2.69h2.06c.1 0 .19-.08.19-.19V1.56c0-.1-.08-.19-.19-.19h-2.06a.19.19 0 00-.19.19v1.92c0 .1.08.19.19.19zm2.88 5.38h2.06c.1 0 .19-.09.19-.19V6.94c0-.1-.09-.19-.19-.19h-2.06a.19.19 0 00-.19.19v1.92c0 .1.09.19.19.19z"/>
  </svg>
);

export const DockerComposeLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Docker Compose">
    <rect width="24" height="24" rx="4" fill="#2496ED" opacity="0.12"/>
    <rect x="4" y="5" width="6" height="4" rx="0.5" fill="#2496ED"/>
    <rect x="11" y="5" width="6" height="4" rx="0.5" fill="#2496ED" opacity="0.75"/>
    <rect x="4" y="10" width="6" height="4" rx="0.5" fill="#2496ED" opacity="0.75"/>
    <rect x="11" y="10" width="6" height="4" rx="0.5" fill="#2496ED"/>
    <rect x="4" y="15" width="13" height="4" rx="0.5" fill="#2496ED" opacity="0.55"/>
  </svg>
);

export const NginxLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Nginx">
    <path fill="#009639" d="M12 1L2 6.5v11L12 23l10-5.5v-11L12 1zm5 16h-1.6l-7-9.4V17H7V7h1.6l7 9.4V7H17v10z"/>
  </svg>
);

export const CloudflareWorkersLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Cloudflare Workers">
    <path fill="#F38020" d="M19.7 14.4c-.4-1.6-1.9-2.7-3.7-2.4-.4-1.6-1.9-2.7-3.7-2.7-1.6 0-3 .9-3.6 2.3-.2-.1-.5-.1-.7-.1-1.5 0-2.7 1.2-2.7 2.7 0 .2 0 .4.1.5H4c-.5 0-.9.4-.9.9s.4.9.9.9h15.2c.7 0 1.3-.5 1.5-1.2.2-.7-.2-1.5-.9-1.7z"/>
    <circle cx="20" cy="6" r="2.5" fill="#FBAD41"/>
  </svg>
);

export const CloudflareR2Logo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Cloudflare R2">
    <path fill="#F38020" d="M19.7 14.4c-.4-1.6-1.9-2.7-3.7-2.4-.4-1.6-1.9-2.7-3.7-2.7-1.6 0-3 .9-3.6 2.3-.2-.1-.5-.1-.7-.1-1.5 0-2.7 1.2-2.7 2.7 0 .2 0 .4.1.5H4c-.5 0-.9.4-.9.9s.4.9.9.9h15.2c.7 0 1.3-.5 1.5-1.2.2-.7-.2-1.5-.9-1.7z"/>
    <text x="18" y="11" fontFamily="ui-monospace, monospace" fontSize="7" fontWeight="700" fill="#F38020">R2</text>
  </svg>
);

export const RailwayLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Railway">
    <rect width="24" height="24" rx="4" fill="#0B0D0E"/>
    <path fill="#fff" d="M5 8h2v8H5zm3 0h2v8H8zm3 0h2v8h-2zm3 0h2v8h-2zm3 0h2v8h-2z"/>
    <circle cx="6" cy="6" r="1" fill="#fff"/>
    <circle cx="18" cy="18" r="1" fill="#fff"/>
  </svg>
);

export const VercelLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Vercel">
    <path fill="currentColor" d="M12 2L2 19h20L12 2z"/>
  </svg>
);

export const NixpacksLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Nixpacks">
    <defs>
      <linearGradient id="nix-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7EBAE4"/>
        <stop offset="100%" stopColor="#5277C3"/>
      </linearGradient>
    </defs>
    <path fill="url(#nix-grad)" d="M12 2l9 5v10l-9 5-9-5V7l9-5zm0 2.5L5 8v8l7 3.5L19 16V8l-7-3.5z"/>
    <path fill="url(#nix-grad)" d="M12 7l4.5 2.5v5L12 17l-4.5-2.5v-5L12 7z" opacity="0.6"/>
  </svg>
);

export const OpenNextLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="OpenNext.js">
    <circle cx="12" cy="12" r="11" fill="currentColor"/>
    <path stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" d="M7 7l10 10M7 17V7h10"/>
  </svg>
);

export const WranglerLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#F38020" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="wrangler">
    <path d="M14.7 6.3a1 1 0 010 1.4l-1 1-1.4-1.4 1-1a1 1 0 011.4 0z"/>
    <path d="M12.3 7.3l-9 9V20h3.7l9-9-3.7-3.7z"/>
  </svg>
);

export const TurborepoLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Turborepo">
    <defs>
      <linearGradient id="turbo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF1E56"/>
        <stop offset="100%" stopColor="#0096FF"/>
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="11" fill="url(#turbo-grad)" opacity="0.15"/>
    <circle cx="12" cy="12" r="6" stroke="url(#turbo-grad)" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="12" r="2.5" fill="url(#turbo-grad)"/>
  </svg>
);

export const PnpmLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="pnpm">
    <rect x="13.5" y="3" width="7.5" height="7.5" fill="#F69220"/>
    <rect x="13.5" y="13.5" width="7.5" height="7.5" fill="#F69220"/>
    <rect x="3" y="13.5" width="7.5" height="7.5" fill="#F69220"/>
    <rect x="13.5" y="3" width="7.5" height="7.5" fill="#FFE872"/>
    <rect x="3" y="3" width="7.5" height="7.5" fill="#FFE872"/>
  </svg>
);

export const GithubActionsLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="GitHub Actions">
    <rect width="24" height="24" rx="4" fill="#2088FF"/>
    <path fill="#fff" d="M9 17l-3-5 1.4-1.4L9 14.2l7.6-7.6L18 8l-9 9z"/>
  </svg>
);

export const ConventionalCommitsLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Conventional Commits">
    <circle cx="12" cy="12" r="3"/>
    <line x1="3" y1="12" x2="9" y2="12"/>
    <line x1="15" y1="12" x2="21" y2="12"/>
    <circle cx="12" cy="12" r="9" opacity="0.25"/>
  </svg>
);

export const AdrLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="ADRs">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="8" y1="13" x2="16" y2="13"/>
    <line x1="8" y1="17" x2="13" y2="17"/>
  </svg>
);

export const VitestLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Vitest">
    <path fill="#FCC72B" d="M21.3 5.7L12 22 2.7 5.7l4-1.4L12 14l5.3-9.7 4 1.4z"/>
    <path fill="#6E9F18" d="M12 22L5.5 11h13L12 22z" opacity="0.85"/>
  </svg>
);

export const PlaywrightLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Playwright">
    <circle cx="12" cy="12" r="11" fill="#2EAD33"/>
    <path fill="#fff" d="M7 8l3.5 1.5L7 11V8zm5 0l4 1.5L12 11V8z"/>
    <path stroke="#E2563E" strokeWidth="1.5" fill="none" d="M7 16c1.5 1 3.5 1.5 5 1.5s3.5-.5 5-1.5"/>
  </svg>
);

export const TestingLibraryLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Testing Library">
    <circle cx="12" cy="12" r="11" fill="#E33332"/>
    <path fill="#fff" d="M16.5 10c-1 0-2 .3-3 .8-1-.5-2-.8-3-.8s-2 .3-3 .8c-.5-.5-1-.8-2-.8v6c1 0 1.5-.3 2-.8 1 .5 2 .8 3 .8s2-.3 3-.8c1 .5 2 .8 3 .8s2-.3 3-.8v-6c-1 0-1.5.3-2 .8-1-.5-2-.8-3-.8z"/>
  </svg>
);

export const EslintLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="ESLint">
    <path fill="#4B32C3" d="M12 1l10 5.8v10.4L12 23 2 17.2V6.8L12 1zm0 4.5L6.2 9v6l5.8 3.5L17.8 15V9L12 5.5z"/>
    <path fill="#fff" d="M12 7l4 2.3v4.6L12 16.2 8 13.9V9.3L12 7z"/>
  </svg>
);

export const PrettierLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Prettier">
    <rect width="24" height="24" rx="3" fill="#F7B93E" opacity="0.15"/>
    <path fill="#56B3B4" d="M3 5h6v1.5H3z"/>
    <path fill="#EA5E5E" d="M10 5h11v1.5H10z"/>
    <path fill="#BF85BF" d="M3 8.5h4v1.5H3z"/>
    <path fill="#56B3B4" d="M8 8.5h13v1.5H8z"/>
    <path fill="#F7B93E" d="M3 12h8v1.5H3z"/>
    <path fill="#EA5E5E" d="M12 12h9v1.5h-9z"/>
    <path fill="#56B3B4" d="M3 15.5h6v1.5H3z"/>
    <path fill="#BF85BF" d="M10 15.5h6v1.5h-6z"/>
    <path fill="#F7B93E" d="M3 19h11v1.5H3z"/>
  </svg>
);

export const TsxLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="tsx">
    <rect width="24" height="24" rx="3" fill="#3178C6"/>
    <text x="12" y="16" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fontWeight="700" fill="#fff">tsx</text>
  </svg>
);

export const AwsLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="AWS">
    <rect width="24" height="24" rx="3" fill="#232F3E"/>
    <path fill="#FF9900" d="M7 15.5l-1.4-.6c.7 1.2 2.2 2 4 2s3.4-.8 4-2l-1.4.6c-.5.7-1.5 1.2-2.6 1.2s-2-.5-2.6-1.2zm10-3.3c-.3-.4-1-.6-2-.6-.5 0-1 .1-1.5.2-.1 0-.1.1-.1.2 0 .1.1.1.2.1.6-.1 1.2-.1 1.6.1.3.1.3.4.2.7-.2.7-.5 1.4-.5 1.4 0 .1 0 .1.1.1l.2-.1c.5-.4.9-.9 1.1-1.4.1-.3 0-.5-.3-.7z"/>
    <text x="12" y="11" textAnchor="middle" fontFamily="ui-sans-serif, system-ui" fontSize="6" fontWeight="800" fill="#FF9900">aws</text>
  </svg>
);

export const AzureLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Microsoft Azure">
    <defs>
      <linearGradient id="azure-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#114A8B"/>
        <stop offset="100%" stopColor="#0669BC"/>
      </linearGradient>
      <linearGradient id="azure-grad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3CCBF4"/>
        <stop offset="100%" stopColor="#2892DF"/>
      </linearGradient>
    </defs>
    <path fill="url(#azure-grad)" d="M10.5 3L4 18h5l1.5-3 4 3h5.5L13.5 3h-3zM12 7.5L14.5 14h-5L12 7.5z"/>
    <path fill="url(#azure-grad2)" d="M13 14h-3l-1 4h11l-5-4z" opacity="0.85"/>
  </svg>
);

export const CICDLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="CI/CD Pipeline">
    <path d="M21 12a9 9 0 11-3-6.7M21 4v5h-5"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
  </svg>
);
