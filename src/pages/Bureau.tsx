import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const membres = [
  { nom: 'Outman Serghini', poste: 'Président', initials: 'OS' },
  { nom: 'Yassine El Amrani', poste: 'Vice-Président', initials: 'YA' },
  { nom: 'Sara Benali', poste: 'Secrétaire Générale', initials: 'SB' },
  { nom: 'Karim Ait Ouahmane', poste: 'Secrétaire Général Adjoint', initials: 'KA' },
  { nom: 'Fatima Zahra Kaddouri', poste: 'Trésorière', initials: 'FK' },
  { nom: 'Ahmed Mansouri', poste: 'Trésorier Adjoint', initials: 'AM' },
  { nom: 'Nadia Chraibi', poste: 'Chargée de Communication', initials: 'NC' },
  { nom: 'Mehdi Bouslam', poste: 'Chargé des Partenariats', initials: 'MB' },
  { nom: 'Imane El Fassi', poste: 'Responsable Pôle Social', initials: 'IF' },
  { nom: 'Rachid Tahiri', poste: 'Responsable Pôle Éducation', initials: 'RT' },
  { nom: 'Houda Berrada', poste: 'Responsable Pôle Art & Culture', initials: 'HB' },
  { nom: 'Omar Ziani', poste: 'Responsable Logistique', initials: 'OZ' },
];

const colors = [
  'from-primary to-primary-hover',
  'from-blue-500 to-blue-600',
  'from-rose-500 to-rose-600',
  'from-amber-500 to-amber-600',
  'from-emerald-500 to-emerald-600',
  'from-cyan-500 to-cyan-600',
];

export default function Bureau() {
  const { ref, isInView } = useScrollReveal();
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-foreground-secondary hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Retour à l'accueil
          </motion.button>

          {/* Header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs tracking-[0.2em] font-semibold text-primary mb-3 uppercase">Notre Équipe</p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Bureau Exécutif</h1>
            <p className="text-foreground-secondary max-w-xl mx-auto leading-relaxed">
              Les membres du bureau exécutif de l'Association KECH-ART, tous unis par un même engagement :
              servir notre communauté et porter des projets à fort impact social.
            </p>
          </motion.div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {membres.map((m, i) => (
              <motion.div
                key={m.nom}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="glass-card p-6 text-center transition-shadow duration-300 group"
              >
                {/* Avatar */}
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${colors[i % colors.length]} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <span className="text-white font-bold text-xl">{m.initials}</span>
                </div>
                <h3 className="text-base font-bold text-foreground mb-1">{m.nom}</h3>
                <span className="inline-block text-[10px] tracking-wider font-bold text-primary bg-primary/10 rounded-full px-3 py-1 uppercase">
                  {m.poste}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
