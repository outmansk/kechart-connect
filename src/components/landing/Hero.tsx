import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';

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

      {/* Multi-layered gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/80 via-purple-900/60 to-gray-950/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.15)_0%,transparent_70%)]" />

      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

      {/* Content */}
      <div className="relative z-10 container text-center px-4">
        {/* Floating Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="mb-8"
        >
          <div className="inline-block p-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/10">
            <img
              src="/logo-kechart.png"
              alt="KECH ART"
              className="h-24 md:h-32 w-auto mx-auto rounded-2xl hero-logo-float"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-5 py-2 mb-8"
        >
          <Sparkles size={14} className="text-purple-300" />
          <span className="text-xs tracking-[0.2em] font-medium text-purple-200 uppercase">
            Association Kech Art — Marrakech, Maroc
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-[44px] md:text-[80px] font-extrabold text-white mb-6 drop-shadow-lg leading-[1.05] tracking-[-0.03em]"
        >
          <span className="block">Pour l'Art</span>
          <span className="block bg-gradient-to-r from-purple-200 via-white to-purple-200 bg-clip-text text-transparent">
            & les Œuvres Caritatives
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-lg md:text-xl text-white/70 max-w-[600px] mx-auto mb-12 text-balance leading-relaxed"
        >
          Nous soutenons les populations vulnérables de Marrakech à travers des actions concrètes, humaines et durables.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={onVolunteer}
            className="relative bg-white text-purple-700 font-bold rounded-2xl px-10 py-4 hover:bg-white/95 transition-all shadow-[0_16px_48px_rgba(124,58,237,0.25)] text-sm uppercase tracking-wider overflow-hidden group"
          >
            <span className="relative z-10">Devenir Bénévole</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={() => document.querySelector('#actions')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-white font-medium px-10 py-4 rounded-2xl border border-white/20 hover:bg-white/10 transition-all backdrop-blur-md text-sm hover:border-white/40"
          >
            Découvrir nos projets →
          </motion.button>
        </motion.div>

        {/* Slide indicators */}
        <div className="flex gap-2 justify-center mt-16">
          {bgImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === current ? 'w-12 bg-white' : 'w-3 bg-white/20 hover:bg-white/40'
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
          <ChevronDown size={22} className="text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
