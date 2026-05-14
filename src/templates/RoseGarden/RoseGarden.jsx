import { useState, useEffect, useRef } from 'react';
import { useCountdown } from '../../hooks/useCountdown';

// ─── Default Data ───────────────────────────────────────────────────────────
const DEFAULT_DATA = {
  groomName: 'Bagas',
  groomFullName: 'Bagas Satria Wibowo',
  groomParents: 'Putra dari Bpk. Eko Wibowo & Ibu Sri Lestari',
  brideName: 'Sari',
  brideFullName: 'Sari Intan Permata',
  brideParents: 'Putri dari Bpk. Haryanto & Ibu Dewi Rahayu',
  weddingDate: '2025-11-08',
  weddingDateDisplay: 'Sabtu, 8 November 2025',
  akadTime: '08.00 – 10.00 WIB',
  akadVenue: 'Masjid Agung Sunda Kelapa',
  akadAddress: 'Jl. Taman Sunda Kelapa No.16, Menteng, Jakarta Pusat',
  akadMapsUrl: 'https://maps.google.com',
  resepsiTime: '11.00 – 15.00 WIB',
  resepsiVenue: 'The Ritz-Carlton Pacific Place',
  resepsiAddress: 'Jl. Jend. Sudirman Kav 52-53, Jakarta Selatan',
  resepsiMapsUrl: 'https://maps.google.com',
  bankName: 'Bank BCA',
  bankNumber: '8765 4321 09',
  bankHolder: 'Sari Intan Permata',
  bank2Name: 'Bank Mandiri',
  bank2Number: '1234 5678 90',
  bank2Holder: 'Bagas Satria Wibowo',
  gopayNumber: '0812-3456-7890',
  coverPhoto: null,
  groomPhoto: null,
  bridePhoto: null,
  galleryPhotos: [null, null, null, null, null, null],
};

const LOVE_STORY = [
  { year: '2020', icon: '🌱', title: 'Awal Jumpa', desc: 'Pertemuan tak terduga di sebuah taman bunga. Dua jiwa yang belum tahu takdir sedang merajut benangnya.' },
  { year: '2021', icon: '🌷', title: 'Persahabatan', desc: 'Dari teman menjadi sahabat terbaik. Setiap cerita terasa lebih indah bila bersama.' },
  { year: '2023', icon: '🌹', title: 'Jatuh Cinta', desc: 'Ketika musim semi tiba, perasaan itu tak lagi bisa disembunyikan. Hati telah memilih.' },
  { year: '2025', icon: '💍', title: 'Lamaran', desc: 'Di bawah hujan kelopak mawar, sebuah pertanyaan yang mengubah segalanya: "Maukah kamu?"' },
];

// ─── SVG Rose Ornament ───────────────────────────────────────────────────────
function RoseIcon({ size = 24, opacity = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ opacity }}>
      <path d="M12 2C12 2 8 5 8 9c0 2.2 1.8 4 4 4s4-1.8 4-4c0-4-4-7-4-7z" fill="#C8556A" opacity="0.8"/>
      <path d="M12 13C12 13 6 15 6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2 0-4-6-6-6-6z" fill="#E8899A" opacity="0.6"/>
      <path d="M12 13v9" stroke="#7A3848" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 18 C8 17 7 15 7 15" stroke="#4a7c59" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M14 17 C16 16 17 14 17 14" stroke="#4a7c59" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function PetalDivider() {
  return (
    <div className="flex items-center gap-2 justify-center my-2">
      <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #C8556A60)' }} />
      <RoseIcon size={14} />
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#C8556A50' }} />
      <RoseIcon size={18} />
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#C8556A50' }} />
      <RoseIcon size={14} />
      <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #C8556A60, transparent)' }} />
    </div>
  );
}

