"use client";

import React from "react";
import { User, KeyRound } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserSettingsProfileSidebarProps {
  activeTab: "personal" | "security";
  onSelectTab: (tab: "personal" | "security") => void;
  name: string;
  role: string;
  initials: string;
}

export function UserSettingsProfileSidebar({
  activeTab,
  onSelectTab,
  name,
  role,
  initials,
}: UserSettingsProfileSidebarProps) {
  return (
    <div className="w-full md:w-64 shrink-0 rounded-2xl border border-slate-100 bg-white p-6 shadow-xs flex flex-col items-center gap-5">
      {/* Avatar Circle */}
      <div className="size-18 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center text-xl font-bold shadow-2xs">
        {initials}
      </div>

      {/* Name & Role */}
      <div className="flex flex-col items-center text-center">
        <h3 className="text-base font-bold text-slate-900">{name}</h3>
        <p className="text-xs text-slate-500 mt-0.5">{role}</p>
      </div>

      {/* Tab Navigation List */}
      <div className="w-full flex flex-col gap-1.5 pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={() => onSelectTab("personal")}
          className={cn(
            "w-full h-11 px-4 rounded-xl font-medium text-xs sm:text-sm flex items-center gap-3 transition-colors cursor-pointer text-left",
            activeTab === "personal"
              ? "bg-primary text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          )}
        >
          <User className="size-4 shrink-0" />
          <span>Personal Information</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab("security")}
          className={cn(
            "w-full h-11 px-4 rounded-xl font-medium text-xs sm:text-sm flex items-center gap-3 transition-colors cursor-pointer text-left",
            activeTab === "security"
              ? "bg-primary text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          )}
        >
          <KeyRound className="size-4 shrink-0" />
          <span>Security</span>
        </button>
      </div>
    </div>
  );
}

