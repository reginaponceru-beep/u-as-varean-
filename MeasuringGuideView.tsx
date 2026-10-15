import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const MeasuringGuideView: React.FC = () => {
  const { addToCart, setCurrentView, formatPrice } = useApp();

  const [testedSize, setTestedSize] = useState<'XS' | 'S' | 'M' | 'L'>('S');
  const [interactiveMm, setInteractiveMm] = useState<number>(15);

  const calculateSuggestedSize = (mm: number) => {
    if (mm <= 14) return 'XS';
    if (mm <= 15) return 'S';
    if (mm <= 16) return 'M';
    return 'L';
  };

  return (
    <div className="flex flex-col w-full pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8 text-[#635d58] font-label-sm text-xs">
          <button
            onClick={() => setCurrentView('home')}
            className="hover:text-[#765843] transition-colors cursor-pointer"
          >
            Inicio
          </button>
          <span>/</span>
          <span className="text-[#765843] font-semibold">Guía de Medidas Milimétrica</span>
        </nav>

        {/* Title */}
        <div className="flex flex-col gap-3 max-w-3xl mb-12">
          <span className="px-3 py-1 rounded-full bg-[#ffdcc5] text-[#765843] font-label-caps text-[10px] uppercase font-bold tracking-wider self-start">
            Ajuste 100% Garantizado
          </span>
          <h1 className="font-headline-lg text-3xl sm:text-4xl text-[#1b1b21]">
            Guía de Medidas de Precisión Anatómica
          </h1>
          <p className="font-body-md text-sm sm:text-base text-[#4f453e] leading-relaxed">
            Nuestras cápsulas están esculpidas en gel con memoria elástica. Para que la experiencia sea idéntica a una manicura de salón de alta costura, sigue nuestro protocolo de 60 segundos.
          </p>
        </div>

        {/* 3 Step Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 rounded-3xl bg-white shadow-xs border border-[#d3c3ba]/30 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#ffdcc5] text-[#765843] flex items-center justify-center font-headline-sm text-xl font-bold">
              1
            </div>
            <h3 className="font-headline-sm text-lg text-[#1b1b21]">El Método de la Cinta Transparente</h3>
            <p className="font-body-md text-xs sm:text-sm text-[#4f453e] leading-relaxed">
              Corta un trozo pequeño de celo adhesivo y presiónalo horizontalmente sobre el punto más ancho de tu lecho ungueal, asegurándote de que toque los pliegues laterales de la piel.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white shadow-xs border border-[#d3c3ba]/30 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#f1daff] text-[#71518c] flex items-center justify-center font-headline-sm text-xl font-bold">
              2
            </div>
            <h3 className="font-headline-sm text-lg text-[#1b1b21]">Marcar los Puntos Extremos</h3>
            <p className="font-body-md text-xs sm:text-sm text-[#4f453e] leading-relaxed">
              Con un bolígrafo de punta fina (0.5mm), dibuja dos marcas perpendiculares en el límite exacto donde termina tu uña natural y comienza la piel.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white shadow-xs border border-[#d3c3ba]/30 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#eae7ef] text-[#1b1b21] flex items-center justify-center font-headline-sm text-xl font-bold">
              3
            </div>
            <h3 className="font-headline-sm text-lg text-[#1b1b21]">Medir sobre Regla Milimétrica</h3>
            <p className="font-body-md text-xs sm:text-sm text-[#4f453e] leading-relaxed">
              Pega la cinta sobre una superficie plana junto a una regla o metro. Cuenta los milímetros de distancia entre los dos puntos. ¡Listo!
            </p>
          </div>
        </div>

        {/* Interactive Millimeter Tester Slider */}
        <div className="p-8 rounded-3xl bg-white/90 backdrop-blur-xl shadow-md border border-[#d3c3ba]/30 mb-16 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-headline-sm text-xl text-[#1b1b21]">Simulador Interactivo de Calce</h3>
              <p className="font-body-sm text-xs text-[#635d58]">
                Desliza para comprobar la talla estándar recomendada para tu pulgar o dedo principal:
              </p>
            </div>
            <div className="flex items-center gap-2 bg-[#f5f2fb] px-4 py-2 rounded-2xl border border-[#d3c3ba]/30">
              <span className="font-label-caps text-xs text-[#635d58] uppercase">Talla Sugerida:</span>
              <span className="font-headline-sm text-xl font-bold text-[#765843]">
                {calculateSuggestedSize(interactiveMm)}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm font-semibold text-[#765843]">
              <span>12 mm (Estrecho)</span>
              <span className="text-xl font-mono text-[#1b1b21]">{interactiveMm} mm</span>
              <span>19 mm (Amplio)</span>
            </div>
            <input
              type="range"
              min="12"
              max="19"
              value={interactiveMm}
              onChange={e => setInteractiveMm(Number(e.target.value))}
              className="w-full accent-[#765843] cursor-pointer h-2 bg-[#efecf5] rounded-lg"
            />
          </div>

          <div className="p-4 rounded-2xl bg-[#f5f2fb] text-xs text-[#4f453e] flex items-center gap-3">
            <span className="material-symbols-outlined text-[#765843] text-xl">info</span>
            <span>
              <strong>Regla de oro Atelier:</strong> Si estás entre dos milímetros (por ejemplo, 14.5 mm), elije siempre la talla mayor o anota tus medidas en las instrucciones especiales del pedido.
            </span>
          </div>
        </div>

        {/* Complete Standard Size Comparison Table */}
        <div className="p-8 rounded-3xl bg-white shadow-xs border border-[#d3c3ba]/30 mb-16">
          <h3 className="font-headline-sm text-xl text-[#1b1b21] mb-6">Tabla Oficial de Tallas Atelier L'Aura</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-sm text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#d3c3ba]/40 text-[#765843] font-label-caps uppercase">
                  <th className="py-3 px-4">Talla</th>
                  <th className="py-3 px-4">Pulgar</th>
                  <th className="py-3 px-4">Índice</th>
                  <th className="py-3 px-4">Medio</th>
                  <th className="py-3 px-4">Anular</th>
                  <th className="py-3 px-4">Meñique</th>
                  <th className="py-3 px-4">Frecuencia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d3c3ba]/20 font-mono text-xs">
                <tr className={testedSize === 'XS' ? 'bg-[#ffdcc5]/30' : ''}>
                  <td className="py-3.5 px-4 font-bold font-sans text-sm">XS</td>
                  <td className="px-4">14 mm</td>
                  <td className="px-4">10 mm</td>
                  <td className="px-4">11 mm</td>
                  <td className="px-4">10 mm</td>
                  <td className="px-4">8 mm</td>
                  <td className="px-4 font-sans text-[#635d58]">Uñas pequeñas</td>
                </tr>
                <tr className={testedSize === 'S' ? 'bg-[#ffdcc5]/40 font-semibold' : ''}>
                  <td className="py-3.5 px-4 font-bold font-sans text-sm text-[#765843]">S (Más común)</td>
                  <td className="px-4">15 mm</td>
                  <td className="px-4">11 mm</td>
                  <td className="px-4">12 mm</td>
                  <td className="px-4">11 mm</td>
                  <td className="px-4">9 mm</td>
                  <td className="px-4 font-sans text-[#765843]">60% de clientas</td>
                </tr>
                <tr className={testedSize === 'M' ? 'bg-[#ffdcc5]/30' : ''}>
                  <td className="py-3.5 px-4 font-bold font-sans text-sm">M</td>
                  <td className="px-4">16 mm</td>
                  <td className="px-4">12 mm</td>
                  <td className="px-4">13 mm</td>
                  <td className="px-4">12 mm</td>
                  <td className="px-4">10 mm</td>
                  <td className="px-4 font-sans text-[#635d58]">Estándar amplio</td>
                </tr>
                <tr className={testedSize === 'L' ? 'bg-[#ffdcc5]/30' : ''}>
                  <td className="py-3.5 px-4 font-bold font-sans text-sm">L</td>
                  <td className="px-4">18 mm</td>
                  <td className="px-4">13 mm</td>
                  <td className="px-4">14 mm</td>
                  <td className="px-4">13 mm</td>
                  <td className="px-4">11 mm</td>
                  <td className="px-4 font-sans text-[#635d58]">Lecho ungueal ancho</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Physical Sizing Kit Order Card */}
        <div className="p-8 rounded-3xl bg-[#f5f2fb] border border-[#d3c3ba]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#ffdcc5] text-[#765843] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-3xl">card_giftcard</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-lg text-[#1b1b21]">
                Sizing Kit Físico de Alta Precisión
              </h4>
              <p className="font-body-sm text-xs text-[#4f453e] mt-1 max-w-xl">
                Recibe en 24-48 horas un kit físico con las 10 cápsulas transparentes numeradas del 0 al 9 en tu forma favorita (Almendra, Coffin, Stiletto o Cuadrada) por solo {formatPrice(2.5)} con cupón de reembolso.
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
            className="px-8 py-3.5 rounded-full bg-[#765843] hover:bg-[#5c412d] text-white font-label-md text-xs font-semibold whitespace-nowrap transition-colors shadow-md cursor-pointer shrink-0"
          >
            Añadir Sizing Kit a la Bolsa
          </button>
        </div>
      </div>
    </div>
  );
};
