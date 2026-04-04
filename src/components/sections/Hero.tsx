'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Calendar, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { scrollToElement } from '@/lib/utils';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center lg:justify-start"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-dark-800/50 backdrop-blur-sm rounded-full border border-primary-500/30">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-dark-300 text-sm font-medium">
              Professional MC for Unforgettable Events
            </span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white mb-4 sm:mb-6 leading-tight px-2 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Your Event,
          <br />
          <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent">
            Perfectly Hosted
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-dark-300 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          MC Collo is the professional Master of Ceremonies behind MC Collo Events,
          dedicated to creating unforgettable moments with charisma and professionalism.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 w-full max-w-md mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => scrollToElement('contact')}
            className="w-full shadow-glow-lg"
          >
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Book Your Date
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToElement('services')}
            className="w-full"
          >
            Explore Services
          </Button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 max-w-3xl mx-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { icon: Award, label: 'Years Experience', value: '10+' },
            { icon: Users, label: 'Happy Clients', value: '1000+' },
            { icon: Calendar, label: 'Events Hosted', value: '800+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center p-3 sm:p-4 bg-dark-800/30 backdrop-blur-sm rounded-xl border border-dark-700"
              whileHover={{ scale: 1.05, borderColor: 'rgba(14, 165, 233, 0.5)' }}
              transition={{ duration: 0.3 }}
            >
              <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-400 mb-1 sm:mb-2" />
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{stat.value}</span>
              <span className="text-dark-400 text-xs sm:text-sm text-center">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.button
          onClick={() => scrollToElement('about')}
          className="flex flex-col items-center text-dark-400 hover:text-primary-400 transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-label="Scroll to about section"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <ArrowDown className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </section>
  );
}
