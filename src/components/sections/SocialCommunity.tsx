'use client';

import { motion } from 'framer-motion';
import { Section, SectionHeader } from '@/components/ui/Card';
import Image from 'next/image';

const socialPlatforms = [
  {
    icon: '/Images/facebook.png',
    name: 'Facebook',
    href: 'https://www.facebook.com/share/1X5LJYFxY6/',
    description: 'Follow us for event updates, behind-the-scenes moments, and community stories.',
  },
  {
    icon: '/Images/tik-tok.png',
    name: 'TikTok',
    href: 'https://www.tiktok.com/@mccollohyperman',
    description: 'Catch highlights, event moments, and fun MC content on our TikTok channel.',
  },
  {
    icon: '/Images/social.png',
    name: 'WhatsApp',
    href: 'https://wa.me/254721488132',
    description: 'Reach out directly for inquiries, bookings, or to join our community group.',
  },
];

export function SocialCommunity() {
  return (
    <Section id="community" variant="alternate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Join Our Community"
          title="Stay Connected With Us"
          subtitle="Follow our social media platforms to stay up to date with announcements, event highlights, and behind-the-scenes moments. Share, engage, and be part of the MC Collo family!"
        />

        {/* Social Platform Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {socialPlatforms.map((platform, index) => (
            <motion.a
              key={platform.name}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-dark-700 hover:border-primary-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ y: -5 }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl overflow-hidden mb-4 relative group-hover:scale-110 transition-transform duration-300">
                <Image 
                  src={platform.icon} 
                  alt={platform.name}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                {platform.name}
              </h3>
              <p className="text-dark-400 text-sm leading-relaxed mb-4">
                {platform.description}
              </p>

              {/* CTA */}
              <div className="flex items-center text-primary-400 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                Follow Us
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  );
}
