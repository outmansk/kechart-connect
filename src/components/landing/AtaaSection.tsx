import { motion, useSpring, useTransform } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useEffect, useState } from 'react';
import { Landmark, School, HandHeart, MapPin, Target } from 'lucide-react';

const axes = [
  {
    icon: Landmark,
    titre: 'Construction Mosquée',
    description: 'Construction d\'une mosquée pour le douar, lieu de culte et de rassemblement communautaire.',
    budget: 30000,
    color: 'from-primary to-primary-hover',
    bgColor: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    icon: School,
    titre: 'Réaménagement École',
    description: 'Rénovation et équipement d\'une école rurale pour offrir un environnement éducatif digne aux enfants.',
    budget: 5000,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
  },
  {
    icon: HandHeart,
    titre: 'Action Solidarité',
    description: 'Distribution de vêtements, couvertures et paniers alimentaires aux familles dans le besoin.',
    budget: 10000,
    color: 'from-rose-500 to-rose-600',
    bgColor: 'bg-rose-500/10',
    iconColor: 'text-rose-500',
  },
];

const BUDGET_TOTAL = 45000;
const BUDGET_COLLECTE = 28500; // À mettre à jour selon le réel

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const { ref, isInView } = useScrollReveal();
  const [displayed, setDisplayed] = useState(0);
  const spring = useSpring(0, { stiffness: 40, damping: 20 });
  const rounded = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, value, spring]);

  useEffect(() => {
    return rounded.on('change', (v) => setDisplayed(v));
  }, [rounded]);

  return (
    <span ref={ref}>
      {displayed.toLocaleString('fr-FR')}{suffix}
    </span>
  );
}

function BudgetBar() {
  const { ref, isInView } = useScrollReveal();
  const percentage = Math.min((BUDGET_COLLECTE / BUDGET_TOTAL) * 100, 100);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="glass-card p-8 mt-12"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <Target size={18} className="text-primary" />
          <h4 className="text-sm font-bold text-foreground">Budget de la campagne</h4>
        </div>
        <p className="text-sm text-foreground-secondary">
          <span className="font-bold text-primary"><AnimatedNumber value={BUDGET_COLLECTE} /></span>
          {' '}/{' '}
          <span className="font-semibold text-foreground">{BUDGET_TOTAL.toLocaleString('fr-FR')} DH</span>
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full h-4 bg-muted rounded-full overflow-hidden mt-4">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          className="h-full rounded-full purple-gradient relative"
        >
          <div className="absolute inset-0 bg-white/20 rounded-full" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.1) 6px, rgba(255,255,255,0.1) 12px)',
          }} />
        </motion.div>
      </div>

      <div className="flex justify-between mt-2">
        <span className="text-xs text-foreground-secondary">{Math.round(percentage)}% collecté</span>
        <span className="text-xs text-foreground-secondary">
          Reste : {(BUDGET_TOTAL - BUDGET_COLLECTE).toLocaleString('fr-FR')} DH
        </span>
      </div>
    </motion.div>
  );
}

export default function AtaaSection() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="ataa" className="bg-background-alt section-padding">
      <div className="container">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs tracking-[0.2em] font-semibold text-primary mb-3 uppercase">Caravane ATAA</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            6ᵉ Édition — Douar Tagadirt
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin size={16} className="text-primary" />
            <span className="text-sm text-foreground-secondary">Province d'Al Haouz, Maroc</span>
          </div>
          <p className="text-foreground-secondary max-w-2xl mx-auto leading-relaxed">
            La Caravane Humanitaire ATAA revient pour sa 6ᵉ édition dans le douar de Tagadirt,
            une zone rurale de la province d'Al Haouz durement touchée par le séisme de 2023.
            Trois axes d'intervention pour un impact maximal.
          </p>
        </motion.div>

        {/* 3 Axes Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {axes.map((axe, i) => (
            <motion.div
              key={axe.titre}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="glass-card overflow-hidden transition-shadow duration-300"
            >
              {/* Gradient top bar */}
              <div className={`h-1.5 bg-gradient-to-r ${axe.color}`} />

              <div className="p-7">
                <div className={`w-14 h-14 rounded-2xl ${axe.bgColor} flex items-center justify-center mb-5`}>
                  <axe.icon size={24} className={axe.iconColor} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{axe.titre}</h3>
                <p className="text-sm text-foreground-secondary leading-relaxed mb-5">{axe.description}</p>
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-foreground-secondary mb-1">Budget estimé</p>
                  <p className="text-2xl font-extrabold text-foreground">
                    <AnimatedNumber value={axe.budget} suffix=" DH" />
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Budget Progress Bar */}
        <BudgetBar />
      </div>
    </section>
  );
}
