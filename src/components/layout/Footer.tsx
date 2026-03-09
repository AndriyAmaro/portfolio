"use client";

import { cn } from "@/lib/utils";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/AndriyAmaro", icon: Github },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/andri-amaro", icon: Linkedin },
  { name: "Email", href: "mailto:andrifullstackdev@gmail.com", icon: Mail },
];

const navLinks = [
  { label: "Sobre", href: "#about" },
  { label: "Habilidades", href: "#skills" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Projetos", href: "#projects" },
  { label: "Jornada", href: "#journey" },
  { label: "Servicos", href: "#services" },
  { label: "Contato", href: "#contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => {
      setIsDark(!document.documentElement.classList.contains("light-mode"));
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[var(--border)] footer-bg overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-500/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Main content - centered */}
        <div className="py-16 flex flex-col items-center text-center gap-8">
          {/* Logo */}
          <Link href="/" className="relative shrink-0 hover:opacity-90 transition-opacity">
            <Image
              src="/logo-dark.png"
              alt="Andri Dev"
              width={180}
              height={50}
              className={cn(
                "h-11 w-auto object-contain transition-opacity duration-300",
                mounted && !isDark ? "opacity-0" : "opacity-100"
              )}
            />
            <Image
              src="/logo-light.png"
              alt="Andri Dev"
              width={180}
              height={50}
              className={cn(
                "absolute inset-0 h-11 w-auto object-contain transition-opacity duration-300",
                mounted && !isDark ? "opacity-100" : "opacity-0"
              )}
            />
          </Link>

          {/* Nav links - horizontal */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="footer-link text-sm font-medium transition-colors duration-200 hover:text-indigo-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target={social.name !== "Email" ? "_blank" : undefined}
                rel={social.name !== "Email" ? "noopener noreferrer" : undefined}
                aria-label={social.name}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="footer-social-btn p-3 rounded-xl transition-all duration-200 hover:text-indigo-400"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Status */}
          <div className="footer-status flex items-center gap-2 px-4 py-2 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-emerald-400">Disponivel para projetos</span>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider h-px" />

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="footer-copyright text-xs">
            &copy; {currentYear} <span className="gradient-text font-semibold">Andri Amaro</span> · Todos os direitos reservados
          </p>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              {[
                { name: "Next.js 16", color: "bg-indigo-500" },
                { name: "TypeScript", color: "bg-cyan-500" },
                { name: "Tailwind 4", color: "bg-violet-500" },
              ].map((tech) => (
                <span key={tech.name} className="footer-tech-stack text-[11px] flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                  <span className={`w-1 h-1 rounded-full ${tech.color}`} />
                  {tech.name}
                </span>
              ))}
            </div>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="footer-back-to-top p-2 rounded-lg transition-all duration-300"
              aria-label="Voltar ao topo"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
