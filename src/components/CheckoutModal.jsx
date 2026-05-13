import { useState } from 'react';
import { Lock, Mail, Infinity, Timer } from 'lucide-react';

const MIDTRANS_CLIENT_KEY = import.meta.env.VITE_MIDTRANS_CLIENT_KEY || 'YOUR_CLIENT_KEY_HERE';
const MIDTRANS_SNAP_URL = import.meta.env.VITE_MIDTRANS_PRODUCTION === 'true'
  ? 'https://app.midtrans.com/snap/snap.js'
  : 'https://app.sandbox.midtrans.com/snap/snap.js';

const PLANS = [
  { key: 'basic',   label: 'Basic',   price: 0,     desc: 'Aktif 3 hari' },
  { key: 'premium', label: 'Premium', price: 25000, desc: 'Seumur hidup', popular: true },
];

function formatRupiah(amount) {
  if (amount === 0) return 'Gratis';
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
}

async function loadSnapScript(clientKey, snapUrl) {
  return new Promise((resolve, reject) => {
    if (window.snap) return resolve();
    const script = document.createElement('script');
    script.src = snapUrl;
    script.setAttribute('data-client-key', clientKey);
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function simulateBackend(payload) {
  await new Promise(r => setTimeout(r, 800));
  return { token: 'DEMO_TOKEN' };
}

export default function CheckoutModal({ isOpen, onClose, selectedTemplate }) {
  const [step, setStep] = useState('form');
  const [form, setForm] = useState({ name: '', email: '', eventType: '', plan: 'premium' });
  const [errors, setErrors] = useState({});

  const selectedPlan = PLANS.find(p => p.key === form.plan);
  const price = selectedPlan?.price ?? 0;
  const isFree = price === 0;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Nama wajib diisi';
    if (!form.email.trim()) e.email = 'Email wajib diisi';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Format email tidak valid';
    if (!form.eventType) e.eventType = 'Pilih jenis acara';
    return e;
  };

  const handleChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setStep('processing');
    if (isFree) { setTimeout(() => setStep('success'), 900); return; }
    try {
      await loadSnapScript(MIDTRANS_CLIENT_KEY, MIDTRANS_SNAP_URL);
      const { token } = await simulateBackend({ ...form, price, templateId: selectedTemplate?.id });
      if (token === 'DEMO_TOKEN') { setTimeout(() => setStep('success'), 1200); return; }
      window.snap.pay(token, {
        onSuccess: () => setStep('success'),
        onPending: () => setStep('success'),
        onError:   () => setStep('error'),
        onClose:   () => setStep('form'),
      });
    } catch { setStep('error'); }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setStep('form'); setErrors({}); }, 300);
  };

  if (!isOpen) return null;

  /* shared input classes */
  const inputCls = (field) => [
    'w-full px-4 py-[0.65rem] font-body text-[14px] text-charcoal bg-gray-light border-[1.5px] rounded-sm outline-none transition-colors duration-200 appearance-none',
    errors[field] ? 'border-[#e05252]' : 'border-transparent focus:border-purple-light focus:bg-white',
  ].join(' ');

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-fade-in"
      style={{ background: 'rgba(44,44,44,0.55)', backdropFilter: 'blur(6px)' }}
      onClick={e => e.target === e.currentTarget && handleClose()}
    >
      <div className="relative bg-white rounded-lg px-8 py-10 w-full max-w-[480px] max-h-[90vh] overflow-y-auto animate-slide-up">

        {/* Close */}
        <button
          onClick={handleClose}
          aria-label="Tutup"
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center bg-gray-light border-none rounded-full cursor-pointer text-[13px] text-gray-mid transition-all duration-200 hover:bg-border hover:text-charcoal"
        >✕</button>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-[10px] flex items-center justify-center text-[16px] font-semibold text-white font-display" style={{ background: 'linear-gradient(135deg, #8E4A97, #C97DB0)' }}>U</div>
          <span className="font-display text-[20px] font-medium text-charcoal">Undi<span className="text-purple">go</span></span>
        </div>

        {/* ── FORM ── */}
        {step === 'form' && (
          <>
            <h2 className="font-display text-[24px] font-normal text-charcoal mb-1">
              {selectedTemplate ? `Pesan — ${selectedTemplate.name}` : 'Buat Undangan'}
            </h2>
            <p className="text-[13.5px] font-light text-gray-mid mb-7 leading-[1.6]">
              Isi data di bawah. Email digunakan untuk mengirim akses undangan.
            </p>

            {/* Nama */}
            <div className="flex flex-col gap-[5px] mb-[1.1rem]">
              <label className="text-[13px] font-medium text-charcoal">Nama Lengkap *</label>
              <input type="text" placeholder="cth. Dewi Rahayu" value={form.name}
                onChange={e => handleChange('name', e.target.value)} className={inputCls('name')} />
              {errors.name && <span className="text-[12px] text-[#e05252]">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-[5px] mb-[1.1rem]">
              <label className="text-[13px] font-medium text-charcoal">Email *</label>
              <input type="email" placeholder="email@kamu.com" value={form.email}
                onChange={e => handleChange('email', e.target.value)} className={inputCls('email')} />
              {errors.email && <span className="text-[12px] text-[#e05252]">{errors.email}</span>}
              <span className="text-[12px] text-gray-mid flex items-center gap-1">
                <Mail size={11} className="inline" /> Link undangan dikirim ke email ini
              </span>
            </div>

            {/* Jenis Acara */}
            <div className="flex flex-col gap-[5px] mb-[1.1rem]">
              <label className="text-[13px] font-medium text-charcoal">Jenis Acara *</label>
              <select value={form.eventType} onChange={e => handleChange('eventType', e.target.value)} className={inputCls('eventType')}>
                <option value="">Pilih jenis acara</option>
                <option value="wedding">Pernikahan</option>
                <option value="khitanan">Khitanan</option>
                <option value="birthday">Ulang Tahun</option>
                <option value="aqiqah">Aqiqah</option>
                <option value="corporate">Corporate Event</option>
              </select>
              {errors.eventType && <span className="text-[12px] text-[#e05252]">{errors.eventType}</span>}
            </div>

            {/* Plan Toggle */}
            <div className="flex flex-col gap-[5px] mb-[1.1rem]">
              <label className="text-[13px] font-medium text-charcoal">Pilih Paket</label>
              <div className="grid grid-cols-2 gap-[0.6rem] mt-0.5">
                {PLANS.map(p => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => handleChange('plan', p.key)}
                    className={[
                      'relative border-[1.5px] rounded-md px-[0.85rem] py-4 bg-white cursor-pointer flex flex-col items-start gap-[3px] transition-all duration-[250ms] text-left',
                      form.plan === p.key
                        ? 'border-purple shadow-[0_0_0_1px_#8E4A97] ' + (p.popular ? 'bg-gradient-to-br from-[rgba(142,74,151,0.06)] to-[rgba(201,125,176,0.06)]' : 'bg-[rgba(142,74,151,0.04)]')
                        : 'border-border hover:border-purple-light',
                    ].join(' ')}
                  >
                    {p.popular && (
                      <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-purple rounded-full shadow-[0_0_0_3px_rgba(142,74,151,0.15)]" style={{ animation: 'popDot 2s ease-in-out infinite' }} />
                    )}
                    <span className={`text-[13px] font-semibold tracking-[0.3px] ${form.plan === p.key ? 'text-purple' : 'text-charcoal'}`}>{p.label}</span>
                    <span className={`font-display text-[20px] font-normal leading-none ${form.plan === p.key && p.popular ? 'text-purple' : 'text-charcoal'}`}>
                      {p.price === 0 ? 'Gratis' : `Rp ${p.price.toLocaleString('id-ID')}`}
                    </span>
                    <span className="text-[11px] text-gray-mid flex items-center gap-[3px]">
                      {p.popular ? <Infinity size={11} className="inline" /> : <Timer size={11} className="inline" />} {p.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between px-4 py-[0.9rem] bg-gray-light rounded-sm mb-5 text-[14px]">
              <span className="text-charcoal">Total Pembayaran</span>
              <strong className={`font-display text-[18px] font-normal ${isFree ? 'text-sage-deeper' : 'text-purple'}`}>
                {isFree ? 'Gratis' : formatRupiah(price)}
              </strong>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="w-full py-[0.9rem] font-body text-[15px] font-medium text-white border-none rounded-[36px] cursor-pointer transition-all duration-[250ms] shadow-[0_6px_20px_rgba(142,74,151,0.28)] hover:-translate-y-px hover:shadow-[0_10px_30px_rgba(142,74,151,0.36)] flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #8E4A97, #6B3572)' }}
            >
              {isFree ? 'Buat Undangan Gratis' : <><Lock size={14} /> Bayar via Midtrans</>}
            </button>

            <p className="text-[11.5px] text-gray-mid text-center mt-[0.9rem] leading-[1.6]">
              Dengan melanjutkan, kamu menyetujui{' '}
              <a href="#" className="text-purple no-underline">Syarat & Ketentuan</a> dan{' '}
              <a href="#" className="text-purple no-underline">Kebijakan Privasi</a> Undigo.
            </p>

            {!isFree && (
              <div className="flex flex-wrap gap-[0.4rem] justify-center mt-4">
                {['QRIS', 'GoPay', 'OVO', 'Dana', 'BCA', 'Mandiri'].map(b => (
                  <span key={b} className="text-[10.5px] font-semibold text-gray-mid bg-gray-light px-[10px] py-[3px] rounded-full tracking-[0.3px]">{b}</span>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── PROCESSING ── */}
        {step === 'processing' && (
          <div className="flex flex-col items-center text-center gap-3 py-4">
            <div className="w-[52px] h-[52px] rounded-full border-[3px] border-gray-light border-t-purple" style={{ animation: 'spin 0.8s linear infinite' }} />
            <h3 className="font-display text-[22px] font-normal text-charcoal">{isFree ? 'Menyiapkan Undangan…' : 'Memproses Pembayaran…'}</h3>
            <p className="text-[14px] text-gray-mid leading-[1.7] max-w-[300px]">Tunggu sebentar, kami sedang menyiapkan undanganmu.</p>
          </div>
        )}

        {/* ── SUCCESS ── */}
        {step === 'success' && (
          <div className="flex flex-col items-center text-center gap-3 py-4">
            <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center text-[26px] text-sage-deeper" style={{ background: 'linear-gradient(135deg, #DCE7D7, #B8CEAF)' }}>✓</div>
            <h3 className="font-display text-[22px] font-normal text-charcoal">{isFree ? 'Undangan Siap!' : 'Pembayaran Berhasil!'}</h3>
            <p className="text-[14px] text-gray-mid leading-[1.7] max-w-[300px]">
              Cek email <strong>{form.email}</strong> untuk link undanganmu.
              {!isFree && <><br />Testimoni terbaikmu bisa tampil di halaman utama Undigo!</>}
            </p>
            <button onClick={handleClose} className="mt-4 w-full py-[0.9rem] font-body text-[15px] font-medium text-white border-none rounded-[36px] cursor-pointer transition-all duration-[250ms] shadow-[0_6px_20px_rgba(142,74,151,0.28)] hover:-translate-y-px"
              style={{ background: 'linear-gradient(135deg, #8E4A97, #6B3572)' }}>Tutup</button>
          </div>
        )}

        {/* ── ERROR ── */}
        {step === 'error' && (
          <div className="flex flex-col items-center text-center gap-3 py-4">
            <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center text-[22px] text-[#e05252] bg-[rgba(224,82,82,0.1)]">✕</div>
            <h3 className="font-display text-[22px] font-normal text-charcoal">Terjadi Kesalahan</h3>
            <p className="text-[14px] text-gray-mid leading-[1.7] max-w-[300px]">Maaf, pembayaran gagal diproses. Silakan coba lagi.</p>
            <button onClick={() => setStep('form')} className="mt-4 w-full py-[0.9rem] font-body text-[15px] font-medium text-white border-none rounded-[36px] cursor-pointer transition-all duration-[250ms] shadow-[0_6px_20px_rgba(142,74,151,0.28)] hover:-translate-y-px"
              style={{ background: 'linear-gradient(135deg, #8E4A97, #6B3572)' }}>Coba Lagi</button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes popDot {
          0%, 100% { box-shadow: 0 0 0 3px rgba(142,74,151,0.15); }
          50% { box-shadow: 0 0 0 6px rgba(142,74,151,0.08); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
