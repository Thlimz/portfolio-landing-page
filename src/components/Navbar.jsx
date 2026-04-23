import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#hero' },
    { label: 'Serviços', href: '#features' },
    { label: 'Processo', href: '#protocol' },
    { label: 'Contato', href: '#contact' },
  ];

  return (
    <nav
      ref={navRef}
      id="main-navbar"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-full border transition-all duration-700 ease-out w-[92%] max-w-4xl ${
        isScrolled
          ? 'navbar-solid'
          : 'navbar-transparent'
      }`}
    >
      {/* Logo */}
      <a
        href="#hero"
        className={`font-heading font-bold text-lg tracking-tight-custom transition-colors duration-500 ${
          isScrolled ? 'text-primary' : 'text-background'
        }`}
      >
        Thiago Lima
      </a>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`font-heading text-sm font-medium interactive-lift transition-colors duration-500 ${
              isScrolled
                ? 'text-slate hover:text-primary'
                : 'text-background/70 hover:text-background'
            }`}
          >
            {link.label}
          </a>
        ))}
        <a href="#contact" className="btn-magnetic btn-primary text-xs">
          <span className="btn-bg"></span>
          Solicitar Orçamento
        </a>
      </div>

      {/* Mobile Hamburger */}
      <button
        id="mobile-menu-toggle"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className={`md:hidden flex flex-col gap-1.5 p-2 transition-colors ${
          isScrolled ? 'text-primary' : 'text-background'
        }`}
        aria-label="Menu de navegação"
      >
        <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${isMobileOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-5 h-0.5 bg-current transition-opacity duration-300 ${isMobileOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${isMobileOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 p-6 rounded-[2rem] navbar-solid border border-primary/5 flex flex-col gap-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className="font-heading text-sm font-medium text-slate hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsMobileOpen(false)}
            className="btn-magnetic btn-primary text-xs text-center"
          >
            <span className="btn-bg"></span>
            Solicitar Orçamento
          </a>
        </div>
      )}
    </nav>
  );
}
