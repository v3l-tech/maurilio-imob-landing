import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, type Property } from '../../lib/supabase';
import { useInView } from '../../hooks/useAnimations';
import { MapPin, Maximize2, Home } from 'lucide-react';

export default function Oportunidades() {
  const { ref, isVisible } = useInView();
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching properties:', error);
      } else if (data) {
        setProperties(data);
      }
      setLoading(false);
    }
    fetchProperties();
  }, []);

  if (!loading && properties.length === 0) {
    return null;
  }

  return (
    <section id="oportunidades" className="py-24 lg:py-32 bg-brand-deep border-t border-brand-divider/20 relative overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 animate-section ${isVisible ? 'visible' : ''}`}>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-8 h-px bg-brand-gold" />
            <span className="text-xs font-semibold text-brand-gold uppercase tracking-[0.2em] font-body">
              Negócios
            </span>
            <div className="w-8 h-px bg-brand-gold" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text mt-4 mb-4">
            Oportunidades de <span className="gold-gradient-text">Investimento</span>
          </h2>
          <p className="text-brand-muted max-w-2xl mx-auto">
            Confira imóveis rigorosamente selecionados e avaliados com segurança técnica para a sua melhor negociação.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children ${isVisible ? 'visible' : ''}`}>
            {properties.map((prop) => (
              <div key={prop.id} className="service-card group cursor-pointer animate-section bg-brand-card/30 rounded-2xl border border-brand-divider/30 overflow-hidden" onClick={() => navigate(`/imovel/${prop.id}`)}>
                <div className="h-64 overflow-hidden relative">
                  <img src={prop.cover_photo || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"} alt={prop.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 right-4 bg-brand-card/80 backdrop-blur-md px-3 py-1 rounded-full border border-brand-gold/30">
                    <span className="text-xs font-semibold text-brand-gold">Venda</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-brand-text mb-2 group-hover:text-brand-gold-light transition-colors">{prop.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-brand-muted mb-4">
                    <MapPin size={16} className="text-brand-gold" />
                    {prop.region}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-brand-divider/30">
                    <div className="flex gap-4">
                      <span className="flex items-center gap-1.5 text-sm text-brand-muted"><Maximize2 size={16} className="text-brand-gold/70" /> {prop.size_m2}m²</span>
                      <span className="flex items-center gap-1.5 text-sm text-brand-muted"><Home size={16} className="text-brand-gold/70" /> {prop.rooms} Com.</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
