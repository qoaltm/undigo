/**
 * HANA FOREST — Template Undangan Pernikahan
 * ────────────────────────────────────────────────
 * Tema: Botanical Forest · Deep Green · Organic Luxury
 *
 * Props (semua opsional, ada default nilai demo):
 *
 *   weddingData = {
 *     mempelaiPria:    { nama, namaAyah, namaIbu, anakKe, foto: '/assets/...' }
 *     mempelaiWanita:  { nama, namaAyah, namaIbu, anakKe, foto: '/assets/...' }
 *     akad:   { tanggal, waktu, selesai, venue, alamat, mapsUrl }
 *     resepsi:{ tanggal, waktu, selesai, venue, alamat, mapsUrl }
 *     targetDate: 'YYYY-MM-DDTHH:mm:ss'
 *     galeri: ['/assets/...', ...] max 6
 *     rekeningList: [{ bank, norek, atasNama }, ...]
 *     musikUrl: '/assets/...'
 *   }
 *
 * Asset yang dibutuhkan (taruh di /public/assets/templates/hana-forest/):
 *   leaf-top-left.png     ← daun tropis pojok kiri atas (transparan)
 *   leaf-top-right.png    ← daun kanan atas
 *   leaf-bottom.png       ← daun bawah
 *   fern-divider.svg      ← pakis horizontal untuk divider
 *   foto-wanita.jpg       ← portrait mempelai wanita
 *   foto-pria.jpg         ← portrait mempelai pria
 *   galeri-[1-6].jpg      ← foto galeri
 *   qris.png              ← QR code pembayaran
 *   musik.mp3             ← lagu background
 */

import { useState, useEffect, useRef } from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import { useReveal }    from '../../hooks/useReveal';

const BASE = '/assets/templates/hana-forest';

/* ── DATA DEFAULT ─────────────────────────────────────────── */
const DEFAULT_DATA = {
  mempelaiWanita: {
    nama:     'Hana Sekar Arum',
    namaAyah: 'H. Bambang Supriyadi',
    namaIbu:  'Hj. Endang Lestari',
    anakKe:   'Putri kedua',
    foto:     `${BASE}/foto-wanita.jpg`,
  },
  mempelaiPria: {
    nama:     'Dimas Arya Pratama',
    namaAyah: 'Ir. Hendra Wijaya',
    namaIbu:  'Dra. Nita Kurniawati',
    anakKe:   'Putra pertama',
    foto:     `${BASE}/foto-pria.jpg`,
  },
  akad: {
    tanggal: 'Minggu, 22 Juni 2025',
    waktu:   '08.00',
    selesai: 'selesai',
    venue:   'Masjid Al-Ikhlas Kemang',
    alamat:  'Jl. Kemang Raya No. 18, Kebayoran Baru, Jakarta Selatan',
    mapsUrl: 'https://maps.google.com',
  },
  resepsi: {
    tanggal: 'Minggu, 22 Juni 2025',
    waktu:   '11.00',
    selesai: '16.00 WIB',
    venue:   'The Ritz-Carlton Ballroom',
    alamat:  'Jl. DR. Ide Anak Agung Gde Agung, SCBD, Jakarta Selatan',
    mapsUrl: 'https://maps.google.com',
  },
  targetDate: '2025-06-22T08:00:00',
  galeri: [
    `${BASE}/galeri-1.jpg`,
    `${BASE}/galeri-2.jpg`,
    `${BASE}/galeri-3.jpg`,
    `${BASE}/galeri-4.jpg`,
    `${BASE}/galeri-5.jpg`,
    `${BASE}/galeri-6.jpg`,
  ],
  rekeningList: [
    { bank: 'BCA',     norek: '8765 4321 09', atasNama: 'Hana Sekar Arum'    },
    { bank: 'Mandiri', norek: '1122 3344 55', atasNama: 'Dimas Arya Pratama' },
  ],
  musikUrl: `${BASE}/musik.mp3`,
};

/* ── UCAPAN DEMO ─────────────────────────────────────────── */
const DEMO_UCAPAN = [
  { nama: 'Rindang Maharani',  hadir: 'hadir', pesan: 'Semoga menjadi keluarga yang sakinah, dipenuhi cinta dan berkah seperti taman yang selalu hijau dan subur.' },
  { nama: 'Galih & Keluarga',  hadir: 'hadir', pesan: 'Barakallahu lakuma! Semoga pernikahan kalian menjadi awal dari perjalanan yang indah penuh kebahagiaan abadi.' },
  { nama: 'Shinta Permata',    hadir: 'ragu',  pesan: 'Doa terbaik selalu menyertai. Semoga cinta kalian seteduh hutan dan sekuat akar yang dalam.' },
];

/* ── HELPERS ─────────────────────────────────────────────── */
const pad = (n) => String(n).padStart(2, '0');

