"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function InteractiveBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const redRef = useRef<HTMLDivElement | null>(null);
  const purpleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 3;
    let blob1X = mouseX;
    let blob1Y = mouseY;
    let blob2X = mouseX;
    let blob2Y = mouseY;
    let started = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      started = true;
    };

    window.addEventListener('mousemove', onMove);

    let rafId = 0;
    const tick = () => {
      if (!started) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      blob1X += (mouseX - blob1X) * 0.04;
      blob1Y += (mouseY - blob1Y) * 0.04;
      blob2X += (mouseX - blob2X) * 0.065;
      blob2Y += (mouseY - blob2Y) * 0.065;

      if (redRef.current) {
        gsap.set(redRef.current, {
          x: blob1X - window.innerWidth * 0.27,
          y: blob1Y - window.innerHeight * 0.4,
        });
      }
      if (purpleRef.current) {
        gsap.set(purpleRef.current, {
          x: blob2X - window.innerWidth * 0.1,
          y: blob2Y - window.innerHeight * 0.25,
        });
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      try {
        cancelAnimationFrame(rafId);
      } catch (err) {
        // Ignore errors during cleanup
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0a0a0a',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <div
        ref={redRef}
        style={{
          position: 'absolute',
          top: '12vh',
          left: '60vw',
          width: '55vw',
          height: '80vh',
          background:
            'radial-gradient(ellipse at center, #c0170a 0%, #8a0e0e 30%, #3d0505 65%, transparent 85%)',
          filter: 'blur(80px)',
          opacity: 0.85,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div
        ref={purpleRef}
        style={{
          position: 'absolute',
          top: '30vh',
          left: '92vw',
          width: '30vw',
          height: '55vh',
          background: 'radial-gradient(ellipse, #2a0060 0%, transparent 70%)',
          filter: 'blur(100px)',
          opacity: 0.5,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
}
