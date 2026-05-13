import { Link } from 'react-router-dom';
import { MessageCircle, Mail, Clock } from 'lucide-react';

const IgIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
  </svg>
);

const TikTokIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
  </svg>
);

const YtIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="4"/>
    <polygon points="10,9 16,12 10,15" fill="currentColor" stroke="none"/>
  </svg>
);

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#2C2C2C' }} className="px-8 pt-16 pb-8">

      {/* Grid */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 gap-8 mb-12 md:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1.2fr] lg:gap-12">

        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2.5 no-underline mb-4">
            <div className="w-9 h-9 rounded-[10px] flex items-center justify-center font-display text-lg font-semibold text-white tracking-[-0.5px]"
              style={{ background: 'linear-gradient(135deg, #8E4A97, #C97DB0)' }}>
              U
            </div>
            <span className="font-display text-[22px] font-medium tracking-[0.5px] text-white">
              Undi<span style={{ color: '#F2D5E9' }}>go</span>
            </span>
          </Link>
          <p className="text-[13.5px] leading-[1.7] font-light mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Platform undangan digital premium Indonesia. Buat momen spesialmu menjadi kenangan yang tak terlupakan.
          </p>
          <div className="flex gap-2.5">
            {[
              { label: 'Instagram', icon: <IgIcon /> },
              { label: 'TikTok',    icon: <TikTokIcon /> },
              { label: 'WhatsApp',  icon: <MessageCircle size={15} strokeWidth={1.8} /> },
              { label: 'YouTube',   icon: <YtIcon /> },
            ].map(({ label, icon }) => (
              <a key={label} href="#" title={label} aria-label={label}
                className="w-9 h-9 rounded-[10px] flex items-center justify-center no-underline transition-all duration-200 hover:bg-purple"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Platform */}
        <div>
          <h5 className="text-[13px] font-medium text-white mb-5 tracking-[0.5px]">Platform</h5>
          <ul className="list-none flex flex-col gap-2.5">
            {[
              { label: 'Template',   to: '/katalog' },
              { label: 'Cara Kerja', href: '#how' },
              { label: 'Harga',      href: '#pricing' },
              { label: 'Blog',       href: '#' },
              { label: 'Affiliate',  href: '#' },
            ].map(({ label, to, href }) => (
              <li key={label}>
                {to
                  ? <Link to={to} className="text-[13.5px] font-light no-underline transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</Link>
                  : <a href={href}  className="text-[13.5px] font-light no-underline transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</a>
                }
              </li>
            ))}
          </ul>
        </div>

        {/* Bantuan */}
        <div>
          <h5 className="text-[13px] font-medium text-white mb-5 tracking-[0.5px]">Bantuan</h5>
          <ul className="list-none flex flex-col gap-2.5">
            {['Pusat Bantuan', 'FAQ', 'Status Layanan', 'Kebijakan Privasi', 'Syarat & Ketentuan'].map(label => (
              <li key={label}>
                <a href={label === 'FAQ' ? '#faq' : '#'}
                  className="text-[13.5px] font-light no-underline transition-colors duration-200 hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h5 className="text-[13px] font-medium text-white mb-5 tracking-[0.5px]">Hubungi Kami</h5>
          <div className="flex flex-col gap-3.5">
            {[
              {
                icon: <MessageCircle size={14} strokeWidth={1.8} />,
                content: <>CS via WhatsApp<br /><a href="https://wa.me/6281234567890" className="no-underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.45)' }}>+62 812-3456-7890</a></>,
              },
              {
                icon: <Mail size={14} strokeWidth={1.8} />,
                content: <a href="mailto:halo@undigo.id" className="no-underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.45)' }}>halo@undigo.id</a>,
              },
              {
                icon: <Clock size={14} strokeWidth={1.8} />,
                content: <>Senin – Sabtu<br />08.00 – 21.00 WIB</>,
              },
            ].map(({ icon, content }, i) => (
              <div key={i} className="flex gap-2.5 items-start text-[13px] leading-[1.6]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                <span className="shrink-0 mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{icon}</span>
                <span>{content}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto mb-6 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />

      {/* Bottom */}
      <div className="max-w-[1200px] mx-auto flex justify-between items-center flex-wrap gap-2 text-[12.5px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
        <span>© 2026 Undigo. All Rights Reserved.</span>
        <span className="flex gap-3">
          {['Privasi', 'Ketentuan', 'Cookies'].map((label, i) => (
            <a key={i} href="#" className="no-underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.3)' }}>{label}</a>
          ))}
        </span>
      </div>
    </footer>
  );
}
