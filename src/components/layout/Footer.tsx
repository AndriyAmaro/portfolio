"use client";

import { cn } from "@/lib/utils";
import { Github, Linkedin, Mail, ArrowUp, ArrowUpRight } from "lucide-react";
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
    label: "andrifullstackdev@gmail.com",
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

      <div className="container-custom relative z-10 py-20 md:py-28">
        {/* Top: Logo + Nav + Social */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start gap-5">
            <Link href="/" className="relative shrink-0 hover:opacity-90 transition-opacity">
              <Image
                src="/logo-dark.png"
                alt="Andri Dev"
                width={160}
                height={45}
                className={cn(
                  "h-10 w-auto object-contain transition-opacity duration-300",
                  mounted && !isDark ? "opacity-0" : "opacity-100"
                )}
              />
              <Image
                src="/logo-light.png"
                alt="Andri Dev"
                width={160}
                height={45}
                className={cn(
                  "absolute inset-0 h-10 w-auto object-contain transition-opacity duration-300",
                  mounted && !isDark ? "opacity-100" : "opacity-0"
                )}
              />
            </Link>
            <p className="footer-description text-sm text-center md:text-left max-w-xs leading-relaxed">
              Arquitetura limpa, interfaces de alta performance e experiencias que fazem a diferenca.
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
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="footer-link text-sm transition-all duration-200 hover:text-indigo-400"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social & Contact */}
          <div className="md:col-span-5 flex flex-col items-center md:items-end gap-4">
            <h4 className="footer-section-title text-xs font-bold uppercase tracking-widest mb-1">Conecte-se</h4>
            <div className="flex flex-col gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.name !== "Email" ? "_blank" : undefined}
                  rel={social.name !== "Email" ? "noopener noreferrer" : undefined}
                  className="footer-social-link flex items-center gap-3 group px-3 py-2 -mx-3 rounded-lg transition-all duration-200"
                >
                  <div className="footer-social-btn p-2 rounded-lg transition-all duration-200 group-hover:text-indigo-400">
                    <social.icon className="w-4 h-4" />
                  </div>
                  <span className="footer-link text-sm transition-all duration-200 group-hover:text-indigo-400">
                    {social.label}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 footer-link opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:text-indigo-400 ml-auto" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider mt-12 mb-6 h-px" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="footer-copyright text-sm font-medium">
            &copy; {currentYear} <span className="gradient-text font-semibold">Andri Amaro</span> · Todos os direitos reservados
          </p>

          {/* Tech stack + Back to top */}
          <div className="flex items-center gap-5">
            <div className="hidden md:flex items-center gap-3">
              {[
                { name: "Next.js 16", color: "bg-indigo-500" },
                { name: "TypeScript", color: "bg-cyan-500" },
                { name: "Tailwind 4", color: "bg-violet-500" },
              ].map((tech) => (
                <span key={tech.name} className="footer-tech-stack text-xs flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
                  <span className={`w-1.5 h-1.5 rounded-full ${tech.color}`} />
                  {tech.name}
                </span>
              ))}
            </div>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -3 }}
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
