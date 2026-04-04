'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/Card';

const testimonials = [
  {
    id: 1,
    name: 'Judith & Martin',
    role: 'Wedding Couple',
    initials: 'J&M',
    rating: 5,
    content: "Collo made our wedding day absolutely perfect! His warmth, professionalism, and ability to read the room kept everyone engaged from start to finish. Our guests are still talking about how amazing he was. We couldn't have asked for a better MC.",
    event: 'Wedding Reception',
  },
  {
    id: 2,
    name: 'Family Elders',
    role: 'Traditional Dowry Ceremony',
    initials: 'TE',
    rating: 5,
    content: "Collo honored our traditions with such deep respect and understanding. He guided the dowry ceremony flawlessly, bridging both families with warmth and cultural sensitivity. A truly unforgettable experience for our community.",
    event: 'Dowry Ceremony',
  },
  {
    id: 3,
    name: 'Development Committee',
    role: 'ACK Church',
    initials: 'DC',
    rating: 5,
    content: "Our fundraising event raised 40% more than last year, and we credit Collo's engaging hosting style. He connected with our donors personally and created an atmosphere of generosity. A true professional who cares about your success.",
    event: 'Fundraising Event',
  },
  {
    id: 4,
    name: 'Engineer Samuel',
    role: 'Thanksgiving Ceremony',
    initials: 'ES',
    rating: 5,
    content: "For our Thanksgiving celebration, we wanted something special. Collo delivered beyond our wildest dreams. He incorporated personal stories, kept the energy perfect, and made everyone feel included. Truly unforgettable!",
    event: 'Thanksgiving Event',
  },
  {
    id: 5,
    name: 'Rev. Joshua',
    role: 'Ordination Ceremony',
    initials: 'RJ',
    rating: 5,
    content: "Collo brought such grace, reverence, and warmth to my ordination ceremony. He understood the spiritual significance of the day and guided the proceedings with dignity. Everything flowed beautifully, and our congregation was deeply touched by his professionalism.",
    event: 'Ordination Ceremony',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  return (
    <Section id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Testimonials"
          title="What Clients Say"
          subtitle="Real feedback from real events – because your satisfaction is my priority"
        />

        {/* Main Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-3 rounded-full bg-dark-800 border border-dark-700 text-white hover:bg-dark-700 hover:border-primary-500 transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-3 rounded-full bg-dark-800 border border-dark-700 text-white hover:bg-dark-700 hover:border-primary-500 transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary-500 w-8'
                  : 'bg-dark-700 hover:bg-dark-600'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Additional Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={`mini-${testimonial.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <div className="bg-dark-800/30 backdrop-blur-sm rounded-xl p-6 border border-dark-700">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-dark-300 text-sm mb-4 line-clamp-3">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-500/20 border border-primary-500/30 flex items-center justify-center mr-3">
                    <span className="text-primary-400 font-semibold text-xs">{testimonial.initials}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{testimonial.name}</p>
                    <p className="text-dark-500 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

interface TestimonialCardProps {
  testimonial: typeof testimonials[0];
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-dark-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-dark-700 shadow-glow">
      <Quote className="w-12 h-12 text-primary-500/30 mb-6" />

      <div className="flex mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 fill-amber-400 text-amber-400"
          />
        ))}
      </div>

      <p className="text-xl md:text-2xl text-white leading-relaxed mb-8">
        "{testimonial.content}"
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-14 h-14 rounded-full bg-primary-500/20 border-2 border-primary-500/30 flex items-center justify-center mr-4">
            <span className="text-primary-400 font-bold text-sm">{testimonial.initials}</span>
          </div>
          <div>
            <p className="text-white font-semibold text-lg">{testimonial.name}</p>
            <p className="text-dark-400">{testimonial.role}</p>
          </div>
        </div>
        <div className="hidden md:block">
          <span className="px-4 py-2 bg-primary-500/10 rounded-full text-primary-400 text-sm">
            {testimonial.event}
          </span>
        </div>
      </div>
    </div>
  );
}
