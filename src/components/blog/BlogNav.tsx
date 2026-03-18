import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogNavProps {
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}

export function BlogNav({ prev, next }: BlogNavProps) {
  if (!prev && !next) return null;

  return (
    <nav className="mt-12 grid gap-4 border-t border-[var(--border)] pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group flex items-center gap-3 rounded-xl border border-[var(--border)] p-4 transition-colors hover:border-[var(--border-hover)]"
        >
          <ChevronLeft
            size={20}
            className="text-foreground-muted transition-transform group-hover:-translate-x-1"
          />
          <div className="min-w-0">
            <p className="text-xs text-foreground-muted">이전 글</p>
            <p className="truncate text-sm font-medium text-foreground">
              {prev.title}
            </p>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next && (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex items-center justify-end gap-3 rounded-xl border border-[var(--border)] p-4 text-right transition-colors hover:border-[var(--border-hover)]"
        >
          <div className="min-w-0">
            <p className="text-xs text-foreground-muted">다음 글</p>
            <p className="truncate text-sm font-medium text-foreground">
              {next.title}
            </p>
          </div>
          <ChevronRight
            size={20}
            className="text-foreground-muted transition-transform group-hover:translate-x-1"
          />
        </Link>
      )}
    </nav>
  );
}
