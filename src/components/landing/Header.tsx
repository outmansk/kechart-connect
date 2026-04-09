import { useState, useEffect } from 'react';
import { Instagram, Facebook, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/logo-kechart.png';

const navLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Nos Actions', href: '#actions' },
  { label: 'Collaborateurs', href: '#collaborateurs' },
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

  // Close mobile menu on resize to desktop
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
          ? 'h-14 bg-white/90 backdrop-blur-xl border-b border-primary/[0.08] shadow-subtle'
          : 'h-16 bg-transparent'
      }`}
    >
      <div className="container h-full flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo('#accueil')} className="flex items-center gap-2.5 group">
          <img src={logo} alt="Kechart" className="h-9 w-auto transition-transform group-hover:scale-105" />
          <span className={`text-lg font-bold transition-colors ${scrolled ? 'text-foreground' : 'text-white'}`}>
            Kechart
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? 'text-foreground-secondary hover:text-primary'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://www.instagram.com/association_kechart/"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors ${scrolled ? 'text-foreground-secondary hover:text-primary' : 'text-white/60 hover:text-white'}`}
            aria-label="Instagram"
          >
            <Instagram size={17} strokeWidth={1.5} />
          </a>
          <a
            href="https://www.facebook.com/Kechart.Marrakech"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors ${scrolled ? 'text-foreground-secondary hover:text-primary' : 'text-white/60 hover:text-white'}`}
            aria-label="Facebook"
          >
            <Facebook size={17} strokeWidth={1.5} />
          </a>
          <button
            onClick={() => scrollTo('#contact')}
            className={`text-sm font-semibold rounded-lg px-5 py-2 transition-all ${
              scrolled
                ? 'bg-primary text-primary-foreground hover:bg-primary-hover'
                : 'bg-white/15 text-white border border-white/20 hover:bg-white/25 backdrop-blur-sm'
            }`}
          >
            Nous contacter
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden transition-colors ${scrolled ? 'text-foreground' : 'text-white'}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-b border-primary/[0.08]"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="text-sm font-medium text-foreground-secondary hover:text-primary text-left transition-colors"
                >
                  {l.label}
                </button>
              ))}
              <div className="flex items-center gap-4 pt-2">
                <a href="https://www.instagram.com/association_kechart/" target="_blank" rel="noopener noreferrer" className="text-foreground-secondary hover:text-primary" aria-label="Instagram">
                  <Instagram size={18} strokeWidth={1.5} />
                </a>
                <a href="https://www.facebook.com/Kechart.Marrakech" target="_blank" rel="noopener noreferrer" className="text-foreground-secondary hover:text-primary" aria-label="Facebook">
                  <Facebook size={18} strokeWidth={1.5} />
                </a>
              </div>
              <button
                onClick={() => scrollTo('#contact')}
                className="bg-primary text-primary-foreground text-sm font-semibold rounded-lg px-5 py-2.5 hover:bg-primary-hover transition-colors w-fit"
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
