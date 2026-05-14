import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import TemplateCard from '../components/TemplateCard';
import { TEMPLATES, CATEGORIES } from '../data';

export default function CatalogPage({ onCheckout }) {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = TEMPLATES.filter(t =>
    activeCategory === 'all' || t.category === activeCategory
  );

  // Re-observe .reveal elements setiap kali filtered berubah
  // (fix: kartu tidak muncul setelah filter ganti dari kategori kosong)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );
    // Sedikit delay supaya DOM sudah render sebelum observe
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 30);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, [filtered.length, activeCategory]);

  const handlePreview = (template) => {
    if (template.previewId) {
      navigate(`/preview/${template.previewId}`);
    } else {
      alert(`Preview "${template.name}" sedang dalam pengembangan.`);
    }
  };

  return (
    <div className="min-h-screen pt-[68px]">

      {/* ── HERO — compact ── */}
      <div className="relative overflow-hidden px-8 pt-10 pb-6 text-center bg-cream">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 80%, rgba(220,231,215,0.4) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 20%, rgba(230,179,211,0.2) 0%, transparent 55%)' }} />
        <div className="relative z-[1] max-w-[680px] mx-auto">
          <div className="section-badge">✦ Katalog Template</div>
          <h1 className="font-display text-[clamp(28px,4vw,42px)] font-normal leading-[1.12] text-charcoal mb-0">
            Temukan Template <em className="italic text-purple">Impianmu</em>
          </h1>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-[1300px] mx-auto px-8 pt-8 pb-20 grid gap-10 items-start md:grid-cols-[200px_1fr]">

        {/* Sidebar */}
        <div className="md:sticky md:top-[88px] flex flex-wrap gap-1.5 md:flex-col md:gap-0">
          <div className="w-full text-[11px] font-semibold tracking-[1.5px] uppercase text-gray-mid mb-2">Kategori</div>
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={[
                'flex items-center justify-between gap-2 px-[0.9rem] py-[0.55rem] font-body text-[13.5px] text-left border-none rounded-sm cursor-pointer transition-all duration-200 mb-0.5 md:w-full',
                activeCategory === cat.key
                  ? 'bg-[rgba(142,74,151,0.1)] text-purple font-medium'
                  : 'bg-transparent text-charcoal-soft hover:text-purple hover:bg-[rgba(142,74,151,0.06)] font-normal',
              ].join(' ')}
            >
              {cat.label}
              <span className={`text-[11px] px-1.5 py-px rounded-full ${activeCategory === cat.key ? 'bg-purple text-white' : 'bg-gray-light text-gray-mid'}`}>
                {cat.key === 'all' ? TEMPLATES.length : TEMPLATES.filter(t => t.category === cat.key).length}
              </span>
            </button>
          ))}
        </div>

        {/* Main */}
        <div>
          <div className="flex items-center justify-between mb-6 text-[13.5px] text-gray-mid">
            <span>{filtered.length} template</span>
            {activeCategory !== 'all' && (
              <button
                className="bg-transparent border-none cursor-pointer text-purple text-[13px] font-body underline"
                onClick={() => setActiveCategory('all')}
              >
                Reset filter
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center text-center gap-4 py-16 px-8">
              <div className="text-[2.5rem] opacity-30">✦</div>
              <h3 className="font-display text-[22px] font-normal text-charcoal">
                Belum ada template {CATEGORIES.find(c => c.key === activeCategory)?.label}
              </h3>
              <p className="text-[13.5px] text-gray-mid max-w-[280px]">
                Template kategori ini sedang dalam pengerjaan. Cek kembali sebentar lagi!
              </p>
              <button
                className="mt-2 px-6 py-[0.7rem] text-[14px] font-medium text-white border-none rounded-[36px] cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #8E4A97, #6B3572)' }}
                onClick={() => setActiveCategory('all')}
              >
                Lihat Semua Template
              </button>
            </div>
          ) : (
            <div className="grid gap-6 reveal" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
              {filtered.map(t => (
                <TemplateCard key={t.previewId || t.id} template={t} onCheckout={onCheckout} onPreview={handlePreview} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── CTA STRIP ── */}
      <div
        className="flex items-center justify-between gap-4 flex-wrap px-8 py-6 text-[14px] text-charcoal"
        style={{ background: 'linear-gradient(135deg, #DCE7D7 0%, #F2D5E9 100%)' }}
      >
        <div>
          <strong className="font-medium">Tidak menemukan yang cocok?</strong>
          <span> Kami bisa buat template custom sesuai keinginanmu.</span>
        </div>
        <button
          className="px-6 py-[0.7rem] text-[14px] font-medium text-white border-none rounded-[36px] cursor-pointer shadow-[0_4px_16px_rgba(142,74,151,0.28)] hover:-translate-y-px transition-all duration-200"
          style={{ background: 'linear-gradient(135deg, #8E4A97, #6B3572)' }}
          onClick={() => onCheckout?.()}
        >
          Request Custom →
        </button>
      </div>
    </div>
  );
}
