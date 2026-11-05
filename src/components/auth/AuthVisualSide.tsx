"use client";

import React from "react";
import LottieAnimation from "@/components/shared/LottieAnimation";
import {
  HeartPulse,
  Stethoscope,
  Sparkles,
  Radio,
  Activity,
  ShieldCheck,
  Plus,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthVisualSideProps {
  srcPaths: string[];
  fallback?: React.ReactNode;
  borderSide?: "left" | "right";
  className?: string;
}

interface PremiumBadgeProps {
  icon: React.ReactNode;
  glowColor: string;
  accentDotColor?: string;
  size?: "sm" | "md";
  className?: string;
}

function PremiumBadge({
  icon,
  glowColor,
  accentDotColor,
  size = "md",
  className,
}: PremiumBadgeProps) {
  const isSm = size === "sm";

  return (
    <div className={cn("group relative flex items-center justify-center select-none cursor-default", className)}>
      {/* 1. Ambient Dynamic Glow */}
      <div
        className={cn(
          "absolute -inset-1.5 rounded-2xl bg-gradient-to-r blur-lg opacity-45 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none",
          glowColor
        )}
      />

      {/* 2. Glassmorphic Outer Card with Inset Bevel */}
      <div
        className={cn(
          "relative flex items-center justify-center rounded-2xl p-[1px] bg-gradient-to-b from-white/95 via-white/80 to-white/40 shadow-[0_12px_28px_-4px_rgba(23,63,114,0.14),0_4px_12px_-2px_rgba(23,63,114,0.06)] backdrop-blur-xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:shadow-[0_20px_36px_-6px_rgba(23,63,114,0.22)]",
          isSm ? "size-12" : "size-14 sm:size-15"
        )}
      >
        {/* 3. High-Finish Inner Surface */}
        <div className="relative h-full w-full rounded-[15px] bg-gradient-to-b from-white via-white/90 to-[#F2F7FD] flex items-center justify-center overflow-hidden border border-white/80 shadow-[inset_0_1px_1px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(23,63,114,0.04)]">
          {/* Subtle Diagonal Shimmer Sheen */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-transparent pointer-events-none" />

          {/* Icon Container with Micro-scale on Hover */}
          <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>

          {/* Live Medical Device Pulse Dot */}
          {accentDotColor && (
            <span className="absolute top-2 right-2 flex size-2 pointer-events-none">
              <span
                className={cn(
                  "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                  accentDotColor
                )}
              />
              <span
                className={cn(
                  "relative inline-flex size-2 rounded-full ring-1 ring-white shadow-xs",
                  accentDotColor
                )}
              />
            </span>
          )}
        </div>
      </div>
    </div>
  );
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
          Floating Animated Premium Medical & CIED Badges
          ========================================================================= */}

      {/* 1. Top-Left: HeartPulse (Cardiac Health & Rhythm) */}
      <div className="absolute top-10 left-10 z-20 animate-float-slow">
        <PremiumBadge
          glowColor="from-rose-400/30 to-blue-500/25"
          accentDotColor="bg-rose-500"
          icon={<HeartPulse className="size-7 stroke-[2.2] text-[#173F72]" />}
        />
      </div>

      {/* 2. Top-Right: Stethoscope (Clinical Workflow) */}
      <div className="absolute top-12 right-12 z-20 animate-float-medium">
        <PremiumBadge
          glowColor="from-blue-400/30 to-indigo-500/25"
          accentDotColor="bg-blue-600"
          icon={<Stethoscope className="size-7 stroke-[2.2] text-[#173F72]" />}
        />
      </div>

      {/* 3. Mid-Left: Sparkles (AI-Powered Device Summaries) */}
      <div className="absolute top-1/2 -translate-y-16 left-8 z-20 animate-float-fast">
        <PremiumBadge
          size="sm"
          glowColor="from-amber-400/35 to-yellow-500/25"
          accentDotColor="bg-[#E5A83B]"
          icon={<Sparkles className="size-6 stroke-[2.2] text-[#E5A83B]" />}
        />
      </div>

      {/* 4. Mid-Right: Radio / Telemetry (Device Interrogation) */}
      <div className="absolute top-1/2 -translate-y-8 right-8 z-20 animate-float-reverse">
        <PremiumBadge
          size="sm"
          glowColor="from-sky-400/30 to-blue-500/25"
          accentDotColor="bg-sky-500"
          icon={<Radio className="size-6 stroke-[2.2] text-[#173F72]" />}
        />
      </div>

      {/* 5. Bottom-Left: Activity (ECG & Lead Signal Analysis) */}
      <div className="absolute bottom-12 left-12 z-20 animate-float-medium">
        <PremiumBadge
          glowColor="from-emerald-400/30 to-teal-500/25"
          accentDotColor="bg-emerald-500"
          icon={<Activity className="size-7 stroke-[2.2] text-emerald-600" />}
        />
      </div>

      {/* 6. Bottom-Right: ShieldCheck (HIPAA & Security Certified) */}
      <div className="absolute bottom-12 right-12 z-20 animate-float-slow">
        <PremiumBadge
          glowColor="from-blue-500/30 to-[#E5A83B]/30"
          accentDotColor="bg-[#E5A83B]"
          icon={<ShieldCheck className="size-7 stroke-[2.2] text-[#173F72]" />}
        />
      </div>

      {/* =========================================================================
          Micro Floating Clinical Accents (Refined Glass Badges)
          ========================================================================= */}
      <div className="absolute top-[22%] left-[24%] z-10 animate-float-reverse pointer-events-none opacity-60">
        <div className="flex items-center justify-center size-7 rounded-lg bg-white/70 backdrop-blur-sm border border-white/80 shadow-xs text-primary/60">
          <Plus className="size-3.5 stroke-[2.5]" />
        </div>
      </div>

      <div className="absolute top-[28%] right-[24%] z-10 animate-float-slow pointer-events-none opacity-60">
        <div className="flex items-center justify-center size-7 rounded-lg bg-white/70 backdrop-blur-sm border border-white/80 shadow-xs text-amber-500/70">
          <Sparkles className="size-3.5 stroke-[2.2]" />
        </div>
      </div>

      <div className="absolute bottom-[30%] left-[28%] z-10 animate-float-fast pointer-events-none opacity-60">
        <div className="flex items-center justify-center size-7 rounded-lg bg-white/70 backdrop-blur-sm border border-white/80 shadow-xs text-emerald-600/70">
          <Zap className="size-3.5 stroke-[2.2]" />
        </div>
      </div>

      <div className="absolute bottom-[24%] right-[28%] z-10 animate-float-reverse pointer-events-none opacity-60">
        <div className="flex items-center justify-center size-7 rounded-lg bg-white/70 backdrop-blur-sm border border-white/80 shadow-xs text-primary/60">
          <Plus className="size-3.5 stroke-[2.5]" />
        </div>
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
