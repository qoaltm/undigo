/**
 * src/registry.js — SATU-SATUNYA FILE YANG DISENTUH SAAT TAMBAH TEMPLATE BARU
 * ─────────────────────────────────────────────────────────────────────────────
 * Cara tambah template baru:
 *   1. Buat folder + JSX di src/templates/NamaTemplate/NamaTemplate.jsx
 *   2. Tambahkan satu entry di REGISTRY array di bawah
 *   3. Selesai. PreviewPage & CatalogPage otomatis update.
 *
 * Field wajib per entry:
 *   previewId   — slug URL: '/preview/:previewId'  (kebab-case)
 *   component   — import komponen template
 *   name        — nama tampil di UI
 *   category    — 'wedding' | 'birthday' | 'aqiqah' | 'khitan' | 'corporate' | 'other'
 *   price       — angka (IDR, tanpa titik)
 *   badge       — 'free' | 'basic' | 'premium' | null
 *   gradient    — string CSS gradient untuk thumbnail katalog
 *   initials    — [string, string] — inisial pasangan untuk MonogramPanel
 *   theme       — objek warna untuk MonogramPanel & PreviewPage
 *   theme.gradientFrom / gradientMid / gradientTo — latar MonogramPanel
 *   theme.accent       — warna aksen utama
 *   theme.accentSoft   — aksen transparan (overlay)
 *   theme.particleColor — warna partikel
 */

import AmaraMidnight from './templates/AmaraMidnight/AmaraMidnight';
import HanaForest    from './templates/HanaForest/HanaForest';
import RoseGarden    from './templates/RoseGarden/RoseGarden';
import JavaneseGold  from './templates/JavaneseGold/JavaneseGold';
import OceanBlue     from './templates/OceanBlue/OceanBlue';
// ↑ IMPORT TEMPLATE BARU DI SINI

export const REGISTRY = [
  {
    previewId:    'amara-midnight',
    component:    AmaraMidnight,
    name:         'Amara Midnight',
    category:     'wedding',
    categoryLabel:'Pernikahan',
    price:        25000,
    badge:        'premium',
    gradient:     'linear-gradient(135deg, #1a0a24, #4a2060)',
    ornament:     '✦ ✦ ✦',
    initials:     ['A', 'R'],
    theme: {
      gradientFrom:   '#0D0818',
      gradientMid:    '#2A1040',
      gradientTo:     '#160F2A',
      accent:         '#C9A0B4',
      accentSoft:     'rgba(201,160,180,0.12)',
      particleColor:  '#C9A0B4',
    },
  },
  {
    previewId:    'hana-forest',
    component:    HanaForest,
    name:         'Hana Forest',
    category:     'wedding',
    categoryLabel:'Pernikahan',
    price:        25000,
    badge:        'premium',
    gradient:     'linear-gradient(135deg, #071a0e, #1a4a28)',
    ornament:     '❧ ❧ ❧',
    initials:     ['H', 'D'],
    theme: {
      gradientFrom:   '#071A0E',
      gradientMid:    '#0D2918',
      gradientTo:     '#071A0E',
      accent:         '#7EC88A',
      accentSoft:     'rgba(126,200,138,0.12)',
      particleColor:  '#7EC88A',
    },
  },
  {
    previewId:    'rose-garden',
    component:    RoseGarden,
    name:         'Rose Garden',
    category:     'wedding',
    categoryLabel:'Pernikahan',
    price:        25000,
    badge:        'premium',
    gradient:     'linear-gradient(135deg, #1a0610, #4a1528)',
    ornament:     '✿ ✿ ✿',
    initials:     ['S', 'B'],
    theme: {
      gradientFrom:   '#1A0610',
      gradientMid:    '#3D1020',
      gradientTo:     '#1A0610',
      accent:         '#E8899A',
      accentSoft:     'rgba(232,137,154,0.12)',
      particleColor:  '#E8899A',
    },
  },
  {
    previewId:    'javanese-gold',
    component:    JavaneseGold,
    name:         'Javanese Noir',
    category:     'wedding',
    categoryLabel:'Pernikahan',
    price:        25000,
    badge:        'premium',
    gradient:     'linear-gradient(135deg, #0A0804, #2A1A08)',
    ornament:     '◆ ◆ ◆',
    initials:     ['D', 'B'],
    theme: {
      gradientFrom:   '#0A0804',
      gradientMid:    '#120E07',
      gradientTo:     '#0A0804',
      accent:         '#B8722A',
      accentSoft:     'rgba(184,114,42,0.12)',
      particleColor:  '#D4954A',
    },
  },
  {
    previewId:    'ocean-blue',
    component:    OceanBlue,
    name:         'Ocean Blue Elegance',
    category:     'wedding',
    categoryLabel:'Pernikahan',
    price:        25000,
    badge:        'premium',
    gradient:     'linear-gradient(135deg, #050D1A, #0F2847)',
    ornament:     '◇ ◇ ◇',
    initials:     ['K', 'A'],
    theme: {
      gradientFrom:   '#050D1A',
      gradientMid:    '#081628',
      gradientTo:     '#030A14',
      accent:         '#7BBCCC',
      accentSoft:     'rgba(123,188,204,0.12)',
      particleColor:  '#7BBCCC',
    },
  },
  // ↑ TAMBAH ENTRY BARU DI SINI — copy salah satu blok di atas sebagai template
];

/** Lookup by previewId — dipakai PreviewPage */
export const REGISTRY_MAP = Object.fromEntries(
  REGISTRY.map(t => [t.previewId, t])
);

/** Array untuk CatalogPage / data katalog — sudah sorted by name */
export const CATALOG = REGISTRY.map(({ component: _c, ...rest }) => rest);
