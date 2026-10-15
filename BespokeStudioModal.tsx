import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { NailShape, NailSize, TopCoatFinish } from '../types';

export type ArtStyleId = 'minimalista' | 'elegante' | 'tierno' | 'artistico' | 'llamativo' | 'personalizado';

interface StyleConfig {
  id: ArtStyleId;
  name: string;
  badge: string;
  subtitle: string;
  manifesto: string;
  basePrice: number;
  icon: string;
  accentColor: string;
  defaultShape: NailShape;
  defaultLength: string;
  tones: { name: string; bg: string; border: string; accent: string }[];
  elements: string[];
  recommendedCatalogPiece?: string;
}

const STYLE_CONFIGS: Record<ArtStyleId, StyleConfig> = {
  minimalista: {
    id: 'minimalista',
    name: 'Estudio Minimalista',
    badge: '01 • Sutil',
    subtitle: 'Lujo Silencioso & Línea Fina',
    manifesto: 'Líneas puras, degradado aura nude y acentos de pan de oro líquido imperceptibles a la prisa.',
    basePrice: 12,
    icon: 'nature',
    accentColor: '#765843',
    defaultShape: 'square-soft',
    defaultLength: 'Corta (16 mm)',
    tones: [
      { name: 'Nude Porcelana', bg: '#fdf9f5', border: '#e8dfd8', accent: '#c5a087' },
      { name: 'Vainilla Lechoso', bg: '#fbf5ea', border: '#e6dac8', accent: '#765843' },
      { name: 'Blush Translúcido', bg: '#fcf0ea', border: '#eed5c9', accent: '#966e54' },
      { name: 'Seda Cruda', bg: '#f6f2ed', border: '#ded5cb', accent: '#635d58' }
    ],
    elements: [
      'Micro-perla solitaria en lúnula',
      'Línea francesa ultrafina 0.2mm',
      'Hojilla de oro flotante',
      'Degradado aura nude sutil',
      'Acabado porcelana lechosa'
    ],
    recommendedCatalogPiece: 'Perle Minimaliste'
  },
  elegante: {
    id: 'elegante',
    name: 'Estudio Elegante',
    badge: '02 • Perlado',
    subtitle: 'Perlado, Baby Boomer & Filigrana',
    manifesto: 'Baby boomer con nácar de ostra molido, baño de micrón dorado y perlas de micro-engarce.',
    basePrice: 15,
    icon: 'diamond',
    accentColor: '#765843',
    defaultShape: 'almond',
    defaultLength: 'Media (21 mm)',
    tones: [
      { name: 'Perla Marina', bg: '#fbf9f5', border: '#ede2d5', accent: '#c5a087' },
      { name: 'Champán Satin', bg: '#f8f1e6', border: '#e2cfb8', accent: '#765843' },
      { name: 'Rosa Marfil', bg: '#fdf1eb', border: '#eed6cc', accent: '#9c6f55' },
      { name: 'Nácar Glazed', bg: '#f6f3f8', border: '#dcd1e8', accent: '#71518c' }
    ],
    elements: [
      'Micro-racimos de perlas de río',
      'Hilos de oro 18K engastados',
      'Degradado baby boomer nacarado',
      'Glazed donut nácar radiante',
      'Biselado dorado perimetral'
    ],
    recommendedCatalogPiece: 'Flora Perlée d\'Or'
  },
  tierno: {
    id: 'tierno',
    name: 'Estudio Tierno',
    badge: '03 • Pastel',
    subtitle: 'Pastel, Encanto & Coquette Couture',
    manifesto: 'Pasteles etéreos translúcidos, lazos coquette esculpidos en 3D y corazones de cuarzo rosa.',
    basePrice: 14,
    icon: 'favorite',
    accentColor: '#71518c',
    defaultShape: 'almond',
    defaultLength: 'Media (21 mm)',
    tones: [
      { name: 'Rosa Algodón', bg: '#fdebf2', border: '#f3c2d6', accent: '#c0628e' },
      { name: 'Lavanda Nube', bg: '#f3eafc', border: '#d9bbf5', accent: '#71518c' },
      { name: 'Mantequilla Pastel', bg: '#fef7e6', border: '#f2e0b6', accent: '#b08b3e' },
      { name: 'Blush Coral Suave', bg: '#fdf0ea', border: '#f3cfc0', accent: '#a66952' }
    ],
    elements: [
      'Lazos coquette 3D en gel cuarzo',
      'Corazones de ópalo en relieve',
      'Mini perlas de río saladas',
      'Trama de encaje de Calais',
      'Efecto jelly translúcido'
    ],
    recommendedCatalogPiece: 'Dentelle de Marie'
  },
  artistico: {
    id: 'artistico',
    name: 'Estudio Artístico',
    badge: '04 • Escultura',
    subtitle: 'Micro-óleo, Escultura 3D & Mineral',
    manifesto: 'Trazos de pincel al óleo minucioso, herbarios botánicos renacentistas y mármol fluido.',
    basePrice: 17,
    icon: 'draw',
    accentColor: '#765843',
    defaultShape: 'stiletto',
    defaultLength: 'Larga (26 mm)',
    tones: [
      { name: 'Alabastro Translúcido', bg: '#faf6f0', border: '#e6ded1', accent: '#765843' },
      { name: 'Verde Salvia Imperial', bg: '#eef3ee', border: '#c7d6c7', accent: '#436850' },
      { name: 'Ámbar Profundo', bg: '#f3e5d7', border: '#d9beaa', accent: '#694931' },
      { name: 'Cuarzo Mineral', bg: '#f6f0f4', border: '#dfcee0', accent: '#71518c' }
    ],
    elements: [
      'Micropintura de orquídeas al óleo',
      'Filigrana barroca en relieve 3D',
      'Gotas de rocío vítreas',
      'Láminas de oro puro 18K',
      'Vetas minerales de cuarzo líquido'
    ],
    recommendedCatalogPiece: 'Émeraude Botanique'
  },
  llamativo: {
    id: 'llamativo',
    name: 'Estudio Llamativo',
    badge: '05 • Joyas',
    subtitle: 'Maxi Cristales, Chrome & Alta Joyería',
    manifesto: 'Chrome prismático ultra-reflejante, siluetas stiletto afiladas y engarces barrocos con gemas.',
    basePrice: 18,
    icon: 'flare',
    accentColor: '#71518c',
    defaultShape: 'stiletto',
    defaultLength: 'Larga (26 mm)',
    tones: [
      { name: 'Chrome Espejo Plata', bg: '#eceef5', border: '#c3cadb', accent: '#5c6985' },
      { name: 'Violeta Holográfico', bg: '#f0e2fc', border: '#d1b2f2', accent: '#71518c' },
      { name: 'Oro Puro Metálico', bg: '#faedd9', border: '#e8c996', accent: '#8f6826' },
      { name: 'Obsidian Velvet', bg: '#f0edf5', border: '#bcb5c7', accent: '#303036' }
    ],
    elements: [
      'Maxi cristales Swarovski engarzados',
      'Lágrimas 3D metalizadas',
      'Efecto chrome prismático espejo',
      'Relieve barroco dorado',
      'Dijes de microjoyería suspendidos'
    ],
    recommendedCatalogPiece: 'Aura Améthyste Royale'
  },
  personalizado: {
    id: 'personalizado',
    name: 'Estudio Bespoke 3D',
    badge: '06 • Bespoke 1 de 1',
    subtitle: 'Pieza Exclusiva de Autor',
    manifesto: 'Tu concepto, tablero de Pinterest o vestido de gala llevado al lienzo milimétrico por nuestras maestras.',
    basePrice: 20,
    icon: 'fingerprint',
    accentColor: '#765843',
    defaultShape: 'almond',
    defaultLength: 'Media (21 mm)',
    tones: [
      { name: 'Milky Pearl', bg: '#fbf8f5', border: '#e8dfd8', accent: '#c5a087' },
      { name: 'Rose Opal', bg: '#fdeee8', border: '#f3c7b6', accent: '#765843' },
      { name: 'Lavande Aura', bg: '#f2e8fc', border: '#d9b9f5', accent: '#71518c' },
      { name: 'Café Ambré', bg: '#ece1d7', border: '#c9af99', accent: '#5c412d' },
      { name: 'Vert Sauge', bg: '#e5ece5', border: '#b2c8b2', accent: '#436850' }
    ],
    elements: [
      'Micro-óleo botánico renacentista',
      'Pan de oro 18K / 24K',
      'Perlas de río 3D engarzadas',
      'Lazos Coquette 3D en gel',
      'Gotas de rocío vítreas',
      'Filigrana barroca en relieve'
    ],
    recommendedCatalogPiece: 'Flora Perlée d\'Or'
  }
};

