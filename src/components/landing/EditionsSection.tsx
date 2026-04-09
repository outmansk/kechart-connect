import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Calendar, MapPin, Users, CheckCircle2 } from 'lucide-react';

const editions = [
  {
    edition: '1ʳᵉ',
    annee: '2019',
    lieu: 'Province Al Haouz',
    beneficiaires: '350+',
    actions: 'Distribution alimentaire, vêtements',
    statut: 'done',
  },
  {
    edition: '2ᵉ',
    annee: '2020',
    lieu: 'Province Al Haouz',
    beneficiaires: '500+',
    actions: 'Aide médicale, soutien scolaire',
    statut: 'done',
  },
  {
    edition: '3ᵉ',
    annee: '2021',
    lieu: 'Province Al Haouz',
    beneficiaires: '600+',
    actions: 'Caravane médicale, paniers Ramadan',
    statut: 'done',
  },
  {
    edition: '4ᵉ',
    annee: '2022',
    lieu: 'Province Al Haouz',
    beneficiaires: '700+',
    actions: 'Construction puits, aide alimentaire',
    statut: 'done',
  },
  {
    edition: '5ᵉ',
    annee: '2024',
    lieu: 'Province Al Haouz',
    beneficiaires: '800+',
    actions: 'Post-séisme, reconstruction, aide psychologique',
    statut: 'done',
  },
  {
    edition: '6ᵉ',
    annee: '2025',
    lieu: 'Douar Tagadirt',
    beneficiaires: 'En cours',
    actions: 'Mosquée, école, solidarité',
    statut: 'current',
  },
];

export default function EditionsSection() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="editions" className="section-padding">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs tracking-[0.2em] font-semibold text-primary mb-3 uppercase">Historique</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Nos Éditions
          </h2>
          <p className="text-foreground-secondary max-w-xl mx-auto">
            Depuis 2019, la Caravane ATAA a touché des milliers de vies. Retour sur notre parcours.
          </p>
        </motion.div>

        {/* Timeline Cards (mobile) / Table (desktop) */}
        {/* Desktop Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:block glass-card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-primary/[0.03]">
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Édition</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Année</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Lieu</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Bénéficiaires</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Actions clés</th>
                  <th className="px-6 py-4 font-semibold text-foreground">Statut</th>
                </tr>
              </thead>
              <tbody>
                {editions.map((ed, i) => (
                  <motion.tr
                    key={ed.edition}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className={`border-b border-border last:border-0 transition-colors ${
                      ed.statut === 'current' ? 'bg-primary/[0.04]' : 'hover:bg-muted/50'
                    }`}
                  >
                    <td className="px-6 py-4 font-bold text-foreground">{ed.edition}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-foreground-secondary">
                        <Calendar size={14} className="text-primary" />
                        {ed.annee}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-foreground-secondary">
                        <MapPin size={14} className="text-primary" />
                        {ed.lieu}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-foreground-secondary">
                        <Users size={14} className="text-primary" />
                        {ed.beneficiaires}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-foreground-secondary">{ed.actions}</td>
                    <td className="px-6 py-4 text-center">
                      {ed.statut === 'current' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary bg-primary/10 rounded-full px-3 py-1 uppercase">
                          En cours
                        </span>
                      ) : (
                        <CheckCircle2 size={18} className="text-emerald-500 mx-auto" />
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {editions.map((ed, i) => (
            <motion.div
              key={ed.edition}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              className={`glass-card p-5 ${ed.statut === 'current' ? 'border-primary/30 ring-1 ring-primary/10' : ''}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-extrabold text-foreground">{ed.edition}</span>
                  <span className="text-sm text-foreground-secondary">édition</span>
                </div>
                {ed.statut === 'current' ? (
                  <span className="text-[10px] font-bold text-primary bg-primary/10 rounded-full px-2.5 py-0.5 uppercase">En cours</span>
                ) : (
                  <CheckCircle2 size={16} className="text-emerald-500" />
                )}
              </div>
              <div className="space-y-1.5 text-sm">
                <p className="flex items-center gap-2 text-foreground-secondary"><Calendar size={13} className="text-primary" /> {ed.annee}</p>
                <p className="flex items-center gap-2 text-foreground-secondary"><MapPin size={13} className="text-primary" /> {ed.lieu}</p>
                <p className="flex items-center gap-2 text-foreground-secondary"><Users size={13} className="text-primary" /> {ed.beneficiaires} bénéficiaires</p>
              </div>
              <p className="text-xs text-foreground-secondary mt-3 pt-3 border-t border-border">{ed.actions}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
