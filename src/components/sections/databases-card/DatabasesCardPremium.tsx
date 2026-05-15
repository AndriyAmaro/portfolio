"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  PostgresLogo,
  PrismaLogo,
  PgvectorLogo,
  RedisLogo,
  BullMQLogo,
} from "../backend-card/BackendBrandLogos";
import {
  HnswLogo,
  MigrationsLogo,
  RawQueriesLogo,
  CacheLayersLogo,
  MultiTenantLogo,
  RepositoryLogo,
  SoftDeleteLogo,
  TransactionsLogo,
  CompositeIndexLogo,
  CursorPaginationLogo,
  ConnectionPoolLogo,
  NPlusOneLogo,
  RagLogo,
  EmbeddingsLogo,
  HybridSearchLogo,
} from "./DatabasesBrandLogos";

type Skill = { name: string; version?: string; Logo: React.ComponentType<{ size?: number; className?: string }> };
type SkillGroup = { label: string; skills: Skill[] };

// Typing loop hook · igual hero
function useTypingLoop(word: string, typingSpeed = 95, deletingSpeed = 55, pauseTime = 2200) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(pauseTimer);
    }

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          const next = word.slice(0, text.length + 1);
          setText(next);
          if (next.length === word.length) setIsPaused(true);
        } else {
          const next = word.slice(0, text.length - 1);
          setText(next);
          if (next.length === 0) setIsDeleting(false);
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(timeout);
  }, [text, isDeleting, isPaused, word, typingSpeed, deletingSpeed, pauseTime]);

  return text;
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "CORE",
    skills: [
      { name: "PostgreSQL", version: "16", Logo: PostgresLogo },
      { name: "pgvector", Logo: PgvectorLogo },
      { name: "HNSW Index", Logo: HnswLogo },
    ],
  },
  {
    label: "ORM",
    skills: [
      { name: "Prisma", version: "6 · 7", Logo: PrismaLogo },
      { name: "Migrations", Logo: MigrationsLogo },
      { name: "Raw queries", Logo: RawQueriesLogo },
    ],
  },
  {
    label: "CACHE & QUEUES",
    skills: [
      { name: "Redis", version: "ioredis 5.4", Logo: RedisLogo },
      { name: "BullMQ", version: "5.70", Logo: BullMQLogo },
      { name: "L1 / L2 cache", Logo: CacheLayersLogo },
    ],
  },
  {
    label: "PATTERNS",
    skills: [
      { name: "Multi-tenant", Logo: MultiTenantLogo },
      { name: "Repository", Logo: RepositoryLogo },
      { name: "Soft delete", Logo: SoftDeleteLogo },
      { name: "Transactions", Logo: TransactionsLogo },
    ],
  },
  {
    label: "PERFORMANCE",
    skills: [
      { name: "Composite indexes", Logo: CompositeIndexLogo },
      { name: "Cursor pagination", Logo: CursorPaginationLogo },
      { name: "Connection pooling", Logo: ConnectionPoolLogo },
      { name: "N+1 prevention", Logo: NPlusOneLogo },
    ],
  },
  {
    label: "AI & SEARCH",
    skills: [
      { name: "RAG architecture", Logo: RagLogo },
      { name: "Embeddings", Logo: EmbeddingsLogo },
      { name: "Hybrid search", Logo: HybridSearchLogo },
    ],
  },
];

const FULL_TITLE = "Data & Vector";
const SEP_START = "Data".length; // 4
const SEP_END = SEP_START + 3; // " & " · index 7

export function DatabasesCardPremium() {
  const t = useTranslations("skills.carousel.databasesPremium");
  const typed = useTypingLoop(FULL_TITLE);

  const part1 = typed.slice(0, SEP_START);
  const sepRaw = typed.slice(SEP_START, SEP_END);
  const part2 = typed.slice(SEP_END);
  const sepHasAmp = sepRaw.includes("&");

  return (
    <div className="frontend-premium databases-premium">
      <header className="fp-header">
        <span className="fp-eyebrow">{t("eyebrow")}</span>

        <div className="fp-title-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/databases.gif"
            alt=""
            className="fp-title-icon"
            aria-hidden
            loading="lazy"
          />
          <h3 className="fp-title">
            {part1 && (
              <span className="fp-title-gradient" data-text={part1}>{part1}</span>
            )}
            {sepHasAmp && <span className="fp-title-sep">&amp;</span>}
            {part2 && (
              <span className="fp-title-gradient" data-text={part2}>{part2}</span>
            )}
            <span className="fp-title-cursor" aria-hidden>▎</span>
          </h3>
        </div>

        <p className="fp-desc">{t("desc")}</p>
      </header>

      <div className="fp-divider" aria-hidden />

      <section className="fp-stack">
        {SKILL_GROUPS.map((group, gIdx) => (
          <div key={group.label} className="fp-row">
            <span className="fp-row-label">{group.label}</span>
            <div className="fp-pills">
              {group.skills.map((s, i) => (
                <div
                  key={s.name}
                  className="fp-pill"
                  style={{ animationDelay: `${(gIdx * 4 + i) * 24}ms` }}
                >
                  <span className="fp-pill-logo">
                    <s.Logo size={14} />
                  </span>
                  <span className="fp-pill-name">{s.name}</span>
                  {s.version && <span className="fp-pill-version">{s.version}</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
