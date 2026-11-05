import React from "react";
import { User, FileText, Sparkles, Upload, ArrowRight } from "lucide-react";

const workflowSteps = [
  {
    title: "Patient Information",
    icon: User,
  },
  {
    title: "Document Import",
    icon: FileText,
  },
  {
    title: "Analysis Review",
    icon: Sparkles,
  },
  {
    title: "Export Verification",
    icon: Upload,
  },
];

export default function AboutWorkflowSection() {
  return (
    <section className="bg-gradient-to-b from-[#EEF5FD] to-[#E4F0FB] py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Top Header: Two Columns (Left: Heading, Right: Subtitle) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-xl">
            <p className="text-primary font-semibold text-xs sm:text-sm tracking-wider uppercase mb-2">
              Platform workflow
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-slate-900 leading-tight">
              Reduce Device Clinic Staffing Needs
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              An intuitive, rapid analysis workflow that empowers a single technician
              to manage higher report volumes with total ease.
            </p>
          </div>
        </div>

        {/* White Horizontal Workflow Steps Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm border border-slate-100/90 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-4 relative items-center">
            {workflowSteps.map((step, idx) => (
              <div key={step.title} className="relative flex flex-col items-center text-center">
                {/* Circular Icon Container */}
                <div className="size-12 sm:size-14 rounded-full bg-slate-100/90 border border-slate-200/60 text-slate-700 flex items-center justify-center shadow-2xs transition-transform duration-300 hover:scale-110 hover:bg-blue-50 hover:text-primary">
                  <step.icon className="size-5 sm:size-6 stroke-[2]" />
                </div>

                {/* Step Title */}
                <span className="text-xs sm:text-sm font-semibold text-slate-800 mt-4 leading-snug">
                  {step.title}
                </span>

                {/* Connecting Arrow between items on Desktop */}
                {idx < workflowSteps.length - 1 && (
                  <div className="hidden md:flex absolute -right-3 top-6 -translate-y-1/2 z-10 size-6 rounded-full bg-slate-50 border border-slate-200 text-slate-400 items-center justify-center">
                    <ArrowRight className="size-3 stroke-[2.5]" />
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

