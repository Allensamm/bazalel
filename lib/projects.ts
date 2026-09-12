export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  status: 'Concept';
}

export const projects: Project[] = [
  {
    slug: 'studio-no-8',
    title: 'Studio No. 8',
    category: 'Interior design · Squarespace concept',
    description:
      'A concept website exploring how an interior design studio can present its point of view, selected work, and enquiry path with clarity.',
    image: '/dummy-squarespace-site.png',
    imageAlt:
      'Full-page Studio No. 8 interior design website concept created by Bazalel',
    status: 'Concept',
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
