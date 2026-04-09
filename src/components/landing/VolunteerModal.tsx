import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
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
    if (!form.prenom.trim()) e.prenom = 'Requis';
    if (!form.nom.trim()) e.nom = 'Requis';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide';
    if (!form.telephone.trim()) e.telephone = 'Requis';
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
      onClose();
    }
  };

  const inputClass = "w-full border border-primary/20 rounded-xl px-4 py-3 text-sm bg-white text-foreground placeholder:text-foreground-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition";

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
            className="glass-card w-full max-w-lg p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-foreground-secondary hover:text-foreground">
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold text-foreground mb-1">Devenir Bénévole</h2>
            <p className="text-sm text-foreground-secondary mb-6">Rejoignez notre équipe et faites la différence.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input placeholder="Prénom" className={inputClass} value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })} />
                  {errors.prenom && <p className="text-xs text-destructive mt-1">{errors.prenom}</p>}
                </div>
                <div>
                  <input placeholder="Nom" className={inputClass} value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} />
                  {errors.nom && <p className="text-xs text-destructive mt-1">{errors.nom}</p>}
                </div>
              </div>
              <div>
                <input type="email" placeholder="Email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>
              <div>
                <input placeholder="Téléphone" className={inputClass} value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} />
                {errors.telephone && <p className="text-xs text-destructive mt-1">{errors.telephone}</p>}
              </div>
              <textarea placeholder="Message / Motivation" rows={3} className={inputClass} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />

              <motion.button
                whileHover={{ y: -2 }}
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground font-semibold rounded-xl py-3.5 hover:bg-primary-hover transition-colors disabled:opacity-50"
              >
                {loading ? 'Envoi...' : 'Envoyer ma candidature'}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
