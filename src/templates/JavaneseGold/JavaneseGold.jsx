/**
 * JAVANESE NOIR — Template Undangan Pernikahan
 * ─────────────────────────────────────────────
 * Konsep: Wayang Noir · Siluet · Tembaga Tua · Kertas Kuno
 *
 * Estetika:
 *  - Warna: hitam pekat, tembaga/amber tua, krem kertas kuno
 *  - Ornamen: siluet gunungan wayang, batik micro-texture sebagai noise
 *  - Countdown: jantra (roda melingkar)
 *  - Tipografi: serif kondensed heading, italic body
 *  - Layout: asimetris diagonal, bukan simetri konvensional
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

import { useState, useRef, useEffect } from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import { useReveal }    from '../../hooks/useReveal';

/* ── PALETTE ─────────────────────────────────────────────── */
const C = {
  bg:        '#0A0804',
  bgWarm:    '#120E07',
  bgCard:    'rgba(255,220,150,0.04)',
  copper:    '#B8722A',       // tembaga tua
  copperLt:  '#D4954A',       // tembaga terang
  cream:     '#F0DEB4',       // krem kertas kuno
  creamSoft: 'rgba(240,222,180,0.55)',
  creamDim:  'rgba(240,222,180,0.22)',
  creamMuted:'rgba(240,222,180,0.12)',
  brd:       'rgba(184,114,42,0.22)',
  brdLt:     'rgba(184,114,42,0.40)',
  text:      'rgba(240,222,180,0.90)',
  textSoft:  'rgba(240,222,180,0.50)',
  textMuted: 'rgba(240,222,180,0.28)',
};

/* ── DEFAULT DATA ─────────────────────────────────────────── */
const DEFAULT_DATA = {
  mempelaiWanita: {
    nama:    'Dyah Ayu Kinanthi',
    namaAyah:'K.R.T. Hadisumarno',
    namaIbu: 'Rr. Endang Rahayu',
    anakKe:  'Putri pertama',
    foto:    null,
  },
  mempelaiPria: {
    nama:    'Bagus Prasetyo Aji',
    namaAyah:'Bpk. Suharto Wibisono',
    namaIbu: 'Ibu Tri Wahyuningsih',
    anakKe:  'Putra ketiga',
    foto:    null,
  },
  akad: {
    tanggal: 'Sabtu, 5 Juli 2025',
    waktu:   '08.00',
    selesai: '10.00 WIB',
    venue:   'Pendopo Agung Mangkunegaran',
    alamat:  'Jl. Ronggowarsito, Keprabon, Banjarsari, Surakarta',
    mapsUrl: 'https://maps.google.com',
  },
  resepsi: {
    tanggal: 'Sabtu, 5 Juli 2025',
    waktu:   '11.00',
    selesai: '15.00 WIB',
    venue:   'Pura Mangkunegaran',
    alamat:  'Jl. Ronggowarsito, Keprabon, Banjarsari, Surakarta',
    mapsUrl: 'https://maps.google.com',
  },
  targetDate: '2025-07-05T08:00:00',
  galeri: [null, null, null, null, null, null],
  rekeningList: [
    { bank: 'BNI',  norek: '0123 4567 89', atasNama: 'Dyah Ayu Kinanthi'  },
    { bank: 'BCA',  norek: '9876 5432 10', atasNama: 'Bagus Prasetyo Aji' },
  ],
  musikUrl: null,
};

/* ── ORNAMENTS ────────────────────────────────────────────── */

