import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'alert' | 'confirm';
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default function Modal({ isOpen, title, message, type, onConfirm, onCancel }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-brand-card/80 backdrop-blur-xl border border-brand-divider/50 p-6 rounded-2xl shadow-2xl max-w-sm w-full animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-display font-semibold text-white">{title}</h3>
          {type === 'alert' && (
            <button onClick={onCancel || onConfirm} className="text-brand-muted hover:text-white transition-colors">
              <X size={20} />
            </button>
          )}
        </div>

        <p className="text-brand-muted mb-8">{message}</p>

        <div className="flex justify-end gap-3">
          {type === 'confirm' && (
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-brand-muted hover:text-white transition-colors"
            >
              Cancelar
            </button>
          )}
          <button
            onClick={onConfirm}
            className="px-5 py-2 text-sm font-bold bg-brand-gold hover:bg-brand-gold-light text-brand-deep rounded-lg transition-colors"
          >
            {type === 'confirm' ? 'Confirmar' : 'OK'}
          </button>
        </div>
      </div>
    </div>
  );
}
