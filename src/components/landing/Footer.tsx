import { Instagram, Facebook, Heart, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <footer className="relative bg-gray-950 text-white/80 overflow-hidden">
      {/* Decorative gradient spot */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[80px] bg-purple-500/5 blur-3xl" />

      <div className="container pt-20 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand - wider col */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <img src="/logo-kechart.png" alt="KECH ART" className="h-12 w-auto" />
              <div>
                <span className="text-xl font-extrabold text-white tracking-wide block leading-tight">KECH ART</span>
                <span className="text-[9px] tracking-[0.12em] font-medium text-purple-400 uppercase">Pour l'Art & les Œuvres Caritatives</span>
              </div>
            </div>
            <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-xs">
              جمعية كش أرت للفن و الاعمال الخيرية<br />
              Association Kech Art pour l'Art et les Œuvres Caritatives
            </p>
            {/* Social icons */}
            <div className="flex gap-2">
              <a
                href="https://www.instagram.com/association_kechart/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-purple-400 hover:bg-purple-500/10 hover:border-purple-500/20 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram size={17} strokeWidth={1.5} />
              </a>
              <a
                href="https://www.facebook.com/Kechart.Marrakech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-purple-400 hover:bg-purple-500/10 hover:border-purple-500/20 transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook size={17} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <p className="text-[11px] tracking-[0.2em] font-bold text-white/60 mb-5 uppercase">Navigation</p>
            <div className="space-y-2">
              {footerNav.map((l) => (
                <button
                  key={l.label}
                  onClick={() => scrollTo(l.href)}
                  className="block text-sm text-white/40 hover:text-purple-300 hover:translate-x-1 transition-all duration-200"
                >
                  {l.label}
                </button>
              ))}
              <Link to="/bureau" className="block text-sm text-white/40 hover:text-purple-300 hover:translate-x-1 transition-all duration-200">
                Bureau Exécutif
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <p className="text-[11px] tracking-[0.2em] font-bold text-white/60 mb-5 uppercase">Contact</p>
            <div className="space-y-3.5">
              <a href="mailto:associationkechart@gmail.com" className="flex items-center gap-3 text-sm text-white/40 hover:text-purple-300 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center group-hover:bg-purple-500/10 transition-colors">
                  <Mail size={14} className="shrink-0" />
                </div>
                associationkechart@gmail.com
              </a>
              <a href="tel:+212600000000" className="flex items-center gap-3 text-sm text-white/40 hover:text-purple-300 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center group-hover:bg-purple-500/10 transition-colors">
                  <Phone size={14} className="shrink-0" />
                </div>
                +212 6 00 00 00 00
              </a>
              <div className="flex items-center gap-3 text-sm text-white/40">
                <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center">
                  <MapPin size={14} className="shrink-0" />
                </div>
                Marrakech, Maroc
              </div>
            </div>
          </div>

          {/* Back to top */}
          <div className="md:col-span-2 flex md:justify-end">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-purple-400 hover:bg-purple-500/10 hover:border-purple-500/20 transition-all duration-200 self-start"
              aria-label="Remonter en haut"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06] pt-8">
          <p className="text-xs text-white/25 text-center flex items-center justify-center gap-1.5 flex-wrap">
            © {new Date().getFullYear()} Association KECH ART. Fait avec <Heart size={11} className="text-purple-500 fill-purple-500" /> à Marrakech.
          </p>
        </div>
      </div>
    </footer>
  );
}
