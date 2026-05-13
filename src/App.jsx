import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CheckoutModal from './components/CheckoutModal';
import LandingPage from './pages/LandingPage';
import CatalogPage from './pages/CatalogPage';
import PreviewPage from './pages/PreviewPage';
import CursorSmoke from './components/CursorSmoke';
import PaperPlane from './components/PaperPlane';
import './styles/globals.css';

// ── Dynamic testimonials ──────────────────────────────────────────────────
// In production, fetch dari backend (POST-payment review submissions).
// localStorage dipakai untuk demo. Ganti dengan:
// const res = await fetch('/api/testimonials'); setDynamicTestis(await res.json());
function loadTestimonials() {
  try {
    return JSON.parse(localStorage.getItem('undigo_testimonials') || '[]');
  } catch { return []; }
}

function AppShell({
  openCheckout,
  checkoutOpen,
  setCheckoutOpen,
  selectedTemplate,
  dynamicTestimonials,
  handleNewTestimonial,
}) {
  const location = useLocation();
  const isPreview = location.pathname.startsWith('/preview/');

  return (
    <>
      <CursorSmoke />
      {!isPreview && <PaperPlane />}

      {/* Navbar tidak lagi menerima onCheckout — tombol "Buat Undangan" sudah dihapus */}
      {!isPreview && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            // LandingPage tidak lagi menerima onCheckout — semua CTA mengarah ke /katalog
            <LandingPage dynamicTestimonials={dynamicTestimonials} />
          }
        />
        <Route
          path="/katalog"
          element={<CatalogPage onCheckout={openCheckout} />}
        />
        <Route
          path="/preview/:templateId"
          element={<PreviewPage onCheckout={openCheckout} />}
        />
      </Routes>

      {!isPreview && <Footer />}

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        selectedTemplate={selectedTemplate}
        onSuccess={handleNewTestimonial}
      />
    </>
  );
}

export default function App() {
  const [checkoutOpen, setCheckoutOpen]       = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [dynamicTestimonials, setDynamicTestimonials] = useState(loadTestimonials);

  const handleNewTestimonial = (t) => {
    const updated = [t, ...dynamicTestimonials].slice(0, 20);
    setDynamicTestimonials(updated);
    try { localStorage.setItem('undigo_testimonials', JSON.stringify(updated)); } catch {}
  };

  const openCheckout = (template = null) => {
    setSelectedTemplate(template);
    setCheckoutOpen(true);
  };

  return (
    <BrowserRouter>
      <AppShell
        openCheckout={openCheckout}
        checkoutOpen={checkoutOpen}
        setCheckoutOpen={setCheckoutOpen}
        selectedTemplate={selectedTemplate}
        dynamicTestimonials={dynamicTestimonials}
        handleNewTestimonial={handleNewTestimonial}
      />
    </BrowserRouter>
  );
}
