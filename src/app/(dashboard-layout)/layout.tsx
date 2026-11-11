import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#F8FAFC] min-h-screen flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 sm:p-8 lg:p-10 relative overflow-hidden">
          {/* Ambient background glow matching the design */}
          <div className="pointer-events-none absolute -top-32 right-0 size-96 rounded-full bg-amber-100/30 blur-3xl" />
          <div className="pointer-events-none absolute top-1/3 -left-32 size-96 rounded-full bg-blue-100/25 blur-3xl" />
          <div className="relative z-10 w-full">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
