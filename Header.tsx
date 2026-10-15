import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartTotalCount,
    wishlist,
    currency,
    setCurrency,
    setIsSearchOpen,
    setIsWishlistOpen,
    setIsBespokeStudioOpen,
    openStyleStudio,
    setActiveStyleFilter,
    formatPrice
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stylesDropdownOpen, setStylesDropdownOpen] = useState(false);
  const [mobileStylesOpen, setMobileStylesOpen] = useState(false);

  const ART_STYLES_ITEMS = [
    {
      id: 'minimalista' as const,
      name: 'Minimalista',
      number: '01',
      badge: 'Sutil',
      subtitle: 'Lujo Silencioso & Líneas Finas',
      desc: 'Degradado aura nude, micro-perla en lúnula y pan de oro líquido flotante.',
      tag: `Desde ${formatPrice(12)}`,
      icon: 'nature',
      accentColor: '#765843',
      dotColor: '#c5a087'
    },
    {
      id: 'elegante' as const,
      name: 'Elegante',
      number: '02',
      badge: 'Perlado',
      subtitle: 'Nácar, Baby Boomer & Filigrana',
      desc: 'Baby boomer con nácar de ostra molido, baño de micrón dorado y perlas de micro-engarce.',
      tag: `Desde ${formatPrice(15)}`,
      icon: 'diamond',
      accentColor: '#765843',
      dotColor: '#ffdcc5'
    },
    {
      id: 'tierno' as const,
      name: 'Tierno',
      number: '03',
      badge: 'Pastel',
      subtitle: 'Coquette Couture & Lazos 3D',
      desc: 'Pasteles translúcidos, lazos coquette esculpidos en gel cuarzo y corazones de ópalo.',
      tag: `Desde ${formatPrice(14)}`,
      icon: 'favorite',
      accentColor: '#71518c',
      dotColor: '#f3c2d6'
    },
    {
      id: 'artistico' as const,
      name: 'Artístico',
      number: '04',
      badge: 'Escultura',
      subtitle: 'Micro-óleo & Botánica Renacentista',
      desc: 'Micropintura de orquídeas al óleo, filigrana barroca en relieve 3D y gotas de rocío vítreas.',
      tag: `Desde ${formatPrice(17)}`,
      icon: 'draw',
      accentColor: '#436850',
      dotColor: '#c7d6c7'
    },
    {
      id: 'llamativo' as const,
      name: 'Llamativo',
      number: '05',
      badge: 'Maxi Joyas',
      subtitle: 'Chrome Espejo & Maxi Cristales',
      desc: 'Chrome prismático reflectante, siluetas afiladas y engarces barrocos con cristales Swarovski.',
      tag: `Desde ${formatPrice(18)}`,
      icon: 'flare',
      accentColor: '#71518c',
      dotColor: '#d1b2f2'
    },
    {
      id: 'personalizado' as const,
      name: 'Bespoke (1 de 1)',
      number: '06',
      badge: 'A Medida',
      subtitle: 'Comisión Exclusiva de Autor',
      desc: 'Tu referencia, vestido o concepto materializado sobre gel estructurado milimétrico.',
      tag: 'Cotización Directa',
      icon: 'fingerprint',
      accentColor: '#765843',
      dotColor: '#765843'
    }
  ];

  const handleOpenStudio = (styleId: 'minimalista' | 'elegante' | 'tierno' | 'artistico' | 'llamativo' | 'personalizado') => {
    openStyleStudio(styleId);
    setStylesDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleStyleCatalogFilter = (e: React.MouseEvent, style: string) => {
    e.stopPropagation();
    setActiveStyleFilter(style);
    setCurrentView('catalog');
    setStylesDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
      {/* Top Banner */}
      <div className="w-full bg-[#765843] text-white py-1.5 px-4 text-center border-b border-[#c5a087]/20">
        <p className="font-label-caps uppercase tracking-widest text-[#ffdcc5] flex items-center justify-center gap-2 text-[10px] sm:text-xs">
          <span className="material-symbols-outlined text-[13px]">auto_awesome</span>
          <span>Envíos asegurados y kit de colocación luxury de regalo en cada pedido • Diseños 100% hechos a mano alzada</span>
          <span className="material-symbols-outlined text-[13px]">auto_awesome</span>
        </p>
      </div>

      {/* Floating Pill Header */}
      <div className="w-full px-4 lg:px-8 py-2.5">
        <div className="h-20 max-w-7xl mx-auto rounded-full px-5 sm:px-6 flex items-center justify-between bg-[#fbf8ff]/80 backdrop-blur-2xl shadow-[0_8px_32px_-4px_rgba(30,30,36,0.06),0_2px_8px_-2px_rgba(197,160,135,0.12)] border border-white/70 ring-1 ring-[#c5a087]/15">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3.5">
            <button
              onClick={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group text-left cursor-pointer"
            >
              <Logo size="md" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1.5 py-1 px-2 rounded-full bg-[#f5f2fb]/70 backdrop-blur-md border border-white/50">
            <button
              onClick={() => setCurrentView('catalog')}
              className={`px-3.5 py-1.5 transition-all rounded-full font-label-md text-sm ${
                currentView === 'catalog'
                  ? 'bg-[#c5a087] text-[#513724] font-semibold shadow-sm'
                  : 'text-[#4f453e] hover:text-[#1b1b21] hover:bg-[#eae7ef]'
              }`}
            >
              Colecciones
            </button>

            {/* Estilos de Arte Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setStylesDropdownOpen(prev => !prev)}
                className={`px-3.5 py-1.5 rounded-full font-label-md text-sm transition-all cursor-pointer flex items-center gap-1.5 ${
                  stylesDropdownOpen
                    ? 'bg-[#c5a087] text-[#513724] font-semibold shadow-xs'
                    : 'text-[#4f453e] hover:text-[#1b1b21] hover:bg-[#eae7ef]'
                }`}
                aria-expanded={stylesDropdownOpen}
                aria-haspopup="true"
              >
                <span>Estilos de Arte</span>
                <span className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${
                  stylesDropdownOpen ? 'rotate-180 text-[#513724]' : 'text-[#635d58] group-hover:rotate-180'
                }`}>
                  expand_more
                </span>
              </button>

              {/* Emerging Style Studio Floating Popover */}
              <div
                className={`absolute top-full -left-20 sm:left-0 mt-3 w-[420px] max-w-[92vw] p-4 rounded-3xl bg-[#fbf8ff]/95 backdrop-blur-2xl shadow-[0_24px_64px_-12px_rgba(30,30,36,0.18),0_4px_16px_-4px_rgba(197,160,135,0.2)] border border-white/80 ring-1 ring-[#c5a087]/20 z-50 transition-all duration-200 ${
                  stylesDropdownOpen
                    ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                    : 'opacity-0 invisible -translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto'
                }`}
              >
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#d3c3ba]/30 px-1">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-lg bg-[#ffdcc5] text-[#765843]">
                      <span className="material-symbols-outlined text-[15px]">auto_awesome</span>
                    </span>
                    <div>
                      <h4 className="font-headline-sm text-xs font-semibold text-[#1b1b21]">
                        Estudios de Arte Emergentes
                      </h4>
                      <p className="font-label-caps text-[9px] uppercase tracking-wider text-[#635d58]">
                        Personalizador 3D interactivo
                      </p>
                    </div>
                  </div>
                  <span className="font-label-caps text-[9px] text-[#71518c] bg-[#f1daff] px-2 py-0.5 rounded-full font-bold">
                    6 Estudios
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 max-h-[380px] overflow-y-auto pr-1">
                  {ART_STYLES_ITEMS.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleOpenStudio(item.id)}
                      className="group/item p-2.5 rounded-2xl bg-white/70 hover:bg-white hover:shadow-md border border-[#d3c3ba]/25 hover:border-[#c5a087]/50 transition-all cursor-pointer flex flex-col gap-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-7 h-7 rounded-xl flex items-center justify-center text-white text-[14px] shadow-2xs"
                            style={{ backgroundColor: item.accentColor }}
                          >
                            <span className="material-symbols-outlined text-[15px]">{item.icon}</span>
                          </span>
                          <div>
                            <span className="font-headline-sm text-sm text-[#1b1b21] group-hover/item:text-[#765843] font-semibold transition-colors">
                              {item.name}
                            </span>
                            <span className="font-label-caps text-[9px] uppercase text-[#71518c] bg-[#f1daff]/60 px-1.5 py-0.5 rounded-md ml-1.5 font-bold">
                              {item.badge}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="font-label-sm text-[11px] font-semibold text-[#765843]">
                            {item.tag}
                          </span>
                          <span className="p-1 rounded-full bg-[#f5f2fb] group-hover/item:bg-[#ffdcc5] text-[#765843] transition-colors">
                            <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                          </span>
                        </div>
                      </div>

                      <p className="font-body-sm text-[11px] text-[#4f453e] leading-snug line-clamp-1 pl-9">
                        {item.desc}
                      </p>

                      <div className="flex items-center justify-between pl-9 pt-0.5">
                        <span className="font-label-caps text-[9px] text-[#71518c] flex items-center gap-1 group-hover/item:underline font-semibold">
                          <span className="material-symbols-outlined text-[11px]">sparkles</span>
                          <span>Abrir en Estudio 3D</span>
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleStyleCatalogFilter(e, item.id)}
                          className="font-label-caps text-[9px] text-[#635d58] hover:text-[#1b1b21] hover:underline transition-colors flex items-center gap-0.5"
                          title={`Ver piezas de estilo ${item.name} en catálogo`}
                        >
                          <span>Ver catálogo</span>
                          <span className="material-symbols-outlined text-[10px]">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2.5 mt-2 border-t border-[#d3c3ba]/30 flex items-center justify-between px-1">
                  <span className="font-body-sm text-[10px] text-[#635d58]">
                    Cada estilo incluye orfebrería de autor & kit luxury de regalo.
                  </span>
                  <button
                    onClick={() => handleOpenStudio('personalizado')}
                    className="font-label-caps text-[10px] uppercase font-bold text-[#765843] hover:underline"
                  >
                    Bespoke Libre →
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsBespokeStudioOpen(true)}
              className="px-3.5 py-1.5 rounded-full font-label-md text-sm text-[#4f453e] hover:text-[#1b1b21] hover:bg-[#eae7ef] transition-all flex items-center gap-1.5"
            >
              <span>Personalizador 3D</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#71518c] animate-pulse"></span>
            </button>

            <button
              onClick={() => setCurrentView('measuring-guide')}
              className={`px-3.5 py-1.5 rounded-full font-label-md text-sm transition-all ${
                currentView === 'measuring-guide'
                  ? 'bg-[#c5a087] text-[#513724] font-semibold shadow-sm'
                  : 'text-[#4f453e] hover:text-[#1b1b21] hover:bg-[#eae7ef]'
              }`}
            >
              Guía de Medidas
            </button>

            <button
              onClick={() => setCurrentView('history')}
              className={`px-3.5 py-1.5 rounded-full font-label-md text-sm transition-all ${
                currentView === 'history'
                  ? 'bg-[#c5a087] text-[#513724] font-semibold shadow-sm'
                  : 'text-[#4f453e] hover:text-[#1b1b21] hover:bg-[#eae7ef]'
              }`}
            >
              Nuestra Historia
            </button>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Currency Switcher */}
            <div className="hidden md:flex items-center bg-white/90 rounded-full px-2 py-0.5 border border-[#d3c3ba]/40 shadow-inner">
              <button
                onClick={() => setCurrency('MXN')}
                className={`font-label-sm text-[11px] px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  currency === 'MXN'
                    ? 'font-bold text-[#765843] bg-[#ffdcc5]'
                    : 'text-[#635d58] hover:text-[#1b1b21]'
                }`}
              >
                MXN ($)
              </button>
              <span className="text-[#d3c3ba] px-0.5">/</span>
              <button
                onClick={() => setCurrency('USD')}
                className={`font-label-sm text-[11px] px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  currency === 'USD'
                    ? 'font-bold text-[#765843] bg-[#ffdcc5]'
                    : 'text-[#635d58] hover:text-[#1b1b21]'
                }`}
              >
                USD
              </button>
              <span className="text-[#d3c3ba] px-0.5">/</span>
              <button
                onClick={() => setCurrency('EUR')}
                className={`font-label-sm text-[11px] px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  currency === 'EUR'
                    ? 'font-bold text-[#765843] bg-[#ffdcc5]'
                    : 'text-[#635d58] hover:text-[#1b1b21]'
                }`}
              >
                EUR
              </button>
            </div>

            {/* Quick Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f5f2fb]/90 hover:bg-[#eae7ef] text-[#635d58] hover:text-[#1b1b21] border border-[#d3c3ba]/30 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
              <span className="font-label-sm text-xs">Buscar</span>
              <kbd className="font-label-caps text-[10px] bg-white px-1.5 py-0.5 rounded border border-[#d3c3ba]/30 text-[#4f453e]">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="lg:hidden p-2 rounded-full text-[#4f453e] hover:text-[#765843] hover:bg-[#eae7ef] transition-all"
              aria-label="Buscar"
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>

            {/* Wishlist Link */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 rounded-full text-[#4f453e] hover:text-[#71518c] hover:bg-[#eae7ef] transition-all cursor-pointer"
              aria-label="Lista de deseos"
            >
              <span className="material-symbols-outlined text-[22px]">favorite</span>
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 h-4 min-w-[16px] px-1 bg-[#71518c] text-white rounded-full font-label-caps text-[9px] flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Link */}
            <button
              onClick={() => setCurrentView('cart')}
              className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#765843] text-white hover:bg-[#5c412d] shadow-[0_4px_16px_rgba(118,88,67,0.35)] transition-all cursor-pointer"
              aria-label="Bolsa de compra"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              <span className="font-label-md text-sm font-semibold">{cartTotalCount}</span>
            </button>

            <div className="h-6 w-px bg-[#d3c3ba]/40 hidden sm:block"></div>

            {/* User Profile Avatar */}
            <button
              onClick={() => setCurrentView('history')}
              className="p-0.5 rounded-full ring-2 ring-[#c5a087]/30 hover:ring-[#765843] transition-all cursor-pointer hidden sm:block"
              title="Cuenta VIP Atelier"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAljJd5CcbegeahACt1PctBGN0gWdOkjwPaMXSkZ_5Y4R0kjW7eukkPEBzsF_6hU3W4OzM1ak44V-qURrfRkXRV5AlPZpo0BzJ2Wb8N8zYvXBQQnwlHX3MVFlBgHKsuJ0h7_Uktb1jGQcGiI3rOtuyzcpphczEfGjur8Aiwej9OJEjtvdIj336sf13oxJdge4tJwnmh-1gd8ZiPsP_-6IXZ2XG_MInA-swpGh1w2F4kFhAim9zf_LG"
              />
            </button>

            {/* Hamburger Button for mobile */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="xl:hidden p-2 rounded-full text-[#4f453e] hover:bg-[#eae7ef]"
              aria-label="Abrir menú"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-2 p-4 rounded-3xl bg-[#fbf8ff]/95 backdrop-blur-2xl border border-white/80 shadow-2xl flex flex-col gap-2">
            <button
              onClick={() => {
                setCurrentView('home');
                setMobileMenuOpen(false);
              }}
              className="px-4 py-2.5 rounded-2xl font-label-md text-left text-[#1b1b21] hover:bg-[#eae7ef]"
            >
              Inicio
            </button>
            <button
              onClick={() => {
                setCurrentView('catalog');
                setMobileMenuOpen(false);
              }}
              className="px-4 py-2.5 rounded-2xl font-label-md text-left text-[#1b1b21] hover:bg-[#eae7ef]"
            >
              Colecciones
            </button>

            {/* Mobile Estilos de Arte Section */}
            <div className="rounded-2xl border border-[#d3c3ba]/30 bg-white/60 p-2.5">
              <button
                onClick={() => setMobileStylesOpen(prev => !prev)}
                className="w-full flex items-center justify-between font-label-md text-sm text-[#1b1b21] p-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#765843]">palette</span>
                  <span className="font-semibold">Estilos de Arte (Estudios 3D)</span>
                </div>
                <span className={`material-symbols-outlined text-[18px] text-[#635d58] transition-transform ${mobileStylesOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>

              {mobileStylesOpen && (
                <div className="flex flex-col gap-1.5 pt-2 mt-1 border-t border-[#d3c3ba]/25">
                  {ART_STYLES_ITEMS.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleOpenStudio(item.id)}
                      className="w-full p-2 rounded-xl bg-white hover:bg-[#eae7ef] flex items-center justify-between text-left transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-[12px]"
                          style={{ backgroundColor: item.accentColor }}
                        >
                          <span className="material-symbols-outlined text-[13px]">{item.icon}</span>
                        </span>
                        <div className="flex flex-col">
                          <span className="font-label-md text-xs font-semibold text-[#1b1b21]">{item.name}</span>
                          <span className="font-body-sm text-[10px] text-[#635d58]">{item.badge} • {item.tag}</span>
                        </div>
                      </div>
                      <span className="font-label-caps text-[9px] text-[#71518c] font-bold bg-[#f1daff] px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="material-symbols-outlined text-[10px]">sparkles</span>
                        3D
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                handleOpenStudio('personalizado');
              }}
              className="px-4 py-2.5 rounded-2xl font-label-md text-left text-[#71518c] font-semibold hover:bg-[#eae7ef] flex items-center justify-between"
            >
              <span>Personalizador Bespoke 3D Libre</span>
              <span className="material-symbols-outlined text-sm">sparkles</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('measuring-guide');
                setMobileMenuOpen(false);
              }}
              className="px-4 py-2.5 rounded-2xl font-label-md text-left text-[#1b1b21] hover:bg-[#eae7ef]"
            >
              Guía de Medidas
            </button>
            <button
              onClick={() => {
                setCurrentView('history');
                setMobileMenuOpen(false);
              }}
              className="px-4 py-2.5 rounded-2xl font-label-md text-left text-[#1b1b21] hover:bg-[#eae7ef]"
            >
              Nuestra Historia
            </button>
            <div className="flex items-center justify-between pt-2 border-t border-[#d3c3ba]/30">
              <span className="font-label-sm text-xs text-[#635d58]">Moneda:</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setCurrency('MXN')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    currency === 'MXN' ? 'bg-[#ffdcc5] text-[#765843]' : 'bg-[#eae7ef] text-[#635d58]'
                  }`}
                >
                  MXN ($)
                </button>
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    currency === 'USD' ? 'bg-[#ffdcc5] text-[#765843]' : 'bg-[#eae7ef] text-[#635d58]'
                  }`}
                >
                  USD ($)
                </button>
                <button
                  onClick={() => setCurrency('EUR')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    currency === 'EUR' ? 'bg-[#ffdcc5] text-[#765843]' : 'bg-[#eae7ef] text-[#635d58]'
                  }`}
                >
                  EUR (€)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
