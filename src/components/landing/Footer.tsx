import { Instagram, Facebook, Heart, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo-kechart.png';

const footerNav = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'À Propos', href: '#apropos' },
  { label: 'Caravane ATAA', href: '#ataa' },
  { label: 'Nos Éditions', href: '#editions' },
  { label: 'Partenariat', href: '#partenariat' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[hsl(240,10%,6%)] text-white/80 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src={logo} alt="KECH-ART" className="h-9 w-auto" />
              <span className="text-lg font-bold text-white">KECH-ART</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-1">Association KECH-ART</p>
            <p className="text-sm text-white/40">Agir. Aider. Inspirer.</p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-sm font-semibold text-white mb-4">Navigation</p>
            <div className="space-y-2.5">
              {footerNav.map((l) => (
                <button
                  key={l.label}
                  onClick={() => scrollTo(l.href)}
                  className="block text-sm text-white/50 hover:text-white transition-colors"
                >
                  {l.label}
                </button>
              ))}
              <Link to="/bureau" className="block text-sm text-white/50 hover:text-white transition-colors">
                Bureau Exécutif
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-semibold text-white mb-4">Contact</p>
            <div className="space-y-3">
              <a href="mailto:associationkechart@gmail.com" className="flex items-center gap-2.5 text-sm text-white/50 hover:text-white transition-colors">
                <Mail size={14} className="shrink-0" />
                associationkechart@gmail.com
              </a>
              <a href="tel:+212600000000" className="flex items-center gap-2.5 text-sm text-white/50 hover:text-white transition-colors">
                <Phone size={14} className="shrink-0" />
                +212 6 00 00 00 00
              </a>
              <div className="flex items-center gap-2.5 text-sm text-white/50">
                <MapPin size={14} className="shrink-0" />
                Marrakech, Maroc
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-sm font-semibold text-white mb-4">Réseaux sociaux</p>
            <p className="text-sm text-white/40 mb-4 leading-relaxed">
              Suivez nos actions en direct et rejoignez notre communauté.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/association_kechart/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/[0.07] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.12] transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a
                href="https://www.facebook.com/Kechart.Marrakech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/[0.07] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.12] transition-all"
                aria-label="Facebook"
              >
                <Facebook size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.08] pt-8">
          <p className="text-xs text-white/30 text-center flex items-center justify-center gap-1 flex-wrap">
            © {new Date().getFullYear()} Association KECH-ART. Fait avec <Heart size={12} className="text-primary fill-primary" /> à Marrakech.
          </p>
        </div>
      </div>
    </footer>
  );
}
