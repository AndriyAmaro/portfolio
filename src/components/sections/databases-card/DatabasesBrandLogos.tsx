/* eslint-disable @next/next/no-img-element */
// Database brand logos · SVG inline · alguns brand (Postgres/Prisma/Redis) + abstract icons pra patterns

type LogoProps = { size?: number; className?: string };

// HNSW · network graph nodes
export const HnswLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="HNSW">
    <circle cx="12" cy="4" r="2" fill="#F97316"/>
    <circle cx="5" cy="11" r="1.6" fill="#F97316"/>
    <circle cx="19" cy="11" r="1.6" fill="#F97316"/>
    <circle cx="8" cy="19" r="1.4" fill="#FB923C"/>
    <circle cx="16" cy="19" r="1.4" fill="#FB923C"/>
    <circle cx="12" cy="13" r="1.2" fill="#FBBF24"/>
    <path stroke="#F97316" strokeWidth="1" fill="none" opacity="0.6" d="M12 4L5 11M12 4l7 7M5 11l3 8M19 11l-3 8M5 11l7 2M19 11l-7 2M12 13l-4 6M12 13l4 6"/>
  </svg>
);

// Migrations · arrow up + DB
export const MigrationsLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Migrations">
    <ellipse cx="12" cy="5" rx="8" ry="2.5"/>
    <path d="M4 5v14c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5V5"/>
    <path d="M4 12c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5"/>
    <path d="M15 16l3-3 3 3M18 13v6" strokeWidth="2"/>
  </svg>
);

// Raw queries · SQL terminal
export const RawQueriesLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Raw Queries">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M7 9l3 3-3 3M13 15h4"/>
  </svg>
);

// L1/L2 Cache · layered tiers
export const CacheLayersLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="L1 L2 Cache">
    <rect x="3" y="4" width="18" height="4" rx="1" fill="#F97316"/>
    <rect x="4" y="10" width="16" height="4" rx="1" fill="#FB923C" opacity="0.7"/>
    <rect x="5" y="16" width="14" height="4" rx="1" fill="#FBBF24" opacity="0.5"/>
  </svg>
);

// Multi-tenant · multiple stacked cylinders
export const MultiTenantLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Multi-tenant">
    <ellipse cx="7" cy="6" rx="4" ry="1.5"/>
    <path d="M3 6v10c0 .8 1.8 1.5 4 1.5s4-.7 4-1.5V6"/>
    <ellipse cx="17" cy="9" rx="4" ry="1.5"/>
    <path d="M13 9v10c0 .8 1.8 1.5 4 1.5s4-.7 4-1.5V9"/>
  </svg>
);

// Repository pattern · folder + DB
export const RepositoryLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Repository">
    <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/>
    <path d="M8 12h8M8 16h5" opacity="0.5"/>
  </svg>
);

// Soft delete · trash with restore arrow
export const SoftDeleteLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Soft Delete">
    <path d="M3 6h18M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2"/>
    <path d="M14 14l-2-2M14 14l-2 2" opacity="0.7"/>
  </svg>
);

// Transactions · circular swap arrows
export const TransactionsLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Transactions">
    <path d="M7 7h11l-3-3M17 17H6l3 3"/>
    <circle cx="12" cy="12" r="9" opacity="0.25"/>
  </svg>
);

// Composite Index · DB + structured markers
export const CompositeIndexLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Composite Index">
    <rect width="24" height="24" rx="4" fill="currentColor" opacity="0.08"/>
    <path stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" d="M5 7h14M5 12h14M5 17h14"/>
    <circle cx="9" cy="7" r="1.4" fill="#F97316"/>
    <circle cx="14" cy="12" r="1.4" fill="#FB923C"/>
    <circle cx="11" cy="17" r="1.4" fill="#FBBF24"/>
  </svg>
);

// Cursor pagination · arrow cursor through pages
export const CursorPaginationLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Cursor Pagination">
    <path d="M3 3l7 17 2-7 7-2L3 3z" fill="currentColor" opacity="0.15"/>
    <path d="M3 3l7 17 2-7 7-2L3 3z"/>
  </svg>
);

// Connection Pool · concentric pool
export const ConnectionPoolLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Connection Pool">
    <circle cx="12" cy="12" r="3"/>
    <circle cx="12" cy="12" r="6" opacity="0.6"/>
    <circle cx="12" cy="12" r="9" opacity="0.3"/>
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3" opacity="0.5"/>
  </svg>
);

// N+1 Prevention · linked queries with check
export const NPlusOneLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="N+1 Prevention">
    <circle cx="5" cy="12" r="2"/>
    <circle cx="12" cy="12" r="2"/>
    <circle cx="19" cy="12" r="2"/>
    <path d="M7 12h3M14 12h3"/>
    <path d="M9 18l2 2 4-5" stroke="#10B981" strokeWidth="2"/>
  </svg>
);

// RAG · search + brain
export const RagLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="RAG">
    <circle cx="10" cy="10" r="6"/>
    <path d="M21 21l-5.6-5.6"/>
    <circle cx="10" cy="10" r="2.5" fill="currentColor" opacity="0.2"/>
    <path d="M10 7.5v5M7.5 10h5" strokeWidth="1.2"/>
  </svg>
);

// Embeddings · vector arrows
export const EmbeddingsLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Embeddings">
    <path d="M12 12L3 5M12 12l9-7M12 12l-7 7M12 12l7 7"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
  </svg>
);

// Hybrid Search · split keyword + semantic
export const HybridSearchLogo = ({ size = 14, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Hybrid Search">
    <circle cx="9" cy="10" r="5"/>
    <path d="M20 20l-4.5-4.5"/>
    <path d="M9 7.5L9 12.5M6.5 10L11.5 10" strokeWidth="1.3" opacity="0.7"/>
    <path d="M15 5l3 3M15 8l3-3" stroke="#FBBF24" strokeWidth="1.5"/>
  </svg>
);
