import React from "react";
import ContactSection from "@/components/contact/ContactSection";
import WorkspaceCtaBanner from "@/components/home/WorkspaceCtaBanner";

export const metadata = {
  title: "Contact Us | CorVera Pro",
  description:
    "Contact our team to request a Demo for your practice, hospital, or device clinic.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <ContactSection />
      <WorkspaceCtaBanner />
    </div>
  );
}

