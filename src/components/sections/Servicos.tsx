import {
  Home,
  Scale,
  Gavel,
  Building2,
  TrendingUp,
  Briefcase,
} from 'lucide-react';
import { useInView } from '../../hooks/useAnimations';
import ServiceCard from '../ui/ServiceCard';

const SERVICES = [
  {
    icon: Home,
    title: 'Avaliação para Compra e Venda',
    description:
      'Laudo técnico que determina o valor real de mercado do imóvel, protegendo comprador e vendedor de negociações abaixo ou acima do justo.',
  },
  {
    icon: Scale,
    title: 'Avaliação para Inventário e Herança',
    description:
      'Laudos com validade jurídica para partilha de bens em processos de inventário judicial ou extrajudicial, com base na NBR 14.653.',
  },
  {
    icon: Gavel,
    title: 'Avaliação para Processos Judiciais',
    description:
      'Atuação como perito judicial ou assistente técnico em ações de usucapião, desapropriação, despejo, divórcio litigioso e outros litígios imobiliários.',
  },
  {
    icon: Building2,
    title: 'Avaliação para Garantias Bancárias',
    description:
      'Emissão de laudo de avaliação para fins de financiamento imobiliário, consórcio ou crédito com garantia de imóvel (home equity).',
  },
  {
    icon: TrendingUp,
    title: 'Consultoria Imobiliária',
    description:
      'Análise de viabilidade, precificação estratégica e parecer técnico para investidores, incorporadoras e proprietários em tomadas de decisão.',
  },
  {
    icon: Briefcase,
    title: 'Avaliação Empresarial de Ativos',
    description:
      'Levantamento do valor patrimonial de imóveis para balanço contábil, fusões, aquisições e laudos de reavaliação para empresas.',
  },
];

export default function Servicos() {
  const { ref, isVisible } = useInView();

  return (
    <section id="servicos" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-brand-deep" />
      
      {/* Decorative chevron top-right */}
      <svg
        className="absolute -right-16 top-10 opacity-[0.04]"
        width="300"
        height="300"
        viewBox="0 0 400 400"
        fill="none"
      >
        <path d="M50 50L200 200L50 350" stroke="#C8922A" strokeWidth="3" />
        <path d="M120 50L270 200L120 350" stroke="#C8922A" strokeWidth="2" />
      </svg>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className={`text-center mb-16 animate-section ${isVisible ? 'visible' : ''}`}>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-8 h-px bg-brand-gold" />
            <span className="text-xs font-semibold text-brand-gold uppercase tracking-[0.2em] font-body">
              Serviços
            </span>
            <div className="w-8 h-px bg-brand-gold" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text mt-4 mb-4">
            Soluções em{' '}
            <span className="gold-gradient-text">Avaliação Imobiliária</span>
          </h2>

          <p className="text-brand-muted max-w-2xl mx-auto">
            Laudos técnicos com metodologia NBR 14.653 para cada necessidade — 
            de transações imobiliárias a processos judiciais e decisões empresariais.
          </p>
        </div>

        {/* Services grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children ${isVisible ? 'visible' : ''}`}>
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
