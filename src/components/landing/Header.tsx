import { useState, useEffect } from 'react';
import { Instagram, Facebook, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/logo-kechart.png';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Nos Actions', href: '#actions' },
    { label: 'Collaborateurs', href: '#collaborateurs' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-primary/10 shadow-subtle' : 'bg-transparent'
    }`}>
      <div className="container h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Kechart" className="h-10 w-auto" />
          <span className="text-xl font-bold text-foreground">Kechart</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-sm font-medium text-foreground-secondary hover:text-primary transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a href="https://www.instagram.com/association_kechart/" target="_blank" rel="noopener noreferrer" className="text-foreground-secondary hover:text-primary transition-colors">
            <Instagram size={18} strokeWidth={1.5} />
          </a>
          <a href="https://www.facebook.com/Kechart.Marrakech" target="_blank" rel="noopener noreferrer" className="text-foreground-secondary hover:text-primary transition-colors">
            <Facebook size={18} strokeWidth={1.5} />
          </a>
          <button
            onClick={() => scrollTo('#contact')}
            className="bg-primary text-primary-foreground text-sm font-medium rounded-lg px-5 py-2 hover:bg-primary-hover transition-colors"
          >
            Nous contacter
          </button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-white/90 backdrop-blur-xl border-b border-primary/10 p-6 flex flex-col gap-4"
          >
            {navLinks.map((l) => (
              <button key={l.href} onClick={() => scrollTo(l.href)} className="text-sm font-medium text-foreground-secondary hover:text-primary text-left">
                {l.label}
              </button>
            ))}
            <div className="flex items-center gap-4 pt-2">
              <a href="https://www.instagram.com/association_kechart/" target="_blank" rel="noopener noreferrer"><Instagram size={18} strokeWidth={1.5} /></a>
              <a href="https://www.facebook.com/Kechart.Marrakech" target="_blank" rel="noopener noreferrer"><Facebook size={18} strokeWidth={1.5} /></a>
            </div>
            <button onClick={() => scrollTo('#contact')} className="bg-primary text-primary-foreground text-sm font-medium rounded-lg px-5 py-2 hover:bg-primary-hover transition-colors w-fit">
              Nous contacter
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
