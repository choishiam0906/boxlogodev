import type { Metadata } from "next";
import { getBlogPosts, getPosts } from "@/lib/content";
import { BlogCard } from "@/components/blog/BlogCard";
import { BLOG_CATEGORIES } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "블로그",
  description: "SAP ABAP, AI, Economy 관련 기술 블로그 글 모음",
};

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams;
  const posts = category
    ? getPosts().filter((p) => p.category === category)
    : getBlogPosts();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          블로그
        </h1>
        <p className="mt-2 text-foreground-secondary">
          SAP ABAP, AI, 경제에 대한 이야기
        </p>
      </div>

      {/* 카테고리 필터 */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Link href="/blog">
          <Badge className={!category ? "border-accent text-accent" : ""}>
            전체
          </Badge>
        </Link>
        {BLOG_CATEGORIES.map((cat) => (
          <Link key={cat.name} href={`/blog?category=${cat.name}`}>
            <Badge
              color={category === cat.name ? cat.color : undefined}
              className={category === cat.name ? "" : ""}
            >
              {cat.label}
            </Badge>
          </Link>
        ))}
      </div>

      {/* 글 목록 */}
      {posts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-foreground-muted">
          <p>아직 작성된 글이 없어요.</p>
        </div>
      )}
    </div>
  );
}
