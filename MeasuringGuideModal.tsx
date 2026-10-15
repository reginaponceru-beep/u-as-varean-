import React from 'react';
import { useApp } from '../context/AppContext';

export const MeasuringGuideModal: React.FC = () => {
  const { isMeasuringGuideOpen, setIsMeasuringGuideOpen, addToCart, formatPrice } = useApp();

  if (!isMeasuringGuideOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={() => setIsMeasuringGuideOpen(false)}
    >
      <div
        className="relative w-full max-w-xl bg-[#fbf8ff] rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto border border-white/80"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 p-2 rounded-full bg-[#f5f2fb] hover:bg-[#eae7ef] text-[#1b1b21] transition-colors"
          onClick={() => setIsMeasuringGuideOpen(false)}
          aria-label="Cerrar modal"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="flex items-center gap-3 mb-5">
          <span className="w-10 h-10 rounded-full bg-[#ffdcc5] text-[#765843] flex items-center justify-center material-symbols-outlined text-xl">
            straighten
          </span>
          <div>
            <h3 className="font-headline-sm text-lg text-[#1b1b21] font-semibold">
              Cómo Medir tus Uñas en 1 Minuto
            </h3>
            <p className="font-label-caps text-[10px] text-[#765843] uppercase tracking-wider">
              Técnica de la Cinta Adhesiva o Moneda
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5 text-[#4f453e] font-body-md text-sm">
          <p className="leading-relaxed">
            No necesitas cinta métrica de sastre. Solo requieres cinta transparente (celo) y una regla escolar estándar:
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#f5f2fb]">
              <span className="w-6 h-6 rounded-full bg-[#765843] text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                1
              </span>
              <div>
                <p className="font-semibold text-[#1b1b21]">Pega la cinta sobre tu uña:</p>
                <p className="text-xs text-[#635d58] mt-0.5">
                  Coloca un trozo de cinta horizontalmente sobre la parte más ancha de tu uña natural, presionando bien en los surcos laterales de la piel.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#f5f2fb]">
              <span className="w-6 h-6 rounded-full bg-[#765843] text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                2
              </span>
              <div>
                <p className="font-semibold text-[#1b1b21]">Marca los dos extremos:</p>
                <p className="text-xs text-[#635d58] mt-0.5">
                  Con un bolígrafo fino, dibuja un punto exacto en cada borde lateral donde la uña se une con la piel.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#f5f2fb]">
              <span className="w-6 h-6 rounded-full bg-[#765843] text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                3
              </span>
              <div>
                <p className="font-semibold text-[#1b1b21]">Mide sobre una regla:</p>
                <p className="text-xs text-[#635d58] mt-0.5">
                  Retira la cinta, pégala sobre una regla plana y cuenta los milímetros de separación entre ambos puntos.
                </p>
              </div>
            </div>
          </div>

          {/* Comparative Size Table */}
          <div className="mt-2 overflow-x-auto rounded-2xl border border-[#d3c3ba]/30 bg-white p-3">
            <table className="w-full text-left font-label-sm text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#d3c3ba]/30 text-[#765843]">
                  <th className="py-2.5 px-2">Talla</th>
                  <th className="py-2.5 px-2">Pulgar</th>
                  <th className="py-2.5 px-2">Índice</th>
                  <th className="py-2.5 px-2">Medio</th>
                  <th className="py-2.5 px-2">Anular</th>
                  <th className="py-2.5 px-2">Meñique</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d3c3ba]/20 font-mono text-xs">
                <tr>
                  <td className="py-2 px-2 font-bold font-sans">XS</td>
                  <td className="px-2">14mm</td>
                  <td className="px-2">10mm</td>
                  <td className="px-2">11mm</td>
                  <td className="px-2">10mm</td>
                  <td className="px-2">8mm</td>
                </tr>
                <tr className="bg-[#ffdcc5]/30 font-semibold text-[#765843]">
                  <td className="py-2 px-2 font-bold font-sans text-[#765843]">S (Estándar)</td>
                  <td className="px-2">15mm</td>
                  <td className="px-2">11mm</td>
                  <td className="px-2">12mm</td>
                  <td className="px-2">11mm</td>
                  <td className="px-2">9mm</td>
                </tr>
                <tr>
                  <td className="py-2 px-2 font-bold font-sans">M</td>
                  <td className="px-2">16mm</td>
                  <td className="px-2">12mm</td>
                  <td className="px-2">13mm</td>
                  <td className="px-2">12mm</td>
                  <td className="px-2">10mm</td>
                </tr>
                <tr>
                  <td className="py-2 px-2 font-bold font-sans">L</td>
                  <td className="px-2">18mm</td>
                  <td className="px-2">13mm</td>
                  <td className="px-2">14mm</td>
                  <td className="px-2">13mm</td>
                  <td className="px-2">11mm</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Sizing kit box callout */}
          <div className="p-4 rounded-2xl bg-[#ffdcc5]/40 border border-[#c5a087]/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#765843] text-2xl">mail</span>
              <div className="flex flex-col">
                <span className="font-label-sm text-xs font-bold text-[#1b1b21]">¿Prefieres probar las cápsulas físicas?</span>
                <span className="font-body-sm text-[11px] text-[#4f453e]">Sizing Kit con las 10 medidas por {formatPrice(2.5)} (reembolsable).</span>
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
                setIsMeasuringGuideOpen(false);
              }}
              className="px-3.5 py-1.5 rounded-full bg-[#765843] text-white font-label-sm text-xs font-semibold hover:bg-[#5c412d] transition-colors whitespace-nowrap shadow-xs cursor-pointer"
            >
              Pedir Sizing Kit
            </button>
          </div>

          <button
            className="w-full py-3.5 rounded-full bg-[#765843] hover:bg-[#5c412d] text-white font-label-md text-sm font-semibold transition-all shadow-md cursor-pointer mt-1"
            onClick={() => setIsMeasuringGuideOpen(false)}
          >
            Entendido, volver a configurar
          </button>
        </div>
      </div>
    </div>
  );
};
