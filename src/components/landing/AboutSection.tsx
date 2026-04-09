import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Heart, GraduationCap, Palette, Users } from 'lucide-react';

const poles = [
  {
    icon: Heart,
    titre: 'Pôle Social & Humanitaire',
    description: 'Actions solidaires, caravanes médicales, distribution de paniers alimentaires et aide aux populations vulnérables.',
    color: 'bg-rose-500/10 text-rose-500',
  },
  {
    icon: GraduationCap,
    titre: 'Pôle Éducation & Formation',
    description: 'Soutien scolaire, ateliers de formation professionnelle et accompagnement des jeunes en situation précaire.',
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    icon: Palette,
    titre: 'Pôle Art & Culture',
    description: 'Promotion de l\'art et de la culture comme vecteurs de développement social et d\'inclusion.',
    color: 'bg-amber-500/10 text-amber-500',
  },
  {
    icon: Users,
    titre: 'Pôle Environnement & Citoyenneté',
    description: 'Sensibilisation environnementale, actions de nettoyage et promotion de la citoyenneté active.',
    color: 'bg-emerald-500/10 text-emerald-500',
  },
];

export default function AboutSection() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="apropos" className="section-padding">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs tracking-[0.2em] font-semibold text-primary mb-3 uppercase">À Propos</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Association KECH-ART
          </h2>
          <p className="text-foreground-secondary max-w-2xl mx-auto leading-relaxed">
            Fondée à Marrakech, l'Association KECH-ART œuvre pour le développement social, éducatif, culturel et environnemental
            des communautés vulnérables. Notre mission : transformer des vies à travers des actions concrètes et durables,
            portées par une jeunesse engagée et solidaire.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {poles.map((pole, i) => (
            <motion.div
              key={pole.titre}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card p-6 text-center transition-shadow duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl ${pole.color} flex items-center justify-center mx-auto mb-4`}>
                <pole.icon size={24} />
              </div>
              <h3 className="text-sm font-bold text-foreground mb-2">{pole.titre}</h3>
              <p className="text-xs text-foreground-secondary leading-relaxed">{pole.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
