import { getPosts } from "@/lib/content";
import { BlogCard } from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function RecentPostsSection() {
  const recentPosts = getPosts().slice(0, 6);

  if (recentPosts.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            최신 글
          </h2>
          <p className="mt-2 text-foreground-secondary">
            최근에 작성한 글들을 확인해보세요
          </p>
        </div>
        <Button href="/blog" variant="secondary" className="hidden sm:inline-flex">
          전체 보기 <ArrowRight size={16} />
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recentPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      <div className="mt-8 text-center sm:hidden">
        <Button href="/blog" variant="secondary">
          전체 보기 <ArrowRight size={16} />
        </Button>
      </div>
    </section>
  );
}
