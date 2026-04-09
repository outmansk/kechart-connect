import { Instagram, Facebook } from 'lucide-react';
import logo from '@/assets/logo-kechart.png';

export default function Footer() {
  return (
    <footer className="bg-background-alt border-t border-border py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 mb-2">
              <img src={logo} alt="Kechart" className="h-8 w-auto" />
              <p className="text-lg font-bold text-foreground">Kechart</p>
            </div>
            <p className="text-sm text-foreground-secondary">Agir. Aider. Inspirer.</p>
            <p className="text-sm text-foreground-secondary">Marrakech, Maroc</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Navigation</p>
            {['Accueil', 'Nos Actions', 'Collaborateurs', 'Contact'].map((l) => (
              <p key={l} className="text-sm text-foreground-secondary mb-1 hover:text-primary cursor-pointer transition-colors">{l}</p>
            ))}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Contact</p>
            <p className="text-sm text-foreground-secondary mb-3">contact@kechart.org</p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/association_kechart/" target="_blank" rel="noopener noreferrer" className="text-foreground-secondary hover:text-primary transition-colors">
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a href="https://www.facebook.com/Kechart.Marrakech" target="_blank" rel="noopener noreferrer" className="text-foreground-secondary hover:text-primary transition-colors">
                <Facebook size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
        <p className="text-xs text-foreground-secondary/60 text-center mt-10">© 2025 Association Kechart. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
