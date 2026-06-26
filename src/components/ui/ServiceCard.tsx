import { type LucideIcon, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export default function ServiceCard({ icon: Icon, title, description, delay = 0 }: ServiceCardProps) {
  return (
    <div
      className="service-card group relative rounded-xl border border-brand-gold/20 bg-brand-card/80 p-6 sm:p-7 opacity-0 animate-section"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-5 group-hover:bg-brand-gold/20 transition-colors duration-300">
        <Icon size={24} className="text-brand-gold" />
      </div>

      {/* Title */}
      <h3 className="font-display text-xl font-semibold text-brand-text mb-3">
        {title}
      </h3>

      {/* Divider */}
      <div className="w-10 h-0.5 bg-brand-gold/30 rounded-full mb-4 group-hover:w-16 group-hover:bg-brand-gold transition-all duration-300" />

      {/* Description */}
      <p className="text-sm text-brand-muted leading-relaxed mb-5">
        {description}
      </p>

      {/* Link */}
      <a
        href="#contato"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-gold hover:text-brand-gold-light transition-colors duration-200 group/link"
      >
        Saiba mais
        <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-200" />
      </a>
    </div>
  );
}
