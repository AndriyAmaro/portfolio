"use client";

import { useEffect, useState } from "react";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import { ExternalLink, Github, Folder, Star, ArrowRight } from "lucide-react";
import { ProjectsBackground, ProjectsBackgroundLight } from "../ui/ProjectsBackground";

function ProjectCard({
  project,
  index,
  featured,
}: {
  project: typeof projects[0];
  index: number;
  featured: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group h-full"
    >
      <div className="project-card relative h-full p-6 rounded-2xl overflow-hidden flex flex-col">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Featured badge */}
        {featured && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30">
              <Star className="w-3 h-3 text-amber-400" fill="currentColor" />
              <span className="text-xs font-medium text-amber-400">Destaque</span>
            </div>
          </div>
        )}

        {/* Icon */}
        <div className="relative mb-4">
          <div className="project-icon-container w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300">
            {featured ? (
              <Star className="w-6 h-6 text-indigo-400" />
            ) : (
              <Folder className="w-6 h-6 text-indigo-400" />
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="project-title text-xl font-bold mb-3">
          {project.title}
        </h3>

        {/* Description */}
        <p className="project-description text-sm mb-4 leading-relaxed flex-grow">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="tech-badge px-2.5 py-1 rounded-lg text-xs font-medium"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="tech-badge px-2.5 py-1 rounded-lg text-xs font-medium">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Action buttons */}
        {featured ? (
          <div className="flex gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <button className="w-full project-btn-primary flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300">
                  <ExternalLink className="w-4 h-4" />
                  Ver Demo
                </button>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <button className="w-full project-btn-secondary flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300">
                  <Github className="w-4 h-4" />
                  Código
                </button>
              </a>
            )}
          </div>
        ) : (
          <button
            disabled
            className="w-full project-btn-disabled flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm cursor-not-allowed"
          >
            Em Desenvolvimento
          </button>
        )}
      </div>
    </motion.div>
  );
}

export function Projects() {
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
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      {isLightMode ? <ProjectsBackgroundLight /> : <ProjectsBackground />}

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
            Projetos em <span className="gradient-text">Destaque</span>
          </h2>
          <p className="projects-subtitle max-w-2xl mx-auto">
            Aplicações reais que demonstram minha capacidade de entregar soluções completas e escaláveis
          </p>
        </motion.div>

        {/* Projects grid - same layout as Skills cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              featured={project.featured}
            />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/AndriyAmaro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <div className="github-cta-btn group inline-flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:-translate-y-1">
              <Github className="w-5 h-5" />
              <span>Ver Todos no GitHub</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
