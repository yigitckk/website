// src/data/projects.ts
// Single source of truth for the Projects section lives in projects.json
// (also read by scripts/postbuild.js to generate per-route HTML + sitemap).
// To add a category: append to "categories". To add a project: append to "projects"
// with a matching `category` slug and drop images in public/images/projects/<slug>/.
import data from './projects.json';

export interface ProjectCategory {
  slug: string;
  label: string;
  description: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  summary: string;
  date?: string;
  status?: string;
  cover: string;
  coverAlt: string;
  ogImage?: string;
  gallery: ProjectImage[];
  tags: string[];
  links: ProjectLink[];
  /** Markdown strings rendered as the Problem / Approach / Result sections. */
  sections: {
    problem: string;
    approach: string;
    result: string;
  };
}

export const SITE_URL = 'https://yigitc.tech';

export const categories: ProjectCategory[] = data.categories;
export const projects: Project[] = data.projects as Project[];

export const getProject = (slug?: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const getCategory = (slug: string): ProjectCategory | undefined =>
  categories.find((c) => c.slug === slug);
