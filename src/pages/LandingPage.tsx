import Header from '../components/layout/Header';
import Hero from '../components/sections/Hero';
import Historia from '../components/sections/Historia';
import Servicos from '../components/sections/Servicos';
import Oportunidades from '../components/sections/Oportunidades';
import VMV from '../components/sections/VMV';
import Contato from '../components/sections/Contato';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/ui/WhatsAppButton';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-brand-deep text-brand-text">
      <Header />
      <main>
        <Hero />
        <Historia />
        <Servicos />
        <Oportunidades />
        <VMV />
        <Contato />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
