import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';

export const HomeView: React.FC = () => {
  const {
    setCurrentView,
    navigateToProduct,
    addToCart,
    formatPrice,
    setIsBespokeStudioOpen,
    openStyleStudio,
    setActiveStyleFilter,
    toggleWishlist,
    isInWishlist
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'sutil' | 'lujo' | 'audaz'>('all');

  // Bestsellers interactive option configuration states
  const [bestsellerOptions, setBestsellerOptions] = useState<
    Record<string, { shape: string; length: string }>
  >({
    'nacar-botanique': { shape: 'Almendra', length: 'Media' },
    'lagrimas-de-luna': { shape: 'Almendra', length: 'Corta' },
    'cuarzo-rosa-oro': { shape: 'Coffin', length: 'Larga' }
  });

  const [addingId, setAddingId] = useState<string | null>(null);

  const handleSelectBestsellerOption = (
    productId: string,
    key: 'shape' | 'length',
    value: string
  ) => {
    setBestsellerOptions(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [key]: value
      }
    }));
  };

  const handleBestsellerAdd = (productId: string) => {
    const p = PRODUCTS.find(prod => prod.id === productId);
    if (!p) return;

    setAddingId(productId);
    const opts = bestsellerOptions[productId] || { shape: 'Almendra', length: 'Media' };

    addToCart({
      productId: p.id,
      name: p.name,
      subtitle: p.subtitle,
      price: p.price,
      quantity: 1,
      shape: opts.shape,
      length: `${opts.length} (21 mm)`,
      size: 'S',
      sizeSpecs: 'S (15-11-12-11-9 mm)',
      finish: 'Brillo Cristal',
      adhesive: 'Jelly Tabs (3-5 días)',
      image: p.image
    });

    setTimeout(() => {
      setAddingId(null);
    }, 1500);
  };

  const styleCards = [
    {
      id: 'minimalista',
      number: '01 • Sutil',
      title: 'Minimalista',
      desc: 'Líneas puras, degradado aura nude y acentos de pan de oro líquido imperceptibles a la prisa.',
      price: `Desde ${formatPrice(12)}`,
      category: 'sutil',
      icon: 'nature',
      tagColor: 'text-[#635d58]',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuATEf4-2VCCQb57Wze4yhGQVFZNeGQat-in6XQjddk8f31g-YHEORNvPHUW_SFF4QfQc02Cib51NhqOYi-DGaXrkN2nPofgQzJK3FWndqsYdNdml8CXXSgdBxUEliUWI-b9KZ4tq_ZtUASWeBtCmcxvjP8ptF3tk9McEinSluhcJ_eQeNF7_n-qv3ZbUwfJO7IqXGpvi4hWoAf33QG2B6-FVes7NFYTHOZL3ZxNdSAfSDR5vqUkm_'
    },
    {
      id: 'elegante',
      number: '02 • Perlado',
      title: 'Elegante',
      desc: 'Baby boomer con nácar de ostra molido, baño de micrón dorado y perlas de micro-engarce.',
      price: `Desde ${formatPrice(15)}`,
      category: 'lujo',
      icon: 'diamond',
      tagColor: 'text-[#765843]',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgfOmANzhyngsXz8aIRFQkvlKlNyO2-CocRmqE7ziTh528hl6zXoMCfnz62eY4bpnKI-zE2RenJ-3sCpPd7dfLbiG7H1wstvR8cX-NVC_2kgP3ta-RWaUDgYkYWO1X_uiRU5z0hW_CMk41b3aNN-j4tR6GEb6WCRNgK0mBMa0E7BpMi4o7IZzA_qdZafngt0QCB3-TKAZYb__j4AzM_Mb5Mu1CuTy5w32g7cilHF1xZzoQabdFAaiP'
    },
    {
      id: 'tierno',
      number: '03 • Pastel',
      title: 'Tierno',
      desc: 'Pasteles etéreos translúcidos, lazos coquette esculpidos en 3D y corazones de cuarzo rosa.',
      price: `Desde ${formatPrice(14)}`,
      category: 'sutil',
      icon: 'favorite',
      tagColor: 'text-[#71518c]',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANTJehoBc82tFKTZCX-xT-9B0pK8PN0Wjs1CU-kYoCL_lYOhFhu0Hc2qi-WHcVHSOcUYwzvHwFSLzgKPvknmHDPs5QUXcO5OezppCzgbjo0lvtt9ep16vnm54aAOnSjnMg-6JukYHQpjY38DKntJAtL-O3m26gh505of-CWVXG_PmThCUeRDCiEIZQd4HAqNIDIBtHw-L-yEgh0kGWyJze--rrl7Sf-dBOdfHKdNJCUwFXr9tuZAo6'
    },
    {
      id: 'artistico',
      number: '04 • Escultura',
      title: 'Artístico',
      desc: 'Trazos de pincel al óleo minucioso, herbarios botánicos renacentistas y mármol fluido.',
      price: `Desde ${formatPrice(17)}`,
      category: 'audaz',
      icon: 'draw',
      tagColor: 'text-[#c5a087]',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3c4MblAaq5xCKYnADUxh3i8d4hOyDMicU5CEWJAtCPZ6QnTjIbmgvgK1Kg-uybI05p450iTdtq5BHl8UdtFeAb5hTwAvRZdqFHkyK5OVngrUrnotQdlLWgeUTfwPPDgCvnjld38MGv9AqBTn13TIs8agjoo2llubA-I3aGW7p2Q5rS-afNqB3lDzBgozXRfmE_7oUnjHxJ3X2hPbzSGL4SCOfEcEm7QpPpw1sJFYadu5MSRp4bbDL'
    },
    {
      id: 'llamativo',
      number: '05 • Joyas',
      title: 'Llamativo',
      desc: 'Chrome prismático ultra-reflejante, siluetas stiletto afiladas y engarces barrocos con gemas.',
      price: `Desde ${formatPrice(18)}`,
      category: 'audaz',
      icon: 'flare',
      tagColor: 'text-[#71518c]',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyYSPjAyFBBKtB7BNpIWmtzhkc45sZfVZDTwbiHOXFpOPPuEpAJjlC7EZPPkCIdsBH2zzRaHw7xMI5xY5RD-fkEgQE0oxtjlQiW5mn9oK-SdCZCcaxLvRB32qe06V7lTYgxg6hzPSisNVTVe9g9vefDe5LBBoHKN0CHc6LBg5WoLCvEhqt8_a9onx3goqZJiS0uVSD0GmO3frCm0vHAUCQY8tJbJOqixLnh1pq92DBmtNIfeAGatK7'
    },
    {
      id: 'personalizado',
      number: '06 • Bespoke 1 de 1',
      title: 'Personalizado',
      desc: 'Tu concepto, tablero de Pinterest o vestido de gala llevado al lienzo milimétrico por nuestras maestras.',
      price: 'Cotización Directa',
      category: 'lujo',
      icon: 'fingerprint',
      tagColor: 'text-[#765843]',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4fkYCxZAs2fu--xjzCdmZaPsTkda27Kx-0ahQBn3dQV_wIkGf8JsCYGDvl0BZ6VYntHojj0LY8mb0YgWFUshh7kTw4SA-3N3JAj9ILcqYcCfMl9Qjs2d9Fe59l61ZhkO_3jR9jiFmJQjMKtYkE8WmE0pcITzNole2rDmJ4qcVFEKWPx1a7IByvXNI33EgKWts2f8nfhv_2Bt59q-SzZZltQzoNpE3Kg4WpxPg88htNGBNz93agPDo'
    }
  ];

  const filteredStyleCards = styleCards.filter(
    c => activeTab === 'all' || c.category === activeTab
  );

  return (
    <div className="flex flex-col w-full overflow-hidden pb-16">
      {/* 1. HERO SECTION */}
      <section className="w-full px-4 sm:px-8 lg:px-16 pt-8 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Copy */}
          <div className="lg:col-span-6 flex flex-col gap-6 z-10">
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md shadow-xs border border-white/80">
              <span className="material-symbols-outlined text-[#71518c] text-[16px]">
                arrow_back_ios_new
              </span>
              <span className="font-label-caps text-[10px] text-[#765843] tracking-widest uppercase font-semibold">
                Haute Onglerie d'Art • 100% Hecho a Mano
              </span>
            </div>

            <h1 className="font-display-hero text-[#1b1b21] leading-[1.08] tracking-tight">
              Joyas para tus Manos:{' '}
              <span className="italic font-light text-[#765843]">Pinceladas a Mano Alzada.</span>
            </h1>

            <p className="font-body-lg text-sm sm:text-base text-[#4f453e] max-w-xl leading-relaxed">
              Piezas de autor únicas, esculpidas con precisión anatómica en gel estructurado y esmaltadas artesanalmente con micro-perlas cultivadas, oro rosa y pigmentos botánicos.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  setCurrentView('catalog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-full bg-[#1b1b21] text-white font-label-md text-sm flex items-center gap-2.5 shadow-lg hover:shadow-[0_0_28px_rgba(197,160,135,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
                <span>Explorar Colecciones</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <button
                onClick={() => setIsBespokeStudioOpen(true)}
                className="px-7 py-4 rounded-full bg-white/90 backdrop-blur-xl text-[#1b1b21] font-label-md text-sm flex items-center gap-2 shadow-xs hover:bg-[#f5f2fb] transition-all border border-[#d3c3ba]/30 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[#71518c] text-[18px]">
                  auto_fix_high
                </span>
                <span>Diseñar a Medida</span>
              </button>
            </div>

            {/* Micro Confidence Badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 max-w-lg">
              <div className="p-3 rounded-2xl bg-white/60 backdrop-blur-md shadow-xs border border-white/80 flex flex-col items-center text-center gap-1">
                <span className="material-symbols-outlined text-[#765843] text-[20px]">
                  all_inclusive
                </span>
                <span className="font-label-caps text-[10px] uppercase text-[#1b1b21] font-semibold">
                  Reutilizables
                </span>
                <span className="font-body-sm text-[11px] text-[#635d58]">+5 aplicaciones</span>
              </div>

              <div className="p-3 rounded-2xl bg-white/60 backdrop-blur-md shadow-xs border border-white/80 flex flex-col items-center text-center gap-1">
                <span className="material-symbols-outlined text-[#71518c] text-[20px]">
                  straighten
                </span>
                <span className="font-label-caps text-[10px] uppercase text-[#1b1b21] font-semibold">
                  Ajuste Milimétrico
                </span>
                <span className="font-body-sm text-[11px] text-[#635d58]">Garantizado 100%</span>
              </div>

              <div className="p-3 rounded-2xl bg-white/60 backdrop-blur-md shadow-xs border border-white/80 flex flex-col items-center text-center gap-1">
                <span className="material-symbols-outlined text-[#c5a087] text-[20px]">
                  palette
                </span>
                <span className="font-label-caps text-[10px] uppercase text-[#1b1b21] font-semibold">
                  Pincel Alzado
                </span>
                <span className="font-body-sm text-[11px] text-[#635d58]">Cero impresiones</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#ffdcc5]/30 via-[#e0bbfe]/20 to-white rounded-3xl blur-2xl -z-10"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#efecf5] aspect-[4/5] max-h-[580px] w-full flex items-center justify-center border border-white/80">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBewnuD7stAN-O0eGjmUBYRfbDp8uH1_DcGOncEQvrQtALtk6imrU2ICMYOTf5kwlRP492UIWpRBzBEy6EmnY91vACBdDz0ExjjqUNdW-Ufxpob9cP3Saj1Bku2g6CIUJ8mWQEdzqvBLbbrFGKCo49swCXQdLWUUnBkqFeyDAHtpw0iGGaAmq_TmeWHPy8B8no8GLl1HSZZ5qqaRO5E1XRAjiYZ0dfk_cx1H2Mb2j1PAZakEzL8mJTb"
                alt="Fleur de Nacre - Atelier L'Aura"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Floating Glassmorphic Editorial Card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/85 backdrop-blur-2xl shadow-xl flex items-center justify-between border border-white/90">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-[#f1daff] text-[#71518c] font-label-caps text-[9px] uppercase tracking-wider font-semibold">
                      Cápsula Haute
                    </span>
                    <span className="flex items-center text-[#765843] text-xs font-semibold">
                      <span className="material-symbols-outlined text-[14px]">star</span> 4.98 (124 reseñas)
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-lg text-[#1b1b21]">Fleur de Nacre</h3>
                  <p className="font-body-sm text-xs text-[#635d58]">Almendra Rusa • Oro Rosa & Perlas 3D</p>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="font-headline-sm text-xl text-[#765843] font-semibold">
                    {formatPrice(17)}
                  </span>
                  <button
                    onClick={() => {
                      addToCart({
                        productId: 'fleur-de-nacre',
                        name: 'Fleur de Nacre',
                        subtitle: 'Edición Limitada • Pieza Hero',
                        price: 17,
                        quantity: 1,
                        shape: 'Almendra Rusa',
                        length: 'Media (21 mm)',
                        size: 'S',
                        sizeSpecs: 'S (15-11-12-11-9 mm)',
                        finish: 'Brillo Cristal',
                        adhesive: 'Jelly Tabs (3-5 días)',
                        image:
                          'https://lh3.googleusercontent.com/aida-public/AB6AXuBewnuD7stAN-O0eGjmUBYRfbDp8uH1_DcGOncEQvrQtALtk6imrU2ICMYOTf5kwlRP492UIWpRBzBEy6EmnY91vACBdDz0ExjjqUNdW-Ufxpob9cP3Saj1Bku2g6CIUJ8mWQEdzqvBLbbrFGKCo49swCXQdLWUUnBkqFeyDAHtpw0iGGaAmq_TmeWHPy8B8no8GLl1HSZZ5qqaRO5E1XRAjiYZ0dfk_cx1H2Mb2j1PAZakEzL8mJTb'
                      });
                    }}
                    className="px-4 py-2 rounded-full bg-[#765843] text-white font-label-sm text-xs hover:bg-[#5c412d] transition-all shadow-xs cursor-pointer"
                  >
                    Adquirir
                  </button>
                </div>
              </div>
            </div>

            {/* Staggered Accent Tag */}
            <div className="hidden sm:flex absolute -top-4 -right-4 p-4 rounded-2xl bg-white/90 backdrop-blur-xl shadow-lg flex-col gap-1 border border-white/90">
              <span className="font-label-caps text-[10px] text-[#71518c] uppercase font-bold tracking-widest flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#71518c] animate-ping"></span> Obra Nº 042/100
              </span>
              <span className="font-body-sm text-xs font-semibold text-[#1b1b21]">
                Pigmentos de París
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXPLORADOR INTERACTIVO DE ESTILOS */}
      <section className="w-full bg-[#f5f2fb]/50 py-20 px-4 sm:px-8 lg:px-16 border-y border-[#d3c3ba]/25">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="h-px w-8 bg-[#765843]"></span>
                <span className="font-label-caps text-xs uppercase text-[#765843] tracking-widest font-semibold">
                  Atmósferas Visuales
                </span>
              </div>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#1b1b21]">
                Explora por Estilo Artístico
              </h2>
              <p className="font-body-md text-sm text-[#4f453e]">
                Selecciona la corriente que resuena con tu energía actual. Cada silueta se adapta a tu fisonomía exacta.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {[
                { id: 'all', label: 'Todos' },
                { id: 'sutil', label: 'Sutil & Nude' },
                { id: 'lujo', label: 'Alta Costura' },
                { id: 'audaz', label: 'Vanguardia' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-full font-label-md text-xs transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[#1b1b21] text-white shadow-sm'
                      : 'bg-white text-[#635d58] hover:text-[#1b1b21] border border-[#d3c3ba]/30'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 6 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStyleCards.map(card => (
              <div
                key={card.id}
                onClick={() => {
                  openStyleStudio(card.id as any);
                }}
                className="group relative rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl p-6 shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between h-[360px] cursor-pointer border border-[#d3c3ba]/30 hover:border-[#c5a087]/50"
              >
                <div className="absolute inset-0 -z-10 opacity-30 group-hover:opacity-50 transition-opacity">
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full bg-white/90 backdrop-blur-md font-label-caps text-[10px] uppercase font-semibold ${card.tagColor}`}>
                    {card.number}
                  </span>
                  <span className="p-2 rounded-full bg-white text-[#1b1b21] group-hover:scale-110 transition-transform shadow-2xs">
                    <span className="material-symbols-outlined text-[18px]">{card.icon}</span>
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md flex flex-col gap-1 shadow-sm border border-white/80">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline-sm text-lg text-[#1b1b21]">{card.title}</h3>
                    <span className="font-label-caps text-[9px] text-[#71518c] bg-[#f1daff] px-2 py-0.5 rounded-full font-bold flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[10px]">sparkles</span>
                      Estudio 3D
                    </span>
                  </div>
                  <p className="font-body-sm text-xs text-[#4f453e] leading-relaxed line-clamp-2">{card.desc}</p>
                  <div className="pt-2 flex items-center justify-between font-label-sm text-xs text-[#765843] font-semibold border-t border-[#d3c3ba]/20 mt-1">
                    <span>{card.price}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveStyleFilter(card.id === 'personalizado' ? null : card.id);
                          setCurrentView('catalog');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="font-label-caps text-[10px] text-[#635d58] hover:text-[#1b1b21] hover:underline"
                        title="Ver en catálogo"
                      >
                        Obras
                      </button>
                      <span className="group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 text-[#71518c] font-bold">
                        <span>Personalizar</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BESTSELLERS CON CONFIGURADOR RÁPIDO */}
      <section className="w-full px-4 sm:px-8 lg:px-16 py-24 max-w-7xl mx-auto flex flex-col gap-12" id="bestsellers">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="font-label-caps text-xs uppercase text-[#71518c] tracking-widest font-bold">
              Creaciones Más Codiciadas
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#1b1b21]">
              Bestsellers del Atelier
            </h2>
          </div>
          <p className="font-body-md text-sm text-[#635d58] max-w-md">
            Cada set contiene 10 uñas a medida personal o kit completo de 24 piezas universales para regalo.
          </p>
        </div>

        {/* 3 Bestseller Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              id: 'nacar-botanique',
              title: 'Aura Botanique',
              desc: 'Follaje pintado en pincel 000, perlas barrocas minúsculas y ribete de oro rosa.',
              badge: 'Top #1 Ventas',
              rating: '4.9 (89)',
              price: 18,
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDylw5AvVY4-T_MdS1WRlUL_1AovPys4D9lQfHqjfuqOyGlmEW2GjCrwDjXO2VLKFUslMBOb2PUsMdCWne_-txn_J2pk8Za06QBvSbGdWbpwhJmfG8IpynLhr7Es45Ed87LgM_sU03aiwW88Ch_U5OJkVBEf3Mekp1iIjwGBmImbzVW4bkI9ah0eP-pANHMqmn2IMVtuJgS6Rc762t9twLexHGGf4kp4HWuleM3cRioL98NYyMRDpEv'
            },
            {
              id: 'lagrimas-de-luna',
              title: 'Lágrimas de Luna',
              desc: 'Polvo de perla natural sobre base láctea cristalina y gotas 3D con destellos de luna.',
              badge: 'Favorito Novias',
              rating: '5.0 (62)',
              price: 18,
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZBtDEcN694vaKv5unfba2HRl-yJz69j3X_dcr6IIvnjT6vzyFD8MsxCHUew4BYK2E9_-JJq_nG3I-4DyODCuMGYXlIcNAaKLUfzOxCejYSTrkl7DAmFTfGA1CbTZ0Hx2USomGK7es-Bsdx3B4-gqYctTR3pU4sE5hK7jfmlsJSZ6yuieb6R1UMfpUJ8lRdI-1LHW7j7yMMaNZN-EpOHe49mYtX6nddn5ZQwyIFChH8bLINuVH2LJI'
            },
            {
              id: 'cuarzo-rosa-oro',
              title: 'Cuarzo Rosa & Oro',
              desc: 'Efecto mineral translúcido de cuarzo líquido con finas vetas de pan de oro de 18k.',
              badge: 'Edición Joya',
              rating: '4.8 (47)',
              price: 16,
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLrksRGDqCsvq4p5-O_cYes3X1UxBdgZ7NxrfpMMPEJtqc1AHsY48lSCDO2FkZujT4gite2c5CT2NG-n-TT6-56R9i6TcnCSyvuofcnkvBG146vEtG4_QLoATITVc_88CInjvJ_GwvCGc2RnTGWjLgLdTJ5J7gRkSdmjnidmPzQN9hEX9Nqrsldwp_h0pEczKRgLJo-M_D4xca7rQ1Vve2lB2nI4SHGICr6cC9R6kM3fcXGQPT7DCV'
            }
          ].map(prod => {
            const opts = bestsellerOptions[prod.id] || { shape: 'Almendra', length: 'Media' };
            const isWish = isInWishlist(prod.id);
            const isCurrentlyAdding = addingId === prod.id;

            return (
              <div
                key={prod.id}
                className="group flex flex-col rounded-3xl bg-white p-5 shadow-xs hover:shadow-xl transition-all duration-300 border border-[#d3c3ba]/30"
              >
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#efecf5] mb-5">
                  <img
                    src={prod.img}
                    alt={prod.title}
                    onClick={() => navigateToProduct(prod.id)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md font-label-caps text-[10px] uppercase text-[#765843] font-bold shadow-2xs">
                    {prod.badge}
                  </span>
                  <button
                    onClick={() => toggleWishlist(prod.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-[#1b1b21] hover:text-[#71518c] backdrop-blur-md transition-all cursor-pointer"
                  >
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        isWish ? 'text-[#ba1a1a]' : ''
                      }`}
                      style={{ fontVariationSettings: isWish ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#765843]">
                      <span className="material-symbols-outlined text-[16px]">star</span>
                      <span className="font-label-sm text-xs font-semibold">{prod.rating}</span>
                    </div>
                    <span className="font-headline-sm text-lg text-[#1b1b21] font-semibold">
                      {formatPrice(prod.price)}
                    </span>
                  </div>

                  <h3
                    onClick={() => navigateToProduct(prod.id)}
                    className="font-headline-sm text-lg text-[#1b1b21] hover:text-[#765843] transition-colors cursor-pointer"
                  >
                    {prod.title}
                  </h3>
                  <p className="font-body-sm text-xs text-[#4f453e] line-clamp-2 leading-relaxed">
                    {prod.desc}
                  </p>

                  {/* Inline Shape & Length Pickers */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-[#d3c3ba]/20">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-label-sm text-[#635d58]">Forma:</span>
                      <div className="flex gap-1.5">
                        {['Almendra', 'Coffin', 'Cuadrada'].map(sh => (
                          <button
                            key={sh}
                            type="button"
                            onClick={() => handleSelectBestsellerOption(prod.id, 'shape', sh)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-label-sm cursor-pointer transition-colors ${
                              opts.shape === sh
                                ? 'bg-[#ffdcc5] text-[#2b1606] font-semibold'
                                : 'bg-[#f5f2fb] text-[#635d58] hover:text-[#1b1b21]'
                            }`}
                          >
                            {sh}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="font-label-sm text-[#635d58]">Longitud:</span>
                      <div className="flex gap-1.5">
                        {['Corta', 'Media', 'Larga'].map(ln => (
                          <button
                            key={ln}
                            type="button"
                            onClick={() => handleSelectBestsellerOption(prod.id, 'length', ln)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-label-sm cursor-pointer transition-colors ${
                              opts.length === ln
                                ? 'bg-[#ffdcc5] text-[#2b1606] font-semibold'
                                : 'bg-[#f5f2fb] text-[#635d58] hover:text-[#1b1b21]'
                            }`}
                          >
                            {ln}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Add to order */}
                  <button
                    type="button"
                    disabled={isCurrentlyAdding}
                    onClick={() => handleBestsellerAdd(prod.id)}
                    className="mt-3 w-full py-3.5 rounded-full bg-[#765843] text-white font-label-md text-xs font-semibold flex items-center justify-center gap-2 shadow-xs hover:bg-[#5c412d] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isCurrentlyAdding ? 'done' : 'shopping_bag'}
                    </span>
                    <span>{isCurrentlyAdding ? '¡Añadido!' : 'Añadir al Pedido'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. GUÍA DE MEDIDAS RÁPIDA (DON NORMAN ERROR-FREE) */}
      <section className="w-full bg-[#efecf5]/60 py-20 px-4 sm:px-8 lg:px-16" id="guia-medidas-sec">
        <div className="max-w-7xl mx-auto flex flex-col gap-14">
          <div className="flex flex-col items-center text-center gap-3 max-w-2xl mx-auto">
            <span className="px-4 py-1.5 rounded-full bg-white text-[#765843] font-label-caps text-[11px] uppercase tracking-widest shadow-2xs font-semibold border border-[#d3c3ba]/30">
              Ajuste 100% Sin Errores
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#1b1b21]">
              Cómo Encontrar tu Talla en 60 Segundos
            </h2>
            <p className="font-body-lg text-sm sm:text-base text-[#4f453e]">
              Diseñado con principios ergonómicos para que jamás recibas una cápsula que no se fusione milimétricamente con tu lecho ungueal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white shadow-xs flex flex-col gap-4 relative border border-[#d3c3ba]/30">
              <div className="w-12 h-12 rounded-2xl bg-[#ffdcc5] text-[#2b1606] flex items-center justify-center font-headline-sm text-xl font-semibold">
                1
              </div>
              <h3 className="font-headline-sm text-lg text-[#1b1b21]">El Método de la Moneda / Tarjeta</h3>
              <p className="font-body-md text-xs sm:text-sm text-[#4f453e] leading-relaxed">
                Coloca una moneda de 1€ o tu tarjeta junto a tu mano plana sobre una mesa blanca iluminada. Es el calibrador óptico universal.
              </p>
              <div className="mt-auto pt-4 flex items-center gap-2 text-[#765843] font-label-sm text-xs">
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                <span>Escaneo con cámara de smartphone</span>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white shadow-xs flex flex-col gap-4 relative border border-[#d3c3ba]/30">
              <div className="w-12 h-12 rounded-2xl bg-[#f1daff] text-[#2a0a44] flex items-center justify-center font-headline-sm text-xl font-semibold">
                2
              </div>
              <h3 className="font-headline-sm text-lg text-[#1b1b21]">Lectura Milimétrica o Manual</h3>
              <p className="font-body-md text-xs sm:text-sm text-[#4f453e] leading-relaxed">
                Mide el ancho central con cinta de costura flexible (XS: 14/10/11/10/8mm). Si dudas entre 2 tallas, selecciona siempre la mayor.
              </p>
              <div className="mt-auto pt-4 flex items-center gap-2 text-[#71518c] font-label-sm text-xs">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Margen de error menor a 0.2mm</span>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white shadow-xs flex flex-col gap-4 relative border border-[#d3c3ba]/30">
              <div className="w-12 h-12 rounded-2xl bg-[#eae7ef] text-[#1b1b21] flex items-center justify-center font-headline-sm text-xl font-semibold">
                3
              </div>
              <h3 className="font-headline-sm text-lg text-[#1b1b21]">Kit Luxury Incluido Gratis</h3>
              <p className="font-body-md text-xs sm:text-sm text-[#4f453e] leading-relaxed">
                Cada estuche viene con pegamento médico de 3 semanas, 24 tabs adhesivas para eventos, lima de cristal bohemio, palito de madera y toallitas.
              </p>
              <div className="mt-auto pt-4 flex items-center gap-2 text-[#1b1b21] font-label-sm text-xs">
                <span className="material-symbols-outlined text-[18px]">card_giftcard</span>
                <span>Valorado en 14€ • Sin cargo</span>
              </div>
            </div>
          </div>

          {/* Sizing Kit Physical Order Bar */}
          <div className="p-6 md:p-8 rounded-3xl bg-white/90 backdrop-blur-xl shadow-md flex flex-col lg:flex-row items-center justify-between gap-6 border border-white/90">
            <div className="flex items-center gap-5">
              <div className="p-4 rounded-2xl bg-[#765843] text-white">
                <span className="material-symbols-outlined text-3xl">mail</span>
              </div>
              <div className="flex flex-col">
                <h4 className="font-headline-sm text-lg text-[#1b1b21]">
                  ¿Prefieres probarlas físicamente antes?
                </h4>
                <p className="font-body-sm text-xs text-[#4f453e]">
                  Pide nuestro Sizing Kit Físico por solo 4,90€ (incluye envío exprés y cupón de 5€ para tu primer set de autor).
                </p>
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
              className="px-8 py-3.5 rounded-full bg-[#1b1b21] text-white font-label-md text-xs font-semibold whitespace-nowrap hover:bg-[#765843] transition-colors shadow-md cursor-pointer"
            >
              Solicitar Sizing Kit Físico
            </button>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIOS: MANOS QUE INSPIRAN */}
      <section className="w-full px-4 sm:px-8 lg:px-16 py-24 max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="font-label-caps text-xs uppercase text-[#765843] tracking-widest font-bold">
              Testimonios Reales
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#1b1b21]">
              Manos que Inspiran
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-label-sm text-xs text-[#635d58]">Comparte tu estilo con</span>
            <span className="font-label-caps text-xs text-[#71518c] font-bold">#AtelierLAura</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-[#f5f2fb]/70 flex flex-col justify-between gap-6 shadow-xs border border-[#d3c3ba]/30">
            <div className="flex flex-col gap-3">
              <div className="flex text-[#765843]">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="font-body-md text-xs sm:text-sm text-[#1b1b21] italic leading-relaxed">
                "Las usé en mi boda civil y nadie creía que eran press-on. El relieve de las perlas y las hojas doradas es de museo. Me duraron intactas 18 días."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-[#ffdcc5] flex items-center justify-center font-label-md text-xs font-semibold text-[#765843]">
                CL
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-xs font-semibold text-[#1b1b21]">
                  Camila Lozano (26 años)
                </span>
                <span className="font-body-sm text-[11px] text-[#635d58]">
                  Diseñadora de Moda, Madrid
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#f5f2fb]/70 flex flex-col justify-between gap-6 shadow-xs border border-[#d3c3ba]/30">
            <div className="flex flex-col gap-3">
              <div className="flex text-[#765843]">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="font-body-md text-xs sm:text-sm text-[#1b1b21] italic leading-relaxed">
                "Como violinista no puedo tener uñas largas todo el tiempo. Con L'Aura me las pongo el fin de semana para conciertos y sesiones de fotos, y me las quito el domingo sin dañar mi uña natural."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-[#e0bbfe] flex items-center justify-center font-label-md text-xs font-semibold text-[#71518c]">
                VB
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-xs font-semibold text-[#1b1b21]">
                  Valentina Becker (22 años)
                </span>
                <span className="font-body-sm text-[11px] text-[#635d58]">
                  Música Clásica, Barcelona
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#f5f2fb]/70 flex flex-col justify-between gap-6 shadow-xs border border-[#d3c3ba]/30">
            <div className="flex flex-col gap-3">
              <div className="flex text-[#765843]">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="font-body-md text-xs sm:text-sm text-[#1b1b21] italic leading-relaxed">
                "La atención al cliente para medir la talla fue un 10/10. Mandé una foto con mi tarjeta y encajaron como si las hubiesen esculpido directamente en mis dedos."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-[#ffdcc5] flex items-center justify-center font-label-md text-xs font-semibold text-[#2b1606]">
                AR
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-xs font-semibold text-[#1b1b21]">
                  Ainara Rosales (31 años)
                </span>
                <span className="font-body-sm text-[11px] text-[#635d58]">
                  Directora de Arte, Valencia
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
