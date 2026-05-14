/**
 * src/pages/PreviewPage.jsx
 * ─────────────────────────
 * JANGAN TAMBAHKAN IMPORT TEMPLATE DI SINI.
 * Semua template & metadata dikelola di src/registry.js
 */

import { useParams, useNavigate } from 'react-router-dom';
import { REGISTRY_MAP } from '../registry';

/* ── MONOGRAM PANEL (kiri) ────────────────────────────────── */
function MonogramPanel({ initials, theme }) {
  const [a, b] = initials;
  const particles = Array.from({ length: 28 }, (_, i) => ({
    left:              `${(i * 37.3 + 5) % 100}%`,
    top:               `${(i * 53.7 + 8) % 100}%`,
    animationDelay:    `${(i * 0.31) % 4}s`,
    animationDuration: `${2.5 + (i * 0.19) % 2.5}s`,
    width:             `${2 + (i % 3)}px`,
    height:            `${2 + (i % 3)}px`,
    background:        theme.particleColor,
  }));

  return (
    <div
      className="flex-1 min-w-0 relative flex flex-col items-center justify-center overflow-hidden min-h-[calc(100vh-52px)]"
      style={{ background: `radial-gradient(ellipse 80% 70% at 40% 60%, ${theme.gradientMid} 0%, ${theme.gradientFrom} 60%, ${theme.gradientTo} 100%)` }}
    >
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {particles.map((p, i) => (
          <div key={i} className="absolute rounded-full"
            style={{ ...p, animation: `ppBlink ${p.animationDuration} ${p.animationDelay} linear infinite` }} />
        ))}
      </div>

      {/* Sweep */}
      <div className="absolute pointer-events-none"
        style={{ inset: '-50%',
          background: `linear-gradient(135deg, transparent 20%, ${theme.accentSoft} 50%, transparent 80%)`,
          animation: 'ppSweep 8s ease-in-out infinite alternate' }} />

      {/* Grid dots */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px' }} />

      {/* Corner SVGs */}
      {[
        { cls: 'top-5 left-5',     d: 'M4 66 L4 4 L66 4',   d2: 'M4 20 L4 4 L20 4',    cx: 4,  cy: 4  },
        { cls: 'top-5 right-5',    d: 'M66 66 L66 4 L4 4',  d2: 'M66 20 L66 4 L50 4',  cx: 66, cy: 4  },
        { cls: 'bottom-5 left-5',  d: 'M4 4 L4 66 L66 66',  d2: 'M4 50 L4 66 L20 66',  cx: 4,  cy: 66 },
        { cls: 'bottom-5 right-5', d: 'M66 4 L66 66 L4 66', d2: 'M66 50 L66 66 L50 66', cx: 66, cy: 66 },
      ].map(({ cls, d, d2, cx, cy }, i) => (
        <svg key={i} className={`absolute pointer-events-none ${cls}`} width="70" height="70" viewBox="0 0 70 70" fill="none">
          <path d={d}  stroke={theme.accent} strokeWidth="0.8" opacity="0.45"/>
          <circle cx={cx} cy={cy} r="3" fill={theme.accent} opacity="0.6"/>
          <path d={d2} stroke={theme.accent} strokeWidth="0.8" opacity="0.8"/>
        </svg>
      ))}

      {/* Monogram */}
      <div className="relative flex flex-col items-center gap-3 z-[1]">
        {[300, 220, 155].map((size, i) => (
          <div key={i} className="absolute rounded-full border top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ width: size, height: size,
              borderColor: `${theme.accent}${['18','28','40'][i]}`,
              animation: `ppPulse 4s ease-in-out ${i * 0.5}s infinite` }} />
        ))}

        <div className="flex items-center gap-2.5 w-[180px]">
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}70, transparent)` }} />
          <div className="w-[5px] h-[5px] rotate-45 shrink-0" style={{ background: theme.accent }} />
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}70, transparent)` }} />
        </div>

        <div className="flex items-center gap-2.5 relative z-[2]">
          <div className="absolute w-px h-20 left-[-40px] top-1/2 -translate-y-1/2"
            style={{ background: `linear-gradient(180deg, transparent, ${theme.accent}50, transparent)` }} />
          <div className="absolute w-px h-20 right-[-40px] top-1/2 -translate-y-1/2"
            style={{ background: `linear-gradient(180deg, transparent, ${theme.accent}50, transparent)` }} />
          <span className="font-display text-[clamp(5rem,10vw,8rem)] font-light italic leading-none text-[rgba(255,255,255,0.92)]">{a}</span>
          <span className="font-display text-[clamp(2.5rem,5vw,4rem)] italic font-light leading-none mt-3" style={{ color: theme.accent }}>&</span>
          <span className="font-display text-[clamp(5rem,10vw,8rem)] font-light italic leading-none text-[rgba(255,255,255,0.92)]">{b}</span>
        </div>

        <div className="flex items-center gap-2.5 w-[180px]">
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}70, transparent)` }} />
          <div className="w-[5px] h-[5px] rotate-45 shrink-0" style={{ background: theme.accent }} />
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}70, transparent)` }} />
        </div>
      </div>

      <p className="absolute bottom-10 text-[0.6rem] tracking-[0.35em] uppercase z-[1]"
        style={{ color: `${theme.particleColor}70` }}>
        Pratinjau Undangan
      </p>

      <style>{`
        @keyframes ppBlink {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          40%, 60%  { opacity: 1; transform: scale(1); }
        }
        @keyframes ppSweep {
          from { transform: rotate(-15deg) translateX(-30%); opacity: 0.4; }
          to   { transform: rotate(-15deg) translateX(30%);  opacity: 0.8; }
        }
        @keyframes ppPulse {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 1;   transform: translate(-50%, -50%) scale(1.02); }
        }
      `}</style>
    </div>
  );
}

