'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calendar, MapPin, Users, X } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { scrollToElement } from '@/lib/utils';

const portfolioItems = [
  {
    id: 1,
    title: 'Dowry / Pre-Wedding Ceremony',
    category: 'Weddings',
    location: 'Moding, Teso North, Busia',
    date: '2024',
    guests: '250+',
    image: '/Images/elegant-reception.jpeg',
    description: 'A beautiful traditional dowry ceremony celebrating culture, love, and family.',
  },
  {
    id: 2,
    title: 'Memorial & Funeral Service',
    category: 'Community',
    location: 'Kenya',
    date: '2025',
    guests: '500+',
    image: '/Images/Portfolio.jpeg',
    description: 'Honoring a legacy with dignity, grace, and heartfelt respect.',
  },
  {
    id: 3,
    title: 'Fundraising Event',
    category: 'Community',
    location: 'ACK church, Busia Parish',
    date: '2025',
    guests: '400+',
    image: '/Images/fundraising.jpeg',
    description: 'Coming together to raise funds and build a stronger community.',
  },
  {
    id: 4,
    title: 'Thanksgiving Ceremony',
    category: 'Community',
    location: 'Rarieda Subcounty, Siaya',
    date: '2025',
    guests: '500+',
    image: '/Images/Thanksgiving.jpeg',
    description: 'A beautiful celebration of gratitude, community, and togetherness.',
  },
  {
    id: 5,
    title: 'Wedding Celebration',
    category: 'Weddings',
    location: 'PCEA Church, Busia Parish',
    date: '2025',
    guests: '150+',
    image: '/Images/portfolio-image-2.jpeg',
    description: 'A beautiful church wedding celebration filled with love, faith, and joy.',
  },
  {
    id: 6,
    title: 'Greenworld Clinic Roadshow',
    category: 'Corporate',
    location: 'Busia',
    date: '2025',
    image: '/Images/Roadshow.jpeg',
    description: 'Driving health awareness and community engagement through a dynamic roadshow.',
  },
  {
    id: 7,
    title: "Rev. Joshua's Ordination",
    category: 'Community',
    location: 'Nambale, Busia',
    date: '2025',
    guests: '250+',
    image: '/Images/Ordination.jpeg',
    description: 'A sacred and celebratory ordination ceremony marking a new chapter in ministry.',
  },
  {
    id: 8,
    title: 'Traditional Dowry Ceremony',
    category: 'Weddings',
    location: 'Yimbo Bondo',
    date: '2025',
    guests: '200+',
    image: '/Images/traditional-dowry.jpeg',
    description: 'Honoring rich cultural traditions and uniting two families with respect and joy.',
  },
  {
    id: 9,
    title: 'KEPSHA Teachers Conference',
    category: 'Corporate',
    location: 'Nakuru',
    date: '2025',
    guests: '500+',
    image: '/Images/kepsha-conference.jpeg',
    description: 'Empowering educators through professional development, collaboration, and shared vision.',
  },
];

const categories = ['All', 'Weddings', 'Corporate', 'Community'];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <Section id="portfolio" variant="alternate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Portfolio"
          title="Events I've Hosted"
          subtitle="A glimpse into the memorable moments we've created together"
        />

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary-500 text-white shadow-glow'
                  : 'bg-dark-800 text-dark-400 hover:text-white hover:bg-dark-700'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          {filteredItems.map((item, index) => (
            <PortfolioCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-dark-400 mb-6">
            Ready to create your own unforgettable moment?
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => scrollToElement('contact')}
          >
            Book Your Event
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}

interface PortfolioCardProps {
  item: typeof portfolioItems[0];
  index: number;
}

function PortfolioCard({ item, index }: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-dark-800 border border-dark-700">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={index < 2 ? 'eager' : 'lazy'}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: isHovered ? 0.9 : 0.7 }}
          />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-primary-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white">
              {item.category}
            </span>
          </div>

          {/* Hover Content */}
          <motion.div
            className="absolute inset-0 flex items-end p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-white text-sm leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        </div>

        {/* Info */}
        <div className="p-5 flex flex-col justify-between min-h-[110px]">
          <h3 className="text-lg font-bold text-white mb-3 line-clamp-2">
            {item.title}
          </h3>

          <div className="flex flex-wrap gap-4 text-sm text-dark-400">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1.5 text-primary-400" />
              {item.date}
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1.5 text-primary-400" />
              {item.location}
            </div>
            {item.guests && (
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1.5 text-primary-400" />
                {item.guests}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
