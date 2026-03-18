"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TocEntry } from "@/types";

interface BlogTOCProps {
  toc: TocEntry[];
}

export function BlogTOC({ toc }: BlogTOCProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0% -80% 0%" },
    );

    const headings = document.querySelectorAll("h2[id], h3[id]");
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  if (toc.length === 0) return null;

  return (
    <nav className="sticky top-24">
      <h4 className="mb-3 text-sm font-semibold text-foreground">목차</h4>
      <ul className="space-y-1.5 border-l border-[var(--border)]">
        {toc.map((item) => (
          <li key={item.url}>
            <a
              href={item.url}
              className={cn(
                "block border-l-2 py-1 text-sm transition-colors",
                item.depth === 3 ? "pl-6" : "pl-3",
                activeId === item.url.slice(1)
                  ? "border-accent text-accent"
                  : "border-transparent text-foreground-muted hover:text-foreground-secondary",
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
