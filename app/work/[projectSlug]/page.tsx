import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/SiteFooter';
import { getProject, projects } from '@/lib/projects';
import { createPageMetadata } from '@/lib/site';

interface ProjectPageProps {
  params: Promise<{ projectSlug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ projectSlug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { projectSlug } = await params;
  const project = getProject(projectSlug);

  if (!project) return {};

  return createPageMetadata({
    title: `${project.title} Squarespace Concept`,
    description: project.description,
    path: `/work/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectSlug } = await params;
  const project = getProject(projectSlug);

  if (!project) notFound();

  return (
    <>
      <main id="main-content" className="project-page grid-surface">
        <article className="project-page__article">
        <header className="project-page__header">
          <p data-reveal="up">{project.status} work</p>
          <h1 data-reveal="up" className="reveal-delay-1">{project.title}</h1>
          <div data-reveal="up">
            <span>{project.category}</span>
            <p>{project.description}</p>
          </div>
        </header>

        <div className="project-page__visual" data-reveal="scale">
          <Image
            src={project.image}
            alt={project.imageAlt}
            width={1024}
            height={1536}
            sizes="(max-width: 900px) 92vw, 960px"
          />
        </div>

        <section className="project-page__note" aria-labelledby="concept-note-title" data-reveal="up">
          <p>About this work</p>
          <h2 id="concept-note-title">A design concept, clearly labelled.</h2>
          <span>
            This project demonstrates Bazalel’s visual and structural approach. It is
            not presented as client work and makes no claims about commercial results.
          </span>
          <Link href="/contact">Discuss your website <span aria-hidden="true">→</span></Link>
        </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
