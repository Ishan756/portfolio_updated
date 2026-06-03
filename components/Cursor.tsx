'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    let mx = 0, my = 0, rx = 0, ry = 0;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dot) gsap.to(dot, { x: mx, y: my, duration: 0.08, ease: 'none' });
    };

    const tick = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      if (ring) gsap.set(ring, { x: rx, y: ry });
      rafId = requestAnimationFrame(tick);
    };

    const onEnter = () => { if (dot) dot.classList.add('is-hovering'); if (ring) ring.classList.add('is-hovering'); };
    const onLeave = () => { if (dot) dot.classList.remove('is-hovering'); if (ring) ring.classList.remove('is-hovering'); };

    window.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(tick);

    const els = Array.from(document.querySelectorAll('a, button, [data-hover]'));
    els.forEach(el => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave); });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      // Safely remove event listeners with try-catch
      els.forEach(el => { 
        try {
          if (el && document.body.contains(el)) {
            el.removeEventListener('mouseenter', onEnter); 
            el.removeEventListener('mouseleave', onLeave); 
          }
        } catch (e) {
          // Ignore errors during cleanup
        }
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
