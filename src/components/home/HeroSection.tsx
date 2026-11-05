"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardMockup from "./DashboardMockup";

export default function HeroSection() {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#F0F7FF] min-h-[calc(100vh-5rem)] flex items-center justify-center py-12 lg:py-0">
      <div className="container relative z-10">
        <div className="pointer-events-none absolute -top-72 right-0 size-96 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-6 xl:col-span-5 text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-primary font-medium text-xs sm:text-sm tracking-wide mb-4">
              <Activity className="size-4 text-primary animate-pulse" />
              <span>Re-inventing point-of-care reporting</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-slate-900 leading-[1.14]">
              AI Powered CIED
              <br />
              Interrogation
              <br />
              Summaries
            </h1>

            {/* Amber accent bar */}
            <div className="h-1 w-28 bg-[#E5A83B] rounded-full my-6" />

            {/* Description */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-lg mb-8">
              Streamline your clinic workflow with instant device interrogation
              summaries—engineered for faster device analysis, clearer insights,
              and smarter clinical decisions at the point of care.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/login">
                <Button className="bg-primary hover:bg-[#123258] text-white px-7 h-12 rounded-xl text-sm sm:text-base font-semibold flex items-center gap-2 shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 cursor-pointer">
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <a href="#overview">
                <Button
                  variant="outline"
                  className="bg-white hover:bg-slate-50 text-slate-800 border-slate-200 h-12 px-6 rounded-xl text-sm sm:text-base font-medium flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                >
                  <span>Learn More</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: hero-banner.png with 100% full visibility, no clipping, rounded corners & surrounding shadow */}
          <div className="lg:col-span-6 xl:col-span-7 flex justify-center lg:justify-end items-center relative">
            <div className="relative w-full max-w-[720px] xl:max-w-[760px] transition-transform duration-300 hover:scale-[1.01]">
              {!imageError ? (
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(23,63,114,0.15)] border border-slate-100/90 bg-white">
                  <Image
                    src="/images/hero-banner.png"
                    alt="CorVera CIED Interrogation Dashboard"
                    width={1904}
                    height={908}
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="w-full h-auto object-contain rounded-2xl sm:rounded-3xl block"
                    onError={() => setImageError(true)}
                  />
                </div>
              ) : (
                <DashboardMockup />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
