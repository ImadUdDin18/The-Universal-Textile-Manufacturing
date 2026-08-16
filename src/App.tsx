import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { B2BPage } from './pages/B2BPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { AdminPortal } from './components/AdminPortal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { B2BQuoteModal } from './components/B2BQuoteModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { GsmCalculatorModal } from './components/GsmCalculatorModal';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  const { currentView } = useShop();

  const renderActivePage = () => {
    switch (currentView) {
      case 'home':
        return <HomePage />;
      case 'catalog':
        return <CatalogPage />;
      case 'categories':
        return <CategoriesPage />;
      case 'b2b':
        return <B2BPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'track-order':
      case 'track':
        return <TrackOrderPage />;
      case 'admin':
        return <AdminPortal />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F3F4F6] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Sticky Luxury Navbar */}
      <Navbar />

      {/* Main Dynamic View Page */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Global Interactive Overlays & Modals */}
      <ProductDetailModal />
      <B2BQuoteModal />
      <CartDrawer />
      <CheckoutModal />
      <GsmCalculatorModal />
      <ToastContainer />

      {/* World-Class Luxury Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
