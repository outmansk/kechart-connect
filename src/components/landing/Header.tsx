import { useState, useEffect } from 'react';
import { Instagram, Facebook, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'À Propos', href: '#apropos' },
  { label: 'ATAA 6', href: '#ataa' },
  { label: 'Nos Actions', href: '#actions' },
  { label: 'Partenariat', href: '#partenariat' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'h-16 bg-white/80 backdrop-blur-2xl border-b border-purple-100/60 shadow-[0_1px_20px_rgba(124,58,237,0.06)]'
          : 'h-20 bg-transparent'
      }`}
    >
      <div className="container h-full flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo('#accueil')} className="flex items-center gap-3 group">
          <div className={`relative transition-all duration-300 ${scrolled ? '' : 'drop-shadow-[0_0_12px_rgba(124,58,237,0.3)]'}`}>
            <img
              src="/logo-kechart.png"
              alt="KECH ART"
              className="h-11 w-auto transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="flex flex-col">
            <span className={`text-lg font-extrabold tracking-wide leading-tight transition-colors duration-300 ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              KECH ART
            </span>
            <span className={`text-[9px] tracking-[0.15em] font-medium uppercase leading-none transition-colors duration-300 ${scrolled ? 'text-purple-500' : 'text-purple-200'}`}>
              Pour l'Art & les Œuvres Caritatives
            </span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className={`relative text-[13px] font-medium px-4 py-2 rounded-lg transition-all duration-200 group ${
                scrolled
                  ? 'text-gray-600 hover:text-purple-600 hover:bg-purple-50/60'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {l.label}
              <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-1/2 transition-all duration-300 rounded-full ${scrolled ? 'bg-purple-500' : 'bg-white'}`} />
            </button>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://www.instagram.com/association_kechart/"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
              scrolled
                ? 'text-gray-400 hover:text-purple-500 hover:bg-purple-50'
                : 'text-white/50 hover:text-white hover:bg-white/10'
            }`}
            aria-label="Instagram"
          >
            <Instagram size={16} strokeWidth={1.5} />
          </a>
          <a
            href="https://www.facebook.com/Kechart.Marrakech"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
              scrolled
                ? 'text-gray-400 hover:text-purple-500 hover:bg-purple-50'
                : 'text-white/50 hover:text-white hover:bg-white/10'
            }`}
            aria-label="Facebook"
          >
            <Facebook size={16} strokeWidth={1.5} />
          </a>
          <button
            onClick={() => scrollTo('#contact')}
            className={`text-[13px] font-semibold rounded-xl px-6 py-2.5 transition-all duration-300 ${
              scrolled
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5'
                : 'bg-white/15 text-white border border-white/25 hover:bg-white/25 backdrop-blur-sm'
            }`}
          >
            Nous contacter
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className={`lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            scrolled ? 'text-gray-700 hover:bg-purple-50' : 'text-white hover:bg-white/10'
          }`}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-2xl border-b border-purple-100/60"
          >
            <div className="p-6 flex flex-col gap-1">
              {navLinks.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="text-sm font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50/60 text-left px-4 py-3 rounded-xl transition-all"
                >
                  {l.label}
                </button>
              ))}
              <div className="flex items-center gap-3 pt-4 mt-2 border-t border-gray-100">
                <a href="https://www.instagram.com/association_kechart/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 hover:bg-purple-100 transition-colors" aria-label="Instagram">
                  <Instagram size={18} strokeWidth={1.5} />
                </a>
                <a href="https://www.facebook.com/Kechart.Marrakech" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 hover:bg-purple-100 transition-colors" aria-label="Facebook">
                  <Facebook size={18} strokeWidth={1.5} />
                </a>
              </div>
              <button
                onClick={() => scrollTo('#contact')}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-semibold rounded-xl px-6 py-3 hover:shadow-lg hover:shadow-purple-500/25 transition-all w-full mt-3"
              >
                Nous contacter
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
