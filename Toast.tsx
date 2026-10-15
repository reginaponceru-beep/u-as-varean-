import React from 'react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useApp();

  if (!toast || !toast.visible) return null;

  return (
    <aside aria-label="Notificaciones" className="fixed bottom-6 right-6 z-50 transition-all duration-300 transform translate-y-0 opacity-100 max-w-md">
      <div className="bg-[#303036] text-[#f2eff8] px-5 py-3.5 rounded-2xl shadow-2xl flex items-center justify-between gap-4 border border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          {toast.type === 'undo' ? (
            <span className="material-symbols-outlined text-[#ffdcc5] text-[22px]">delete_sweep</span>
          ) : toast.type === 'cart' ? (
            <span className="material-symbols-outlined text-[#e6bfa4] text-[22px]">shopping_bag</span>
          ) : (
            <span className="material-symbols-outlined text-[#ffdcc5] text-[22px]">check_circle</span>
          )}

          <div className="flex flex-col">
            <span className="font-label-sm text-xs font-semibold text-white">{toast.message}</span>
            {toast.subtext && (
              <span className="font-body-sm text-[11px] text-[#d3c3ba]">{toast.subtext}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {toast.type === 'undo' && toast.onUndo && (
            <button
              onClick={() => {
                toast.onUndo?.();
                hideToast();
              }}
              className="font-label-caps text-[11px] text-[#ffdcc5] uppercase tracking-wider underline hover:text-white transition-colors cursor-pointer px-2 py-1"
            >
              Deshacer
            </button>
          )}

          <button
            onClick={hideToast}
            className="text-[#aea6a0] hover:text-white transition-colors p-1"
            aria-label="Cerrar notificación"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
