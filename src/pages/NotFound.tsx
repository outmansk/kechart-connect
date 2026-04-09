import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background-alt p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-extrabold text-primary">404</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Page introuvable</h1>
        <p className="text-foreground-secondary mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold rounded-xl px-6 py-3 hover:bg-primary-hover transition-colors text-sm"
        >
          <Home size={16} /> Retour à l'accueil
        </motion.button>
      </motion.div>
    </div>
  );
}
