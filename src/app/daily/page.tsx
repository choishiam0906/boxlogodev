import type { Metadata } from "next";
import { getDailyPosts, getPosts } from "@/lib/content";
import { BlogCard } from "@/components/blog/BlogCard";
import { DAILY_CATEGORIES } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "일상",
  description: "커피, 여행, 책, 아트 — 일상의 기록",
};

interface DailyPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function DailyPage({ searchParams }: DailyPageProps) {
  const { category } = await searchParams;
  const posts = category
    ? getPosts().filter((p) => p.category === category)
    : getDailyPosts();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          일상
        </h1>
        <p className="mt-2 text-foreground-secondary">
          커피, 여행, 책, 그리고 아트 이야기
        </p>
      </div>

      {/* 카테고리 필터 */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Link href="/daily">
          <Badge className={!category ? "border-accent text-accent" : ""}>
            전체
          </Badge>
        </Link>
        {DAILY_CATEGORIES.map((cat) => (
          <Link key={cat.name} href={`/daily?category=${cat.name}`}>
            <Badge color={category === cat.name ? cat.color : undefined}>
              {cat.label}
            </Badge>
          </Link>
        ))}
      </div>

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
