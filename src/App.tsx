import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Historia from './components/sections/Historia';
import Servicos from './components/sections/Servicos';
import VMV from './components/sections/VMV';
import Contato from './components/sections/Contato';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/ui/WhatsAppButton';

function App() {
  return (
    <div className="min-h-screen bg-brand-deep text-brand-text">
      <Header />
      <main>
        <Hero />
        <Historia />
        <Servicos />
        <VMV />
        <Contato />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
