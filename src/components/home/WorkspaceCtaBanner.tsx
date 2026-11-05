import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "../shared/SectionHeader";

export default function WorkspaceCtaBanner() {
  return (
    <section className="bg-gradient-to-r from-[#173F72] via-[#1B4B85] to-[#205596] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Exact geometric circular ring overlay matching the reference design */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          viewBox="0 0 960 165"
          preserveAspectRatio="xMaxYMin meet"
          className="absolute right-0 top-0 h-full w-full min-w-[700px]"
          fill="none"
        >
          <circle
            cx="775"
            cy="0"
            r="90"
            stroke="rgba(255, 255, 255, 0.14)"
            strokeWidth="40"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 sm:gap-8 relative z-10">
        {/* Left Column: Heading and Subtitle */}
        <SectionHeader
          align="left"
          theme="dark"
          tagline="For existing users"
          taglineClassName="text-[#E5A83B] font-semibold text-xs sm:text-sm tracking-wide"
          title="Explore Your CorVera Pro Workspace"
          titleClassName="text-2xl sm:text-3xl lg:text-4xl"
          description="Existing users can sign in to access the CorVera Pro platform."
          descriptionClassName="text-blue-100/90 text-xs sm:text-sm md:text-base mt-1.5"
          className="max-w-2xl"
        />

        {/* Right Column: Sign In Button */}
        <div className="shrink-0">
          <Link href="/login">
            <Button
              className="bg-white hover:bg-slate-100 text-[#173F72] font-semibold px-6 sm:px-8 h-11 sm:h-12 rounded-xl sm:rounded-2xl shadow-sm transition-all hover:scale-[1.02] flex items-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4 text-[#173F72]" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
