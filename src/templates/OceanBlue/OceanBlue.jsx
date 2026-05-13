import { useState, useEffect, useRef } from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import './OceanBlue.css';

// ─── Default dummy data (akan diganti data dari backend nanti) ───
const DEFAULT_DATA = {
  groomName: 'Aditya',
  groomFullName: 'Aditya Maulana Putra',
  groomParents: 'Putra dari Bpk. Hendra & Ibu Wulandari',
  brideName: 'Keira',
  brideFullName: 'Keira Anindita Sari',
  brideParents: 'Putri dari Bpk. Faisal & Ibu Rahmawati',
  weddingDate: '2025-09-20',
  weddingDateDisplay: 'Sabtu, 20 September 2025',
  akadTime: '08.00 – 10.00 WIB',
  akadVenue: 'Masjid Al-Hikmah Kemang',
  akadAddress: 'Jl. Kemang Raya No. 17, Jakarta Selatan',
  akadMapsUrl: 'https://maps.google.com',
  resepsiTime: '11.00 – 14.00 WIB',
  resepsiVenue: 'The Ballroom at Kempinski',
  resepsiAddress: 'Jl. M.H. Thamrin No. 9, Jakarta Pusat',
  resepsiMapsUrl: 'https://maps.google.com',
  bankName: 'Bank BCA',
  bankNumber: '1234 5678 90',
  bankHolder: 'Keira Anindita Sari',
  bank2Name: 'Bank Mandiri',
  bank2Number: '0987 6543 21',
  bank2Holder: 'Aditya Maulana Putra',
  // Foto: ganti dengan path asset setelah tersedia
  coverPhoto: null,       // src/assets/ocean/cover-couple.jpg
  groomPhoto: null,       // src/assets/ocean/groom.jpg
  bridePhoto: null,       // src/assets/ocean/bride.jpg
  galleryPhotos: [null, null, null, null, null], // 5 foto galeri
};

const STORY = [
  { year: '2019', title: 'Pertama Bertemu', desc: 'Berjumpa di sebuah seminar desain di Jakarta. Satu pandang yang tak terlupakan.' },
  { year: '2021', title: 'Resmi Bersama', desc: 'Setelah dua tahun persahabatan yang dalam, keberanian itu akhirnya datang.' },
  { year: '2023', title: 'Lamaran', desc: 'Di tepi pantai Bali saat matahari terbenam, sebuah cincin dan sebuah "iya".' },
  { year: '2025', title: 'Akad Nikah', desc: 'Menyempurnakan separuh agama, bersama untuk selamanya.' },
];

// ─── Photo placeholder SVG ───
function PhotoIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );
}

