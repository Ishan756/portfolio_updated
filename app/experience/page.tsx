'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    period: 'August 2025 – November 2025',
    role: 'SWE Intern',
    company: 'Explified',
    companyUrl: '#',
    description: 'Redesigned and improved product workflows while architecting AI-powered tooling that directly impacted business metrics.',
    bullets: [
      'Redesigned and improved workflow and integration pages improving usability and navigation across the platform',
      'Configured and optimized CRM workflows to automate lead scoring and assignment, resulting in a 15% increase in qualified leads and a 10% reduction in sales cycle time',
      'Architected and integrated an AI-powered model accessible at FlowSense Chat, enabling intelligent customer interaction',
    ],
  },
  {
    period: 'December 2024 – January 2025',
    role: 'Web Development Intern',
    company: 'Hyperweb LLP',
    companyUrl: '#',
    description: 'Designed and developed responsive interfaces and documented APIs for the SolutionBasket product, streamlining frontend-backend collaboration.',
    bullets: [
      'Designed and developed responsive Home Page and Category Page using React.js, improving user experience and conversion',
      'Defined and documented 10+ core API routes for "SolutionBasket" using Swagger, streamlining integration processes for frontend developers and improving cross-team collaboration',
    ],
  },
  {
    period: 'September 2024 – Present',
    role: 'Web Dev Lead',
    company: 'Axios Development Club, IIIT Bhopal',
    companyUrl: '#',
    description: 'Leading web development initiatives for the official college tech club, building community, delivering technical education, and directing large-scale events.',
    bullets: [
      'Built and maintained the official club\'s website and delivered 4+ technical sessions for 200+ peers',
      'Directed 3+ large-scale events with 100+ participants each and conducted orientation & mentorship sessions for 500+ freshers, boosting engagement and awareness',
    ],
  },
];

export default function ExperiencePage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.exp-title',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo('.exp-sub',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.5 }
      );
      gsap.utils.toArray<HTMLElement>('.exp-item').forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 80%' },
            delay: i * 0.05,
          }
        );
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="exp-page">
      <Link href="/" className="page-back">← Back home</Link>

      <div className="exp-hero">
        <h1 className="exp-title">Experience</h1>
        <p className="exp-sub">A timeline of growth through Internships, clubs, teams, and leadership roles.</p>
      </div>

      <div className="exp-list">
        {experiences.map((exp, i) => (
          <div key={i} className="exp-item">
            <div className="exp-item-left">
              <span className="exp-period">{exp.period}</span>
            </div>
            <div className="exp-item-right">
              <h2 className="exp-role">{exp.role}</h2>
              <a href={exp.companyUrl} target="_blank" rel="noreferrer" className="exp-company">{exp.company}</a>
              <p className="exp-desc">{exp.description}</p>
              <ul className="exp-bullets">
                {exp.bullets.map((b, bi) => (
                  <li key={bi}>
                    <span className="exp-bullet-arrow">→</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
