'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  { title: 'Languages & Frameworks', items: ['TypeScript', 'React', 'Next.js', 'Node.js', 'Express.js', 'Python', 'FastAPI', 'JavaScript', 'HTML/CSS', 'SQL'] },
  { title: 'DevOps & Cloud',          items: ['Docker', 'CI/CD', 'AWS', 'Kubernetes', 'GitHub Actions'] },
  { title: 'Databases & State',      items: ['PostgreSQL', 'MongoDB', 'Prisma', 'Redis', 'Zustand'] },
  { title: 'Generative AI',          items: ['OpenAI API', 'LangChain', 'RAG', 'Google Generative AI', 'Vector Embeddings'] },
  { title: 'UI & Styling',           items: ['Tailwind CSS', 'ShadCN UI', 'GSAP', 'Framer Motion', 'Figma'] },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.skills-heading',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      );
    }, sectionRef);
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="skills" id="skills" style={{ cursor: 'auto' }}>
      <div className="skills-left">
        <div>
          <p className="skills-label">Skills</p>
          <h2 className="skills-heading">
            Computer science student,<br />
            specialized in backend architecture,<br />
            GenAi integration, and Automations,<br />
            from containerization and CI/CD to deployment,<br />
            monitoring, and long-term system reliability.
          </h2>
          <a href="#contact" className="skills-contact-link">
            Contact Me <span>✦</span>
          </a>
        </div>

        {/* Big red arrow */}
        <div className="skills-arrow">
          <svg viewBox="0 0 220 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 0 30 L 185 30 M 155 5 L 215 30 L 155 55"
              stroke="#e63020"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="skills-right">
        {skillGroups.map((group, i) => (
          <div
            key={group.title}
            className={`skill-accordion-item${openIndex === i ? ' is-open' : ''}`}
          >
            <div className="skill-accordion-header" onClick={() => setOpenIndex(openIndex === i ? -1 : i)}>
              <span className="skill-accordion-title">{group.title}</span>
              <span className="skill-accordion-icon">{openIndex === i ? '—' : '+'}</span>
            </div>
            <div className="skill-accordion-body">
              {/* Languages & Frameworks gets horizontal scroll, others get regular list */}
              {i === 0 ? (
                <div className="skill-scroll-track">
                  {/* Duplicate for seamless loop */}
                  {[...group.items, ...group.items].map((item, idx) => (
                    <span key={idx} className="skill-scroll-chip">{item}</span>
                  ))}
                </div>
              ) : (
                <ul className="skill-accordion-list">
                  {group.items.map(item => <li key={item}>{item}</li>)}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      <span style={{
        position: 'absolute', right: '2.5rem', top: '50%',
        transform: 'translateY(-50%)', fontSize: '0.7rem',
        letterSpacing: '0.1em', color: 'rgba(255,255,255,0.45)',
        writingMode: 'vertical-rl', textTransform: 'uppercase'
      }}>Skills</span>
    </section>
  );
}
