"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle, Mail, MapPin, Send, Github, Linkedin, Clock, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/Button";
import { Input, Textarea } from "../ui/Input";
import { AbstractBackground, AbstractBackgroundLight } from "../ui/AbstractBackground";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export function Contact() {
  const t = useTranslations("contact");

  const contactSchema = z.object({
    name: z.string().min(2, t("validation.nameMin")),
    email: z.string().email(t("validation.emailInvalid")),
    message: z.string().min(10, t("validation.messageMin")),
  });

  const deliverables = t.raw("deliverables") as string[];
  const marqueeItems = t.raw("marquee") as string[];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsLightMode(document.documentElement.classList.contains("light-mode"));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || t("form.error.generic"));
      }

      setIsSuccess(true);
      reset();

      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("form.error.send"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Animated Background */}
      {isLightMode ? <AbstractBackgroundLight /> : <AbstractBackground />}

      <div className="container-custom relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full contact-response-badge mb-6"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold tracking-wider uppercase contact-description">
              {t("badge")}
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t("title")} <span className="gradient-text">{t("titleHighlight")}</span>
          </h2>
          <p className="contact-subtitle max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <h3 className="contact-title text-2xl font-semibold mb-3">
                {t("nextStep")}
              </h3>
              <p className="contact-description text-sm leading-relaxed">
                {t("nextStepDescription")}
              </p>
            </div>

            {/* What I deliver */}
            <div className="contact-response-badge p-5 rounded-xl space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold tracking-wider uppercase contact-title">
                  {t("whatIDeliver")}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {deliverables.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400/70 shrink-0" />
                    <span className="text-xs contact-description">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <motion.a
                href="mailto:andrifullstackdev@gmail.com"
                className="contact-info-card flex items-center gap-4 p-4 rounded-xl transition-all duration-300 block"
                whileHover={{ scale: 1.02, x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="contact-icon-container w-11 h-11 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[var(--text-muted)]">{t("email")}</p>
                  <p className="text-sm font-medium">andrifullstackdev@gmail.com</p>
                </div>
              </motion.a>

              <motion.div
                className="contact-info-card flex items-center gap-4 p-4 rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.02, x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="contact-icon-container w-11 h-11 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-violet-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[var(--text-muted)]">{t("location")}</p>
                  <p className="text-sm font-medium">{t("locationValue")}</p>
                </div>
              </motion.div>

              <motion.div
                className="contact-info-card flex items-center gap-4 p-4 rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.02, x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="contact-icon-container w-11 h-11 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[var(--text-muted)]">{t("responseTime")}</p>
                  <p className="text-sm font-medium">{t("responseTimeValue")}</p>
                </div>
              </motion.div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <motion.a
                href="https://github.com/AndriyAmaro"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info-card w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Github className="w-5 h-5 contact-title" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/andri-amaro"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info-card w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Linkedin className="w-5 h-5 contact-title" />
              </motion.a>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="contact-form-card relative p-6 md:p-8 rounded-2xl overflow-hidden">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent rounded-t-2xl" />

              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="contact-title text-xl font-semibold mb-2">{t("form.success.title")}</h4>
                  <p className="contact-description">
                    {t("form.success.description")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <Input
                    label={t("form.name")}
                    placeholder={t("form.namePlaceholder")}
                    error={errors.name?.message}
                    {...register("name")}
                  />

                  <Input
                    label={t("form.email")}
                    type="email"
                    placeholder={t("form.emailPlaceholder")}
                    error={errors.email?.message}
                    {...register("email")}
                  />

                  <Textarea
                    label={t("form.message")}
                    placeholder={t("form.messagePlaceholder")}
                    error={errors.message?.message}
                    {...register("message")}
                  />

                  {error && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                      <p className="text-sm text-red-500">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={isSubmitting}
                  >
                    {!isSubmitting && <Send className="w-5 h-5 mr-2" />}
                    {t("form.submit")}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats + Services marquee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative z-10 mt-32 md:mt-40"
      >
        <div className="about-marquee-container relative overflow-hidden rounded-none py-4 w-[100vw] left-1/2 -translate-x-1/2">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
          <div className="about-marquee-fade overflow-hidden">
            <div className="about-marquee-track flex items-center gap-6">
              {[...marqueeItems, ...marqueeItems].map((item, index) => (
                <span key={`${item}-${index}`} className="contents">
                  {index > 0 && <span className="about-marquee-dot" />}
                  <span className="about-marquee-item flex-shrink-0 text-sm font-medium whitespace-nowrap">
                    {item}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
