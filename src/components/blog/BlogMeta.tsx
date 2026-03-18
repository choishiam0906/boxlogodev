import { Badge } from "@/components/ui/Badge";
import { CATEGORIES } from "@/lib/constants";
import { formatDate, readingTime } from "@/lib/utils";
import { Calendar, Clock, User } from "lucide-react";

interface BlogMetaProps {
  post: {
    category: string;
    publishedAt: string;
    updatedAt?: string;
    author: string;
    body: string;
    tags: string[];
  };
}

export function BlogMeta({ post }: BlogMetaProps) {
  const categoryInfo = CATEGORIES.find((c) => c.name === post.category);

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-foreground-secondary">
      <Badge color={categoryInfo?.color}>{post.category}</Badge>

      <span className="flex items-center gap-1">
        <User size={14} />
        {post.author}
      </span>

      <span className="flex items-center gap-1">
        <Calendar size={14} />
        {formatDate(post.publishedAt)}
      </span>

      <span className="flex items-center gap-1">
        <Clock size={14} />
        {readingTime(post.body)}
      </span>

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-[var(--code-bg)] px-2 py-0.5 text-xs text-foreground-muted"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
