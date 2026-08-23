import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'info' | 'success' | 'warning';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-start gap-3 p-4 bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-700/60 animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {t.type === 'success' && (
            <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
          )}
          {t.type === 'warning' && (
            <AlertTriangle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
          )}
          {(!t.type || t.type === 'info') && (
            <Info size={18} className="text-indigo-400 flex-shrink-0 mt-0.5" />
          )}

          <div className="flex-1">
            <h4 className="text-sm font-semibold text-white tracking-tight">{t.title}</h4>
            {t.description && (
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{t.description}</p>
            )}
          </div>

          <button
            type="button"
            onClick={() => onDismiss(t.id)}
            className="text-slate-400 hover:text-white cursor-pointer ml-1"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