/* Leaf SVG inline untuk menghindari kebutuhan asset */
function LeafDecor({ className, style, flip }) {
  return (
    <svg
      viewBox="0 0 120 200"
      className={className}
      style={style}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform={flip ? 'scale(-1,1) translate(-120,0)' : ''}>
        <path
          d="M60 195 C30 160 5 120 10 75 C15 30 45 5 60 5 C75 5 105 30 110 75 C115 120 90 160 60 195Z"
          fill="rgba(34,85,47,0.18)"
          stroke="rgba(34,85,47,0.25)"
          strokeWidth="1"
        />
        <path
          d="M60 195 C60 160 60 120 60 5"
          stroke="rgba(34,85,47,0.3)"
          strokeWidth="1"
          fill="none"
        />
        <path d="M60 80 C45 70 25 65 10 75" stroke="rgba(34,85,47,0.2)" strokeWidth="0.8" fill="none"/>
        <path d="M60 80 C75 70 95 65 110 75" stroke="rgba(34,85,47,0.2)" strokeWidth="0.8" fill="none"/>
        <path d="M60 110 C42 98 20 94 10 100" stroke="rgba(34,85,47,0.15)" strokeWidth="0.8" fill="none"/>
        <path d="M60 110 C78 98 100 94 110 100" stroke="rgba(34,85,47,0.15)" strokeWidth="0.8" fill="none"/>
        <path d="M60 140 C45 128 28 125 20 130" stroke="rgba(34,85,47,0.12)" strokeWidth="0.8" fill="none"/>
        <path d="M60 140 C75 128 92 125 100 130" stroke="rgba(34,85,47,0.12)" strokeWidth="0.8" fill="none"/>
      </g>
    </svg>
  );
}

function FernDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-2">
      <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(34,85,47,0.3))' }} />
      <svg viewBox="0 0 60 20" width="60" height="20" aria-hidden="true">
        <path d="M30 10 C20 4 10 6 5 10 M30 10 C40 4 50 6 55 10 M30 10 C24 16 15 16 10 14 M30 10 C36 16 45 16 50 14 M10 10 C16 7 22 8 30 10 M50 10 C44 7 38 8 30 10"
          stroke="rgba(34,85,47,0.5)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <circle cx="30" cy="10" r="2" fill="rgba(34,85,47,0.4)"/>
      </svg>
      <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(34,85,47,0.3), transparent)' }} />
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-2 reveal">
      <FernDivider />
      <p className="text-[0.6rem] tracking-[0.25em] uppercase text-center"
        style={{ color: 'rgba(34,85,47,0.6)', fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '0.22em' }}>
        {children}
      </p>
      <FernDivider />
    </div>
  );
}

/* Badge kehadiran */
function HadirBadge({ hadir }) {
  const map = {
    hadir: { label: 'Hadir', bg: 'rgba(34,85,47,0.12)', color: '#22552F', border: 'rgba(34,85,47,0.3)' },
    ragu:  { label: 'Mungkin', bg: 'rgba(180,150,60,0.1)', color: '#9a7c1e', border: 'rgba(180,150,60,0.3)' },
    tidak: { label: 'Berhalangan', bg: 'rgba(180,60,60,0.08)', color: '#8b2222', border: 'rgba(180,60,60,0.2)' },
  };
  const s = map[hadir] || map.ragu;
  return (
    <span className="text-[0.58rem] tracking-widest px-2 py-0.5 rounded-full border uppercase"
      style={{ background: s.bg, color: s.color, borderColor: s.border }}>
      {s.label}
    </span>
  );
}

