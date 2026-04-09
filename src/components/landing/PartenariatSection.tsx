import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Eye, Camera, Award, FileText, Handshake } from 'lucide-react';

const avantages = [
  {
    icon: Eye,
    titre: 'Visibilité maximale',
    description: 'Votre logo sur tous les supports : réseaux sociaux, bannières, t-shirts et vidéos de la caravane.',
  },
  {
    icon: Camera,
    titre: 'Reportage dédié',
    description: 'Un reportage photo et vidéo professionnel mettant en valeur votre contribution et son impact.',
  },
  {
    icon: Award,
    titre: 'Certificat de partenariat',
    description: 'Un certificat officiel attestant de votre engagement social et humanitaire.',
  },
  {
    icon: FileText,
    titre: 'Rapport d\'impact',
    description: 'Un rapport détaillé post-caravane avec chiffres, témoignages et preuves d\'impact.',
  },
];

interface PartenariatSectionProps {
  onContact: () => void;
}

export default function PartenariatSection({ onContact }: PartenariatSectionProps) {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="partenariat" className="bg-background-alt section-padding">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs tracking-[0.2em] font-semibold text-primary mb-3 uppercase">Partenariat</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Pourquoi devenir partenaire ?
          </h2>
          <p className="text-foreground-secondary max-w-xl mx-auto leading-relaxed">
            En soutenant la Caravane ATAA, vous associez votre marque à un projet humanitaire
            concret et mesurable. Voici ce que nous offrons à nos partenaires.
          </p>
        </motion.div>

        {/* Avantages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {avantages.map((a, i) => (
            <motion.div
              key={a.titre}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card p-7 flex gap-5 transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <a.icon size={22} className="text-primary" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground mb-1.5">{a.titre}</h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">{a.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="glass-card inline-block px-10 py-8">
            <Handshake size={32} className="text-primary mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">Prêt à faire la différence ?</h3>
            <p className="text-sm text-foreground-secondary mb-6 max-w-md mx-auto">
              Rejoignez nos partenaires et contribuez à transformer des vies dans la province d'Al Haouz.
            </p>
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onContact}
              className="bg-primary text-primary-foreground font-bold rounded-xl px-8 py-3.5 hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20 text-sm uppercase tracking-wider"
            >
              Devenir partenaire
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
