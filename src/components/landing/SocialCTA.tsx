import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Instagram, Facebook, ArrowUpRight } from 'lucide-react';

export default function SocialCTA() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-purple-600 to-purple-800" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1)_0%,transparent_60%)]" />

      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.04] rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/[0.04] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      {/* Floating logo */}
      <div className="absolute top-10 right-10 opacity-[0.04]">
        <img src="/logo-kechart.png" alt="" className="w-64 h-auto" aria-hidden="true" />
      </div>

      <div className="container text-center relative z-10">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-4 py-1.5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[11px] tracking-[0.2em] font-semibold text-white/70 uppercase">Suivez-nous</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 text-balance leading-tight">
            Voyez l'impact.{' '}
            <span className="bg-gradient-to-r from-purple-200 to-white bg-clip-text text-transparent">En direct.</span>
          </h2>
          <p className="text-white/50 mb-12 max-w-md mx-auto text-base leading-relaxed">
            Rejoignez notre communauté et suivez nos actions au quotidien sur les réseaux sociaux.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://www.instagram.com/association_kechart/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white/[0.08] backdrop-blur-sm border border-white/15 text-white rounded-2xl px-8 py-4 font-semibold text-sm hover:bg-white hover:text-purple-700 transition-all duration-300 group"
            >
              <Instagram size={18} />
              Instagram
              <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
            </motion.a>
            <motion.a
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://www.facebook.com/Kechart.Marrakech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white/[0.08] backdrop-blur-sm border border-white/15 text-white rounded-2xl px-8 py-4 font-semibold text-sm hover:bg-white hover:text-purple-700 transition-all duration-300 group"
            >
              <Facebook size={18} />
              Facebook
              <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
