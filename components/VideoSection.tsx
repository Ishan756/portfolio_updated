'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(taglineRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }
        }
      );
    }, sectionRef);
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="video-section">
      {/*
        Replace the placeholder below with your actual video:
        <video autoPlay muted loop playsInline>
          <source src="/assets/videos/showreel.mp4" type="video/mp4" />
        </video>

        Or with an image:
        <img src="/assets/images/art/sculpture.jpg" alt="artwork" />
      */}
      <div className="video-placeholder">
        {/* Place your video or image here */}
        <span style={{ display: 'none' }}>Replace with your image or video</span>
      </div>

      {/* Corner markers */}
      <span className="video-corner-tr">+</span>
      <span className="video-corner-bl">+</span>

      <div ref={taglineRef} className="video-tagline">
        Basically, I make websites
      </div>
    </section>
  );
}
