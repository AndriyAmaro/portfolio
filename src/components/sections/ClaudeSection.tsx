"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

// Substitui a seção Ecosystem · hero "Acelerando projetos com IA"
// (Desenvolvimento, Code Review, Automação) · só hero por enquanto
export function ClaudeSection() {
  const t = useTranslations("claude");

  return (
    <section id="ecosystem" className="relative py-24 md:py-32">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full eco-section-badge mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase eco-badge-text">
              {t("badge")}
            </span>
          </motion.div>

          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t("title")}{" "}
            <span className="gradient-text">{t("titleHighlight")}</span>
          </h2>
          <p className="eco-subtitle max-w-2xl mx-auto">{t("subtitle")}</p>
        </motion.div>
      </div>
    </section>
  );
}
