import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { Project } from '@/types/database';

const placeholders: Project[] = [
  { id: '1', titre: 'Caravane Médicale', description: 'Consultations gratuites pour les populations rurales et isolées.', categorie: 'Santé', image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80', actif: true, ordre: 0, created_at: '', updated_at: '' },
  { id: '2', titre: 'Iftar Sâim', description: 'Distribution de repas pendant le mois sacré du Ramadan.', categorie: 'Solidarité', image_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', actif: true, ordre: 1, created_at: '', updated_at: '' },
  { id: '3', titre: 'Soutien Scolaire', description: 'Accompagnement éducatif pour les enfants défavorisés.', categorie: 'Éducation', image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80', actif: true, ordre: 2, created_at: '', updated_at: '' },
  { id: '4', titre: 'Aide Alimentaire', description: 'Paniers alimentaires pour les familles dans le besoin.', categorie: 'Solidarité', image_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80', actif: true, ordre: 3, created_at: '', updated_at: '' },
];

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(placeholders);
  const { ref, isInView } = useScrollReveal();

  useEffect(() => {
    supabase
      .from('projects')
      .select('*')
      .eq('actif', true)
      .order('ordre')
      .then(({ data }) => {
        if (data && data.length > 0) setProjects(data);
      });
  }, []);

  return (
    <section id="actions" className="section-padding">
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="text-xs tracking-[0.2em] font-semibold text-primary mb-3 text-center uppercase">Nos Actions</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4 text-balance">Ce que nous faisons</h2>
          <p className="text-foreground-secondary text-center mb-12 max-w-lg mx-auto">
            Chaque projet est une main tendue vers ceux qui en ont le plus besoin.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group glass-card overflow-hidden cursor-pointer transition-shadow duration-300"
            >
              <div className="aspect-video bg-background-alt overflow-hidden">
                <img
                  src={p.image_url || ''}
                  alt={p.titre}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <span className="inline-block text-[10px] tracking-[0.15em] font-bold text-primary-foreground bg-primary rounded-full px-3 py-1 mb-3 uppercase">
                  {p.categorie?.toUpperCase()}
                </span>
                <h3 className="text-lg font-bold text-foreground mb-2">{p.titre}</h3>
                <p className="text-sm text-foreground-secondary mb-4 leading-relaxed">{p.description}</p>
                <span className="inline-flex items-center text-sm font-semibold text-primary gap-1.5 group-hover:gap-2.5 transition-all">
                  En savoir plus
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
