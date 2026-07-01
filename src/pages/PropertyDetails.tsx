import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase, type Property } from '../lib/supabase';
import { ArrowLeft, MapPin, Maximize2, Home, CheckCircle2 } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ZoomableImage from '../components/ui/ZoomableImage';

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isFullScreenMode, setIsFullScreenMode] = useState(false);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    async function fetchProperty() {
      if (!id) return;
      const { data } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

      if (data) {
        setProperty(data);
        setSelectedImage(data.cover_photo);
      }
      setLoading(false);
    }
    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-deep flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-brand-deep flex flex-col items-center justify-center text-brand-text">
        <h2 className="text-2xl mb-4">Imóvel não encontrado.</h2>
        <button onClick={() => navigate('/')} className="text-brand-gold hover:underline">Voltar ao início</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-deep text-brand-text">
      <Header />

      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-brand-muted hover:text-brand-gold transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Voltar para Galeria</span>
          </button>

          <div className="bg-brand-card/30 rounded-3xl border border-brand-divider/30 overflow-hidden">
            {/* Hero Image */}
            <div className="w-full h-[400px] sm:h-[500px] relative transition-opacity duration-300 group overflow-hidden">
              <div
                className="absolute inset-0 cursor-pointer z-10 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors duration-300"
                onClick={() => setIsFullScreenMode(true)}
              >
                <Maximize2 size={48} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-2xl" />
              </div>
              <img
                src={selectedImage || property.cover_photo || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/20 to-transparent pointer-events-none z-10" />
              <div className="absolute bottom-8 left-8 right-8 z-20 pointer-events-none">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/20 backdrop-blur-md rounded-full border border-brand-gold/40 text-brand-gold text-sm font-semibold mb-4">
                  Oportunidade
                </div>
                <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-2">{property.title}</h1>
                <div className="flex items-center gap-2 text-brand-muted/90 text-lg">
                  <MapPin size={20} className="text-brand-gold" />
                  {property.region}
                </div>
              </div>
            </div>

            {/* Carousel */}
            {[property.cover_photo, ...(property.photos || [])].filter(Boolean).length > 1 && (
              <div className="flex gap-4 p-4 overflow-x-auto bg-brand-deep/30 border-b border-brand-divider/30 custom-scrollbar">
                {[property.cover_photo, ...property.photos].filter(Boolean).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img || null)}
                    className={`shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden border-2 transition-all duration-300 ${selectedImage === img ? 'border-brand-gold scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img || ''} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Content */}
            <div className="p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-brand-text mb-4">Sobre o Imóvel</h3>
                  <p className="text-brand-muted leading-relaxed whitespace-pre-line">
                    {property.description}
                  </p>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                <div className="bg-brand-deep/50 rounded-2xl p-6 border border-brand-divider/20">
                  <h4 className="font-semibold text-brand-text mb-4">Detalhes</h4>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between border-b border-brand-divider/20 pb-3">
                      <span className="flex items-center gap-2 text-brand-muted"><Maximize2 size={18} className="text-brand-gold" /> Tamanho</span>
                      <span className="font-medium text-brand-text">{property.size_m2} m²</span>
                    </li>
                    <li className="flex items-center justify-between border-b border-brand-divider/20 pb-3">
                      <span className="flex items-center gap-2 text-brand-muted"><Home size={18} className="text-brand-gold" /> Cômodos</span>
                      <span className="font-medium text-brand-text">{property.rooms}</span>
                    </li>
                    <li className="flex items-center justify-between border-b border-brand-divider/20 pb-3">
                      <span className="flex items-center gap-2 text-brand-muted"><CheckCircle2 size={18} className="text-brand-gold" /> Status</span>
                      <span className="font-medium text-brand-text">Disponível</span>
                    </li>
                  </ul>
                </div>

                <a
                  href={`https://wa.me/5566999852326?text=${encodeURIComponent(`Olá! Tenho interesse no imóvel "${property.title}" localizado em ${property.region}.\n\nLink do imóvel: ${window.location.origin}/imovel/${property.id}\n\nPode me passar mais informações?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#25D366] hover:bg-[#22c55e] text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#25D366]/20"
                >
                  Tenho Interesse
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Fullscreen Image Modal */}
      {isFullScreenMode && (
        <ZoomableImage
          src={selectedImage || property.cover_photo || ''}
          alt={property.title}
          onClose={() => setIsFullScreenMode(false)}
        />
      )}
    </div>
  );
}
