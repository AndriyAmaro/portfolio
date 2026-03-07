"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Button";
import { FuturisticBackground } from "../ui/FuturisticBackground";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-bg overflow-hidden">
      {/* Futuristic Background */}
      <div className="absolute inset-0 overflow-hidden">
        <FuturisticBackground />
      </div>

      <div className="container-custom relative z-10 pt-24">
        <div className="relative flex flex-col items-center text-center gap-8">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="status-badge inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/30 backdrop-blur-md border border-indigo-500/30 text-sm text-indigo-300 font-medium shadow-lg shadow-indigo-500/10">
              <span className="status-dot w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse shadow-lg shadow-indigo-400/50" />
              Disponível para oportunidades
            </span>
          </motion.div>

          {/* Avatar - positioned left on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative md:absolute md:-left-28 lg:-left-20 md:top-[45%] md:-translate-y-1/2"
          >
            <div className="w-40 h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.5),0_0_60px_rgba(99,102,241,0.3)] animate-float">
              <Image
                src="/avatar.jpg"
                alt="Andri"
                width={256}
                height={256}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Name - always centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-white neon-text-subtle hero-title">
              Olá, sou{" "}
              <span className="gradient-text">Andri</span>
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-400/90 mt-3 neon-text-soft tracking-wide">
              Desenvolvedor Full Stack
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl text-lg md:text-xl text-white leading-relaxed font-medium hero-description"
          >
            Transformo ideias em aplicações web escaláveis.
            Apaixonado por código limpo, experiência do usuário e
            construir produtos que fazem a diferença.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="#projects">
              <Button variant="primary" size="lg">Ver Projetos</Button>
            </Link>
            <Link href="#contact">
              <Button variant="outline" size="lg">Entrar em Contato</Button>
            </Link>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-4 mt-4"
          >
            <a
              href="https://github.com/AndriyAmaro"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-black/30 backdrop-blur-md border border-blue-500/20 text-blue-400/80 hover:text-blue-400 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 social-icon-btn"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/andri-amaro"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-black/30 backdrop-blur-md border border-blue-500/20 text-blue-400/80 hover:text-blue-400 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 social-icon-btn"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <Link
            href="#about"
            className="flex flex-col items-center gap-2 text-blue-400/60 hover:text-blue-400 transition-colors"
            aria-label="Rolar para seção sobre"
          >
            <span className="text-sm font-medium">Role para baixo</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
