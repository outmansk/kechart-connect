import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function VolunteerModal({ open, onClose }: Props) {
  const [form, setForm] = useState({ prenom: '', nom: '', email: '', telephone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.prenom.trim()) e.prenom = 'Le prénom est requis';
    if (!form.nom.trim()) e.nom = 'Le nom est requis';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide';
    if (!form.telephone.trim()) e.telephone = 'Le téléphone est requis';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const { error } = await supabase.from('volunteers').insert([{
      prenom: form.prenom.trim(),
      nom: form.nom.trim(),
      email: form.email.trim(),
      telephone: form.telephone.trim(),
      message: form.message.trim(),
    }]);
    setLoading(false);
    if (error) {
      toast.error("Une erreur est survenue.");
    } else {
      toast.success("Merci ! Nous vous contacterons bientôt 🤝");
      setForm({ prenom: '', nom: '', email: '', telephone: '', message: '' });
      setErrors({});
      onClose();
    }
  };

  const inputClass = "w-full border border-border rounded-xl px-4 py-3.5 text-sm bg-background text-foreground placeholder:text-foreground-secondary/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-200";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25 }}
            className="bg-background border border-border rounded-2xl shadow-elevated w-full max-w-lg p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-foreground-secondary hover:text-foreground hover:bg-muted/80 transition-colors"
              aria-label="Fermer"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <UserPlus size={18} className="text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Devenir Bénévole</h2>
            </div>
            <p className="text-sm text-foreground-secondary mb-6 ml-[52px]">Rejoignez notre équipe et faites la différence.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="vol-prenom" className="block text-sm font-medium text-foreground mb-1.5">Prénom</label>
                  <input id="vol-prenom" placeholder="Votre prénom" className={inputClass} value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })} />
                  {errors.prenom && <p className="text-xs text-destructive mt-1">{errors.prenom}</p>}
                </div>
                <div>
                  <label htmlFor="vol-nom" className="block text-sm font-medium text-foreground mb-1.5">Nom</label>
                  <input id="vol-nom" placeholder="Votre nom" className={inputClass} value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} />
                  {errors.nom && <p className="text-xs text-destructive mt-1">{errors.nom}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="vol-email" className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                <input id="vol-email" type="email" placeholder="votre@email.com" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="vol-tel" className="block text-sm font-medium text-foreground mb-1.5">Téléphone</label>
                <input id="vol-tel" placeholder="+212 600 000 000" className={inputClass} value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} />
                {errors.telephone && <p className="text-xs text-destructive mt-1">{errors.telephone}</p>}
              </div>
              <div>
                <label htmlFor="vol-message" className="block text-sm font-medium text-foreground mb-1.5">Message <span className="text-foreground-secondary font-normal">(optionnel)</span></label>
                <textarea id="vol-message" placeholder="Votre motivation..." rows={3} className={inputClass + ' resize-none'} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground font-semibold rounded-xl py-3.5 hover:bg-primary-hover transition-colors disabled:opacity-50 text-sm"
              >
                {loading ? 'Envoi en cours...' : 'Envoyer ma candidature'}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
