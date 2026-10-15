import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    discountPercent,
    clearCart,
    formatPrice,
    setCurrentView
  } = useApp();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: 'Valeria Martínez',
    email: 'valeria.couture@paris.com',
    address: 'Campos Elíseos 204, Polanco',
    city: 'Ciudad de México',
    postalCode: '11560',
    country: 'México',
    paymentMethod: 'apple-pay'
  });

  if (!isCheckoutOpen) return null;

  const discount = cartSubtotal * (discountPercent / 100);
  const grandTotal = Math.max(0, cartSubtotal - discount);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    clearCart();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={() => setIsCheckoutOpen(false)}
    >
      <div
        className="relative w-full max-w-lg bg-[#fbf8ff] rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto border border-white/80"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-5 right-5 p-2 rounded-full bg-[#f5f2fb] hover:bg-[#eae7ef] text-[#1b1b21] transition-colors"
          onClick={() => {
            setIsCheckoutOpen(false);
            if (step === 'success') {
              setCurrentView('catalog');
            }
          }}
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {step === 'form' ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-[#765843] text-2xl">lock</span>
              <div>
                <h3 className="font-headline-sm text-xl text-[#1b1b21] font-semibold">
                  Finalizar Pedido Seguro
                </h3>
                <p className="font-body-sm text-xs text-[#635d58]">
                  Checkout certificado SSL 256-bit • Embalaje en caja magnética lacada
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmitOrder} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-label-caps text-[11px] text-[#4f453e] uppercase">
                  Nombre Completo
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="p-3 rounded-2xl bg-white border border-[#d3c3ba]/40 text-xs font-body-sm text-[#1b1b21] focus:outline-none focus:ring-1 focus:ring-[#765843]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-caps text-[11px] text-[#4f453e] uppercase">
                    Correo Electrónico
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="p-3 rounded-2xl bg-white border border-[#d3c3ba]/40 text-xs font-body-sm text-[#1b1b21] focus:outline-none focus:ring-1 focus:ring-[#765843]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-caps text-[11px] text-[#4f453e] uppercase">
                    País de Destino
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.country}
                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                    className="p-3 rounded-2xl bg-white border border-[#d3c3ba]/40 text-xs font-body-sm text-[#1b1b21] focus:outline-none focus:ring-1 focus:ring-[#765843]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-caps text-[11px] text-[#4f453e] uppercase">
                  Dirección de Entrega
                </label>
                <input
                  required
                  type="text"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className="p-3 rounded-2xl bg-white border border-[#d3c3ba]/40 text-xs font-body-sm text-[#1b1b21] focus:outline-none focus:ring-1 focus:ring-[#765843]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-caps text-[11px] text-[#4f453e] uppercase">
                    Ciudad
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="p-3 rounded-2xl bg-white border border-[#d3c3ba]/40 text-xs font-body-sm text-[#1b1b21] focus:outline-none focus:ring-1 focus:ring-[#765843]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-caps text-[11px] text-[#4f453e] uppercase">
                    Código Postal
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.postalCode}
                    onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                    className="p-3 rounded-2xl bg-white border border-[#d3c3ba]/40 text-xs font-body-sm text-[#1b1b21] focus:outline-none focus:ring-1 focus:ring-[#765843]"
                  />
                </div>
              </div>

              {/* Order Mini Breakdown */}
              <div className="p-4 rounded-2xl bg-[#f5f2fb] flex flex-col gap-2 my-2">
                <div className="flex justify-between font-label-sm text-xs text-[#4f453e]">
                  <span>Total Cápsulas ({cart.length} artículos)</span>
                  <span className="font-bold text-[#1b1b21]">{formatPrice(grandTotal)}</span>
                </div>
                <div className="flex justify-between font-body-sm text-[11px] text-[#635d58]">
                  <span>Envío Exprés Boutique</span>
                  <span className="text-[#765843] font-bold">GRATIS</span>
                </div>
                <div className="flex justify-between font-body-sm text-[11px] text-[#635d58]">
                  <span>Kit de Colocación Luxury</span>
                  <span className="text-[#765843] font-bold">INCLUIDO (0,00 €)</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#765843] hover:bg-[#5c412d] text-white font-label-md text-sm font-semibold shadow-lg hover:shadow-[0_0_24px_rgba(197,160,135,0.45)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">verified_user</span>
                <span>Confirmar Pago • {formatPrice(grandTotal)}</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="py-6 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#ffdcc5] text-[#765843] flex items-center justify-center shadow-md animate-bounce">
              <span className="material-symbols-outlined text-3xl">done_all</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-label-caps text-xs uppercase tracking-widest text-[#71518c] font-bold">
                ¡Felicidades, {formData.name}!
              </span>
              <h3 className="font-headline-lg text-2xl text-[#1b1b21]">
                Tu Pedido de Alta Joyería está en Marcha
              </h3>
              <p className="font-body-md text-sm text-[#4f453e] max-w-sm mt-1">
                La maestra manicurista ha recibido tus medidas milimétricas y comenzará a pintar cada cápsula al óleo hoy mismo.
              </p>
            </div>

            <div className="w-full p-4 rounded-2xl bg-[#f5f2fb] border border-[#d3c3ba]/30 text-left flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-label-caps text-[10px] text-[#635d58] uppercase">Número de Seguimiento:</span>
                <span className="font-mono font-bold text-[#765843]">LAURA-2025-FR9842</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-label-caps text-[10px] text-[#635d58] uppercase">Entrega Estimada:</span>
                <span className="font-bold text-[#1b1b21]">48 - 72 horas en {formData.city}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-label-caps text-[10px] text-[#635d58] uppercase">Garantía:</span>
                <span className="text-[#71518c] font-semibold">Reposición Gratuita Si No Encajan</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                setCurrentView('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-2 w-full py-3.5 rounded-full bg-[#1b1b21] hover:bg-[#765843] text-white font-label-md text-sm font-semibold transition-colors shadow-md cursor-pointer"
            >
              Volver a la Galería de Obras
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
