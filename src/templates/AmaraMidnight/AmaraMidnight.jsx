/**
 * AMARA MIDNIGHT — Template Undangan Pernikahan
 * ─────────────────────────────────────────────
 * Dark luxury: deep midnight purple, dusty rose gold accents,
 * scattered star particles, floral silhouettes.
 *
 * Props (semua opsional, ada DEFAULT_DATA):
 *   weddingData = {
 *     mempelaiWanita: { nama, namaAyah, namaIbu, anakKe, foto }
 *     mempelaiPria:   { nama, namaAyah, namaIbu, anakKe, foto }
 *     akad:           { tanggal, waktu, selesai, venue, alamat, mapsUrl }
 *     resepsi:        { tanggal, waktu, selesai, venue, alamat, mapsUrl }
 *     targetDate:     'YYYY-MM-DDTHH:mm:ss'
 *     galeri:         [url, ...] max 6
 *     rekeningList:   [{ bank, norek, atasNama }, ...]
 *     musikUrl:       string | null
 *   }
 */

import { useState, useEffect, useRef } from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import { useReveal }    from '../../hooks/useReveal';

/* ── PALETTE ─────────────────────────────────────────────── */
const C = {
  bg:        '#0D0818',
  bgMid:     '#160F2A',
  bgCard:    'rgba(255,255,255,0.032)',
  accent:    '#C9A0B4',        // dusty rose gold
  accentGold:'#D4AF7A',        // warm gold
  accentSoft:'rgba(201,160,180,0.12)',
  accentBrd: 'rgba(201,160,180,0.22)',
  star:      'rgba(220,200,255,0.7)',
  text:      'rgba(255,255,255,0.88)',
  textSoft:  'rgba(255,255,255,0.45)',
  textMuted: 'rgba(255,255,255,0.28)',
  divider:   'rgba(201,160,180,0.18)',
};

/* ── DEFAULT DATA ─────────────────────────────────────────── */
const DEFAULT_DATA = {
  mempelaiWanita: {
    nama:    'Amara Salsabila',
    namaAyah:'H. Darmawan',
    namaIbu: 'Hj. Nurlaila',
    anakKe:  'Putri pertama',
    foto:    null,
  },
  mempelaiPria: {
    nama:    'Rafif Aldriansyah',
    namaAyah:'Bpk. Teguh Santoso',
    namaIbu: 'Ibu Dwi Rahayu',
    anakKe:  'Putra kedua',
    foto:    null,
  },
  akad: {
    tanggal: 'Jumat, 20 Juni 2025',
    waktu:   '08.00',
    selesai: '10.00 WIB',
    venue:   'Masjid Al-Ikhlas Menteng',
    alamat:  'Jl. Menteng Raya No. 12, Jakarta Pusat',
    mapsUrl: 'https://maps.google.com',
  },
  resepsi: {
    tanggal: 'Jumat, 20 Juni 2025',
    waktu:   '11.00',
    selesai: '15.00 WIB',
    venue:   'The Hermitage Ballroom',
    alamat:  'Jl. Cilacap No. 1, Menteng, Jakarta Pusat',
    mapsUrl: 'https://maps.google.com',
  },
  targetDate: '2025-06-20T08:00:00',
  galeri: [null, null, null, null, null, null],
  rekeningList: [
    { bank: 'BCA', norek: '1234 5678 90', atasNama: 'Amara Salsabila' },
    { bank: 'Mandiri', norek: '0987 6543 21', atasNama: 'Rafif Aldriansyah' },
  ],
  musikUrl: null,
};

/* ── HELPERS ──────────────────────────────────────────────── */
function GoldDivider() {
  return (
    <div className="flex items-center gap-3 w-full my-1">
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${C.divider})` }} />
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 1L10.5 7.5L17 9L10.5 10.5L9 17L7.5 10.5L1 9L7.5 7.5Z" fill={C.accent} opacity="0.7" />
      </svg>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${C.divider}, transparent)` }} />
    </div>
  );
}

