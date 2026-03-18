import type { CategoryInfo, NavItem, SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "박스로고 입은 개발자",
  title: "박스로고 입은 개발자",
  description:
    "SAP ABAP, AI, 그리고 일상을 기록하는 개발자 블로그. SAP Assistant Desktop 개발자.",
  url: "https://boxlogodev.com",
  author: "박스로고 입은 개발자",
  ogImage: "/og-image.png",
  locale: "ko_KR",
};

export const NAV_ITEMS: NavItem[] = [
  { label: "블로그", href: "/blog" },
  { label: "일상", href: "/daily" },
  { label: "제품", href: "/products" },
  { label: "포트폴리오", href: "/portfolio" },
  { label: "소개", href: "/about" },
];

export const CATEGORIES: CategoryInfo[] = [
  { name: "ABAP", label: "ABAP", icon: "Code2", area: "blog", color: "#0070F3" },
  { name: "AI", label: "AI", icon: "Brain", area: "blog", color: "#8B5CF6" },
  { name: "Economy", label: "Economy", icon: "TrendingUp", area: "blog", color: "#10B981" },
  { name: "ART", label: "ART", icon: "Palette", area: "daily", color: "#F59E0B" },
  { name: "BOOK", label: "BOOK", icon: "BookOpen", area: "daily", color: "#EC4899" },
  { name: "Coffee", label: "Coffee", icon: "Coffee", area: "daily", color: "#92400E" },
  { name: "TRAVEL", label: "TRAVEL", icon: "MapPin", area: "daily", color: "#06B6D4" },
];

export const BLOG_CATEGORIES = CATEGORIES.filter((c) => c.area === "blog");
export const DAILY_CATEGORIES = CATEGORIES.filter((c) => c.area === "daily");

export const SOCIAL_LINKS = {
  github: "https://github.com/boxlogodev",
  tistory: "https://boxlogodev.tistory.com",
};
