/**
 * JAVANESE GOLD — Template Undangan Pernikahan
 * ─────────────────────────────────────────────
 * Props (semua opsional, ada default nilai demo):
 *
 *   weddingData = {
 *     mempelaiPria:    { nama, namaAyah, namaIbu, anakKe, foto: '/assets/...' }
 *     mempelaiWanita:  { nama, namaAyah, namaIbu, anakKe, foto: '/assets/...' }
 *     akad:   { tanggal, waktu, selesai, venue, alamat, mapsUrl }
 *     resepsi:{ tanggal, waktu, selesai, venue, alamat, mapsUrl }
 *     targetDate: 'YYYY-MM-DDTHH:mm:ss'   ← untuk countdown
 *     galeri: ['/assets/...', ...] max 4
 *     rekeningList: [{ bank, norek, atasNama }, ...]
 *     musikUrl: '/assets/...'
 *   }
 *
 * Penggunaan di PreviewPage / halaman undangan aktif:
 *   import JavaneseGold from '../templates/JavaneseGold/JavaneseGold';
 *   <JavaneseGold weddingData={data} />
 *
 * Asset yang dibutuhkan (taruh di /public/assets/templates/javanese-gold/):
 *   gunungan.png        ← wayang gunungan/kayon, transparan, warna gelap/emas
 *   batik-kawung.png    ← seamless tile motif kawung untuk background
 *   ornamen-parang.svg  ← border divider motif parang (opsional)
 *   bunga-melati.png    ← rangkaian melati sudut (opsional)
 */

import { useState, useEffect, useRef } from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import { useReveal }    from '../../hooks/useReveal';
import './JavaneseGold.css';

/* ── DATA DEFAULT (demo/preview) ─────────────────────────── */
const DEFAULT_DATA = {
  mempelaiWanita: {
    nama:    'Dewi Ayu Pertiwi',
    namaAyah:'H. Suharto',
    namaIbu: 'Hj. Sri Mulyani',
    anakKe:  'Putri ketiga',
    foto:    '/assets/templates/javanese-gold/foto-wanita.jpg',
  },
  mempelaiPria: {
    nama:    'Arjuna Wibisono',
    namaAyah:'Bambang Utomo',
    namaIbu: 'Retno Wulandari',
    anakKe:  'Putra pertama',
    foto:    '/assets/templates/javanese-gold/foto-pria.jpg',
  },
  akad: {
    tanggal: 'Sabtu, 14 Juni 2025',
    waktu:   '08.00',
    selesai: 'selesai',
    venue:   'Masjid Agung Al-Azhar',
    alamat:  'Jl. Sisingamangaraja, Kebayoran Baru, Jakarta Selatan',
    mapsUrl: 'https://maps.google.com',
  },
  resepsi: {
    tanggal: 'Sabtu, 14 Juni 2025',
    waktu:   '11.00',
    selesai: '15.00 WIB',
    venue:   'Gedung Sasana Kriya TMII',
    alamat:  'Jl. Raya Taman Mini Indonesia Indah, Jakarta Timur 13560',
    mapsUrl: 'https://maps.google.com',
  },
  targetDate: '2025-06-14T08:00:00',
  galeri: [
    '/assets/templates/javanese-gold/galeri-1.jpg',
    '/assets/templates/javanese-gold/galeri-2.jpg',
    '/assets/templates/javanese-gold/galeri-3.jpg',
    '/assets/templates/javanese-gold/galeri-4.jpg',
  ],
  rekeningList: [
    { bank: 'BCA',     norek: '1234 5678 90', atasNama: 'Dewi Ayu Pertiwi' },
    { bank: 'Mandiri', norek: '0987 6543 21', atasNama: 'Arjuna Wibisono'  },
  ],
  musikUrl: '/assets/templates/javanese-gold/musik.mp3',
};

