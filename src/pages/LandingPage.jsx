import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ClipboardList, User, Music, MapPin, Timer, Link2,
  BarChart3, MessageSquare, Wallet, LayoutTemplate,
  PenLine, CreditCard, Share2, Check, X, Sparkles, Infinity
} from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { useCountdown } from '../hooks/useCountdown';
import TestimonialSlider from '../components/TestimonialSlider';
import { PRICING_PLANS, FAQS } from '../data';

const FEATURES = [
  { Icon: ClipboardList, color: 'purple', title: 'RSVP Otomatis',        desc: 'Tamu konfirmasi kehadiran langsung di undangan. Data tersimpan otomatis di dashboard-mu.' },
  { Icon: User,          color: 'pink',   title: 'Nama Tamu Personal',   desc: 'Setiap tamu mendapat undangan dengan namanya sendiri. Kesan personal yang tak terlupakan.' },
  { Icon: Music,         color: 'sage',   title: 'Musik Background',     desc: 'Pilih lagu favorit dari koleksi kami atau upload sendiri sebagai latar undangan.' },
  { Icon: MapPin,        color: 'sage',   title: 'Maps Lokasi Acara',    desc: 'Integrasi Google Maps bawaan. Tamu bisa langsung navigasi ke lokasi acaramu.' },
  { Icon: Timer,         color: 'purple', title: 'Hitung Mundur Acara',  desc: 'Countdown timer dinamis menambah kesan spesial dan urgensi pada undanganmu.' },
  { Icon: Link2,         color: 'pink',   title: 'Share Link Instan',    desc: 'Satu link untuk semua tamu. Bagikan via WhatsApp, Instagram, atau platform apapun.' },
  { Icon: BarChart3,     color: 'sage',   title: 'Dashboard Data Tamu',  desc: 'Pantau siapa saja yang sudah buka undangan, konfirmasi hadir, dan berapa yang belum.' },
  { Icon: MessageSquare, color: 'purple', title: 'Buku Ucapan Digital',  desc: 'Tamu bisa meninggalkan pesan dan doa secara langsung di halaman undanganmu.' },
  { Icon: Wallet,        color: 'pink',   title: 'Amplop Digital',       desc: 'Terima hadiah uang dari tamu via QRIS dan transfer bank terintegrasi langsung di undangan.' },
];

const FEATURE_ICON_STYLES = {
  purple: 'bg-[rgba(142,74,151,0.1)] text-purple',
  pink:   'bg-[rgba(230,179,211,0.35)] text-pink-dark',
  sage:   'bg-[rgba(220,231,215,0.6)] text-sage-deeper',
};

const STEPS = [
  { Icon: LayoutTemplate, title: 'Pilih Template',   desc: 'Browse 120+ template premium. Pilih yang paling sesuai tema acaramu.' },
  { Icon: PenLine,        title: 'Isi Detail Acara', desc: 'Masukkan nama, tanggal, lokasi, dan detail acara. Simpel dan cepat.' },
  { Icon: CreditCard,     title: 'Bayar & Aktifkan', desc: 'Pembayaran aman via Midtrans. Undangan aktif instan setelah konfirmasi.' },
  { Icon: Share2,         title: 'Bagikan ke Tamu',  desc: 'Salin link dan kirim via WhatsApp, Instagram, atau email ke semua tamu.' },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        className="w-full py-5 flex items-center justify-between gap-4 bg-transparent border-none cursor-pointer font-body text-[15px] font-normal text-charcoal text-left transition-colors duration-200 hover:text-purple"
        onClick={() => setOpen(v => !v)}
      >
        {q}
        <span className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-base transition-all duration-300 ${open ? 'bg-purple text-white rotate-45' : 'bg-gray-light text-charcoal-soft'}`}>
          +
        </span>
      </button>
      <div className={`text-[14px] font-light text-charcoal-soft leading-[1.8] overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-[200px] pb-5' : 'max-h-0'}`}>
        {a}
      </div>
    </div>
  );
}

