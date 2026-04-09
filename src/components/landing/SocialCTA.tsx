import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Instagram, Facebook, ArrowUpRight } from 'lucide-react';

export default function SocialCTA() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="purple-gradient section-padding relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container text-center relative z-10">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="text-xs tracking-[0.25em] font-semibold text-white/50 mb-4 uppercase">Suivez-nous</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">Voyez l'impact. En direct.</h2>
          <p className="text-white/60 mb-10 max-w-md mx-auto">
            Rejoignez notre communauté et suivez nos actions au quotidien sur les réseaux sociaux.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://www.instagram.com/association_kechart/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl px-8 py-3.5 font-semibold text-sm hover:bg-white hover:text-primary transition-all duration-300"
            >
              <Instagram size={18} /> Instagram <ArrowUpRight size={14} className="opacity-40" />
            </motion.a>
            <motion.a
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://www.facebook.com/Kechart.Marrakech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl px-8 py-3.5 font-semibold text-sm hover:bg-white hover:text-primary transition-all duration-300"
            >
              <Facebook size={18} /> Facebook <ArrowUpRight size={14} className="opacity-40" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
