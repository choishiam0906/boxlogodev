import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export function Badge({ children, className, color }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        "border border-[var(--border)] text-foreground-secondary",
        className,
      )}
      style={color ? { borderColor: `${color}40`, color, backgroundColor: `${color}10` } : undefined}
    >
      {children}
    </span>
  );
}
