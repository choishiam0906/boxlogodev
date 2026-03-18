import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientText } from "@/components/ui/GradientText";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Monitor,
  Shield,
  Cpu,
  Zap,
  Database,
  FileCode,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "제품",
  description: "SAP Assistant Desktop — SAP 운영 자동화 도구",
};

const features = [
  {
    icon: Cpu,
    title: "다중 LLM 통합",
    description: "GPT-4, Claude, Gemini를 하나의 인터페이스에서 활용",
  },
  {
    icon: Shield,
    title: "로컬 우선 보안",
    description: "모든 데이터가 사용자 PC에서 처리. 외부 유출 없음",
  },
  {
    icon: Database,
    title: "CBO 분석",
    description: "SAP 커스텀 비즈니스 오브젝트 자동 분석",
  },
  {
    icon: FileCode,
    title: "ABAP 코드 생성",
    description: "컨텍스트 기반 ABAP 코드 자동 생성 및 리뷰",
  },
  {
    icon: Zap,
    title: "워크플로우 자동화",
    description: "반복 SAP 작업을 자동화하여 생산성 향상",
  },
  {
    icon: Monitor,
    title: "데스크톱 앱",
    description: "Electron + React 기반 네이티브 경험",
  },
];

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* 히어로 */}
      <div className="mb-16 text-center">
        <Badge className="mb-4">Desktop Platform v6.0</Badge>
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
          <GradientText>SAP Assistant</GradientText> Desktop
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-foreground-secondary">
          다중 LLM 통합 · CBO 분석 · 로컬 우선 아키텍처로 SAP 운영 자동화를
          안전하게 수행하세요
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button
            href="https://sap-assistant.vercel.app"
            size="lg"
          >
            공식 사이트 <ArrowRight size={16} />
          </Button>
        </div>
      </div>

      {/* 기능 그리드 */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, description }) => (
          <GlassCard key={title} className="h-full">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <Icon size={24} className="text-accent-sky" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-foreground-secondary">
              {description}
            </p>
          </GlassCard>
        ))}
      </div>

      {/* 향후 제품 */}
      <div className="mt-20 text-center">
        <h2 className="mb-4 text-2xl font-bold text-foreground">
          더 많은 제품이 준비 중이에요
        </h2>
        <p className="text-foreground-secondary">
          개발자를 위한 새로운 도구를 만들고 있어요. 블로그에서 소식을 확인하세요.
        </p>
      </div>
    </div>
  );
}
