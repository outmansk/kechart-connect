import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const bgImages = [
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80',
  'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1920&q=80',
  'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=1920&q=80',
  'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80',
];

const kenburnsStyles = [
  { animation: 'kenburns-1 8s ease-in-out forwards' },
  { animation: 'kenburns-2 8s ease-in-out forwards' },
  { animation: 'kenburns-3 8s ease-in-out forwards' },
  { animation: 'kenburns-1 8s ease-in-out forwards' },
];

interface HeroProps {
  onVolunteer: () => void;
}

export default function Hero({ onVolunteer }: HeroProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % bgImages.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background images with ken-burns */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${bgImages[current]})`,
              ...kenburnsStyles[current],
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-hover/70 via-primary/50 to-foreground/80" />

      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

      {/* Content */}
      <div className="relative z-10 container text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs tracking-[0.25em] font-medium text-primary-light mb-6 uppercase"
        >
          Association Kechart — Marrakech, Maroc
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-hero text-white mb-6 drop-shadow-lg text-balance"
        >
          Agir. Aider. Inspirer.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg md:text-xl text-white/80 max-w-[560px] mx-auto mb-12 text-balance leading-relaxed"
        >
          Nous soutenons les populations vulnérables de Marrakech à travers des actions concrètes, humaines et durables.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={onVolunteer}
            className="bg-white text-primary font-bold rounded-xl px-8 py-4 hover:bg-white/90 transition-all shadow-lg shadow-black/10 text-sm uppercase tracking-wider"
          >
            Devenir Bénévole
          </motion.button>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={() => document.querySelector('#actions')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-white font-medium px-8 py-4 rounded-xl border border-white/30 hover:bg-white/10 transition-all backdrop-blur-sm text-sm"
          >
            Découvrir nos projets →
          </motion.button>
        </motion.div>

        {/* Slide indicators */}
        <div className="flex gap-2 justify-center mt-14">
          {bgImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === current ? 'w-10 bg-white' : 'w-3 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
