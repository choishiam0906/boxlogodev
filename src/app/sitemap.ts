import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/content";
import { siteConfig } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();

  const blogEntries = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticPages = [
    { url: siteConfig.url, priority: 1.0 },
    { url: `${siteConfig.url}/blog`, priority: 0.9 },
    { url: `${siteConfig.url}/daily`, priority: 0.7 },
    { url: `${siteConfig.url}/products`, priority: 0.8 },
    { url: `${siteConfig.url}/portfolio`, priority: 0.6 },
    { url: `${siteConfig.url}/about`, priority: 0.5 },
  ].map((page) => ({
    ...page,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...blogEntries];
}
