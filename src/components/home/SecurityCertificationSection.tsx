import React from "react";
import Image from "next/image";
import SectionHeader from "../shared/SectionHeader";

const certifications = [
  {
    name: "HITRUST Certification",
    src: "/images/security2.png",
    width: 174,
    height: 55,
    imgClass: "max-h-14 sm:max-h-16 w-auto object-contain",
  },
  {
    name: "AICPA SOC 2 Certification",
    src: "/images/security3.png",
    width: 138,
    height: 139,
    imgClass: "max-h-24 sm:max-h-28 w-auto object-contain",
  },
  {
    name: "HIPAA Compliant",
    src: "/images/security4.png",
    width: 178,
    height: 81,
    imgClass: "max-h-16 sm:max-h-20 w-auto object-contain",
  },
  {
    name: "Secure 256-Bit Encryption",
    src: "/images/security5.png",
    width: 118,
    height: 144,
    imgClass: "max-h-24 sm:max-h-28 w-auto object-contain",
  },
];

export default function SecurityCertificationSection() {
  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <SectionHeader
          align="center"
          tagline="Security"
          title="Industry Standard for Security Certification"
          className="mb-12 sm:mb-16"
        />

        {/* Outer White Card Container */}
        <div className="bg-white rounded-3xl sm:rounded-[36px] p-6 sm:p-8 lg:p-10 border border-slate-100 shadow-[0_10px_40px_-15px_rgba(23,63,114,0.06)] max-w-6xl mx-auto grid md:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left Column: Doctor Workstation Photo (security1.png) */}
          <div className="md:col-span-6 relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[300px] sm:min-h-[420px] bg-slate-100 border border-slate-200/60 shadow-xs">
            <Image
              src="/images/security1.png"
              alt="Doctor reviewing device parameters at clinical workstation"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority={false}
            />
          </div>

          {/* Right Column: 2x2 Grid of 4 Security Badges */}
          <div className="md:col-span-6 grid grid-cols-2 gap-4 sm:gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="bg-[#F0F2F5] rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex items-center justify-center min-h-[140px] sm:min-h-[190px] border border-slate-200/50 transition-all duration-300 hover:bg-[#EAECEF] hover:shadow-2xs"
              >
                <div className="relative flex items-center justify-center p-2">
                  <Image
                    src={cert.src}
                    alt={cert.name}
                    width={cert.width}
                    height={cert.height}
                    className={cert.imgClass}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
