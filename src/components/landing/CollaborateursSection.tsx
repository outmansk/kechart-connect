import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ExternalLink } from 'lucide-react';

const collaborateurs = [
  {
    nom: 'Fondation Mohammed VI',
    role: 'Soutien institutionnel',
    description: 'Partenaire institutionnel pour les projets éducatifs et sociaux.',
    logo: '🏛️',
    url: '#',
  },
  {
    nom: 'Croissant-Rouge Marocain',
    role: 'Partenaire officiel',
    description: "Collaboration sur les caravanes médicales et l'aide humanitaire.",
    logo: '🏥',
    url: '#',
  },
  {
    nom: 'Université Cadi Ayyad',
    role: 'Partenaire académique',
    description: 'Programmes de bénévolat étudiant et formations.',
    logo: '🎓',
    url: '#',
  },
  {
    nom: 'Commune de Marrakech',
    role: 'Soutien institutionnel',
    description: "Appui logistique et coordination locale des actions.",
    logo: '🏙️',
    url: '#',
  },
  {
    nom: 'Association Bayti',
    role: 'Partenaire associatif',
    description: "Actions conjointes pour la protection de l'enfance.",
    logo: '🤝',
    url: '#',
  },
  {
    nom: 'Rotary Club Marrakech',
    role: 'Sponsor',
    description: 'Financement de projets communautaires et événements.',
    logo: '⚙️',
    url: '#',
  },
];

export default function CollaborateursSection() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="collaborateurs" className="bg-background-alt section-padding">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.2em] font-semibold text-primary mb-3 uppercase">Nos Partenaires</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Nos Collaborateurs</h2>
          <p className="text-foreground-secondary max-w-lg mx-auto">
            Ensemble, nous multiplions l'impact de nos actions pour un avenir meilleur.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collaborateurs.map((c, i) => (
            <motion.div
              key={c.nom}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass-card p-7 flex flex-col items-center text-center transition-shadow duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/[0.07] flex items-center justify-center text-3xl mb-5">
                {c.logo}
              </div>
              <h3 className="text-base font-bold text-foreground mb-1.5">{c.nom}</h3>
              <span className="inline-block text-[10px] tracking-wider font-bold text-primary bg-primary/10 rounded-full px-3 py-1 mb-3 uppercase">
                {c.role}
              </span>
              <p className="text-sm text-foreground-secondary leading-relaxed mb-4">{c.description}</p>
              {c.url !== '#' && (
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline mt-auto">
                  Visiter <ExternalLink size={12} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