export default function LandingPage({ dynamicTestimonials }) {
  useReveal();
  const countdown = useCountdown('2026-12-12T10:00:00');

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-[120px] pb-20 px-8 overflow-hidden" id="home">
        {/* Bg blobs — z-0, tidak menutup cursor smoke */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(230,179,211,0.22) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 15% 70%, rgba(220,231,215,0.35) 0%, transparent 55%)' }} />
        <div className="absolute w-[520px] h-[520px] rounded-full top-[-80px] right-[-60px] z-0 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(220,231,215,0.55) 0%, transparent 70%)', animation: 'floatBlob 12s ease-in-out infinite' }} />
        <div className="absolute w-[380px] h-[380px] rounded-full bottom-10 left-[-100px] z-0 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(230,179,211,0.35) 0%, transparent 70%)', animation: 'floatBlob 16s ease-in-out infinite reverse' }} />

        <div className="relative z-[1] max-w-[1200px] mx-auto w-full grid grid-cols-1 gap-12 items-center md:grid-cols-2 md:gap-16">

          {/* Left: copy */}
          <div className="text-center md:text-left">
            {/* [FIX 6] Badge "Platform Undangan #1" dihapus */}

            <h1 className="font-display text-[clamp(42px,5.5vw,68px)] font-normal leading-[1.12] text-charcoal mb-5" style={{ animation: 'fadeSlideUp 0.8s 0.1s cubic-bezier(0.4,0,0.2,1) both' }}>
              Buat Undangan Digital <em className="italic text-purple">Elegan</em> dalam Hitungan Menit
            </h1>

            <p className="text-[16px] font-light text-charcoal-soft leading-[1.75] max-w-[440px] mx-auto md:mx-0 mb-9" style={{ animation: 'fadeSlideUp 0.8s 0.2s cubic-bezier(0.4,0,0.2,1) both' }}>
              Template premium, RSVP otomatis, personalisasi nama tamu, dan berbagi link instan.
              Undangan digital yang membuat momen spesialmu tak terlupakan.
            </p>

            <div className="flex items-center gap-4 mb-12 justify-center md:justify-start flex-wrap" style={{ animation: 'fadeSlideUp 0.8s 0.3s cubic-bezier(0.4,0,0.2,1) both' }}>
              {/* [FIX 2] Tombol "Mulai Sekarang" di hero dihapus — diganti satu tombol ke katalog */}
              <Link
                to="/katalog"
                className="flex items-center gap-2 px-8 py-[0.85rem] text-[15px] font-medium text-white border-none rounded-[36px] no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(142,74,151,0.42)]"
                style={{ background: 'linear-gradient(135deg, #8E4A97, #6B3572)', boxShadow: '0 8px 28px rgba(142,74,151,0.3)' }}
              >
                ✦ Lihat Template
              </Link>
              <a
                href="#how"
                className="flex items-center gap-2 px-7 py-[0.85rem] text-[15px] font-normal text-charcoal bg-white border border-border rounded-[36px] no-underline transition-all duration-200 hover:border-sage-dark hover:bg-sage"
              >
                Cara Kerja →
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-10 justify-center md:justify-start flex-wrap" style={{ animation: 'fadeSlideUp 0.8s 0.4s cubic-bezier(0.4,0,0.2,1) both' }}>
              {[
                { num: '50K+', label: 'Undangan Dibuat' },
                { num: '120+', label: 'Template Premium' },
                { num: '4.9★', label: 'Rating Pengguna' },
              ].map(({ num, label }, i, arr) => (
                <div key={label} className="flex items-center gap-10">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-display text-[26px] font-medium text-charcoal leading-none">{num}</span>
                    <span className="text-[12px] text-gray-mid tracking-[0.3px]">{label}</span>
                  </div>
                  {i < arr.length - 1 && <div className="w-px self-stretch bg-border" />}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Phone mockup — [FIX 7] lebih rapi dan real */}
          <div className="flex justify-center items-center relative order-first md:order-last" style={{ animation: 'fadeSlideRight 1s 0.2s cubic-bezier(0.4,0,0.2,1) both' }}>
            <div className="relative" style={{ animation: 'floatPhone 6s ease-in-out infinite' }}>

              {/* Ambient glow behind phone */}
              <div className="absolute inset-[-40px] rounded-full pointer-events-none z-0" style={{ background: 'radial-gradient(circle, rgba(142,74,151,0.18) 0%, transparent 70%)', filter: 'blur(20px)' }} />

              {/* Floating deco blobs */}
              <div className="absolute top-[50px] right-[-45px] w-[90px] h-[90px] rounded-full pointer-events-none z-[1] opacity-70" style={{ background: 'radial-gradient(circle, #DCE7D7, transparent)', animation: 'floatBlob 8s ease-in-out infinite' }} />
              <div className="absolute bottom-[70px] left-[-35px] w-[60px] h-[60px] rounded-full pointer-events-none z-[1] opacity-60" style={{ background: 'radial-gradient(circle, #F2D5E9, transparent)', animation: 'floatBlob 10s ease-in-out infinite reverse' }} />

              {/* Phone shell */}
              <div className="relative z-[2] w-[280px] rounded-[48px] p-[10px]"
                style={{
                  background: 'linear-gradient(145deg, #1a1a2e, #16213e)',
                  boxShadow: '0 50px 100px rgba(0,0,0,0.4), 0 20px 40px rgba(142,74,151,0.2), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.3)',
                }}>

                {/* Side buttons (deco) */}
                <div className="absolute right-[-3px] top-[100px] w-[3px] h-[36px] rounded-l-sm" style={{ background: 'linear-gradient(180deg, #2a2a3e, #1a1a2e)' }} />
                <div className="absolute right-[-3px] top-[148px] w-[3px] h-[56px] rounded-l-sm" style={{ background: 'linear-gradient(180deg, #2a2a3e, #1a1a2e)' }} />
                <div className="absolute left-[-3px] top-[120px] w-[3px] h-[44px] rounded-r-sm" style={{ background: 'linear-gradient(180deg, #2a2a3e, #1a1a2e)' }} />

                {/* Screen bezel */}
                <div className="bg-black rounded-[40px] overflow-hidden relative" style={{ height: '540px' }}>
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-b-[20px] z-10 flex items-center justify-center gap-2">
                    <div className="w-[8px] h-[8px] rounded-full bg-[#1a1a1a] border border-[#333]" />
                    <div className="w-[10px] h-[10px] rounded-full bg-[#1a1a1a] border border-[#2a2a2a]" />
                  </div>

                  {/* Status bar */}
                  <div className="absolute top-0 left-0 right-0 h-[44px] flex items-start justify-between px-6 pt-2 z-[9] text-[10px] font-medium text-white">
                    <span>9:41</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="white" opacity="0.8"><rect x="0" y="4" width="2" height="4" rx="0.5"/><rect x="3" y="2.5" width="2" height="5.5" rx="0.5"/><rect x="6" y="1" width="2" height="7" rx="0.5"/><rect x="9" y="0" width="2" height="8" rx="0.5"/></svg>
                      <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><rect x="0.5" y="0.5" width="11" height="7" rx="1.5" stroke="white" strokeOpacity="0.6"/><rect x="12" y="2.5" width="1.5" height="3" rx="0.75" fill="white" fillOpacity="0.6"/><rect x="1.5" y="1.5" width="8" height="5" rx="0.75" fill="white"/></svg>
                    </div>
                  </div>

                  {/* Invite content */}
                  <div className="h-full flex flex-col items-center pt-[52px] pb-5 px-4 relative overflow-hidden"
                    style={{ background: 'linear-gradient(180deg, #0f0820 0%, #1e0d35 40%, #2d1545 70%, #1a0c28 100%)' }}>

                    {/* Subtle grain overlay */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

                    {/* Ambient light */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(196,155,203,0.2) 0%, transparent 70%)' }} />

                    {/* Ornament top */}
                    <div className="font-display text-[rgba(196,155,203,0.4)] text-[18px] tracking-[6px] mb-2">✦ ✦ ✦</div>

                    {/* Bismillah */}
                    <div className="text-[10px] text-[rgba(220,200,235,0.6)] tracking-[2px] mb-3">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</div>

                    {/* Divider */}
                    <div className="w-[80px] h-px mb-3" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,155,203,0.5), transparent)' }} />

                    {/* Names */}
                    <div className="font-display text-[28px] font-light text-white leading-[1.2] text-center mb-1">
                      Rizky &amp; <em className="italic" style={{ color: '#E6B3D3' }}>Anindita</em>
                    </div>
                    <div className="text-[9px] text-[rgba(196,155,203,0.6)] tracking-[3px] mb-4">INTIMATE WEDDING</div>

                    {/* Date card */}
                    <div className="w-full rounded-[14px] p-3 text-center mb-3" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(196,155,203,0.15)', backdropFilter: 'blur(10px)' }}>
                      <div className="text-[9px] text-[rgba(220,200,235,0.5)] tracking-[2px] mb-1">SABTU • DESEMBER 2026</div>
                      <div className="font-display text-[36px] font-light text-white leading-none mb-0.5">12</div>
                      <div className="text-[11px] tracking-[1px]" style={{ color: '#E6B3D3' }}>Desember 2026</div>

                      {/* Countdown */}
                      <div className="flex gap-1.5 mt-3">
                        {[{ val: countdown.d, label: 'HARI' }, { val: countdown.h, label: 'JAM' }, { val: countdown.m, label: 'MENIT' }, { val: countdown.s, label: 'DETIK' }].map(({ val, label }) => (
                          <div key={label} className="flex-1 rounded-[8px] py-1.5 text-center" style={{ background: 'rgba(142,74,151,0.25)', border: '1px solid rgba(142,74,151,0.2)' }}>
                            <span className="font-display text-[16px] text-white block leading-none">{String(val).padStart(2, '0')}</span>
                            <span className="text-[7px] text-[rgba(196,155,203,0.5)] tracking-[0.5px] block mt-0.5">{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA button */}
                    <button className="w-full rounded-[10px] py-2.5 text-[11px] font-medium text-white border-none cursor-pointer tracking-[0.5px]"
                      style={{ background: 'linear-gradient(135deg, #8E4A97, #b44fc2)', boxShadow: '0 4px 16px rgba(142,74,151,0.4)' }}>
                      Konfirmasi Kehadiran
                    </button>

                    {/* Bottom ornament */}
                    <div className="flex items-center gap-2 mt-3 w-full px-4">
                      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,155,203,0.3))' }} />
                      <span className="text-[rgba(196,155,203,0.4)] text-[10px]">✦</span>
                      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(196,155,203,0.3), transparent)' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating info labels */}
              <div className="absolute top-[80px] right-[-100px] z-[3] hidden md:flex bg-white rounded-[12px] px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.1)] text-[11.5px] font-medium text-charcoal items-center gap-1.5 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-[#4CAF50]" />
                247 Tamu Hadir
              </div>
              <div className="absolute bottom-[130px] left-[-100px] z-[3] hidden md:flex bg-white rounded-[12px] px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.1)] text-[11.5px] font-medium text-charcoal items-center gap-1.5 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-purple" />
                Link Dibagikan
              </div>
              <div className="absolute bottom-[60px] right-[-80px] z-[3] hidden md:flex bg-white rounded-[12px] px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.1)] text-[11.5px] font-medium text-charcoal items-center gap-1.5 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-pink-dark" />
                12 Ucapan Baru
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 px-8" id="features" style={{ background: 'transparent' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center reveal">
            <div className="section-badge">✦ Keunggulan</div>
            <h2 className="section-title">Semua yang Kamu Butuhkan, <em>Sudah Ada</em></h2>
            <p className="section-sub mx-auto">Fitur lengkap untuk undangan digital yang profesional dan berkesan.</p>
          </div>
          <div className="grid gap-5 mt-12 reveal" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', transitionDelay: '0.1s' }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-white border border-border rounded-lg p-7 flex gap-4 items-start transition-all duration-300 hover:-translate-y-[3px] hover:shadow-md hover:border-[rgba(220,231,215,0.8)]">
                <div className={`w-[46px] h-[46px] shrink-0 rounded-[10px] flex items-center justify-center ${FEATURE_ICON_STYLES[f.color]}`}>
                  <f.Icon size={20} strokeWidth={1.6} />
                </div>
                <div>
                  <h4 className="text-[15px] font-medium text-charcoal mb-1">{f.title}</h4>
                  <p className="text-[13.5px] font-light text-charcoal-soft leading-[1.6]">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── [FIX 4] background transparent agar cursor smoke tidak tertutup */}
      <section className="py-20 px-8" id="how" style={{ background: 'transparent' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center reveal">
            <div className="section-badge">✦ Cara Kerja</div>
            <h2 className="section-title">Mudah dalam <em>4 Langkah</em></h2>
            <p className="section-sub mx-auto">Dari pilih template hingga undangan siap dibagikan, semua hanya butuh menit.</p>
          </div>
          <div className="relative flex flex-col md:flex-row mt-14 overflow-hidden reveal" style={{ transitionDelay: '0.1s' }}>
            <div className="hidden md:block absolute top-8 left-8 right-8 h-0.5" style={{ background: 'linear-gradient(90deg, #DCE7D7, #E6B3D3, #C49BCB)' }} />
            {STEPS.map((s, i) => (
              <div key={i} className="group flex-1 flex flex-col items-center text-center px-4 relative mb-6 md:mb-0">
                <div className="w-16 h-16 bg-white border-2 border-border rounded-full flex items-center justify-center text-purple mb-5 relative z-[1] transition-all duration-300 group-hover:bg-purple group-hover:text-white group-hover:border-purple group-hover:scale-110">
                  <s.Icon size={22} strokeWidth={1.5} />
                </div>
                <div className="text-[14.5px] font-medium text-charcoal mb-1.5">{s.title}</div>
                <div className="text-[13px] font-light text-gray-mid leading-[1.6] max-w-[180px]">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-8" id="testimonials" style={{ background: 'transparent' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center reveal">
            <div className="section-badge">✦ Testimoni</div>
            <h2 className="section-title">Kata Mereka yang Sudah <em>Merasakan</em></h2>
            <p className="section-sub mx-auto">Ribuan pengguna sudah membuat momen spesial mereka dengan Undigo.</p>
          </div>
          <TestimonialSlider allTestimonials={dynamicTestimonials} />
        </div>
      </section>

      {/* ── PRICING ── [FIX 4] background transparent, [FIX 5] tombol arahkan ke /katalog */}
      <section className="py-20 px-8" id="pricing" style={{ background: 'transparent' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center reveal">
            <div className="section-badge">✦ Paket Harga</div>
            <h2 className="section-title">Sederhana, <em>Transparan</em></h2>
            <p className="section-sub mx-auto">Dua pilihan saja. Tidak ada paket tersembunyi, tidak ada biaya perpanjangan.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12 max-w-[860px] mx-auto items-start reveal" style={{ transitionDelay: '0.1s' }}>
            {PRICING_PLANS.map(plan => (
              <div key={plan.id}
                className={`relative bg-white border-[1.5px] rounded-lg p-9 transition-all duration-[350ms] hover:-translate-y-[5px] ${plan.featured ? 'border-purple shadow-[0_0_0_1px_#8E4A97,0_20px_60px_rgba(142,74,151,0.14)] hover:-translate-y-[6px]' : 'border-border hover:shadow-md'}`}
              >
                {plan.featured && (
                  <div className="absolute top-[-14px] left-1/2 -translate-x-1/2 flex items-center gap-1 text-[11px] font-medium text-white px-4 py-1 rounded-full whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #8E4A97, #C97DB0)' }}>
                    <Sparkles size={11} strokeWidth={2} /> {plan.badge}
                  </div>
                )}
                {!plan.featured && (
                  <div className="inline-block bg-gray-light text-gray-mid text-[11px] font-medium tracking-[0.5px] px-3 py-0.5 rounded-full mb-4">{plan.badge}</div>
                )}
                <div className="text-[12px] font-semibold tracking-[1.5px] uppercase text-gray-mid mb-3">{plan.name}</div>
                <div className="flex items-baseline gap-1 mb-1.5">
                  {plan.price === 0
                    ? <span className="font-display text-[46px] font-normal text-charcoal leading-none">Gratis</span>
                    : <><span className="text-[16px] text-charcoal font-normal">Rp</span><span className={`font-display text-[46px] font-normal leading-none ${plan.featured ? 'text-purple' : 'text-charcoal'}`}>{plan.price.toLocaleString('id-ID')}</span></>
                  }
                </div>
                <div className="text-[12.5px] text-gray-mid font-light mb-3 leading-[1.5]">{plan.period}</div>
                {plan.note && (
                  <div className={`inline-flex items-center gap-1.5 text-[12px] font-medium px-3 py-1 rounded-full mb-6 ${plan.featured ? 'bg-[rgba(142,74,151,0.08)] text-purple' : 'bg-[rgba(230,179,211,0.2)] text-pink-dark'}`}>
                    {plan.featured ? <Infinity size={13} /> : <Timer size={13} />} {plan.note}
                  </div>
                )}
                <div className="h-px bg-border mb-6" />
                <ul className="list-none flex flex-col gap-3 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className={`flex items-start gap-2 text-[13.5px] font-light leading-[1.4] ${f.enabled ? (f.warning ? 'text-pink-dark' : 'text-charcoal-soft') : 'text-gray-mid'}`}>
                      <span className={`shrink-0 mt-[1px] ${f.enabled ? (f.warning ? 'text-pink-dark' : 'text-sage-deeper') : 'text-border'}`}>
                        {f.enabled ? (f.warning ? <Timer size={13} strokeWidth={2} /> : <Check size={13} strokeWidth={2.5} />) : <X size={13} strokeWidth={2} />}
                      </span>
                      {f.text}
                    </li>
                  ))}
                </ul>

                {/* [FIX 5] Arahkan ke /katalog bukan onCheckout */}
                <Link
                  to="/katalog"
                  className={`w-full py-[0.9rem] font-body text-[14px] font-medium rounded-[36px] cursor-pointer transition-all duration-300 text-center block no-underline ${plan.featured ? 'text-white shadow-[0_6px_20px_rgba(142,74,151,0.3)] hover:-translate-y-px hover:shadow-[0_10px_28px_rgba(142,74,151,0.42)]' : 'bg-white text-charcoal border-[1.5px] border-border hover:border-purple hover:text-purple'}`}
                  style={plan.featured ? { background: 'linear-gradient(135deg, #8E4A97, #6B3572)' } : {}}
                >
                  {plan.price === 0 ? 'Mulai Gratis → Pilih Template' : 'Dapatkan Premium → Pilih Template'}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-[13px] text-gray-mid font-light mt-8 leading-[1.7] max-w-[500px] mx-auto reveal">
            Paket Basic cocok untuk coba-coba. Upgrade ke Premium kapan saja — bayar sekali, aktif untuk seterusnya.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-8" id="faq" style={{ background: 'transparent' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center reveal">
            <div className="section-badge">✦ FAQ</div>
            <h2 className="section-title">Pertanyaan yang <em>Sering Ditanya</em></h2>
          </div>
          <div className="max-w-[720px] mx-auto mt-12 reveal" style={{ transitionDelay: '0.1s' }}>
            {FAQS.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>

      {/* ── CTA BAND — [FIX 2] tombol "Mulai Sekarang" di bawah dihapus ── */}
      <div className="relative overflow-hidden text-center py-20 px-8" style={{ background: 'linear-gradient(135deg, #8E4A97 0%, #6B3572 40%, #3d1a4a 100%)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 20% 50%, rgba(220,231,215,0.1) 0%, transparent 60%), radial-gradient(ellipse 50% 70% at 80% 50%, rgba(230,179,211,0.1) 0%, transparent 60%)' }} />
        <div className="relative max-w-[700px] mx-auto">
          <h2 className="font-display text-[clamp(32px,4vw,52px)] font-normal text-white leading-[1.2] mb-4">
            Siap Membuat Undangan <em className="italic text-pink-light">Impianmu?</em>
          </h2>
          <p className="text-[15px] font-light text-[rgba(255,255,255,0.7)] mb-10">
            Bergabung dengan 50.000+ pengguna yang sudah mempercayai Undigo untuk momen spesial mereka.
          </p>
          <Link
            to="/katalog"
            className="inline-flex items-center gap-2 px-8 py-[0.85rem] text-[15px] font-medium text-purple bg-white border-none rounded-[36px] no-underline transition-all duration-300 shadow-[0_6px_24px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(0,0,0,0.2)]"
          >
            ✦ Pilih Template Sekarang
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes floatBlob {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(20px,-30px) scale(1.05); }
          66% { transform: translate(-15px,20px) scale(0.97); }
        }
        @keyframes floatPhone {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-14px) rotate(-2deg); }
        }
        @keyframes fadeSlideRight {
          from { opacity:0; transform:translateX(40px); }
          to { opacity:1; transform:translateX(0); }
        }
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(20px); }
          to { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </>
  );
}
