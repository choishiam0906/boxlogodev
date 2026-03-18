import type { Metadata } from "next";
import { SOCIAL_LINKS } from "@/lib/constants";
import { ProfileImage } from "@/components/ui/ProfileImage";

export const metadata: Metadata = {
  title: "소개",
  description: "박스로고 입은 개발자 — SAP ABAP 개발자, AI 빌더",
};

const skills = [
  { category: "SAP", items: ["ABAP", "CDS View", "RAP", "Fiori", "BTP"] },
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["FastAPI", "Django", "Spring Boot"] },
  { category: "AI / ML", items: ["LLM Integration", "Prompt Engineering", "RAG"] },
  { category: "Infra", items: ["Vercel", "Supabase", "Docker", "Git"] },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex flex-col gap-12 md:flex-row md:gap-16">
        {/* 프로필 이미지 */}
        <ProfileImage className="relative aspect-[3/4] w-full max-w-[280px] shrink-0 rounded-lg" />

        {/* 소개 텍스트 */}
        <div className="flex-1">
          <p className="mb-3 text-xs tracking-widest text-foreground-muted uppercase">
            About
          </p>
          <h1 className="mb-8 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            박스로고 입은 개발자
          </h1>

          <div className="mb-10 space-y-4 text-sm leading-[1.9] text-foreground-secondary">
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

          {/* 연락처 */}
          <div className="flex gap-6 text-sm">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-muted underline underline-offset-4 transition-colors hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href={SOCIAL_LINKS.tistory}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-muted underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Tistory
            </a>
            <a
              href="mailto:boxlogodev@gmail.com"
              className="text-foreground-muted underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Email
            </a>
          </div>
        </div>
      </div>

      {/* 기술 스택 */}
      <div className="mt-20 border-t border-[var(--border)] pt-12">
        <h2 className="mb-8 font-serif text-xl font-semibold text-foreground">
          기술 스택
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="mb-3 text-xs tracking-wider text-foreground-muted uppercase">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {group.items.map((item) => (
                  <span key={item} className="text-sm text-foreground-secondary">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