/** Gunungan — siluet gunung wayang, distilasi simpel */
function Gunungan({ height = 180, flip = false, opacity = 0.18 }) {
  const w = (height * 0.55).toFixed(0);
  const h = height;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none"
      style={{ opacity, transform: flip ? 'scaleY(-1)' : 'none' }}>
      {/* Outer silhouette */}
      <path
        d={`M${w/2} 4 L${w-4} ${h-20} Q${w/2} ${h} 4 ${h-20} Z`}
        fill={C.copper} opacity="0.9"
      />
      {/* Inner detail lines */}
      {[0.85, 0.70, 0.55, 0.40, 0.28].map((t, i) => {
        const y = h - 20 - (h - 24) * (1 - t);
        const hw = (w/2 - 6) * t;
        return (
          <line key={i}
            x1={w/2 - hw} y1={y} x2={w/2 + hw} y2={y}
            stroke={C.cream} strokeWidth="0.6" opacity={0.3 + i * 0.08}
          />
        );
      })}
      {/* Center spine */}
      <line x1={w/2} y1="8" x2={w/2} y2={h-22}
        stroke={C.cream} strokeWidth="0.7" opacity="0.25"/>
      {/* Apex flame */}
      <ellipse cx={w/2} cy="4" rx="3" ry="4" fill={C.cream} opacity="0.5"/>
      {/* Base notch */}
      <path d={`M${w/2-12} ${h-16} L${w/2} ${h-4} L${w/2+12} ${h-16}`}
        fill={C.bgWarm}/>
    </svg>
  );
}

/** Parang diagonal ornament — motif batik parang distilasi */
function ParangStripe({ opacity = 0.06 }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity }}>
      <defs>
        <pattern id="parang" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)">
          <path d="M0 14 Q7 0 14 14 Q21 28 28 14" stroke={C.copper}
            strokeWidth="1.2" fill="none"/>
          <path d="M0 28 Q7 14 14 28" stroke={C.copper}
            strokeWidth="0.6" fill="none" opacity="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#parang)"/>
    </svg>
  );
}

/** Kawung dot grid — motif batik kawung minimalis */
function KawungGrid({ opacity = 0.07 }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity }}>
      <defs>
        <pattern id="kawung" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="3.5" fill="none" stroke={C.copper} strokeWidth="0.7"/>
          <circle cx="0"  cy="0"  r="2"   fill="none" stroke={C.copper} strokeWidth="0.5"/>
          <circle cx="20" cy="0"  r="2"   fill="none" stroke={C.copper} strokeWidth="0.5"/>
          <circle cx="0"  cy="20" r="2"   fill="none" stroke={C.copper} strokeWidth="0.5"/>
          <circle cx="20" cy="20" r="2"   fill="none" stroke={C.copper} strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#kawung)"/>
    </svg>
  );
}

/** Prasasti divider — seperti ukiran batu */
function PrasastiDivider({ label = '' }) {
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${C.brd})` }}/>
      <div className="flex items-center gap-2 px-3">
        <div className="w-1.5 h-1.5 rotate-45" style={{ background: C.copper }}/>
        {label && (
          <span className="text-[9px] tracking-[0.45em] uppercase font-medium"
            style={{ color: C.copper, fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif" }}>
            {label}
          </span>
        )}
        <div className="w-1.5 h-1.5 rotate-45" style={{ background: C.copper }}/>
      </div>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${C.brd}, transparent)` }}/>
    </div>
  );
}

function PhotoPlaceholder({ foto, alt, size = 110 }) {
  if (foto) {
    return (
      <img src={foto} alt={alt} className="object-cover"
        style={{ width: size, height: size, clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          border: 'none' }} />
    );
  }
  /* Hexagonal frame */
  return (
    <div className="flex items-center justify-center"
      style={{ width: size, height: size, clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        background: C.creamMuted, border: `1px solid ${C.brd}` }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.copper} strokeWidth="1.2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    </div>
  );
}

