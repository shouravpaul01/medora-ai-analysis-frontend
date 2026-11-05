"use client";

import React from "react";
import LottieAnimation from "@/components/shared/LottieAnimation";
import {
  HeartPulse,
  Stethoscope,
  Pill,
  Dna,
  Activity,
  ShieldPlus,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthVisualSideProps {
  srcPaths: string[];
  fallback?: React.ReactNode;
  borderSide?: "left" | "right";
  className?: string;
}

export default function AuthVisualSide({
  srcPaths,
  fallback,
  borderSide = "right",
  className,
}: AuthVisualSideProps) {
  return (
    <div
      className={cn(
        "relative hidden lg:flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#DFEEFC] p-8 overflow-hidden select-none",
        borderSide === "right" ? "border-r border-[#D6E6F8]" : "border-l border-[#D6E6F8]",
        className
      )}
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#173F72]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-blue-400/15 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-white/60 blur-2xl" />

      {/* =========================================================================
          Floating Animated Medical Icons (4 Sides & Corners)
          ========================================================================= */}

      {/* 1. Top-Left: HeartPulse */}
      <div className="absolute top-12 left-12 z-20 animate-float-slow">
        <div className="flex items-center justify-center size-14 rounded-2xl bg-white/90 backdrop-blur-md border border-white/80 shadow-[0_8px_20px_rgba(23,63,114,0.09)] text-primary transition-transform duration-300 hover:scale-110">
          <HeartPulse className="size-7 stroke-[2.2]" />
        </div>
      </div>

      {/* 2. Top-Right: Stethoscope */}
      <div className="absolute top-14 right-14 z-20 animate-float-medium">
        <div className="flex items-center justify-center size-14 rounded-2xl bg-white/90 backdrop-blur-md border border-white/80 shadow-[0_8px_20px_rgba(23,63,114,0.09)] text-primary transition-transform duration-300 hover:scale-110">
          <Stethoscope className="size-7 stroke-[2.2]" />
        </div>
      </div>

      {/* 3. Mid-Left: Pill */}
      <div className="absolute top-1/2 -translate-y-16 left-8 z-20 animate-float-fast">
        <div className="flex items-center justify-center size-12 rounded-2xl bg-white/90 backdrop-blur-md border border-white/80 shadow-[0_8px_18px_rgba(23,63,114,0.08)] text-primary transition-transform duration-300 hover:scale-110">
          <Pill className="size-6 stroke-[2.2]" />
        </div>
      </div>

      {/* 4. Mid-Right: Dna */}
      <div className="absolute top-1/2 -translate-y-8 right-8 z-20 animate-float-reverse">
        <div className="flex items-center justify-center size-12 rounded-2xl bg-white/90 backdrop-blur-md border border-white/80 shadow-[0_8px_18px_rgba(23,63,114,0.08)] text-primary transition-transform duration-300 hover:scale-110">
          <Dna className="size-6 stroke-[2.2]" />
        </div>
      </div>

      {/* 5. Bottom-Left: Activity (ECG Wave) */}
      <div className="absolute bottom-14 left-14 z-20 animate-float-medium">
        <div className="flex items-center justify-center size-14 rounded-2xl bg-white/90 backdrop-blur-md border border-white/80 shadow-[0_8px_20px_rgba(23,63,114,0.09)] text-primary transition-transform duration-300 hover:scale-110">
          <Activity className="size-7 stroke-[2.2]" />
        </div>
      </div>

      {/* 6. Bottom-Right: ShieldPlus (Medical Protection) */}
      <div className="absolute bottom-14 right-14 z-20 animate-float-slow">
        <div className="flex items-center justify-center size-14 rounded-2xl bg-white/90 backdrop-blur-md border border-white/80 shadow-[0_8px_20px_rgba(23,63,114,0.09)] text-primary transition-transform duration-300 hover:scale-110">
          <ShieldPlus className="size-7 stroke-[2.2]" />
        </div>
      </div>

      {/* Subtle floating medical crosses / sparkles */}
      <div className="absolute top-1/4 left-1/4 z-10 animate-float-reverse opacity-40">
        <span className="text-2xl font-black text-primary/40">+</span>
      </div>
      <div className="absolute top-1/3 right-1/4 z-10 animate-float-slow opacity-40">
        <Sparkles className="size-5 text-primary/40" />
      </div>
      <div className="absolute bottom-1/3 left-1/3 z-10 animate-float-fast opacity-40">
        <span className="text-xl font-black text-primary/40">+</span>
      </div>
      <div className="absolute bottom-1/4 right-1/3 z-10 animate-float-reverse opacity-40">
        <span className="text-2xl font-black text-primary/40">+</span>
      </div>

      {/* =========================================================================
          Center Lottie Animation
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-lg aspect-square flex items-center justify-center">
        <LottieAnimation
          srcPaths={srcPaths}
          fallback={fallback}
          className="w-full h-full flex items-center justify-center"
        />
      </div>
    </div>
  );
}
