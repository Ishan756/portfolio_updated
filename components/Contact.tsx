'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-heading',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      );
      gsap.fromTo('.contact-socials',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.4,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      );
    }, sectionRef);
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="contact" id="contact">
      <div className="contact-left">
        <h2 className="contact-heading">Contact</h2>
        <div className="contact-socials">
          <a href="https://github.com/Ishan756" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/ishan-mishra-12b72927a/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:ishanmishra756@gmail.com">ishanmishra756@gmail.com</a>
        </div>
      </div>
      <div className="contact-right">
        <p className="contact-desc">
          Open to <em>Internships</em> ,full time roles and exciting collaborations.
          I build fast, scalable products with modern stacks and AI integrations.
        </p>
        <div className="contact-img">
          <Image
            src="/images/Screenshot 2026-06-03 063700.png"
            alt="Contact"
            fill
            sizes="(max-width: 900px) 100vw, 45vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </section>
  );
}