// ─── Reveal hook — scoped to this component's root ref ───
function useObReveal(rootRef) {
  useEffect(() => {
    const container = rootRef?.current;
    if (!container) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    container.querySelectorAll('.ob-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [rootRef]);
}

export default function OceanBlue({ data = DEFAULT_DATA }) {
  const d = { ...DEFAULT_DATA, ...data };
  const countdown = useCountdown(d.weddingDate);
  const rootRef = useRef(null);
  useObReveal(rootRef);

  // RSVP state
  const [rsvpSent, setRsvpSent] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({ name: '', attend: 'hadir', guests: '1', message: '' });
  const [wishes, setWishes] = useState([]);
  const [copied, setCopied] = useState('');

  function handleRsvp() {
    if (!rsvpForm.name.trim()) return;
    setWishes(prev => [{ name: rsvpForm.name, text: rsvpForm.message, attend: rsvpForm.attend }, ...prev]);
    setRsvpSent(true);
  }

  function copyToClipboard(text, key) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(''), 2000);
    });
  }

  return (
    <div className="ob-invitation" ref={rootRef}>

      {/* ── 1. COVER ── */}
      <section className="ob-cover">
        <div className="ob-wave-bg" />
        <div className="ob-cover-orb ob-cover-orb-1" />
        <div className="ob-cover-orb ob-cover-orb-2" />

        <div className="ob-cover-inner">
          <p className="ob-bismillah">Bismillahirrahmanirrahim</p>

          <div className="ob-divider ob-reveal">
            <div className="ob-divider-line" />
            <div className="ob-divider-diamond" />
            <div className="ob-divider-line" />
          </div>

          <p className="ob-cover-announce ob-reveal ob-reveal-delay-1">
            We joyfully invite you to celebrate
          </p>

          <h1 className="ob-cover-names ob-reveal ob-reveal-delay-2">
            <em>{d.brideName}</em>
            <span className="ob-cover-ampersand">&</span>
            {d.groomName}
          </h1>

          {/* Cover photo */}
          <div className="ob-cover-photo ob-reveal ob-reveal-delay-3">
            {d.coverPhoto
              ? <img src={d.coverPhoto} alt="Couple" />
              : (
                <div className="ob-cover-photo-placeholder">
                  <PhotoIcon size={24} />
                  <span>cover photo</span>
                </div>
              )
            }
          </div>

          <p className="ob-cover-date ob-reveal ob-reveal-delay-4">
            ✦&nbsp;&nbsp;{d.weddingDateDisplay}&nbsp;&nbsp;✦
          </p>
        </div>

        <div className="ob-scroll-hint">
          <span>Scroll</span>
          <div className="ob-scroll-arrow" />
        </div>
      </section>

      {/* ── 2. OPENING QUOTE ── */}
      <section className="ob-quote-section">
        <span className="ob-quote-mark ob-reveal">"</span>
        <p className="ob-quote-text ob-reveal ob-reveal-delay-1">
          Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu istri-istri
          dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya.
        </p>
        <p className="ob-quote-source ob-reveal ob-reveal-delay-2">— QS. Ar-Rum : 21</p>
      </section>

      {/* ── 3. COUPLE ── */}
      <section className="ob-couple-section">
        <div className="ob-section-label ob-reveal">
          <span className="ob-section-eyebrow">The Happy Couple</span>
          <h2 className="ob-section-title">Mempelai <em>Kami</em></h2>
        </div>

        <div className="ob-couple-grid">
          {/* Bride */}
          <div className="ob-couple-person ob-reveal">
            <div className="ob-couple-photo-wrap">
              {d.bridePhoto
                ? <img src={d.bridePhoto} alt={d.brideName} />
                : <div className="ob-photo-placeholder"><PhotoIcon /><span>bride photo</span></div>
              }
            </div>
            <p className="ob-person-role">Mempelai Wanita</p>
            <h3 className="ob-person-name">{d.brideFullName}</h3>
            <p className="ob-person-parents">{d.brideParents}</p>
          </div>

          {/* Divider */}
          <div className="ob-couple-divider ob-reveal ob-reveal-delay-2">
            <div className="ob-couple-divider-line" />
            <span className="ob-ampersand-large">&</span>
            <div className="ob-couple-divider-line" />
          </div>

          {/* Groom */}
          <div className="ob-couple-person ob-reveal ob-reveal-delay-1">
            <div className="ob-couple-photo-wrap">
              {d.groomPhoto
                ? <img src={d.groomPhoto} alt={d.groomName} />
                : <div className="ob-photo-placeholder"><PhotoIcon /><span>groom photo</span></div>
              }
            </div>
            <p className="ob-person-role">Mempelai Pria</p>
            <h3 className="ob-person-name">{d.groomFullName}</h3>
            <p className="ob-person-parents">{d.groomParents}</p>
          </div>
        </div>
      </section>

      {/* ── 4. COUNTDOWN ── */}
      <section className="ob-countdown-section">
        <div className="ob-section-label ob-reveal">
          <span className="ob-section-eyebrow">Save the Date</span>
        </div>
        <h2 className="ob-countdown-heading ob-reveal ob-reveal-delay-1">
          Menuju Hari <em>Bahagia</em>
        </h2>

        <div className="ob-countdown-grid">
          {[
            { value: countdown.d, label: 'Hari' },
            { value: countdown.h, label: 'Jam' },
            { value: countdown.m, label: 'Menit' },
            { value: countdown.s, label: 'Detik' },
          ].map((unit, i) => (
            <div key={unit.label} style={{ display: 'contents' }}>
              {i > 0 && <div className="ob-countdown-colon">:</div>}
              <div className="ob-countdown-unit ob-reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="ob-countdown-number">
                  {String(unit.value).padStart(2, '0')}
                </div>
                <div className="ob-countdown-label">{unit.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. EVENTS ── */}
      <section className="ob-events-section">
        <div className="ob-section-label ob-reveal">
          <span className="ob-section-eyebrow">The Ceremony</span>
          <h2 className="ob-section-title">Detail <em>Acara</em></h2>
        </div>

        <div className="ob-events-grid">
          {/* Akad */}
          <div className="ob-event-card ob-reveal ob-reveal-delay-1">
            <div className="ob-event-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L3 7l9 5 9-5-9-5z"/><path d="M3 12l9 5 9-5"/><path d="M3 17l9 5 9-5"/>
              </svg>
            </div>
            <p className="ob-event-type">Akad Nikah</p>
            <h3 className="ob-event-name">Ijab Qabul</h3>
            <div className="ob-event-detail">
              <span>{d.weddingDateDisplay}</span>
              <strong>{d.akadTime}</strong>
              <span>{d.akadVenue}</span>
              <span>{d.akadAddress}</span>
            </div>
            <a href={d.akadMapsUrl} target="_blank" rel="noopener noreferrer" className="ob-event-maps-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              Buka Maps
            </a>
          </div>

          {/* Resepsi */}
          <div className="ob-event-card ob-reveal ob-reveal-delay-2">
            <div className="ob-event-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <p className="ob-event-type">Resepsi</p>
            <h3 className="ob-event-name">Walimatul 'Ursy</h3>
            <div className="ob-event-detail">
              <span>{d.weddingDateDisplay}</span>
              <strong>{d.resepsiTime}</strong>
              <span>{d.resepsiVenue}</span>
              <span>{d.resepsiAddress}</span>
            </div>
            <a href={d.resepsiMapsUrl} target="_blank" rel="noopener noreferrer" className="ob-event-maps-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              Buka Maps
            </a>
          </div>
        </div>
      </section>

      {/* ── 6. GALLERY ── */}
      <section className="ob-gallery-section">
        <div className="ob-section-label ob-reveal">
          <span className="ob-section-eyebrow">Our Moments</span>
          <h2 className="ob-section-title">Galeri <em>Foto</em></h2>
        </div>

        <div className="ob-gallery-grid ob-reveal ob-reveal-delay-1">
          {d.galleryPhotos.map((photo, i) => (
            <div className="ob-gallery-item" key={i}>
              {photo
                ? <img src={photo} alt={`Gallery ${i + 1}`} />
                : (
                  <div className="ob-gallery-placeholder">
                    <PhotoIcon size={20} />
                    <span>foto {i + 1}</span>
                  </div>
                )
              }
              <div className="ob-gallery-overlay" />
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. LOVE STORY ── */}
      <section className="ob-story-section">
        <div className="ob-section-label ob-reveal">
          <span className="ob-section-eyebrow">How It All Began</span>
          <h2 className="ob-section-title light">Kisah <em>Cinta Kami</em></h2>
        </div>

        <div className="ob-timeline">
          {STORY.map((item, i) => (
            <div className="ob-timeline-item ob-reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="ob-timeline-content">
                <p className="ob-timeline-year">{item.year}</p>
                <h3 className="ob-timeline-title">{item.title}</h3>
                <p className="ob-timeline-desc">{item.desc}</p>
              </div>
              <div className="ob-timeline-dot" />
              <div className="ob-timeline-empty" />
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. AMPLOP DIGITAL ── */}
      <section className="ob-envelope-section">
        <div className="ob-section-label ob-reveal">
          <span className="ob-section-eyebrow">Digital Envelope</span>
        </div>
        <h2 className="ob-envelope-heading ob-reveal ob-reveal-delay-1">Amplop <em>Digital</em></h2>
        <p className="ob-envelope-sub ob-reveal ob-reveal-delay-2">
          Doa restu Anda adalah hadiah terindah bagi kami.<br />
          Jika berkenan memberikan hadiah, berikut informasinya.
        </p>

        <div className="ob-bank-cards ob-reveal ob-reveal-delay-3">
          <div className="ob-bank-card">
            <p className="ob-bank-name">{d.bankName}</p>
            <p className="ob-bank-number">{d.bankNumber}</p>
            <p className="ob-bank-holder">a.n. {d.bankHolder}</p>
            <button
              className={`ob-copy-btn${copied === 'bank1' ? ' copied' : ''}`}
              onClick={() => copyToClipboard(d.bankNumber.replace(/\s/g, ''), 'bank1')}
            >
              {copied === 'bank1' ? '✓ Tersalin' : 'Salin Nomor'}
            </button>
          </div>
          <div className="ob-bank-card">
            <p className="ob-bank-name">{d.bank2Name}</p>
            <p className="ob-bank-number">{d.bank2Number}</p>
            <p className="ob-bank-holder">a.n. {d.bank2Holder}</p>
            <button
              className={`ob-copy-btn${copied === 'bank2' ? ' copied' : ''}`}
              onClick={() => copyToClipboard(d.bank2Number.replace(/\s/g, ''), 'bank2')}
            >
              {copied === 'bank2' ? '✓ Tersalin' : 'Salin Nomor'}
            </button>
          </div>
        </div>

        <div className="ob-qris-wrap ob-reveal ob-reveal-delay-4">
          <div className="ob-qris-placeholder" />
          <p className="ob-qris-label">QRIS</p>
        </div>
      </section>

      {/* ── 9. RSVP ── */}
      <section className="ob-rsvp-section">
        <div className="ob-rsvp-inner">
          <div className="ob-section-label ob-reveal">
            <span className="ob-section-eyebrow">Konfirmasi Kehadiran</span>
          </div>
          <h2 className="ob-rsvp-heading ob-reveal ob-reveal-delay-1">
            Apakah Anda<br />Hadir Bersama Kami?
          </h2>
          <p className="ob-rsvp-sub ob-reveal ob-reveal-delay-2">
            Kehadiran Anda akan sangat berarti. Mohon konfirmasi sebelum 5 September 2025.
          </p>

          {rsvpSent ? (
            <div className="ob-rsvp-success ob-reveal">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <h3>Terima Kasih!</h3>
              <p>Konfirmasi kehadiran Anda telah kami terima. Sampai jumpa di hari bahagia kami.</p>
            </div>
          ) : (
            <div className="ob-reveal ob-reveal-delay-3">
              <div className="ob-form-group">
                <label className="ob-form-label">Nama Lengkap</label>
                <input
                  className="ob-form-input"
                  type="text"
                  placeholder="Tulis nama Anda..."
                  value={rsvpForm.name}
                  onChange={e => setRsvpForm(p => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div className="ob-form-group">
                <label className="ob-form-label">Konfirmasi Kehadiran</label>
                <select
                  className="ob-form-select"
                  value={rsvpForm.attend}
                  onChange={e => setRsvpForm(p => ({ ...p, attend: e.target.value }))}
                >
                  <option value="hadir">Insya Allah Hadir</option>
                  <option value="tidak">Mohon Maaf, Tidak Bisa Hadir</option>
                  <option value="ragu">Masih Belum Pasti</option>
                </select>
              </div>
              <div className="ob-form-group">
                <label className="ob-form-label">Jumlah Tamu</label>
                <select
                  className="ob-form-select"
                  value={rsvpForm.guests}
                  onChange={e => setRsvpForm(p => ({ ...p, guests: e.target.value }))}
                >
                  {['1','2','3','4','5+'].map(n => <option key={n} value={n}>{n} orang</option>)}
                </select>
              </div>
              <div className="ob-form-group">
                <label className="ob-form-label">Ucapan & Doa</label>
                <textarea
                  className="ob-form-textarea"
                  placeholder="Tulis ucapan tulus untuk kedua mempelai..."
                  value={rsvpForm.message}
                  onChange={e => setRsvpForm(p => ({ ...p, message: e.target.value }))}
                />
              </div>
              <button className="ob-rsvp-submit" onClick={handleRsvp}>
                Kirim Konfirmasi
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── 10. WISHES ── */}
      <section className="ob-wishes-section">
        <div className="ob-section-label ob-reveal">
          <span className="ob-section-eyebrow">Guest Book</span>
          <h2 className="ob-section-title">Ucapan & <em>Doa</em></h2>
        </div>

        <div className="ob-wishes-list">
          {wishes.length === 0 ? (
            <div className="ob-wish-empty ob-reveal">
              Jadilah yang pertama memberikan ucapan…
            </div>
          ) : (
            wishes.map((w, i) => (
              <div className="ob-wish-item ob-reveal" key={i}>
                <p className="ob-wish-name">{w.name} · {w.attend === 'hadir' ? '✓ Hadir' : w.attend === 'tidak' ? '✗ Tidak Hadir' : '? Belum Pasti'}</p>
                <p className="ob-wish-text">{w.text || '—'}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ── 11. CLOSING ── */}
      <section className="ob-closing-section">
        <div className="ob-closing-line" />
        <div className="ob-closing-inner">
          <p className="ob-closing-small ob-reveal">Together in Love</p>

          <div className="ob-divider ob-reveal ob-reveal-delay-1">
            <div className="ob-divider-line" />
            <div className="ob-divider-diamond" />
            <div className="ob-divider-line" />
          </div>

          <h2 className="ob-closing-names ob-reveal ob-reveal-delay-2">
            <em>{d.brideName}</em>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontStyle: 'normal', fontSize: '0.5em' }}> & </span>
            {d.groomName}
          </h2>

          <p className="ob-closing-tagline ob-reveal ob-reveal-delay-3">
            Menikah dengan penuh syukur dan cinta
          </p>

          <div className="ob-divider ob-reveal ob-reveal-delay-4" style={{ marginTop: '2rem' }}>
            <div className="ob-divider-line" />
            <div className="ob-divider-diamond" />
            <div className="ob-divider-line" />
          </div>

          <p className="ob-closing-brand ob-reveal ob-reveal-delay-5">
            Made with love · Undigo
          </p>
        </div>
      </section>

    </div>
  );
}
