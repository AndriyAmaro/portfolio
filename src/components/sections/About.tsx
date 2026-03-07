"use client";

import { motion } from "framer-motion";
import { Code2, Lightbulb, Rocket, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { AbstractBackground, AbstractBackgroundLight } from "../ui/AbstractBackground";

const highlights = [
  {
    icon: Code2,
    title: "Código Limpo",
    description: "Escrevo código manutenível e bem documentado, seguindo boas práticas e padrões de design.",
  },
  {
    icon: Lightbulb,
    title: "Resolução de Problemas",
    description: "Abordo desafios de forma analítica, dividindo problemas complexos em soluções gerenciáveis.",
  },
  {
    icon: Users,
    title: "Trabalho em Equipe",
    description: "Prospero em ambientes colaborativos e me comunico efetivamente com stakeholders.",
  },
  {
    icon: Rocket,
    title: "Aprendizado Rápido",
    description: "Atualizo continuamente minhas habilidades e me adapto rapidamente a novas tecnologias.",
  },
];

export function About() {
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

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Abstract Background */}
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Sobre <span className="gradient-text">Mim</span>
          </h2>
          <p className="text-white/70 light-mode:text-gray-600 max-w-2xl mx-auto about-subtitle">
            Conheça quem eu sou e como posso ajudar a transformar suas ideias em realidade
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-semibold">
              Um desenvolvedor apaixonado focado em criar{" "}
              <span className="gradient-text">soluções impactantes</span>
            </h3>

            <div className="space-y-4 about-description-text">
              <p>
                Sou um Desenvolvedor Full Stack apaixonado por construir
                aplicações web que são não apenas funcionais, mas também
                proporcionam experiências excepcionais aos usuários. Minha
                jornada na tecnologia começou com a curiosidade sobre como as
                coisas funcionam na internet, o que evoluiu para uma carreira
                construindo essas mesmas coisas.
              </p>

              <p>
                Acredito em escrever código limpo e manutenível, seguindo
                as melhores práticas. Seja um frontend responsivo com
                React e Next.js ou uma API backend robusta com Node.js e
                PostgreSQL, abordo cada projeto com a mesma dedicação
                à qualidade.
              </p>

              <p>
                Quando não estou codando, você pode me encontrar explorando
                novas tecnologias, contribuindo para projetos open source ou
                trabalhando em projetos pessoais que me desafiam a crescer
                como desenvolvedor.
              </p>
            </div>

            {/* Tech stack badges */}
            <div className="flex flex-wrap gap-2 pt-4">
              {["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                  className="about-tech-badge px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Highlights grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group h-full"
              >
                <div className="about-highlight-card relative p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 h-full">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon */}
                  <div className="relative mb-4">
                    <div className="about-icon-container w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300">
                      <item.icon className="w-6 h-6 text-indigo-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <h4 className="text-lg font-semibold mb-2 text-white/95 about-card-title">
                    {item.title}
                  </h4>
                  <p className="text-sm text-white/70 leading-relaxed about-card-description">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
