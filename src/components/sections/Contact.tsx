"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle, Mail, MapPin, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/Button";
import { Input, Textarea } from "../ui/Input";
import { ContactBackground, ContactBackgroundLight } from "../ui/ContactBackground";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Por favor, insira um email válido"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
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
        throw new Error(result.error || "Algo deu errado");
      }

      setIsSuccess(true);
      reset();

      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao enviar mensagem");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Animated Background */}
      {isLightMode ? <ContactBackgroundLight /> : <ContactBackground />}

      <div className="container-custom relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Entre em <span className="gradient-text">Contato</span>
          </h2>
          <p className="contact-subtitle max-w-2xl mx-auto">
            Tem um projeto em mente ou quer discutir oportunidades?
            Adoraria ouvir você.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h3 className="contact-title text-2xl font-semibold mb-4">
                Vamos trabalhar juntos
              </h3>
              <p className="contact-description">
                Estou disponível para trabalhos freelance e oportunidades
                em tempo integral. Se você tem um projeto que precisa de um
                desenvolvedor dedicado, fique à vontade para entrar em contato.
              </p>
            </div>

            <div className="space-y-4">
              <motion.div
                className="contact-info-card flex items-center gap-4 p-4 rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="contact-icon-container w-12 h-12 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm text-[var(--text-muted)]">Email</p>
                  <a
                    href="mailto:andrifullstackdev@gmail.com"
                    className="font-medium hover:text-[var(--primary)] transition-colors"
                  >
                    andrifullstackdev@gmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="contact-info-card flex items-center gap-4 p-4 rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="contact-icon-container w-12 h-12 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <p className="text-sm text-[var(--text-muted)]">Localização</p>
                  <p className="font-medium">Brasil (Trabalho remoto)</p>
                </div>
              </motion.div>
            </div>

            {/* Response time note */}
            <div className="contact-response-badge p-4 rounded-xl">
              <p className="text-sm contact-description">
                <span className="contact-title font-medium">
                  Resposta rápida:
                </span>{" "}
                Normalmente respondo em 24-48 horas. Para assuntos urgentes,
                mencione isso na sua mensagem.
              </p>
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
                  <h4 className="contact-title text-xl font-semibold mb-2">Mensagem Enviada!</h4>
                  <p className="contact-description">
                    Obrigado por entrar em contato. Responderei em breve.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <Input
                    label="Nome"
                    placeholder="Seu nome"
                    error={errors.name?.message}
                    {...register("name")}
                  />

                  <Input
                    label="Email"
                    type="email"
                    placeholder="seu@email.com"
                    error={errors.email?.message}
                    {...register("email")}
                  />

                  <Textarea
                    label="Mensagem"
                    placeholder="Conte-me sobre seu projeto ou oportunidade..."
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
                    Enviar Mensagem
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
