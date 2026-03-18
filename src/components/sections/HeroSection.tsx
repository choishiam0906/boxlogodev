"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ProfileImage } from "@/components/ui/ProfileImage";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="mx-auto max-w-5xl px-6">
      <div className="flex flex-col gap-12 py-20 sm:py-28 md:flex-row md:items-center md:gap-16">
        {/* 텍스트 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-1"
        >
          <p className="mb-6 text-xs tracking-widest text-foreground-muted uppercase">
            Developer Blog
          </p>
          <h1 className="mb-8 font-serif text-5xl font-semibold leading-[1.15] tracking-tight sm:text-6xl">
            박스로고 입은
            <br />
            개발자
          </h1>
          <p className="mb-10 max-w-md text-base leading-relaxed text-foreground-secondary">
            SAP ABAP 개발과 AI, 그리고 커피와 여행.
            <br />
            코드와 일상의 기록을 나눕니다.
          </p>
          <div className="flex gap-3">
            <Button href="/blog" size="lg">
              블로그 읽기 <ArrowRight size={14} />
            </Button>
            <Button href="/about" variant="secondary" size="lg">
              소개
            </Button>
          </div>
        </motion.div>

        {/* 프로필 이미지 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ProfileImage className="relative aspect-[3/4] w-full max-w-[300px] rounded-lg md:max-w-[280px]" />
        </motion.div>
      </div>
    </section>
  );
}
