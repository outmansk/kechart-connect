import { Instagram, Facebook, Heart } from 'lucide-react';
import logo from '@/assets/logo-kechart.png';

const footerLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Nos Actions', href: '#actions' },
  { label: 'Collaborateurs', href: '#collaborateurs' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[hsl(240,10%,6%)] text-white/80 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src={logo} alt="Kechart" className="h-9 w-auto" />
              <span className="text-lg font-bold text-white">Kechart</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-1">Agir. Aider. Inspirer.</p>
            <p className="text-sm text-white/40">Marrakech, Maroc</p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-sm font-semibold text-white mb-4">Navigation</p>
            <div className="space-y-2.5">
              {footerLinks.map((l) => (
                <button
                  key={l.label}
                  onClick={() => scrollTo(l.href)}
                  className="block text-sm text-white/50 hover:text-white transition-colors"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-semibold text-white mb-4">Contact</p>
            <a href="mailto:contact@kechart.org" className="text-sm text-white/50 hover:text-white transition-colors block mb-4">
              contact@kechart.org
            </a>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/association_kechart/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.07] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.12] transition-all"
                aria-label="Instagram"
              >
                <Instagram size={16} strokeWidth={1.5} />
              </a>
              <a
                href="https://www.facebook.com/Kechart.Marrakech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.07] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.12] transition-all"
                aria-label="Facebook"
              >
                <Facebook size={16} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.08] pt-8">
          <p className="text-xs text-white/30 text-center flex items-center justify-center gap-1">
            © {new Date().getFullYear()} Association Kechart. Fait avec <Heart size={12} className="text-primary fill-primary" /> à Marrakech.
          </p>
        </div>
      </div>
    </footer>
  );
}
