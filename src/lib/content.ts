import type { CategoryType } from "@/types";

// Velite 빌드 출력에서 posts를 가져옴
// 빌드 전에는 빈 배열, velite build 후 .velite/index.js가 생성됨
function loadPosts(): any[] {
  try {
    // Velite 출력 디렉토리의 데이터
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require("../../.velite").posts ?? [];
  } catch {
    return [];
  }
}

export function getPosts() {
  return loadPosts().sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getFeaturedPosts() {
  return getPosts().filter((p) => p.featured);
}

export function getPost(slug: string) {
  return loadPosts().find((p) => p.slug === slug);
}

export function getPostsByCategory(category: CategoryType) {
  return getPosts().filter((p) => p.category === category);
}

export function getBlogPosts() {
  return getPosts().filter((p) =>
    ["ABAP", "AI", "Economy"].includes(p.category),
  );
}

export function getDailyPosts() {
  return getPosts().filter((p) =>
    ["ART", "BOOK", "Coffee", "TRAVEL"].includes(p.category),
  );
}

export function getAdjacentPosts(slug: string) {
  const allPosts = getPosts();
  const index = allPosts.findIndex((p) => p.slug === slug);
  return {
    prev: index < allPosts.length - 1 ? allPosts[index + 1] : null,
    next: index > 0 ? allPosts[index - 1] : null,
  };
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  loadPosts().forEach((p) => p.tags?.forEach((t: string) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

export function getCategoryPostCount(category: CategoryType): number {
  return loadPosts().filter((p) => p.category === category).length;
}
