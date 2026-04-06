'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Mic, Heart, Lightbulb } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/Card';
import Image from 'next/image';

const values = [
  {
    icon: Mic,
    title: 'Professional Excellence',
    description: 'Years of experience honing my craft to deliver flawless performances every time.',
  },
  {
    icon: Heart,
    title: 'Genuine Care',
    description: 'I treat every event as if it were my own, investing my heart into making it special.',
  },
  {
    icon: Lightbulb,
    title: 'Creative Energy',
    description: 'Bringing fresh ideas and dynamic energy that keeps your guests engaged and entertained.',
  },
];

export function About() {
  return (
    <Section id="about" variant="alternate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="About Me"
          title="More Than Just an MC"
          subtitle="I'm your partner in creating unforgettable moments"
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image Side */}
          <motion.div
            className="relative order-1 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/Images/Profile.jpeg"
                alt="MC Collo - Professional MC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAKAAoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigD//2Q=="
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
            </div>

            {/* Floating Badge */}
            <motion.div
              className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 bg-dark-800 rounded-2xl p-4 lg:p-6 border border-dark-700 shadow-glow"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="text-center">
                <span className="text-3xl lg:text-4xl font-bold text-primary-400">10+</span>
                <p className="text-dark-400 text-xs lg:text-sm mt-1">Years of Experience</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            className="order-2 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4 sm:mb-6">
              Hello, I'm <span className="text-primary-400">MC Collo</span>
            </h3>

            <div className="space-y-3 sm:space-y-4 text-dark-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              <p>
                As the lead MC of MC Collo Events, I bring over a decade of experience 
                commanding stages and captivating audiences. Every wedding, corporate gala, 
                and celebration I host is a testament to my commitment to excellence.
              </p>
              <p>
                I believe that a great MC doesn't just announce – they connect, energize,
                and create an atmosphere where memories are made. My approach combines
                professionalism with warmth, ensuring your event flows seamlessly while
                keeping your guests thoroughly engaged.
              </p>
              <p className="text-white font-medium italic">
                "I give my absolute best so your event becomes unforgettable."
              </p>
            </div>

            {/* Values */}
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="flex items-start space-x-3 sm:space-x-4"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                >
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-500/10 flex items-center justify-center border border-primary-500/20">
                    <value.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1 text-sm sm:text-base">{value.title}</h4>
                    <p className="text-dark-400 text-sm">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <a
                href="#contact"
                className="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium transition-colors group"
              >
                Let's discuss your event
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