function FloralCorner({ flip = false }) {
  return (
    <svg
      width="80" height="80" viewBox="0 0 80 80" fill="none"
      style={{ transform: flip ? 'scaleX(-1)' : 'none', opacity: 0.25 }}
    >
      <path d="M4 76 Q4 4 76 4" stroke={C.accent} strokeWidth="0.8" fill="none"/>
      <circle cx="4" cy="76" r="3" fill={C.accent}/>
      <circle cx="76" cy="4" r="3" fill={C.accent}/>
      <path d="M4 50 Q18 18 50 4" stroke={C.accent} strokeWidth="0.5" fill="none" strokeDasharray="3 5"/>
      <circle cx="20" cy="38" r="4" fill={C.accent} opacity="0.5"/>
      <circle cx="40" cy="16" r="3" fill={C.accent} opacity="0.4"/>
    </svg>
  );
}

function StarField({ count = 60 }) {
  const stars = Array.from({ length: count }, (_, i) => ({
    x: ((i * 137.5) % 390),
    y: ((i * 97.3 + 11) % 320),
    r: 0.6 + (i % 4) * 0.35,
    delay: (i * 0.23) % 5,
    dur: 2.5 + (i * 0.19) % 3,
  }));
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.7 }}>
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={C.star}
          style={{ animation: `amBlink ${s.dur}s ${s.delay}s ease-in-out infinite` }} />
      ))}
    </svg>
  );
}

function PhotoPlaceholder({ foto, alt, size = 120 }) {
  if (foto) {
    return (
      <img src={foto} alt={alt}
        className="rounded-full object-cover"
        style={{ width: size, height: size, border: `1.5px solid ${C.accentBrd}` }} />
    );
  }
  return (
    <div className="rounded-full flex items-center justify-center"
      style={{ width: size, height: size, background: C.accentSoft, border: `1.5px solid ${C.accentBrd}` }}>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    </div>
  );
}

function AudioPlayer({ url }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  if (!url) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <audio ref={audioRef} src={url} loop />
      <button onClick={toggle}
        className="w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110"
        style={{ background: C.accentSoft, border: `1px solid ${C.accentBrd}` }}>
        {playing ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill={C.accent}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill={C.accent}><polygon points="5,3 19,12 5,21"/></svg>
        )}
      </button>
    </div>
  );
}

/* ── SECTIONS ─────────────────────────────────────────────── */

