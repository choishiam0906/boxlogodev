import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ExternalLink, Github } from "lucide-react";

export const metadata: Metadata = {
  title: "포트폴리오",
  description: "프로젝트 쇼케이스 — SAP Assistant, 개발자 블로그 등",
};

const projects = [
  {
    title: "SAP Assistant Desktop",
    description:
      "다중 LLM 통합 SAP 운영 자동화 데스크톱 앱. Electron + React + TypeScript.",
    tags: ["Electron", "React", "TypeScript", "LLM"],
    url: "https://sap-assistant.vercel.app",
    color: "#0E5BD8",
  },
  {
    title: "박스로고 개발자 블로그",
    description:
      "Next.js 16 + Velite + MDX 기반 자체 개발 블로그. 다크/라이트 테마, SSG.",
    tags: ["Next.js", "Velite", "MDX", "Tailwind"],
    url: "https://boxlogodev.com",
    github: "https://github.com/boxlogodev/blog",
    color: "#8B5CF6",
  },
];

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          포트폴리오
        </h1>
        <p className="mt-2 text-foreground-secondary">
          만든 것들을 소개해요
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        {projects.map((project) => (
          <GlassCard key={project.title} className="flex flex-col">
            <div
              className="mb-4 h-1 w-16 rounded-full"
              style={{ backgroundColor: project.color }}
            />
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              {project.title}
            </h3>
            <p className="mb-4 flex-1 text-sm text-foreground-secondary">
              {project.description}
            </p>
            <div className="mb-4 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <div className="flex gap-3">
              <Button href={project.url} size="md">
                <ExternalLink size={14} /> 방문하기
              </Button>
              {project.github && (
                <Button href={project.github} variant="secondary" size="md">
                  <Github size={14} /> GitHub
                </Button>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
