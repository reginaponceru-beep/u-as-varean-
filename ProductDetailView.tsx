import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { REVIEWS, STANDARD_SIZES } from '../data/products';
import { NailSize, TopCoatFinish, AdhesiveType } from '../types';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    setIsMeasuringGuideOpen,
    setIsMacroZoomOpen,
    setCurrentView,
    showToast
  } = useApp();

  // Configurator state
  const [shape, setShape] = useState<string>('Almendra Estilizada');
  const [length, setLength] = useState<string>('Media (21 mm)');
  const [size, setSize] = useState<NailSize>('S');
  const [sizeSpecs, setSizeSpecs] = useState<string>(STANDARD_SIZES.S);
  const [customMm, setCustomMm] = useState({
    thumb: 15,
    index: 11,
    middle: 12,
    ring: 11,
    pinky: 9
  });
  const [customAccordionOpen, setCustomAccordionOpen] = useState(false);
  const [finish, setFinish] = useState<TopCoatFinish>('Brillo Cristal');
  const [adhesive, setAdhesive] = useState<AdhesiveType>('Jelly Tabs (3-5 días)');

  // Main Image gallery
  const [activeImage, setActiveImage] = useState<string>(selectedProduct.image);
  const [activeThumbIndex, setActiveThumbIndex] = useState<number>(0);

  // Accordions
  const [openAccordion, setOpenAccordion] = useState<string | null>('accDetails');

  // Interactive zoom lens
  const imageBoxRef = useRef<HTMLDivElement>(null);
  const [zoomTransform, setZoomTransform] = useState<{ x: number; y: number; scale: number }>({
    x: 50,
    y: 50,
    scale: 1
  });

  const [isAdding, setIsAdding] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageBoxRef.current) return;
    const rect = imageBoxRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomTransform({ x, y, scale: 1.35 });
  };

  const handleMouseLeave = () => {
    setZoomTransform({ x: 50, y: 50, scale: 1 });
  };

  const handleSizeSelect = (s: NailSize) => {
    setSize(s);
    if (s !== 'custom') {
      setSizeSpecs(STANDARD_SIZES[s as keyof typeof STANDARD_SIZES]);
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);

    const effectiveSpecs =
      size === 'custom'
        ? `Custom (${customMm.thumb}-${customMm.index}-${customMm.middle}-${customMm.ring}-${customMm.pinky} mm)`
        : sizeSpecs;

    addToCart({
      productId: selectedProduct.id,
      name: selectedProduct.name,
      subtitle: selectedProduct.subtitle,
      price: selectedProduct.price,
      quantity: 1,
      shape: shape,
      length: length,
      size: size,
      sizeSpecs: effectiveSpecs,
      customMeasurements: size === 'custom' ? customMm : undefined,
      finish: finish,
      adhesive: adhesive,
      image: activeImage
    });

    if (navigator.vibrate) {
      navigator.vibrate([30, 20, 50]);
    }

    setTimeout(() => {
      setIsAdding(false);
    }, 1800);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${selectedProduct.name} - Atelier L'Aura`,
          text: `Descubre este set de uñas de presión de autor hecho a mano en gel estructurado.`,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Enlace copiado al portapapeles', undefined, 'info');
    }
  };

  const wishlisted = isInWishlist(selectedProduct.id);

  // Gallery images fallback if product has empty gallery
  const galleryItems =
    selectedProduct.galleryImages && selectedProduct.galleryImages.length > 0
      ? selectedProduct.galleryImages
      : [
          {
            url: selectedProduct.image,
            label: 'Luz Natural',
            alt: selectedProduct.name,
            description: 'En mano real con luz natural'
          },
          {
            url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBviEvDYrxjIPL8Raw7-bnZw7MpXwUFhrbh01lvtSYbL4qEuSqNMCRe5upxL36aoL734PsuwR0-j23dyqK0TRvDQiaf6QPxbLaU58kPIExerxfs8bF4CfmGzNQAHpuMr8iiWX_Jkpp2l281UsZGnMYS2rSGoBqgQtUU-9cM7fwGfhr1ERzitEb93RjTmbIqVwwVsFSIwNvcGEF4o9Z16sNkEhqLSgxyI0qwz1mun2Rw3cOAs8UtTD8u',
            label: 'Macrojoya',
            alt: 'Detalle de perlas y oro',
            description: 'Macro de alta precisión'
          },
          {
            url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5TMptsKyc3gqCsRf8CyDMoqSwWEjzmW1hjuBCH0J2oHjajEyyKajScVLvHFaA4SdhICyC8zyOjXNx-Ug3me-_numUBEI84N6VgowhfRQbV-xnY_9066D4pP_0-MwExwXRMYm4Yev7-wbCmJoE7esxH9YxMfuNo69ryCn-38KoNFb-Ab5gKxjBJgMPNHW-CLjKRNwsABda7--BhJ64UxmZfCFKUplctwzLpLGSgamR_HGpQrRz3PG-',
            label: 'Set Completo',
            alt: 'Set completo de 10 cápsulas',
            description: '10 cápsulas alineadas en terciopelo'
          },
          {
            url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvwFt4caW5HZfNkpj85oFaHs9woWurMm9Jpf_dx4jPqLblJTB3bH0Ru0eyhHBAAyM-S82QRlnMLPAkZeCI7ZeaCPBGRY5B_5UNIfQ9atTNn9E2uyix8ko94BcTg8zWf3FqvYp_brqbx_o3Lqwn7TZ32mYddD6XGKX__ituN-7YxbwC7K80MXA9iC0YlCk_IAClJH3WU0T2wj2AIkKWduhdOBZYtxTevtXQifTtv07nQ1xLyNkvQUP4',
            label: 'Kit Luxury',
            alt: 'Caja de presentación y kit',
            description: 'Kit de colocación luxury incluido'
          }
        ];

  return (
    <div className="flex flex-col w-full pb-20">
      <div className="relative w-full max-w-7xl mx-auto px-4 lg:px-12 py-8 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-[#ffdcc5]/25 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-1/3 -right-24 w-80 h-80 bg-[#f1daff]/30 rounded-full blur-[110px] pointer-events-none"></div>

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-8 text-[#635d58] font-label-sm text-xs">
          <button
            onClick={() => setCurrentView('home')}
            className="hover:text-[#765843] transition-colors cursor-pointer"
          >
            Atelier
          </button>
          <span className="text-[#cdc5be]">/</span>
          <button
            onClick={() => setCurrentView('catalog')}
            className="hover:text-[#765843] transition-colors cursor-pointer"
          >
            Alta Joyería en Uñas
          </button>
          <span className="text-[#cdc5be]">/</span>
          <span className="text-[#765843] font-semibold truncate max-w-xs sm:max-w-md">
            {selectedProduct.name}
          </span>
        </nav>

        {/* Main 12-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          {/* ================= LEFT: LUXURY GALLERY (7 cols on Desktop) ================= */}
          <div className="lg:col-span-7 flex flex-col gap-5 sticky top-28">
            {/* Big Zoom Showcase Container */}
            <div
              ref={imageBoxRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-[#efecf5] shadow-xl group cursor-crosshair border border-white/60"
            >
              <img
                src={activeImage}
                alt={selectedProduct.name}
                style={{
                  transformOrigin: `${zoomTransform.x}% ${zoomTransform.y}%`,
                  transform: `scale(${zoomTransform.scale})`
                }}
                className="w-full h-full object-cover transition-transform duration-300 ease-out select-none"
              />

              {/* Handcrafted Badge */}
              <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#71518c] animate-ping"></span>
                <span className="font-label-caps text-[10px] uppercase text-[#1b1b21] tracking-wider font-semibold">
                  100% Pincel Fino & Gel Constructor
                </span>
              </div>

              {/* Bottom Glass Tray: Shape Real-Time Inspection HUD */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/85 backdrop-blur-xl shadow-lg flex items-center justify-between border border-white/90">
                <div className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-[#765843] text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    auto_awesome
                  </span>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-sm text-[#1b1b21] font-semibold">
                      Forma: {shape}
                    </span>
                    <span className="font-label-sm text-xs text-[#635d58]">
                      Longitud: {length}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsMacroZoomOpen(true)}
                  className="px-3.5 py-1.5 rounded-full bg-[#eae7ef] hover:bg-[#765843] hover:text-white text-[#4f453e] font-label-sm text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <span className="material-symbols-outlined text-sm">zoom_in</span>
                  Macro 4K
                </button>
              </div>
            </div>

            {/* Thumbnails Gallery */}
            <div className="grid grid-cols-4 gap-3.5">
              {galleryItems.map((img, idx) => (
                <button
                  key={img.label}
                  onClick={() => {
                    setActiveImage(img.url);
                    setActiveThumbIndex(idx);
                  }}
                  className={`group relative aspect-square rounded-2xl overflow-hidden bg-[#efecf5] shadow-xs p-0.5 transition-all outline-none cursor-pointer border ${
                    activeThumbIndex === idx ? 'ring-2 ring-[#765843] border-transparent' : 'border-[#d3c3ba]/30'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.label}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-1.5 left-1.5 right-1.5 px-1 py-0.5 rounded bg-white/90 font-label-caps text-[9px] text-[#1b1b21] text-center truncate shadow-2xs">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Master Artisan Signature Bar */}
            <div className="p-5 rounded-2xl bg-white/80 shadow-xs border border-[#d3c3ba]/30 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#ffdcc5] flex items-center justify-center text-[#765843] font-headline-sm text-sm font-bold">
                  L'A
                </div>
                <div>
                  <p className="font-headline-sm text-sm text-[#1b1b21] font-semibold">
                    Trazado por Maestra Manicurista {selectedProduct.artisanName || 'Elena Valois'}
                  </p>
                  <p className="font-body-sm text-xs text-[#635d58]">
                    Tiempo de artesanía dedicado: {selectedProduct.artisanHours || 4.5} horas de pincel al óleo
                  </p>
                </div>
              </div>
              <span className="font-label-caps text-[10px] text-[#71518c] font-bold px-3 py-1 bg-[#f1daff]/60 rounded-full uppercase">
                Edición Limitada
              </span>
            </div>
          </div>

          {/* ================= RIGHT: CONFIGURATION & COMMERCE PANEL (5 cols) ================= */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Header & Price Glass Panel */}
            <div className="p-7 rounded-3xl bg-white/85 backdrop-blur-xl shadow-md border border-white/80 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-label-caps text-[10px] uppercase tracking-widest text-[#765843] font-bold">
                  {selectedProduct.subtitle}
                </span>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#eae7ef]">
                  <span
                    className="material-symbols-outlined text-[15px] text-[#765843]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="font-label-sm text-xs font-semibold text-[#1b1b21]">
                    {selectedProduct.rating}
                  </span>
                  <span
                    onClick={() => {
                      document.getElementById('reviews-gallery')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="font-body-sm text-[11px] text-[#635d58] underline cursor-pointer"
                  >
                    ({selectedProduct.reviewCount} fotos de clientas)
                  </span>
                </div>
              </div>

              <h1 className="font-headline-lg text-2xl sm:text-3xl text-[#1b1b21] leading-tight">
                {selectedProduct.name}
              </h1>

              <p className="font-body-md text-sm text-[#4f453e] leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Pricing tier */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="font-headline-lg text-3xl text-[#1b1b21] font-semibold">
                  {formatPrice(selectedProduct.price)}
                </span>
                <span className="font-label-md text-xs text-[#635d58]">IVA incluido</span>
              </div>

              {/* Split payment banner */}
              <div className="p-3 rounded-2xl bg-[#f5f2fb] flex items-center justify-between text-[#1b1b21] border border-[#d3c3ba]/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#71518c] text-lg">credit_card</span>
                  <span className="font-body-sm text-xs text-[#4f453e]">
                    Págalo en 3 plazos de{' '}
                    <strong className="font-semibold text-[#1b1b21]">
                      {formatPrice(Math.round((selectedProduct.price / 3) * 100) / 100)}
                    </strong>{' '}
                    sin intereses
                  </span>
                </div>
                <span className="font-label-caps text-[10px] text-[#71518c] font-bold">
                  Klarna / Clearpay
                </span>
              </div>
            </div>

            {/* ================= INTERACTIVE CONFIGURATOR ================= */}
            <div className="flex flex-col gap-6">
              {/* STEP 1: Forma de la Uña */}
              <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-lg shadow-sm border border-white/70 flex flex-col gap-3.5">
                <div className="flex items-center justify-between">
                  <label className="font-headline-sm text-sm text-[#1b1b21] font-semibold flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#ffdcc5] text-[#765843] text-xs flex items-center justify-center font-bold">
                      1
                    </span>
                    Elige la Forma
                  </label>
                  <span className="font-label-sm text-xs text-[#765843] font-medium">{shape}</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {/* Almendra */}
                  <button
                    type="button"
                    onClick={() => setShape('Almendra Estilizada')}
                    className={`group p-3.5 rounded-2xl flex flex-col items-center gap-2 transition-all cursor-pointer ${
                      shape === 'Almendra Estilizada'
                        ? 'bg-[#765843] text-white shadow-md'
                        : 'bg-white text-[#1b1b21] shadow-xs hover:shadow-md border border-[#d3c3ba]/30'
                    }`}
                  >
                    <svg className="w-8 h-10 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 32 44">
                      <path
                        d="M16 2C22 10 26 24 26 38C26 41 21 42 16 42C11 42 6 41 6 38C6 24 10 10 16 2Z"
                        fill="currentColor"
                        fillOpacity="0.25"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    <span className="font-label-md text-xs font-semibold">Almendra</span>
                    <span className="font-label-caps text-[9px] uppercase tracking-wider opacity-80">
                      Efecto Alargado
                    </span>
                  </button>

                  {/* Coffin */}
                  <button
                    type="button"
                    onClick={() => setShape('Coffin Bailarina')}
                    className={`group p-3.5 rounded-2xl flex flex-col items-center gap-2 transition-all cursor-pointer ${
                      shape === 'Coffin Bailarina'
                        ? 'bg-[#765843] text-white shadow-md'
                        : 'bg-white text-[#1b1b21] shadow-xs hover:shadow-md border border-[#d3c3ba]/30'
                    }`}
                  >
                    <svg className="w-8 h-10 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 32 44">
                      <path
                        d="M11 2H21L26 38C26 41 21 42 16 42C11 42 6 41 6 38L11 2Z"
                        fill="currentColor"
                        fillOpacity="0.15"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    <span className="font-label-md text-xs font-semibold">Coffin</span>
                    <span className="font-label-caps text-[9px] uppercase tracking-wider opacity-60">
                      Runway Chic
                    </span>
                  </button>

                  {/* Cuadrada */}
                  <button
                    type="button"
                    onClick={() => setShape('Cuadrada Suave')}
                    className={`group p-3.5 rounded-2xl flex flex-col items-center gap-2 transition-all cursor-pointer ${
                      shape === 'Cuadrada Suave'
                        ? 'bg-[#765843] text-white shadow-md'
                        : 'bg-white text-[#1b1b21] shadow-xs hover:shadow-md border border-[#d3c3ba]/30'
                    }`}
                  >
                    <svg className="w-8 h-10 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 32 44">
                      <path
                        d="M7 3C7 2.5 7.5 2 8 2H24C24.5 2 25 2.5 25 3V38C25 41 21 42 16 42C11 42 7 41 7 38V3Z"
                        fill="currentColor"
                        fillOpacity="0.15"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    <span className="font-label-md text-xs font-semibold">Cuadrada</span>
                    <span className="font-label-caps text-[9px] uppercase tracking-wider opacity-60">
                      Squoval
                    </span>
                  </button>
                </div>
              </div>

              {/* STEP 2: Longitud Milimétrica */}
              <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-lg shadow-sm border border-white/70 flex flex-col gap-3.5">
                <div className="flex items-center justify-between">
                  <label className="font-headline-sm text-sm text-[#1b1b21] font-semibold flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#ffdcc5] text-[#765843] text-xs flex items-center justify-center font-bold">
                      2
                    </span>
                    Longitud Deseada
                  </label>
                  <span className="font-label-sm text-xs text-[#765843] font-medium">{length}</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'Corta (16 mm)', label: 'Corta', mm: '16 mm', fill: 'w-1/3' },
                    { id: 'Media (21 mm)', label: 'Media', mm: '21 mm', fill: 'w-2/3' },
                    { id: 'Larga (26 mm)', label: 'Larga', mm: '26 mm', fill: 'w-full' }
                  ].map(len => (
                    <button
                      key={len.id}
                      type="button"
                      onClick={() => setLength(len.id)}
                      className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        length === len.id
                          ? 'bg-[#765843] text-white shadow-md'
                          : 'bg-white hover:bg-[#f5f2fb] text-[#1b1b21] border border-[#d3c3ba]/30 shadow-xs'
                      }`}
                    >
                      <span className="font-label-md text-xs font-semibold">{len.label}</span>
                      <span className="font-body-sm text-[11px] opacity-80">{len.mm}</span>
                      <div className="w-12 h-1.5 rounded-full bg-black/10 overflow-hidden">
                        <div
                          className={`h-full ${
                            length === len.id ? 'bg-white' : 'bg-[#765843]'
                          } ${len.fill}`}
                        ></div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 3: Talla de tu Set */}
              <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-lg shadow-sm border border-white/70 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <label className="font-headline-sm text-sm text-[#1b1b21] font-semibold flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#ffdcc5] text-[#765843] text-xs flex items-center justify-center font-bold">
                      3
                    </span>
                    Talla de tu Set
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsMeasuringGuideOpen(true)}
                    className="text-[#765843] font-label-sm text-xs font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">straighten</span>
                    ¿Cómo medir en 1 min?
                  </button>
                </div>

                {/* Standard Sizes */}
                <div className="grid grid-cols-4 gap-2.5">
                  {[
                    { id: 'XS', sub: 'Extra Pequeña' },
                    { id: 'S', sub: 'Más común' },
                    { id: 'M', sub: 'Estándar' },
                    { id: 'L', sub: 'Amplia' }
                  ].map(sz => (
                    <button
                      key={sz.id}
                      type="button"
                      onClick={() => handleSizeSelect(sz.id as NailSize)}
                      className={`p-3 rounded-2xl flex flex-col items-center transition-all cursor-pointer ${
                        size === sz.id
                          ? 'bg-[#765843] text-white shadow-md'
                          : 'bg-white text-[#1b1b21] hover:shadow-md border border-[#d3c3ba]/30 shadow-xs'
                      }`}
                    >
                      <span className="font-headline-sm text-sm font-bold">{sz.id}</span>
                      <span className="font-label-caps text-[9px] opacity-75 mt-0.5">{sz.sub}</span>
                    </button>
                  ))}
                </div>

                {/* Active Size Millimeter Spec Display */}
                <div className="p-3 rounded-2xl bg-[#f5f2fb] flex items-center justify-between text-[#1b1b21]">
                  <span className="font-label-caps text-[10px] text-[#635d58] uppercase">
                    Medidas Pulgar a Meñique:
                  </span>
                  <span className="font-body-md text-xs font-mono font-semibold text-[#765843]">
                    {sizeSpecs}
                  </span>
                </div>

                {/* Custom Size Accordion */}
                <div className="flex flex-col gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setCustomAccordionOpen(prev => !prev)}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-[#efecf5] hover:bg-[#eae7ef] transition-colors cursor-pointer text-left"
                  >
                    <span className="font-label-md text-xs text-[#1b1b21] font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#71518c] text-base">tune</span>
                      ¿Tus uñas no coinciden? Medidas Personalizadas (Gratis)
                    </span>
                    <span
                      className={`material-symbols-outlined text-[#4f453e] transition-transform ${
                        customAccordionOpen ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  {customAccordionOpen && (
                    <div className="grid grid-cols-5 gap-2 p-3 bg-white rounded-2xl border border-[#d3c3ba]/30">
                      {[
                        { key: 'thumb', label: 'Pulgar' },
                        { key: 'index', label: 'Índice' },
                        { key: 'middle', label: 'Medio' },
                        { key: 'ring', label: 'Anular' },
                        { key: 'pinky', label: 'Meñique' }
                      ].map(f => (
                        <div key={f.key} className="flex flex-col gap-1 items-center">
                          <label className="font-label-caps text-[10px] text-[#635d58]">
                            {f.label}
                          </label>
                          <input
                            type="number"
                            min="8"
                            max="22"
                            value={customMm[f.key as keyof typeof customMm]}
                            onChange={e => {
                              const val = Number(e.target.value);
                              setCustomMm(prev => ({ ...prev, [f.key]: val }));
                              setSize('custom');
                            }}
                            className="w-full text-center py-1.5 px-1 rounded-xl bg-[#efecf5] font-mono text-xs text-[#1b1b21] focus:outline-none focus:ring-1 focus:ring-[#765843]"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* STEP 4 & 5: Acabado y Fijación Incluida */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Finish */}
                <div className="p-5 rounded-3xl bg-white/80 backdrop-blur-lg shadow-sm border border-white/70 flex flex-col gap-3">
                  <label className="font-headline-sm text-xs text-[#1b1b21] font-semibold flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#ffdcc5] text-[#765843] text-[10px] flex items-center justify-center font-bold">
                      4
                    </span>
                    Acabado Top Coat
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Brillo Cristal', 'Mate Seda'] as const).map(f => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFinish(f)}
                        className={`p-2.5 rounded-2xl text-center font-label-md text-xs transition-all cursor-pointer ${
                          finish === f
                            ? 'bg-[#765843] text-white shadow-sm font-semibold'
                            : 'bg-white text-[#1b1b21] border border-[#d3c3ba]/30 hover:bg-[#eae7ef]'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Adhesive */}
                <div className="p-5 rounded-3xl bg-white/80 backdrop-blur-lg shadow-sm border border-white/70 flex flex-col gap-3">
                  <label className="font-headline-sm text-xs text-[#1b1b21] font-semibold flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#ffdcc5] text-[#765843] text-[10px] flex items-center justify-center font-bold">
                      5
                    </span>
                    Adhesivo de Regalo
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAdhesive('Jelly Tabs (3-5 días)')}
                      className={`p-2 rounded-2xl text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                        adhesive === 'Jelly Tabs (3-5 días)'
                          ? 'bg-[#765843] text-white shadow-sm font-semibold'
                          : 'bg-white text-[#1b1b21] border border-[#d3c3ba]/30 hover:bg-[#eae7ef]'
                      }`}
                    >
                      <span className="font-label-sm text-xs">Jelly Tabs</span>
                      <span className="font-label-caps text-[8px] opacity-80">3-5 Días (Cero Daño)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAdhesive('Pegamento Médico (+3 semanas)')}
                      className={`p-2 rounded-2xl text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                        adhesive === 'Pegamento Médico (+3 semanas)'
                          ? 'bg-[#765843] text-white shadow-sm font-semibold'
                          : 'bg-white text-[#1b1b21] border border-[#d3c3ba]/30 hover:bg-[#eae7ef]'
                      }`}
                    >
                      <span className="font-label-sm text-xs">Pegamento PRO</span>
                      <span className="font-label-caps text-[8px] opacity-80">+3 Semanas</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* PRIMARY COMMERCE CTA & ACTIONS */}
              <div className="flex flex-col gap-3.5 pt-2">
                <button
                  type="button"
                  disabled={isAdding}
                  onClick={handleAddToCart}
                  className={`w-full py-4 px-8 rounded-full text-white font-label-md text-sm font-semibold tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group cursor-pointer ${
                    isAdding ? 'bg-[#436850]' : 'bg-[#1b1b21] hover:bg-[#765843]'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl transition-transform group-hover:scale-110">
                    {isAdding ? 'check_circle' : 'shopping_bag'}
                  </span>
                  <span>
                    {isAdding
                      ? '¡Añadido a tu Joyero!'
                      : `Añadir a la Bolsa de Lujo • ${formatPrice(selectedProduct.price)}`}
                  </span>
                </button>

                {/* Secondary Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className="py-3 px-4 rounded-full bg-white text-[#1b1b21] hover:bg-[#eae7ef] font-label-md text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-2 border border-[#d3c3ba]/30 cursor-pointer"
                  >
                    <span
                      className={`material-symbols-outlined text-lg ${
                        wishlisted ? 'text-[#ba1a1a]' : 'text-[#71518c]'
                      }`}
                      style={{ fontVariationSettings: wishlisted ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                    <span>{wishlisted ? 'Guardado en Favoritos' : 'Guardar en Favoritos'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleShare}
                    className="py-3 px-4 rounded-full bg-white text-[#1b1b21] hover:bg-[#eae7ef] font-label-md text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-2 border border-[#d3c3ba]/30 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg text-[#765843]">share</span>
                    <span>Compartir Set</span>
                  </button>
                </div>
              </div>

              {/* Shipping and Fit badges */}
              <div className="p-4 rounded-2xl bg-[#f5f2fb] flex items-center justify-between text-xs text-[#4f453e] border border-[#d3c3ba]/25">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#765843] text-lg">local_shipping</span>
                  <span>Entrega estimada: <strong>48-72h en España</strong></span>
                </div>
                <div className="flex items-center gap-1 text-[#71518c] font-semibold">
                  <span className="material-symbols-outlined text-base">verified</span>
                  Garantía de Ajuste
                </div>
              </div>

              {/* Accordions */}
              <div className="flex flex-col gap-3 pt-2">
                {/* 1. Detalles del Arte */}
                <div className="rounded-3xl bg-white/80 shadow-xs border border-[#d3c3ba]/30 overflow-hidden">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenAccordion(openAccordion === 'accDetails' ? null : 'accDetails')
                    }
                    className="w-full p-4 px-5 text-left flex items-center justify-between hover:bg-[#f5f2fb] transition-colors cursor-pointer"
                  >
                    <span className="font-headline-sm text-sm text-[#1b1b21] font-semibold flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#765843] text-xl">palette</span>
                      Detalles del Arte & Materiales Nobles
                    </span>
                    <span
                      className={`material-symbols-outlined text-[#4f453e] transition-transform ${
                        openAccordion === 'accDetails' ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {openAccordion === 'accDetails' && (
                    <div className="px-5 pb-5 pt-1 text-[#4f453e] font-body-sm text-xs flex flex-col gap-2.5 border-t border-[#d3c3ba]/20 leading-relaxed">
                      <p>
                        • <strong>Cápsulas Esculpidas:</strong> Soft Gel coreano de 7 capas con curva en C anatómica, imitando la flexibilidad y resistencia de la uña esculpida en salón.
                      </p>
                      <p>
                        • <strong>Pintado a Mano Alzada:</strong> Ramilletes botánicos y nervaduras en acrílico japonés de alta densidad. Cada trazo es único y firmado por la artista.
                      </p>
                      <p>
                        • <strong>Joyería Incorporada:</strong> Micro-perlas de agua dulce sintéticas con triple sellado de resina UV para evitar enganches con prendas finas de lana o seda.
                      </p>
                      <p>
                        • <strong>Reutilizables:</strong> Diseñadas para ser usadas más de 10 veces si se utilizan las pestañas adhesivas Jelly de nuestro kit.
                      </p>
                    </div>
                  )}
                </div>

                {/* 2. Colocación y Retiro */}
                <div className="rounded-3xl bg-white/80 shadow-xs border border-[#d3c3ba]/30 overflow-hidden">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenAccordion(openAccordion === 'accApplication' ? null : 'accApplication')
                    }
                    className="w-full p-4 px-5 text-left flex items-center justify-between hover:bg-[#f5f2fb] transition-colors cursor-pointer"
                  >
                    <span className="font-headline-sm text-sm text-[#1b1b21] font-semibold flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#765843] text-xl">sanitizer</span>
                      Cómo Colocar y Retirar sin Dañar tu Uña Natural
                    </span>
                    <span
                      className={`material-symbols-outlined text-[#4f453e] transition-transform ${
                        openAccordion === 'accApplication' ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {openAccordion === 'accApplication' && (
                    <div className="px-5 pb-5 pt-1 text-[#4f453e] font-body-sm text-xs flex flex-col gap-2.5 border-t border-[#d3c3ba]/20 leading-relaxed">
                      <div className="p-3 bg-[#f5f2fb] rounded-xl mb-1">
                        <p className="font-semibold text-[#1b1b21] mb-1">Kit de Colocación Luxury Incluido:</p>
                        <p className="text-[11px] text-[#635d58]">
                          Lima de cristal templado bohemio, palito de naranjo de madera de cedro, toallitas deshidratadoras de alcohol isopropílico y adhesivo de resina médica.
                        </p>
                      </div>
                      <p>
                        <strong>1. Preparación (1 min):</strong> Empuja suavemente la cutícula, pule sutilmente la lámina ungueal con la lima de cristal y limpia con la toallita deshidratadora.
                      </p>
                      <p>
                        <strong>2. Aplicación (3 min):</strong> Selecciona el adhesivo según la duración deseada. Presiona la cápsula en un ángulo de 45° desde la cutícula hacia el borde libre y mantén durante 30 segundos.
                      </p>
                      <p>
                        <strong>3. Retiro indoloro:</strong> Remoja tus manos en agua tibia con jabón suave y aceite por 10 minutos. Se despegarán sin quebrar ni debilitar tu lecho ungueal.
                      </p>
                    </div>
                  )}
                </div>

                {/* 3. Garantía */}
                <div className="rounded-3xl bg-white/80 shadow-xs border border-[#d3c3ba]/30 overflow-hidden">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenAccordion(openAccordion === 'accShipping' ? null : 'accShipping')
                    }
                    className="w-full p-4 px-5 text-left flex items-center justify-between hover:bg-[#f5f2fb] transition-colors cursor-pointer"
                  >
                    <span className="font-headline-sm text-sm text-[#1b1b21] font-semibold flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#765843] text-xl">verified_user</span>
                      Garantía "Ajuste Perfecto o Reposición Gratuita"
                    </span>
                    <span
                      className={`material-symbols-outlined text-[#4f453e] transition-transform ${
                        openAccordion === 'accShipping' ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {openAccordion === 'accShipping' && (
                    <div className="px-5 pb-5 pt-1 text-[#4f453e] font-body-sm text-xs flex flex-col gap-2.5 border-t border-[#d3c3ba]/20 leading-relaxed">
                      <p>
                        En el Atelier L'Aura no permitimos que ninguna pieza quede olvidada en el joyero. Si alguna de tus uñas no encaja a la perfección con tu lecho ungueal, te fabricamos y enviamos <strong>hasta 2 uñas de reemplazo personalizadas sin costo alguno</strong>.
                      </p>
                      <p>
                        <strong>Envíos:</strong> Embalaje acolchado en caja de lujo con precinto lacrado. Seguimiento en tiempo real vía SMS y correo electrónico.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SOCIAL PROOF: VERIFIED CUSTOMER REVIEWS ================= */}
        <section className="mt-20 pt-12 bg-[#f5f2fb]/60 rounded-3xl p-8 lg:p-12 border border-[#d3c3ba]/25" id="reviews-gallery">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="font-label-caps text-xs uppercase text-[#765843] tracking-widest font-bold">
                Voces de Nuestra Comunidad
              </span>
              <h2 className="font-headline-md text-2xl text-[#1b1b21] mt-1">
                184 Reseñas con Galería Real
              </h2>
              <p className="font-body-md text-sm text-[#4f453e]">
                Clientas de alta costura luciendo el Set {selectedProduct.name} en eventos, bodas y el día a día.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-headline-md text-2xl text-[#1b1b21] font-semibold leading-none">
                  4.9 / 5.0
                </p>
                <p className="font-label-caps text-[10px] text-[#635d58] uppercase mt-1">
                  99% recomendaría el Atelier
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#765843] text-white flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-2xl">thumb_up</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map(rev => (
              <div
                key={rev.id}
                className="p-6 rounded-3xl bg-white shadow-xs border border-[#d3c3ba]/25 flex flex-col justify-between gap-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full ${rev.avatarBg} font-bold text-xs flex items-center justify-center`}>
                      {rev.initials}
                    </div>
                    <div>
                      <p className="font-label-md text-xs font-semibold text-[#1b1b21]">{rev.author}</p>
                      <p className="font-label-caps text-[9px] text-[#635d58]">
                        Compradora Verificada • {rev.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex text-[#765843]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                </div>

                <p className="font-body-md text-xs text-[#4f453e] italic leading-relaxed">
                  "{rev.comment}"
                </p>

                {rev.image && (
                  <div className="h-32 w-full rounded-2xl overflow-hidden bg-[#efecf5]">
                    <img
                      src={rev.image}
                      alt={`Foto de ${rev.author}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
