import React from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    navigateToProduct,
    formatPrice
  } = useApp();

  if (!isWishlistOpen) return null;

  const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end"
      onClick={() => setIsWishlistOpen(false)}
    >
      <div
        className="w-full max-w-md h-full bg-[#fbf8ff] shadow-2xl flex flex-col p-6 overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#d3c3ba]/30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#71518c] text-2xl">favorite</span>
            <h3 className="font-headline-sm text-lg text-[#1b1b21]">Tu Joyero de Favoritos</h3>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 rounded-full hover:bg-[#eae7ef] text-[#635d58]"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 py-4 flex flex-col gap-4">
          {wishlistProducts.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-4xl text-[#d3c3ba]">favorite_border</span>
              <p className="font-headline-sm text-base text-[#1b1b21]">Tu lista de deseos está vacía</p>
              <p className="font-body-sm text-xs text-[#635d58] max-w-xs">
                Guarda tus piezas favoritas haciendo clic en el corazón para compararlas o adquirirlas más tarde.
              </p>
            </div>
          ) : (
            wishlistProducts.map(product => (
              <div
                key={product.id}
                className="p-3.5 rounded-2xl bg-white shadow-sm border border-[#d3c3ba]/30 flex gap-3.5 items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  onClick={() => {
                    navigateToProduct(product.id);
                    setIsWishlistOpen(false);
                  }}
                  className="w-20 h-24 object-cover rounded-xl bg-[#efecf5] cursor-pointer"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                  <div>
                    <h4
                      onClick={() => {
                        navigateToProduct(product.id);
                        setIsWishlistOpen(false);
                      }}
                      className="font-headline-sm text-sm text-[#1b1b21] hover:text-[#765843] transition-colors cursor-pointer truncate"
                    >
                      {product.name}
                    </h4>
                    <p className="font-label-caps text-[10px] text-[#71518c] mt-0.5">
                      {product.shapeName} • {product.length}
                    </p>
                    <span className="font-headline-sm text-sm font-semibold text-[#765843] mt-1 block">
                      {formatPrice(product.price)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => {
                        addToCart({
                          productId: product.id,
                          name: product.name,
                          subtitle: product.subtitle,
                          price: product.price,
                          quantity: 1,
                          shape: product.shapeName,
                          length: product.length === 'corta' ? 'Corta (16 mm)' : product.length === 'media' ? 'Media (21 mm)' : 'Larga (26 mm)',
                          size: 'S',
                          sizeSpecs: 'S (15-11-12-11-9 mm)',
                          finish: 'Brillo Cristal',
                          adhesive: 'Jelly Tabs (3-5 días)',
                          image: product.image
                        });
                      }}
                      className="px-3 py-1.5 rounded-full bg-[#765843] text-white font-label-sm text-xs font-semibold hover:bg-[#5c412d] transition-all flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">add_shopping_cart</span>
                      <span>Añadir</span>
                    </button>

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="p-1.5 rounded-full text-[#635d58] hover:text-[#ba1a1a] transition-colors"
                      title="Eliminar de favoritos"
                    >
                      <span className="material-symbols-outlined text-base">delete_outline</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {wishlistProducts.length > 0 && (
          <div className="pt-4 border-t border-[#d3c3ba]/30">
            <button
              onClick={() => {
                wishlistProducts.forEach(p => {
                  addToCart({
                    productId: p.id,
                    name: p.name,
                    subtitle: p.subtitle,
                    price: p.price,
                    quantity: 1,
                    shape: p.shapeName,
                    length: 'Media (21 mm)',
                    size: 'S',
                    sizeSpecs: 'S (15-11-12-11-9 mm)',
                    finish: 'Brillo Cristal',
                    adhesive: 'Jelly Tabs (3-5 días)',
                    image: p.image
                  });
                });
                setIsWishlistOpen(false);
              }}
              className="w-full py-3 rounded-full bg-[#1b1b21] text-white font-label-md text-xs font-semibold hover:bg-[#765843] transition-colors shadow-md"
            >
              Mudar Todo a la Bolsa ({wishlistProducts.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
