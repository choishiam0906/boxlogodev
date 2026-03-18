export type CategoryType = "ABAP" | "AI" | "Economy" | "ART" | "BOOK" | "Coffee" | "TRAVEL";

export interface Post {
  title: string;
  description: string;
  slug: string;
  category: CategoryType;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt?: string;
  featured: boolean;
  cover?: string;
  body: string;
  toc: TocEntry[];
}

export interface TocEntry {
  title: string;
  url: string;
  depth: number;
}

export interface CategoryInfo {
  name: CategoryType;
  label: string;
  icon: string;
  area: "blog" | "daily";
  color: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  author: string;
  ogImage: string;
  locale: string;
}