function SectionCover({ data }) {
  const w = data.mempelaiWanita;
  const p = data.mempelaiPria;
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-center px-8 py-16"
      style={{ background: `radial-gradient(ellipse 100% 80% at 50% 30%, #2A1040 0%, ${C.bgMid} 50%, ${C.bg} 100%)` }}>
      <StarField count={80} />

      {/* Corner florals */}
      <div className="absolute top-0 left-0"><FloralCorner /></div>
      <div className="absolute top-0 right-0"><FloralCorner flip /></div>

      {/* Outer ring */}
      <div className="absolute rounded-full pointer-events-none"
        style={{ width: 320, height: 320, top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          border: `1px solid ${C.accentBrd}`, animation: 'amPulse 5s ease-in-out infinite' }} />
      <div className="absolute rounded-full pointer-events-none"
        style={{ width: 240, height: 240, top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          border: `1px solid rgba(201,160,180,0.10)`, animation: 'amPulse 5s ease-in-out 1s infinite' }} />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <p className="text-xs tracking-[0.35em] uppercase" style={{ color: C.textMuted }}>
          Undangan Pernikahan
        </p>

        <GoldDivider />

        {/* Initials */}
        <div className="flex items-end gap-3 mt-2">
          <span className="font-display italic font-light leading-none"
            style={{ fontSize: 'clamp(4.5rem,18vw,6.5rem)', color: 'rgba(255,255,255,0.90)' }}>
            {w.nama.charAt(0)}
          </span>
          <span className="font-display italic font-light mb-4"
            style={{ fontSize: 'clamp(2rem,8vw,3rem)', color: C.accent }}>
            &amp;
          </span>
          <span className="font-display italic font-light leading-none"
            style={{ fontSize: 'clamp(4.5rem,18vw,6.5rem)', color: 'rgba(255,255,255,0.90)' }}>
            {p.nama.charAt(0)}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="font-display font-light text-xl tracking-wide" style={{ color: C.text }}>
            {w.nama.split(' ')[0]}
            <span className="mx-2 opacity-40">&</span>
            {p.nama.split(' ')[0]}
          </p>
          <p className="text-xs tracking-[0.3em] uppercase" style={{ color: C.textMuted }}>
            {data.resepsi.tanggal}
          </p>
        </div>

        <GoldDivider />

        <div className="mt-2 flex items-center gap-2">
          <div className="w-1 h-1 rounded-full" style={{ background: C.accent }} />
          <p className="text-xs tracking-[0.25em] uppercase" style={{ color: C.textSoft }}>
            The Wedding
          </p>
          <div className="w-1 h-1 rounded-full" style={{ background: C.accent }} />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 flex flex-col items-center gap-1.5 z-10"
        style={{ animation: 'amFloat 2.5s ease-in-out infinite' }}>
        <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: C.textMuted }}>Scroll</p>
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
          <path d="M8 2 L8 16 M3 12 L8 18 L13 12" stroke={C.accent} strokeWidth="1" opacity="0.6"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <style>{`
        @keyframes amBlink {
          0%, 100% { opacity: 0.15; } 50% { opacity: 1; }
        }
        @keyframes amPulse {
          0%, 100% { opacity: 0.4; transform: translate(-50%,-50%) scale(1); }
          50%       { opacity: 0.9; transform: translate(-50%,-50%) scale(1.03); }
        }
        @keyframes amFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(5px); }
        }
        @keyframes amReveal {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

function SectionOpening() {
  return (
    <section className="reveal relative px-8 py-16 text-center overflow-hidden"
      style={{ background: C.bgMid }}>
      <StarField count={25} />
      <div className="relative z-10 max-w-[300px] mx-auto flex flex-col items-center gap-5">
        <p className="text-xs tracking-[0.3em] uppercase" style={{ color: C.accentGold }}>
          Bismillahirrahmanirrahim
        </p>
        <div className="w-12 h-px" style={{ background: C.divider }} />
        <p className="font-display italic text-lg font-light leading-relaxed" style={{ color: C.text }}>
          "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri."
        </p>
        <p className="text-[11px] tracking-widest" style={{ color: C.textMuted }}>QS. Ar-Rum: 21</p>
        <div className="w-12 h-px" style={{ background: C.divider }} />
        <p className="text-[13px] leading-relaxed" style={{ color: C.textSoft }}>
          Dengan penuh kebahagiaan dan rasa syukur, kami mengundang Bapak/Ibu/Saudara/i untuk turut hadir dan mendoakan pernikahan putra-putri kami.
        </p>
      </div>
    </section>
  );
}

function SectionMempelai({ data }) {
  const { mempelaiWanita: w, mempelaiPria: p } = data;
  return (
    <section className="reveal relative px-8 py-16 overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${C.bg} 0%, #150C28 100%)` }}>
      <StarField count={30} />
      <div className="relative z-10 flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs tracking-[0.3em] uppercase" style={{ color: C.textMuted }}>Mempelai</p>
          <GoldDivider />
        </div>

        {[w, p].map((m, idx) => (
          <div key={idx} className="flex flex-col items-center gap-4 text-center"
            style={{ padding: '1.5rem', background: C.bgCard, borderRadius: '16px', border: `1px solid ${C.accentBrd}`, width: '100%' }}>
            <div className="relative">
              <PhotoPlaceholder foto={m.foto} alt={m.nama} size={100} />
              <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: C.bgMid, border: `1px solid ${C.accentBrd}` }}>
                <span className="text-xs" style={{ color: C.accent }}>{idx === 0 ? '♀' : '♂'}</span>
              </div>
            </div>
            <div>
              <p className="font-display italic text-xl font-light mb-1" style={{ color: C.text }}>{m.nama}</p>
              <p className="text-[11px] tracking-[0.2em] uppercase mb-3" style={{ color: C.accent }}>{m.anakKe}</p>
              <p className="text-[12px] leading-relaxed" style={{ color: C.textSoft }}>
                Putri dari Bpk. {m.namaAyah}<br />dan Ibu {m.namaIbu}
              </p>
            </div>
          </div>
        ))}

        {/* Ornamental connector */}
        <div className="flex flex-col items-center gap-2" style={{ marginTop: '-1rem' }}>
          <div className="w-px h-8" style={{ background: `linear-gradient(180deg, transparent, ${C.divider})` }} />
          <div className="font-display italic text-2xl" style={{ color: C.accent }}>&</div>
          <div className="w-px h-8" style={{ background: `linear-gradient(180deg, ${C.divider}, transparent)` }} />
        </div>
      </div>
    </section>
  );
}

