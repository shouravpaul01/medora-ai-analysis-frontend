import HeroSection from "@/components/home/HeroSection";
import ProductOverviewSection from "@/components/home/ProductOverviewSection";
import WorkflowBenefitsSection from "@/components/home/WorkflowBenefitsSection";
import SecurityCertificationSection from "@/components/home/SecurityCertificationSection";
import WorkspaceCtaBanner from "@/components/home/WorkspaceCtaBanner";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <HeroSection />
      <ProductOverviewSection />
      <WorkflowBenefitsSection />
      <SecurityCertificationSection />
      <WorkspaceCtaBanner />
    </div>
  );
}
