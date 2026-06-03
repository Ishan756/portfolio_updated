'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/lib/projects';

gsap.registerPlugin(ScrollTrigger);

const featuredProjects = projects.slice(0, 5);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const snakePathRef = useRef<SVGPathElement>(null);
  const snakeSvgRef = useRef<SVGSVGElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.projects-list-item',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      );

      // Snake line: animate dashoffset based on scroll direction
      const path = snakePathRef.current;
      if (!path) return;

      const totalLength = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: totalLength,
        strokeDashoffset: 0,
      });

      // Scroll-driven snake: dashoffset changes with scroll
      gsap.to(path, {
        strokeDashoffset: -totalLength * 1.5,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.8,
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="projects" id="works">
      {/* Snake line — scroll-animated */}
      <svg
        ref={snakeSvgRef}
        className="projects-snake"
        viewBox="0 0 60 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          ref={snakePathRef}
          d="M 30 0
             C 30 0, 58 60, 30 120
             C 2 180, 58 240, 30 300
             C 2 360, 58 420, 30 520"
          stroke="#e63020"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Project list */}
      <div className="projects-list" onMouseLeave={() => setActive(null)}>
        {featuredProjects.map((p, i) => (
          <Link
            key={p.id}
            href={`/${p.slug}`}
            className={`projects-list-item${active === i ? ' is-active' : ''}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <h3>{p.title}</h3>
          </Link>
        ))}
        <Link href="/projects" className="projects-list-item projects-list-item--all">
          <h3>View All →</h3>
        </Link>
      </div>

      {/* Preview panel */}
      <div className="projects-preview">
        <div className="projects-preview-meta">
          <span className="projects-preview-date">{active !== null ? featuredProjects[active].date : ''}</span>
          <span className="projects-preview-label">Preview</span>
        </div>
        <div className="projects-preview-img">
          {active !== null ? (
            <div className="projects-preview-image-wrap" style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src={featuredProjects[active].image}
                alt={featuredProjects[active].title}
                fill
                sizes="(max-width: 1100px) 100vw, 42vw"
                style={{ objectFit: 'cover' }}
                priority={active === 0}
              />
            </div>
          ) : (
            <div className="projects-preview-placeholder">
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.15)' }}>
                Hover a project
              </span>
            </div>
          )}
        </div>
      </div>

      <span className="projects-side-label">Projects</span>
    </section>
  );
}
