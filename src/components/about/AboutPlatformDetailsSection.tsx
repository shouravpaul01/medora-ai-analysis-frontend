import React from "react";
import Image from "next/image";
import SectionHeader from "../shared/SectionHeader";

export default function AboutPlatformDetailsSection() {
  return (
    <section className="py-16 sm:py-24 container bg-white ">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Platform Details Description */}
        <div className="lg:col-span-5 xl:col-span-5">
          <SectionHeader
            align="left"
            tagline="What the platform does"
            title="Real-time report analysis, summarization, and data discovery."
            titleClassName="text-3xl sm:text-4xl lg:text-[42px] leading-tight"
            description="CorVera relies strictly on official manufacturer interrogation PDFs to process device reports. We never store data for operational use, generate synthetic metrics, or suggest diagnoses or treatments—keeping full diagnostic authority where it belongs: with your clinical team."
            descriptionClassName="text-slate-600 text-sm sm:text-base leading-relaxed mt-4"
          />
        </div>

        {/* Right Column: Platform photo (platform.png) without any separate background, enlarged display */}
        <div className="lg:col-span-7 xl:col-span-7 flex justify-center lg:justify-end items-center">
          <div className="relative w-full max-w-[660px] xl:max-w-[720px] transition-transform duration-300 hover:scale-[1.01]">
            <Image
              src="/images/platform.png"
              alt="Real-time report analysis with clinical team"
              width={614}
              height={399}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(23,63,114,0.14)] block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
