import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateToProduct, formatPrice } = useApp();
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return PRODUCTS.slice(0, 4);
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.style.toLowerCase().includes(q) ||
        p.shapeName.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-[#fbf8ff] rounded-3xl shadow-2xl border border-white/80 overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#d3c3ba]/30 flex items-center gap-3">
          <span className="material-symbols-outlined text-[#765843] text-2xl">search</span>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar por técnica, gema, oro, perla, tono o forma..."
            className="flex-1 bg-transparent font-body-md text-sm text-[#1b1b21] placeholder:text-[#635d58] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#635d58] hover:text-[#1b1b21] p-1 text-xs"
            >
              Borrar
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-full text-[#635d58] hover:text-[#1b1b21]"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Suggestion Chips */}
        <div className="px-5 py-2.5 bg-[#f5f2fb]/70 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
          <span className="font-label-caps text-[10px] text-[#635d58] uppercase">Sugerencias:</span>
          {['Perlas 3D', 'Oro Rosa', 'Glaseado Nácar', 'Almendra', 'Encaje Francés', 'Stiletto'].map(tag => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-white text-[#4f453e] hover:bg-[#765843] hover:text-white transition-colors whitespace-nowrap shadow-xs"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 max-h-[420px] overflow-y-auto flex flex-col gap-2">
          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-[#635d58]">
              <span className="material-symbols-outlined text-3xl mb-2 text-[#d3c3ba]">search_off</span>
              <p className="font-headline-sm text-base">No se encontraron piezas con esa búsqueda</p>
              <p className="font-body-sm text-xs mt-1">Intenta con 'perlas', 'oro', 'novia' o 'almendra'</p>
            </div>
          ) : (
            filteredProducts.map(product => (
              <div
                key={product.id}
                onClick={() => {
                  navigateToProduct(product.id);
                  setIsSearchOpen(false);
                }}
                className="group flex items-center gap-4 p-3 rounded-2xl bg-white hover:bg-[#f5f2fb] transition-all cursor-pointer border border-[#d3c3ba]/20 hover:border-[#765843]/40"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-14 h-16 rounded-xl object-cover bg-[#efecf5] flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-label-caps text-[9px] uppercase px-2 py-0.5 rounded-full bg-[#f1daff] text-[#71518c] font-semibold">
                      {product.shapeName}
                    </span>
                    <span className="font-body-sm text-[11px] text-[#635d58]">
                      {product.features[0]}
                    </span>
                  </div>
                  <h4 className="font-headline-sm text-sm text-[#1b1b21] group-hover:text-[#765843] transition-colors truncate mt-0.5">
                    {product.name}
                  </h4>
                  <p className="font-body-sm text-xs text-[#4f453e] truncate">
                    {product.description}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="font-headline-sm text-sm font-semibold text-[#765843]">
                    {formatPrice(product.price)}
                  </span>
                  <span className="block font-label-caps text-[9px] text-[#635d58] uppercase">
                    Ver Obra →
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
