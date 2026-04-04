'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
  showText?: boolean;
  textVariant?: 'short' | 'full';
}

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
  xl: 'w-20 h-20',
};

export function Logo({
  size = 'md',
  animated = false,
  className,
  showText = false,
  textVariant = 'full'
}: LogoProps) {
  const logoContent = (
    <div className={cn(
      'rounded-full overflow-hidden relative shadow-glow',
      sizeMap[size],
      className
    )}>
      <Image
        src="/Images/MC_COLLO_LOGO.png"
        alt="MC Collo Events Logo"
        fill
        className="object-contain"
      />
    </div>
  );

  if (animated) {
    return (
      <motion.div
        className="relative"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        {logoContent}
        {/* Rotating ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary-400/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        {/* Pulsing outer ring */}
        <motion.div
          className="absolute -inset-2 rounded-full border border-primary-500/20"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        {showText && (
          <motion.span
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-white font-display font-bold whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {textVariant === 'short' ? 'MC Collo' : 'MC Collo Events'}
          </motion.span>
        )}
      </motion.div>
    );
  }

  if (showText) {
    return (
      <div className="flex items-center space-x-2">
        {logoContent}
        <span className="text-white font-display font-bold text-sm sm:text-base lg:text-xl">
          {textVariant === 'short' ? 'MC Collo' : 'MC Collo Events'}
        </span>
      </div>
    );
  }

  return logoContent;
}
