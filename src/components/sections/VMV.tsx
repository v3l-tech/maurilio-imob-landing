import { Telescope, Target, Star, Check } from 'lucide-react';
import { useInView } from '../../hooks/useAnimations';

const VALUES = [
  'Rigor técnico e fundamentação nas normativas (ABNT)',
  'Imparcialidade absoluta e ética inegociável',
  'Comprometimento com prazos e excelência nas entregas',
  'Transparência e clareza na comunicação',
  'Sigilo e respeito às informações dos clientes',
];

export default function VMV() {
  const { ref, isVisible } = useInView();

  return (
    <section id="vmv" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Alternated background */}
      <div className="absolute inset-0 bg-brand-card" />

      {/* Decorative chevron */}
      <svg
        className="absolute right-0 top-0 opacity-[0.05]"
        width="250"
        height="350"
        viewBox="0 0 250 350"
        fill="none"
      >
        <path d="M30 30L150 175L30 320" stroke="#C8922A" strokeWidth="3" />
        <path d="M80 30L200 175L80 320" stroke="#C8922A" strokeWidth="2" />
        <path d="M130 30L250 175L130 320" stroke="#C8922A" strokeWidth="1.5" />
      </svg>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className={`text-center mb-16 animate-section ${isVisible ? 'visible' : ''}`}>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-8 h-px bg-brand-gold" />
            <span className="text-xs font-semibold text-brand-gold uppercase tracking-[0.2em] font-body">
              Nossos Pilares
            </span>
            <div className="w-8 h-px bg-brand-gold" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text mt-4">
            Visão, Missão e{' '}
            <span className="gold-gradient-text">Valores</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 stagger-children ${isVisible ? 'visible' : ''}`}>
          {/* VISÃO */}
          <div className="animate-section rounded-xl border border-brand-gold/15 bg-brand-deep/60 p-7 sm:p-8">
            <div className="w-12 h-12 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-5">
              <Telescope size={24} className="text-brand-gold" />
            </div>

            <h3 className="font-display text-xl font-semibold text-brand-text mb-2">
              Visão
            </h3>

            <div className="w-10 h-0.5 bg-brand-gold/40 rounded-full mb-5" />

            <p className="text-sm text-brand-muted leading-relaxed italic">
              "Ser a principal referência em perícia e avaliação de imóveis no Mato Grosso, destacando-se pela precisão técnica irrepreensível, confiabilidade dos laudos e pelo impacto fundamental na segurança das decisões patrimoniais de nossos clientes."
            </p>
          </div>

          {/* MISSÃO */}
          <div className="animate-section rounded-xl border border-brand-gold/15 bg-brand-deep/60 p-7 sm:p-8">
            <div className="w-12 h-12 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-5">
              <Target size={24} className="text-brand-gold" />
            </div>

            <h3 className="font-display text-xl font-semibold text-brand-text mb-2">
              Missão
            </h3>

            <div className="w-10 h-0.5 bg-brand-gold/40 rounded-full mb-5" />

            <p className="text-sm text-brand-muted leading-relaxed italic">
              "Garantir segurança jurídica e patrimonial aos nossos clientes através da emissão de laudos de avaliação elaborados com máximo rigor técnico e respaldo legal. Buscamos sempre oferecer um atendimento consultivo, imparcial e altamente personalizado."
            </p>
          </div>

          {/* VALORES */}
          <div className="animate-section rounded-xl border border-brand-gold/15 bg-brand-deep/60 p-7 sm:p-8">
            <div className="w-12 h-12 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-5">
              <Star size={24} className="text-brand-gold" />
            </div>

            <h3 className="font-display text-xl font-semibold text-brand-text mb-2">
              Valores
            </h3>

            <div className="w-10 h-0.5 bg-brand-gold/40 rounded-full mb-5" />

            <ul className="space-y-3">
              {VALUES.map((value) => (
                <li key={value} className="flex items-start gap-2.5 text-sm text-brand-muted">
                  <Check size={16} className="text-brand-gold shrink-0 mt-0.5" />
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
