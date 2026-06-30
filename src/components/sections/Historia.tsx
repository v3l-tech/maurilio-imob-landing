import { Landmark, FileText, MapPin } from 'lucide-react';
import { useInView } from '../../hooks/useAnimations';
import StatBlock from '../ui/StatBlock';
import maurilioImage from '../../assets/image.png';

const STATS = [
  { icon: Landmark, value: 10, suffix: '+', label: 'Anos de experiência' },
  { icon: FileText, value: 500, suffix: '+', label: 'Laudos emitidos' },
  { icon: MapPin, value: 15, suffix: '+', label: 'Cidades atendidas' },
];

export default function Historia() {
  const { ref, isVisible } = useInView();

  return (
    <section id="historia" className="relative py-24 lg:py-32">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-deep via-brand-card/30 to-brand-deep pointer-events-none" />

      <div
        ref={ref}
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isVisible ? '' : 'opacity-0'
          }`}
      >
        {/* Section label */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-px bg-brand-gold" />
          <span className="text-xs font-semibold text-brand-gold uppercase tracking-[0.2em] font-body">
            Sobre Mim
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Photo column */}
          <div
            className={`lg:col-span-5 animate-section ${isVisible ? 'visible' : ''}`}
          >
            <div className="relative">
              {/* Photo frame with golden border */}
              <div className="relative rounded-2xl overflow-hidden border border-brand-gold/20 shadow-2xl shadow-brand-deep/50">
                <img
                  src={maurilioImage}
                  alt="Maurílio Martins - Perito Avaliador"
                  className="w-full h-full object-cover aspect-[3/4]"
                />
                {/* Gold accent corner */}
                <div className="absolute top-0 right-0 w-16 h-16">
                  <div className="absolute top-0 right-0 w-full h-full border-t-2 border-r-2 border-brand-gold/40 rounded-tr-2xl" />
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16">
                  <div className="absolute bottom-0 left-0 w-full h-full border-b-2 border-l-2 border-brand-gold/40 rounded-bl-2xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div
            className={`lg:col-span-7 animate-section ${isVisible ? 'visible' : ''}`}
            style={{ animationDelay: '200ms' }}
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text mb-6">
              Rigor técnico e{' '}
              <span className="gold-gradient-text">experiência de campo</span>
            </h2>

            {/* Gold divider */}
            <div className="w-16 h-1 bg-gradient-to-r from-brand-gold to-brand-gold-light rounded-full mb-8" />

            <div className="space-y-5 text-brand-muted leading-relaxed">
              <p>
                Com mais de 10 anos de atuação no mercado imobiliário de <strong>Sorriso-MT e região</strong>,
                Maurílio Martins construiu sua carreira sobre dois pilares: o rigor técnico
                exigido pela perícia e a confiança que só a experiência de campo proporciona.
              </p>
              <p>
                Credenciado pelo CRECI-14851 e pelo CNAI-041040, atua como corretor e perito
                avaliador de imóveis, com especialidade em operações de compra e venda.
              </p>
              <p>
                Oferece assessoria completa na <strong>intermediação imobiliária</strong>,
                atuando de forma estratégica para compradores e vendedores. Seu trabalho abrange a compra e venda
                de casas, apartamentos, terrenos e áreas comerciais, garantindo negociações seguras, transparentes
                e vantajosas para ambas as partes.
              </p>
              <p>
                Cada avaliação é conduzida com metodologia NBR 14.653, levantamento in loco e
                análise comparativa de mercado — garantindo laudos que resistem ao escrutínio
                de peritos revisores, juízes e instituições financeiras.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-10 pt-8 border-t border-brand-divider/50">
              <div className="grid grid-cols-3 gap-4">
                {STATS.map((stat) => (
                  <StatBlock
                    key={stat.label}
                    icon={stat.icon}
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
