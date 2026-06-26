import { type LucideIcon } from 'lucide-react';
import { useCounter } from '../../hooks/useAnimations';

interface StatBlockProps {
  icon: LucideIcon;
  value: number;
  suffix?: string;
  label: string;
}

export default function StatBlock({ icon: Icon, value, suffix = '+', label }: StatBlockProps) {
  const { count, ref } = useCounter(value, 1500);

  return (
    <div ref={ref} className="flex flex-col items-center text-center p-4">
      <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center mb-3">
        <Icon size={22} className="text-brand-gold" />
      </div>
      <span className="font-display text-3xl sm:text-4xl font-bold text-brand-text">
        {count}
        <span className="text-brand-gold">{suffix}</span>
      </span>
      <span className="text-sm text-brand-muted mt-1">{label}</span>
    </div>
  );
}
