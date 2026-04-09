import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Send } from 'lucide-react';

export default function ContactSection() {
  const [form, setForm] = useState({ nom: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const { ref, isInView } = useScrollReveal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Veuillez remplir tous les champs.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.from('contacts').insert([{
      nom: form.nom.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    }]);
    setLoading(false);
    if (error) {
      toast.error("Une erreur est survenue.");
    } else {
      toast.success("Message envoyé avec succès !");
      setForm({ nom: '', email: '', message: '' });
    }
  };

  const inputClass = "w-full border border-primary/20 rounded-xl px-4 py-3 text-sm bg-white text-foreground placeholder:text-foreground-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition";

  return (
    <section id="contact" className="section-padding">
      <div className="container max-w-lg">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="text-xs tracking-[0.15em] font-medium text-primary mb-3 text-center">CONTACT</p>
          <h2 className="text-3xl font-bold text-foreground text-center mb-2">Contactez-nous</h2>
          <p className="text-sm text-foreground-secondary text-center mb-8">Une question, une idée ? Écrivez-nous.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input placeholder="Nom" className={inputClass} value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} />
            <input type="email" placeholder="Email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <textarea placeholder="Message" rows={4} className={inputClass} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <motion.button
              whileHover={{ y: -2 }}
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-semibold rounded-xl py-3.5 hover:bg-primary-hover transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? 'Envoi...' : <><Send size={16} /> Envoyer</>}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
