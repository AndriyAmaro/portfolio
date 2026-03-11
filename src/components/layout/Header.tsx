"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";

const navLinks = [
  { label: "Sobre", href: "#about" },
  { label: "Habilidades", href: "#skills" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Projetos", href: "#projects" },
  { label: "Codigo", href: "#code" },
  { label: "Jornada", href: "#journey" },
  { label: "Servicos", href: "#services" },
  { label: "Contato", href: "#contact" },
];

// Section IDs for scroll tracking
const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // ---------------------------------------------------------------------------
  // Active section tracking via Intersection Observer
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const observer = new IntersectionObserver(handleIntersect, {
          rootMargin: "-40% 0px -55% 0px",
          threshold: 0,
        });
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ---------------------------------------------------------------------------
  // Scroll & theme
  // ---------------------------------------------------------------------------
  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme) {
      setIsDark(savedTheme === "dark");
      if (savedTheme === "light") {
        document.documentElement.classList.add("light-mode");
      }
    } else if (!prefersDark) {
      setIsDark(false);
      document.documentElement.classList.add("light-mode");
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass py-2" : "py-3 bg-transparent"
      )}
    >
      <nav className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="relative hover:opacity-90 transition-opacity shrink-0"
        >
          <Image
            src="/logo-dark.png"
            alt="Andri Dev"
            width={200}
            height={60}
            className={cn(
              "h-9 w-auto object-contain transition-opacity duration-300",
              mounted && !isDark ? "opacity-0" : "opacity-100"
            )}
            priority
          />
          <Image
            src="/logo-light.png"
            alt="Andri Dev"
            width={200}
            height={60}
            className={cn(
              "absolute inset-0 h-9 w-auto object-contain transition-opacity duration-300",
              mounted && !isDark ? "opacity-100" : "opacity-0"
            )}
            priority
          />
        </Link>

        {/* Desktop Navigation with active indicator */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative px-2.5 py-1 text-xs font-medium rounded-lg transition-all duration-300",
                    isActive
                      ? "text-[var(--foreground)] nav-link-active"
                      : "text-[var(--text-muted)] hover:text-[var(--foreground)]"
                  )}
                >
                  {/* Active background pill */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-lg nav-active-pill"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Theme Toggle & CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--foreground)] hover:border-[var(--border-hover)] transition-all duration-200 active:scale-95"
              aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
          <Link href="#contact">
            <Button variant="primary" size="sm" className="active:scale-[0.97] transition-transform">
              Fale Comigo
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] text-[var(--text-muted)] active:scale-95 transition-transform"
              aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col gap-1 p-2 active:scale-95 transition-transform"
            aria-label="Alternar menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={cn(
                "w-5 h-0.5 bg-[var(--foreground)] transition-all duration-300",
                isMobileMenuOpen && "rotate-45 translate-y-2"
              )}
            />
            <span
              className={cn(
                "w-5 h-0.5 bg-[var(--foreground)] transition-all duration-300",
                isMobileMenuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "w-5 h-0.5 bg-[var(--foreground)] transition-all duration-300",
                isMobileMenuOpen && "-rotate-45 -translate-y-2"
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="md:hidden overflow-hidden glass"
      >
        <ul className="container-custom py-3 flex flex-col gap-0.5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "text-[var(--foreground)] nav-link-active nav-active-pill"
                      : "text-[var(--text-muted)] hover:text-[var(--foreground)]"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className="pt-2">
            <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="block">
              <Button variant="primary" size="sm" className="w-full active:scale-[0.97]">
                Fale Comigo
              </Button>
            </Link>
          </li>
        </ul>
      </motion.div>
    </motion.header>
  );
}
