import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: '72px' }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-radial-brand" />

      {/* Chevron decorations - left side */}
      <div className="absolute left-0 top-0 bottom-0 w-1/3 overflow-hidden pointer-events-none">
        {/* Multiple layered chevrons */}
        <svg
          className="absolute -left-20 top-1/4 opacity-[0.08]"
          width="400"
          height="400"
          viewBox="0 0 400 400"
          fill="none"
        >
          <path d="M50 50L200 200L50 350" stroke="#C8922A" strokeWidth="3" />
          <path d="M100 50L250 200L100 350" stroke="#C8922A" strokeWidth="3" />
          <path d="M150 50L300 200L150 350" stroke="#C8922A" strokeWidth="2" />
          <path d="M200 50L350 200L200 350" stroke="#C8922A" strokeWidth="1.5" />
        </svg>
        <svg
          className="absolute -left-10 top-1/3 opacity-[0.05]"
          width="500"
          height="500"
          viewBox="0 0 400 400"
          fill="none"
        >
          <path d="M50 50L200 200L50 350" stroke="#F0C060" strokeWidth="2" />
          <path d="M120 50L270 200L120 350" stroke="#F0C060" strokeWidth="2" />
          <path d="M190 50L340 200L190 350" stroke="#F0C060" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Subtle golden glow - right side */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-gold/[0.03] blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left content */}
          <div className="lg:col-span-7 xl:col-span-7">
            {/* Credential tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-gold/30 bg-brand-gold/5 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] font-body">
                CRECI-14851 &nbsp;|&nbsp; CNAI-041040
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-brand-text leading-[1.1] mb-6">
              Assessoria Imobiliária com vendas e{' '}
              <span className="gold-gradient-text">Respaldo Técnico</span>{' '}
              de Validade Jurídica
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-brand-muted max-w-xl mb-10 leading-relaxed">
              Laudos precisos para compra, venda, inventário, processos judiciais e garantias
              bancárias em <strong>Sorriso-MT e região</strong> — emitidos por perito credenciado pelo CNAI e corretor registrado no
              CRECI-MT.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/5566999852326"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-brand-gold hover:bg-brand-gold-light text-brand-deep font-semibold rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-brand-gold/25 text-sm"
                id="hero-cta-primary"
              >
                Solicitar Avaliação
                <ArrowRight size={18} />
              </a>
              <a
                href="#servicos"
                onClick={(e) => handleScrollTo(e, '#servicos')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-brand-gold/40 text-brand-gold hover:border-brand-gold hover:bg-brand-gold/5 font-semibold rounded-lg transition-all duration-300 text-sm"
                id="hero-cta-secondary"
              >
                Conhecer Serviços
              </a>
            </div>
          </div>

          {/* Right side - Logo MS decorative */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-5 items-center justify-center">
            <div className="relative">
              {/* Outer ring */}
              <div className="w-64 h-64 xl:w-80 xl:h-80 rounded-full border border-brand-gold/20 flex items-center justify-center animate-float">
                {/* Inner ring */}
                <div className="w-48 h-48 xl:w-60 xl:h-60 rounded-full border border-brand-gold/30 flex items-center justify-center">
                  {/* Logo */}
                  <div className="w-32 h-32 xl:w-40 xl:h-40 rounded-full border-2 border-brand-gold/60 flex items-center justify-center bg-brand-card/50">
                    <span className="font-display text-5xl xl:text-6xl font-bold gold-gradient-text">
                      MS
                    </span>
                  </div>
                </div>
              </div>
              {/* Decorative dots */}
              <div className="absolute top-4 right-0 w-3 h-3 rounded-full bg-brand-gold/40" />
              <div className="absolute bottom-8 left-2 w-2 h-2 rounded-full bg-brand-gold/30" />
              <div className="absolute top-1/2 -right-4 w-1.5 h-1.5 rounded-full bg-brand-gold-light/50" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#historia"
        onClick={(e) => handleScrollTo(e, '#historia')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-muted/50 hover:text-brand-muted transition-colors"
        aria-label="Rolar para próxima seção"
      >
        <span className="text-xs uppercase tracking-widest">Saiba mais</span>
        <ChevronDown size={20} className="animate-bounce" />
      </a>
    </section>
  );
}
