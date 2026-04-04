'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glow?: boolean;
}

export function Card({ children, className, hoverEffect = true, glow = false }: CardProps) {
  return (
    <motion.div
      className={cn(
        'relative bg-dark-800/50 backdrop-blur-sm rounded-2xl border border-dark-700 p-6',
        hoverEffect && 'transition-all duration-300 hover:border-primary-500/50 hover:bg-dark-800/80',
        glow && 'shadow-glow hover:shadow-glow-lg',
        className
      )}
      whileHover={hoverEffect ? { y: -8 } : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'alternate';
}

export function Section({ id, children, className, variant = 'default' }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-20 md:py-32 relative',
        variant === 'alternate' ? 'bg-dark-800/30' : 'bg-transparent',
        className
      )}
    >
      {/* Gradient fade at top for smooth transition */}
      {variant === 'alternate' && (
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-dark-950 to-transparent pointer-events-none" />
      )}
      {/* Gradient fade at bottom for smooth transition */}
      {variant === 'alternate' && (
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-950 to-transparent pointer-events-none" />
      )}
      {children}
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  light?: boolean;
}

export function SectionHeader({ 
  eyebrow, 
  title, 
  subtitle, 
  align = 'center',
  light = false 
}: SectionHeaderProps) {
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={cn('mb-16', alignments[align])}>
      {eyebrow && (
        <motion.p
          className="text-primary-400 font-medium tracking-wider uppercase text-sm mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        className={cn(
          'text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6',
          light ? 'text-white' : 'text-white'
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className={cn(
            'text-lg md:text-xl max-w-2xl mx-auto',
            light ? 'text-dark-300' : 'text-dark-400'
          )}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
