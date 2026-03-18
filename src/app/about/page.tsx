import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientText } from "@/components/ui/GradientText";
import { Badge } from "@/components/ui/Badge";
import { Mail, Github, Globe } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "소개",
  description: "박스로고 입은 개발자 — SAP ABAP 개발자, AI 빌더",
};

const skills = [
  { category: "SAP", items: ["ABAP", "CDS View", "RAP", "Fiori", "BTP"] },
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["FastAPI", "Django", "Spring Boot"] },
  { category: "AI/ML", items: ["LLM Integration", "Prompt Engineering", "RAG"] },
  { category: "Infra", items: ["Vercel", "Supabase", "Docker", "Git"] },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* 프로필 */}
      <div className="mb-12 text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-accent/10 text-4xl">
          👔
        </div>
        <h1 className="mb-2 text-3xl font-bold sm:text-4xl">
          <GradientText>박스로고</GradientText> 입은 개발자
        </h1>
        <p className="text-lg text-foreground-secondary">
          SAP ABAP 개발자 · AI 빌더 · 커피 애호가
        </p>
      </div>

      {/* 소개 */}
      <GlassCard className="mb-8" hover={false}>
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          안녕하세요!
        </h2>
        <div className="space-y-3 text-foreground-secondary">
          <p>
            SAP ABAP을 기반으로 엔터프라이즈 시스템을 개발하고, AI/LLM을 활용한
            자동화 도구를 만드는 개발자입니다.
          </p>
          <p>
            &quot;박스로고&quot;라는 이름은 좋아하는 옷 스타일에서 따왔어요.
            코딩할 때도 박스로고 티를 즐겨 입습니다.
          </p>
          <p>
            이 블로그에서 SAP 개발 경험, AI 활용 사례, 그리고 커피와 여행 등
            일상 이야기를 나누고 있어요.
          </p>
        </div>
      </GlassCard>

      {/* 기술 스택 */}
      <div className="mb-8">
        <h2 className="mb-6 text-xl font-semibold text-foreground">
          기술 스택
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {skills.map((group) => (
            <GlassCard key={group.category} hover={false} className="p-4">
              <h3 className="mb-3 text-sm font-semibold text-accent">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* 연락처 */}
      <div>
        <h2 className="mb-6 text-xl font-semibold text-foreground">연락처</h2>
        <div className="flex flex-wrap gap-3">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm text-foreground-secondary transition-colors hover:text-foreground"
          >
            <Github size={16} /> GitHub
          </a>
          <a
            href={SOCIAL_LINKS.tistory}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm text-foreground-secondary transition-colors hover:text-foreground"
          >
            <Globe size={16} /> Tistory
          </a>
          <a
            href="mailto:boxlogodev@gmail.com"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm text-foreground-secondary transition-colors hover:text-foreground"
          >
            <Mail size={16} /> Email
          </a>
        </div>
      </div>
    </div>
  );
}
