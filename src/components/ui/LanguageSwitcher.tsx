"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "../../../i18n/navigation";
import { locales, localeFlags, localeNames } from "../../../i18n/config";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLocaleChange(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--foreground)] hover:border-[var(--border-hover)] transition-all duration-200 active:scale-95 flex items-center gap-1.5"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-xs font-medium uppercase">{locale}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 py-1 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] shadow-xl shadow-black/20 min-w-[140px] z-50 overflow-hidden">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => handleLocaleChange(l)}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors duration-150",
                locale === l
                  ? "text-indigo-400 bg-indigo-500/10"
                  : "text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-bg-hover,var(--card-bg))]"
              )}
            >
              <span className="text-base">{localeFlags[l]}</span>
              <span className="font-medium">{localeNames[l]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
