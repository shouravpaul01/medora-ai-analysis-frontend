import React from "react";
import {
  LayoutDashboard,
  Upload,
  UserPlus,
  Users,
  FileStack,
  Cpu,
  FileCheck2,
  Settings,
  LogOut,
  Search,
  FileText,
  Send,
  User,
  Activity,
} from "lucide-react";
import Logo from "../shared/Logo";

export default function DashboardMockup() {
  return (
    <div className="w-full bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-2xl overflow-hidden text-[11px] sm:text-xs select-none">
      {/* Top Header Bar */}
      <div className="h-11 sm:h-12 border-b border-slate-100 px-4 flex items-center justify-between bg-white">
        <div className="scale-75 origin-left -ml-2">
          <Logo width={140} height={40} priority={false} />
        </div>
        <div className="flex items-center gap-2 text-slate-700">
          <div className="size-6 sm:size-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
            <User className="size-3.5" />
          </div>
          <span className="text-[11px] sm:text-xs font-medium text-slate-700">
            Alex Smith
          </span>
        </div>
      </div>

      {/* Body: Sidebar + Main Content */}
      <div className="grid grid-cols-12 min-h-[380px] sm:min-h-[440px]">
        {/* Left Sidebar */}
        <div className="col-span-4 sm:col-span-3 border-r border-slate-100 p-2.5 sm:p-3 flex flex-col justify-between bg-slate-50/50">
          <div className="space-y-1">
            {/* Overview - Active */}
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-[#173F72] text-white font-medium text-[10px] sm:text-[11px] shadow-2xs">
              <LayoutDashboard className="size-3 sm:size-3.5 shrink-0" />
              <span className="truncate">Overview</span>
            </div>

            {/* Inactive menu items */}
            {[
              { label: "Import Interrogation", icon: Upload },
              { label: "Create Patient", icon: UserPlus },
              { label: "Patient Profiles", icon: Users },
              { label: "Document Queue", icon: FileStack },
              { label: "Automated Processing", icon: Cpu },
              { label: "Export Verification", icon: FileCheck2 },
              { label: "User Settings", icon: Settings },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-slate-600 hover:bg-slate-100 text-[10px] sm:text-[11px] transition-colors"
              >
                <item.icon className="size-3 sm:size-3.5 shrink-0 text-slate-400" />
                <span className="truncate">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Logout */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-rose-500 text-[10px] sm:text-[11px] font-medium">
              <LogOut className="size-3 shrink-0" />
              <span>Logout</span>
            </div>
          </div>
        </div>

        {/* Right Main Panel */}
        <div className="col-span-8 sm:col-span-9 p-3.5 sm:p-5 bg-white flex flex-col gap-4">
          {/* Welcome Header */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              Welcome to CorVera
            </h3>
            <p className="text-[10px] sm:text-[11px] text-slate-500">
              Automated Device Management System
            </p>
          </div>

          {/* Quick Actions */}
          <div>
            <h4 className="text-[10px] sm:text-[11px] font-semibold text-slate-700 mb-2">
              Quick Actions
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {/* Green Card: Search Patients */}
              <div className="p-2 sm:p-2.5 rounded-lg border border-slate-100 bg-white hover:border-emerald-200 transition-colors flex flex-col items-center text-center gap-1.5">
                <div className="size-7 sm:size-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                  <Search className="size-3.5 sm:size-4" />
                </div>
                <span className="text-[9px] sm:text-[10px] font-medium text-slate-700 leading-tight">
                  Search Patients (2,847)
                </span>
              </div>

              {/* Purple Card: Import Interrogation */}
              <div className="p-2 sm:p-2.5 rounded-lg border border-slate-100 bg-white hover:border-purple-200 transition-colors flex flex-col items-center text-center gap-1.5">
                <div className="size-7 sm:size-8 rounded-lg bg-purple-500 text-white flex items-center justify-center shadow-xs">
                  <Upload className="size-3.5 sm:size-4" />
                </div>
                <span className="text-[9px] sm:text-[10px] font-medium text-slate-700 leading-tight">
                  Import Interrogation
                </span>
              </div>

              {/* Orange Card: Pending Documents */}
              <div className="p-2 sm:p-2.5 rounded-lg border border-slate-100 bg-white hover:border-amber-200 transition-colors flex flex-col items-center text-center gap-1.5">
                <div className="size-7 sm:size-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
                  <FileText className="size-3.5 sm:size-4" />
                </div>
                <span className="text-[9px] sm:text-[10px] font-medium text-slate-700 leading-tight">
                  Pending Documents (23)
                </span>
              </div>

              {/* Cyan Card: Analysis Complete */}
              <div className="p-2 sm:p-2.5 rounded-lg border border-slate-100 bg-white hover:border-sky-200 transition-colors flex flex-col items-center text-center gap-1.5">
                <div className="size-7 sm:size-8 rounded-lg bg-sky-500 text-white flex items-center justify-center shadow-xs">
                  <Send className="size-3.5 sm:size-4" />
                </div>
                <span className="text-[9px] sm:text-[10px] font-medium text-slate-700 leading-tight">
                  Analysis Complete (156)
                </span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-1">
            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-slate-700 mb-2">
              <Activity className="size-3 text-primary" />
              <span>Recent Activity</span>
            </div>

            <div className="space-y-1.5">
              {[
                { title: "Document uploaded", patient: "Johnson, Jack", time: "5 minutes ago" },
                { title: "Analysis completed", patient: "Jackson, Michael", time: "12 minutes ago" },
                { title: "Patient profile created", patient: "Davis, Sarah", time: "1 hour ago" },
                { title: "Export to EHR", patient: "Wilson, Emma", time: "2 hours ago" },
              ].map((act, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-1 px-2 rounded bg-slate-50/70 border border-slate-100/60 text-[9px] sm:text-[10px]"
                >
                  <div>
                    <span className="font-medium text-slate-800">{act.title}</span>
                    <span className="text-slate-500 ml-1.5 text-[8.5px] sm:text-[9.5px]">
                      {act.patient}
                    </span>
                  </div>
                  <span className="text-slate-400 text-[8px] sm:text-[9px]">{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