function PhotoPlaceholder({ className = '', style = {} }) {
  return (
    <div className={`flex items-center justify-center ${className}`} style={{ background: 'rgba(200,85,106,0.08)', ...style }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(200,85,106,0.4)" strokeWidth="1.2">
        <rect x="3" y="3" width="18" height="18" rx="3"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <path d="m21 15-5-5L5 21"/>
      </svg>
    </div>
  );
}

// ─── Scoped reveal hook ──────────────────────────────────────────────────────
function useRoseReveal(rootRef) {
  useEffect(() => {
    const container = rootRef?.current;
    if (!container) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('rg-visible'); obs.unobserve(e.target); }
      }),
      { threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
    );
    container.querySelectorAll('.rg-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [rootRef]);
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function RoseGarden({ weddingData = DEFAULT_DATA }) {
  const d = { ...DEFAULT_DATA, ...weddingData };
  const countdown = useCountdown(d.weddingDate);
  const rootRef = useRef(null);
  useRoseReveal(rootRef);

  const [rsvpSent, setRsvpSent] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({ name: '', attend: 'hadir', guests: '1', message: '' });
  const [wishes, setWishes] = useState([
    { name: 'Rahma Aulia', text: 'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah mawaddah warahmah 🌹', attend: 'hadir' },
    { name: 'Denny Kusuma', text: 'Bahagia selalu ya kak Sari & kak Bagas! Ditunggu undangan resepsinya hehe', attend: 'hadir' },
  ]);
  const [copied, setCopied] = useState('');
  const [openBank, setOpenBank] = useState(null);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  function handleRsvp() {
    if (!rsvpForm.name.trim()) return;
    setWishes(prev => [{ name: rsvpForm.name, text: rsvpForm.message, attend: rsvpForm.attend }, ...prev]);
    setRsvpSent(true);
  }

  function copyText(text, key) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(''), 2000);
    });
  }

  return (
    <div ref={rootRef} style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", background: '#1a0810', color: '#f0dde3', minHeight: '100vh', overflowX: 'hidden' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500&display=swap');

        .rg-reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.75s ease, transform 0.75s ease; }
        .rg-reveal.rg-visible { opacity: 1; transform: translateY(0); }
        .rg-reveal-delay-1 { transition-delay: 0.1s; }
        .rg-reveal-delay-2 { transition-delay: 0.2s; }
        .rg-reveal-delay-3 { transition-delay: 0.32s; }
        .rg-reveal-delay-4 { transition-delay: 0.45s; }

        .rg-petal-float {
          position: absolute;
          border-radius: 70% 30% 70% 30% / 30% 70% 30% 70%;
          animation: rg-petal-fall linear infinite;
          pointer-events: none;
        }
        @keyframes rg-petal-fall {
          0%   { transform: translateY(-40px) rotate(0deg) scale(1); opacity: 0; }
          10%  { opacity: 0.8; }
          85%  { opacity: 0.5; }
          100% { transform: translateY(110vh) rotate(540deg) scale(0.6); opacity: 0; }
        }

        .rg-bloom-btn {
          background: linear-gradient(135deg, #8B1A2A, #C8556A);
          color: #fff5f7;
          border: none;
          border-radius: 50px;
          padding: 12px 28px;
          font-family: 'Jost', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 20px rgba(200,85,106,0.35);
        }
        .rg-bloom-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(200,85,106,0.5); }

        .rg-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(200,85,106,0.25);
          border-radius: 8px;
          padding: 10px 14px;
          color: #f0dde3;
          font-family: 'Jost', sans-serif;
          font-size: 0.82rem;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .rg-input:focus { border-color: rgba(200,85,106,0.6); }
        .rg-input::placeholder { color: rgba(240,221,227,0.35); }
        .rg-select { appearance: none; -webkit-appearance: none; cursor: pointer; }

        .rg-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(200,85,106,0.18);
          border-radius: 16px;
          backdrop-filter: blur(8px);
        }

        .rg-vine-border {
          position: relative;
        }
        .rg-vine-border::before, .rg-vine-border::after {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200,85,106,0.5), transparent);
        }
        .rg-vine-border::before { top: 0; }
        .rg-vine-border::after  { bottom: 0; }

        .rg-envelope-flap {
          transform-origin: top center;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .rg-envelope-flap.open { transform: rotateX(-180deg); }

        .rg-countdown-box {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(200,85,106,0.2);
          border-radius: 12px;
          text-align: center;
          padding: 14px 12px;
          min-width: 64px;
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* SECTION 1 — COVER / HERO                               */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section style={{ minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'radial-gradient(ellipse 120% 100% at 50% 0%, #3d0a1e 0%, #1a0810 55%, #0d0408 100%)' }}>

        {/* Falling petals */}
        {[
          { left: '8%',  delay: '0s',   dur: '9s',  size: 10, color: '#C8556A' },
          { left: '22%', delay: '2.3s', dur: '11s', size: 7,  color: '#E8899A' },
          { left: '40%', delay: '1s',   dur: '8s',  size: 12, color: '#A8354A' },
          { left: '58%', delay: '3.5s', dur: '10s', size: 8,  color: '#E8899A' },
          { left: '72%', delay: '0.8s', dur: '12s', size: 9,  color: '#C8556A' },
          { left: '88%', delay: '4s',   dur: '9.5s',size: 6,  color: '#F0AABB' },
          { left: '15%', delay: '5s',   dur: '10s', size: 11, color: '#A8354A' },
          { left: '65%', delay: '2s',   dur: '8.5s',size: 7,  color: '#E8899A' },
        ].map((p, i) => (
          <div key={i} className="rg-petal-float" style={{
            left: p.left, top: '-40px', width: p.size, height: p.size * 0.7,
            background: p.color, opacity: 0.7,
            animationDelay: p.delay, animationDuration: p.dur,
          }} />
        ))}

        {/* Background pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(200,85,106,0.06) 1px, transparent 1px)', backgroundSize: '22px 22px', pointerEvents: 'none' }} />

        {/* Large rose silhouette BG */}
        <div style={{ position: 'absolute', top: '-60px', right: '-80px', width: 320, height: 320, background: 'radial-gradient(circle, rgba(200,85,106,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-40px', left: '-60px', width: 240, height: 240, background: 'radial-gradient(circle, rgba(168,53,74,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '40px 24px', width: '100%' }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.65rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C8556A', marginBottom: 24 }}>
            — Undangan Pernikahan —
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
              <path d="M30 28 C20 28 5 18 5 8 C5 3 10 1 15 3 C20 5 25 10 30 10 C35 10 40 5 45 3 C50 1 55 3 55 8 C55 18 40 28 30 28Z" fill="none" stroke="#C8556A" strokeWidth="0.8" opacity="0.6"/>
              <path d="M30 28 L30 10" stroke="#7A3848" strokeWidth="0.8" opacity="0.5"/>
            </svg>
          </div>

          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(3.2rem, 14vw, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.01em', color: '#fff', marginBottom: 4 }}>
            {d.brideName}
          </h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(1.2rem, 5vw, 1.8rem)', color: '#C8556A', marginBottom: 4 }}>&amp;</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(3.2rem, 14vw, 5.5rem)', lineHeight: 1.05, color: '#fff', marginBottom: 28 }}>
            {d.groomName}
          </h1>

          <PetalDivider />

          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '0.78rem', letterSpacing: '0.15em', color: 'rgba(240,221,227,0.65)', marginTop: 20, marginBottom: 6 }}>
            {d.weddingDateDisplay}
          </p>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '0.7rem', letterSpacing: '0.1em', color: 'rgba(240,221,227,0.45)' }}>
            {d.resepsiVenue}
          </p>

          <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 1, height: 50, background: 'linear-gradient(180deg, #C8556A, transparent)' }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#C8556A', animation: 'rg-petal-fall 2s ease-in-out infinite alternate' }} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* SECTION 2 — COUPLE PROFILE                             */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 24px', background: 'linear-gradient(180deg, #0d0408 0%, #180610 100%)' }}>
        <div className="rg-reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C8556A', marginBottom: 10 }}>Bismillahirrahmanirrahim</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(1.8rem, 8vw, 2.6rem)', color: '#f0dde3' }}>Mempelai Kami</h2>
          <PetalDivider />
        </div>

        {/* Bride */}
        <div className="rg-reveal rg-reveal-delay-1 rg-card" style={{ padding: '28px 24px', marginBottom: 16, textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
            {d.bridePhoto
              ? <img src={d.bridePhoto} alt={d.brideName} style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(200,85,106,0.4)' }} />
              : <PhotoPlaceholder className="rounded-full" style={{ width: 100, height: 100, borderRadius: '50%', border: '3px solid rgba(200,85,106,0.25)' }} />
            }
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '0.75rem', color: '#C8556A', letterSpacing: '0.1em', marginBottom: 6 }}>The Bride</p>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: 'clamp(1.4rem, 6vw, 2rem)', color: '#fff', marginBottom: 10 }}>{d.brideFullName}</h3>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '0.76rem', color: 'rgba(240,221,227,0.55)', lineHeight: 1.6 }}>{d.brideParents}</p>
        </div>

        {/* Heart connector */}
        <div className="rg-reveal" style={{ textAlign: 'center', padding: '8px 0' }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.6rem', color: '#C8556A' }}>&amp;</span>
        </div>

        {/* Groom */}
        <div className="rg-reveal rg-reveal-delay-1 rg-card" style={{ padding: '28px 24px', marginTop: 16, textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
            {d.groomPhoto
              ? <img src={d.groomPhoto} alt={d.groomName} style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(200,85,106,0.4)' }} />
              : <PhotoPlaceholder className="rounded-full" style={{ width: 100, height: 100, borderRadius: '50%', border: '3px solid rgba(200,85,106,0.25)' }} />
            }
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '0.75rem', color: '#C8556A', letterSpacing: '0.1em', marginBottom: 6 }}>The Groom</p>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: 'clamp(1.4rem, 6vw, 2rem)', color: '#fff', marginBottom: 10 }}>{d.groomFullName}</h3>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '0.76rem', color: 'rgba(240,221,227,0.55)', lineHeight: 1.6 }}>{d.groomParents}</p>
        </div>

        {/* Love story */}
        <div className="rg-reveal" style={{ marginTop: 56, textAlign: 'center', marginBottom: 32 }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C8556A', marginBottom: 10 }}>Our Journey</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(1.6rem, 7vw, 2.2rem)', color: '#f0dde3' }}>Kisah Cinta Kami</h2>
        </div>

        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, transform: 'translateX(-50%)', background: 'linear-gradient(180deg, transparent, rgba(200,85,106,0.3), transparent)' }} />

          {LOVE_STORY.map((item, i) => (
            <div key={i} className={`rg-reveal rg-reveal-delay-${(i % 4) + 1}`} style={{ display: 'flex', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse', gap: 16, marginBottom: 28, alignItems: 'center' }}>
              <div style={{ flex: 1, textAlign: i % 2 === 0 ? 'right' : 'left' }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '0.72rem', color: '#C8556A', marginBottom: 4 }}>{item.year}</p>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: '1rem', color: '#f0dde3', marginBottom: 4 }}>{item.title}</h4>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '0.72rem', color: 'rgba(240,221,227,0.5)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(200,85,106,0.15)', border: '1px solid rgba(200,85,106,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.85rem', zIndex: 1 }}>
                {item.icon}
              </div>
              <div style={{ flex: 1 }} />
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* SECTION 3 — COUNTDOWN                                  */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 24px', background: 'radial-gradient(ellipse 100% 80% at 50% 50%, #3d0a1e 0%, #1a0810 70%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(200,85,106,0.05) 1px, transparent 1px)', backgroundSize: '18px 18px', pointerEvents: 'none' }} />

        {/* Large decorative rose */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 300, height: 300, background: 'radial-gradient(circle, rgba(200,85,106,0.07) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div className="rg-reveal" style={{ textAlign: 'center', marginBottom: 40, position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C8556A', marginBottom: 10 }}>Menuju Hari Bahagia</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(1.8rem, 8vw, 2.6rem)', color: '#f0dde3', marginBottom: 4 }}>Hitung Mundur</h2>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '0.76rem', color: 'rgba(240,221,227,0.5)', fontStyle: 'italic' }}>{d.weddingDateDisplay}</p>
        </div>

        <div className="rg-reveal rg-reveal-delay-1" style={{ display: 'flex', justifyContent: 'center', gap: 10, position: 'relative', zIndex: 1, flexWrap: 'wrap' }}>
          {[
            { label: 'Hari', val: countdown.d },
            { label: 'Jam', val: countdown.h },
            { label: 'Menit', val: countdown.m },
            { label: 'Detik', val: countdown.s },
          ].map(({ label, val }) => (
            <div key={label} className="rg-countdown-box" style={{ minWidth: 72 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 9vw, 3rem)', color: '#fff', lineHeight: 1 }}>
                {String(val).padStart(2, '0')}
              </div>
              <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C8556A', marginTop: 4 }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        <div className="rg-reveal rg-reveal-delay-2" style={{ textAlign: 'center', marginTop: 36, position: 'relative', zIndex: 1 }}>
          <PetalDivider />
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(0.9rem, 4vw, 1.15rem)', color: 'rgba(240,221,227,0.65)', marginTop: 16, lineHeight: 1.8, maxWidth: 280, margin: '16px auto 0' }}>
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri."
          </p>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.65rem', color: '#C8556A', marginTop: 8, letterSpacing: '0.1em' }}>— QS. Ar-Rum: 21 —</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* SECTION 4 — DETAIL ACARA                               */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 24px', background: 'linear-gradient(180deg, #0d0408 0%, #160610 100%)' }}>
        <div className="rg-reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C8556A', marginBottom: 10 }}>Save The Date</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(1.8rem, 8vw, 2.6rem)', color: '#f0dde3' }}>Detail Acara</h2>
          <PetalDivider />
        </div>

        {/* Akad */}
        <div className="rg-reveal rg-reveal-delay-1 rg-card" style={{ padding: '28px 24px', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(200,85,106,0.12)', border: '1px solid rgba(200,85,106,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: '1rem' }}>🕌</span>
            </div>
            <div>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8556A', marginBottom: 2 }}>Akad Nikah</p>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: '1.15rem', color: '#f0dde3' }}>{d.weddingDateDisplay}</h3>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(200,85,106,0.12)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ color: '#C8556A', fontSize: '0.75rem', flexShrink: 0, marginTop: 1 }}>⏱</span>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '0.78rem', color: 'rgba(240,221,227,0.7)' }}>{d.akadTime}</p>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ color: '#C8556A', fontSize: '0.75rem', flexShrink: 0, marginTop: 1 }}>📍</span>
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: '0.95rem', color: '#f0dde3' }}>{d.akadVenue}</p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '0.72rem', color: 'rgba(240,221,227,0.45)', marginTop: 2 }}>{d.akadAddress}</p>
              </div>
            </div>
          </div>
          <a href={d.akadMapsUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', color: '#C8556A', textDecoration: 'none', letterSpacing: '0.06em' }}>
            <span>📍</span> Buka Google Maps →
          </a>
        </div>

        {/* Resepsi */}
        <div className="rg-reveal rg-reveal-delay-2 rg-card" style={{ padding: '28px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(200,85,106,0.12)', border: '1px solid rgba(200,85,106,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: '1rem' }}>🌹</span>
            </div>
            <div>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8556A', marginBottom: 2 }}>Resepsi</p>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: '1.15rem', color: '#f0dde3' }}>{d.weddingDateDisplay}</h3>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(200,85,106,0.12)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ color: '#C8556A', fontSize: '0.75rem', flexShrink: 0, marginTop: 1 }}>⏱</span>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '0.78rem', color: 'rgba(240,221,227,0.7)' }}>{d.resepsiTime}</p>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ color: '#C8556A', fontSize: '0.75rem', flexShrink: 0, marginTop: 1 }}>📍</span>
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: '0.95rem', color: '#f0dde3' }}>{d.resepsiVenue}</p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '0.72rem', color: 'rgba(240,221,227,0.45)', marginTop: 2 }}>{d.resepsiAddress}</p>
              </div>
            </div>
          </div>
          <a href={d.resepsiMapsUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', color: '#C8556A', textDecoration: 'none', letterSpacing: '0.06em' }}>
            <span>📍</span> Buka Google Maps →
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* SECTION 5 — GALLERY                                    */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 24px', background: 'radial-gradient(ellipse 100% 60% at 50% 100%, #2a0a14 0%, #0d0408 60%)' }}>
        <div className="rg-reveal" style={{ textAlign: 'center', marginBottom: 32 }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C8556A', marginBottom: 10 }}>Kenangan Terindah</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(1.8rem, 8vw, 2.6rem)', color: '#f0dde3' }}>Galeri Foto</h2>
          <PetalDivider />
        </div>

        {/* Featured large photo */}
        <div className="rg-reveal rg-reveal-delay-1" style={{ marginBottom: 8, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(200,85,106,0.2)' }}>
          {d.galleryPhotos[0]
            ? <img src={d.galleryPhotos[0]} alt="gallery" style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }} />
            : <PhotoPlaceholder style={{ width: '100%', height: 220 }} />
          }
        </div>

        {/* 2-column grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
          {[1, 2].map(idx => (
            <div key={idx} className={`rg-reveal rg-reveal-delay-${idx + 1}`} style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(200,85,106,0.15)' }}>
              {d.galleryPhotos[idx]
                ? <img src={d.galleryPhotos[idx]} alt="gallery" style={{ width: '100%', height: 130, objectFit: 'cover', display: 'block' }} />
                : <PhotoPlaceholder style={{ width: '100%', height: 130 }} />
              }
            </div>
          ))}
        </div>

        {/* 3-column grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[3, 4, 5].map(idx => (
            <div key={idx} className={`rg-reveal rg-reveal-delay-${(idx % 3) + 1}`} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(200,85,106,0.12)' }}>
              {d.galleryPhotos[idx]
                ? <img src={d.galleryPhotos[idx]} alt="gallery" style={{ width: '100%', height: 90, objectFit: 'cover', display: 'block' }} />
                : <PhotoPlaceholder style={{ width: '100%', height: 90 }} />
              }
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* SECTION 6 — AMPLOP DIGITAL                             */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 24px', background: 'linear-gradient(180deg, #0d0408 0%, #1a0810 100%)' }}>
        <div className="rg-reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C8556A', marginBottom: 10 }}>Hadiah & Doa</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(1.8rem, 8vw, 2.6rem)', color: '#f0dde3' }}>Amplop Digital</h2>
          <PetalDivider />
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '0.76rem', color: 'rgba(240,221,227,0.5)', marginTop: 12, lineHeight: 1.7, maxWidth: 280, margin: '12px auto 0' }}>
            Bagi yang ingin memberikan hadiah, dapat melalui rekening atau dompet digital berikut
          </p>
        </div>

        {/* Envelope animation */}
        <div className="rg-reveal rg-reveal-delay-1" style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <div
            onClick={() => setEnvelopeOpen(!envelopeOpen)}
            style={{ width: 120, height: 80, position: 'relative', cursor: 'pointer' }}
          >
            {/* Envelope body */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #8B1A2A, #C8556A)', borderRadius: 8, border: '1px solid rgba(200,85,106,0.5)' }} />
            {/* Envelope flap */}
            <div className={`rg-envelope-flap ${envelopeOpen ? 'open' : ''}`} style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 50,
              background: 'linear-gradient(135deg, #6B1020, #A83548)',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              borderRadius: '8px 8px 0 0',
              zIndex: envelopeOpen ? 0 : 2,
              transformOrigin: 'top center',
              transform: envelopeOpen ? 'rotateX(-180deg)' : 'rotateX(0deg)',
              transition: 'transform 0.4s ease',
            }} />
            {/* Rose on envelope */}
            <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', zIndex: 3 }}>
              <RoseIcon size={20} />
            </div>
          </div>
        </div>

        {!envelopeOpen && (
          <div className="rg-reveal" style={{ textAlign: 'center', marginBottom: 24 }}>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', color: 'rgba(240,221,227,0.45)', fontStyle: 'italic' }}>Tap amplop untuk membuka</p>
          </div>
        )}

        {/* Bank accounts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { key: 'bank1', name: d.bankName, number: d.bankNumber, holder: d.bankHolder, icon: '🏦' },
            { key: 'bank2', name: d.bank2Name, number: d.bank2Number, holder: d.bank2Holder, icon: '🏦' },
            { key: 'gopay', name: 'GoPay', number: d.gopayNumber, holder: `${d.brideName} & ${d.groomName}`, icon: '💚' },
          ].map(({ key, name, number, holder, icon }) => (
            <div key={key} className="rg-reveal rg-card" style={{ padding: '18px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                  <div>
                    <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C8556A', marginBottom: 2 }}>{name}</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: '#fff', letterSpacing: '0.05em' }}>{number}</p>
                    <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '0.68rem', color: 'rgba(240,221,227,0.45)', marginTop: 2 }}>{holder}</p>
                  </div>
                </div>
                <button
                  onClick={() => copyText(number, key)}
                  style={{ background: copied === key ? 'rgba(200,85,106,0.2)' : 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,85,106,0.25)', borderRadius: 8, padding: '6px 12px', fontFamily: "'Jost', sans-serif", fontSize: '0.65rem', color: copied === key ? '#C8556A' : 'rgba(240,221,227,0.5)', cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}
                >
                  {copied === key ? '✓ Disalin' : 'Salin'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* SECTION 7 — RSVP                                       */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 24px', background: 'radial-gradient(ellipse 120% 80% at 50% 50%, #3d0a1e 0%, #1a0810 65%)' }}>
        <div className="rg-reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C8556A', marginBottom: 10 }}>Konfirmasi Kehadiran</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(1.8rem, 8vw, 2.6rem)', color: '#f0dde3' }}>RSVP</h2>
          <PetalDivider />
        </div>

        {rsvpSent ? (
          <div className="rg-reveal rg-card" style={{ padding: '40px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>🌹</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: '1.4rem', color: '#f0dde3', marginBottom: 8 }}>Terima Kasih!</h3>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '0.78rem', color: 'rgba(240,221,227,0.55)', lineHeight: 1.7 }}>
              Konfirmasi kehadiranmu sudah kami terima. Kami sangat menantikan kehadiranmu di hari bahagia kami. 🌺
            </p>
          </div>
        ) : (
          <div className="rg-reveal rg-reveal-delay-1 rg-card" style={{ padding: '28px 20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontFamily: "'Jost', sans-serif", fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8556A', marginBottom: 6 }}>Nama Lengkap</label>
                <input
                  className="rg-input"
                  placeholder="Masukkan nama kamu"
                  value={rsvpForm.name}
                  onChange={e => setRsvpForm(p => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: "'Jost', sans-serif", fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8556A', marginBottom: 6 }}>Kehadiran</label>
                <select
                  className="rg-input rg-select"
                  value={rsvpForm.attend}
                  onChange={e => setRsvpForm(p => ({ ...p, attend: e.target.value }))}
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,85,106,0.25)', borderRadius: 8, padding: '10px 14px', color: '#f0dde3', fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', width: '100%', cursor: 'pointer', outline: 'none', boxSizing: 'border-box' }}
                >
                  <option value="hadir" style={{ background: '#1a0810' }}>✅ Insya Allah Hadir</option>
                  <option value="tidak" style={{ background: '#1a0810' }}>❌ Tidak Bisa Hadir</option>
                  <option value="mungkin" style={{ background: '#1a0810' }}>🤔 Belum Pasti</option>
                </select>
              </div>
              {rsvpForm.attend === 'hadir' && (
                <div>
                  <label style={{ display: 'block', fontFamily: "'Jost', sans-serif", fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8556A', marginBottom: 6 }}>Jumlah Tamu</label>
                  <select
                    className="rg-input rg-select"
                    value={rsvpForm.guests}
                    onChange={e => setRsvpForm(p => ({ ...p, guests: e.target.value }))}
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,85,106,0.25)', borderRadius: 8, padding: '10px 14px', color: '#f0dde3', fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', width: '100%', cursor: 'pointer', outline: 'none', boxSizing: 'border-box' }}
                  >
                    {['1','2','3','4','5+'].map(n => <option key={n} value={n} style={{ background: '#1a0810' }}>{n} orang</option>)}
                  </select>
                </div>
              )}
              <div>
                <label style={{ display: 'block', fontFamily: "'Jost', sans-serif", fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8556A', marginBottom: 6 }}>Ucapan & Doa</label>
                <textarea
                  className="rg-input"
                  rows={3}
                  placeholder="Tulis ucapan dan doa untuk kedua mempelai..."
                  value={rsvpForm.message}
                  onChange={e => setRsvpForm(p => ({ ...p, message: e.target.value }))}
                  style={{ resize: 'none' }}
                />
              </div>
              <button className="rg-bloom-btn" onClick={handleRsvp} style={{ marginTop: 4 }}>
                🌹 Kirim Konfirmasi
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* SECTION 8 — UCAPAN                                     */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 24px 88px', background: 'linear-gradient(180deg, #1a0810 0%, #0d0408 100%)' }}>
        <div className="rg-reveal" style={{ textAlign: 'center', marginBottom: 36 }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C8556A', marginBottom: 10 }}>Taman Doa</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(1.8rem, 8vw, 2.6rem)', color: '#f0dde3' }}>Ucapan & Doa</h2>
          <PetalDivider />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {wishes.length === 0 ? (
            <div className="rg-reveal rg-card" style={{ padding: '32px 24px', textAlign: 'center' }}>
              <RoseIcon size={28} opacity={0.4} />
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '0.78rem', color: 'rgba(240,221,227,0.35)', marginTop: 12 }}>Belum ada ucapan. Jadilah yang pertama!</p>
            </div>
          ) : (
            wishes.map((w, i) => (
              <div key={i} className={`rg-reveal rg-reveal-delay-${(i % 3) + 1} rg-card`} style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #8B1A2A, #C8556A)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: '0.95rem', color: '#fff' }}>
                    {w.name.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, flexWrap: 'wrap', gap: 4 }}>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: '0.95rem', color: '#f0dde3' }}>{w.name}</p>
                      <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.6rem', padding: '2px 8px', borderRadius: 20, background: w.attend === 'hadir' ? 'rgba(200,85,106,0.15)' : 'rgba(255,255,255,0.05)', color: w.attend === 'hadir' ? '#C8556A' : 'rgba(240,221,227,0.35)', border: `1px solid ${w.attend === 'hadir' ? 'rgba(200,85,106,0.3)' : 'rgba(255,255,255,0.08)'}` }}>
                        {w.attend === 'hadir' ? '✓ Hadir' : w.attend === 'tidak' ? '✗ Tidak Hadir' : '? Belum Pasti'}
                      </span>
                    </div>
                    {w.text && (
                      <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '0.76rem', color: 'rgba(240,221,227,0.6)', lineHeight: 1.65, fontStyle: 'italic' }}>"{w.text}"</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: 64, paddingTop: 32, borderTop: '1px solid rgba(200,85,106,0.12)' }}>
          <div style={{ marginBottom: 16 }}>
            <RoseIcon size={28} />
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(1rem, 4.5vw, 1.3rem)', color: 'rgba(240,221,227,0.6)', lineHeight: 1.9, maxWidth: 300, margin: '0 auto' }}>
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir
          </p>
          <div style={{ marginTop: 20 }}>
            <PetalDivider />
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 7vw, 2.2rem)', color: '#f0dde3', marginTop: 16 }}>
            {d.brideName} &amp; {d.groomName}
          </p>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(200,85,106,0.5)', marginTop: 24 }}>
            Made with 🌹 by Undigo
          </p>
        </div>
      </section>

    </div>
  );
}
