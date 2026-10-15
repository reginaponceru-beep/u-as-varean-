import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { PRODUCTS } from '../data/products';

export type ViewType = 'home' | 'catalog' | 'detail' | 'cart' | 'measuring-guide' | 'bespoke' | 'history';

interface ToastState {
  message: string;
  subtext?: string;
  visible: boolean;
  type?: 'success' | 'cart' | 'info' | 'undo';
  onUndo?: () => void;
}

interface AppContextType {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  selectedProductId: string;
  setSelectedProductId: (id: string) => void;
  selectedProduct: Product;
  
  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  lastRemovedItem: CartItem | null;
  undoRemove: () => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;
  discountPercent: number;
  setDiscountPercent: (percent: number) => void;
  appliedPromoCode: string;
  applyPromoCode: (code: string) => { success: boolean; message: string };

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Currency
  currency: 'MXN' | 'EUR' | 'USD';
  setCurrency: (c: 'MXN' | 'EUR' | 'USD') => void;
  formatPrice: (amountInEur: number) => string;

  // Modals & Drawers
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isMeasuringGuideOpen: boolean;
  setIsMeasuringGuideOpen: (open: boolean) => void;
  isMacroZoomOpen: boolean;
  setIsMacroZoomOpen: (open: boolean) => void;
  isBespokeStudioOpen: boolean;
  setIsBespokeStudioOpen: (open: boolean) => void;
  activeStudioStyle: 'minimalista' | 'elegante' | 'tierno' | 'artistico' | 'llamativo' | 'personalizado' | null;
  openStyleStudio: (style: 'minimalista' | 'elegante' | 'tierno' | 'artistico' | 'llamativo' | 'personalizado') => void;
  closeStyleStudio: () => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  // Filters from Navigation
  activeStyleFilter: string | null;
  setActiveStyleFilter: (style: string | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Toast
  toast: ToastState | null;
  showToast: (message: string, subtext?: string, type?: 'success' | 'cart' | 'info' | 'undo', onUndo?: () => void) => void;
  hideToast: () => void;

  // Navigation helpers
  navigateToProduct: (productId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('catalog');
  const [selectedProductId, setSelectedProductId] = useState<string>('aura-nacar');
  
  // Initial cart populated with items from the mockup
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'cart-1',
      productId: 'nacar-botanique',
      name: "Nácar Botánico & Hojas de Oro",
      subtitle: "Edición Couture",
      price: 18,
      quantity: 1,
      shape: "Almendra",
      length: "Media (21 mm)",
      size: "M",
      sizeSpecs: "M (15-11-12-11-9 mm)",
      finish: "Brillo Cristal",
      adhesive: "Jelly Tabs (3-5 días)",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlYzjfyOa8MhhDG9LrSz0e9Yw_DW3nn9FSEptKzNMw_QdBJUZ9QBm5L2DT5ub1zklU93bz-WGMJmzzD7ckpI0uZDKR1Twbb3SVI8AXG_5-CBjF5evP6Y6ajR_ihGudEYBpXkiGQIi3uu6zF0NPP8zH_8DaDdNnX0DsyPznQ48Jj5ccrWcGAdaEFShv5P4CX8JE0qeqhcwhVEX6AN2M-a7IoJn9bM8JklcgTNDXM4Mu77faJxH0Sbs8"
    },
    {
      id: 'cart-2',
      productId: 'aura-amethyste',
      name: "Constellation Améthyste",
      subtitle: "Aura Mystique",
      price: 18,
      quantity: 1,
      shape: "Coffin Corto",
      length: "Corta (16 mm)",
      size: "S",
      sizeSpecs: "S (14-10-11-10-8 mm)",
      finish: "Chrome Velvet",
      adhesive: "Pegamento Médico (+3 semanas)",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2v_fOWVVPAQMy2-2saKw8xz7ciwlMWnt22077pC6l1n0h6B4pOrbMY4i6vormip1zn1HXWG6L0zuS1xcWiqvt5QHNgLqC-NshyEpeJEuZa5pBu-Jb_31s-2Cytb32yKjGYp3v79IY8Ixil4Z87NoN5JZIMY4kjicdpwH-SmO27N7F0K7CLJ4lz_ygaDrT9dx8MD2dCx9kuAxKtGXktJv3j4ctfNyVXvzEZgd-xvoZ5rdZ2TgN_Eub"
    }
  ]);

  const [lastRemovedItem, setLastRemovedItem] = useState<CartItem | null>(null);
  const [wishlist, setWishlist] = useState<string[]>(['aura-nacar', 'nacar-botanique', 'fleur-de-nacre']);
  const [currency, setCurrency] = useState<'MXN' | 'EUR' | 'USD'>('MXN');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [appliedPromoCode, setAppliedPromoCode] = useState<string>('');

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMeasuringGuideOpen, setIsMeasuringGuideOpen] = useState(false);
  const [isMacroZoomOpen, setIsMacroZoomOpen] = useState(false);
  const [isBespokeStudioOpen, setIsBespokeStudioOpen] = useState(false);
  const [activeStudioStyle, setActiveStudioStyle] = useState<
    'minimalista' | 'elegante' | 'tierno' | 'artistico' | 'llamativo' | 'personalizado' | null
  >(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const openStyleStudio = (
    style: 'minimalista' | 'elegante' | 'tierno' | 'artistico' | 'llamativo' | 'personalizado'
  ) => {
    setActiveStudioStyle(style);
    setIsBespokeStudioOpen(true);
  };

  const closeStyleStudio = () => {
    setIsBespokeStudioOpen(false);
    setActiveStudioStyle(null);
  };

  // Filters
  const [activeStyleFilter, setActiveStyleFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Toast
  const [toast, setToast] = useState<ToastState | null>(null);

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const selectedProduct = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];

  const showToast = (message: string, subtext?: string, type: 'success' | 'cart' | 'info' | 'undo' = 'info', onUndo?: () => void) => {
    setToast({ message, subtext, visible: true, type, onUndo });
    const timer = setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 4500);
    return () => clearTimeout(timer);
  };

  const hideToast = () => {
    setToast(null);
  };

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...item,
      id: `cart-${Date.now()}`
    };
    setCart(prev => [newItem, ...prev]);
    showToast(
      `Obra agregada a tu Atelier`,
      `${newItem.name} • Kit de colocación luxury de regalo`,
      'cart'
    );
  };

  const removeFromCart = (cartItemId: string) => {
    const target = cart.find(i => i.id === cartItemId);
    if (!target) return;
    setLastRemovedItem(target);
    setCart(prev => prev.filter(i => i.id !== cartItemId));
    showToast(
      `"${target.name}" retirado de tu bolsa`,
      `Puedes restaurarlo inmediatamente`,
      'undo',
      undoRemove
    );
  };

  const undoRemove = () => {
    if (!lastRemovedItem) return;
    setCart(prev => [lastRemovedItem, ...prev]);
    const restoredName = lastRemovedItem.name;
    setLastRemovedItem(null);
    showToast(`Set restaurado con éxito`, `"${restoredName}" está de nuevo en tu selección`, 'success');
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter(id => id !== productId) : [...prev, productId];
      showToast(
        exists ? "Retirado de favoritos" : "Guardado en tus favoritos",
        undefined,
        'info'
      );
      return updated;
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartTotalCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const cartSubtotal = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (['ATELIER10', 'VIP', 'LAURA', 'HAUTE'].includes(clean)) {
      setDiscountPercent(10);
      setAppliedPromoCode(clean);
      return { success: true, message: "✓ Código aplicado: 10% de cortesía Haute Joaillerie concedido." };
    } else if (clean === '') {
      return { success: false, message: "Por favor escribe un código válido." };
    } else {
      return { success: false, message: "Código no reconocido o expirado." };
    }
  };

  const formatPrice = (amountInEur: number) => {
    if (currency === 'MXN') {
      const mxn = Math.round(amountInEur * 10);
      return `$${mxn.toLocaleString('es-MX')} MXN`;
    }
    if (currency === 'USD') {
      const usd = amountInEur * 1.05;
      return `$${usd.toFixed(2)} USD`;
    }
    return `${amountInEur.toFixed(2).replace('.', ',')} €`;
  };

  const navigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProductId,
        setSelectedProductId,
        selectedProduct,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        lastRemovedItem,
        undoRemove,
        clearCart,
        cartTotalCount,
        cartSubtotal,
        discountPercent,
        setDiscountPercent,
        appliedPromoCode,
        applyPromoCode,
        wishlist,
        toggleWishlist,
        isInWishlist,
        currency,
        setCurrency,
        formatPrice,
        isSearchOpen,
        setIsSearchOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isMeasuringGuideOpen,
        setIsMeasuringGuideOpen,
        isMacroZoomOpen,
        setIsMacroZoomOpen,
        isBespokeStudioOpen,
        setIsBespokeStudioOpen,
        activeStudioStyle,
        openStyleStudio,
        closeStyleStudio,
        isCheckoutOpen,
        setIsCheckoutOpen,
        activeStyleFilter,
        setActiveStyleFilter,
        searchQuery,
        setSearchQuery,
        toast,
        showToast,
        hideToast,
        navigateToProduct
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
