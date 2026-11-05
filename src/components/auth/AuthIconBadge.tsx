import React from "react";
import { cn } from "@/lib/utils";

interface AuthIconBadgeProps {
  icon: React.ReactNode;
  className?: string;
}

export default function AuthIconBadge({ icon, className }: AuthIconBadgeProps) {
  return (
    <div
      className={cn(
        "relative mx-auto mb-6 flex items-center justify-center select-none",
        className,
      )}
    >
      {/* 1. Pulsing Ambient Soft Glow */}
      <div className="absolute size-24 rounded-full bg-[#173F72]/15 blur-xl animate-pulse-ring pointer-events-none" />

      {/* 2. Expanding Outer Ripple Ring */}
      <div className="absolute size-20 rounded-full border border-[#173F72]/20 animate-pulse-ring pointer-events-none" />

      {/* 3. Floating Badge Container */}
      <div className="relative flex size-16 items-center justify-center rounded-full bg-[#EBF3FC]/85 p-1 ring-8 ring-[#EBF3FC]/50 shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-md animate-badge-float cursor-default">
        {/* Inner surface with light shimmer effect and gradient */}
        <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-b from-[#FFFFFF] via-[#F4F8FD] to-[#E5F0FC] border border-[#CFE2F8] shadow-[0_2px_8px_rgba(23,63,114,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] text-primary overflow-hidden">
          {/* Subtle Shimmer Sheen sweep across the badge */}
          <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none animate-shimmer-sweep" />

          {/* The Animated Icon */}
          <div className="relative z-10 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}
