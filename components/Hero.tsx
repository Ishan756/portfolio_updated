'use client';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const nameBlockRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLSpanElement>(null);
  const lastRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const fullstackTextRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      // ── Initial load animation ──
      const chars = Array.from(heroRef.current?.querySelectorAll('.char') || []) as HTMLElement[];
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      gsap.set(nameBlockRef.current, { y: '-38vh' });
      gsap.set(chars, { y: '120%', opacity: 0 });
      gsap.set(introTextRef.current, { opacity: 0, filter: 'blur(18px)', scale: 1.04 });
      gsap.set(fullstackTextRef.current, { opacity: 0, y: 30 });

      tl.to('.intro-panel.left', { x: '-110%', duration: 0.9, ease: 'power4.inOut' }, 0)
        .to('.intro-panel.right', { x: '110%', duration: 0.9, ease: 'power4.inOut' }, 0)
        .to(chars, { y: '0%', opacity: 1, duration: 0.8, stagger: 0.04, ease: 'power3.out' }, '-=0.5')
        .to(nameBlockRef.current, { y: '0%', duration: 1.1, ease: 'power3.inOut', delay: 0.3 })
        .fromTo(taglineRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.0 }, '-=0.6')
        .fromTo(barRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.8');

      // ── Scroll-driven: names slide out, "Basically I make websites" appears, then "I'm a full stack engineer" ──
      const heroEl = heroRef.current;
      if (!heroEl) return;

      // Phase 1: Names slide away + "Basically I make websites" fades in from blur
      const st1 = ScrollTrigger.create({
        trigger: heroEl,
        start: 'top top',
        end: '+=120%',
        scrub: 1.2,
        pin: true,
        onUpdate: (self) => {
          const p = self.progress;

          // Names: slide out from 0–0.35
          if (firstRef.current && lastRef.current) {
            const slideProgress = Math.min(p / 0.35, 1);
            const eased = slideProgress < 0.5
              ? 2 * slideProgress * slideProgress
              : 1 - Math.pow(-2 * slideProgress + 2, 2) / 2;
            gsap.set(firstRef.current, { x: `${-eased * 120}vw` });
            gsap.set(lastRef.current, { x: `${eased * 120}vw` });
          }

          // "Basically I make websites": appear from 0.2–0.55, disappear 0.55–0.75
          if (introTextRef.current) {
            let opacity = 0;
            let blur = 18;
            let scale = 1.04;

            if (p >= 0.2 && p <= 0.55) {
              const t = (p - 0.2) / 0.35;
              opacity = t;
              blur = 18 * (1 - t);
              scale = 1.04 - 0.04 * t;
            } else if (p > 0.55 && p <= 0.75) {
              const t = (p - 0.55) / 0.2;
              opacity = 1 - t;
              blur = t * 12;
              scale = 1 - t * 0.03;
            }

            gsap.set(introTextRef.current, { opacity, filter: `blur(${blur}px)`, scale });
          }

          // "I'm a full stack engineer": appear from 0.72 onward
          if (fullstackTextRef.current) {
            let opacity = 0;
            let y = 30;
            if (p >= 0.72) {
              const t = Math.min((p - 0.72) / 0.2, 1);
              opacity = t;
              y = 30 * (1 - t);
            }
            gsap.set(fullstackTextRef.current, { opacity, y });
          }
        },
      });

    }, heroRef);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section ref={heroRef} className="hero">
      <div className="intro-panel left" />
      <div className="intro-panel right" />
      <div className="hero-blob" />
      <div className="hero-blob-2" />

      {/* "Basically I make websites" — scroll-driven, centred */}
      <div ref={introTextRef} className="hero-scroll-text hero-scroll-text--main">
        Basically I make websites
      </div>

      {/* "I'm a full stack engineer" — appears after */}
      <div ref={fullstackTextRef} className="hero-scroll-text hero-scroll-text--sub">
        I&apos;m a full stack engineer
      </div>

      <div ref={taglineRef} className="hero-tagline">
        Quiet creator, <em>bringing ideas to life,</em><br />
        through motion, detail and softness.
      </div>

      <div ref={nameBlockRef} className="hero-name">
        <span ref={firstRef} className="hero-first">
          {"Ishan".split("").map((ch, i) => (
            <span key={i} className="char">{ch}</span>
          ))}
        </span>
        <span ref={lastRef} className="hero-last">
          {"Mishra".split("").map((ch, i) => (
            <span key={i} className="char">{ch === ' ' ? '\u00A0' : ch}</span>
          ))}
        </span>
      </div>

      <div ref={barRef} className="hero-bar">
        <span className="hero-bar-left">→ V1.0</span>
        <div className="hero-bar-center">
          <a href="https://github.com/Ishan756" target="_blank" rel="noreferrer">GitHub</a>
          <span>/</span>
          <a href="https://www.linkedin.com/in/ishan-mishra-12b72927a/" target="_blank" rel="noreferrer">LinkedIn</a>
          <span>/</span>
          <a href="mailto:ishanmishra756@gmail.com">Gmail</a>
        </div>
        <nav className="hero-bar-right">
          <a href="/projects">Work</a>
          <a href="#about">Info</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </section>
  );
}
