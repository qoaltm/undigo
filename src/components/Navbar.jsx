import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    if (!isHome) return;
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <>
      <nav
        id="navbar"
        className={[
          'fixed top-0 left-0 right-0 z-[100]',
          'px-8 grid items-center',
          'grid-cols-[1fr_auto_1fr]',
          'bg-[rgba(250,248,245,0.85)] backdrop-blur-xl',
          'border-b border-[rgba(220,231,215,0.4)]',
          'transition-all duration-400',
          scrolled
            ? 'h-[60px] bg-[rgba(250,248,245,0.97)] shadow-[0_4px_24px_rgba(142,74,151,0.08)]'
            : 'h-[68px]',
        ].join(' ')}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 no-underline justify-self-start">
          <div className="w-9 h-9 rounded-[10px] flex items-center justify-center bg-gradient-to-br from-purple to-pink-dark font-display text-lg font-semibold text-white tracking-[-0.5px]">
            U
          </div>
          <span className="font-display text-[22px] font-medium text-charcoal tracking-[0.5px]">
            Undi<span className="text-purple">go</span>
          </span>
        </Link>

        {/* Nav links — tengah */}
        <ul className="hidden md:flex items-center gap-1 list-none justify-self-center">
          {[
            { label: 'Template',   to: '/katalog' },
            { label: 'Harga',      id: 'pricing', to: '/#pricing' },
            { label: 'Cara Kerja', id: 'how',     to: '/#how' },
            { label: 'FAQ',        id: 'faq',     to: '/#faq' },
          ].map(({ label, to, id }) => (
            <li key={label}>
              {id && isHome ? (
                <a
                  href={`#${id}`}
                  onClick={() => scrollTo(id)}
                  className="text-sm font-normal text-charcoal-soft no-underline px-3.5 py-2 rounded-[10px] transition-all duration-200 hover:text-purple hover:bg-[rgba(142,74,151,0.06)]"
                >
                  {label}
                </a>
              ) : (
                <Link
                  to={to}
                  className="text-sm font-normal text-charcoal-soft no-underline px-3.5 py-2 rounded-[10px] transition-all duration-200 hover:text-purple hover:bg-[rgba(142,74,151,0.06)]"
                >
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Actions — hanya Lihat Template */}
        <div className="flex items-center gap-3 justify-self-end">
          <Link
            to="/katalog"
            className="hidden md:inline-flex items-center gap-2 px-[1.3rem] py-[0.55rem] text-[13.5px] font-medium text-white border-none rounded-[36px] no-underline transition-all duration-200 shadow-[0_4px_16px_rgba(142,74,151,0.28)] hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(142,74,151,0.36)]"
            style={{ background: 'linear-gradient(135deg, #8E4A97, #6B3572)' }}
          >
            ✦ Lihat Template
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="flex md:hidden bg-transparent border-none cursor-pointer p-1"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Menu"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect y="4"  width="22" height="2" rx="1" fill="#2C2C2C"/>
              <rect y="10" width="22" height="2" rx="1" fill="#2C2C2C"/>
              <rect y="16" width="22" height="2" rx="1" fill="#2C2C2C"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed top-[68px] left-0 right-0 z-[99] flex flex-col gap-2 px-8 pt-4 pb-6 bg-[rgba(250,248,245,0.98)] backdrop-blur-xl border-b border-border">
          <Link to="/katalog" onClick={() => setMobileOpen(false)} className="text-[15px] text-charcoal-soft no-underline py-2.5">Template</Link>
          <a href="#pricing" onClick={() => scrollTo('pricing')} className="text-[15px] text-charcoal-soft no-underline py-2.5">Harga</a>
          <a href="#how"     onClick={() => scrollTo('how')}     className="text-[15px] text-charcoal-soft no-underline py-2.5">Cara Kerja</a>
          <a href="#faq"     onClick={() => scrollTo('faq')}     className="text-[15px] text-charcoal-soft no-underline py-2.5">FAQ</a>
          <Link
            to="/katalog"
            onClick={() => setMobileOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-1.5 px-[1.3rem] py-[0.55rem] text-[13.5px] font-medium text-white border-none rounded-[36px] no-underline transition-all duration-200 shadow-[0_4px_16px_rgba(142,74,151,0.28)]"
            style={{ background: 'linear-gradient(135deg, #8E4A97, #6B3572)' }}
          >
            ✦ Lihat Template
          </Link>
        </div>
      )}
    </>
  );
}
