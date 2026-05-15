'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MetricCard {
  label: string;
  value: string | number;
  description: string;
}

const metrics: MetricCard[] = [
  {
    label: 'Modelos Prisma',
    value: '126',
    description: 'Schema relacional multi-tenant complexo',
  },
  {
    label: 'API Endpoints',
    value: '~1036',
    description: 'Controller → Service → Repository, 32 módulos',
  },
  {
    label: 'Módulos Backend',
    value: '32',
    description: 'Domain-driven, replaceable, barrel index',
  },
  {
    label: 'AI Tools (Gateway)',
    value: '394',
    description: 'Entre Commander + Sentinel + domain tools',
  },
  {
    label: 'Agentes Especializados',
    value: '12',
    description: 'Commander + 11 agentes de negócio + Sentinel',
  },
  {
    label: 'Worlds (Domínios)',
    value: '9',
    description: 'E-commerce, Marketing, Analytics, etc.',
  },
  {
    label: 'Web Dashboard Sections',
    value: '17',
    description: 'Product, Orders, Customers, Analytics...',
  },
  {
    label: 'Admin Dashboard Sections',
    value: '12',
    description: 'Tenant management, billing, monitoring...',
  },
  {
    label: 'Sentinel Admin Tools',
    value: '263',
    description: 'DevOps automation & platform management',
  },
  {
    label: 'Web Pages',
    value: '27',
    description: 'Landing, auth, dashboard, admin panels',
  },
  {
    label: 'Web Components',
    value: '700+',
    description: 'Reusable UI components & widgets',
  },
  {
    label: 'Total .ts/.tsx Files',
    value: '~1480',
    description: 'TypeScript strict mode, zero any',
  },
  {
    label: 'Linhas de Código',
    value: '~330k',
    description: 'Production-ready, tested, documented',
  },
  {
    label: 'LLM Providers',
    value: '4+',
    description: 'Claude, DeepSeek, OpenAI, Qwen gateway',
  },
];

// Animated counter hook
function useCountUp(target: number | string, inView: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
    // Parse numeric value from string (remove non-digits except first number)
    const numericTarget = typeof target === 'string' 
      ? parseInt(target.replace(/[^0-9]/g, '')) || 0
      : target;
    
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(numericTarget / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= numericTarget) {
        setCount(numericTarget);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, inView]);

  return count;
}

export function MetricsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = 320 + 24; // card width + gap
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
    setCurrentIndex(index);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const cardWidth = 320 + 24;
    const newIndex = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;
    
    const checkArrows = () => {
      setShowArrows(scrollEl.scrollWidth > scrollEl.clientWidth);
    };
    
    checkArrows();
    window.addEventListener('resize', checkArrows);
    return () => window.removeEventListener('resize', checkArrows);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs font-medium text-indigo-300">Sellorex Platform</span>
          </motion.div>

          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Métricas de <span className="gradient-text">Escala Real</span>
          </h3>
          <p className="text-sm md:text-base text-white/60 max-w-2xl mx-auto">
            Números reais de produção da plataforma Sellorex — arquitetura enterprise-grade
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <AnimatePresence>
            {showArrows && (
              <>
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={() => scrollToIndex(Math.max(0, currentIndex - 1))}
                  disabled={currentIndex === 0}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed hidden md:flex"
                  aria-label="Previous metric"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onClick={() => scrollToIndex(Math.min(metrics.length - 1, currentIndex + 1))}
                  disabled={currentIndex === metrics.length - 1}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed hidden md:flex"
                  aria-label="Next metric"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </motion.button>
              </>
            )}
          </AnimatePresence>

          {/* Scrollable Cards */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-2 md:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {metrics.map((metric, index) => (
              <MetricCardItem
                key={index}
                metric={metric}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {metrics.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-indigo-500 w-8'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to metric ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCardItem({
  metric,
  index,
  isInView,
}: {
  metric: MetricCard;
  index: number;
  isInView: boolean;
}) {
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, margin: '-50px' });
  const numericValue = typeof metric.value === 'string' 
    ? parseInt(metric.value.replace(/[^0-9]/g, '')) || 0
    : metric.value;
  const count = useCountUp(numericValue, cardInView && isInView);

  // Format display value with original formatting
  const displayValue = typeof metric.value === 'string' && metric.value.startsWith('~')
    ? `~${count}`
    : count.toString();

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={cardInView && isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="flex-shrink-0 w-[320px] snap-start group"
    >
      <div className="relative p-6 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300 hover:scale-[1.02] hover:bg-white/[0.05] h-full">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <div className="relative z-10">
          {/* Large Number */}
          <div className="text-5xl md:text-6xl font-extrabold gradient-text mb-3 tabular-nums tracking-tight">
            {displayValue}
          </div>

          {/* Label */}
          <h4 className="text-lg font-bold text-white mb-2">
            {metric.label}
          </h4>

          {/* Description */}
          <p className="text-sm text-white/60 leading-relaxed">
            {metric.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
