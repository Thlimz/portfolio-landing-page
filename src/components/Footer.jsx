export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Início', href: '#hero' },
    { label: 'Serviços', href: '#features' },
    { label: 'Processo', href: '#protocol' },
    { label: 'Contato', href: '#contact' },
  ];

  const legalLinks = [
    { label: 'Privacidade', href: '#' },
    { label: 'Termos', href: '#' },
  ];

  return (
    <footer
      id="footer"
      className="bg-primary rounded-t-[4rem] mt-0"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h3 className="font-heading font-bold text-2xl text-background tracking-tight-custom mb-3">
              Thiago Lima
            </h3>
            <p className="font-heading text-sm text-background/40 leading-relaxed mb-6 max-w-xs">
              Automações inteligentes, sites de alta conversão e presença digital premium.
            </p>
            <span className="font-mono-data text-xs text-background/20 uppercase tracking-widest">
              Powered by CZTechnology
            </span>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-background/60 uppercase tracking-widest mb-6">
              Navegação
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-heading text-sm text-background/40 hover:text-accent transition-colors interactive-lift inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-background/60 uppercase tracking-widest mb-6">
              Legal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-heading text-sm text-background/40 hover:text-accent transition-colors interactive-lift inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-background/5 mb-8"></div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <span className="font-heading text-xs text-background/20">
            © {currentYear} Thiago Lima. Todos os direitos reservados.
          </span>

          {/* System Status */}
          <div className="flex items-center gap-3">
            <div className="pulse-dot"></div>
            <span className="font-mono-data text-xs text-background/30 uppercase tracking-widest">
              Sistema Operacional
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
