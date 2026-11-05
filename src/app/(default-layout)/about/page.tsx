import React from "react";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import AboutPlatformDetailsSection from "@/components/about/AboutPlatformDetailsSection";
import AboutWorkflowSection from "@/components/about/AboutWorkflowSection";
import WorkspaceCtaBanner from "@/components/home/WorkspaceCtaBanner";

export const metadata = {
  title: "About Us | CorVera Pro",
  description:
    "CorVera Pro is an AI powered cardiac implantable electronic device report analysis application for in-clinic point-of-care interrogation.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <AboutHeroSection />
      <AboutPlatformDetailsSection />
      <AboutWorkflowSection />
      <WorkspaceCtaBanner />
    </div>
  );
}

