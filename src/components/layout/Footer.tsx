import { Mail, MapPin, Phone } from 'lucide-react';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import logo from '../../assets/logo.png';

const QUICK_LINKS = [
  { label: 'Início', href: '#hero' },
  { label: 'Sobre', href: '#historia' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Oportunidades', href: '#oportunidades' },
  { label: 'Valores', href: '#vmv' },
  { label: 'Contato', href: '#contato' },
];

/* Inline SVG icons for social media since lucide-react doesn't include brand icons */
function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/5566999852326',
    icon: WhatsAppIcon,
    isSvg: true,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/MS.mauriliomartins',
    icon: InstagramIcon,
    isSvg: true,
  },
];

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-brand-card border-t border-brand-divider/50" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg border border-brand-gold/60 flex items-center justify-center bg-brand-deep/60 p-1">
                <img src={logo} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-brand-text">Maurílio Martins</p>
                <p className="text-xs text-brand-muted">Perito Avaliador de Imóveis</p>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 mt-4">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-brand-gold uppercase tracking-widest">
                CRECI-14851 &bull; CNAI-041040
              </span>
            </div>
            <p className="text-sm text-brand-muted/70 mt-4 leading-relaxed">
              Laudos emitidos conforme NBR 14.653 — ABNT
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-base font-semibold text-brand-text mb-4">
              Navegação
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-brand-muted hover:text-brand-gold-light transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 mt-2 border-t border-brand-divider/30">
                <a
                  href="/admin"
                  className="text-sm text-brand-gold/70 hover:text-brand-gold transition-colors duration-200"
                >
                  Área Restrita (Admin)
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-base font-semibold text-brand-text mb-4">
              Contato
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/5566999852326"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-brand-muted hover:text-brand-gold-light transition-colors"
                >
                  <Phone size={15} className="text-brand-gold shrink-0" />
                  (66) 99985-2326
                </a>
              </li>
              <li>
                <a
                  href="mailto:Maurilio.corretor@hotmail.com"
                  className="flex items-center gap-2.5 text-sm text-brand-muted hover:text-brand-gold-light transition-colors"
                >
                  <Mail size={15} className="text-brand-gold shrink-0" />
                  Maurilio.corretor@hotmail.com
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2.5 text-sm text-brand-muted">
                  <MapPin size={15} className="text-brand-gold shrink-0 mt-0.5" />
                  Rua dos desbravadores, nº 3021, escritório 301, Torre Canindé, Edifício Residencial Araras, Centro-Norte, CEP 78890-154, Sorriso - MT
                </span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-display text-base font-semibold text-brand-text mb-4">
              Redes Sociais
            </h3>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg border border-brand-divider flex items-center justify-center text-brand-muted hover:text-brand-gold hover:border-brand-gold/50 transition-all duration-200"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-brand-divider/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-brand-muted/60 text-center md:text-left">
              © 2026 Maurílio Martins · Perito Avaliador de Imóveis · Todos os direitos reservados.
            </p>
            <p className="text-xs text-brand-muted/40">
              Laudos emitidos conforme NBR 14.653 — ABNT
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
