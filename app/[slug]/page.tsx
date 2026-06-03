import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, projects } from '@/lib/projects';

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: `${project.title} — Portfolio`,
    description: project.subtitle,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <main className="project-detail">
      <Link href="/" className="project-detail-back">
        <span className="back-pointer">←</span> Back
      </Link>

      <section className="project-detail-shell">
        <div className="project-detail-left">
          <p className="project-detail-kicker">Project</p>

          <div className="project-detail-title-row">
            <h1 className="project-detail-title">{project.title}</h1>
            <span className="project-detail-year">{project.year}</span>
          </div>

          <p className="project-detail-subtitle">{project.subtitle}</p>
          <p className="project-detail-description">{project.description}</p>

          <div className="project-detail-meta">
            <div>
              <p className="project-detail-meta-label">Role</p>
              <p style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--white)' }}>{project.role}</p>
            </div>
            <div>
              <p className="project-detail-meta-label">Tech Stack</p>
              <div className="project-detail-techs">
                {project.techStack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="project-detail-buttons">
            {project.liveUrl && (
              <a
                className="project-detail-button project-detail-button--primary project-detail-button--red"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                Visit Website <span>↗</span>
              </a>
            )}
            {project.sourceUrl && (
              <a
                className="project-detail-button project-detail-button--secondary"
                href={project.sourceUrl}
                target="_blank"
                rel="noreferrer"
              >
                Source Code <span>↗</span>
              </a>
            )}
          </div>
        </div>

        <div className="project-detail-right">
          <div className="project-detail-image">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 45vw"
              className="project-detail-image--inner"
            />
          </div>
          {project.video && (
            <div className="project-detail-video">
              <video
                src={project.video}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="project-detail-video--inner"
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
