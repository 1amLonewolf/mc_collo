'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-dark-900/95 backdrop-blur-md shadow-lg border-b border-dark-800'
            : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Mobile Menu Button - Left side on mobile */}
            <motion.button
              className="md:hidden p-2 text-white -ml-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>

            {/* Logo - Right side on mobile, left on desktop */}
            <motion.a
              href="#"
              className="flex items-center space-x-2 md:static order-last md:order-first md:flex-row flex-row-reverse"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Logo size="sm" />
              <span className="text-white font-display font-bold text-sm sm:text-base lg:text-xl hidden sm:block">
                MC Collo Events
              </span>
              <span className={`text-white font-display font-bold text-xs transition-all duration-300 overflow-hidden ${isScrolled ? 'w-auto opacity-100' : 'w-0 opacity-0'} block sm:hidden md:hidden`}>
                MC Collo Events
              </span>
            </motion.a>

            {/* Desktop Navigation - Center on desktop */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="px-3 sm:px-4 py-2 text-dark-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-dark-800 text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.button>
              ))}
              <Button
                variant="primary"
                size="sm"
                className="ml-4"
                onClick={() => scrollToSection('#contact')}
              >
                Book Now
              </Button>
            </div>

            {/* Spacer for mobile to balance layout */}
            <div className="w-10 md:hidden" />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-dark-950/60 backdrop-blur-md z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed top-16 left-0 right-0 bg-dark-900/95 backdrop-blur-xl z-50 md:hidden border-b border-dark-800/50 shadow-xl"
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-6 space-y-2 max-h-[80vh] overflow-y-auto">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="block w-full text-left px-4 py-4 text-dark-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-base font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
                <div className="pt-4">
                  <Button
                    variant="primary"
                    className="w-full py-4 text-base font-semibold"
                    onClick={() => scrollToSection('#contact')}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
