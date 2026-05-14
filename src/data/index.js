/**
 * src/data/index.js
 * ──────────────────
 * JANGAN tambah template di sini.
 * Data template dikelola di src/registry.js → field CATALOG.
 *
 * File ini hanya:
 *   1. Re-export TEMPLATES dari registry (alias supaya CatalogPage tidak perlu diubah)
 *   2. Export CATEGORIES dan PRICING_PLANS yang bersifat statis
 */

import { CATALOG } from '../registry';

/** Alias — CatalogPage import { TEMPLATES } from '../data' tetap berjalan */
export const TEMPLATES = CATALOG;

export const CATEGORIES = [
  { key: 'all', label: 'Semua' },
  { key: 'wedding', label: 'Pernikahan' },
  { key: 'khitanan', label: 'Khitanan' },
  { key: 'birthday', label: 'Ulang Tahun' },
  { key: 'aqiqah', label: 'Aqiqah' },
  { key: 'corporate', label: 'Corporate' },
];

export const PRICING_PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    period: 'Gratis selamanya',
    desc: 'Coba dulu, tanpa kartu kredit',
    featured: false,
    badge: 'Gratis',
    note: 'Undangan aktif hanya 3 hari',
    features: [
      { text: '1 template pilihan', enabled: true },
      { text: 'Nama tamu personal', enabled: true },
      { text: 'RSVP otomatis', enabled: true },
      { text: 'Hitung mundur acara', enabled: true },
      { text: 'Google Maps terintegrasi', enabled: true },
      { text: 'Berbagi link WhatsApp', enabled: true },
      { text: 'Aktif 3 hari saja', enabled: true, warning: true },
      { text: 'Musik background', enabled: false },
      { text: 'Amplop digital', enabled: false },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 25000,
    period: 'Bayar sekali, aktif seumur hidup',
    desc: 'Untuk 1 jenis undangan pilihanmu',
    featured: true,
    badge: 'Terpopuler',
    note: 'Tidak ada biaya perpanjangan',
    features: [
      { text: 'Semua template premium', enabled: true },
      { text: 'Nama tamu personal', enabled: true },
      { text: 'RSVP otomatis tanpa batas', enabled: true },
      { text: 'Hitung mundur acara', enabled: true },
      { text: 'Google Maps terintegrasi', enabled: true },
      { text: 'Berbagi link instan', enabled: true },
      { text: 'Aktif seumur hidup', enabled: true },
      { text: 'Musik background custom', enabled: true },
      { text: 'Amplop digital (QRIS + Bank)', enabled: true },
    ],
  },
];

export const FAQS = [
  {
    q: 'Apa bedanya paket Basic dan Premium?',
    a: 'Paket Basic gratis tapi undangan hanya aktif 3 hari sejak dibuat — cocok untuk coba-coba. Paket Premium hanya Rp 25.000 dan undangan aktif seumur hidup tanpa biaya perpanjangan apapun.',
  },
  {
    q: 'Apakah undangan bisa diedit setelah dibayar?',
    a: 'Ya! Untuk paket Premium, kamu bisa mengedit semua isi undangan kapan saja. Perubahan langsung terlihat oleh tamu yang membuka link.',
  },
  {
    q: 'Maksud "seumur hidup" itu sampai kapan?',
    a: 'Undanganmu akan tetap aktif dan bisa diakses tamu selama platform Undigo berjalan — tanpa biaya tambahan, tanpa langganan, tanpa kejutan.',
  },
  {
    q: 'Metode pembayaran apa yang tersedia?',
    a: 'QRIS, transfer bank (BCA, Mandiri, BNI, BRI), GoPay, OVO, Dana, ShopeePay, dan kartu kredit/debit. Semua diproses aman via Midtrans.',
  },
  {
    q: 'Bisakah preview template sebelum membeli?',
    a: 'Tentu! Klik "Preview" di template mana saja untuk melihat tampilan lengkap sebelum memutuskan.',
  },
  {
    q: 'Apakah undangan bisa dibuka di semua perangkat?',
    a: 'Ya, semua template dioptimasi untuk smartphone, tablet, dan komputer. Tamu tidak perlu install aplikasi apapun.',
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    initials: 'SR',
    name: 'Siti Rahayu',
    event: 'Pernikahan · Jakarta, Nov 2024',
    rating: 5,
    text: 'Keren banget! Undangan digitalnya elegan dan tamu-tamu pada kagum. Prosesnya mudah dan cepat. Highly recommended untuk semua yang mau nikah!',
    avatarClass: 'av-1',
  },
  {
    id: 2,
    initials: 'RH',
    name: 'Rizal Hakim',
    event: 'Pernikahan · Surabaya, Okt 2024',
    rating: 5,
    text: 'Fitur nama personal per tamu itu keren banget! Tamu merasa dihargai. RSVP-nya juga gampang, data langsung masuk dashboard.',
    avatarClass: 'av-2',
  },
  {
    id: 3,
    initials: 'MD',
    name: 'Muhamad Daffa',
    event: 'Khitanan · Bandung, Sep 2024',
    rating: 5,
    text: 'Buat undangan khitanan anak, prosesnya super cepat! 15 menit udah jadi dan tinggal share WA. Worth it banget harganya.',
    avatarClass: 'av-3',
  },
  {
    id: 4,
    initials: 'LN',
    name: 'Laras Ningtyas',
    event: 'Pernikahan · Yogyakarta, Ags 2024',
    rating: 5,
    text: 'Dashboard-nya informatif banget. Bisa pantau siapa aja yang sudah buka undangan dan berapa yang konfirmasi hadir. Sangat membantu planning!',
    avatarClass: 'av-4',
  },
  {
    id: 5,
    initials: 'FP',
    name: 'Fitria Pertiwi',
    event: 'Corporate Event · Jakarta, Jul 2024',
    rating: 4,
    text: 'Untuk corporate event, template-nya profesional dan elegan. Tim kami terkesan dengan tampilan undangan gala dinner tahun ini.',
    avatarClass: 'av-5',
  },
  {
    id: 6,
    initials: 'BK',
    name: 'Bima Kurnia',
    event: 'Aqiqah · Medan, Jun 2024',
    rating: 5,
    text: 'Support-nya responsif banget. Ada pertanyaan jam 10 malam, langsung dijawab. Undangannya juga loading cepat, tidak lemot di HP tamu.',
    avatarClass: 'av-6',
  },
];
