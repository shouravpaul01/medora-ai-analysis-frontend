import React from "react";
import { MessageSquare } from "lucide-react";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section className="relative overflow-hidden bg-[#F0F7FF] pt-12 sm:pt-16 pb-20 sm:pb-24">
      {/* Ambient background glows matching design */}
      <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-blue-100/60 blur-3xl" />
      <div className="pointer-events-none absolute top-12 right-0 size-96 rounded-full bg-amber-200/30 blur-3xl" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <p className="text-primary font-medium text-xs sm:text-sm tracking-wide mb-3">
            Get in touch
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.14] mb-4">
            Request a Demo
          </h1>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed">
            Contact our team to request a Demo for your practice, hospital, or device clinic.
          </p>
        </div>

        {/* 2-Column Contact Card */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="grid md:grid-cols-12">
            {/* Left Column: Deep Navy Sidebar */}
            <div className="md:col-span-5 bg-[#102A4E] text-white p-7 sm:p-9 lg:p-10 flex flex-col justify-between">
              <div>
                {/* Icon Badge */}
                <div className="size-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#E5A83B] shadow-inner">
                  <MessageSquare className="size-5 text-[#E5A83B]" />
                </div>

                {/* Heading */}
                <h2 className="text-2xl sm:text-[26px] font-bold text-white tracking-tight mt-6 leading-snug">
                  Start a conversation
                </h2>

                {/* Subtext */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-3">
                  Use this form for questions about CorVera Pro. Please do not
                  include patient information, medical records, or other
                  sensitive clinical data.
                </p>
              </div>

              {/* Contact Information Box */}
              <div className="border border-dashed border-white/20 bg-white/[0.04] rounded-2xl p-4 sm:p-5 mt-10 md:mt-16">
                <p className="text-[#E5A83B] text-xs font-semibold tracking-wider">
                  Contact information
                </p>
                <h4 className="text-white text-sm font-semibold mt-1.5">
                  Client-approved email pending
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed mt-1">
                  An email address will appear here only when supplied and
                  approved.
                </p>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="md:col-span-7 bg-white p-7 sm:p-9 lg:p-10">
              <div className="flex items-center justify-between gap-4 mb-1">
                <p className="text-primary font-medium text-xs sm:text-sm tracking-wide">
                  Message form
                </p>
                <span className="text-xs font-medium text-rose-500">
                  * Required
                </span>
              </div>

              <h3 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight mb-8">
                How can we help?
              </h3>

              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

