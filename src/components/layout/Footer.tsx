"use client";

import { cn } from "@/lib/utils";
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/AndriyAmaro",
    icon: Github,
    label: "AndriyAmaro",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/andri-amaro",
    icon: Linkedin,
    label: "andri-amaro",
  },
  {
    name: "Email",
    href: "mailto:andrifullstackdev@gmail.com",
    icon: Mail,
    label: "andrifullstackdev",
  },
];

const navLinks = [
  { label: "Sobre", href: "#about" },
  { label: "Habilidades", href: "#skills" },
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
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-indigo-500/10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-[350px] h-[400px] bg-violet-500/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[400px] bg-indigo-500/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10 py-14 md:py-16">
        {/* Top: Logo + Nav + Social */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="relative shrink-0">
              <Image
                src="/logo-dark.png"
                alt="Andri Dev"
                width={140}
                height={40}
                className={cn(
                  "h-9 w-auto object-contain transition-opacity duration-300",
                  mounted && !isDark ? "opacity-0" : "opacity-100"
                )}
              />
              <Image
                src="/logo-light.png"
                alt="Andri Dev"
                width={140}
                height={40}
                className={cn(
                  "absolute inset-0 h-9 w-auto object-contain transition-opacity duration-300",
                  mounted && !isDark ? "opacity-100" : "opacity-0"
                )}
              />
            </Link>
            <p className="footer-description text-sm text-center md:text-left max-w-xs leading-relaxed">
              Transformando ideias em experiencias digitais excepcionais. Focado em arquitetura limpa, performance e experiencia do usuario.
            </p>
            {/* Status badge */}
            <div className="footer-status flex items-center gap-2 px-3 py-1.5 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-emerald-400">Disponivel para projetos</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start gap-3">
            <h4 className="footer-section-title text-xs font-bold uppercase tracking-widest mb-1">Navegacao</h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="footer-link text-sm transition-colors duration-200 hover:translate-x-0.5 transform"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social & Contact */}
          <div className="md:col-span-5 flex flex-col items-center md:items-end gap-4">
            <h4 className="footer-section-title text-xs font-bold uppercase tracking-widest mb-1">Conecte-se</h4>
            <div className="flex flex-col gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target={social.name !== "Email" ? "_blank" : undefined}
                  rel={social.name !== "Email" ? "noopener noreferrer" : undefined}
                  whileHover={{ x: -4 }}
                  className="flex items-center gap-3 group"
                >
                  <span className="footer-link text-sm transition-colors duration-200 text-right">
                    {social.label}
                  </span>
                  <div className="footer-social-btn p-2.5 rounded-xl transition-all duration-300 group-hover:text-indigo-400">
                    <social.icon className="w-4 h-4" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider mt-10 mb-6 h-px" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="flex items-center gap-4">
            <p className="footer-copyright text-sm font-medium">
              &copy; {currentYear} <span className="gradient-text font-semibold">Andri Amaro</span>
            </p>
            <span className="footer-copyright text-xs hidden sm:inline">·</span>
            <p className="footer-made-with hidden sm:flex items-center gap-1.5 text-xs">
              Feito com
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" />
              </motion.span>
              e muito cafe
            </p>
          </div>

          {/* Tech stack + Back to top */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              {[
                { name: "Next.js", color: "bg-indigo-500" },
                { name: "TypeScript", color: "bg-cyan-500" },
                { name: "Tailwind", color: "bg-violet-500" },
              ].map((tech) => (
                <span key={tech.name} className="footer-tech-stack text-xs flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
                  <span className={`w-1.5 h-1.5 rounded-full ${tech.color}`} />
                  {tech.name}
                </span>
              ))}
            </div>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="footer-back-to-top p-2.5 rounded-full transition-all duration-300"
              aria-label="Voltar ao topo"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
