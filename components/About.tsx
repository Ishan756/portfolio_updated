'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Blur-to-clear reveal on scroll ──
      gsap.to(sectionRef.current, {
        filter: 'blur(0px)',
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 95%',
          end: 'top 40%',
          scrub: 0.6,
        },
      });

      gsap.fromTo('.about-heading',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      );
      gsap.fromTo('.about-body',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' } }
      );
      gsap.fromTo('.about-photo-frame',
        { opacity: 0, scale: 0.9, x: 80, y: 30, filter: 'blur(14px)', clipPath: 'inset(8% 8% 8% 8% round 1.6rem)' },
        { opacity: 1, scale: 1, x: 0, y: 0, filter: 'blur(0px)', clipPath: 'inset(0% 0% 0% 0% round 1.6rem)', duration: 1.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      );
    }, sectionRef);
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="about" id="about">
      <div className="about-left">
        <h2 className="about-heading">
          I'm a full-stack engineer working across SaaS platforms, AI systems, and cloud infrastructure.
        </h2>
        <p className="about-age">(24)</p>

        <p className="about-body">
          My name is Ishan and my work includes backend architecture, AI integration, GenAI workflows by LangChain , modern LLM tooling and from containerization and CI/CD to deployment, monitoring, and long-term system reliability.
        </p>
      </div>

      <div className="about-right">
        <div className="about-photo-frame">
          <Image
            src="/images/hero_image.png"
            alt="Portrait"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 42vw"
            className="about-photo"
          />
        </div>
      </div>

      <span className="about-side-label">About</span>
    </section>
  );
}
