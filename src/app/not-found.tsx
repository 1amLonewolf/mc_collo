'use client';

import { motion } from 'framer-motion';
import { Home, ArrowLeft, Mic, Map, Radio } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const quippyMessages = [
  "This page is on a coffee break. I promise it'll be back soon!",
  "Looks like this event hasn't been scheduled yet. Even I can't MC an empty stage!",
  "You've found the VIP section... of nowhere. Let's get you back to the party!",
  "This page is like a mic without sound — technically here, but not doing much!",
  "Plot twist: this page decided to freelance. Don't worry, I'll bring it back in line!",
];

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(15);
  const [quirkyMessage, setQuirkyMessage] = useState('');

  useEffect(() => {
    setQuirkyMessage(quippyMessages[Math.floor(Math.random() * quippyMessages.length)]);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"
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
        
        {/* Floating Icons Background */}
        {[Mic, Map, Radio].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute text-primary-500/20"
            style={{
              top: `${20 + index * 25}%`,
              left: `${15 + index * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: index * 0.5,
              ease: 'easeInOut',
            }}
          >
            <Icon className="w-12 h-12 md:w-16 md:h-16" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Thinking Image */}
        <motion.div
          className="relative mb-6 w-32 h-32 mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Image
            src="/Images/thinking.png"
            alt="Thinking MC Collo"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Glitch 404 */}
        <motion.div
          className="relative mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-8xl sm:text-9xl md:text-[10rem] font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-accent-400 to-primary-500 select-none">
            404
          </h1>
          <motion.div
            className="absolute inset-0 text-8xl sm:text-9xl md:text-[10rem] font-display font-bold text-primary-500/30 select-none"
            animate={{
              x: [-2, 2, -2],
              y: [-1, 1, -1],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            404
          </motion.div>
        </motion.div>

        {/* Subheading */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Well, this is awkward... 🎤
        </motion.h2>

        {/* Quirky Message */}
        <motion.div
          className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-dark-700 border-dashed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-dark-300 text-base sm:text-lg leading-relaxed italic">
            "{quirkyMessage}"
          </p>
        </motion.div>

        {/* Professional Note */}
        <motion.p
          className="text-dark-400 text-sm sm:text-base mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Don't worry — I'll make sure you find your way back to the good stuff.
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          className="mb-8 flex items-center justify-center gap-3 text-dark-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="text-sm">Taking you back to the main stage in</span>
          <motion.span 
            key={countdown}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-400 font-bold text-lg"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {countdown}
          </motion.span>
          <span className="text-sm">seconds...</span>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push('/')}
            className="w-full sm:w-auto"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.back()}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </motion.div>

        {/* Fun Easter Egg */}
        <motion.div
          className="mt-12 text-dark-600 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p>P.S. Even the best events have a missing guest or two. We'll find your page! 🎉</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
