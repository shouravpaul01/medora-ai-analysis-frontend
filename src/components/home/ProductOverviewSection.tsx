import React from "react";
import { ArrowRight, FileText } from "lucide-react";
import SectionHeader from "../shared/SectionHeader";

// Distinct 4-color palette matching the design:
// 01: Warm Peach/Ivory, 02: Fresh Mint/Green, 03: Soft Blush Pink/Rose, 04: Pale Ice Blue/Sky
const processSteps = [
  {
    step: "01",
    title: "Import Documents",
    description: "Upload in-clinic interrogation PDFs",
    cardBg: "#FAF1E6",
    cardBorder: "#F3E5D4",
    iconBg: "#F3DCBE",
    iconColor: "#CD7732",
    stepColor: "#E2B48A",
    icon: <FileText className="size-5 stroke-[2.2]" />,
  },
  {
    step: "02",
    title: "Review Summary",
    description: "Inspect document content and available AI-assisted summary.",
    cardBg: "#EBF5ED",
    cardBorder: "#DBECE0",
    iconBg: "#D2EAD6",
    iconColor: "#3E9447",
    stepColor: "#99CCA3",
    icon: (
      <svg
        className="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Interact",
    description: "Learn more from the report with chat functionality.",
    cardBg: "#FAEDE9",
    cardBorder: "#F4DBD3",
    iconBg: "#F5D4CA",
    iconColor: "#D4634D",
    stepColor: "#E79E8F",
    icon: (
      <svg
        className="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M7 8h10" />
        <path d="M12 8v8" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Verify and Export",
    description:
      "Review finalized documents through the export verification workflow.",
    cardBg: "#EBF5F8",
    cardBorder: "#D6EDF3",
    iconBg: "#CCEBF1",
    iconColor: "#2796AF",
    stepColor: "#86C5D4",
    icon: (
      <svg
        className="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
        <polyline points="16 8 12 4 8 8" />
        <line x1="12" y1="4" x2="12" y2="15" />
      </svg>
    ),
  },
];

export default function ProductOverviewSection() {
  return (
    <section id="overview" className="py-12 sm:py-20 px-4 container">
      {/* Outer Rounded Container with background video */}
      <div className="relative rounded-3xl sm:rounded-[36px] border border-slate-200/80  overflow-hidden p-6 sm:p-12 lg:p-16 shadow-xs">
        {/* Background autoplay video */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover opacity-25"
          >
            <source src="/videos/product-overview.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Content Container */}
        <div className="relative z-10">
          {/* Header */}
          <SectionHeader
            align="center"
            tagline="Product overview"
            title="Secure. Real-Time. Agnostic."
            description="Your patient's data is not retained, shared, or used to train models. Report summaries are generated within 60 seconds without human intervention. Supported brands: Medtronic, Boston Scientific, Abbott/St. Jude, Biotronik."
            className="mb-12 sm:mb-16"
          />

          {/* 4 Cards Grid - Each with distinct color from the design */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4 relative">
            {processSteps.map((item, idx) => (
              <div key={item.step} className="relative flex">
                {/* Process Step Card */}
                <div
                  className="w-full rounded-2xl p-6 sm:p-7 border shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md"
                  style={{
                    backgroundColor: item.cardBg,
                    borderColor: item.cardBorder,
                  }}
                >
                  <div>
                    {/* Top Row: Icon + Step number */}
                    <div className="flex items-center justify-between mb-8 sm:mb-12">
                      <div
                        className="size-11 rounded-xl flex items-center justify-center shadow-2xs"
                        style={{
                          backgroundColor: item.iconBg,
                          color: item.iconColor,
                        }}
                      >
                        {item.icon}
                      </div>

                      <span
                        className="text-2xl sm:text-[26px] font-bold tracking-tight"
                        style={{ color: item.stepColor }}
                      >
                        {item.step}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-[19px] font-bold text-slate-900 mb-2 tracking-tight">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Arrow indicator between cards on desktop */}
                {idx < processSteps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 size-7 rounded-full bg-white shadow-xs border border-slate-200/90 text-slate-400 items-center justify-center">
                    <ArrowRight className="size-3.5 stroke-[2.5]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