export const BespokeStudioModal: React.FC = () => {
  const {
    isBespokeStudioOpen,
    closeStyleStudio,
    activeStudioStyle,
    openStyleStudio,
    addToCart,
    formatPrice,
    setCurrentView,
    setActiveStyleFilter
  } = useApp();

  const currentStyleId: ArtStyleId = activeStudioStyle || 'personalizado';
  const config = STYLE_CONFIGS[currentStyleId] || STYLE_CONFIGS.personalizado;

  const [shape, setShape] = useState<NailShape>(config.defaultShape);
  const [baseTone, setBaseTone] = useState<string>(config.tones[0].name);
  const [length, setLength] = useState<string>(config.defaultLength);
  const [elements, setElements] = useState<string[]>([config.elements[0], config.elements[1]]);
  const [finish, setFinish] = useState<TopCoatFinish>('Brillo Cristal');
  const [size, setSize] = useState<NailSize>('S');
  const [notes, setNotes] = useState<string>('');

  // Sync with style change
  useEffect(() => {
    if (config) {
      setShape(config.defaultShape);
      setBaseTone(config.tones[0].name);
      setLength(config.defaultLength);
      setElements([config.elements[0], config.elements[1]]);
    }
  }, [currentStyleId]);

  if (!isBespokeStudioOpen) return null;

  const currentToneObj =
    config.tones.find(t => t.name === baseTone) || config.tones[0];

  const toggleElement = (elem: string) => {
    setElements(prev =>
      prev.includes(elem) ? prev.filter(e => e !== elem) : [...prev, elem]
    );
  };

  const calculatedPrice = config.basePrice + Math.max(0, elements.length - 2) * 1.5;

  const handleCreateOrder = () => {
    addToCart({
      productId: `studio-${currentStyleId}-${Date.now()}`,
      name: `Cápsula ${config.name.replace('Estudio ', '')} (${baseTone} • ${shape.toUpperCase()})`,
      subtitle: `${config.subtitle} • ${elements.join(', ')}`,
      price: calculatedPrice,
      quantity: 1,
      shape:
        shape === 'almond'
          ? 'Almendra'
          : shape === 'coffin'
          ? 'Coffin Bailarina'
          : shape === 'stiletto'
          ? 'Stiletto'
          : 'Cuadrada Soft',
      length: length,
      size: size,
      sizeSpecs: `${size.toUpperCase()} (${length})`,
      finish: finish,
      adhesive: 'Jelly Tabs (3-5 días)',
      image:
        currentStyleId === 'minimalista'
          ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsJYWP9nHuuoa9hKP6FAYKA00z2SmtOyXNVitj_dbYG-Zxk8Oxv4eb1KEAJ_HAAGmeB5C_x8uf3O_Q79EET7OuweAh8w97DvAKac2sayfdw3s3u8ryzFUkcgjLH3s4Wi8nNnUAlp-RJ8EEZo4MUz0rIcL91nUpOtgIX1B68uuxz7BQcxPhtm3rPCHgc4RQnzYqLNXks6uQfS8hNxNVBOZm1i5s-BqQBneTpkjRYj0tRFMgIHwxTi1b'
          : currentStyleId === 'elegante'
          ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuAD8ioXoUN5oDD1ZJkAEbcQFH2V7kc9NGXmlvFEF-Pps4YuCKZRe53-ePrTYriEfWfjXFBJ-W0FvCYU9ZGRZAQPEwnQEl3kGemverOVj8fwghMKqXVrYaaRaYtbdLaQvGvyrSynvZcmASp6tNVJqYGecSkS9bAv9XtWchgqoytNIJY8H-LG0GeLx_G8dJhix2FJ2BgmI2PY8JKM5rciPPmFOuWb6HfsRWxxMV0wubC1azhC_xEL4r91'
          : currentStyleId === 'tierno'
          ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMr_AnZNKVUwhHQ6RJ0ijaCcokG1SQdayb6n1MRJES5gQuSHiqMsgIf1U01V4OLzcRpWsrgT7IQRYjMtGt7rkCx2gUV8-dt-qspZbLvebCAdEAbupsuQ8dULICrpSEWeyo9Bqvv6m85RC0IGdwsOosRuj19eKYSuLLpoSBrHTSjshUnfavH0zhj6AY5chWhhvVUIZroo3e5xoHEI9fgiaw1loUQ4NGbE0a74QpJR9IzbAj6kcNuwba'
          : currentStyleId === 'artistico'
          ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMybaVIlAxeJA3GgfXS141OdZ_A_oD2BMdNSjqNMXd9Pk2QxKneWgOCwbP9CTXbwQP4xykpaRZLcv0kC1ox-LjVOQCvRUkvm5qp6ss8X0Ru0N-1shGrKrtHlEJ-ONWBMkAbMBGz-XxDR80ubfkfv1mpXwp-DSMX6Nl3x-oyH7-FZP7BmnykTrGspYXfkxw2K-f3s9vSbSXBxS5HADATTfBHImw46y4cdx4qjm46ktZTv9N4Q-L58Zu'
          : currentStyleId === 'llamativo'
          ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuCI-Q2QOuI0H-Tuy9yh9ERhWzBGl1cqQc4mgJWS7W5TaIiYPIGBEtK7Pbl2kVgCqc55fmWMdZ__Q-SJTXA3_2EdxJmubTCO_z2huLs3xhF_TJyDgUA7BMkKRoFPl22mXAgXZboPN_ZzRxl8noHr_OgHgqRV5ZmgQ1ChvSR1NjDSGEnJb6hHJJOPoDeOGNJ6Qk9inoJzTgtCEdLIVO9OQpOthc3VXWxoQlchGxUyPuvNYdYyrewyEFYR'
          : 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4fkYCxZAs2fu--xjzCdmZaPsTkda27Kx-0ahQBn3dQV_wIkGf8JsCYGDvl0BZ6VYntHojj0LY8mb0YgWFUshh7kTw4SA-3N3JAj9ILcqYcCfMl9Qjs2d9Fe59l61ZhkO_3jR9jiFmJQjMKtYkE8WmE0pcITzNole2rDmJ4qcVFEKWPx1a7IByvXNI33EgKWts2f8nfhv_2Bt59q-SzZZltQzoNpE3Kg4WpxPg88htNGBNz93agPDo',
      specialNotes: notes || `Set configurado en el ${config.name}`
    });
    closeStyleStudio();
    setCurrentView('cart');
  };

  const handleExploreInCatalog = () => {
    setActiveStyleFilter(currentStyleId === 'personalizado' ? null : currentStyleId);
    closeStyleStudio();
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={closeStyleStudio}
    >
      <div
        className="relative w-full max-w-4xl bg-[#fbf8ff] rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto border border-white/80"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 p-2 rounded-full bg-[#f5f2fb] hover:bg-[#eae7ef] text-[#1b1b21] transition-colors cursor-pointer"
          onClick={closeStyleStudio}
          aria-label="Cerrar estudio"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Top Interactive Style Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-5 border-b border-[#d3c3ba]/30 scrollbar-none">
          <span className="font-label-caps text-[10px] uppercase text-[#635d58] pr-1 whitespace-nowrap">
            Estilos de Arte:
          </span>
          {(
            [
              'minimalista',
              'elegante',
              'tierno',
              'artistico',
              'llamativo',
              'personalizado'
            ] as ArtStyleId[]
          ).map(styleKey => {
            const isSelected = currentStyleId === styleKey;
            const stConf = STYLE_CONFIGS[styleKey];
            return (
              <button
                key={styleKey}
                onClick={() => openStyleStudio(styleKey)}
                className={`px-3 py-1.5 rounded-full font-label-sm text-xs transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#765843] text-white font-semibold shadow-xs'
                    : 'bg-white hover:bg-[#efecf5] text-[#4f453e] border border-[#d3c3ba]/30'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">{stConf.icon}</span>
                <span>{stConf.name.replace('Estudio ', '')}</span>
              </button>
            );
          })}
        </div>

        {/* Studio Header */}
        <div className="flex items-start sm:items-center gap-3.5 mb-6">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-xs"
            style={{ backgroundColor: config.accentColor }}
          >
            <span className="material-symbols-outlined text-2xl">{config.icon}</span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-headline-sm text-xl text-[#1b1b21] font-semibold">
                {config.name}
              </h3>
              <span className="font-label-caps text-[9px] uppercase px-2.5 py-0.5 rounded-full bg-[#f1daff] text-[#71518c] font-bold">
                {config.badge}
              </span>
              <span className="font-label-sm text-xs text-[#765843] font-semibold">
                {config.subtitle}
              </span>
            </div>
            <p className="font-body-sm text-xs text-[#4f453e] mt-1 leading-relaxed max-w-2xl">
              {config.manifesto}
            </p>
          </div>
        </div>

        {/* Two-Column Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual Preview Left Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4 sticky top-0">
            <div
              className="relative aspect-[4/5] rounded-3xl p-6 flex flex-col items-center justify-center shadow-lg overflow-hidden border transition-all duration-500"
              style={{
                backgroundColor: currentToneObj.bg,
                borderColor: currentToneObj.border
              }}
            >
              {/* Ethereal Aura Effect */}
              <div
                className="absolute w-48 h-48 rounded-full blur-2xl opacity-60 pointer-events-none transition-all duration-500"
                style={{ backgroundColor: currentToneObj.accent }}
              ></div>

              {/* Central Nail Silhouette representation */}
              <div className="relative z-10 flex flex-col items-center">
                <svg
                  className="w-28 h-48 drop-shadow-xl transition-all duration-300"
                  viewBox="0 0 60 100"
                  fill="none"
                >
                  <defs>
                    <linearGradient id={`nailGradient-${currentStyleId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                      <stop offset="50%" stopColor={currentToneObj.bg} />
                      <stop offset="100%" stopColor={currentToneObj.accent} stopOpacity="0.75" />
                    </linearGradient>
                  </defs>

                  {/* Nail Body according to shape */}
                  {shape === 'almond' && (
                    <path
                      d="M30 4 C44 18 52 45 52 80 C52 88 44 94 30 94 C16 94 8 88 8 80 C8 45 16 18 30 4 Z"
                      fill={`url(#nailGradient-${currentStyleId})`}
                      stroke="#ffffff"
                      strokeWidth="2.5"
                    />
                  )}
                  {shape === 'coffin' && (
                    <path
                      d="M20 6 L40 6 L50 78 C50 86 42 92 30 92 C18 92 10 86 10 78 L20 6 Z"
                      fill={`url(#nailGradient-${currentStyleId})`}
                      stroke="#ffffff"
                      strokeWidth="2.5"
                    />
                  )}
                  {shape === 'stiletto' && (
                    <path
                      d="M30 2 L52 75 C52 84 44 92 30 92 C16 92 8 84 8 75 L30 2 Z"
                      fill={`url(#nailGradient-${currentStyleId})`}
                      stroke="#ffffff"
                      strokeWidth="2.5"
                    />
                  )}
                  {shape === 'square-soft' && (
                    <rect
                      x="10"
                      y="10"
                      width="40"
                      height="82"
                      rx="8"
                      fill={`url(#nailGradient-${currentStyleId})`}
                      stroke="#ffffff"
                      strokeWidth="2.5"
                    />
                  )}

                  {/* Shimmer line */}
                  <path
                    d="M18 22 Q32 50 18 78"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeOpacity="0.65"
                  />

                  {/* Dynamic Style Visual Accents on Nail Canvas */}
                  {currentStyleId === 'minimalista' && (
                    <>
                      <circle cx="30" cy="80" r="3" fill="#ffffff" stroke="#c5a087" strokeWidth="1" />
                      <path d="M16 25 Q30 35 44 25" stroke="#ffffff" strokeWidth="1.2" fill="none" opacity="0.8" />
                    </>
                  )}
                  {currentStyleId === 'elegante' && (
                    <>
                      <circle cx="30" cy="72" r="3.5" fill="#ffffff" stroke="#c5a087" strokeWidth="1" />
                      <circle cx="26" cy="77" r="2" fill="#ffffff" />
                      <circle cx="34" cy="77" r="2" fill="#ffffff" />
                      <path d="M22 35 Q30 42 38 35" stroke="#ffd700" strokeWidth="1" fill="none" opacity="0.85" />
                    </>
                  )}
                  {currentStyleId === 'tierno' && (
                    <>
                      {/* 3D Bow Silhouette */}
                      <path
                        d="M26 48 L22 44 C20 42 20 46 22 48 L26 49 L22 51 C20 53 20 57 22 55 L26 51 Z"
                        fill="#ffffff"
                        opacity="0.9"
                      />
                      <path
                        d="M34 48 L38 44 C40 42 40 46 38 48 L34 49 L38 51 C40 53 40 57 38 55 L34 51 Z"
                        fill="#ffffff"
                        opacity="0.9"
                      />
                      <circle cx="30" cy="49" r="2.5" fill="#ffffff" stroke="#71518c" strokeWidth="0.8" />
                    </>
                  )}
                  {currentStyleId === 'artistico' && (
                    <>
                      <path
                        d="M30 65 Q25 45 35 30 Q38 45 30 65"
                        fill="#ffd700"
                        fillOpacity="0.4"
                        stroke="#ffd700"
                        strokeWidth="0.8"
                      />
                      <circle cx="30" cy="30" r="2" fill="#ffffff" />
                      <circle cx="35" cy="50" r="1.5" fill="#ffd700" />
                    </>
                  )}
                  {currentStyleId === 'llamativo' && (
                    <>
                      {/* Crystal Star burst */}
                      <path
                        d="M30 35 L32 42 L39 44 L32 46 L30 53 L28 46 L21 44 L28 42 Z"
                        fill="#ffffff"
                        stroke="#71518c"
                        strokeWidth="1"
                      />
                      <circle cx="30" cy="44" r="2" fill="#ffd700" />
                      <circle cx="20" cy="65" r="2.5" fill="#ffffff" />
                      <circle cx="40" cy="65" r="2.5" fill="#ffffff" />
                    </>
                  )}
                  {currentStyleId === 'personalizado' && (
                    <>
                      <circle cx="30" cy="70" r="3.5" fill="#ffffff" stroke="#c5a087" strokeWidth="1" />
                      <circle cx="35" cy="40" r="2.5" fill="#ffd700" />
                    </>
                  )}
                </svg>

                <div className="mt-4 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md shadow-xs text-center border border-white/90">
                  <span className="font-label-caps text-[10px] uppercase text-[#1b1b21] font-bold">
                    {baseTone} • {shape.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Active Selected Embellishment Pills */}
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1 justify-center z-10">
                {elements.map(e => (
                  <span
                    key={e}
                    className="font-label-caps text-[9px] bg-white/95 text-[#4f453e] px-2 py-0.5 rounded-md shadow-2xs border border-[#d3c3ba]/30"
                  >
                    ✧ {e}
                  </span>
                ))}
              </div>
            </div>

            {/* Price & Summary Card */}
            <div className="p-4 rounded-2xl bg-[#f5f2fb] flex items-center justify-between border border-[#d3c3ba]/30">
              <div>
                <span className="font-label-caps text-[10px] text-[#635d58] uppercase">
                  Presupuesto {config.name.replace('Estudio ', '')}
                </span>
                <p className="font-headline-sm text-xl text-[#765843] font-semibold">
                  {formatPrice(calculatedPrice)}
                </p>
              </div>
              <span className="font-body-sm text-[11px] text-[#635d58] text-right">
                Kit Luxury de Regalo + Garantía
              </span>
            </div>
          </div>

          {/* Configurator Controls Right Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* 1. Forma de la Cápsula */}
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-xs uppercase tracking-wider text-[#4f453e]">
                1. Silueta de la Cápsula
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'almond', label: 'Almendra' },
                  { id: 'coffin', label: 'Coffin' },
                  { id: 'stiletto', label: 'Stiletto' },
                  { id: 'square-soft', label: 'Cuadrada' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setShape(item.id as NailShape)}
                    className={`py-2 px-1 text-center rounded-xl font-label-sm text-xs transition-all cursor-pointer ${
                      shape === item.id
                        ? 'bg-[#765843] text-white font-semibold shadow-xs'
                        : 'bg-white hover:bg-[#eae7ef] text-[#4f453e] border border-[#d3c3ba]/30'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Tono Base de Gel para este Estilo */}
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-xs uppercase tracking-wider text-[#4f453e]">
                2. Tono Base ({config.name.replace('Estudio ', '')})
              </label>
              <div className="flex flex-wrap gap-2">
                {config.tones.map(tone => (
                  <button
                    key={tone.name}
                    onClick={() => setBaseTone(tone.name)}
                    className={`px-3 py-1.5 rounded-full font-label-sm text-xs transition-all flex items-center gap-2 cursor-pointer ${
                      baseTone === tone.name
                        ? 'bg-[#ffdcc5] text-[#2b1606] font-semibold shadow-xs ring-2 ring-[#765843]/40'
                        : 'bg-white hover:bg-[#f5f2fb] text-[#4f453e] border border-[#d3c3ba]/40'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/15 flex-shrink-0"
                      style={{ backgroundColor: tone.bg }}
                    ></span>
                    <span>{tone.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Técnicas y Elementos de este Estilo */}
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-xs uppercase tracking-wider text-[#4f453e]">
                3. Elementos y Técnicas Nobles
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {config.elements.map(elem => {
                  const checked = elements.includes(elem);
                  return (
                    <button
                      key={elem}
                      onClick={() => toggleElement(elem)}
                      className={`p-2.5 rounded-xl text-left font-label-sm text-xs flex items-center justify-between transition-all cursor-pointer ${
                        checked
                          ? 'bg-[#ffdcc5] text-[#2b1606] font-semibold border border-[#c5a087]'
                          : 'bg-white text-[#4f453e] border border-[#d3c3ba]/30 hover:bg-[#f5f2fb]'
                      }`}
                    >
                      <span className="truncate pr-1">{elem}</span>
                      <span className="material-symbols-outlined text-sm flex-shrink-0">
                        {checked ? 'check_box' : 'check_box_outline_blank'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Longitud y Acabado */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-label-caps text-xs uppercase tracking-wider text-[#4f453e]">
                  Longitud
                </label>
                <select
                  value={length}
                  onChange={e => setLength(e.target.value)}
                  className="p-2.5 rounded-xl bg-white border border-[#d3c3ba]/40 text-xs font-label-sm text-[#1b1b21] cursor-pointer"
                >
                  <option>Corta (16 mm)</option>
                  <option>Media (21 mm)</option>
                  <option>Larga (26 mm)</option>
                  <option>Extra Larga (30 mm)</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-caps text-xs uppercase tracking-wider text-[#4f453e]">
                  Acabado Final
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setFinish('Brillo Cristal')}
                    className={`p-2 rounded-xl text-center text-xs font-label-sm cursor-pointer ${
                      finish === 'Brillo Cristal'
                        ? 'bg-[#765843] text-white font-semibold'
                        : 'bg-white text-[#4f453e] border border-[#d3c3ba]/30'
                    }`}
                  >
                    Brillo Cristal
                  </button>
                  <button
                    onClick={() => setFinish('Mate Seda')}
                    className={`p-2 rounded-xl text-center text-xs font-label-sm cursor-pointer ${
                      finish === 'Mate Seda'
                        ? 'bg-[#765843] text-white font-semibold'
                        : 'bg-white text-[#4f453e] border border-[#d3c3ba]/30'
                    }`}
                  >
                    Mate Seda
                  </button>
                </div>
              </div>
            </div>

            {/* 5. Talla */}
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-xs uppercase tracking-wider text-[#4f453e]">
                Talla de Mano
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['XS', 'S', 'M', 'L'].map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSize(sz as NailSize)}
                    className={`py-2 rounded-xl text-xs font-headline-sm font-semibold cursor-pointer ${
                      size === sz
                        ? 'bg-[#765843] text-white shadow-xs'
                        : 'bg-white border border-[#d3c3ba]/30 text-[#4f453e] hover:bg-[#f5f2fb]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Notas para la manicurista */}
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-xs uppercase tracking-wider text-[#4f453e]">
                Instrucciones Específicas
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder={`Detalles especiales para tu set ${config.name.replace('Estudio ', '')}...`}
                rows={2}
                className="w-full p-3 rounded-2xl bg-white border border-[#d3c3ba]/40 text-xs font-body-sm text-[#1b1b21] focus:outline-none focus:ring-1 focus:ring-[#765843] resize-none"
              />
            </div>

            {/* Dual Actions: Encargar Set O Ver Obras en Catálogo */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleCreateOrder}
                className="flex-1 py-3.5 rounded-full bg-[#765843] hover:bg-[#5c412d] text-white font-label-md text-xs font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">shopping_bag</span>
                <span>Encargar {config.name.replace('Estudio ', '')} • {formatPrice(calculatedPrice)}</span>
              </button>

              <button
                onClick={handleExploreInCatalog}
                className="px-5 py-3.5 rounded-full bg-white hover:bg-[#eae7ef] text-[#1b1b21] font-label-md text-xs font-semibold border border-[#d3c3ba]/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <span>Ver en Catálogo</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