/* ── UCAPAN DEMO ─────────────────────────────────────────── */
const DEMO_UCAPAN = [
  { nama: 'Siti Rahayu',    hadir: 'hadir',  pesan: 'Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Barakallahu lakuma.' },
  { nama: 'Budi & Keluarga',hadir: 'hadir',  pesan: 'Selamat menempuh hidup baru. Semoga selalu dalam lindungan-Nya dan berbahagia selamanya.' },
  { nama: 'Anisa Maharani', hadir: 'ragu',   pesan: 'Doa terbaik untuk kalian berdua. Semoga rumah tangganya penuh berkah.' },
];

/* ── HELPERS ─────────────────────────────────────────────── */
function Sep({ ornamen }) {
  return (
    <div className="jg-sep">
      <div className="jg-sep-line" />
      {ornamen
        ? <img src={ornamen} alt="" className="jg-sep-img" />
        : <div className="jg-sep-center" />
      }
      <div className="jg-sep-line" />
    </div>
  );
}

function HadirLabel({ hadir }) {
  const map = { hadir: 'Hadir', ragu: 'Mungkin Hadir', tidak: 'Berhalangan' };
  return <span className="jg-ucapan-badge">{map[hadir] ?? hadir}</span>;
}

/* ── KOMPONEN UTAMA ──────────────────────────────────────── */
export default function JavaneseGold({ weddingData }) {
  const data     = { ...DEFAULT_DATA, ...weddingData };
  const countdown = useCountdown(data.targetDate);
  useReveal();

  /* state RSVP */
  const [rsvpNama,   setRsvpNama]   = useState('');
  const [rsvpJumlah, setRsvpJumlah] = useState('1 orang');
  const [rsvpHadir,  setRsvpHadir]  = useState(null);
  const [rsvpPesan,  setRsvpPesan]  = useState('');
  const [submitted,  setSubmitted]  = useState(false);
  const [ucapanList, setUcapanList] = useState(DEMO_UCAPAN);

  /* state musik */
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!data.musikUrl) return;
    audioRef.current = new Audio(data.musikUrl);
    audioRef.current.loop = true;
    return () => audioRef.current?.pause();
  }, [data.musikUrl]);

  function toggleMusik() {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); }
    else         { audioRef.current.play().catch(() => {}); }
    setPlaying(p => !p);
  }

  /* kirim RSVP */
  function handleRsvpSubmit() {
    if (!rsvpNama.trim()) { alert('Mohon isi nama Anda'); return; }
    if (rsvpPesan.trim()) {
      setUcapanList(prev => [
        { nama: rsvpNama.trim(), hadir: rsvpHadir ?? 'hadir', pesan: rsvpPesan.trim() },
        ...prev,
      ]);
    }
    setSubmitted(true);
  }

  /* copy nomor rekening */
  function copyNorek(norek, btn) {
    navigator.clipboard.writeText(norek.replace(/\s/g, '')).then(() => {
      const orig = btn.textContent;
      btn.textContent = '✓ Tersalin';
      setTimeout(() => { btn.textContent = orig; }, 2000);
    });
  }

  const pad = n => String(n).padStart(2, '0');

  /* asset paths */
  const BASE = '/assets/templates/javanese-gold';

  return (
    <div className="jg-root">

      {/* ── 1. COVER ── */}
      <section className="jg-cover">
        <div className="jg-cover-bg" />
        <div className="jg-cover-glow" />

        <div className="jg-cover-content">
          {/* gunungan — asset dari Freepik */}
          <img
            src={`${BASE}/gunungan.png`}
            alt="Gunungan Wayang"
            className="jg-gunungan"
          />

          <div className="jg-cover-bismillah">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </div>

          <div className="jg-cover-ornament">
            <div className="jg-cover-ornament-line flip" />
            <div className="jg-cover-ornament-diamond" />
            <div className="jg-cover-ornament-line" />
          </div>

          <div className="jg-cover-label">Undangan Pernikahan</div>

          <div className="jg-cover-names">
            {data.mempelaiWanita.nama.split(' ')[0]}
            <span className="jg-cover-ampersand">&amp;</span>
            {data.mempelaiPria.nama.split(' ')[0]}
          </div>

          <div className="jg-cover-ornament" style={{ marginTop: 20 }}>
            <div className="jg-cover-ornament-line flip" />
            <div className="jg-cover-ornament-diamond" />
            <div className="jg-cover-ornament-line" />
          </div>

          <div className="jg-cover-date">{data.akad.tanggal}</div>
        </div>

        <div className="jg-cover-scroll">
          <span>Buka Undangan</span>
          <div className="jg-cover-scroll-arrow" />
        </div>
      </section>

      {/* ── 2. MEMPELAI ── */}
      <section className="jg-couple-section">
        <div className="jg-inner">
          <Sep />
          <span className="jg-label reveal">— Yang Berbahagia —</span>
          <h2 className="jg-heading reveal reveal-d1">Mempelai <em>Kami</em></h2>
        </div>

        <div className="jg-couple-grid reveal reveal-d2">
          {/* wanita */}
          <div className="jg-person">
            <div className="jg-person-photo">
              {/* foto-wanita.jpg — 1 foto portrait, cari di Unsplash/Pexels */}
              <img src={data.mempelaiWanita.foto} alt={data.mempelaiWanita.nama} />
            </div>
            <div className="jg-person-name">{data.mempelaiWanita.nama}</div>
            <div className="jg-person-parents">
              {data.mempelaiWanita.anakKe} dari<br />
              Bpk. {data.mempelaiWanita.namaAyah}<br />
              &amp; Ibu {data.mempelaiWanita.namaIbu}
            </div>
          </div>

          <div className="jg-couple-and">&amp;</div>

          {/* pria */}
          <div className="jg-person">
            <div className="jg-person-photo">
              {/* foto-pria.jpg — 1 foto portrait, cari di Unsplash/Pexels */}
              <img src={data.mempelaiPria.foto} alt={data.mempelaiPria.nama} />
            </div>
            <div className="jg-person-name">{data.mempelaiPria.nama}</div>
            <div className="jg-person-parents">
              {data.mempelaiPria.anakKe} dari<br />
              Bpk. {data.mempelaiPria.namaAyah}<br />
              &amp; Ibu {data.mempelaiPria.namaIbu}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. COUNTDOWN ── */}
      <section className="jg-countdown-section">
        <div className="jg-inner">
          <Sep />
          <span className="jg-label reveal">— Menghitung Hari —</span>
          <h2 className="jg-heading reveal reveal-d1">Menuju Hari <em>Bahagia</em></h2>
        </div>

        <div className="jg-countdown-grid reveal reveal-d2">
          {[
            { num: pad(countdown.d), label: 'Hari'   },
            { num: pad(countdown.h), label: 'Jam'    },
            { num: pad(countdown.m), label: 'Menit'  },
            { num: pad(countdown.s), label: 'Detik'  },
          ].map(({ num, label }) => (
            <div className="jg-countdown-box" key={label}>
              <span className="jg-countdown-num">{num}</span>
              <span className="jg-countdown-label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. DETAIL ACARA ── */}
      <section className="jg-acara-section">
        <div className="jg-inner">
          <Sep />
          <span className="jg-label reveal">— Rangkaian Acara —</span>
          <h2 className="jg-heading reveal reveal-d1">Detail <em>Pernikahan</em></h2>
        </div>

        <div className="jg-acara-grid reveal reveal-d2">
          {/* Akad */}
          <div className="jg-acara-card">
            {/* icon-akad.png — opsional, bisa masjid atau ornamen islami dari Freepik */}
            <img src={`${BASE}/icon-akad.png`} alt="" className="jg-acara-icon" />
            <span className="jg-acara-type">Akad Nikah</span>
            <span className="jg-acara-time">{data.akad.waktu}</span>
            <div className="jg-acara-date">
              {data.akad.tanggal}<br />WIB — {data.akad.selesai}
            </div>
            <div className="jg-acara-divider" />
            <div className="jg-acara-venue">
              {data.akad.venue}<br />{data.akad.alamat}
            </div>
          </div>

          {/* Resepsi */}
          <div className="jg-acara-card">
            {/* icon-resepsi.png — gedung / balai dari Freepik */}
            <img src={`${BASE}/icon-resepsi.png`} alt="" className="jg-acara-icon" />
            <span className="jg-acara-type">Resepsi</span>
            <span className="jg-acara-time">{data.resepsi.waktu}</span>
            <div className="jg-acara-date">
              {data.resepsi.tanggal}<br />s.d. {data.resepsi.selesai}
            </div>
            <div className="jg-acara-divider" />
            <div className="jg-acara-venue">
              {data.resepsi.venue}<br />{data.resepsi.alamat}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. LOKASI ── */}
      <section className="jg-map-section">
        <div className="jg-inner">
          <Sep />
          <span className="jg-label reveal">— Petunjuk Arah —</span>
          <h2 className="jg-heading reveal reveal-d1">Lokasi <em>Acara</em></h2>
        </div>

        <div className="jg-map-embed reveal reveal-d2">
          {/*
            Ganti src iframe di bawah ini dengan embed Google Maps venue resepsi.
            Cara: Google Maps → Bagikan → Sematkan peta → salin URL src iframe-nya
          */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194820395512233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sTaman%20Mini%20Indonesia%20Indah!5e0!3m2!1sid!2sid!4v1700000000000"
            title="Lokasi Resepsi"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="jg-map-overlay" />
          <div className="jg-map-address">
            <div className="jg-map-address-text">
              {data.resepsi.venue}<br />
              {data.resepsi.alamat}
            </div>
            <button
              className="jg-map-btn"
              onClick={() => window.open(data.resepsi.mapsUrl, '_blank')}
            >
              Buka Maps
            </button>
          </div>
        </div>
      </section>

      {/* ── 6. LOVE STORY ── */}
      <section className="jg-story-section">
        <div className="jg-inner">
          <Sep />
          <span className="jg-label reveal">— Perjalanan Cinta —</span>
          <h2 className="jg-heading reveal reveal-d1">Kisah <em>Kami</em></h2>
        </div>

        <div className="jg-story-timeline">
          {[
            { year: '2019', side: 'right', text: 'Pertama kali bertemu di acara seminar budaya Jawa di Yogyakarta. Satu tatapan yang mengubah segalanya.' },
            { year: '2021', side: 'left',  text: 'Dua tahun berteman, rasa itu tumbuh perlahan. Arjuna memberanikan diri mengungkapkan perasaan di tepi Prambanan.' },
            { year: '2023', side: 'right', text: 'Lamaran sederhana di rumah keluarga, dikelilingi orang-orang terkasih. Jawabannya adalah "iya" yang paling indah.' },
            { year: '2025', side: 'left',  text: 'Kini saatnya menyempurnakan separuh agama, bersama, selamanya.' },
          ].map((item, i) => (
            <div
              className={`jg-story-item reveal reveal-d${(i % 3) + 1}`}
              key={item.year}
            >
              {item.side === 'right' ? (
                <>
                  <div className={`jg-story-content right`}>
                    <span className="jg-story-year">{item.year}</span>
                    <div className="jg-story-text">{item.text}</div>
                  </div>
                  <div className="jg-story-dot" />
                  <div />
                </>
              ) : (
                <>
                  <div />
                  <div className="jg-story-dot" />
                  <div className="jg-story-content left">
                    <span className="jg-story-year">{item.year}</span>
                    <div className="jg-story-text">{item.text}</div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. GALERI ── */}
      <section className="jg-gallery-section">
        <div className="jg-inner">
          <Sep />
          <span className="jg-label reveal">— Momen Kami —</span>
          <h2 className="jg-heading reveal reveal-d1">Galeri <em>Foto</em></h2>
        </div>

        {/*
          FOTO YANG DIBUTUHKAN (cari di Unsplash/Pexels — legal untuk komersial):
          galeri-1.jpg  → foto portrait/berdiri (ratio ~2:3), PENTING karena span 2 baris
          galeri-2.jpg  → foto landscape/horizontal (ratio ~16:9)
          galeri-3.jpg  → foto square bebas
          galeri-4.jpg  → foto square bebas
          Keyword cari: "indonesian couple prewedding batik" atau "javanese wedding couple"
        */}
        <div className="jg-gallery-grid reveal reveal-d2">
          <div className="jg-gallery-slot jg-photo-1">
            <img src={data.galeri[0]} alt="Foto 1" />
            <div className="jg-gallery-placeholder">
              <span>Foto 1</span>
            </div>
          </div>
          <div className="jg-gallery-slot jg-photo-2">
            <img src={data.galeri[1]} alt="Foto 2" />
            <div className="jg-gallery-placeholder">
              <span>Foto 2</span>
            </div>
          </div>
          <div className="jg-gallery-slot jg-photo-3">
            <img src={data.galeri[2]} alt="Foto 3" />
            <div className="jg-gallery-placeholder">
              <span>Foto 3</span>
            </div>
          </div>
          <div className="jg-gallery-slot jg-photo-4">
            <img src={data.galeri[3]} alt="Foto 4" />
            <div className="jg-gallery-placeholder">
              <span>Foto 4</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. AMPLOP DIGITAL ── */}
      <section className="jg-amplop-section">
        <div className="jg-inner">
          <Sep />
          <span className="jg-label reveal">— Hadiah —</span>
          <h2 className="jg-heading reveal reveal-d1">Amplop <em>Digital</em></h2>
          <p className="jg-body reveal reveal-d2" style={{ marginTop: 12, maxWidth: 380, margin: '12px auto 0' }}>
            Doa dan kehadiran Anda adalah anugerah terbesar bagi kami. Namun bila ingin memberikan hadiah, berikut informasinya.
          </p>
        </div>

        <div className="jg-amplop-grid reveal reveal-d3">
          {data.rekeningList.map((rek) => (
            <div className="jg-amplop-card" key={rek.norek}>
              <span className="jg-amplop-type">Transfer Bank</span>
              <span className="jg-amplop-bank">{rek.bank}</span>
              <span className="jg-amplop-norek">{rek.norek}</span>
              <span className="jg-amplop-atas">a.n. {rek.atasNama}</span>
              <button
                className="jg-amplop-copy"
                onClick={e => copyNorek(rek.norek, e.currentTarget)}
              >
                Salin Nomor
              </button>
            </div>
          ))}

          {/* QRIS — taruh gambar QR di file qris.png */}
          <div className="jg-amplop-card">
            <span className="jg-amplop-type">QRIS</span>
            <span className="jg-amplop-bank">Scan QRIS</span>
            <img
              src={`${BASE}/qris.png`}
              alt="QRIS"
              style={{ width: 80, height: 80, margin: '8px auto', display: 'block', opacity: 0.6 }}
            />
            <span className="jg-amplop-atas">GoPay · OVO · Dana · ShopeePay</span>
          </div>
        </div>
      </section>

      {/* ── 9. RSVP ── */}
      <section className="jg-rsvp-section">
        <div className="jg-inner">
          <Sep />
          <span className="jg-label reveal">— Konfirmasi Kehadiran —</span>
          <h2 className="jg-heading reveal reveal-d1">RSVP</h2>
          <p className="jg-body reveal reveal-d2" style={{ marginTop: 12 }}>
            Mohon konfirmasi paling lambat 7 Juni 2025 agar kami dapat mempersiapkan segalanya dengan baik.
          </p>
        </div>

        <div className="jg-rsvp-form reveal reveal-d3">
          {!submitted ? (
            <>
              <div className="jg-field">
                <label>Nama Lengkap</label>
                <input
                  type="text"
                  placeholder="Masukkan nama Anda"
                  value={rsvpNama}
                  onChange={e => setRsvpNama(e.target.value)}
                />
              </div>

              <div className="jg-field">
                <label>Konfirmasi Kehadiran</label>
                <div className="jg-hadir-group">
                  {[
                    { val: 'hadir',  label: '✓  Hadir'       },
                    { val: 'ragu',   label: '?  Mungkin'      },
                    { val: 'tidak',  label: '✕  Berhalangan'  },
                  ].map(({ val, label }) => (
                    <button
                      key={val}
                      className={`jg-hadir-btn${rsvpHadir === val ? ' active' : ''}`}
                      onClick={() => setRsvpHadir(val)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="jg-field">
                <label>Jumlah Tamu</label>
                <select value={rsvpJumlah} onChange={e => setRsvpJumlah(e.target.value)}>
                  {['1 orang','2 orang','3 orang','4 orang','5+ orang'].map(o => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div className="jg-field">
                <label>Ucapan &amp; Doa</label>
                <textarea
                  placeholder="Tuliskan ucapan dan doa untuk kedua mempelai…"
                  value={rsvpPesan}
                  onChange={e => setRsvpPesan(e.target.value)}
                />
              </div>

              <button className="jg-rsvp-submit" onClick={handleRsvpSubmit}>
                Kirim Konfirmasi
              </button>
            </>
          ) : (
            <div className="jg-rsvp-success show">
              <div className="jg-rsvp-success-title">Terima kasih, {rsvpNama}</div>
              <div className="jg-rsvp-success-sub">Kami sangat menantikan kehadiran Anda</div>
            </div>
          )}
        </div>
      </section>

      {/* ── 10. UCAPAN TAMU ── */}
      <section className="jg-ucapan-section">
        <div className="jg-inner">
          <Sep />
          <span className="jg-label reveal">— Doa &amp; Ucapan —</span>
          <h2 className="jg-heading reveal reveal-d1">Pesan <em>Tamu</em></h2>
        </div>

        <div className="jg-ucapan-list">
          {ucapanList.map((u, i) => (
            <div className={`jg-ucapan-item reveal reveal-d${(i % 3) + 1}`} key={i}>
              <div className="jg-ucapan-name">{u.nama}</div>
              <HadirLabel hadir={u.hadir} />
              <div className="jg-ucapan-pesan">"{u.pesan}"</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 11. PENUTUP ── */}
      <section className="jg-closing-section">
        <div className="jg-sep" style={{ marginBottom: 48 }}>
          <div className="jg-sep-line" />
          <div className="jg-sep-center" />
          <div className="jg-sep-line" />
        </div>

        {/* gunungan kecil di penutup */}
        <img
          src={`${BASE}/gunungan.png`}
          alt=""
          className="jg-closing-gunungan"
        />

        <div className="jg-closing-ayat reveal">
          "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan
          untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya,
          dan Dia menjadikan di antaramu rasa kasih dan sayang."
        </div>
        <div className="jg-closing-source reveal reveal-d1">QS. Ar-Rum : 21</div>

        <div className="jg-sep" style={{ margin: '40px auto' }}>
          <div className="jg-sep-line" />
          <div className="jg-sep-center" />
          <div className="jg-sep-line" />
        </div>

        <div className="jg-closing-names reveal reveal-d2">
          {data.mempelaiWanita.nama.split(' ')[0]}
          {' & '}
          {data.mempelaiPria.nama.split(' ')[0]}
        </div>
        <div className="jg-closing-date reveal reveal-d3">
          {data.akad.tanggal} · Jakarta
        </div>
      </section>

      {/* ── FLOATING: MUSIK ── */}
      {data.musikUrl && (
        <button
          className={`jg-music-btn${playing ? ' playing' : ''}`}
          onClick={toggleMusik}
          title={playing ? 'Pause musik' : 'Play musik'}
        >
          {playing ? '♬' : '♪'}
        </button>
      )}

      {/* ── FLOATING: SHARE ── */}
      <div className="jg-share-bar">
        <button
          className="jg-share-btn"
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: 'Undangan Pernikahan', url: window.location.href });
            } else {
              navigator.clipboard.writeText(window.location.href);
              alert('Link berhasil disalin!');
            }
          }}
        >
          Bagikan
        </button>
      </div>

    </div>
  );
}
