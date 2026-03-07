"use client";

import { Github, Linkedin, Mail, Heart, Code2, ArrowUp } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/AndriyAmaro",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/andri-amaro",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:andrifullstackdev@gmail.com",
    icon: Mail,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[var(--border)] footer-bg overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-indigo-500/10 pointer-events-none" />

      {/* Lateral glow effects - left side (harmonized with other sections) */}
      <div className="absolute top-0 left-0 w-[350px] h-[400px] bg-violet-500/12 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[350px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none animate-pulse-slow animation-delay-2000" />

      {/* Lateral glow effects - right side */}
      <div className="absolute top-0 right-0 w-[350px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow animation-delay-4000" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[350px] bg-violet-500/12 rounded-full blur-[80px] pointer-events-none animate-pulse-slow animation-delay-2000" />

      {/* Center subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10 py-12 md:py-14">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 items-center">
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="group flex items-center gap-2.5">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="relative"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                  <Code2 className="w-4 h-4 text-white" />
                </div>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 blur-md opacity-40" />
              </motion.div>
              <div>
                <h3 className="text-lg font-bold gradient-text">Andri</h3>
                <p className="text-xs footer-description">Full Stack Developer</p>
              </div>
            </Link>
            <p className="footer-description text-sm text-center md:text-left max-w-xs">
              Transformando ideias em experiências digitais excepcionais.
            </p>
          </div>

          {/* Social Links - Center */}
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target={social.name !== "Email" ? "_blank" : undefined}
                  rel={social.name !== "Email" ? "noopener noreferrer" : undefined}
                  aria-label={social.name}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="footer-social-btn p-3 rounded-xl transition-all duration-300 hover:text-indigo-400"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Back to top & Made with */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="footer-back-to-top flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
            >
              <ArrowUp className="w-4 h-4" />
              Voltar ao topo
            </motion.button>
            <p className="footer-made-with flex items-center gap-1.5 text-sm">
              Feito com
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-indigo-400 fill-indigo-400" />
              </motion.span>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider mt-8 mb-4 h-px" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="footer-copyright text-sm font-medium">
            &copy; {currentYear} <span className="gradient-text">Andri</span>. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4 md:gap-5">
            <span className="footer-tech-stack text-xs flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Next.js
            </span>
            <span className="footer-tech-stack text-xs flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              TypeScript
            </span>
            <span className="footer-tech-stack text-xs flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
