"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardHeader() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-slate-100 bg-white/95 px-6 sm:px-8 backdrop-blur-md">
      {/* Left: Sidebar Trigger & Page Title */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1 text-slate-600 hover:text-slate-900" />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          {isAdmin ? "Admin Dashboard" : "Dashboard"}
        </h1>
      </div>

      {/* Right: Notifications & Profile Pill matching the reference designs */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Notification Bell (Only shown in user/technician dashboard as per design) */}
        {!isAdmin && (
          <button
            type="button"
            className="flex size-9 sm:size-10 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-600 shadow-2xs hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="size-4.5" />
          </button>
        )}

        {/* User Profile Avatar Pill */}
        <div className="flex items-center gap-3 pl-1">
          <div className="flex size-9 sm:size-10 items-center justify-center rounded-full bg-[#173F72] text-white font-bold text-xs sm:text-sm tracking-wide shadow-xs shrink-0">
            {isAdmin ? "SL" : "MA"}
          </div>
          <div className="text-left hidden xs:block">
            <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
              {isAdmin ? "Sam Lawson" : "Alex Morgan"}
            </p>
            <p className="text-[11px] text-slate-500 font-medium">
              {isAdmin ? "Admin" : "Technician"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
