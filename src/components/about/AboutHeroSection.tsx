import React from "react";
import Image from "next/image";

export default function AboutHeroSection() {
  return (
    <section className="relative overflow-hidden  bg-[#F0F7FF] pt-10 sm:pt-16 pb-0">
      {/* Ambient background glows matching design */}
      {/* <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" /> */}

      {/*<div className="pointer-events-none absolute top-1/2 -right-24 h-96 w-96 rounded-full bg-[#173F72]/5 blur-3xl" /> */}

      <div className="container  relative z-10 flex flex-col justify-between">
        <div className="pointer-events-none absolute -top-32 right-0 size-96 rounded-full bg-amber-200/40 blur-3xl" />
        {/* Top Grid: Headline + Banner 1 */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Heading and Description */}
          <div className="lg:col-span-7 text-left">
            <p className="text-primary font-medium text-xs sm:text-sm tracking-wide mb-3">
              About the platform
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-slate-900 leading-[1.14] mb-5">
              About CorVera Pro
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
              CorVera Pro is an AI powered cardiac implantable electronic device
              report analysis application for in-clinic point-of-care
              interrogation.
            </p>
          </div>

          {/* Right Column: Hero About Banner 1 (Clean, natural transparency & shadow) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
            <div className="relative w-full max-w-[500px] transition-transform duration-300 hover:scale-[1.01]">
              <Image
                src="/images/hero-about-banner1.png"
                alt="Your AI Agent for Point-of-Care CIED Interrogations"
                width={528}
                height={252}
                priority
                className="w-full h-auto object-contain block drop-shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Bottom Full-Width Card: Hero About Banner 2 (Full container width & smooth bottom transition) */}
        <div className="mt-14 sm:mt-20 w-full relative">
          <div className="relative w-full transition-transform duration-300 hover:scale-[1.002]">
            <Image
              src="/images/hero-about-banner2.png"
              alt="CorVera Pro Dashboard Overview"
              width={1270}
              height={387}
              priority
              sizes="(max-width: 1400px) 100vw, 1280px"
              className="w-full h-auto object-contain block drop-shadow-md"
            />
            {/* Smooth gradient fade at the bottom to merge seamlessly with the white section below */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 sm:h-20 bg-gradient-to-b from-transparent via-white/40 to-white" />
          </div>
        </div>
      </div>
    </section>
  );
}
