import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

      {/* Purple overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-hover/70 via-primary/50 to-foreground/80" />

      {/* Content */}
      <div className="relative z-10 container text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs tracking-[0.2em] font-medium text-primary-light mb-6"
        >
          ASSOCIATION KECHART — MARRAKECH, MAROC
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-hero text-white mb-6 drop-shadow-lg"
        >
          Agir. Aider. Inspirer.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg text-white/80 max-w-[520px] mx-auto mb-10"
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
            transition={{ duration: 0.2 }}
            onClick={onVolunteer}
            className="bg-primary text-primary-foreground font-semibold rounded-xl px-8 py-3.5 hover:bg-primary-hover transition-colors shadow-glass"
          >
            Devenir Bénévole
          </motion.button>
          <motion.button
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            onClick={() => document.querySelector('#actions')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-white font-medium px-8 py-3.5 rounded-xl border border-white/30 hover:bg-white/10 transition-colors"
          >
            Découvrir nos projets →
          </motion.button>
        </motion.div>

        {/* Slide indicators */}
        <div className="flex gap-2 justify-center mt-12">
          {bgImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? 'w-8 bg-white' : 'w-3 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
