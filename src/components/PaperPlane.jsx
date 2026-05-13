import { useEffect, useRef } from 'react';

// Flight path: smooth flowing waves
function getFlightPos(pct) {
  const xBase = -8 + pct * 116;
  const yBase =
    38 +
    Math.sin(pct * Math.PI * 2.8 + 0.4) * 20 +
    Math.sin(pct * Math.PI * 5.2 + 1.1) * 8 +
    Math.sin(pct * Math.PI * 9.0 + 2.3) * 3;
  const xDrift =
    Math.sin(pct * Math.PI * 3.5 + 0.7) * 5 +
    Math.sin(pct * Math.PI * 6.8 + 1.9) * 2;
  return { x: xBase + xDrift, y: yBase };
}

const TRAIL_LEN = 55;

export default function PaperPlane() {
  const smoothRef    = useRef({ x: -8, y: 15, angle: 5 });
  const trailRef     = useRef([]);
  const frameRef     = useRef(null);
  const planeRef     = useRef(null);
  const pathRef      = useRef(null);
  const glowPathRef  = useRef(null);
  const opacityRef   = useRef(1);
  const lastPctRef   = useRef(0);
  const dirRef       = useRef(1);

  useEffect(() => {
    const SPRING_ANGLE = 0.10;

    const tick = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const pct = scrollTop / maxScroll;

      if (pct !== lastPctRef.current) {
        dirRef.current = pct > lastPctRef.current ? 1 : -1;
        lastPctRef.current = pct;
      }
      const dir = dirRef.current;

      const raw = getFlightPos(pct);
      const vw = window.innerWidth, vh = window.innerHeight;

      const s = smoothRef.current;
      s.x = (raw.x / 100) * vw;
      s.y = (raw.y / 100) * vh;

      const SVG_CX = 24, SVG_CY = 24;
      const NOSE_OFFSET_ANGLE = Math.atan2(-16, 20);

      const aheadPct = Math.min(pct + 0.015, 1);
      const ahead = getFlightPos(aheadPct);
      const aheadX = (ahead.x / 100) * vw;
      const aheadY = (ahead.y / 100) * vh;
      const forwardAngle = Math.atan2(aheadY - s.y, aheadX - s.x);
      const travelAngle = dir === 1 ? forwardAngle : forwardAngle + Math.PI;
      const targetAngleDeg = (travelAngle - NOSE_OFFSET_ANGLE) * (180 / Math.PI);
      s.angle += (targetAngleDeg - s.angle) * SPRING_ANGLE;

      opacityRef.current = pct > 0.82 ? Math.max(0, 1 - (pct - 0.82) / 0.18) : 1;

      const angleRad = (s.angle * Math.PI) / 180;
      const trailLocalX = dir === 1 ? -1  : 20;
      const trailLocalY = dir === 1 ?  3  : -16;
      const tailX = s.x + trailLocalX * Math.cos(angleRad) - trailLocalY * Math.sin(angleRad);
      const tailY = s.y + trailLocalX * Math.sin(angleRad) + trailLocalY * Math.cos(angleRad);

      trailRef.current.push({ x: tailX, y: tailY });
      if (trailRef.current.length > TRAIL_LEN) trailRef.current.shift();

      if (planeRef.current) {
        planeRef.current.style.transform =
          `translate(${s.x - SVG_CX}px, ${s.y - SVG_CY}px) rotate(${s.angle}deg)`;
        planeRef.current.style.opacity = opacityRef.current;
      }

      // Build smooth bezier trail path
      if (trailRef.current.length > 2) {
        const pts = trailRef.current;
        let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
        for (let i = 1; i < pts.length; i++) {
          if (i < pts.length - 1) {
            const mx = (pts[i].x + pts[i + 1].x) / 2;
            const my = (pts[i].y + pts[i + 1].y) / 2;
            d += ` Q ${pts[i].x.toFixed(2)} ${pts[i].y.toFixed(2)} ${mx.toFixed(2)} ${my.toFixed(2)}`;
          } else {
            d += ` L ${pts[i].x.toFixed(2)} ${pts[i].y.toFixed(2)}`;
          }
        }
        if (pathRef.current) {
          pathRef.current.setAttribute('d', d);
          pathRef.current.style.opacity = opacityRef.current * 0.5;
        }
        if (glowPathRef.current) {
          glowPathRef.current.setAttribute('d', d);
          glowPathRef.current.style.opacity = opacityRef.current * 0.18;
        }
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0,
      width: '100vw', height: '100vh',
      pointerEvents: 'none', zIndex: 10,
      overflow: 'hidden',
    }}>

      {/* Trail SVG */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <defs>
          {/* Main trail gradient */}
          <linearGradient id="trailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="rgba(142,74,151,0)"   />
            <stop offset="50%"  stopColor="rgba(196,155,203,0.5)" />
            <stop offset="100%" stopColor="rgba(201,125,176,0.85)" />
          </linearGradient>

          {/* Glow trail (thicker, blurred via filter) */}
          <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="rgba(142,74,151,0)"   />
            <stop offset="60%"  stopColor="rgba(196,155,203,0.6)" />
            <stop offset="100%" stopColor="rgba(230,100,220,0.9)" />
          </linearGradient>

          <filter id="trailBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>

          {/* Plane drop shadow filter */}
          <filter id="planeShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(142,74,151,0.35)" />
          </filter>

          {/* Plane glow filter */}
          <filter id="planeGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Glow layer (fat + blurred) */}
        <path
          ref={glowPathRef}
          fill="none"
          stroke="url(#glowGrad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#trailBlur)"
        />

        {/* Main dashed trail */}
        <path
          ref={pathRef}
          fill="none"
          stroke="url(#trailGrad)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="5 7"
        />
      </svg>

      {/* Paper plane SVG */}
      <div
        ref={planeRef}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          transformOrigin: '24px 24px',
          willChange: 'transform',
          filter: 'drop-shadow(0 2px 6px rgba(142,74,151,0.4)) drop-shadow(0 0 12px rgba(196,155,203,0.3))',
        }}
      >
        <svg
          width="48" height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block' }}
        >
          {/* Main body — white with subtle purple tint */}
          <path
            d="M 3 24 L 44 7 L 30 42 L 23 27 Z"
            fill="white"
            stroke="rgba(142,74,151,0.75)"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />

          {/* Inner body shading — gives depth */}
          <path
            d="M 23 27 L 44 7 L 34 28 Z"
            fill="rgba(196,155,203,0.2)"
          />

          {/* Center crease */}
          <path
            d="M 23 27 L 44 7"
            stroke="rgba(142,74,151,0.3)"
            strokeWidth="0.9"
            strokeLinecap="round"
          />

          {/* Bottom flap — sage green accent */}
          <path
            d="M 23 27 L 30 42 L 25 29 Z"
            fill="rgba(220,231,215,0.95)"
            stroke="rgba(127,168,122,0.7)"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />

          {/* Left wing underside — pink accent */}
          <path
            d="M 3 24 L 23 27 L 17 20 Z"
            fill="rgba(230,179,211,0.55)"
          />

          {/* Nose highlight — tiny white glint */}
          <circle
            cx="43" cy="7.5"
            r="1.2"
            fill="rgba(255,255,255,0.9)"
            opacity="0.7"
          />
        </svg>
      </div>
    </div>
  );
}
