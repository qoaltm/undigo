/**
 * OCEAN BLUE ELEGANCE — Template Undangan Pernikahan
 * ───────────────────────────────────────────────────
 * Tema: Deep Ocean · Midnight Navy · Pearl & Gold
 * Tailwind-only, zero external CSS.
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

import { useState, useRef } from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import { useReveal }    from '../../hooks/useReveal';

/* ── PALETTE ─────────────────────────────────────────────── */
const C = {
  bg:        '#050D1A',
  bgMid:     '#081628',
  bgDeep:    '#030A14',
  bgCard:    'rgba(255,255,255,0.035)',
  accent:    '#7BBCCC',
  accentGold:'#C9A84C',
  accentSoft:'rgba(123,188,204,0.12)',
  accentBrd: 'rgba(123,188,204,0.20)',
  goldSoft:  'rgba(201,168,76,0.15)',
  goldBrd:   'rgba(201,168,76,0.25)',
  text:      'rgba(255,255,255,0.90)',
  textSoft:  'rgba(255,255,255,0.48)',
  textMuted: 'rgba(255,255,255,0.28)',
  divider:   'rgba(123,188,204,0.18)',
};

/* ── DEFAULT DATA ─────────────────────────────────────────── */
const DEFAULT_DATA = {
  mempelaiWanita: {
    nama:    'Keira Anindita Sari',
    namaAyah:'Bpk. Faisal Hidayat',
    namaIbu: 'Ibu Rahmawati',
    anakKe:  'Putri pertama',
    foto:    null,
  },
  mempelaiPria: {
    nama:    'Aditya Maulana Putra',
    namaAyah:'Bpk. Hendra Santoso',
    namaIbu: 'Ibu Wulandari',
    anakKe:  'Putra kedua',
    foto:    null,
  },
  akad: {
    tanggal: 'Sabtu, 20 September 2025',
    waktu:   '08.00',
    selesai: '10.00 WIB',
    venue:   'Masjid Al-Hikmah Kemang',
    alamat:  'Jl. Kemang Raya No. 17, Jakarta Selatan',
    mapsUrl: 'https://maps.google.com',
  },
  resepsi: {
    tanggal: 'Sabtu, 20 September 2025',
    waktu:   '11.00',
    selesai: '14.00 WIB',
    venue:   'The Ballroom at Kempinski',
    alamat:  'Jl. M.H. Thamrin No. 9, Jakarta Pusat',
    mapsUrl: 'https://maps.google.com',
  },
  targetDate: '2025-09-20T08:00:00',
  galeri: [null, null, null, null, null, null],
  rekeningList: [
    { bank: 'BCA',     norek: '1234 5678 90', atasNama: 'Keira Anindita Sari'  },
    { bank: 'Mandiri', norek: '0987 6543 21', atasNama: 'Aditya Maulana Putra' },
  ],
  musikUrl: null,
};

const LOVE_STORY = [
  { year: '2019', title: 'Pertama Bertemu',  desc: 'Berjumpa di sebuah seminar desain di Jakarta. Satu pandang yang tak terlupakan.' },
  { year: '2021', title: 'Resmi Bersama',    desc: 'Setelah dua tahun persahabatan yang dalam, keberanian itu akhirnya datang.' },
  { year: '2023', title: 'Lamaran',          desc: 'Di tepi Pantai Bali saat matahari terbenam — sebuah cincin dan sebuah "iya".' },
  { year: '2025', title: 'Akad Nikah',       desc: 'Menyempurnakan separuh agama, bersama untuk selamanya.' },
];

/* ── HELPERS ──────────────────────────────────────────────── */
function WaveDivider() {
  return (
    <div style={{ lineHeight: 0 }}>
      <svg width="100%" viewBox="0 0 390 28" preserveAspectRatio="none" fill="none">
        <path d="M0 28 C60 8 130 0 195 14 C260 28 330 20 390 6 L390 28 Z" fill="#081628" />
      </svg>
    </div>
  );
}

