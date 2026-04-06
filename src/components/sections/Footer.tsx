'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { scrollToElement } from '@/lib/utils';
import { Logo } from '@/components/ui/Logo';
import Image from 'next/image';

const socialLinks = [
  { icon: '/Images/facebook.png', href: 'https://www.facebook.com/share/1X5LJYFxY6/', label: 'Facebook' },
  { icon: '/Images/social.png', href: 'https://wa.me/254721488132', label: 'WhatsApp' },
  { icon: '/Images/tik-tok.png', href: 'https://www.tiktok.com/@mccollohyperman', label: 'TikTok' },
];

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  'Wedding MC',
  'Corporate Events',
  'Galas & Awards',
  'Conferences',
  'Private Celebrations',
  'Community Events',
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 border-t border-dark-800">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <motion.a
              href="#"
              className="flex items-center space-x-2 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Logo size="sm" />
              <span className="text-white font-display font-bold text-xl">
                MC Collo Events
              </span>
            </motion.a>
            
            <p className="text-dark-400 mb-6 leading-relaxed">
              MC Collo Events - Professional Master of Ceremonies dedicated to creating 
              unforgettable experiences for weddings, corporate events, and special celebrations.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-dark-800 flex items-center justify-center hover:bg-dark-700 transition-all relative overflow-hidden"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <Image
                    src={social.icon}
                    alt={social.label}
                    fill
                    className="object-contain p-1.5"
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToElement(link.href.slice(1))}
                    className="text-dark-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => scrollToElement('services')}
                    className="text-dark-400 hover:text-primary-400 transition-colors"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0 mt-0.5" />
                <a 
                  href="mailto:mccollo48@gmail.com"
                  className="text-dark-400 hover:text-primary-400 transition-colors"
                >
                  mccollo48@gmail.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0 mt-0.5" />
                <a
                  href="tel:+254721488132"
                  className="text-dark-400 hover:text-primary-400 transition-colors"
                >
                  +254 721 488 132
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-dark-400">Available Worldwide</span>
              </li>
            </ul>

            <div className="mt-8">
              <Button
                variant="primary"
                size="sm"
                onClick={() => scrollToElement('contact')}
                className="w-full"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-dark-500 text-sm text-center md:text-left">
              © {currentYear} MC Collo Events. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
              <Link href="/privacy-policy" className="text-dark-500 hover:text-dark-300 text-xs sm:text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-dark-500 hover:text-dark-300 text-xs sm:text-sm transition-colors">
                Terms of Service
              </Link>
              <span className="text-dark-600 hidden sm:inline">•</span>
              <span className="text-dark-500 text-xs flex items-center gap-1.5 whitespace-nowrap">
                <span>Built with</span>
                <img src="/icons/heart.svg" alt="heart" className="w-3.5 h-4 object-contain" />
                <span>&</span>
                <span>code</span>
                <span className="text-[10px]">{`</>`}</span>
                <span>by</span>
                <a
                  href="https://marsden-maima-portfolio.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:bg-primary-500 hover:text-white text-[10px] px-2 py-0.5 rounded-full transition-all duration-300 font-medium flex items-center gap-1 opacity-80 hover:opacity-100 border border-primary-500/30 hover:border-primary-500"
                  title="Built by 1amlonewolf"
                >
                  <span>1amlonewolf</span>
                  <img
                    src="/icons/wolf.jpg"
                    alt="wolf"
                    className="w-3 h-3 rounded-full object-cover"
                  />
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
