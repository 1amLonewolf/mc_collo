'use client';

import { motion } from 'framer-motion';
import { 
  Heart, 
  Building2, 
  Sparkles, 
  GraduationCap, 
  Music, 
  Users 
} from 'lucide-react';
import { Section, SectionHeader, Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { scrollToElement } from '@/lib/utils';

const services = [
  {
    icon: Heart,
    title: 'Wedding MC',
    description: 'Your love story deserves a perfect narration. I will guide your special day with warmth, humor, and seamless coordination.',
    benefits: [
      'Personalized ceremony scripting',
      'Reception coordination & announcements',
      'Guest engagement & ice-breaking',
      'Timeline management',
    ],
    gradient: 'from-pink-500/20 to-rose-500/20',
    borderColor: 'border-pink-500/30',
  },
  {
    icon: Building2,
    title: 'Corporate Events',
    description: 'Professional hosting for conferences, product launches, and company gatherings that reflect your brand excellence.',
    benefits: [
      'Executive-level professionalism',
      'Brand-aligned presentation',
      'Audience engagement strategies',
      'Multi-format adaptability',
    ],
    gradient: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
  },
  {
    icon: Sparkles,
    title: 'Galas & Award Ceremonies',
    description: 'Elegant hosting for high-profile events where every moment matters and prestige is paramount.',
    benefits: [
      'Sophisticated presentation style',
      'VIP guest management',
      'Award presentation coordination',
      'Red carpet experience',
    ],
    gradient: 'from-amber-500/20 to-yellow-500/20',
    borderColor: 'border-amber-500/30',
  },
  {
    icon: GraduationCap,
    title: 'Conferences & Seminars',
    description: 'Knowledge-sharing events deserve an MC who understands the balance of education and engagement.',
    benefits: [
      'Speaker introductions & transitions',
      'Q&A session facilitation',
      'Technical coordination',
      'Audience interaction management',
    ],
    gradient: 'from-purple-500/20 to-violet-500/20',
    borderColor: 'border-purple-500/30',
  },
  {
    icon: Music,
    title: 'Private Celebrations',
    description: 'Birthdays, anniversaries, milestone parties – I bring the energy that turns gatherings into celebrations.',
    benefits: [
      'Custom entertainment planning',
      'Interactive games & activities',
      'Music coordination',
      'Memory-making moments',
    ],
    gradient: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30',
  },
  {
    icon: Users,
    title: 'Community Events',
    description: 'From fundraisers to cultural festivals, I connect communities through engaging, inclusive hosting.',
    benefits: [
      'Crowd management expertise',
      'Cultural sensitivity',
      'Multilingual capabilities',
      'Community engagement focus',
    ],
    gradient: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-orange-500/30',
  },
];

export function Services() {
  return (
    <Section id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Services"
          title="What I Bring to Your Event"
          subtitle="Comprehensive MC services tailored to make every occasion extraordinary"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card
                className="h-full"
                hoverEffect={true}
                glow={true}
              >
                {/* Icon */}
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 sm:mb-6 border ${service.borderColor}`}>
                  <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>

                {/* Title & Description */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                  {service.title}
                </h3>
                <p className="text-dark-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {service.description}
                </p>

                {/* Benefits List */}
                <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start text-dark-300 text-xs sm:text-sm">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400 mr-2 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-sm"
                  onClick={() => scrollToElement('contact')}
                >
                  Inquire Now
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-dark-400 mb-4 sm:mb-6 text-sm sm:text-base px-4">
            Need something custom? I'd love to hear about your unique event.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => scrollToElement('contact')}
            className="w-full sm:w-auto"
          >
            Get in Touch
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}
