import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  phone: z.string().min(10, 'Informe um telefone válido'),
  email: z.string().email('E-mail inválido').or(z.literal('')),
  serviceType: z.string().optional(),
  city: z.string().min(2, 'Informe a cidade do imóvel'),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const SERVICE_OPTIONS = [
  { value: '', label: 'Selecione o tipo de serviço' },
  { value: 'compra-venda', label: 'Avaliação para Compra e Venda' },
  { value: 'inventario', label: 'Avaliação para Inventário e Herança' },
  { value: 'judicial', label: 'Avaliação para Processos Judiciais' },
  { value: 'bancaria', label: 'Avaliação para Garantias Bancárias' },
  { value: 'consultoria', label: 'Consultoria Imobiliária' },
  { value: 'outro', label: 'Outro' },
];

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    try {
      const serviceLabel =
        SERVICE_OPTIONS.find((o) => o.value === data.serviceType)?.label || 'Não especificado';
      
      const message = `*Nova Solicitação pelo Site*\n\n*Nome:* ${data.name}\n*Telefone:* ${data.phone}\n*E-mail:* ${data.email || 'Não informado'}\n*Tipo de serviço:* ${serviceLabel}\n*Cidade do imóvel:* ${data.city}\n\n*Mensagem:*\n${data.message || 'Sem mensagem adicional.'}`;
      
      const encodedMessage = encodeURIComponent(message);

      window.open(
        `https://wa.me/5566999852326?text=${encodedMessage}`,
        '_blank'
      );

      setSubmitStatus('success');
      reset();
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-8 text-center">
        <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
        <h3 className="font-display text-xl font-semibold text-brand-text mb-2">
          Solicitação Enviada!
        </h3>
        <p className="text-sm text-brand-muted">
          Obrigado pelo contato. Retornaremos o mais breve possível.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" id="contact-form" noValidate>
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-brand-muted mb-1.5">
          Nome completo <span className="text-brand-gold">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Seu nome completo"
          className={`form-input ${errors.name ? 'error' : ''}`}
          {...register('name')}
        />
        {errors.name && (
          <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
            <AlertCircle size={12} /> {errors.name.message}
          </p>
        )}
      </div>

      {/* Phone + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-brand-muted mb-1.5">
            Telefone / WhatsApp <span className="text-brand-gold">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="(66) 99999-9999"
            className={`form-input ${errors.phone ? 'error' : ''}`}
            {...register('phone')}
          />
          {errors.phone && (
            <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.phone.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-brand-muted mb-1.5">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="seu@email.com"
            className={`form-input ${errors.email ? 'error' : ''}`}
            {...register('email')}
          />
          {errors.email && (
            <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Service Type + City row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="serviceType" className="block text-sm font-medium text-brand-muted mb-1.5">
            Tipo de serviço
          </label>
          <select
            id="serviceType"
            className="form-input appearance-none cursor-pointer"
            {...register('serviceType')}
          >
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-brand-muted mb-1.5">
            Cidade do imóvel <span className="text-brand-gold">*</span>
          </label>
          <input
            id="city"
            type="text"
            placeholder="Ex: Sorriso - MT"
            className={`form-input ${errors.city ? 'error' : ''}`}
            {...register('city')}
          />
          {errors.city && (
            <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.city.message}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-brand-muted mb-1.5">
          Mensagem
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Descreva brevemente sua necessidade..."
          className="form-input resize-none"
          {...register('message')}
        />
      </div>

      {/* Error status */}
      {submitStatus === 'error' && (
        <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 rounded-lg px-4 py-3">
          <AlertCircle size={16} />
          Ocorreu um erro. Tente novamente ou entre em contato via WhatsApp.
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-gold hover:bg-brand-gold-light text-brand-deep font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-brand-gold/20 disabled:opacity-60 disabled:cursor-not-allowed"
        id="contact-submit"
      >
        <Send size={18} />
        {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
      </button>
    </form>
  );
}
