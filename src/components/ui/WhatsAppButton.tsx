import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5566999852326?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20uma%20avalia%C3%A7%C3%A3o%20imobili%C3%A1ria."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:bg-[#22c55e] hover:scale-110 transition-all duration-300 animate-pulse-slow"
      aria-label="Conversar no WhatsApp"
      id="whatsapp-fab"
    >
      <MessageCircle size={26} />
    </a>
  );
}
