import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const CartView: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartTotalCount,
    discountPercent,
    appliedPromoCode,
    applyPromoCode,
    formatPrice,
    setCurrentView,
    setIsCheckoutOpen,
    setIsMeasuringGuideOpen,
    showToast
  } = useApp();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [artisanNotesOpen, setArtisanNotesOpen] = useState(false);
  const [artisanNotes, setArtisanNotes] = useState('');

  const discount = cartSubtotal * (discountPercent / 100);
  const finalTotal = Math.max(0, cartSubtotal - discount);
  const taxes = finalTotal * (0.21 / 1.21);
  const klarnaPart = Math.round((finalTotal / 3) * 100) / 100;

  const handleApplyPromo = () => {
    const res = applyPromoCode(promoInput);
    setPromoMessage({ text: res.message, isError: !res.success });
  };

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Ambient Light Orbs */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute top-12 left-10 w-96 h-96 bg-[#ffdcc5]/25 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-72 right-12 w-[30rem] h-[30rem] bg-[#f1daff]/20 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 relative z-10">
          {/* Breadcrumbs & Step Indicator */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-[#635d58] font-label-caps text-xs uppercase tracking-widest mb-1.5">
                <button
                  onClick={() => setCurrentView('home')}
                  className="hover:text-[#765843] transition-colors cursor-pointer"
                >
                  Atelier L'Aura
                </button>
                <span>/</span>
                <span className="text-[#765843] font-bold">Bolsa Privada</span>
              </div>
              <h1 className="font-headline-lg text-2xl sm:text-3xl text-[#1b1b21] tracking-tight">
                Tu Selección de Alta Joyería
              </h1>
            </div>

            {/* Checkout Steps Pills */}
            <div className="flex items-center gap-1.5 bg-[#f5f2fb] px-3 py-1.5 rounded-full self-start sm:self-auto shadow-xs border border-[#d3c3ba]/30">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#765843] text-white">
                <span className="font-label-caps text-[11px]">1. Bolsa</span>
              </div>
              <span className="material-symbols-outlined text-[#635d58] text-sm">chevron_right</span>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[#635d58]">
                <span className="font-label-caps text-[11px]">2. Envío</span>
              </div>
              <span className="material-symbols-outlined text-[#635d58] text-sm">chevron_right</span>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[#635d58]">
                <span className="font-label-caps text-[11px]">3. Pago</span>
              </div>
            </div>
          </div>

          {/* Free Shipping Celebration Glass Bar */}
          <div className="mb-10 p-5 rounded-3xl bg-white/90 backdrop-blur-xl shadow-md border border-white/80">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#f1daff] flex items-center justify-center text-[#71518c]">
                  <span
                    className="material-symbols-outlined text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    workspace_premium
                  </span>
                </div>
                <div>
                  <p className="font-label-md text-xs sm:text-sm text-[#1b1b21] font-semibold">
                    ¡Felicidades! Has desbloqueado Envío Asegurado y Certificado de Autor
                  </p>
                  <p className="font-body-sm text-xs text-[#635d58]">
                    Cortesía de nuestro taller parisino para pedidos superiores a {formatPrice(28)}
                  </p>
                </div>
              </div>
              <span className="font-label-caps text-[11px] uppercase text-[#765843] tracking-widest font-bold self-start md:self-auto bg-[#ffdcc5]/40 px-3 py-1 rounded-full">
                100% Cubierto
              </span>
            </div>

            {/* Progress Bar Track */}
            <div className="w-full h-2 rounded-full bg-[#efecf5] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#c5a087] via-[#765843] to-[#71518c] transition-all duration-700 ease-out"
                style={{ width: `${Math.min(100, Math.max(25, (finalTotal / 28) * 100))}%` }}
              ></div>
            </div>
          </div>

          {/* Main Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Bag Items & Customization (7 cols) */}
            <section className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <h2 className="font-headline-sm text-lg text-[#1b1b21]">Cápsulas Seleccionadas</h2>
                  <span className="bg-[#eae7ef] text-[#4f453e] font-label-caps text-xs px-2.5 py-0.5 rounded-full font-semibold">
                    {cartTotalCount} {cartTotalCount === 1 ? 'set' : 'sets'}
                  </span>
                </div>

                <button
                  onClick={() => setCurrentView('catalog')}
                  className="font-label-sm text-xs text-[#765843] hover:text-[#5c412d] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Continuar explorando</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="p-12 rounded-3xl bg-white/80 border border-[#d3c3ba]/30 text-center flex flex-col items-center gap-4">
                  <span className="material-symbols-outlined text-5xl text-[#d3c3ba]">shopping_bag</span>
                  <h3 className="font-headline-sm text-xl text-[#1b1b21]">Tu bolsa de joyas está vacía</h3>
                  <p className="font-body-sm text-xs text-[#635d58] max-w-sm">
                    Explora nuestra colección Alta Costura de uñas de gel estructurado pintadas a mano.
                  </p>
                  <button
                    onClick={() => setCurrentView('catalog')}
                    className="mt-2 px-6 py-3 rounded-full bg-[#765843] text-white font-label-md text-xs font-semibold hover:bg-[#5c412d] transition-colors shadow-md cursor-pointer"
                  >
                    Ver Colección Alta Costura
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <article
                    key={item.id}
                    className="group relative p-6 rounded-3xl bg-white/80 backdrop-blur-xl shadow-sm hover:shadow-md transition-all duration-300 border border-white/80"
                  >
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Nail Visual */}
                      <div className="relative w-full sm:w-36 h-48 sm:h-44 rounded-2xl overflow-hidden bg-[#efecf5] flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute top-2.5 left-2.5 font-label-caps text-[9px] uppercase px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[#765843] font-bold shadow-2xs">
                          100% Hecho a Mano
                        </span>
                      </div>

                      {/* Product Details & Configuration Specs */}
                      <div className="flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <span className="font-label-caps text-[10px] uppercase text-[#71518c] tracking-widest font-semibold">
                                {item.subtitle}
                              </span>
                              <h3 className="font-headline-sm text-lg text-[#1b1b21]">
                                {item.name}
                              </h3>
                            </div>
                            <div className="text-right">
                              <span className="font-headline-sm text-lg text-[#765843] font-semibold">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                              <p className="font-body-sm text-[11px] text-[#635d58]">IVA incl.</p>
                            </div>
                          </div>

                          {/* Capsule Selected Attributes Chips */}
                          <div className="grid grid-cols-3 gap-2 mt-3.5 pt-3.5 bg-[#f5f2fb]/70 p-2.5 rounded-2xl border border-[#d3c3ba]/20">
                            <div className="flex flex-col">
                              <span className="font-label-caps text-[9px] uppercase text-[#635d58]">Forma</span>
                              <span className="font-label-md text-xs text-[#1b1b21] font-semibold flex items-center gap-1 truncate">
                                <span className="material-symbols-outlined text-[13px] text-[#765843]">spa</span>
                                {item.shape}
                              </span>
                            </div>

                            <div className="flex flex-col">
                              <span className="font-label-caps text-[9px] uppercase text-[#635d58]">Talla</span>
                              <span className="font-label-md text-xs text-[#1b1b21] font-semibold flex items-center gap-1 truncate">
                                <span className="material-symbols-outlined text-[13px] text-[#765843]">straighten</span>
                                {item.sizeSpecs}
                              </span>
                            </div>

                            <div className="flex flex-col">
                              <span className="font-label-caps text-[9px] uppercase text-[#635d58]">Acabado</span>
                              <span className="font-label-md text-xs text-[#1b1b21] font-semibold flex items-center gap-1 truncate">
                                <span className="material-symbols-outlined text-[13px] text-[#765843]">diamond</span>
                                {item.finish}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Quantity & Actions Bar */}
                        <div className="flex items-center justify-between pt-4 mt-2">
                          {/* Stepper */}
                          <div className="flex items-center bg-[#efecf5] rounded-full p-1 shadow-inner">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              aria-label="Disminuir cantidad"
                              className="w-8 h-8 rounded-full bg-white hover:bg-[#eae7ef] text-[#1b1b21] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-sm">remove</span>
                            </button>
                            <span className="font-label-md text-xs font-semibold text-[#1b1b21] w-9 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              aria-label="Aumentar cantidad"
                              className="w-8 h-8 rounded-full bg-white hover:bg-[#eae7ef] text-[#1b1b21] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-sm">add</span>
                            </button>
                          </div>

                          {/* Edit Size / Remove */}
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setIsMeasuringGuideOpen(true)}
                              className="font-label-sm text-xs text-[#635d58] hover:text-[#765843] transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-base">tune</span>
                              <span className="hidden sm:inline">Modificar Medidas</span>
                            </button>

                            <div className="h-4 w-px bg-[#d3c3ba]/50"></div>

                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              aria-label="Eliminar cápsula"
                              className="font-label-sm text-xs text-[#4f453e] hover:text-[#ba1a1a] transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-base">delete_outline</span>
                              <span>Eliminar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              )}

              {/* Complimentary Luxury Application Kit */}
              <div className="p-6 rounded-3xl bg-[#ffdcc5]/20 backdrop-blur-lg shadow-xs border border-[#c5a087]/20">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#765843] shadow-xs flex-shrink-0">
                      <span className="material-symbols-outlined text-2xl">card_giftcard</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-headline-sm text-base text-[#1b1b21] font-semibold">
                          Kit de Colocación Haute Joaillerie
                        </span>
                        <span className="font-label-caps text-[9px] bg-[#765843] text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                          Incluido de Regalo
                        </span>
                      </div>
                      <p className="font-body-sm text-xs text-[#4f453e] mt-1 leading-relaxed">
                        Incluye mini lima de cristal templado bohemio, palillo de madera de naranjo tallado, toallitas deshidratantes y adhesivo médico de resina hipoalergénica de duración hasta 3 semanas.
                      </p>
                    </div>
                  </div>
                  <div className="text-right sm:self-center flex-shrink-0">
                    <span className="font-headline-sm text-lg text-[#765843] font-bold">{formatPrice(0)}</span>
                    <span className="block font-body-sm text-[11px] line-through text-[#635d58]">
                      Valor: {formatPrice(14)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-4 bg-white/70 rounded-2xl p-3 border border-white/80">
                  <div className="flex items-center gap-2 text-[#4f453e]">
                    <span className="material-symbols-outlined text-[#765843] text-base">brush</span>
                    <span className="font-label-sm text-xs">Pegamento Resina 2g</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#4f453e]">
                    <span className="material-symbols-outlined text-[#765843] text-base">sticky_note_2</span>
                    <span className="font-label-sm text-xs">24 Pestañas Gel Tabs</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#4f453e]">
                    <span className="material-symbols-outlined text-[#765843] text-base">architecture</span>
                    <span className="font-label-sm text-xs">Lima de Vidrio Fina</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#4f453e]">
                    <span className="material-symbols-outlined text-[#765843] text-base">cleaning_services</span>
                    <span className="font-label-sm text-xs">Pad de Preparación</span>
                  </div>
                </div>
              </div>

              {/* Special Bespoke Notes for the Artisan */}
              <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl shadow-xs border border-white/70">
                <button
                  type="button"
                  onClick={() => setArtisanNotesOpen(prev => !prev)}
                  className="w-full flex items-center justify-between text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#765843] text-xl">stylus_note</span>
                    <div>
                      <h4 className="font-headline-sm text-base text-[#1b1b21]">
                        Instrucciones Especiales para el Atelier
                      </h4>
                      <p className="font-body-sm text-xs text-[#635d58]">
                        ¿Tienes curvatura plana, cutículas anchas o medidas mixtas entre manos?
                      </p>
                    </div>
                  </div>
                  <span
                    className={`material-symbols-outlined text-[#635d58] group-hover:text-[#765843] transition-transform duration-200 ${
                      artisanNotesOpen ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {artisanNotesOpen && (
                  <div className="mt-4 pt-4 border-t border-[#d3c3ba]/30 flex flex-col gap-2">
                    <textarea
                      value={artisanNotes}
                      onChange={e => setArtisanNotes(e.target.value)}
                      rows={3}
                      placeholder="Ejemplo: 'Mi dedo índice derecho mide 12.5mm en lugar de 12mm. Me gustaría que el oro sea un poco más sutil en el pulgar'..."
                      className="w-full p-4 rounded-2xl bg-[#f5f2fb] text-[#1b1b21] font-body-sm text-xs placeholder:text-[#635d58] focus:outline-none focus:ring-1 focus:ring-[#765843] shadow-inner resize-none border border-[#d3c3ba]/30"
                    />
                    <span className="font-label-caps text-[10px] text-[#635d58] text-right">
                      Tu mensaje será revisado personalmente por la maestra manicurista antes de moldear.
                    </span>
                  </div>
                )}
              </div>
            </section>

            {/* Right Column: Order Summary & Checkout (5 cols) */}
            <aside className="lg:col-span-5 sticky top-28 flex flex-col gap-6">
              <div className="p-7 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-2xl shadow-xl flex flex-col gap-6 border border-white/80">
                {/* Header */}
                <div className="flex items-center justify-between pb-2 border-b border-[#d3c3ba]/30">
                  <h2 className="font-headline-md text-xl text-[#1b1b21]">Resumen de Orden</h2>
                  <span
                    className="material-symbols-outlined text-[#71518c] text-2xl"
                    title="Transacción Encriptada 256-Bit"
                  >
                    verified_user
                  </span>
                </div>

                {/* Express Checkout 1-Click */}
                <div className="flex flex-col gap-2.5">
                  <p className="font-label-caps text-[10px] uppercase text-[#635d58] tracking-widest text-center font-bold">
                    Pago Rápido en 1 Clic
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setIsCheckoutOpen(true)}
                      className="h-12 rounded-full bg-[#1b1b21] text-white flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md group cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-lg">phone_iphone</span>
                      <span className="font-label-md text-xs font-semibold tracking-wide">Apple Pay</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsCheckoutOpen(true)}
                      className="h-12 rounded-full bg-[#ffc439]/30 text-[#003087] flex items-center justify-center gap-2 hover:bg-[#ffc439]/40 transition-all shadow-xs cursor-pointer border border-[#ffc439]/50"
                    >
                      <span className="material-symbols-outlined text-lg">account_balance_wallet</span>
                      <span className="font-label-md text-xs font-semibold">PayPal</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full h-11 rounded-full bg-[#f5f2fb] hover:bg-[#eae7ef] text-[#1b1b21] font-label-md text-xs font-medium flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer border border-[#d3c3ba]/30"
                  >
                    <span className="material-symbols-outlined text-base">credit_card</span>
                    <span>Google Pay & Tarjetas Guardadas</span>
                  </button>
                </div>

                {/* Divider */}
                <div className="relative flex py-1 items-center">
                  <div className="flex-grow h-px bg-[#d3c3ba]/30"></div>
                  <span className="flex-shrink mx-4 font-label-caps text-[10px] uppercase text-[#635d58] tracking-widest font-semibold">
                    O pagar con tarjeta
                  </span>
                  <div className="flex-grow h-px bg-[#d3c3ba]/30"></div>
                </div>

                {/* Promo Code Input */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 bg-[#f5f2fb] p-1.5 rounded-full shadow-inner border border-[#d3c3ba]/30">
                    <span className="material-symbols-outlined text-[#635d58] ml-3 text-lg">loyalty</span>
                    <input
                      type="text"
                      value={promoInput}
                      onChange={e => setPromoInput(e.target.value)}
                      placeholder="Código de Cortesía o VIP"
                      className="flex-1 bg-transparent px-2 py-1.5 font-body-sm text-xs text-[#1b1b21] placeholder:text-[#635d58] focus:outline-none uppercase"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-4 py-2 rounded-full bg-[#eae7ef] hover:bg-[#c5a087] hover:text-white text-[#1b1b21] font-label-sm text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Aplicar
                    </button>
                  </div>

                  {promoMessage && (
                    <span
                      className={`text-[11px] font-label-sm pl-3 ${
                        promoMessage.isError ? 'text-[#ba1a1a]' : 'text-[#71518c]'
                      }`}
                    >
                      {promoMessage.text}
                    </span>
                  )}
                  {discountPercent === 0 && !promoMessage && (
                    <span className="text-[10px] text-[#635d58] pl-3">
                      Tip: Usa el código <strong className="text-[#765843]">ATELIER10</strong> para un 10% de cortesía.
                    </span>
                  )}
                </div>

                {/* Detailed Cost Breakdown */}
                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex justify-between items-center text-[#4f453e] font-body-md text-xs">
                    <span>Subtotal Cápsulas ({cartTotalCount} artículos)</span>
                    <span className="text-[#1b1b21] font-medium">{formatPrice(cartSubtotal)}</span>
                  </div>

                  <div className="flex justify-between items-center text-[#4f453e] font-body-md text-xs">
                    <div className="flex items-center gap-1.5">
                      <span>Envío Exprés Boutique</span>
                      <span
                        className="material-symbols-outlined text-[#765843] text-sm"
                        title="Embalaje térmico acolchado en caja magnética lacada"
                      >
                        help_outline
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="line-through text-[#635d58] text-[11px]">{formatPrice(3.5)}</span>
                      <span className="text-[#765843] font-bold">GRATIS</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[#4f453e] font-body-md text-xs">
                    <span>Kit de Preparación & Sellado</span>
                    <span className="text-[#765843] font-semibold">Cortesía ({formatPrice(0)})</span>
                  </div>

                  {discountPercent > 0 && (
                    <div className="flex justify-between items-center text-[#71518c] font-body-md text-xs">
                      <span className="flex items-center gap-1 font-semibold">
                        Descuento Atelier VIP ({discountPercent}%)
                      </span>
                      <span className="font-bold">-{formatPrice(discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-[#635d58] font-body-sm text-[11px]">
                    <span>Impuestos Locales Incluidos (21% IVA)</span>
                    <span>{formatPrice(taxes)}</span>
                  </div>

                  {/* Grand Total */}
                  <div className="pt-4 mt-2 flex justify-between items-baseline bg-[#f5f2fb] -mx-7 sm:-mx-8 px-7 sm:px-8 py-4 border-y border-[#d3c3ba]/30">
                    <div>
                      <span className="font-headline-sm text-base text-[#1b1b21]">Total a Pagar</span>
                      <p className="font-body-sm text-[10px] text-[#635d58]">
                        Sin sorpresas en aduanas ni cargos ocultos
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-headline-lg text-2xl sm:text-3xl text-[#1b1b21] font-semibold">
                        {formatPrice(finalTotal)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Klarna 3-installment Pill */}
                <div className="p-3 rounded-2xl bg-[#f1daff]/40 flex items-center justify-between gap-3 text-[#1b1b21] border border-[#71518c]/20">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-xs font-bold bg-[#ffb3c7] text-[#0a0a0a] px-2 py-0.5 rounded-md">
                      Klarna.
                    </span>
                    <span className="font-body-sm text-xs text-[#4f453e]">
                      O 3 cuotas sin intereses de{' '}
                      <strong className="font-semibold text-[#765843]">
                        {formatPrice(klarnaPart)}
                      </strong>
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[#635d58] text-sm">info</span>
                </div>

                {/* Primary CTA */}
                <button
                  type="button"
                  disabled={cart.length === 0}
                  onClick={() => setIsCheckoutOpen(true)}
                  className={`w-full py-4 rounded-full text-white font-label-md text-sm font-semibold shadow-lg hover:shadow-[0_0_24px_rgba(197,160,135,0.45)] transition-all flex items-center justify-center gap-2.5 group cursor-pointer ${
                    cart.length === 0
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-[#765843] hover:bg-[#5c412d]'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">lock</span>
                  <span>Finalizar Pedido Seguro</span>
                  <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </button>

                {/* Perfect Fit & Lifetime Care Reassurance */}
                <div className="flex flex-col gap-3 pt-2 text-xs">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#765843] text-lg flex-shrink-0">
                      published_with_changes
                    </span>
                    <div>
                      <p className="font-label-md text-xs text-[#1b1b21] font-semibold">
                        Garantía de Ajuste Absoluto
                      </p>
                      <p className="font-body-sm text-[11px] text-[#635d58] mt-0.5">
                        Si una cápsula no encaja con tu lecho ungueal, te enviamos 2 uñas individuales de reemplazo sin costo.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#71518c] text-lg flex-shrink-0">
                      eco
                    </span>
                    <div>
                      <p className="font-label-md text-xs text-[#1b1b21] font-semibold">
                        Reutilizables +5 Veces
                      </p>
                      <p className="font-body-sm text-[11px] text-[#635d58] mt-0.5">
                        Estructuradas con gel coreano multicapa que no se decolora, agrieta ni pierde brillo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Help & Artisan Chat Callout */}
              <div className="p-5 rounded-3xl bg-[#f5f2fb]/70 backdrop-blur-md flex items-center justify-between border border-[#d3c3ba]/30">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#765843] text-2xl">
                    support_agent
                  </span>
                  <div>
                    <p className="font-label-md text-xs text-[#1b1b21] font-semibold">
                      ¿Dudas con tus medidas milimétricas?
                    </p>
                    <p className="font-body-sm text-[11px] text-[#635d58]">
                      Chatea con una manicurista del atelier en tiempo real
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    showToast(
                      "Manicurista Elena conectada",
                      "Puedes enviarnos tus medidas o foto de tu mano por WhatsApp Atelier",
                      'info'
                    )
                  }
                  className="px-4 py-2 rounded-full bg-white text-[#1b1b21] font-label-sm text-xs font-semibold hover:bg-[#eae7ef] transition-colors shadow-xs cursor-pointer"
                >
                  Asistencia
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};
