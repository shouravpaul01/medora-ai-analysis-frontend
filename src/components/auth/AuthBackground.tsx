import React from "react";

export default function AuthBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#FCFDFF]">
      {/* Top Left Warm Golden Glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] bg-[#FCF5D5] rounded-full blur-3xl opacity-60" />

      {/* Bottom Left Soft Lavender / Purple Glow */}
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-[600px] w-[600px] bg-[#F5E9FF] rounded-full blur-3xl opacity-50" />

      {/* Subtle Bottom Right Ambient Tint */}
      <div className="pointer-events-none absolute top-1/3 -right-40 h-[500px] w-[500px] bg-[#FCF5D5] rounded-full blur-3xl opacity-30" />

      {/* Main Content */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}
