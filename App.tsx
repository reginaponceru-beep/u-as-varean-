/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { MeasuringGuideModal } from './components/MeasuringGuideModal';
import { MacroZoomModal } from './components/MacroZoomModal';
import { BespokeStudioModal } from './components/BespokeStudioModal';
import { CheckoutModal } from './components/CheckoutModal';

import { HomeView } from './views/HomeView';
import { CatalogView } from './views/CatalogView';
import { ProductDetailView } from './views/ProductDetailView';
import { CartView } from './views/CartView';
import { MeasuringGuideView } from './views/MeasuringGuideView';
import { HistoryView } from './views/HistoryView';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen bg-[#fbf8ff] flex flex-col font-sans selection:bg-[#ffdcc5] selection:text-[#2b1606]">
      <Header />

      <main className="w-full pt-20 bg-[#fbf8ff] flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'catalog' && <CatalogView />}
        {currentView === 'detail' && <ProductDetailView />}
        {currentView === 'cart' && <CartView />}
        {currentView === 'measuring-guide' && <MeasuringGuideView />}
        {currentView === 'history' && <HistoryView />}
      </main>

      <Footer />

      {/* Global Modals & Drawers */}
      <SearchModal />
      <WishlistDrawer />
      <MeasuringGuideModal />
      <MacroZoomModal />
      <BespokeStudioModal />
      <CheckoutModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
