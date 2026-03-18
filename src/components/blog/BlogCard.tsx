import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { CATEGORIES } from "@/lib/constants";
import { formatDate, readingTime } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";

interface BlogCardProps {
  post: {
    title: string;
    description: string;
    slug: string;
    category: string;
    publishedAt: string;
    cover?: string;
    body: string;
  };
}

export function BlogCard({ post }: BlogCardProps) {
  const categoryInfo = CATEGORIES.find((c) => c.name === post.category);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 transition-all duration-300 hover:border-[var(--border-hover)] hover:shadow-lg hover:shadow-accent/5"
    >
      {post.cover && (
        <div className="relative mb-4 aspect-video overflow-hidden rounded-xl">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex items-center gap-2 mb-3">
        <Badge color={categoryInfo?.color}>{post.category}</Badge>
      </div>

      <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-accent line-clamp-2">
        {post.title}
      </h3>

      <p className="mb-4 text-sm text-foreground-secondary line-clamp-2">
        {post.description}
      </p>

      <div className="flex items-center gap-4 text-xs text-foreground-muted">
        <span className="flex items-center gap-1">
          <Calendar size={12} />
          {formatDate(post.publishedAt)}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={12} />
          {readingTime(post.body)}
        </span>
      </div>
    </Link>
  );
}
