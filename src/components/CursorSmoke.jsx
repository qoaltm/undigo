import { useEffect, useRef } from 'react';

const COLORS = [
  { r: 142, g:  74, b: 151 },
  { r: 196, g: 155, b: 203 },
  { r: 201, g: 125, b: 176 },
  { r: 230, g: 179, b: 211 },
  { r: 220, g: 180, b: 230 },
];

export default function CursorSmoke() {
  const canvasRef  = useRef(null);
  const rafRef     = useRef(null);
  const smokeRef   = useRef([]);
  const prevRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');

    // Offscreen — semua partikel dikumpulkan di sini dulu
    const off    = document.createElement('canvas');
    const offCtx = off.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      off.width     = window.innerWidth;
      off.height    = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      const cx = e.clientX;
      const cy = e.clientY;

      if (!prevRef.current) {
        prevRef.current = { x: cx, y: cy };
        return;
      }

      const dvx   = cx - prevRef.current.x;
      const dvy   = cy - prevRef.current.y;
      const speed = Math.sqrt(dvx * dvx + dvy * dvy);

      if (speed < 1.5) {
        prevRef.current = { x: cx, y: cy };
        return;
      }

      const angle = Math.atan2(dvy, dvx);
      const count = Math.min(2 + Math.floor(speed / 10), 6);

      for (let i = 0; i < count; i++) {
        const c         = COLORS[Math.floor(Math.random() * COLORS.length)];
        const puffSpeed = speed * 0.35 + Math.random() * 3 + 2;
        const spread    = (Math.random() - 0.5) * 0.55;
        const puffAngle = angle + spread;

        smokeRef.current.push({
          x:        cx + (Math.random() - 0.5) * 6,
          y:        cy + (Math.random() - 0.5) * 6,
          vx:       Math.cos(puffAngle) * puffSpeed,
          vy:       Math.sin(puffAngle) * puffSpeed,
          size:     Math.random() * 12 + 6,
          growRate: Math.random() * 1.8 + 0.8,
          alpha:    Math.random() * 0.35 + 0.2,
          decay:    Math.random() * 0.006 + 0.003,
          color:    c,
          drag:     0.974,
          wobble:   (Math.random() - 0.5) * 0.08,
        });
      }

      if (smokeRef.current.length > 300) {
        smokeRef.current.splice(0, smokeRef.current.length - 300);
      }

      prevRef.current = { x: cx, y: cy };
    };

    window.addEventListener('mousemove', onMove);

    const draw = () => {
      smokeRef.current = smokeRef.current.filter(p => p.alpha > 0.004);

      // 1. Gambar semua partikel ke offscreen canvas (tanpa blur, tanpa filter)
      offCtx.clearRect(0, 0, off.width, off.height);

      for (const p of smokeRef.current) {
        // Update physics
        p.vx = p.vx * p.drag + p.wobble;
        p.vy = p.vy * p.drag + p.wobble;
        p.x += p.vx;
        p.y += p.vy;
        p.size    += p.growRate;
        p.growRate *= 0.97;
        p.alpha   -= p.decay;

        const { r, g, b } = p.color;
        const s = p.size;

        const grad = offCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, s);
        grad.addColorStop(0,   `rgba(${r},${g},${b},${p.alpha.toFixed(3)})`);
        grad.addColorStop(0.3, `rgba(${r},${g},${b},${(p.alpha * 0.7).toFixed(3)})`);
        grad.addColorStop(0.7, `rgba(${r},${g},${b},${(p.alpha * 0.25).toFixed(3)})`);
        grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);

        offCtx.save();
        offCtx.globalCompositeOperation = 'source-over';
        offCtx.fillStyle = grad;
        offCtx.beginPath();
        offCtx.arc(p.x, p.y, s, 0, Math.PI * 2);
        offCtx.fill();
        offCtx.restore();
      }

      // 2. Composite offscreen ke main canvas dengan blur RINGAN saja
      //    Cukup untuk menyatukan partikel yang berdekatan tanpa ngelag / warna berubah
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.filter = 'blur(12px)';
      ctx.globalCompositeOperation = 'screen';
      ctx.drawImage(off, 0, 0);
      ctx.restore();

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'fixed',
        inset:         0,
        pointerEvents: 'none',
        zIndex:        9999,
      }}
    />
  );
}
