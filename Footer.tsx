import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const { setCurrentView, setIsBespokeStudioOpen, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Por favor introduce un correo válido', undefined, 'info');
      return;
    }
    setSubscribed(true);
    showToast('Bienvenida al Círculo Privado de Atelier L\'Aura', 'Recibirás preventas exclusivas y cápsulas limitadas', 'success');
    setEmail('');
  };

  return (
    <footer className="w-full bg-[#f5f2fb]/80 border-t border-[#d3c3ba]/30 relative overflow-hidden mt-16">
      {/* Ambient glow in background */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#f1daff]/30 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-[#d3c3ba]/30">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <Logo size="sm" />

            <p className="font-body-md text-sm text-[#4f453e] max-w-md leading-relaxed">
              Santuario de orfebrería de autor para uñas de presión. Cada set es minuciosamente pincelado a mano alzada en nuestro estudio parisino, fundiendo alta moda y gemología sobre cápsulas de gel estructurado.
            </p>

            <div className="flex flex-col gap-3 pt-2">
              <span className="font-label-caps text-[11px] uppercase text-[#765843] tracking-widest font-bold">
                Suscripción VIP al Atelier
              </span>

              {subscribed ? (
                <div className="p-3.5 rounded-2xl bg-[#ffdcc5]/60 text-[#765843] font-label-md text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span>¡Invitación confirmada! Acceso prioritario activo.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-md bg-white/90 p-1.5 rounded-full border border-[#d3c3ba]/40 shadow-sm">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent px-4 py-2 font-body-sm text-xs text-[#1b1b21] placeholder:text-[#635d58] focus:outline-none"
                    placeholder="Introduce tu correo para acceso prioritario"
                    type="email"
                  />
                  <button
                    className="px-5 py-2.5 rounded-full bg-[#765843] hover:bg-[#5c412d] text-white font-label-md text-xs font-semibold transition-all shadow-sm hover:shadow-[0_0_20px_rgba(197,160,135,0.45)] cursor-pointer"
                    type="submit"
                  >
                    Unirse
                  </button>
                </form>
              )}

              <span className="font-body-sm text-[#635d58] text-[11px]">
                Invitaciones privadas a lanzamientos limitados y preventas de temporada.
              </span>
            </div>
          </div>

          {/* Links: Experiencia Atelier */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-headline-sm text-[18px] text-[#1b1b21] font-semibold">
              Experiencia Atelier
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li
                onClick={() => {
                  setCurrentView('catalog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="font-body-md text-[#4f453e] hover:text-[#765843] transition-colors cursor-pointer"
              >
                Colección Permanente
              </li>
              <li
                onClick={() => {
                  setCurrentView('catalog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="font-body-md text-[#4f453e] hover:text-[#765843] transition-colors cursor-pointer"
              >
                Lanzamientos Cápsula
              </li>
              <li
                onClick={() => setIsBespokeStudioOpen(true)}
                className="font-body-md text-[#4f453e] hover:text-[#765843] transition-colors cursor-pointer"
              >
                Estudio Bespoke 3D
              </li>
              <li
                onClick={() => {
                  setCurrentView('measuring-guide');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="font-body-md text-[#4f453e] hover:text-[#765843] transition-colors cursor-pointer"
              >
                Sizing Kit Físico
              </li>
              <li
                onClick={() => showToast('Certificados de Regalo disponibles en checkout', undefined, 'info')}
                className="font-body-md text-[#4f453e] hover:text-[#765843] transition-colors cursor-pointer"
              >
                Certificados de Regalo
              </li>
            </ul>
          </div>

          {/* Links: Garantía y Cuidado */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-headline-sm text-[18px] text-[#1b1b21] font-semibold">
              Garantía y Cuidado
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li
                onClick={() => {
                  setCurrentView('measuring-guide');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="font-body-md text-[#4f453e] hover:text-[#765843] transition-colors cursor-pointer"
              >
                Guía de Tallas Milimétrica
              </li>
              <li
                onClick={() => showToast('Garantía de ajuste: reposición gratuita de hasta 2 uñas', undefined, 'info')}
                className="font-body-md text-[#4f453e] hover:text-[#765843] transition-colors cursor-pointer"
              >
                Garantía de Ajuste Perfecto
              </li>
              <li
                onClick={() => {
                  setCurrentView('measuring-guide');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="font-body-md text-[#4f453e] hover:text-[#765843] transition-colors cursor-pointer"
              >
                Protocolo de Retiro Seguro
              </li>
              <li
                onClick={() => showToast('Adhesión con Jelly tabs dura 3-5 días; con pegamento dura +3 semanas', undefined, 'info')}
                className="font-body-md text-[#4f453e] hover:text-[#765843] transition-colors cursor-pointer"
              >
                Preguntas sobre Adhesión
              </li>
              <li
                onClick={() => showToast('Devoluciones gratuitas con precinto intacto', undefined, 'info')}
                className="font-body-md text-[#4f453e] hover:text-[#765843] transition-colors cursor-pointer"
              >
                Devoluciones y Cambios
              </li>
            </ul>
          </div>

          {/* Sellos de Excelencia */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-headline-sm text-[18px] text-[#1b1b21] font-semibold">
              Sellos de Excelencia
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 border border-white/90 shadow-sm">
                <span className="material-symbols-outlined text-[#765843] text-2xl">verified</span>
                <div className="flex flex-col">
                  <span className="font-label-md text-xs font-semibold text-[#1b1b21]">
                    100% Hecho a Mano
                  </span>
                  <span className="font-body-sm text-[11px] text-[#635d58]">
                    Pintado al óleo sobre gel
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 border border-white/90 shadow-sm">
                <span className="material-symbols-outlined text-[#71518c] text-2xl">lock</span>
                <div className="flex flex-col">
                  <span className="font-label-md text-xs font-semibold text-[#1b1b21]">
                    Pagos Seguros y Encriptados
                  </span>
                  <span className="font-body-sm text-[11px] text-[#635d58]">
                    Checkout certificado SSL 256-bit
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 border border-white/90 shadow-sm">
                <span className="material-symbols-outlined text-[#c5a087] text-2xl">inventory_2</span>
                <div className="flex flex-col">
                  <span className="font-label-md text-xs font-semibold text-[#1b1b21]">
                    Kit de Colocación Luxury
                  </span>
                  <span className="font-body-sm text-[11px] text-[#635d58]">
                    Incluido gratis en cada pedido
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[#635d58] font-body-sm text-xs">
          <p>© 2025 Atelier L'Aura Haute Parfumerie & Nail Architecture. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6 font-label-sm text-xs">
            <span className="hover:text-[#1b1b21] transition-colors cursor-pointer">
              Términos del Servicio
            </span>
            <span className="hover:text-[#1b1b21] transition-colors cursor-pointer">
              Privacidad y Cookies
            </span>
            <span className="hover:text-[#1b1b21] transition-colors cursor-pointer">
              Sostenibilidad y Ética
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
