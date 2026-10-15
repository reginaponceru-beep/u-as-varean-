import React from 'react';
import { useApp } from '../context/AppContext';

export const MacroZoomModal: React.FC = () => {
  const { isMacroZoomOpen, setIsMacroZoomOpen, selectedProduct } = useApp();

  if (!isMacroZoomOpen) return null;

  const macroImg =
    selectedProduct.macroImage ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDpzsXOgQ63JF-FPVAW7WuYFIXu1WnLEe1U8vmQMnYuNfZKZvXmI3ExBIUhx4PtMPkG0jLNe7ppJ0mCviaW3hIzB-qHyypJH0Fm2joz6KeIQe0FKd4hWOPznSWHQnDf4PKMMdw34x2rzCIpbizRq3a29ILoMy9dZmbaMI5uSf6vE0i6hKKUX7BsfNEdQ7awnfjjtQbQqsuTokEq9Jv7kKAzSq8EJmiaOA264mcJsyza2-E_iBzXK4gg";

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
      onClick={() => setIsMacroZoomOpen(false)}
    >
      <div
        className="relative max-w-4xl w-full bg-[#fbf8ff] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-white/40"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 px-6 flex items-center justify-between bg-[#f5f2fb] border-b border-[#d3c3ba]/30">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#765843] text-xl">biotech</span>
            <div>
              <span className="font-headline-sm text-sm text-[#1b1b21] font-semibold block">
                Macro Inspección 4K de Pigmentos & Pan de Oro
              </span>
              <span className="font-label-caps text-[10px] text-[#635d58] uppercase">
                {selectedProduct.name} • Pincelado al óleo sobre gel estructurado
              </span>
            </div>
          </div>
          <button
            className="p-1.5 rounded-full bg-white hover:bg-[#eae7ef] text-[#1b1b21] transition-colors"
            onClick={() => setIsMacroZoomOpen(false)}
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center group cursor-grab">
          <img
            alt="Macro 4K View"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-125"
            src={macroImg}
          />
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-full font-label-caps text-[10px] uppercase backdrop-blur-md">
            Pasa el cursor para ampliar a 150%
          </div>
        </div>
      </div>
    </div>
  );
};
