import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Instagram, Facebook } from 'lucide-react';

export default function SocialCTA() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="purple-gradient section-padding">
      <div className="container text-center">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="text-xs tracking-[0.2em] font-medium text-white/60 mb-4">SUIVEZ-NOUS</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Voyez l'impact. En direct.</h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.instagram.com/association_kechart/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/30 text-white rounded-xl px-8 py-3 font-medium text-sm hover:bg-white hover:text-primary transition-colors duration-200"
            >
              <Instagram size={18} /> Suivre sur Instagram
            </a>
            <a
              href="https://www.facebook.com/Kechart.Marrakech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/30 text-white rounded-xl px-8 py-3 font-medium text-sm hover:bg-white hover:text-primary transition-colors duration-200"
            >
              <Facebook size={18} /> Suivre sur Facebook
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