function OceanDivider() {
  return (
    <div className="flex items-center gap-3 w-full my-1">
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(123,188,204,0.18))' }} />
      <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
        <path d="M11 2 C11 2 4 8 4 13 C4 16.3 7.1 19 11 19 C14.9 19 18 16.3 18 13 C18 8 11 2 11 2Z" fill="#7BBCCC" opacity="0.25"/>
        <path d="M11 6 C11 6 7 10 7 13 C7 14.7 8.8 16 11 16 C13.2 16 15 14.7 15 13 C15 10 11 6 11 6Z" fill="#7BBCCC" opacity="0.5"/>
        <circle cx="11" cy="13" r="2" fill="#7BBCCC" opacity="0.8"/>
      </svg>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(123,188,204,0.18), transparent)' }} />
    </div>
  );
}

function PhotoPlaceholder({ foto, alt, size = 110 }) {
  if (foto) {
    return (
      <img src={foto} alt={alt} className="rounded-full object-cover"
        style={{ width: size, height: size, border: '1.5px solid rgba(123,188,204,0.20)' }} />
    );
  }
  return (
    <div className="rounded-full flex items-center justify-center"
      style={{ width: size, height: size, background: 'rgba(123,188,204,0.12)', border: '1.5px solid rgba(123,188,204,0.20)' }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7BBCCC" strokeWidth="1.2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    </div>
  );
}

function BubbleField({ count = 20 }) {
  const bubbles = Array.from({ length: count }, (_, i) => ({
    left:  `${(i * 43.7 + 5) % 100}%`,
    top:   `${(i * 67.3 + 10) % 100}%`,
    size:  1.5 + (i % 4) * 1.2,
    delay: `${(i * 0.4) % 6}s`,
    dur:   `${3 + (i * 0.3) % 4}s`,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {bubbles.map((b, i) => (
        <div key={i} className="absolute rounded-full"
          style={{ left: b.left, top: b.top, width: b.size, height: b.size,
            background: '#7BBCCC', opacity: 0,
            animation: `obFloat ${b.dur} ${b.delay} ease-in-out infinite` }} />
      ))}
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
        style={{ background: 'rgba(123,188,204,0.12)', border: '1px solid rgba(123,188,204,0.20)' }}>
        {playing
          ? <svg width="14" height="14" viewBox="0 0 24 24" fill="#7BBCCC"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
          : <svg width="14" height="14" viewBox="0 0 24 24" fill="#7BBCCC"><polygon points="5,3 19,12 5,21"/></svg>}
      </button>
    </div>
  );
}

/* ── SECTIONS ─────────────────────────────────────────────── */

function SectionCover({ data }) {
  const w = data.mempelaiWanita;
  const p = data.mempelaiPria;
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-center px-8 py-20"
      style={{ background: 'radial-gradient(ellipse 130% 90% at 50% 10%, #0F2847 0%, #081628 45%, #050D1A 100%)' }}>
      <BubbleField count={24} />
      {[0.15, 0.4, 0.65, 0.85].map((pos, i) => (
        <div key={i} className="absolute left-0 right-0 h-px pointer-events-none"
          style={{ top: `${pos * 100}%`,
            background: 'linear-gradient(90deg, transparent 0%, rgba(123,188,204,0.18) 30%, rgba(123,188,204,0.18) 50%, rgba(123,188,204,0.18) 70%, transparent 100%)',
            animation: `obShimmer 6s ${i * 1.2}s ease-in-out infinite` }} />
      ))}
      {['top-6 left-6','top-6 right-6','bottom-6 left-6','bottom-6 right-6'].map((cls, i) => {
        const d = ['M0 40 L0 0 L40 0','M40 40 L40 0 L0 0','M0 0 L0 40 L40 40','M40 0 L40 40 L0 40'][i];
        return (
          <svg key={i} className={`absolute pointer-events-none ${cls}`} width="44" height="44" viewBox="0 0 44 44" fill="none">
            <path d={d} stroke="#C9A84C" strokeWidth="1" opacity="0.5" strokeLinecap="round"/>
            <path d={d} stroke="#7BBCCC" strokeWidth="0.5" opacity="0.35" strokeLinecap="round" strokeDasharray="4 6"/>
          </svg>
        );
      })}
      <div className="relative z-10 flex flex-col items-center gap-5">
        <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>
          Undangan Pernikahan
        </p>
        <div className="flex items-center gap-3">
          <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5))' }} />
          <svg width="12" height="12" viewBox="0 0 14 14" fill="#C9A84C" opacity="0.7">
            <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5Z"/>
          </svg>
          <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.5), transparent)' }} />
        </div>
        <div className="flex items-center gap-4 relative">
          <span className="font-display italic font-light leading-none"
            style={{ fontSize: 'clamp(5rem,18vw,7rem)', color: 'rgba(255,255,255,0.92)' }}>
            {w.nama.charAt(0)}
          </span>
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-8" style={{ background: 'linear-gradient(180deg, transparent, rgba(123,188,204,0.18))' }} />
            <span className="font-display italic" style={{ fontSize: '1.6rem', color: '#C9A84C' }}>&amp;</span>
            <div className="w-px h-8" style={{ background: 'linear-gradient(180deg, rgba(123,188,204,0.18), transparent)' }} />
          </div>
          <span className="font-display italic font-light leading-none"
            style={{ fontSize: 'clamp(5rem,18vw,7rem)', color: 'rgba(255,255,255,0.92)' }}>
            {p.nama.charAt(0)}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <p className="font-display italic font-light text-xl tracking-wide" style={{ color: 'rgba(255,255,255,0.90)' }}>
            {w.nama.split(' ')[0]}
            <span style={{ color: '#7BBCCC', margin: '0 0.5rem' }}>&amp;</span>
            {p.nama.split(' ')[0]}
          </p>
          <p className="text-[11px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>
            {data.resepsi.tanggal}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5))' }} />
          <div className="flex gap-1.5">
            {[0.4, 0.65, 0.9].map((op, i) => (
              <div key={i} className="w-1 h-1 rounded-full" style={{ background: '#C9A84C', opacity: op }} />
            ))}
          </div>
          <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.5), transparent)' }} />
        </div>
        <p className="text-[10px] tracking-[0.3em] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.48)' }}>
          Intimate Wedding
        </p>
      </div>
      <div className="absolute bottom-8 flex flex-col items-center gap-1.5 z-10"
        style={{ animation: 'obFloat2 2.5s ease-in-out infinite' }}>
        <p className="text-[9px] tracking-[0.35em] uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>Scroll</p>
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
          <path d="M7 2L7 14M3 11L7 16L11 11" stroke="#C9A84C" strokeWidth="1"
            opacity="0.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <style>{`
        @keyframes obFloat  { 0%,100%{opacity:0;transform:translateY(0)} 50%{opacity:0.55;transform:translateY(-8px)} }
        @keyframes obFloat2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }
        @keyframes obShimmer{ 0%,100%{opacity:0} 50%{opacity:1} }
      `}</style>
    </section>
  );
}

function SectionOpening() {
  return (
    <section className="reveal relative px-8 py-16 text-center overflow-hidden"
      style={{ background: '#081628' }}>
      <BubbleField count={10} />
      <div className="relative z-10 max-w-[300px] mx-auto flex flex-col items-center gap-5">
        <p className="text-[11px] tracking-[0.3em] uppercase" style={{ color: '#C9A84C' }}>
          Bismillahirrahmanirrahim
        </p>
        <div className="w-10 h-px" style={{ background: 'rgba(123,188,204,0.18)' }} />
        <p className="font-display italic text-lg font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.90)' }}>
          "Dan di antara tanda-tanda kekuasaan-Nya, Dia menciptakan pasangan untukmu dari jenismu sendiri, agar kamu merasa tenteram."
        </p>
        <p className="text-[11px] tracking-widest" style={{ color: 'rgba(255,255,255,0.28)' }}>QS. Ar-Rum: 21</p>
        <div className="w-10 h-px" style={{ background: 'rgba(123,188,204,0.18)' }} />
        <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.48)' }}>
          Dengan penuh rasa syukur, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu di hari istimewa kami.
        </p>
      </div>
    </section>
  );
}

function SectionMempelai({ data }) {
  const { mempelaiWanita: w, mempelaiPria: p } = data;
  return (
    <section className="reveal relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #081628 0%, #050D1A 100%)' }}>
      <WaveDivider />
      <div className="px-8 pb-16 pt-6 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <p className="text-[10px] tracking-[0.35em] uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>Mempelai</p>
          <OceanDivider />
        </div>
        {[w, p].map((m, idx) => (
          <div key={idx} className="w-full flex flex-col items-center gap-4 text-center py-6 px-5 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(123,188,204,0.20)' }}>
            <PhotoPlaceholder foto={m.foto} alt={m.nama} size={100} />
            <div>
              <p className="font-display italic text-xl font-light mb-0.5" style={{ color: 'rgba(255,255,255,0.90)' }}>{m.nama}</p>
              <p className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: '#7BBCCC' }}>{m.anakKe}</p>
              <p className="text-[12px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.48)' }}>
                {idx === 0 ? 'Putri' : 'Putra'} dari {m.namaAyah}<br />dan {m.namaIbu}
              </p>
            </div>
          </div>
        ))}
        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(123,188,204,0.18))' }} />
          <span className="font-display italic text-2xl" style={{ color: '#C9A84C' }}>&amp;</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(123,188,204,0.18), transparent)' }} />
        </div>
      </div>
    </section>
  );
}

function SectionLoveStory() {
  return (
    <section className="reveal px-8 py-16" style={{ background: '#081628' }}>
      <div className="flex flex-col items-center gap-7">
        <div className="flex flex-col items-center gap-2">
          <p className="text-[10px] tracking-[0.35em] uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>Perjalanan Cinta</p>
          <OceanDivider />
        </div>
        <div className="relative w-full">
          <div className="absolute left-[22px] top-4 bottom-4 w-px"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(123,188,204,0.18) 20%, rgba(123,188,204,0.18) 80%, transparent)' }} />
          <div className="flex flex-col gap-6">
            {LOVE_STORY.map((s, i) => (
              <div key={i} className="flex gap-5 items-start">
                <div className="w-11 h-11 rounded-full shrink-0 flex items-center justify-center z-10"
                  style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(123,188,204,0.20)' }}>
                  <span className="text-[9px] font-medium" style={{ color: '#7BBCCC' }}>{s.year}</span>
                </div>
                <div className="pt-2.5">
                  <p className="text-sm font-medium mb-1" style={{ color: 'rgba(255,255,255,0.90)' }}>{s.title}</p>
                  <p className="text-[12px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.48)' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionCountdown({ data }) {
  const time = useCountdown(data.targetDate);
  const blocks = [
    { label: 'Hari',  val: time.d },
    { label: 'Jam',   val: time.h },
    { label: 'Menit', val: time.m },
    { label: 'Detik', val: time.s },
  ];
  return (
    <section className="reveal relative px-8 py-16 text-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 140% 100% at 50% 100%, #0F2847 0%, #050D1A 60%)' }}>
      <BubbleField count={16} />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <p className="text-[10px] tracking-[0.35em] uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>Menuju Hari Bahagia</p>
        <OceanDivider />
        <p className="font-display italic text-base" style={{ color: 'rgba(255,255,255,0.48)' }}>{data.resepsi.tanggal}</p>
        <div className="flex items-start gap-2.5 mt-1">
          {blocks.map(({ label, val }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 rounded-xl px-3 py-3 min-w-[58px]"
              style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(123,188,204,0.20)' }}>
              <span className="font-display text-[2rem] font-light tabular-nums leading-none"
                style={{ color: 'rgba(255,255,255,0.90)' }}>{String(val).padStart(2, '0')}</span>
              <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionAcara({ data }) {
  const events = [
    { label: 'Akad Nikah', icon: '◇', ...data.akad },
    { label: 'Resepsi',    icon: '◆', ...data.resepsi },
  ];
  return (
    <section className="reveal px-8 py-16" style={{ background: '#081628' }}>
      <div className="flex flex-col items-center gap-7">
        <div className="flex flex-col items-center gap-2">
          <p className="text-[10px] tracking-[0.35em] uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>Detail Acara</p>
          <OceanDivider />
        </div>
        {events.map((ev, i) => (
          <div key={i} className="w-full rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(123,188,204,0.20)' }}>
            <div className="px-6 py-3.5 flex items-center gap-2.5"
              style={{ background: 'rgba(123,188,204,0.12)', borderBottom: '1px solid rgba(123,188,204,0.20)' }}>
              <span className="text-xs" style={{ color: '#7BBCCC' }}>{ev.icon}</span>
              <p className="text-[11px] font-medium tracking-[0.25em] uppercase" style={{ color: '#7BBCCC' }}>{ev.label}</p>
            </div>
            <div className="px-6 py-5 flex flex-col gap-3.5">
              <div className="flex items-center gap-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7BBCCC" strokeWidth="1.5" className="shrink-0">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                </svg>
                <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.48)' }}>{ev.tanggal}</span>
              </div>
              <div className="flex items-center gap-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7BBCCC" strokeWidth="1.5" className="shrink-0">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
                <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.48)' }}>{ev.waktu} – {ev.selesai}</span>
              </div>
              <div className="flex items-start gap-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7BBCCC" strokeWidth="1.5" className="shrink-0 mt-0.5">
                  <path d="M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z"/><circle cx="12" cy="9" r="3"/>
                </svg>
                <div>
                  <p className="text-[13px] font-medium mb-0.5" style={{ color: 'rgba(255,255,255,0.90)' }}>{ev.venue}</p>
                  <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.28)' }}>{ev.alamat}</p>
                </div>
              </div>
              <a href={ev.mapsUrl} target="_blank" rel="noopener noreferrer"
                className="mt-0.5 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[12px] tracking-wide font-medium transition-opacity duration-200 hover:opacity-80"
                style={{ background: 'rgba(123,188,204,0.12)', border: '1px solid rgba(123,188,204,0.20)', color: '#7BBCCC' }}>
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
    <section className="reveal px-6 py-14" style={{ background: '#050D1A' }}>
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <p className="text-[10px] tracking-[0.35em] uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>Galeri Foto</p>
          <OceanDivider />
        </div>
        <div className="grid grid-cols-3 gap-2 w-full">
          {photos.map((src, i) => (
            <div key={i} className={`${i === 0 ? 'col-span-2 row-span-2' : ''} rounded-xl overflow-hidden`}
              style={{ aspectRatio: '1/1', background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(123,188,204,0.20)' }}>
              {src ? (
                <img src={src} alt={`Galeri ${i+1}`} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7BBCCC" strokeWidth="1" opacity="0.35">
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
  const [name, setName]     = useState('');
  const [attend, setAttend] = useState('');
  const [guests, setGuests] = useState('1');
  const [msg, setMsg]       = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !attend) return;
    setSubmitted(true);
  };

  const inp = {
    background: 'rgba(255,255,255,0.035)',
    border: '1px solid rgba(123,188,204,0.20)',
    borderRadius: '10px',
    color: 'rgba(255,255,255,0.90)',
    padding: '0.65rem 0.85rem',
    fontSize: '13px',
    outline: 'none',
    width: '100%',
  };

  return (
    <section className="reveal px-8 py-16" style={{ background: '#081628' }}>
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <p className="text-[10px] tracking-[0.35em] uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>Konfirmasi Kehadiran</p>
          <OceanDivider />
        </div>
        {submitted ? (
          <div className="text-center py-8 flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(123,188,204,0.12)', border: '1px solid rgba(123,188,204,0.20)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7BBCCC" strokeWidth="2">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <p className="font-display italic text-lg" style={{ color: 'rgba(255,255,255,0.90)' }}>Terima kasih, {name}!</p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.48)' }}>Konfirmasi kehadiranmu telah kami terima.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
            <input style={inp} placeholder="Nama lengkap" value={name} onChange={e => setName(e.target.value)} required />
            <select style={{ ...inp, appearance: 'none' }} value={attend} onChange={e => setAttend(e.target.value)} required>
              <option value="">Konfirmasi kehadiran…</option>
              <option value="hadir">Insya Allah hadir</option>
              <option value="tidak">Mohon maaf tidak dapat hadir</option>
            </select>
            {attend === 'hadir' && (
              <input style={inp} type="number" min="1" max="5"
                placeholder="Jumlah tamu" value={guests} onChange={e => setGuests(e.target.value)} />
            )}
            <textarea style={{ ...inp, resize: 'none', height: '80px' }}
              placeholder="Ucapan & doa untuk mempelai…" value={msg} onChange={e => setMsg(e.target.value)} />
            <button type="submit"
              className="py-3 rounded-xl text-sm font-medium tracking-widest uppercase transition-opacity duration-200 hover:opacity-85"
              style={{ background: 'linear-gradient(135deg, #1A4A7A, #2D7BA0)', color: '#fff' }}>
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
    <section className="reveal px-8 py-16" style={{ background: '#050D1A' }}>
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <p className="text-[10px] tracking-[0.35em] uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>Amplop Digital</p>
          <OceanDivider />
          <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.48)' }}>
            Doa restu Anda adalah hadiah terindah bagi kami.
          </p>
        </div>
        {(data.rekeningList || []).map((rek, i) => (
          <div key={i} className="w-full rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(123,188,204,0.20)' }}>
            <div className="px-5 py-3 flex items-center gap-2"
              style={{ borderBottom: '1px solid rgba(123,188,204,0.18)', background: 'rgba(123,188,204,0.12)' }}>
              <div className="w-6 h-6 rounded-md flex items-center justify-center"
                style={{ background: '#050D1A' }}>
                <span className="text-[9px] font-bold" style={{ color: '#7BBCCC' }}>{rek.bank.slice(0,3)}</span>
              </div>
              <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.90)' }}>{rek.bank}</p>
            </div>
            <div className="px-5 py-4 flex items-center justify-between gap-3">
              <div>
                <p className="font-mono text-base font-medium" style={{ color: 'rgba(255,255,255,0.90)' }}>{rek.norek}</p>
                <p className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>a.n. {rek.atasNama}</p>
              </div>
              <button onClick={() => copy(rek.norek, i)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-200"
                style={{ background: copied === i ? 'rgba(123,188,204,0.12)' : 'transparent',
                  border: '1px solid rgba(123,188,204,0.20)', color: '#7BBCCC' }}>
                {copied === i ? (
                  <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg> Disalin</>
                ) : (
                  <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Salin</>
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
      style={{ background: 'radial-gradient(ellipse 130% 80% at 50% 100%, #0F2847 0%, #050D1A 60%)' }}>
      <BubbleField count={18} />
      <div className="absolute left-0 right-0 h-px top-0"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(123,188,204,0.18) 30%, rgba(123,188,204,0.18) 50%, transparent)' }} />
      <div className="relative z-10 flex flex-col items-center gap-5">
        <OceanDivider />
        <p className="font-display italic text-base font-light" style={{ color: 'rgba(255,255,255,0.48)' }}>
          Atas kehadiran dan doa restu Bapak/Ibu/Saudara/i
        </p>
        <p className="font-display italic text-3xl font-light" style={{ color: 'rgba(255,255,255,0.90)' }}>
          Terima Kasih
        </p>
        <p className="text-[12px] tracking-[0.3em] uppercase" style={{ color: '#7BBCCC' }}>
          {w} &amp; {p}
        </p>
        <OceanDivider />
        <p className="text-[10px] tracking-[0.25em] uppercase mt-2" style={{ color: 'rgba(255,255,255,0.28)' }}>
          Made with Undigo ◆
        </p>
      </div>
    </section>
  );
}

/* ── MAIN COMPONENT ───────────────────────────────────────── */
export default function OceanBlue({ weddingData }) {
  const data = { ...DEFAULT_DATA, ...weddingData };
  useReveal();

  return (
    <div className="relative w-full font-body overflow-x-hidden"
      style={{ background: '#050D1A', color: 'rgba(255,255,255,0.90)', minHeight: '100vh' }}>
      <AudioPlayer url={data.musikUrl} />
      <SectionCover     data={data} />
      <SectionOpening />
      <SectionMempelai  data={data} />
      <SectionLoveStory />
      <SectionCountdown data={data} />
      <SectionAcara     data={data} />
      <SectionGaleri    data={data} />
      <SectionRSVP />
      <SectionAmplop    data={data} />
      <SectionClosing   data={data} />
    </div>
  );
}