function AudioPlayer({ url }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const toggle = () => {
    if (!ref.current) return;
    if (playing) { ref.current.pause(); setPlaying(false); }
    else { ref.current.play().then(() => setPlaying(true)).catch(() => {}); }
  };
  if (!url) return null;
  return (
    <div className="fixed top-4 right-4 z-50">
      <audio ref={ref} src={url} loop />
      <button onClick={toggle}
        className="w-9 h-9 flex items-center justify-center transition-transform hover:scale-110"
        style={{ background: C.creamMuted, border: `1px solid ${C.brd}`,
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
        {playing
          ? <svg width="13" height="13" viewBox="0 0 24 24" fill={C.copper}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
          : <svg width="13" height="13" viewBox="0 0 24 24" fill={C.copper}><polygon points="5,3 19,12 5,21"/></svg>}
      </button>
    </div>
  );
}

/* ── JANTRA COUNTDOWN — roda waktu melingkar ─────────────── */
function JantraCountdown({ data }) {
  const time = useCountdown(data.targetDate);
  const segments = [
    { label: 'HARI',   val: time.d, max: 365, color: C.copper   },
    { label: 'JAM',    val: time.h, max: 24,  color: C.copperLt },
    { label: 'MENIT',  val: time.m, max: 60,  color: C.cream    },
    { label: 'DETIK',  val: time.s, max: 60,  color: C.creamSoft},
  ];

  /* Renders a single ring arc */
  function Ring({ cx, cy, r, progress, color, strokeW = 3 }) {
    const circ = 2 * Math.PI * r;
    const dash = circ * Math.min(progress, 1);
    return (
      <>
        <circle cx={cx} cy={cy} r={r} fill="none"
          stroke={color} strokeWidth={strokeW} opacity="0.12"/>
        <circle cx={cx} cy={cy} r={r} fill="none"
          stroke={color} strokeWidth={strokeW}
          strokeDasharray={`${dash} ${circ}`}
          strokeDashoffset={circ * 0.25}     /* start from top */
          strokeLinecap="round" opacity="0.85"/>
      </>
    );
  }

  const SIZE = 220;
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const radii = [88, 72, 56, 40];

  return (
    <section className="reveal relative px-8 py-16 text-center overflow-hidden"
      style={{ background: C.bgWarm }}>
      <KawungGrid opacity={0.05} />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <PrasastiDivider label="Jantra Waktu" />

        <div className="relative" style={{ width: SIZE, height: SIZE }}>
          <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}
            style={{ transform: 'rotate(-90deg)' }}>
            {segments.map((seg, i) => (
              <Ring key={i}
                cx={CX} cy={CY} r={radii[i]}
                progress={seg.val / seg.max}
                color={seg.color}
                strokeW={i === 0 ? 4 : 3}
              />
            ))}
            {/* Decorative spokes */}
            {Array.from({ length: 8 }, (_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              return (
                <line key={i}
                  x1={CX + Math.cos(angle) * 32}
                  y1={CY + Math.sin(angle) * 32}
                  x2={CX + Math.cos(angle) * 36}
                  y2={CY + Math.sin(angle) * 36}
                  stroke={C.cream} strokeWidth="1" opacity="0.15"/>
              );
            })}
            {/* Inner circle */}
            <circle cx={CX} cy={CY} r="28" fill={C.bg} stroke={C.brd} strokeWidth="1"/>
            <circle cx={CX} cy={CY} r="3"  fill={C.copper}/>
          </svg>

          {/* Center overlay — rotated back to normal */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-0"
            style={{ transform: 'rotate(0deg)' }}>
            <span className="font-display text-2xl tabular-nums font-light leading-none"
              style={{ color: C.cream }}>
              {String(time.d).padStart(2,'0')}
            </span>
            <span className="text-[8px] tracking-[0.3em] uppercase" style={{ color: C.textMuted }}>
              hari
            </span>
          </div>

          {/* Ring labels — positioned around */}
          {[
            { label: 'JAM',   val: time.h, deg: 0   },
            { label: 'MENIT', val: time.m, deg: 120  },
            { label: 'DETIK', val: time.s, deg: 240  },
          ].map(({ label, val, deg }) => {
            const rad = (deg - 90) * (Math.PI / 180);
            const r = 106;
            const x = CX + Math.cos(rad) * r;
            const y = CY + Math.sin(rad) * r;
            return (
              <div key={label} className="absolute flex flex-col items-center"
                style={{ left: x, top: y, transform: 'translate(-50%,-50%)', lineHeight: 1 }}>
                <span className="font-display text-base tabular-nums leading-none"
                  style={{ color: C.creamSoft }}>
                  {String(val).padStart(2,'0')}
                </span>
                <span className="text-[7px] tracking-[0.25em] uppercase"
                  style={{ color: C.textMuted }}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        <p className="font-display italic text-sm" style={{ color: C.textSoft }}>
          {data.resepsi.tanggal}
        </p>
      </div>
    </section>
  );
}

/* ── SECTIONS ─────────────────────────────────────────────── */

function SectionCover({ data }) {
  const w = data.mempelaiWanita;
  const p = data.mempelaiPria;

  return (
    <section className="relative flex flex-col min-h-screen overflow-hidden"
      style={{ background: C.bg }}>
      <ParangStripe opacity={0.07} />

      {/* Full-height left copper bar — asimetris */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ background: `linear-gradient(180deg, transparent, ${C.copper}, transparent)` }}/>

      {/* Top gunungan — pojok kanan, bukan tengah */}
      <div className="absolute top-0 right-6 pointer-events-none"
        style={{ transform: 'translateY(-10px)', opacity: 0.15 }}>
        <Gunungan height={220} opacity={1} />
      </div>

      {/* Bottom gunungan terbalik */}
      <div className="absolute bottom-0 left-8 pointer-events-none"
        style={{ opacity: 0.10 }}>
        <Gunungan height={160} flip opacity={1} />
      </div>

      {/* Content — rata kiri, bukan tengah */}
      <div className="relative z-10 flex flex-col justify-end min-h-screen px-8 pb-14 pt-20">

        {/* Keterangan atas */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-6 h-px" style={{ background: C.copper }}/>
          <span className="text-[9px] tracking-[0.5em] uppercase"
            style={{ color: C.copper,
              fontFamily: "'Palatino Linotype', Palatino, Georgia, serif" }}>
            Undangan Pernikahan
          </span>
        </div>

        {/* Nama — sangat besar, flush left */}
        <div className="flex flex-col gap-0 mb-6">
          <span className="leading-[0.88] font-display"
            style={{ fontSize: 'clamp(3.8rem,16vw,5.5rem)',
              color: C.cream, fontStyle: 'italic', fontWeight: 300,
              fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif",
              letterSpacing: '-0.01em' }}>
            {w.nama.split(' ')[0]}
          </span>
          {/* Pembatas diagonal */}
          <div className="flex items-center gap-3 my-2">
            <div className="h-px flex-1"
              style={{ background: `linear-gradient(90deg, ${C.copper}, transparent)`, maxWidth: 80 }}/>
            <span style={{ color: C.copper, fontSize: '1.4rem',
              fontFamily: "'Palatino Linotype', Palatino, Georgia, serif",
              fontStyle: 'italic' }}>&amp;</span>
          </div>
          <span className="leading-[0.88] font-display"
            style={{ fontSize: 'clamp(3.8rem,16vw,5.5rem)',
              color: C.cream, fontStyle: 'italic', fontWeight: 300,
              fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif",
              letterSpacing: '-0.01em', paddingLeft: '1.5rem' }}>
            {p.nama.split(' ')[0]}
          </span>
        </div>

        {/* Tanggal + lokasi */}
        <div className="flex flex-col gap-1.5 pl-1">
          <p className="text-[11px] tracking-[0.35em] uppercase"
            style={{ color: C.textMuted,
              fontFamily: "'Palatino Linotype', Palatino, Georgia, serif" }}>
            {data.resepsi.tanggal}
          </p>
          <p className="text-[12px]" style={{ color: C.textSoft,
            fontFamily: "'Palatino Linotype', Palatino, Georgia, serif",
            fontStyle: 'italic' }}>
            {data.resepsi.venue}
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 right-8 flex flex-col items-center gap-1.5"
          style={{ animation: 'jnFloat 2.5s ease-in-out infinite' }}>
          <svg width="1" height="40" viewBox="0 0 1 40">
            <line x1="0.5" y1="0" x2="0.5" y2="40"
              stroke={C.copper} strokeWidth="1" opacity="0.5"
              strokeDasharray="3 4"
              style={{ animation: 'jnDash 2s linear infinite' }}/>
          </svg>
          <div className="w-1.5 h-1.5 rotate-45" style={{ background: C.copper, opacity: 0.5 }}/>
        </div>
      </div>

      <style>{`
        @font-face { font-family: 'font-display'; }
        @keyframes jnFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        @keyframes jnReveal{ from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes jnDash  { to{ stroke-dashoffset: -14 } }
      `}</style>
    </section>
  );
}

function SectionOpening() {
  return (
    <section className="reveal relative px-8 py-16 overflow-hidden"
      style={{ background: C.bgWarm }}>
      <KawungGrid opacity={0.06} />
      <div className="relative z-10 max-w-[300px] mx-auto flex flex-col gap-5">
        {/* Aksara pembuka — offset kiri */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-px mt-3 shrink-0" style={{ background: C.copper }}/>
          <p className="text-[11px] tracking-[0.3em] uppercase"
            style={{ color: C.copper,
              fontFamily: "'Palatino Linotype', Palatino, Georgia, serif" }}>
            Bismillahirrahmanirrahim
          </p>
        </div>

        <p className="font-display italic text-[1.05rem] font-light leading-[1.7]"
          style={{ color: C.text,
            fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif",
            paddingLeft: '2.2rem' }}>
          "Lan saka pratanda-pratanda kasekten-Ing, Dheweke nitahake kanggo sira pasangan saka jenismu dhewe, supaya sira tentrem."
        </p>

        <p className="text-[11px] tracking-widest italic"
          style={{ color: C.textMuted, paddingLeft: '2.2rem',
            fontFamily: "'Palatino Linotype', Palatino, Georgia, serif" }}>
          QS. Ar-Rum: 21
        </p>

        <div className="w-full h-px" style={{ background: `linear-gradient(90deg, ${C.brd}, transparent)` }}/>

        <p className="text-[12.5px] leading-relaxed"
          style={{ color: C.textSoft,
            fontFamily: "'Palatino Linotype', Palatino, Georgia, serif",
            fontStyle: 'italic', paddingLeft: '2.2rem' }}>
          Dengan segala kerendahan hati, kami memohon kehadiran dan doa restu Bapak/Ibu/Saudara/i.
        </p>
      </div>
    </section>
  );
}

function SectionMempelai({ data }) {
  const { mempelaiWanita: w, mempelaiPria: p } = data;

  return (
    <section className="reveal relative overflow-hidden px-8 py-16"
      style={{ background: C.bg }}>
      <ParangStripe opacity={0.05} />

      <div className="relative z-10 flex flex-col gap-10">
        <PrasastiDivider label="Mempelai" />

        {/* Wanita — rata kiri dengan photo offset */}
        <div className="flex items-start gap-5">
          <div className="shrink-0 mt-1" style={{ marginLeft: '-4px' }}>
            <PhotoPlaceholder foto={w.foto} alt={w.nama} size={88} />
          </div>
          <div className="flex flex-col gap-1.5 pt-1">
            <p className="text-[9px] tracking-[0.4em] uppercase"
              style={{ color: C.copper,
                fontFamily: "'Palatino Linotype', Palatino, Georgia, serif" }}>
              {w.anakKe}
            </p>
            <p className="font-display italic font-light"
              style={{ fontSize: '1.3rem', color: C.cream, lineHeight: 1.15,
                fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif" }}>
              {w.nama}
            </p>
            <p className="text-[11.5px] leading-relaxed"
              style={{ color: C.textSoft,
                fontFamily: "'Palatino Linotype', Palatino, Georgia, serif",
                fontStyle: 'italic' }}>
              Putri dari {w.namaAyah}<br />dan {w.namaIbu}
            </p>
          </div>
        </div>

        {/* Ampersand diagonal */}
        <div className="flex items-center gap-4 px-4">
          <div className="flex-1 h-px" style={{ background: C.brd }}/>
          <span style={{ color: C.copper, fontSize: '2.5rem',
            fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif",
            fontStyle: 'italic', lineHeight: 1 }}>&amp;</span>
          <div className="flex-1 h-px" style={{ background: C.brd }}/>
        </div>

        {/* Pria — rata kanan, mirror */}
        <div className="flex items-start gap-5 flex-row-reverse">
          <div className="shrink-0 mt-1" style={{ marginRight: '-4px' }}>
            <PhotoPlaceholder foto={p.foto} alt={p.nama} size={88} />
          </div>
          <div className="flex flex-col items-end gap-1.5 pt-1">
            <p className="text-[9px] tracking-[0.4em] uppercase"
              style={{ color: C.copper,
                fontFamily: "'Palatino Linotype', Palatino, Georgia, serif" }}>
              {p.anakKe}
            </p>
            <p className="font-display italic font-light text-right"
              style={{ fontSize: '1.3rem', color: C.cream, lineHeight: 1.15,
                fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif" }}>
              {p.nama}
            </p>
            <p className="text-[11.5px] leading-relaxed text-right"
              style={{ color: C.textSoft,
                fontFamily: "'Palatino Linotype', Palatino, Georgia, serif",
                fontStyle: 'italic' }}>
              Putra dari {p.namaAyah}<br />dan {p.namaIbu}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionAcara({ data }) {
  const events = [
    { label: 'Akad Nikah', num: 'I',  ...data.akad },
    { label: 'Resepsi',    num: 'II', ...data.resepsi },
  ];

  return (
    <section className="reveal relative px-8 py-16 overflow-hidden"
      style={{ background: C.bg }}>
      <ParangStripe opacity={0.05} />

      <div className="relative z-10 flex flex-col gap-7">
        <PrasastiDivider label="Rangkaian Acara" />

        {events.map((ev, i) => (
          <div key={i} className="relative">
            {/* Roman numeral watermark */}
            <span className="absolute -top-2 right-0 font-display italic pointer-events-none"
              style={{ fontSize: '4rem', color: C.cream, opacity: 0.04, lineHeight: 1,
                fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif" }}>
              {ev.num}
            </span>

            <div className="rounded-lg overflow-hidden"
              style={{ background: C.bgCard, border: `1px solid ${C.brd}` }}>
              {/* Header */}
              <div className="px-5 py-3 flex items-center gap-3"
                style={{ borderBottom: `1px solid ${C.brd}`,
                  background: `linear-gradient(90deg, rgba(184,114,42,0.12), transparent)` }}>
                <div className="w-0.5 h-4 rounded-full" style={{ background: C.copper }}/>
                <p className="text-[11px] tracking-[0.3em] uppercase font-medium"
                  style={{ color: C.copper,
                    fontFamily: "'Palatino Linotype', Palatino, Georgia, serif" }}>
                  {ev.label}
                </p>
              </div>

              <div className="px-5 py-5 flex flex-col gap-3">
                {[
                  { svg: <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>, text: ev.tanggal },
                  { svg: <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,                                 text: `${ev.waktu} – ${ev.selesai}` },
                ].map(({ svg, text }, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke={C.copper} strokeWidth="1.5" className="shrink-0">
                      {svg}
                    </svg>
                    <span className="text-[12.5px] italic"
                      style={{ color: C.textSoft,
                        fontFamily: "'Palatino Linotype', Palatino, Georgia, serif" }}>
                      {text}
                    </span>
                  </div>
                ))}

                <div className="flex items-start gap-3">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                    stroke={C.copper} strokeWidth="1.5" className="shrink-0 mt-0.5">
                    <path d="M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z"/>
                    <circle cx="12" cy="9" r="3"/>
                  </svg>
                  <div>
                    <p className="text-[13px] font-medium"
                      style={{ color: C.cream,
                        fontFamily: "'Palatino Linotype', Palatino, Georgia, serif" }}>
                      {ev.venue}
                    </p>
                    <p className="text-[11px] italic mt-0.5"
                      style={{ color: C.textMuted,
                        fontFamily: "'Palatino Linotype', Palatino, Georgia, serif" }}>
                      {ev.alamat}
                    </p>
                  </div>
                </div>

                <a href={ev.mapsUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 rounded text-[11px] tracking-[0.2em] uppercase font-medium transition-opacity hover:opacity-75"
                  style={{ background: 'transparent', border: `1px solid ${C.brd}`,
                    color: C.copper, fontFamily: "'Palatino Linotype', Palatino, Georgia, serif" }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 11l19-9-9 19-2-8-8-2z"/>
                  </svg>
                  Petunjuk Arah
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionGaleri({ data }) {
  const photos = (data.galeri || []).slice(0, 6);
  /* Mosaic layout: 1 besar kiri atas, 2 kecil kanan, 3 bawah */
  return (
    <section className="reveal relative px-6 py-14 overflow-hidden"
      style={{ background: C.bgWarm }}>
      <KawungGrid opacity={0.06} />
      <div className="relative z-10 flex flex-col gap-6">
        <PrasastiDivider label="Galeri" />

        {/* Mosaic grid */}
        <div className="grid grid-cols-3 gap-1.5" style={{ gridTemplateRows: 'auto auto' }}>
          {photos.map((src, i) => {
            const isFeature = i === 0;
            return (
              <div key={i}
                className={`${isFeature ? 'col-span-2 row-span-2' : ''} overflow-hidden`}
                style={{ aspectRatio: '1/1',
                  background: C.creamMuted,
                  border: `1px solid ${C.brd}`,
                  clipPath: isFeature ? 'none' : 'none' }}>
                {src ? (
                  <img src={src} alt={`Galeri ${i+1}`} className="w-full h-full object-cover"/>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                      stroke={C.copper} strokeWidth="0.8" opacity="0.35">
                      <rect x="3" y="3" width="18" height="18" rx="1"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <path d="M21 15l-5-5L5 21"/>
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
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
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${C.brd}`,
    borderRadius: 0,
    color: C.cream,
    padding: '0.5rem 0',
    fontSize: '13px',
    outline: 'none',
    width: '100%',
    fontFamily: "'Palatino Linotype', Palatino, Georgia, serif",
    fontStyle: 'italic',
  };

  return (
    <section className="reveal relative px-8 py-16 overflow-hidden"
      style={{ background: C.bg }}>
      <ParangStripe opacity={0.05} />
      <div className="relative z-10 flex flex-col gap-6">
        <PrasastiDivider label="Konfirmasi Hadir" />

        {submitted ? (
          <div className="py-10 flex flex-col items-center gap-3">
            <Gunungan height={80} opacity={0.5} />
            <p className="font-display italic text-lg text-center"
              style={{ color: C.cream,
                fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif" }}>
              Matur nuwun, {name}
            </p>
            <p className="text-sm text-center italic"
              style={{ color: C.textSoft,
                fontFamily: "'Palatino Linotype', Palatino, Georgia, serif" }}>
              Kehadiran Anda adalah kebahagiaan kami.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input style={inp} placeholder="Asma panjenengan…"
              value={name} onChange={e => setName(e.target.value)} required/>
            <select style={{ ...inp, appearance: 'none' }}
              value={attend} onChange={e => setAttend(e.target.value)} required>
              <option value="">Konfirmasi kehadiran…</option>
              <option value="hadir">Insya Allah hadir</option>
              <option value="tidak">Mohon maaf tidak dapat hadir</option>
            </select>
            {attend === 'hadir' && (
              <input style={inp} type="number" min="1" max="5"
                placeholder="Jumlah tamu" value={guests}
                onChange={e => setGuests(e.target.value)}/>
            )}
            <textarea style={{ ...inp, resize: 'none', height: '72px' }}
              placeholder="Ucapan & doa…"
              value={msg} onChange={e => setMsg(e.target.value)}/>
            <button type="submit"
              className="py-3 text-sm tracking-[0.3em] uppercase transition-opacity hover:opacity-80"
              style={{ background: 'transparent',
                border: `1px solid ${C.brdLt}`,
                color: C.cream,
                fontFamily: "'Palatino Linotype', Palatino, Georgia, serif",
                letterSpacing: '0.3em' }}>
              Kirimkan
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
    <section className="reveal relative px-8 py-16 overflow-hidden"
      style={{ background: C.bgWarm }}>
      <KawungGrid opacity={0.06} />
      <div className="relative z-10 flex flex-col gap-6">
        <PrasastiDivider label="Amplop Digital" />
        <p className="text-[12px] italic text-center"
          style={{ color: C.textSoft,
            fontFamily: "'Palatino Linotype', Palatino, Georgia, serif" }}>
          Doa Anda adalah karunia terbesar. Bagi yang berkenan mengirimkan tanda kasih:
        </p>

        {(data.rekeningList || []).map((rek, i) => (
          <div key={i} className="relative"
            style={{ background: C.bgCard, border: `1px solid ${C.brd}`, borderRadius: '8px' }}>
            {/* Left copper accent bar */}
            <div className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full"
              style={{ background: `linear-gradient(180deg, transparent, ${C.copper}, transparent)` }}/>

            <div className="pl-5 pr-4 py-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase mb-1"
                  style={{ color: C.copper,
                    fontFamily: "'Palatino Linotype', Palatino, Georgia, serif" }}>
                  {rek.bank}
                </p>
                <p className="font-mono text-base font-medium" style={{ color: C.cream }}>{rek.norek}</p>
                <p className="text-[11px] italic mt-0.5"
                  style={{ color: C.textMuted,
                    fontFamily: "'Palatino Linotype', Palatino, Georgia, serif" }}>
                  a.n. {rek.atasNama}
                </p>
              </div>
              <button onClick={() => copy(rek.norek, i)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs transition-all hover:opacity-75"
                style={{ border: `1px solid ${C.brd}`, color: C.copper,
                  background: copied === i ? C.creamMuted : 'transparent',
                  fontFamily: "'Palatino Linotype', Palatino, Georgia, serif" }}>
                {copied === i ? 'Disalin ✓' : 'Salin'}
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
    <section className="relative px-8 py-20 overflow-hidden"
      style={{ background: C.bg }}>
      <ParangStripe opacity={0.07} />

      {/* Gunungan pair — simetris di closing */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none flex items-end">
        <Gunungan height={200} flip opacity={0.12} />
      </div>

      {/* Right copper bar */}
      <div className="absolute right-0 top-0 bottom-0 w-[3px]"
        style={{ background: `linear-gradient(180deg, transparent, ${C.copper}, transparent)` }}/>

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <PrasastiDivider />

        <p className="font-display italic font-light"
          style={{ fontSize: 'clamp(2rem,10vw,3rem)', color: C.cream,
            fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif",
            lineHeight: 1.1 }}>
          Matur Nuwun
        </p>

        <p className="text-[11px] tracking-[0.35em] uppercase"
          style={{ color: C.copper,
            fontFamily: "'Palatino Linotype', Palatino, Georgia, serif" }}>
          {w} &amp; {p}
        </p>

        <p className="text-[12px] italic leading-relaxed max-w-[260px]"
          style={{ color: C.textSoft,
            fontFamily: "'Palatino Linotype', Palatino, Georgia, serif" }}>
          Atas doa dan kehadiran Bapak/Ibu/Saudara/i, kami ucapkan terima kasih yang sebesar-besarnya.
        </p>

        <PrasastiDivider />
        <p className="text-[9px] tracking-[0.3em] uppercase mt-2"
          style={{ color: C.textMuted }}>Made with Undigo ◆</p>
      </div>
    </section>
  );
}

/* ── MAIN COMPONENT ───────────────────────────────────────── */
export default function JavaneseGold({ weddingData }) {
  const data = { ...DEFAULT_DATA, ...weddingData };
  useReveal();

  return (
    <div className="relative w-full overflow-x-hidden"
      style={{ background: C.bg, color: C.text, minHeight: '100vh' }}>
      <AudioPlayer url={data.musikUrl} />
      <SectionCover     data={data} />
      <SectionOpening />
      <SectionMempelai  data={data} />
      <JantraCountdown  data={data} />
      <SectionAcara     data={data} />
      <SectionGaleri    data={data} />
      <SectionRSVP />
      <SectionAmplop    data={data} />
      <SectionClosing   data={data} />
    </div>
  );
}
