"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProfileImageProps {
  className?: string;
}

export function ProfileImage({ className }: ProfileImageProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={cn("group relative overflow-hidden", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src="/images/profile.jpg"
        alt="박스로고 입은 개발자"
        fill
        className="object-cover"
        priority
      />

      {/* Supreme 박스로고 hover 오버레이 — 티셔츠 로고 위치 */}
      <div
        className="absolute flex items-center justify-center transition-all duration-300 pointer-events-none"
        style={{
          left: "28%",
          top: "62%",
          width: "24%",
          height: "7%",
        }}
      >
        <div
          className={cn(
            "flex items-center justify-center rounded-[2px] px-2 py-0.5 transition-all duration-300",
            hovered
              ? "bg-[#E21A1A] opacity-100 scale-100"
              : "opacity-0 scale-95",
          )}
          style={{ width: "100%", height: "100%" }}
        >
          <span
            className="text-white font-bold italic tracking-tight select-none"
            style={{
              fontFamily: "'Futura', 'Helvetica Neue', sans-serif",
              fontSize: "clamp(10px, 1.5vw, 16px)",
              letterSpacing: "0.01em",
            }}
          >
            Supreme
          </span>
        </div>
      </div>

      {/* 미묘한 오버레이 효과 */}
      <div
        className={cn(
          "absolute inset-0 bg-black/5 transition-opacity duration-300",
          hovered ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
