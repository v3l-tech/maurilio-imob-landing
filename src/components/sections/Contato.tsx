import { Mail, MapPin } from 'lucide-react';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { useInView } from '../../hooks/useAnimations';
import ContactForm from '../ui/ContactForm';

/* Inline SVG icons for social media brands */
function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}


const CONTACT_CHANNELS = [
  {
    icon: MapPin,
    label: 'Endereço',
    value: 'Rua dos desbravadores, Nº 3021, escritório 301, Torre Canindé, Edifício Residencial Araras, CEP 78890-154, Sorriso - MT',
    href: 'https://maps.google.com/?q=Rua+dos+desbravadores+3021+Centro-Norte+Sorriso+MT',
  },
  {
    icon: WhatsAppIcon,
    label: 'WhatsApp',
    value: '(66) 99985-2326',
    href: 'https://wa.me/5566999852326',
  },
  {
    icon: Mail,
    label: 'E-mail',
    value: 'Maurilio.corretor@hotmail.com',
    href: 'mailto:Maurilio.corretor@hotmail.com',
  },
  {
    icon: InstagramIcon,
    label: 'Instagram',
    value: '@MS.mauriliomartins',
    href: 'https://www.instagram.com/MS.mauriliomartins',
  },
];

export default function Contato() {
  const { ref, isVisible } = useInView();

  return (
    <section id="contato" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-brand-deep" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-card/30 via-transparent to-brand-navy/20 pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className={`text-center mb-16 animate-section ${isVisible ? 'visible' : ''}`}>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-8 h-px bg-brand-gold" />
            <span className="text-xs font-semibold text-brand-gold uppercase tracking-[0.2em] font-body">
              Contato
            </span>
            <div className="w-8 h-px bg-brand-gold" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text mt-4 mb-4">
            Vamos conversar sobre seu{' '}
            <span className="gold-gradient-text">projeto</span>
          </h2>

          <p className="text-brand-muted max-w-2xl mx-auto">
            Entre em contato para solicitar uma avaliação ou tirar suas dúvidas.
            Respondemos em até 24 horas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left column: contact info */}
          <div className={`lg:col-span-2 animate-section ${isVisible ? 'visible' : ''}`}>
            <div className="space-y-6">
              {CONTACT_CHANNELS.map((channel) => {
                const Icon = channel.icon;
                return (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target={channel.href.startsWith('http') ? '_blank' : undefined}
                    rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 group p-3 -mx-3 rounded-lg hover:bg-brand-card/50 transition-colors"
                  >
                    <div className="w-11 h-11 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                      <Icon size={20} className="text-brand-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-brand-muted/60 uppercase tracking-wider font-medium mb-0.5">
                        {channel.label}
                      </p>
                      <p className="text-sm text-brand-text group-hover:text-brand-gold-light transition-colors">
                        {channel.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-10">
              <a
                href="https://wa.me/5566999852326?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20uma%20avalia%C3%A7%C3%A3o%20imobili%C3%A1ria."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-[#25D366] hover:bg-[#22c55e] text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#25D366]/20"
                id="contato-whatsapp-cta"
              >
                <WhatsAppIcon size={22} />
                Conversar no WhatsApp
              </a>
            </div>

            {/* Mapa de Localização */}
            <div className="mt-10 rounded-xl overflow-hidden border border-brand-gold/20 shadow-lg shadow-brand-deep/50 h-[250px]">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=Rua%20dos%20desbravadores,%203021,%20Centro-Norte,%20Sorriso%20-%20MT&t=&z=15&ie=UTF8&iwloc=&output=embed"
                title="Localização do Escritório"
              ></iframe>
            </div>
          </div>

          {/* Right column: form */}
          <div
            className={`lg:col-span-3 animate-section ${isVisible ? 'visible' : ''}`}
            style={{ animationDelay: '200ms' }}
          >
            <div className="rounded-xl border border-brand-divider/30 bg-brand-card/40 p-6 sm:p-8">
              <h3 className="font-display text-xl font-semibold text-brand-text mb-6">
                Envie sua solicitação
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
