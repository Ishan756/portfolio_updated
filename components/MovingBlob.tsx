'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function MovingBlob() {
  const blobRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = blobRef.current;
    if (!el) return;

    // Smoothly follow cursor with GSAP
    const handleMove = (e: MouseEvent) => {
      try {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        // stronger parallax multipliers for a noticeable follow
        const offsetX = (e.clientX - vw / 2) * 0.08;
        const offsetY = (e.clientY - vh / 2) * 0.06;
        // snappier follow so it feels responsive
        gsap.to(el, { x: offsetX, y: offsetY, duration: 0.45, ease: 'power3.out' });
      } catch (err) {
        // Ignore errors during cleanup
      }
    };

    window.addEventListener('mousemove', handleMove);

    // gentle floating/drift animation — use scale/rotation so it doesn't conflict with cursor-driven position
    const floatTween = gsap.to(el, {
      scale: 1.02,
      rotation: 1.5,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      try {
        floatTween.kill();
      } catch (err) {
        // Ignore errors during cleanup
      }
    };
  }, []);

  return <div ref={blobRef} className="moving-blob" />;
}
