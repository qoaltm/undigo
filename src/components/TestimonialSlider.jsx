import { useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { TESTIMONIALS } from '../data';

// CSS variables diganti nilai literal sesuai tailwind.config.js
const AVATAR_COLORS = {
  'av-1': { bg: 'rgba(220,231,215,1)',    color: '#7FA87A' },  // sage / sage-deeper
  'av-2': { bg: 'rgba(230,179,211,0.4)',  color: '#C97DB0' },  // pink-dark
  'av-3': { bg: 'rgba(142,74,151,0.1)',   color: '#8E4A97' },  // purple
  'av-4': { bg: 'rgba(220,231,215,0.5)',  color: '#7FA87A' },  // sage-deeper
  'av-5': { bg: 'rgba(230,179,211,0.3)',  color: '#C97DB0' },  // pink-dark
  'av-6': { bg: 'rgba(142,74,151,0.12)',  color: '#8E4A97' },  // purple
};

function TestiCard({ t }) {
  const colors = AVATAR_COLORS[t.avatarClass] || AVATAR_COLORS['av-1'];
  return (
    <div className="
      relative w-[360px] flex-shrink-0
      bg-white border border-border rounded-lg
      p-7 cursor-pointer
      transition-all duration-300
      hover:shadow-md hover:border-[rgba(142,74,151,0.18)] hover:-translate-y-[3px]
    ">
      {/* Quote mark */}
      <div className="absolute top-4 right-[22px] font-display text-[60px] leading-none font-light pointer-events-none text-[rgba(220,231,215,0.65)]">
        "
      </div>

      {/* Stars */}
      <div className="text-[#f59e0b] text-[14px] mb-[0.85rem] tracking-[2px]">
        {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
      </div>

      {/* Text */}
      <div className="font-display text-[15px] font-light italic text-charcoal leading-[1.7] mb-5">
        "{t.text}"
      </div>

      {/* Author */}
      <div className="flex items-center gap-2.5">
        <div
          className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-display text-[15px] font-medium"
          style={{ background: colors.bg, color: colors.color }}
        >
          {t.initials}
        </div>
        <div>
          <div className="text-[14px] font-medium text-charcoal">{t.name}</div>
          <div className="text-[12px] text-gray-mid">{t.event}</div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialSlider({ allTestimonials }) {
  const items = [...(allTestimonials || []), ...TESTIMONIALS];
  const doubled = [...items, ...items];

  const controls = useAnimationControls();
  const isPaused = useRef(false);

  // 360px card + 24px gap = 384px per card
  const cardW = 384;
  const totalW = items.length * cardW;

  const startScroll = () => {
    if (isPaused.current) return;
    controls.start({
      x: [0, -totalW],
      transition: {
        x: {
          duration: items.length * 5.5,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        },
      },
    });
  };

  const hasStarted = useRef(false);
  if (!hasStarted.current) {
    hasStarted.current = true;
    setTimeout(() => startScroll(), 0);
  }

  const handleMouseEnter = () => {
    isPaused.current = true;
    controls.stop();
  };
  const handleMouseLeave = () => {
    isPaused.current = false;
    startScroll();
  };

  return (
    <div className="relative overflow-hidden mt-12 py-2 pb-4 cursor-default">

      {/* Fade mask kiri */}
      <div className="absolute top-0 bottom-0 left-0 w-[120px] z-[2] pointer-events-none
        bg-gradient-to-r from-[#FAF8F5] to-transparent
        max-sm:w-[60px]"
      />

      {/* Fade mask kanan */}
      <div className="absolute top-0 bottom-0 right-0 w-[120px] z-[2] pointer-events-none
        bg-gradient-to-l from-[#FAF8F5] to-transparent
        max-sm:w-[60px]"
      />

      {/* Ticker track */}
      <motion.div
        className="flex gap-6 w-max"
        animate={controls}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ x: 0 }}
      >
        {doubled.map((t, i) => (
          <TestiCard key={`${t.id}-${i}`} t={t} />
        ))}
      </motion.div>
    </div>
  );
}
