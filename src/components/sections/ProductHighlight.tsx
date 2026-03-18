import { GlassCard } from "@/components/ui/GlassCard";
import { GradientText } from "@/components/ui/GradientText";
import { Button } from "@/components/ui/Button";
import { Monitor, Shield, Cpu } from "lucide-react";

export function ProductHighlight() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <GlassCard className="relative overflow-hidden p-8 sm:p-12" hover={false}>
        <div
          className="glow-orb -right-20 -top-20 h-64 w-64 bg-accent"
          style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
        />

        <div className="relative z-10">
          <p className="mb-2 text-sm font-medium text-accent">Featured Product</p>
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            <GradientText>SAP Assistant</GradientText> Desktop
          </h2>
          <p className="mb-8 max-w-lg text-foreground-secondary">
            다중 LLM 통합, CBO 분석, 로컬 우선 아키텍처로 SAP 운영 자동화를
            안전하게 수행하세요.
          </p>

          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Cpu, label: "다중 LLM 통합", desc: "GPT, Claude, Gemini" },
              { icon: Shield, label: "로컬 우선 보안", desc: "데이터가 PC를 떠나지 않음" },
              { icon: Monitor, label: "데스크톱 앱", desc: "Electron + React" },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <Icon size={20} className="text-accent-sky" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{label}</p>
                  <p className="text-xs text-foreground-muted">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Button href="/products" size="lg">
            자세히 보기
          </Button>
        </div>
      </GlassCard>
    </section>
  );
}
