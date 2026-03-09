"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Code2, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";

const navLinks = [
  { label: "Sobre", href: "#about" },
  { label: "Habilidades", href: "#skills" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Projetos", href: "#projects" },
  { label: "Contato", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check saved theme preference
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

    window.addEventListener("scroll", handleScroll);
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
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass py-4" : "py-6 bg-transparent"
      )}
    >
      <nav className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity group"
        >
          <div className="p-1 rounded-md bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] group-hover:shadow-lg group-hover:shadow-[var(--primary)]/30 transition-all">
            <Code2 className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold gradient-text leading-tight">Andri</span>
            <span className="text-[10px] tracking-[0.12em] text-[var(--text-muted)] uppercase font-medium">Full Stack Dev</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Theme Toggle & CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--foreground)] hover:border-[var(--border-hover)] transition-all duration-300"
              aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
          <Link href="#contact">
            <Button variant="primary" size="sm">
              Fale Comigo
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] text-[var(--text-muted)]"
              aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col gap-1.5 p-2"
            aria-label="Alternar menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={cn(
                "w-6 h-0.5 bg-[var(--foreground)] transition-all duration-300",
                isMobileMenuOpen && "rotate-45 translate-y-2"
              )}
            />
            <span
              className={cn(
                "w-6 h-0.5 bg-[var(--foreground)] transition-all duration-300",
                isMobileMenuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "w-6 h-0.5 bg-[var(--foreground)] transition-all duration-300",
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
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden glass"
      >
        <ul className="container-custom py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="#contact" className="block">
              <Button variant="primary" size="sm" className="w-full">
                Fale Comigo
              </Button>
            </Link>
          </li>
        </ul>
      </motion.div>
    </motion.header>
  );
}
