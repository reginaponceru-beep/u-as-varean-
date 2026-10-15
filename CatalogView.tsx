import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { NailShape } from '../types';

export const CatalogView: React.FC = () => {
  const {
    navigateToProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    activeStyleFilter,
    setActiveStyleFilter,
    setCurrentView,
    setIsBespokeStudioOpen
  } = useApp();

  // Filters
  const [selectedStyles, setSelectedStyles] = useState<string[]>(
    activeStyleFilter ? [activeStyleFilter] : ['elegante', 'artistico']
  );
  const [selectedShape, setSelectedShape] = useState<NailShape | 'all'>('all');
  const [selectedLength, setSelectedLength] = useState<string>('all');
  const [selectedFinish, setSelectedFinish] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(30);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'editorial'>('grid');
  const [sortBy, setSortBy] = useState<string>('destacados');
  const [activeTrend, setActiveTrend] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Selected size per product card for quick addition
  const [cardSizes, setCardSizes] = useState<Record<string, 'XS' | 'S' | 'M' | 'L'>>({});

  const handleSelectCardSize = (productId: string, size: 'XS' | 'S' | 'M' | 'L', e: React.MouseEvent) => {
    e.stopPropagation();
    setCardSizes(prev => ({ ...prev, [productId]: size }));
  };

  const trends = [
    { label: 'Coquette Floral', style: 'tierno' },
    { label: 'Glazed Donut Nácar', style: 'elegante' },
    { label: 'Micro-Joyas 3D', style: 'artistico' },
    { label: 'Aura Velvet Lavanda', style: 'artistico' },
    { label: 'Encaje Francés', style: 'elegante' }
  ];

  const handleTrendClick = (trendName: string, style: string) => {
    if (activeTrend === trendName) {
      setActiveTrend(null);
      setSelectedStyles(['elegante', 'artistico']);
    } else {
      setActiveTrend(trendName);
      setSelectedStyles([style]);
    }
  };

  const handleStyleCheckbox = (style: string) => {
    setSelectedStyles(prev =>
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    );
  };

  const clearAllFilters = () => {
    setSelectedStyles([]);
    setSelectedShape('all');
    setSelectedLength('all');
    setSelectedFinish('all');
    setMaxPrice(30);
    setSearchFilter('');
    setActiveTrend(null);
    setActiveStyleFilter(null);
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Search
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        const matchesSearch =
          product.name.toLowerCase().includes(q) ||
          product.subtitle.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      // Styles
      if (selectedStyles.length > 0 && !selectedStyles.includes(product.style)) {
        return false;
      }

      // Shape
      if (selectedShape !== 'all' && product.shape !== selectedShape) {
        return false;
      }

      // Length
      if (selectedLength !== 'all' && product.length !== selectedLength) {
        return false;
      }

      // Price
      if (product.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'precio-asc') return a.price - b.price;
      if (sortBy === 'precio-desc') return b.price - a.price;
      if (sortBy === 'novedades') return b.reviewCount - a.reviewCount;
      return 0; // destacados
    });
  }, [searchFilter, selectedStyles, selectedShape, selectedLength, maxPrice, sortBy]);

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Glow Effects */}
      <div className="relative w-full px-4 sm:px-6 lg:px-12 py-8 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-[#f1daff]/40 blur-[130px] pointer-events-none -z-10"></div>
        <div className="absolute top-48 right-12 w-80 h-80 rounded-full bg-[#ffdcc5]/30 blur-[120px] pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 font-label-sm text-xs text-[#635d58]">
            <button
              onClick={() => setCurrentView('home')}
              className="hover:text-[#765843] transition-colors cursor-pointer"
            >
              Inicio
            </button>
            <span className="text-[#cdc5be]">/</span>
            <span className="hover:text-[#765843] transition-colors cursor-pointer">Colecciones</span>
            <span className="text-[#cdc5be]">/</span>
            <span className="text-[#1b1b21] font-semibold">Diseños de Autor</span>
          </nav>

          {/* Heading & Search bar Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-4">
            <div className="flex flex-col gap-2 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="font-label-caps text-[11px] uppercase tracking-widest text-[#765843] bg-[#ffdcc5]/40 px-3 py-1 rounded-full font-semibold">
                  Edición 2025
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#c5a087]"></span>
                <span className="font-label-sm text-xs text-[#635d58]">Pintado a mano alzada</span>
              </div>

              <div className="flex items-baseline gap-4 flex-wrap">
                <h1 className="font-headline-lg text-headline-lg text-[#1b1b21]">
                  Colección Alta Costura
                </h1>
                <span className="font-label-md text-sm text-[#765843] bg-[#eae7ef] px-3.5 py-1 rounded-full font-semibold">
                  ({filteredProducts.length} Obras)
                </span>
              </div>

              <p className="font-body-md text-sm text-[#4f453e] leading-relaxed">
                Joyas prensadas en gel estructurado con incrustaciones de perlas naturales, micro-óleo botánico y láminas de oro puro de 18K.
              </p>
            </div>

            {/* Search and view toggle */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1 sm:w-72">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#635d58] text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  value={searchFilter}
                  onChange={e => setSearchFilter(e.target.value)}
                  placeholder="Buscar por gema, tono o técnica..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/90 text-[#1b1b21] placeholder:text-[#635d58] font-body-sm text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-[#765843] border border-[#d3c3ba]/40"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-full transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-[#765843] text-white shadow-sm'
                      : 'bg-[#efecf5] text-[#4f453e] hover:text-[#1b1b21]'
                  }`}
                  title="Vista cuadrícula"
                >
                  <span className="material-symbols-outlined text-[18px]">grid_view</span>
                </button>

                <button
                  onClick={() => setViewMode('editorial')}
                  className={`p-2.5 rounded-full transition-all cursor-pointer ${
                    viewMode === 'editorial'
                      ? 'bg-[#765843] text-white shadow-sm'
                      : 'bg-[#efecf5] text-[#4f453e] hover:text-[#1b1b21]'
                  }`}
                  title="Vista extendida"
                >
                  <span className="material-symbols-outlined text-[18px]">view_agenda</span>
                </button>

                {/* Sort selector */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="appearance-none pl-4 pr-9 py-2.5 rounded-full bg-white/90 text-[#1b1b21] font-label-sm text-xs shadow-sm cursor-pointer focus:outline-none border border-[#d3c3ba]/40"
                  >
                    <option value="destacados">Destacados Atelier</option>
                    <option value="novedades">Novedades Recientes</option>
                    <option value="precio-desc">Precio: Mayor a Menor</option>
                    <option value="precio-asc">Precio: Menor a Mayor</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#635d58] pointer-events-none text-[16px]">
                    unfold_more
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Trend Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="font-label-caps text-[11px] text-[#635d58] uppercase pr-2 whitespace-nowrap">
              Tendencias:
            </span>
            {trends.map(t => (
              <button
                key={t.label}
                onClick={() => handleTrendClick(t.label, t.style)}
                className={`px-3.5 py-1.5 rounded-full font-label-sm text-xs shadow-xs transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTrend === t.label
                    ? 'bg-[#765843] text-white'
                    : 'bg-white text-[#1b1b21] hover:bg-[#765843] hover:text-white border border-[#d3c3ba]/30'
                }`}
              >
                <span>✧</span> {t.label}
              </button>
            ))}
          </div>

          {/* Main 12-col Grid: Sidebar + Product Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-4 xl:col-span-3.5 flex flex-col gap-6 sticky top-28 bg-white/70 backdrop-blur-xl p-6 rounded-3xl shadow-sm border border-white/80">
              <div className="flex items-center justify-between pb-3 border-b border-[#d3c3ba]/30">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#765843] text-[20px]">tune</span>
                  <span className="font-headline-sm text-[18px] text-[#1b1b21]">Filtros de Atelier</span>
                </div>
                <button
                  onClick={clearAllFilters}
                  className="font-label-caps text-[10px] uppercase text-[#635d58] hover:text-[#ba1a1a] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[13px]">refresh</span>
                  Limpiar
                </button>
              </div>

              {/* Estilos de Arte */}
              <div className="flex flex-col gap-3">
                <span className="font-label-caps text-[11px] uppercase tracking-wider text-[#4f453e]">
                  Estilos de Arte
                </span>
                <div className="flex flex-col gap-1.5 font-body-sm text-xs text-[#1b1b21]">
                  {[
                    { id: 'elegante', label: 'Elegante (Perlado & Filigrana)', count: 14 },
                    { id: 'artistico', label: 'Artístico (Escultura 3D)', count: 9 },
                    { id: 'tierno', label: 'Tierno (Pastel & Encanto)', count: 6 },
                    { id: 'minimalista', label: 'Minimalista (Línea Fina)', count: 5 },
                    { id: 'llamativo', label: 'Llamativo (Maxi Cristales)', count: 4 }
                  ].map(st => (
                    <label
                      key={st.id}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-[#eae7ef] transition-colors cursor-pointer group"
                    >
                      <span className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={selectedStyles.includes(st.id)}
                          onChange={() => handleStyleCheckbox(st.id)}
                          className="accent-[#765843] rounded w-4 h-4 cursor-pointer"
                        />
                        <span className="group-hover:text-[#765843]">{st.label}</span>
                      </span>
                      <span className="font-label-sm text-xs text-[#635d58]">{st.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Forma de la Uña with SVG silhouettes */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-label-caps text-[11px] uppercase tracking-wider text-[#4f453e]">
                    Forma de la Uña
                  </span>
                  <button
                    onClick={() => setCurrentView('measuring-guide')}
                    className="font-label-sm text-[11px] text-[#765843] hover:underline"
                  >
                    Guía Visual
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedShape(selectedShape === 'almond' ? 'all' : 'almond')}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all text-center cursor-pointer ${
                      selectedShape === 'almond'
                        ? 'bg-[#ffdcc5] text-[#765843] ring-2 ring-[#765843] font-semibold'
                        : 'bg-[#f5f2fb] text-[#1b1b21] hover:bg-[#ffdcc5]/60'
                    }`}
                  >
                    <svg className="w-7 h-10 mb-1.5 text-[#765843]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 40 60">
                      <path d="M20 6 C28 14 32 30 32 50 C32 54 28 56 20 56 C12 56 8 54 8 50 C8 30 12 14 20 6 Z" fill="currentColor" fillOpacity="0.12"></path>
                    </svg>
                    <span className="font-label-sm text-xs font-semibold">Almendra</span>
                    <span className="font-body-sm text-[10px] text-[#635d58]">Almond</span>
                  </button>

                  <button
                    onClick={() => setSelectedShape(selectedShape === 'coffin' ? 'all' : 'coffin')}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all text-center cursor-pointer ${
                      selectedShape === 'coffin'
                        ? 'bg-[#ffdcc5] text-[#765843] ring-2 ring-[#765843] font-semibold'
                        : 'bg-white text-[#1b1b21] hover:bg-[#ffdcc5]/60 shadow-xs'
                    }`}
                  >
                    <svg className="w-7 h-10 mb-1.5 text-[#765843]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 40 60">
                      <path d="M14 6 L26 6 L32 46 C32 52 28 56 20 56 C12 56 8 52 8 46 L14 6 Z" fill="currentColor" fillOpacity="0.12"></path>
                    </svg>
                    <span className="font-label-sm text-xs font-semibold">Bailarina</span>
                    <span className="font-body-sm text-[10px] text-[#635d58]">Coffin</span>
                  </button>

                  <button
                    onClick={() => setSelectedShape(selectedShape === 'stiletto' ? 'all' : 'stiletto')}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all text-center cursor-pointer ${
                      selectedShape === 'stiletto'
                        ? 'bg-[#ffdcc5] text-[#765843] ring-2 ring-[#765843] font-semibold'
                        : 'bg-white text-[#1b1b21] hover:bg-[#ffdcc5]/60 shadow-xs'
                    }`}
                  >
                    <svg className="w-7 h-10 mb-1.5 text-[#765843]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 40 60">
                      <path d="M20 2 L33 46 C33 52 28 56 20 56 C12 56 7 52 7 46 L20 2 Z" fill="currentColor" fillOpacity="0.12"></path>
                    </svg>
                    <span className="font-label-sm text-xs font-semibold">Stiletto</span>
                    <span className="font-body-sm text-[10px] text-[#635d58]">Puntiaguda</span>
                  </button>

                  <button
                    onClick={() => setSelectedShape(selectedShape === 'square-soft' ? 'all' : 'square-soft')}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all text-center cursor-pointer ${
                      selectedShape === 'square-soft'
                        ? 'bg-[#ffdcc5] text-[#765843] ring-2 ring-[#765843] font-semibold'
                        : 'bg-white text-[#1b1b21] hover:bg-[#ffdcc5]/60 shadow-xs'
                    }`}
                  >
                    <svg className="w-7 h-10 mb-1.5 text-[#765843]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 40 60">
                      <rect fill="currentColor" fillOpacity="0.12" height="46" rx="4" width="22" x="9" y="8"></rect>
                    </svg>
                    <span className="font-label-sm text-xs font-semibold">Cuadrada Soft</span>
                    <span className="font-body-sm text-[10px] text-[#635d58]">Squoval</span>
                  </button>
                </div>
              </div>

              {/* Longitud Sugerida */}
              <div className="flex flex-col gap-3">
                <span className="font-label-caps text-[11px] uppercase tracking-wider text-[#4f453e]">
                  Longitud Sugerida
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'media', label: 'Media (Chic)' },
                    { id: 'larga', label: 'Larga (Editorial)' },
                    { id: 'corta', label: 'Corta (Natural)' },
                    { id: 'extra-larga', label: 'Extra Larga' }
                  ].map(len => (
                    <button
                      key={len.id}
                      onClick={() => setSelectedLength(selectedLength === len.id ? 'all' : len.id)}
                      className={`px-3 py-2 rounded-xl font-label-sm text-xs text-center transition-all cursor-pointer ${
                        selectedLength === len.id
                          ? 'bg-[#765843] text-white font-semibold'
                          : 'bg-white hover:bg-[#eae7ef] text-[#1b1b21] border border-[#d3c3ba]/30'
                      }`}
                    >
                      {len.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Acabado y Textura */}
              <div className="flex flex-col gap-3">
                <span className="font-label-caps text-[11px] uppercase tracking-wider text-[#4f453e]">
                  Acabado y Textura
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Glaseado Nácar', 'Mate Terciopelo', 'Espejo Glossy', 'Chrome Metálico'].map(fin => (
                    <button
                      key={fin}
                      onClick={() => setSelectedFinish(selectedFinish === fin ? 'all' : fin)}
                      className={`px-3 py-1.5 rounded-full font-label-sm text-xs transition-colors cursor-pointer ${
                        selectedFinish === fin
                          ? 'bg-[#ffdcc5] text-[#2b1606] font-semibold border border-[#c5a087]'
                          : 'bg-white text-[#1b1b21] hover:bg-[#eae7ef] border border-[#d3c3ba]/30'
                      }`}
                    >
                      {fin}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rango de Precio */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-label-caps text-[11px] uppercase tracking-wider text-[#4f453e]">
                    Rango de Precio
                  </span>
                  <span className="font-label-sm text-xs font-semibold text-[#765843]">
                    Hasta {formatPrice(maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="30"
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#765843] cursor-pointer h-1.5 bg-[#efecf5] rounded-lg"
                />
                <div className="flex items-center justify-between font-body-sm text-[11px] text-[#635d58]">
                  <span>{formatPrice(10)} (Esenciales)</span>
                  <span>{formatPrice(30)} (Alta Gemología)</span>
                </div>
              </div>

              {/* Bespoke Banner in Sidebar */}
              <div
                onClick={() => setIsBespokeStudioOpen(true)}
                className="p-4 rounded-2xl bg-[#f1daff]/40 border border-[#71518c]/20 flex items-start gap-3 mt-1 cursor-pointer hover:bg-[#f1daff]/60 transition-colors"
              >
                <span className="material-symbols-outlined text-[#71518c] text-[22px] shrink-0 mt-0.5">
                  diamond
                </span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-xs font-bold text-[#1b1b21]">
                    Servicio Bespoke 1 de 1
                  </span>
                  <p className="font-body-sm text-[11px] text-[#4f453e] mt-0.5">
                    ¿Deseas replicar un vestido o boceto exclusivo? Diseñamos junto a ti en el personalizador 3D.
                  </p>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <section className="lg:col-span-8 xl:col-span-8.5 flex flex-col gap-6">
              <div
                className={`grid gap-6 ${
                  viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
                }`}
              >
                {filteredProducts.map(product => {
                  const currentSize = cardSizes[product.id] || 'S';
                  const wishlisted = isInWishlist(product.id);

                  return (
                    <article
                      key={product.id}
                      onClick={() => navigateToProduct(product.id)}
                      className="group relative flex flex-col rounded-3xl bg-white/80 backdrop-blur-md shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer border border-[#d3c3ba]/25"
                    >
                      {/* Image Container */}
                      <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#efecf5]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                          <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md font-label-caps text-[10px] text-[#765843] uppercase shadow-sm flex items-center gap-1 font-semibold">
                            <span className="material-symbols-outlined text-[13px]">palette</span>
                            {product.tag || 'Alta Costura'}
                          </span>
                          {product.tagType === 'secondary' && (
                            <span className="px-2.5 py-0.5 rounded-full bg-[#e0bbfe] text-[#664781] font-label-caps text-[9px] font-semibold">
                              Inspiración Look
                            </span>
                          )}
                        </div>

                        {/* Wishlist Button */}
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          aria-label="Añadir a lista de deseos"
                          className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm transition-transform active:scale-90 cursor-pointer"
                        >
                          <span
                            className={`material-symbols-outlined text-[20px] ${
                              wishlisted ? 'text-[#71518c]' : 'text-[#4f453e] hover:text-[#71518c]'
                            }`}
                            style={{ fontVariationSettings: wishlisted ? "'FILL' 1" : "'FILL' 0" }}
                          >
                            favorite
                          </span>
                        </button>

                        {/* Floating bottom Size selector overlay on hover */}
                        <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-between bg-white/95 backdrop-blur-md p-2.5 rounded-2xl shadow-lg">
                          <div className="flex items-center gap-1 text-[11px] font-label-caps text-[#635d58]">
                            <span>Tallas:</span>
                            {(['XS', 'S', 'M', 'L'] as const).map(sz => (
                              <button
                                key={sz}
                                onClick={e => handleSelectCardSize(product.id, sz, e)}
                                className={`px-2 py-0.5 rounded-md font-bold text-xs transition-colors ${
                                  currentSize === sz
                                    ? 'bg-[#ffdcc5] text-[#2b1606]'
                                    : 'hover:bg-[#765843] hover:text-white'
                                }`}
                              >
                                {sz}
                              </button>
                            ))}
                          </div>
                          <span
                            onClick={e => {
                              e.stopPropagation();
                              setCurrentView('measuring-guide');
                            }}
                            className="font-label-sm text-[11px] text-[#765843] underline cursor-pointer"
                          >
                            Sizing Kit
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 flex flex-col gap-2.5">
                        <div className="flex items-baseline justify-between">
                          <h3 className="font-headline-sm text-[20px] text-[#1b1b21] group-hover:text-[#765843] transition-colors">
                            {product.name}
                          </h3>
                          <span className="font-headline-sm text-[20px] font-semibold text-[#765843]">
                            {formatPrice(product.price)}
                          </span>
                        </div>

                        <p className="font-body-sm text-xs text-[#4f453e] line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>

                        <div className="flex items-center gap-1.5 flex-wrap pt-1">
                          <span className="font-label-caps text-[10px] text-[#635d58] bg-[#efecf5] px-2 py-1 rounded-md">
                            {product.shapeName}
                          </span>
                          <span className="font-label-caps text-[10px] text-[#635d58] bg-[#efecf5] px-2 py-1 rounded-md">
                            {product.features[0] || 'Glaseado Satin'}
                          </span>
                          <span className="font-label-caps text-[10px] text-[#635d58] bg-[#efecf5] px-2 py-1 rounded-md">
                            Reutilizable x{product.reusableTimes || 5}
                          </span>
                        </div>

                        <div className="pt-3 flex items-center gap-2">
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              navigateToProduct(product.id);
                            }}
                            className="flex-1 py-2.5 rounded-full bg-[#1b1b21] text-white font-label-md text-xs font-semibold hover:bg-[#765843] transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[18px]">brush</span>
                            Personalizar
                          </button>

                          <button
                            onClick={e => {
                              e.stopPropagation();
                              addToCart({
                                productId: product.id,
                                name: product.name,
                                subtitle: product.subtitle,
                                price: product.price,
                                quantity: 1,
                                shape: product.shapeName,
                                length: product.length === 'corta' ? 'Corta (16 mm)' : product.length === 'media' ? 'Media (21 mm)' : 'Larga (26 mm)',
                                size: currentSize,
                                sizeSpecs: `${currentSize} (${product.shapeName})`,
                                finish: 'Brillo Cristal',
                                adhesive: 'Jelly Tabs (3-5 días)',
                                image: product.image
                              });
                            }}
                            className="p-2.5 rounded-full bg-[#eae7ef] hover:bg-[#ffdcc5] text-[#1b1b21] transition-colors cursor-pointer"
                            title="Añadir directo a la bolsa"
                          >
                            <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Sizing Kit Callout Banner */}
              <div className="p-6 rounded-3xl bg-[#f5f2fb] flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 border border-[#d3c3ba]/30">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-[#ffdcc5] text-[#765843] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[24px]">straighten</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-[16px] text-[#1b1b21]">
                      ¿Tienes dudas con tus medidas?
                    </span>
                    <span className="font-body-sm text-xs text-[#4f453e]">
                      Pide primero nuestro Sizing Kit físico por solo {formatPrice(2.5)} (reembolsable en tu pedido de uñas).
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    addToCart({
                      productId: 'sizing-kit-physical',
                      name: "Sizing Kit Físico Atelier",
                      subtitle: "10 cápsulas transparentes calibradas",
                      price: 2.5,
                      quantity: 1,
                      shape: "Universal",
                      length: "Muestra",
                      size: "custom",
                      sizeSpecs: "Kit Calibrador 10 tamaños",
                      finish: "Brillo Cristal",
                      adhesive: "Jelly Tabs (3-5 días)",
                      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvwFt4caW5HZfNkpj85oFaHs9woWurMm9Jpf_dx4jPqLblJTB3bH0Ru0eyhHBAAyM-S82QRlnMLPAkZeCI7ZeaCPBGRY5B_5UNIfQ9atTNn9E2uyix8ko94BcTg8zWf3FqvYp_brqbx_o3Lqwn7TZ32mYddD6XGKX__ituN-7YxbwC7K80MXA9iC0YlCk_IAClJH3WU0T2wj2AIkKWduhdOBZYtxTevtXQifTtv07nQ1xLyNkvQUP4"
                    });
                  }}
                  className="px-5 py-2.5 rounded-full bg-white text-[#1b1b21] font-label-md text-xs font-semibold hover:bg-[#765843] hover:text-white transition-colors shadow-sm shrink-0 cursor-pointer"
                >
                  Solicitar Sizing Kit
                </button>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between pt-6">
                <span className="font-body-sm text-xs text-[#635d58]">
                  Mostrando {filteredProducts.length} de 38 piezas de autor
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="w-10 h-10 rounded-full bg-[#efecf5] flex items-center justify-center text-[#635d58] hover:text-[#1b1b21] transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                  </button>

                  {[1, 2, 3, 4].map(pg => (
                    <button
                      key={pg}
                      onClick={() => setCurrentPage(pg)}
                      className={`w-10 h-10 rounded-full font-label-md text-xs transition-colors cursor-pointer ${
                        currentPage === pg
                          ? 'bg-[#765843] text-white font-semibold'
                          : 'bg-white hover:bg-[#efecf5] text-[#1b1b21]'
                      }`}
                    >
                      {pg}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(p => Math.min(4, p + 1))}
                    className="w-10 h-10 rounded-full bg-[#efecf5] flex items-center justify-center text-[#635d58] hover:text-[#1b1b21] transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