function SectionCountdown({ data }) {
  const time = useCountdown(data.targetDate);
  const blocks = [
    { label: 'Hari',   val: time.d },
    { label: 'Jam',    val: time.h },
    { label: 'Menit',  val: time.m },
    { label: 'Detik',  val: time.s },
  ];
  return (
    <section className="reveal relative px-8 py-16 text-center overflow-hidden"
      style={{ background: `radial-gradient(ellipse 120% 100% at 50% 0%, #2A1040 0%, ${C.bg} 70%)` }}>
      <StarField count={40} />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <p className="text-xs tracking-[0.3em] uppercase" style={{ color: C.textMuted }}>Menuju Hari Istimewa</p>
        <GoldDivider />
        <p className="font-display italic text-base" style={{ color: C.textSoft }}>{data.resepsi.tanggal}</p>
        <div className="flex items-start gap-3 mt-2">
          {blocks.map(({ label, val }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 rounded-xl px-3 py-3 min-w-[60px]"
              style={{ background: C.bgCard, border: `1px solid ${C.accentBrd}` }}>
              <span className="font-display text-3xl font-light tabular-nums" style={{ color: C.text }}>
                {String(val).padStart(2, '0')}
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: C.textMuted }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionAcara({ data }) {
  const events = [
    { label: 'Akad Nikah', icon: '☽', ...data.akad },
    { label: 'Resepsi', icon: '✦', ...data.resepsi },
  ];
  return (
    <section className="reveal px-8 py-16" style={{ background: C.bgMid }}>
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs tracking-[0.3em] uppercase" style={{ color: C.textMuted }}>Detail Acara</p>
          <GoldDivider />
        </div>

        {events.map((ev, i) => (
          <div key={i} className="w-full rounded-2xl overflow-hidden"
            style={{ background: C.bgCard, border: `1px solid ${C.accentBrd}` }}>
            <div className="px-6 py-4 flex items-center gap-3"
              style={{ borderBottom: `1px solid ${C.divider}` }}>
              <span style={{ color: C.accent }}>{ev.icon}</span>
              <p className="text-sm font-medium tracking-widest uppercase" style={{ color: C.accent }}>{ev.label}</p>
            </div>
            <div className="px-6 py-5 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5" className="mt-0.5 shrink-0">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                </svg>
                <span className="text-sm" style={{ color: C.textSoft }}>{ev.tanggal}</span>
              </div>
              <div className="flex items-start gap-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5" className="mt-0.5 shrink-0">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
                <span className="text-sm" style={{ color: C.textSoft }}>{ev.waktu} – {ev.selesai}</span>
              </div>
              <div className="flex items-start gap-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5" className="mt-0.5 shrink-0">
                  <path d="M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z"/><circle cx="12" cy="9" r="3"/>
                </svg>
                <div>
                  <p className="text-sm font-medium" style={{ color: C.text }}>{ev.venue}</p>
                  <p className="text-[12px] mt-0.5" style={{ color: C.textMuted }}>{ev.alamat}</p>
                </div>
              </div>
              <a href={ev.mapsUrl} target="_blank" rel="noopener noreferrer"
                className="mt-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[12px] tracking-wide font-medium transition-opacity duration-200 hover:opacity-80"
                style={{ background: C.accentSoft, border: `1px solid ${C.accentBrd}`, color: C.accent }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 11l19-9-9 19-2-8-8-2z"/>
                </svg>
                Buka Google Maps
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionGaleri({ data }) {
  const photos = (data.galeri || []).slice(0, 6);
  return (
    <section className="reveal px-6 py-14" style={{ background: C.bg }}>
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs tracking-[0.3em] uppercase" style={{ color: C.textMuted }}>Galeri Foto</p>
          <GoldDivider />
        </div>
        <div className="grid grid-cols-3 gap-2 w-full">
          {photos.map((src, i) => (
            <div key={i} className="aspect-square rounded-xl overflow-hidden"
              style={{ background: C.bgCard, border: `1px solid ${C.accentBrd}` }}>
              {src ? (
                <img src={src} alt={`Galeri ${i+1}`} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1" opacity="0.4">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <path d="M21 15l-5-5L5 21"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionRSVP() {
  const [name, setName] = useState('');
  const [attend, setAttend] = useState('');
  const [guests, setGuests] = useState('1');
  const [msg, setMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !attend) return;
    setSubmitted(true);
  };

  const inputStyle = {
    background: C.bgCard,
    border: `1px solid ${C.accentBrd}`,
    borderRadius: '10px',
    color: C.text,
    padding: '0.65rem 0.85rem',
    fontSize: '13px',
    outline: 'none',
    width: '100%',
  };

  return (
    <section className="reveal px-8 py-16" style={{ background: C.bgMid }}>
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs tracking-[0.3em] uppercase" style={{ color: C.textMuted }}>Konfirmasi Kehadiran</p>
          <GoldDivider />
        </div>

        {submitted ? (
          <div className="text-center py-8 flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: C.accentSoft, border: `1px solid ${C.accentBrd}` }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <p className="font-display italic text-lg" style={{ color: C.text }}>Terima kasih, {name}!</p>
            <p className="text-sm" style={{ color: C.textSoft }}>Konfirmasi kehadiranmu telah kami terima.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
            <input
              style={inputStyle}
              placeholder="Nama lengkap"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <select
              style={{ ...inputStyle, appearance: 'none' }}
              value={attend}
              onChange={e => setAttend(e.target.value)}
              required
            >
              <option value="">Konfirmasi kehadiran…</option>
              <option value="hadir">Insya Allah hadir</option>
              <option value="tidak">Mohon maaf tidak dapat hadir</option>
            </select>
            {attend === 'hadir' && (
              <input
                style={inputStyle}
                type="number"
                min="1" max="5"
                placeholder="Jumlah tamu"
                value={guests}
                onChange={e => setGuests(e.target.value)}
              />
            )}
            <textarea
              style={{ ...inputStyle, resize: 'none', height: '80px' }}
              placeholder="Ucapan & doa untuk mempelai…"
              value={msg}
              onChange={e => setMsg(e.target.value)}
            />
            <button
              type="submit"
              className="py-3 rounded-xl text-sm font-medium tracking-widest uppercase transition-opacity duration-200 hover:opacity-85"
              style={{ background: `linear-gradient(135deg, #7A3880, #C97DB0)`, color: '#fff' }}>
              Kirim Konfirmasi
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function SectionAmplop({ data }) {
  const [copied, setCopied] = useState(null);
  const copy = (text, idx) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(idx);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <section className="reveal px-8 py-16" style={{ background: C.bg }}>
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs tracking-[0.3em] uppercase" style={{ color: C.textMuted }}>Amplop Digital</p>
          <GoldDivider />
          <p className="text-xs text-center" style={{ color: C.textSoft }}>
            Doa restu Anda adalah hadiah terindah. Bagi yang ingin mengirimkan tanda kasih:
          </p>
        </div>

        {(data.rekeningList || []).map((rek, i) => (
          <div key={i} className="w-full rounded-2xl overflow-hidden"
            style={{ background: C.bgCard, border: `1px solid ${C.accentBrd}` }}>
            <div className="px-5 py-3 flex items-center gap-2"
              style={{ borderBottom: `1px solid ${C.divider}` }}>
              <div className="w-6 h-6 rounded-md flex items-center justify-center"
                style={{ background: C.accentSoft }}>
                <span className="text-[10px] font-bold" style={{ color: C.accent }}>{rek.bank.slice(0,3)}</span>
              </div>
              <p className="text-sm font-medium" style={{ color: C.text }}>{rek.bank}</p>
            </div>
            <div className="px-5 py-4 flex items-center justify-between gap-3">
              <div>
                <p className="font-mono text-base font-medium" style={{ color: C.text }}>{rek.norek}</p>
                <p className="text-xs mt-0.5" style={{ color: C.textMuted }}>a.n. {rek.atasNama}</p>
              </div>
              <button
                onClick={() => copy(rek.norek, i)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-200"
                style={{ background: copied === i ? C.accentSoft : 'transparent', border: `1px solid ${C.accentBrd}`, color: C.accent }}>
                {copied === i ? (
                  <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg> Disalin</>
                ) : (
                  <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Salin</>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionClosing({ data }) {
  const w = data.mempelaiWanita.nama.split(' ')[0];
  const p = data.mempelaiPria.nama.split(' ')[0];
  return (
    <section className="relative px-8 py-20 text-center overflow-hidden"
      style={{ background: `radial-gradient(ellipse 100% 80% at 50% 100%, #2A1040 0%, ${C.bg} 60%)` }}>
      <StarField count={50} />
      <div className="absolute bottom-0 left-0"><FloralCorner /></div>
      <div className="absolute bottom-0 right-0"><FloralCorner flip /></div>

      <div className="relative z-10 flex flex-col items-center gap-5">
        <GoldDivider />
        <p className="font-display italic text-lg" style={{ color: C.textSoft }}>
          Atas kehadiran dan doa restu Bapak/Ibu/Saudara/i, kami ucapkan
        </p>
        <p className="font-display italic text-3xl font-light" style={{ color: C.text }}>
          Terima Kasih
        </p>
        <p className="text-sm tracking-[0.3em] uppercase" style={{ color: C.accent }}>
          {w} &amp; {p}
        </p>
        <GoldDivider />
        <p className="text-[11px] tracking-[0.25em] uppercase mt-2" style={{ color: C.textMuted }}>
          Made with Undigo ✦
        </p>
      </div>
    </section>
  );
}

/* ── MAIN COMPONENT ───────────────────────────────────────── */
export default function AmaraMidnight({ weddingData }) {
  const data = { ...DEFAULT_DATA, ...weddingData };
  useReveal();

  return (
    <div className="relative w-full font-body overflow-x-hidden"
      style={{ background: C.bg, color: C.text, minHeight: '100vh' }}>

      <AudioPlayer url={data.musikUrl} />

      <SectionCover   data={data} />
      <SectionOpening />
      <SectionMempelai data={data} />
      <SectionCountdown data={data} />
      <SectionAcara   data={data} />
      <SectionGaleri  data={data} />
      <SectionRSVP />
      <SectionAmplop  data={data} />
      <SectionClosing data={data} />
    </div>
  );
}
