# Undigo — Platform Undangan Digital Premium Indonesia

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Setup environment variables
cp .env.example .env
# Edit .env dengan Midtrans Client Key kamu

# 3. Run development server
npm run dev

# 4. Build for production
npm run build
```

## 📁 Struktur Project

```
undigo/
├── index.html                  # Entry point HTML
├── vite.config.js              # Vite config
├── .env.example                # Template env variables
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                # React entry
    ├── App.jsx                 # Router + global state
    ├── styles/
    │   └── globals.css         # CSS variables & global styles
    ├── data/
    │   └── index.js            # Template, pricing, FAQ, testimoni data
    ├── hooks/
    │   ├── useReveal.js        # Scroll reveal animation
    │   └── useCountdown.js     # Live countdown timer
    ├── components/
    │   ├── Navbar.jsx / .css
    │   ├── Footer.jsx / .css
    │   ├── TemplateCard.jsx / .css
    │   ├── TestimonialSlider.jsx / .css  ← auto-scroll + dynamic
    │   └── CheckoutModal.jsx / .css      ← Midtrans Snap integration
    └── pages/
        ├── LandingPage.jsx / .css        ← Hero, Features, Pricing, FAQ, CTA
        └── CatalogPage.jsx / .css        ← Full template browser + filter
```

## 💳 Setup Midtrans

### 1. Daftar Akun Midtrans
- Sandbox: https://sandbox.midtrans.com
- Dashboard: https://dashboard.midtrans.com

### 2. Ambil Keys
Di dashboard Midtrans → Settings → Access Keys:
- **Client Key** → taruh di `.env` sebagai `VITE_MIDTRANS_CLIENT_KEY`
- **Server Key** → simpan di **backend** (JANGAN expose ke frontend)

### 3. Backend (wajib untuk production)
Frontend tidak boleh pegang Server Key. Kamu perlu backend sederhana:

```js
// Contoh endpoint Express.js (backend terpisah)
app.post('/api/create-payment', async (req, res) => {
  const { name, email, plan, price } = req.body;
  const response = await fetch('https://app.sandbox.midtrans.com/snap/v1/transactions', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(process.env.MIDTRANS_SERVER_KEY + ':'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      transaction_details: { order_id: `UND-${Date.now()}`, gross_amount: price },
      customer_details: { first_name: name, email },
    }),
  });
  const { token } = await response.json();
  res.json({ token });
});
```

Kemudian di `CheckoutModal.jsx`, ganti `simulateBackend()` dengan:
```js
const res = await fetch('/api/create-payment', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});
return res.json(); // { token }
```

## 📧 Sistem Email Post-Pembayaran

Setelah pembayaran sukses, backend kamu harus:

1. **Kirim email** ke customer dengan link undangan mereka
2. **Kirim email review** ~3 hari setelah tanggal acara
3. **Review bagus** (4-5 bintang) → otomatis masuk ke list testimoni via API

Rekomendasi email service: **Resend** (resend.com) — gratis sampai 3.000 email/bulan.

```js
// Contoh kirim email dengan Resend
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'Undigo <halo@undigo.id>',
  to: customerEmail,
  subject: '✨ Undangan digitalmu sudah siap!',
  html: `<p>Halo ${name}, undanganmu sudah aktif. <a href="${inviteUrl}">Klik di sini</a></p>`,
});
```

## 🎭 Testimoni Dinamis

- Testimoni dari `src/data/index.js` = data statis (seed/demo)
- Testimoni baru masuk lewat `App.jsx → handleNewTestimonial()`
- Di production: fetch dari backend API saat halaman load
- `TestimonialSlider` otomatis menggabungkan keduanya, newest first

## 🌐 Deploy

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Upload folder `dist/` ke Netlify
```

> ⚠️ Untuk SPA routing (React Router), tambahkan redirect rule:
> - Vercel: sudah otomatis
> - Netlify: buat file `public/_redirects` dengan isi `/* /index.html 200`

## 🎨 Menambah Template Baru

Edit `src/data/index.js`, tambahkan objek ke array `TEMPLATES`:
```js
{
  id: 13,                         // unik, increment
  name: 'Nama Template',
  category: 'wedding',            // wedding|khitanan|birthday|aqiqah|corporate
  categoryLabel: 'Pernikahan',
  price: 89000,
  badge: 'new',                   // 'new' | 'premium' | null
  gradient: 'linear-gradient(135deg, #1a0a24, #4a2060)',
  ornament: '✦ ✦ ✦',
  previewNames: 'Nama & Nama',
  previewSub: 'THE WEDDING',
},
```

## 📞 Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend | React 18 + Vite |
| Routing | React Router v6 |
| Payment | Midtrans Snap |
| Font | Cormorant Garamond + DM Sans |
| Deploy | Vercel / Netlify |
| Email | Resend (rekomendasi) |
