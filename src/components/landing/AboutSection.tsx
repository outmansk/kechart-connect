import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Heart, GraduationCap, Palette, Users } from 'lucide-react';

const poles = [
  {
    icon: Heart,
    titre: 'Pôle Social & Humanitaire',
    description: 'Actions solidaires, caravanes médicales, distribution de paniers alimentaires et aide aux populations vulnérables.',
    gradient: 'from-rose-500 to-pink-600',
    bg: 'bg-gradient-to-br from-rose-500/10 to-pink-500/10',
    iconColor: 'text-rose-500',
    borderColor: 'group-hover:border-rose-200',
  },
  {
    icon: GraduationCap,
    titre: 'Pôle Éducation & Formation',
    description: 'Soutien scolaire, ateliers de formation professionnelle et accompagnement des jeunes en situation précaire.',
    gradient: 'from-blue-500 to-indigo-600',
    bg: 'bg-gradient-to-br from-blue-500/10 to-indigo-500/10',
    iconColor: 'text-blue-500',
    borderColor: 'group-hover:border-blue-200',
  },
  {
    icon: Palette,
    titre: 'Pôle Art & Culture',
    description: "Promotion de l'art et de la culture comme vecteurs de développement social et d'inclusion.",
    gradient: 'from-amber-500 to-orange-600',
    bg: 'bg-gradient-to-br from-amber-500/10 to-orange-500/10',
    iconColor: 'text-amber-500',
    borderColor: 'group-hover:border-amber-200',
  },
  {
    icon: Users,
    titre: 'Pôle Environnement & Citoyenneté',
    description: 'Sensibilisation environnementale, actions de nettoyage et promotion de la citoyenneté active.',
    gradient: 'from-emerald-500 to-teal-600',
    bg: 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10',
    iconColor: 'text-emerald-500',
    borderColor: 'group-hover:border-emerald-200',
  },
];

export default function AboutSection() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="apropos" className="section-padding relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-purple-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-purple-50/40 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100 rounded-full px-4 py-1.5 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-[11px] tracking-[0.2em] font-semibold text-purple-600 uppercase">À Propos</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-5 text-balance leading-tight">
            Association{' '}
            <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">KECH ART</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
            Fondée à Marrakech, l'Association KECH ART œuvre pour le développement social, éducatif, culturel et environnemental
            des communautés vulnérables. Notre mission : transformer des vies à travers des actions concrètes et durables,
            portées par une jeunesse engagée et solidaire.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {poles.map((pole, i) => (
            <motion.div
              key={pole.titre}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              className={`group relative bg-white rounded-2xl border border-gray-100 ${pole.borderColor} p-7 text-center transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50`}
            >
              {/* Gradient line at top */}
              <div className={`absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r ${pole.gradient} rounded-b opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className={`w-16 h-16 rounded-2xl ${pole.bg} flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110`}>
                <pole.icon size={26} className={pole.iconColor} />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-2.5">{pole.titre}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{pole.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