/* ── MAIN ─────────────────────────────────────────────────── */
export default function PreviewPage({ onCheckout }) {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const entry = REGISTRY_MAP[templateId];

  if (!entry) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#060c14] text-[rgba(255,255,255,0.4)]">
        <p>Template tidak ditemukan.</p>
        <button onClick={() => navigate('/katalog')}
          className="text-[0.8rem] text-[rgba(255,255,255,0.4)] bg-transparent border border-[rgba(255,255,255,0.1)] rounded-[6px] px-4 py-2 cursor-pointer transition-all duration-200 hover:text-white hover:border-[rgba(255,255,255,0.3)] font-body">
          ← Katalog
        </button>
      </div>
    );
  }

  const { component: TemplateComponent, name, price, initials, theme } = entry;
  const fmtPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0
  }).format(price);

  return (
    <div className="min-h-screen flex flex-col bg-[#060c14] font-body">

      {/* ── TOPBAR ── */}
      <div className="fixed top-0 left-0 right-0 z-[200] h-[52px] flex items-center justify-between px-5 gap-4 border-b border-[rgba(255,255,255,0.06)]"
        style={{ background: 'rgba(5,10,18,0.88)', backdropFilter: 'blur(16px) saturate(1.4)' }}>
        <button
          className="flex items-center gap-1.5 text-[0.75rem] text-[rgba(255,255,255,0.4)] bg-transparent border-none cursor-pointer p-0 transition-colors duration-200 whitespace-nowrap hover:text-[rgba(255,255,255,0.8)]"
          onClick={() => navigate('/katalog')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          <span>Katalog</span>
        </button>

        <div className="flex-1 flex items-center justify-center gap-2.5">
          <span className="text-[0.5rem] font-semibold tracking-[0.18em] px-[0.55rem] py-[0.18rem] rounded-[3px] bg-[rgba(201,168,76,0.12)] text-[#C9A84C] border border-[rgba(201,168,76,0.28)]">
            PREVIEW
          </span>
          <span className="hidden sm:block text-[0.78rem] text-[rgba(255,255,255,0.45)]">{name}</span>
        </div>

        <button
          className="flex items-center gap-2 px-4 py-[0.45rem] font-body text-[0.72rem] font-medium text-white bg-purple border-none rounded-full cursor-pointer whitespace-nowrap transition-all duration-200 shadow-[0_2px_14px_rgba(142,74,151,0.35)] hover:bg-purple-dark hover:-translate-y-px"
          onClick={() => onCheckout?.({ name, price })}>
          Pilih Template
          <span className="hidden sm:inline px-[0.55rem] py-[0.15rem] bg-[rgba(255,255,255,0.12)] rounded-full text-[0.68rem] font-normal">
            {fmtPrice}
          </span>
        </button>
      </div>

      {/* ── SPLIT BODY ── */}
      <div className="mt-[52px] flex-1 flex flex-col md:flex-row min-h-[calc(100vh-52px)]">
        <MonogramPanel initials={initials} theme={theme} />

        <div className="w-full md:w-[390px] md:shrink-0 flex items-start justify-center p-0 bg-transparent border-t border-[rgba(255,255,255,0.05)] md:border-t-0 md:border-l md:border-[rgba(255,255,255,0.05)] overflow-x-hidden overflow-y-auto md:max-h-[calc(100vh-52px)]">
          <div className="w-full md:w-[390px] relative shrink-0">
            <div className="w-[390px] origin-top-left overflow-hidden box-border">
              <TemplateComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
