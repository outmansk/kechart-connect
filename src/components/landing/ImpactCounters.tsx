import { motion, useSpring, useTransform } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useEffect, useState } from 'react';
import { Users, Heart, Zap } from 'lucide-react';

const icons = [Users, Heart, Zap];

function Counter({ value, suffix = '', label, index }: { value: number; suffix?: string; label: string; index: number }) {
  const { ref, isInView } = useScrollReveal();
  const [displayed, setDisplayed] = useState(0);
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const rounded = useTransform(spring, (v) => Math.round(v));
  const Icon = icons[index];

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
      className="text-center py-8"
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
        <Icon size={24} className="text-primary" />
      </div>
      <p className="text-[48px] md:text-[64px] font-bold text-foreground leading-none">
        {displayed}{suffix}
      </p>
      <p className="text-sm text-foreground-secondary mt-2 font-medium">{label}</p>
    </motion.div>
  );
}

export default function ImpactCounters() {
  return (
    <section id="apropos" className="bg-background-alt section-padding">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Counter value={2400} suffix="+" label="Bénéficiaires" index={0} />
          <Counter value={85} label="Bénévoles Actifs" index={1} />
          <Counter value={30} suffix="+" label="Actions Menées" index={2} />
        </div>
      </div>
    </section>
  );
}
