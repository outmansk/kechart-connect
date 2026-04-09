import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      navigate('/admin');
    }
  };

  const inputClass = "w-full border border-border rounded-md px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-foreground-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-alt p-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-background border border-border rounded-xl shadow-subtle w-full max-w-sm p-8"
      >
        <h1 className="text-2xl font-bold text-foreground mb-1">Connexion</h1>
        <p className="text-sm text-foreground-secondary mb-6">Accès réservé à l'équipe Kechart</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Mot de passe" className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-semibold rounded-md py-3 hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
