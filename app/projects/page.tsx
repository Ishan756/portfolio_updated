'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: 'genai',
    label: 'Generative AI',
    projects: [
      {
        slug: 'codesnippets',
        title: 'Codesnippets',
        desc: 'The hub for college assignments & tools',
        year: '2025',
        image: '/images/codesnippets.png',
      },
      {
        slug: 'gitgpt',
        title: 'GitGPT',
        desc: 'Ask questions, get grounded answers from your codebase',
        year: '2025',
        image: '/images/gitgpt.png',
      },
    ],
  },
  {
    id: 'agentic',
    label: 'Agentic AI',
    projects: [
      {
        slug: 'scraping-agent',
        title: 'Scraping Agent',
        desc: 'Automated data extraction workflows',
        year: '2025',
        image: '/images/scraping_agent.png',
      },
    ],
  },
  {
    id: 'fullstack',
    label: 'Full-Stack',
    projects: [
      {
        slug: 'donati',
        title: 'Donati',
        desc: 'Empower generosity — fundraising platform',
        year: '2025',
        image: '/images/donnati.png',
      },
      {
        slug: 'agrilink',
        title: 'Agrilink',
        desc: 'Farm fresh directly to your door',
        year: '2024',
        image: '/images/agrilink.png',
      },
    ],
  },
];

export default function ProjectsPage() {
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.projects-page-title',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo('.projects-page-sub',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.5 }
      );

      // Animate items on scroll
      gsap.utils.toArray<HTMLElement>('.project-row').forEach((row, i) => {
        gsap.fromTo(row,
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 85%' },
            delay: i * 0.05,
          }
        );
      });

      // Scrolling red line
      const updateLine = () => {
        if (!lineRef.current || !sectionsRef.current) return;
        const scrollY = window.scrollY;
        const containerTop = sectionsRef.current.offsetTop;
        const containerH = sectionsRef.current.offsetHeight;
        const winH = window.innerHeight;
        const progress = Math.min(Math.max((scrollY + winH * 0.5 - containerTop) / containerH, 0), 1);
        lineRef.current.style.height = `${progress * 100}%`;

        // detect active category
        const cats = sectionsRef.current.querySelectorAll('.cat-section');
        cats.forEach((cat, i) => {
          const rect = (cat as HTMLElement).getBoundingClientRect();
          if (rect.top < winH * 0.5 && rect.bottom > winH * 0.3) {
            setActiveCategory(i);
          }
        });
      };
      window.addEventListener('scroll', updateLine);
      updateLine();
      return () => window.removeEventListener('scroll', updateLine);
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="projects-page">
      <Link href="/" className="page-back">← Back home</Link>

      <div className="projects-page-hero">
        <h1 className="projects-page-title">All Projects</h1>
        <p className="projects-page-sub">A complete catalog of work, organized by domain.</p>
      </div>

      {/* Category tabs */}
      <div className="cat-tabs">
        {categories.map((cat, i) => (
          <a key={cat.id} href={`#${cat.id}`} className={`cat-tab${activeCategory === i ? ' cat-tab--active' : ''}`}>
            {cat.label}
          </a>
        ))}
      </div>

      <div ref={sectionsRef} className="cat-sections">
        {/* Red scrolling line */}
        <div className="scroll-line-track">
          <div ref={lineRef} className="scroll-line-fill" />
        </div>

        {categories.map((cat, ci) => (
          <div key={cat.id} id={cat.id} className="cat-section">
            <div className="cat-label-row">
              <h2 className={`cat-label${activeCategory === ci ? ' cat-label--active' : ''}`}>{cat.label}</h2>
              <h2 className="cat-label cat-label--ghost">{cat.label}</h2>
              <h2 className="cat-label cat-label--ghost">{cat.label}</h2>
            </div>
            <div className="cat-projects">
              {cat.projects.map((p, pi) => (
                <Link key={p.slug} href={`/${p.slug}`} className="project-row">
                  <span className="project-row-num">0{ci * 3 + pi + 1}</span>
                  <span className="project-row-title">{p.title}</span>
                  <span className="project-row-desc">{p.desc}</span>
                  <span className="project-row-year">{p.year}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
