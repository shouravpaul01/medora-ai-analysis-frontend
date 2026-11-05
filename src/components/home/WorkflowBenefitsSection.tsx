"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Activity, CheckCircle2, HeartPulse, Stethoscope } from "lucide-react";
import SectionHeader from "../shared/SectionHeader";

export default function WorkflowBenefitsSection() {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="about"
      className="bg-[#123258] text-white py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#E5A83B]/10 blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text */}
          <div className="lg:col-span-6">
            <SectionHeader
              align="left"
              theme="dark"
              tagline="Workflow benefits"
              title="Improved efficiency and clarity"
              highlightLead="Single-page report summaries built to boost speed and operational efficiency in your device clinic."
              description="Turn complex device interrogations into actionable single-page summaries. Empower your clinical team to evaluate device function in seconds, eliminate backlogs, and optimize patient care."
            />
          </div>

          {/* Right Column: Image or Fallback */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-slate-900/60 relative aspect-[4/3] flex items-center justify-center">
              {!imageError ? (
                <Image
                  src="/images/workflow-benefits.png"
                  alt="Clinical Workflow Benefits - Device Interrogation"
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                /* Fallback Scene Card */
                <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-[#1E4575] via-[#16355C] to-[#0E2542] text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-300">
                        <Activity className="size-5" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold block">
                          Device Interrogation
                        </span>
                        <span className="text-[10px] text-blue-200">
                          Point-of-Care Session
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-medium">
                      <CheckCircle2 className="size-3.5" />
                      <span>Interrogation Live</span>
                    </div>
                  </div>

                  {/* Visual Monitor Mockup */}
                  <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-xs font-medium text-blue-100 flex items-center gap-1.5">
                        <HeartPulse className="size-4 text-rose-400" />
                        Dual Chamber Pacemaker (DDDR)
                      </span>
                      <span className="text-[10px] text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded">
                        Normal
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 rounded bg-white/5">
                        <span className="text-[10px] text-blue-200 block">
                          Battery Voltage
                        </span>
                        <span className="text-xs font-bold text-white">
                          2.82 V (OK)
                        </span>
                      </div>
                      <div className="p-2 rounded bg-white/5">
                        <span className="text-[10px] text-blue-200 block">
                          RA Impedance
                        </span>
                        <span className="text-xs font-bold text-white">
                          520 Ω
                        </span>
                      </div>
                      <div className="p-2 rounded bg-white/5">
                        <span className="text-[10px] text-blue-200 block">
                          RV Threshold
                        </span>
                        <span className="text-xs font-bold text-white">
                          0.75 V @ 0.4ms
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-blue-200">
                    <span className="flex items-center gap-1.5">
                      <Stethoscope className="size-3.5 text-blue-300" />
                      Fast 60-Second AI Clinical Summary
                    </span>
                    <span className="text-[#E5A83B] font-medium">
                      Actionable Insights
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
