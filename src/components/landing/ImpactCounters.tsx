import { motion, useSpring, useTransform } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useEffect, useState } from 'react';
import { Users, Heart, Zap } from 'lucide-react';

const counters = [
  { value: 2400, suffix: '+', label: 'Bénéficiaires', sublabel: 'personnes aidées', icon: Users },
  { value: 85, suffix: '', label: 'Bénévoles Actifs', sublabel: 'membres engagés', icon: Heart },
  { value: 30, suffix: '+', label: 'Actions Menées', sublabel: 'projets réalisés', icon: Zap },
];

function Counter({ value, suffix = '', label, sublabel, icon: Icon, index }: {
  value: number; suffix?: string; label: string; sublabel: string; icon: typeof Users; index: number;
}) {
  const { ref, isInView } = useScrollReveal();
  const [displayed, setDisplayed] = useState(0);
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const rounded = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, value, spring]);

  useEffect(() => {
    return rounded.on('change', (v) => setDisplayed(v));
  }, [rounded]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="text-center py-10 px-4"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-5">
        <Icon size={26} className="text-primary" strokeWidth={1.5} />
      </div>
      <p className="text-[52px] md:text-[68px] font-extrabold text-foreground leading-none tracking-tight">
        {displayed}{suffix}
      </p>
      <p className="text-base font-semibold text-foreground mt-3">{label}</p>
      <p className="text-sm text-foreground-secondary mt-1">{sublabel}</p>
    </motion.div>
  );
}

export default function ImpactCounters() {
  return (
    <section id="apropos" className="bg-background-alt section-padding">
      <div className="container">
        <div className="text-center mb-8">
          <p className="text-xs tracking-[0.2em] font-semibold text-primary mb-3 uppercase">Notre Impact</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Des chiffres qui parlent</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {counters.map((c, i) => (
            <Counter key={c.label} {...c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
