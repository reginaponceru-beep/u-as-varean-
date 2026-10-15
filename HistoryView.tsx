import React from 'react';
import { useApp } from '../context/AppContext';

export const HistoryView: React.FC = () => {
  const { setCurrentView, setIsBespokeStudioOpen } = useApp();

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
          <span className="text-[#765843] font-semibold">Nuestra Historia</span>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <span className="font-label-caps text-xs uppercase text-[#765843] tracking-widest font-bold">
              Fundado en París • 2021
            </span>
            <h1 className="font-display-hero text-3xl sm:text-5xl text-[#1b1b21] leading-tight">
              Donde la Alta Moda converge con la Orfebrería en Miniatura.
            </h1>
            <p className="font-body-lg text-sm sm:text-base text-[#4f453e] leading-relaxed">
              Atelier L'Aura nació con una misión innegociable: desterrar las uñas postizas de plástico industrial y devolver a las manos el estatus de lienzo de alta joyería. Cada cápsula es moldeada anatómicamente en gel estructurado japonés y esmaltada trazo a trazo con pinceles de pelo de marta 000.
            </p>
            <div className="flex items-center gap-6 pt-3">
              <div>
                <span className="font-headline-lg text-2xl font-bold text-[#765843]">100%</span>
                <p className="font-label-caps text-[10px] text-[#635d58] uppercase">Pintado a mano</p>
              </div>
              <div className="h-8 w-px bg-[#d3c3ba]/40"></div>
              <div>
                <span className="font-headline-lg text-2xl font-bold text-[#71518c]">+10</span>
                <p className="font-label-caps text-[10px] text-[#635d58] uppercase">Usos reutilizables</p>
              </div>
              <div className="h-8 w-px bg-[#d3c3ba]/40"></div>
              <div>
                <span className="font-headline-lg text-2xl font-bold text-[#1b1b21]">4.5h</span>
                <p className="font-label-caps text-[10px] text-[#635d58] uppercase">Dedicadas por set</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-[#efecf5] border border-white/80">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4fkYCxZAs2fu--xjzCdmZaPsTkda27Kx-0ahQBn3dQV_wIkGf8JsCYGDvl0BZ6VYntHojj0LY8mb0YgWFUshh7kTw4SA-3N3JAj9ILcqYcCfMl9Qjs2d9Fe59l61ZhkO_3jR9jiFmJQjMKtYkE8WmE0pcITzNole2rDmJ4qcVFEKWPx1a7IByvXNI33EgKWts2f8nfhv_2Bt59q-SzZZltQzoNpE3Kg4WpxPg88htNGBNz93agPDo"
                alt="Maestra artesana en el taller parisino"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Pillars of Excellence */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 rounded-3xl bg-white shadow-xs border border-[#d3c3ba]/30 flex flex-col gap-3">
            <span className="material-symbols-outlined text-3xl text-[#765843]">palette</span>
            <h3 className="font-headline-sm text-lg text-[#1b1b21]">Micro-óleo Renacentista</h3>
            <p className="font-body-md text-xs sm:text-sm text-[#4f453e] leading-relaxed">
              No utilizamos plantillas ni estampados mecánicos. Cada ramita botánica, mariposa y nervadura mineral es creada con óleos y tintas de alta pigmentación formuladas en nuestro propio laboratorio.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white shadow-xs border border-[#d3c3ba]/30 flex flex-col gap-3">
            <span className="material-symbols-outlined text-3xl text-[#71518c]">diamond</span>
            <h3 className="font-headline-sm text-lg text-[#1b1b21]">Gemas & Oro Auténtico</h3>
            <p className="font-body-md text-xs sm:text-sm text-[#4f453e] leading-relaxed">
              Incrustamos perlas naturales de agua dulce seleccionadas una a una, hojilla de oro puro de 18 y 24 quilates y cristales Swarovski con triple sellado vítreo de polímero UV para máxima durabilidad.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white shadow-xs border border-[#d3c3ba]/30 flex flex-col gap-3">
            <span className="material-symbols-outlined text-3xl text-[#c5a087]">eco</span>
            <h3 className="font-headline-sm text-lg text-[#1b1b21]">Salud Ungueal Absoluta</h3>
            <p className="font-body-md text-xs sm:text-sm text-[#4f453e] leading-relaxed">
              Creemos firmemente que lucir uñas espectaculares jamás debe implicar dolor ni debilitamiento. Nuestro protocolo de retiro en agua tibia con aceite deja tu lecho ungueal intacto y listo para el siguiente set.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="p-10 rounded-3xl bg-[#f5f2fb] border border-[#d3c3ba]/30 text-center flex flex-col items-center gap-4">
          <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#1b1b21]">
            ¿Lista para experimentar la verdadera joyería de autor?
          </h2>
          <p className="font-body-md text-xs sm:text-sm text-[#4f453e] max-w-xl">
            Explora las 38 obras numeradas de nuestra colección 2025 o encarga una pieza única en el estudio Bespoke 3D.
          </p>
          <div className="flex gap-4 pt-2">
            <button
              onClick={() => {
                setCurrentView('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 rounded-full bg-[#765843] hover:bg-[#5c412d] text-white font-label-md text-xs font-semibold transition-all shadow-md cursor-pointer"
            >
              Ver Colecciones
            </button>
            <button
              onClick={() => setIsBespokeStudioOpen(true)}
              className="px-8 py-3.5 rounded-full bg-white text-[#1b1b21] hover:bg-[#eae7ef] font-label-md text-xs font-semibold transition-all shadow-xs border border-[#d3c3ba]/30 cursor-pointer"
            >
              Diseñar en Estudio Bespoke
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
