import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Send, MapPin, Mail as MailIcon } from 'lucide-react';

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

  const inputClass = "w-full border border-border rounded-xl px-4 py-3.5 text-sm bg-background text-foreground placeholder:text-foreground-secondary/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-200";

  return (
    <section id="contact" className="section-padding">
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left text */}
            <div className="lg:pt-4">
              <p className="text-xs tracking-[0.2em] font-semibold text-primary mb-3 uppercase">Contact</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Contactez-nous</h2>
              <p className="text-foreground-secondary mb-8 leading-relaxed">
                Une question, une idée ou envie de collaborer ? N'hésitez pas à nous écrire, nous vous répondrons dans les meilleurs délais.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MailIcon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <p className="text-sm text-foreground-secondary">contact@kechart.org</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Adresse</p>
                    <p className="text-sm text-foreground-secondary">Marrakech, Maroc</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right form */}
            <div className="glass-card p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-nom" className="block text-sm font-medium text-foreground mb-1.5">Nom</label>
                  <input
                    id="contact-nom"
                    placeholder="Votre nom complet"
                    className={inputClass}
                    value={form.nom}
                    onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="votre@email.com"
                    className={inputClass}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                  <textarea
                    id="contact-message"
                    placeholder="Écrivez votre message ici..."
                    rows={4}
                    className={inputClass + ' resize-none'}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground font-semibold rounded-xl py-3.5 hover:bg-primary-hover transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                >
                  {loading ? 'Envoi en cours...' : <><Send size={15} /> Envoyer le message</>}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
