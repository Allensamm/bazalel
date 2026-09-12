import Link from 'next/link';
import { SiteFooter } from '@/components/SiteFooter';

interface LegalSection {
  title: string;
  paragraphs?: string[];
  items?: string[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  introduction: string;
  sections: LegalSection[];
  contactEmail: string;
}

export function LegalPage({
  eyebrow,
  title,
  introduction,
  sections,
  contactEmail,
}: LegalPageProps) {
  return (
    <>
      <main id="main-content" className="legal-page grid-surface">
        <article className="legal-page__article">
        <header>
          <p>{eyebrow}</p>
          <h1>{title}</h1>
          <span>Last updated: September 12, 2026</span>
          <p>{introduction}</p>
        </header>

        <aside aria-label="Legal review notice">
          This is starter website copy for a small design agency and should be reviewed
          by a qualified legal professional for your business and jurisdiction.
        </aside>

        <div className="legal-page__sections">
          {sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.items && (
                <ul>
                  {section.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
            </section>
          ))}
        </div>

        <p className="legal-page__contact">
          Questions? Email <Link href={`mailto:${contactEmail}`}>{contactEmail}</Link>.
        </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