/* ── KOMPONEN UTAMA ──────────────────────────────────────── */
export default function HanaForest({ weddingData }) {
  const data      = { ...DEFAULT_DATA, ...weddingData };
  const countdown = useCountdown(data.targetDate);
  useReveal();

  /* RSVP state */
  const [rsvpNama,   setRsvpNama]   = useState('');
  const [rsvpJumlah, setRsvpJumlah] = useState('1 orang');
  const [rsvpHadir,  setRsvpHadir]  = useState(null);
  const [rsvpPesan,  setRsvpPesan]  = useState('');
  const [submitted,  setSubmitted]  = useState(false);
  const [ucapanList, setUcapanList] = useState(DEMO_UCAPAN);

  /* Musik state */
  const audioRef      = useRef(null);
  const [playing, setPlaying] = useState(false);

  /* Cover envelope state */
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (!data.musikUrl) return;
    audioRef.current = new Audio(data.musikUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    return () => audioRef.current?.pause();
  }, [data.musikUrl]);

  function toggleMusik() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  }

  function copyNorek(norek, btn) {
    navigator.clipboard.writeText(norek.replace(/\s/g, '')).catch(() => {});
    const orig = btn.textContent;
    btn.textContent = '✓ Tersalin!';
    setTimeout(() => { btn.textContent = orig; }, 2000);
  }

  function handleRsvpSubmit() {
    if (!rsvpNama.trim() || !rsvpHadir) return;
    setUcapanList(prev => [
      { nama: rsvpNama, hadir: rsvpHadir, pesan: rsvpPesan || '–' },
      ...prev,
    ]);
    setSubmitted(true);
  }

  /* Warna utama */
  const G = {
    dark:    '#0d2416',
    mid:     '#163320',
    light:   '#1e4528',
    leaf:    '#22552F',
    leafSoft:'rgba(34,85,47,0.15)',
    gold:    '#b8975a',
    goldSoft:'rgba(184,151,90,0.18)',
    cream:   '#f5f0e8',
    creamDim:'rgba(245,240,232,0.7)',
    text:    '#1a3322',
  };

  return (
    <div className="relative overflow-x-hidden"
      style={{
        background: G.cream,
        fontFamily: "'Lora', 'Georgia', serif",
        color: G.text,
        minHeight: '100vh',
      }}
    >

      {/* ══════════════════════════════════════
          1. COVER / HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(175deg, ${G.dark} 0%, ${G.mid} 55%, ${G.light} 100%)` }}
      >
        {/* Background pattern — subtle leaf texture */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(34,85,47,0.12) 0%, transparent 50%),
                              radial-gradient(circle at 80% 80%, rgba(34,85,47,0.1) 0%, transparent 50%)`,
          }}
        />

        {/* Corner botanical decorations */}
        <LeafDecor
          className="absolute pointer-events-none"
          style={{ top: 0, left: 0, width: 140, height: 220, opacity: 0.8 }}
        />
        <LeafDecor
          flip
          className="absolute pointer-events-none"
          style={{ top: 0, right: 0, width: 140, height: 220, opacity: 0.8 }}
        />
        <LeafDecor
          className="absolute pointer-events-none"
          style={{ bottom: 0, left: 0, width: 110, height: 175, opacity: 0.5, transform: 'scaleY(-1)' }}
        />
        <LeafDecor
          flip
          className="absolute pointer-events-none"
          style={{ bottom: 0, right: 0, width: 110, height: 175, opacity: 0.5, transform: 'scaleY(-1)' }}
        />

        {/* Grid dots texture */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(245,240,232,0.04) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center px-8 text-center">

          {/* Top ornament line */}
          <div className="flex items-center gap-3 mb-8 w-full max-w-[280px]">
            <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${G.gold}80)` }} />
            <svg viewBox="0 0 16 16" width="10" height="10" aria-hidden="true">
              <path d="M8 0 L10 6 L16 8 L10 10 L8 16 L6 10 L0 8 L6 6Z" fill={G.gold} opacity="0.7"/>
            </svg>
            <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${G.gold}80, transparent)` }} />
          </div>

          {/* Invitation tag */}
          <p className="text-[0.55rem] tracking-[0.3em] uppercase mb-6"
            style={{ color: `${G.gold}bb`, letterSpacing: '0.3em', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            — Undangan Pernikahan —
          </p>

          {/* Bismillah */}
          <p className="text-xl mb-6" style={{ color: `${G.cream}90`, fontFamily: 'serif' }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>

          {/* Names */}
          <div className="flex flex-col items-center gap-1">
            <h1 className="font-light leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2.6rem, 9vw, 3.8rem)',
                color: G.cream,
                letterSpacing: '-0.02em',
              }}
            >
              {data.mempelaiWanita.nama.split(' ')[0]}
            </h1>

            <div className="flex items-center gap-4 my-1">
              <div className="h-px w-12" style={{ background: `${G.gold}60` }} />
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.8rem',
                color: G.gold,
                fontStyle: 'italic',
                fontWeight: 300,
              }}>
                &amp;
              </span>
              <div className="h-px w-12" style={{ background: `${G.gold}60` }} />
            </div>

            <h1 className="font-light leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2.6rem, 9vw, 3.8rem)',
                color: G.cream,
                letterSpacing: '-0.02em',
              }}
            >
              {data.mempelaiPria.nama.split(' ')[0]}
            </h1>
          </div>

          {/* Date badge */}
          <div className="mt-8 px-6 py-2 rounded-full border"
            style={{ borderColor: `${G.gold}40`, background: `${G.gold}12` }}>
            <p className="text-[0.65rem] tracking-[0.18em] uppercase"
              style={{ color: G.gold, fontFamily: "'Cormorant Garamond', serif" }}>
              {data.resepsi.tanggal}
            </p>
          </div>

          {/* Bottom ornament */}
          <div className="flex items-center gap-3 mt-8 w-full max-w-[280px]">
            <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${G.gold}80)` }} />
            <svg viewBox="0 0 40 16" width="40" height="16" aria-hidden="true">
              <path d="M20 8 C14 2 8 4 4 8 C8 12 14 14 20 8Z M20 8 C26 2 32 4 36 8 C32 12 26 14 20 8Z"
                stroke={G.gold} strokeWidth="0.8" fill="none" opacity="0.7"/>
              <circle cx="20" cy="8" r="1.5" fill={G.gold} opacity="0.7"/>
            </svg>
            <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${G.gold}80, transparent)` }} />
          </div>

          {/* Scroll cue */}
          <div className="mt-14 flex flex-col items-center gap-2 animate-bounce">
            <p className="text-[0.55rem] tracking-widest uppercase" style={{ color: `${G.cream}50` }}>Gulir ke bawah</p>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={`${G.cream}50`} strokeWidth="1.5">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. OPENING — Salam pembuka
      ══════════════════════════════════════ */}
      <section className="py-16 px-8 text-center relative overflow-hidden"
        style={{ background: `linear-gradient(180deg, ${G.dark} 0%, ${G.mid} 100%)` }}
      >
        <LeafDecor className="absolute pointer-events-none" style={{ top: -20, right: -20, width: 100, opacity: 0.3 }} flip />

        <p className="reveal text-[0.6rem] tracking-[0.28em] uppercase mb-6"
          style={{ color: `${G.gold}aa`, fontFamily: "'Cormorant Garamond', serif" }}>
          Assalamu'alaikum Warahmatullahi Wabarakatuh
        </p>

        <p className="reveal text-sm leading-relaxed max-w-[320px] mx-auto"
          style={{ color: `${G.cream}cc`, fontFamily: "'Lora', serif" }}>
          Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i
          untuk hadir dan memberikan doa restu dalam pernikahan kami.
        </p>

        <div className="reveal reveal-d1 mt-8 flex items-center justify-center gap-3">
          <div className="h-px w-16" style={{ background: `${G.gold}50` }} />
          <span style={{ color: G.gold, fontSize: '1.2rem' }}>✿</span>
          <div className="h-px w-16" style={{ background: `${G.gold}50` }} />
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. PROFIL PASANGAN
      ══════════════════════════════════════ */}
      <section className="py-16 px-6 relative overflow-hidden"
        style={{ background: G.cream }}
      >
        {/* Subtle leaf watermark */}
        <LeafDecor className="absolute pointer-events-none" style={{ top: 0, left: -30, width: 160, opacity: 0.15 }} />

        <div className="text-center mb-10">
          <SectionLabel>Mempelai</SectionLabel>
          <h2 className="reveal text-[1.8rem] font-light mt-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: G.dark, letterSpacing: '-0.01em' }}>
            Dua Jiwa, Satu Ikatan
          </h2>
        </div>

        {/* Wanita */}
        <div className="reveal flex flex-col items-center text-center mb-12">
          <div className="relative mb-5">
            {/* Decorative ring */}
            <div className="absolute inset-[-8px] rounded-full border-2"
              style={{ borderColor: `${G.leaf}30`, borderStyle: 'dashed' }} />
            <div className="w-28 h-28 rounded-full overflow-hidden border-4"
              style={{ borderColor: G.gold }}>
              <img src={data.mempelaiWanita.foto} alt={data.mempelaiWanita.nama}
                className="w-full h-full object-cover"
                onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
              <div className="w-full h-full hidden items-center justify-center text-3xl"
                style={{ background: G.leafSoft }}>🌸</div>
            </div>
          </div>

          <p className="text-[0.55rem] tracking-[0.2em] uppercase mb-1"
            style={{ color: `${G.leaf}80`, fontFamily: "'Cormorant Garamond', serif" }}>Mempelai Wanita</p>
          <h3 className="text-2xl font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: G.dark }}>
            {data.mempelaiWanita.nama}
          </h3>
          <p className="text-xs mt-2 leading-relaxed" style={{ color: `${G.text}99` }}>
            {data.mempelaiWanita.anakKe} dari<br />
            Bpk. {data.mempelaiWanita.namaAyah}<br />
            &amp; Ibu {data.mempelaiWanita.namaIbu}
          </p>
        </div>

        {/* Ornamen tengah */}
        <div className="flex items-center justify-center gap-4 mb-12 reveal">
          <div className="h-px flex-1 max-w-[60px]" style={{ background: `${G.gold}50` }} />
          <div className="flex flex-col items-center gap-1">
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: G.gold, fontStyle: 'italic' }}>&amp;</span>
          </div>
          <div className="h-px flex-1 max-w-[60px]" style={{ background: `${G.gold}50` }} />
        </div>

        {/* Pria */}
        <div className="reveal flex flex-col items-center text-center">
          <div className="relative mb-5">
            <div className="absolute inset-[-8px] rounded-full border-2"
              style={{ borderColor: `${G.leaf}30`, borderStyle: 'dashed' }} />
            <div className="w-28 h-28 rounded-full overflow-hidden border-4"
              style={{ borderColor: G.gold }}>
              <img src={data.mempelaiPria.foto} alt={data.mempelaiPria.nama}
                className="w-full h-full object-cover"
                onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
              <div className="w-full h-full hidden items-center justify-center text-3xl"
                style={{ background: G.leafSoft }}>🌿</div>
            </div>
          </div>

          <p className="text-[0.55rem] tracking-[0.2em] uppercase mb-1"
            style={{ color: `${G.leaf}80`, fontFamily: "'Cormorant Garamond', serif" }}>Mempelai Pria</p>
          <h3 className="text-2xl font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: G.dark }}>
            {data.mempelaiPria.nama}
          </h3>
          <p className="text-xs mt-2 leading-relaxed" style={{ color: `${G.text}99` }}>
            {data.mempelaiPria.anakKe} dari<br />
            Bpk. {data.mempelaiPria.namaAyah}<br />
            &amp; Ibu {data.mempelaiPria.namaIbu}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. COUNTDOWN
      ══════════════════════════════════════ */}
      <section className="py-16 px-6 text-center relative overflow-hidden"
        style={{ background: `linear-gradient(180deg, ${G.mid} 0%, ${G.dark} 100%)` }}
      >
        <LeafDecor className="absolute pointer-events-none"
          style={{ bottom: 0, left: 0, width: 120, opacity: 0.3, transform: 'scaleY(-1)' }} />
        <LeafDecor className="absolute pointer-events-none" flip
          style={{ bottom: 0, right: 0, width: 120, opacity: 0.3, transform: 'scaleY(-1)' }} />

        <SectionLabel>Menghitung Hari</SectionLabel>
        <h2 className="reveal text-[1.8rem] font-light mt-2 mb-10"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: G.cream }}>
          Menuju Hari <em style={{ color: G.gold }}>Istimewa</em>
        </h2>

        <div className="reveal reveal-d1 grid grid-cols-4 gap-3 max-w-[340px] mx-auto">
          {[
            { num: pad(countdown.d), label: 'Hari'  },
            { num: pad(countdown.h), label: 'Jam'   },
            { num: pad(countdown.m), label: 'Menit' },
            { num: pad(countdown.s), label: 'Detik' },
          ].map(({ num, label }) => (
            <div key={label} className="flex flex-col items-center py-4 px-2 rounded-xl"
              style={{ background: 'rgba(34,85,47,0.2)', border: `1px solid ${G.gold}30` }}>
              <span className="text-3xl font-light tabular-nums leading-none"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: G.cream }}>
                {num}
              </span>
              <span className="text-[0.55rem] mt-1.5 tracking-widest uppercase"
                style={{ color: `${G.gold}aa` }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        <p className="reveal reveal-d2 text-xs mt-8" style={{ color: `${G.cream}60` }}>
          {data.resepsi.tanggal}
        </p>
      </section>

      {/* ══════════════════════════════════════
          5. DETAIL ACARA
      ══════════════════════════════════════ */}
      <section className="py-16 px-6 relative overflow-hidden"
        style={{ background: G.cream }}
      >
        <LeafDecor className="absolute pointer-events-none" flip
          style={{ top: -10, right: -20, width: 130, opacity: 0.2 }} />

        <div className="text-center mb-10">
          <SectionLabel>Rangkaian Acara</SectionLabel>
          <h2 className="reveal text-[1.8rem] font-light mt-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: G.dark }}>
            Detail <em style={{ color: G.leaf }}>Pernikahan</em>
          </h2>
        </div>

        <div className="space-y-5">
          {/* Akad */}
          <div className="reveal rounded-2xl overflow-hidden"
            style={{ border: `1px solid rgba(34,85,47,0.2)`, background: 'white' }}>
            <div className="px-5 py-3 flex items-center gap-2"
              style={{ background: G.dark }}>
              <span className="text-lg">🕌</span>
              <span className="text-[0.6rem] tracking-[0.2em] uppercase font-medium"
                style={{ color: G.gold, fontFamily: "'Cormorant Garamond', serif" }}>
                Akad Nikah
              </span>
            </div>
            <div className="px-5 py-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke={G.leaf} strokeWidth="1.8">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: G.dark }}>{data.akad.tanggal}</p>
                  <p className="text-xs mt-0.5" style={{ color: `${G.text}80` }}>
                    Pukul {data.akad.waktu} WIB — {data.akad.selesai}
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 flex items-start gap-3"
                style={{ borderTop: `1px solid rgba(34,85,47,0.1)` }}>
                <div className="mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke={G.leaf} strokeWidth="1.8">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: G.dark }}>{data.akad.venue}</p>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: `${G.text}80` }}>
                    {data.akad.alamat}
                  </p>
                  <button
                    className="mt-2 text-[0.65rem] tracking-wide px-3 py-1 rounded-full transition-all"
                    style={{ background: G.leafSoft, color: G.leaf, border: `1px solid rgba(34,85,47,0.3)` }}
                    onClick={() => window.open(data.akad.mapsUrl, '_blank')}
                  >
                    Buka Maps →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Resepsi */}
          <div className="reveal reveal-d1 rounded-2xl overflow-hidden"
            style={{ border: `1px solid rgba(34,85,47,0.2)`, background: 'white' }}>
            <div className="px-5 py-3 flex items-center gap-2"
              style={{ background: G.mid }}>
              <span className="text-lg">🌿</span>
              <span className="text-[0.6rem] tracking-[0.2em] uppercase font-medium"
                style={{ color: G.gold, fontFamily: "'Cormorant Garamond', serif" }}>
                Resepsi Pernikahan
              </span>
            </div>
            <div className="px-5 py-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke={G.leaf} strokeWidth="1.8">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: G.dark }}>{data.resepsi.tanggal}</p>
                  <p className="text-xs mt-0.5" style={{ color: `${G.text}80` }}>
                    Pukul {data.resepsi.waktu} — {data.resepsi.selesai}
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 flex items-start gap-3"
                style={{ borderTop: `1px solid rgba(34,85,47,0.1)` }}>
                <div className="mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke={G.leaf} strokeWidth="1.8">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: G.dark }}>{data.resepsi.venue}</p>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: `${G.text}80` }}>
                    {data.resepsi.alamat}
                  </p>
                  <button
                    className="mt-2 text-[0.65rem] tracking-wide px-3 py-1 rounded-full transition-all"
                    style={{ background: G.leafSoft, color: G.leaf, border: `1px solid rgba(34,85,47,0.3)` }}
                    onClick={() => window.open(data.resepsi.mapsUrl, '_blank')}
                  >
                    Buka Maps →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Maps embed */}
        <div className="reveal reveal-d2 mt-6 rounded-2xl overflow-hidden"
          style={{ border: `1px solid rgba(34,85,47,0.2)` }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194820395512233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sTaman%20Mini%20Indonesia%20Indah!5e0!3m2!1sid!2sid!4v1700000000000"
            title="Lokasi Resepsi"
            className="w-full"
            style={{ height: 180, display: 'block', border: 'none', filter: 'saturate(0.6) sepia(0.1)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. GALERI FOTO
      ══════════════════════════════════════ */}
      <section className="py-16 relative overflow-hidden"
        style={{ background: `linear-gradient(180deg, ${G.dark} 0%, ${G.mid} 100%)` }}
      >
        <div className="px-6 text-center mb-8">
          <SectionLabel>Momen Kami</SectionLabel>
          <h2 className="reveal text-[1.8rem] font-light mt-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: G.cream }}>
            Galeri <em style={{ color: G.gold }}>Foto</em>
          </h2>
        </div>

        {/*
          FOTO YANG DIBUTUHKAN (dari Unsplash/Pexels — legal komersial):
          galeri-1.jpg → portrait ~2:3, akan span 2 rows (paling penting)
          galeri-2..6  → square / landscape bebas
          Keyword: "indonesian couple prewedding nature" atau "couple botanical garden"
        */}
        <div className="px-4 grid grid-cols-3 gap-2 reveal reveal-d1">
          {/* Foto 1: tall, spans 2 rows */}
          <div className="row-span-2 rounded-xl overflow-hidden relative"
            style={{ aspectRatio: '2/3', background: G.leafSoft }}>
            <img src={data.galeri[0]} alt="Foto 1"
              className="w-full h-full object-cover"
              onError={e => { e.target.style.opacity = 0; }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-2xl opacity-30">🌿</div>
          </div>

          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl overflow-hidden relative"
              style={{ aspectRatio: '1/1', background: G.leafSoft }}>
              <img src={data.galeri[i]} alt={`Foto ${i + 1}`}
                className="w-full h-full object-cover"
                onError={e => { e.target.style.opacity = 0; }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-xl opacity-30">🌸</div>
            </div>
          ))}

          {/* Foto 6: wide, spans 2 cols */}
          <div className="col-span-2 rounded-xl overflow-hidden relative"
            style={{ aspectRatio: '2/1', background: G.leafSoft }}>
            <img src={data.galeri[5]} alt="Foto 6"
              className="w-full h-full object-cover"
              onError={e => { e.target.style.opacity = 0; }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-xl opacity-30">🌺</div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          7. AMPLOP DIGITAL
      ══════════════════════════════════════ */}
      <section className="py-16 px-6 relative overflow-hidden"
        style={{ background: G.cream }}
      >
        <LeafDecor className="absolute pointer-events-none"
          style={{ top: 0, left: -10, width: 110, opacity: 0.18 }} />

        <div className="text-center mb-10">
          <SectionLabel>Hadiah</SectionLabel>
          <h2 className="reveal text-[1.8rem] font-light mt-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: G.dark }}>
            Amplop <em style={{ color: G.leaf }}>Digital</em>
          </h2>
          <p className="reveal reveal-d1 text-xs mt-3 leading-relaxed max-w-[280px] mx-auto"
            style={{ color: `${G.text}80` }}>
            Doa dan kehadiran Anda adalah hadiah paling berharga bagi kami. 
            Namun jika berkenan memberikan hadiah, berikut informasinya.
          </p>
        </div>

        <div className="space-y-4">
          {data.rekeningList.map((rek) => (
            <div key={rek.norek}
              className="reveal rounded-2xl p-5 flex items-center justify-between gap-4"
              style={{ background: 'white', border: `1px solid rgba(34,85,47,0.15)` }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: G.dark, color: G.gold }}>
                  {rek.bank[0]}
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: G.dark }}>{rek.bank}</p>
                  <p className="text-sm mt-0.5 tabular-nums" style={{ color: G.leaf, fontFamily: 'monospace' }}>
                    {rek.norek}
                  </p>
                  <p className="text-[0.6rem] mt-0.5" style={{ color: `${G.text}70` }}>a.n. {rek.atasNama}</p>
                </div>
              </div>
              <button
                className="text-[0.62rem] px-3 py-1.5 rounded-full transition-all whitespace-nowrap font-medium"
                style={{ background: G.leafSoft, color: G.leaf, border: `1px solid rgba(34,85,47,0.3)` }}
                onClick={e => copyNorek(rek.norek, e.currentTarget)}
              >
                Salin
              </button>
            </div>
          ))}

          {/* QRIS */}
          <div className="reveal reveal-d1 rounded-2xl p-5 text-center"
            style={{ background: 'white', border: `1px solid rgba(34,85,47,0.15)` }}>
            <p className="text-[0.6rem] tracking-widest uppercase mb-3" style={{ color: `${G.leaf}80` }}>
              Scan QRIS
            </p>
            <div className="w-20 h-20 mx-auto rounded-lg flex items-center justify-center"
              style={{ background: G.leafSoft, border: `1px dashed rgba(34,85,47,0.3)` }}>
              <img src={`${BASE}/qris.png`} alt="QRIS"
                className="w-full h-full object-contain rounded-lg"
                onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
              />
              <span className="text-2xl hidden">📱</span>
            </div>
            <p className="text-[0.6rem] mt-3" style={{ color: `${G.text}70` }}>
              GoPay · OVO · Dana · ShopeePay
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          8. RSVP
      ══════════════════════════════════════ */}
      <section className="py-16 px-6 relative overflow-hidden"
        style={{ background: `linear-gradient(180deg, ${G.mid} 0%, ${G.dark} 100%)` }}
      >
        <LeafDecor flip className="absolute pointer-events-none"
          style={{ top: 0, right: -20, width: 130, opacity: 0.25 }} />

        <div className="text-center mb-10">
          <SectionLabel>Konfirmasi Kehadiran</SectionLabel>
          <h2 className="reveal text-[1.8rem] font-light mt-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: G.cream }}>
            RSVP
          </h2>
          <p className="reveal reveal-d1 text-xs mt-3 max-w-[280px] mx-auto leading-relaxed"
            style={{ color: `${G.cream}70` }}>
            Mohon konfirmasi paling lambat 15 Juni 2025 agar kami 
            dapat mempersiapkan segalanya dengan baik untuk Anda.
          </p>
        </div>

        {!submitted ? (
          <div className="reveal reveal-d2 rounded-2xl p-6"
            style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid rgba(184,151,90,0.2)`, backdropFilter: 'blur(8px)' }}>

            {/* Nama */}
            <div className="mb-4">
              <label className="text-[0.6rem] tracking-widest uppercase block mb-1.5"
                style={{ color: `${G.gold}aa` }}>Nama Lengkap</label>
              <input
                type="text"
                placeholder="Masukkan nama Anda"
                value={rsvpNama}
                onChange={e => setRsvpNama(e.target.value)}
                className="w-full px-4 py-3 text-sm rounded-xl outline-none"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: `1px solid rgba(245,240,232,0.15)`,
                  color: G.cream,
                  fontFamily: "'Lora', serif",
                }}
              />
            </div>

            {/* Kehadiran */}
            <div className="mb-4">
              <label className="text-[0.6rem] tracking-widest uppercase block mb-1.5"
                style={{ color: `${G.gold}aa` }}>Kehadiran</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: 'hadir',  label: '✓ Hadir'       },
                  { val: 'ragu',   label: '? Mungkin'      },
                  { val: 'tidak',  label: '✕ Berhalangan'  },
                ].map(({ val, label }) => (
                  <button key={val}
                    className="py-2.5 rounded-xl text-xs font-medium transition-all"
                    style={{
                      background: rsvpHadir === val ? G.leaf : 'rgba(255,255,255,0.05)',
                      color: rsvpHadir === val ? G.cream : `${G.cream}80`,
                      border: `1px solid ${rsvpHadir === val ? G.leaf : 'rgba(245,240,232,0.15)'}`,
                    }}
                    onClick={() => setRsvpHadir(val)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Jumlah */}
            <div className="mb-4">
              <label className="text-[0.6rem] tracking-widest uppercase block mb-1.5"
                style={{ color: `${G.gold}aa` }}>Jumlah Tamu</label>
              <select
                value={rsvpJumlah}
                onChange={e => setRsvpJumlah(e.target.value)}
                className="w-full px-4 py-3 text-sm rounded-xl outline-none appearance-none"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: `1px solid rgba(245,240,232,0.15)`,
                  color: G.cream,
                  fontFamily: "'Lora', serif",
                }}
              >
                {['1 orang','2 orang','3 orang','4 orang','5+ orang'].map(o => (
                  <option key={o} style={{ background: G.dark }}>{o}</option>
                ))}
              </select>
            </div>

            {/* Pesan */}
            <div className="mb-5">
              <label className="text-[0.6rem] tracking-widest uppercase block mb-1.5"
                style={{ color: `${G.gold}aa` }}>Ucapan & Doa</label>
              <textarea
                rows={3}
                placeholder="Tuliskan ucapan dan doa untuk kedua mempelai…"
                value={rsvpPesan}
                onChange={e => setRsvpPesan(e.target.value)}
                className="w-full px-4 py-3 text-sm rounded-xl outline-none resize-none"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: `1px solid rgba(245,240,232,0.15)`,
                  color: G.cream,
                  fontFamily: "'Lora', serif",
                }}
              />
            </div>

            <button
              className="w-full py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all"
              style={{ background: G.leaf, color: G.cream, fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.08em', fontSize: '0.85rem' }}
              onClick={handleRsvpSubmit}
            >
              Kirim Konfirmasi 🌿
            </button>
          </div>
        ) : (
          <div className="reveal text-center py-12 rounded-2xl"
            style={{ background: 'rgba(34,85,47,0.15)', border: `1px solid rgba(34,85,47,0.3)` }}>
            <div className="text-4xl mb-4">🌸</div>
            <p className="text-lg font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: G.cream }}>
              Terima kasih, {rsvpNama}!
            </p>
            <p className="text-xs mt-2" style={{ color: `${G.cream}70` }}>
              Kami sangat menantikan kehadiran Anda
            </p>
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════
          9. UCAPAN & DOA
      ══════════════════════════════════════ */}
      <section className="py-16 px-6 relative overflow-hidden"
        style={{ background: G.cream }}
      >
        <div className="text-center mb-10">
          <SectionLabel>Doa & Ucapan</SectionLabel>
          <h2 className="reveal text-[1.8rem] font-light mt-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: G.dark }}>
            Pesan <em style={{ color: G.leaf }}>Tamu</em>
          </h2>
        </div>

        <div className="space-y-4">
          {ucapanList.map((u, i) => (
            <div key={i}
              className={`reveal reveal-d${(i % 3) + 1} rounded-2xl p-5`}
              style={{ background: 'white', border: `1px solid rgba(34,85,47,0.12)` }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: G.leafSoft, color: G.leaf }}>
                    {u.nama[0]}
                  </div>
                  <p className="text-sm font-medium" style={{ color: G.dark }}>{u.nama}</p>
                </div>
                <HadirBadge hadir={u.hadir} />
              </div>
              <p className="text-xs leading-relaxed italic" style={{ color: `${G.text}90` }}>
                "{u.pesan}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          10. PENUTUP
      ══════════════════════════════════════ */}
      <section className="py-20 px-8 text-center relative overflow-hidden"
        style={{ background: `linear-gradient(180deg, ${G.dark} 0%, #060f0a 100%)` }}
      >
        <LeafDecor className="absolute pointer-events-none"
          style={{ top: 0, left: 0, width: 140, opacity: 0.35 }} />
        <LeafDecor flip className="absolute pointer-events-none"
          style={{ top: 0, right: 0, width: 140, opacity: 0.35 }} />
        <LeafDecor className="absolute pointer-events-none"
          style={{ bottom: 0, left: 0, width: 120, opacity: 0.25, transform: 'scaleY(-1)' }} />
        <LeafDecor flip className="absolute pointer-events-none"
          style={{ bottom: 0, right: 0, width: 120, opacity: 0.25, transform: 'scaleY(-1)' }} />

        {/* Ayat */}
        <div className="relative z-10">
          <div className="reveal text-2xl mb-6" style={{ color: `${G.cream}70` }}>
            ﴿ وَمِنْ آيَاتِهِ ﴾
          </div>

          <blockquote
            className="reveal text-sm leading-relaxed max-w-[310px] mx-auto italic"
            style={{ color: `${G.cream}bb`, fontFamily: "'Lora', serif" }}>
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu 
            istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram 
            kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang."
          </blockquote>
          <p className="reveal reveal-d1 text-[0.6rem] tracking-widest uppercase mt-3"
            style={{ color: `${G.gold}90` }}>
            QS. Ar-Rum : 21
          </p>

          <div className="reveal reveal-d2 flex items-center justify-center gap-4 my-10">
            <div className="h-px w-20" style={{ background: `${G.gold}40` }} />
            <svg viewBox="0 0 50 20" width="50" height="20" aria-hidden="true">
              <path d="M25 10 C18 3 10 5 5 10 C10 15 18 17 25 10Z M25 10 C32 3 40 5 45 10 C40 15 32 17 25 10Z"
                stroke={G.gold} strokeWidth="0.8" fill="none" opacity="0.6"/>
              <circle cx="25" cy="10" r="2" fill={G.gold} opacity="0.6"/>
            </svg>
            <div className="h-px w-20" style={{ background: `${G.gold}40` }} />
          </div>

          <h2 className="reveal text-[2.2rem] font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: G.cream, letterSpacing: '-0.02em' }}>
            {data.mempelaiWanita.nama.split(' ')[0]}
            <span className="mx-3" style={{ color: G.gold, fontStyle: 'italic' }}>&</span>
            {data.mempelaiPria.nama.split(' ')[0]}
          </h2>

          <p className="reveal reveal-d1 text-xs mt-3 tracking-wider" style={{ color: `${G.cream}60` }}>
            {data.resepsi.tanggal}
          </p>

          <p className="reveal reveal-d2 mt-8 text-[0.58rem] tracking-[0.2em] uppercase"
            style={{ color: `${G.gold}70` }}>
            Wassalamu'alaikum Warahmatullahi Wabarakatuh
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FLOATING BUTTONS
      ══════════════════════════════════════ */}

      {/* Musik */}
      {data.musikUrl && (
        <button
          className="fixed bottom-20 right-4 z-50 w-11 h-11 rounded-full flex items-center justify-center text-base transition-all shadow-lg"
          style={{
            background: playing ? G.leaf : `${G.dark}ee`,
            border: `1px solid ${playing ? G.leaf : `${G.gold}50`}`,
            color: playing ? G.cream : G.gold,
            backdropFilter: 'blur(8px)',
          }}
          onClick={toggleMusik}
          title={playing ? 'Pause musik' : 'Play musik'}
        >
          {playing ? '♬' : '♪'}
        </button>
      )}

      {/* Share */}
      <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-6">
        <button
          className="w-full max-w-[360px] py-3.5 rounded-full text-sm font-medium tracking-wide transition-all shadow-xl"
          style={{
            background: G.dark,
            color: G.gold,
            border: `1px solid ${G.gold}40`,
            backdropFilter: 'blur(12px)',
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: '0.08em',
          }}
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: 'Undangan Pernikahan Hana & Dimas', url: window.location.href });
            } else {
              navigator.clipboard.writeText(window.location.href);
              alert('Link undangan berhasil disalin!');
            }
          }}
        >
          🌿 Bagikan Undangan
        </button>
      </div>

      {/* Reveal global styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');

        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-d1 { transition-delay: 0.12s; }
        .reveal-d2 { transition-delay: 0.22s; }
        .reveal-d3 { transition-delay: 0.34s; }

        input::placeholder, textarea::placeholder {
          color: rgba(245,240,232,0.3);
        }
        select option {
          background: #0d2416;
          color: #f5f0e8;
        }
      `}</style>
    </div>
  );
}
