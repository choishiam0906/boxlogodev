import Link from "next/link";
import {
  Code2,
  Brain,
  TrendingUp,
  Palette,
  BookOpen,
  Coffee,
  MapPin,
} from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { getCategoryPostCount } from "@/lib/content";
import type { CategoryType } from "@/types";

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Code2,
  Brain,
  TrendingUp,
  Palette,
  BookOpen,
  Coffee,
  MapPin,
};

export function CategoriesSection() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--background-secondary)]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-10 text-center text-2xl font-bold text-foreground sm:text-3xl">
          카테고리
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.icon];
            const count = getCategoryPostCount(cat.name as CategoryType);
            const href = cat.area === "blog" ? `/blog?category=${cat.name}` : `/daily?category=${cat.name}`;

            return (
              <Link
                key={cat.name}
                href={href}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-[var(--border)] p-6 transition-all duration-300 hover:border-[var(--border-hover)] hover:shadow-md"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${cat.color}15` }}
                >
                  {Icon && <Icon size={24} className="transition-colors" style={{ color: cat.color }} />}
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {cat.label}
                </span>
                <span className="text-xs text-foreground-muted">
                  {count}개의 글
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
