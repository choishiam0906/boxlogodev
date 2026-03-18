"use client";

import { motion } from "framer-motion";
import { GradientText } from "@/components/ui/GradientText";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="hero-gradient relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-6">
      <div
        className="glow-orb left-1/4 top-1/4 h-96 w-96 bg-accent"
        style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
      />
      <div
        className="glow-orb right-1/4 bottom-1/3 h-72 w-72 bg-accent-sky"
        style={{ animation: "pulse-glow 2s ease-in-out infinite 1s" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 inline-flex rounded-full border border-[var(--border)] px-4 py-1.5 text-xs text-foreground-secondary"
        >
          SAP ABAP &middot; AI &middot; 일상을 기록하는 공간
        </motion.div>

        <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          <GradientText>박스로고</GradientText> 입은 개발자
        </h1>

        <p className="mx-auto mb-10 max-w-lg text-lg text-foreground-secondary">
          SAP ABAP 개발과 AI, 그리고 커피와 여행 이야기를 나누는 개인 블로그
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href="/blog" size="lg">
            블로그 읽기
          </Button>
          <Button href="/products" variant="secondary" size="lg">
            제품 보기
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
