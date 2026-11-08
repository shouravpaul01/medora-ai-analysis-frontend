"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";

interface AdministratorAccessCardProps {
  role?: string;
}

export function AdministratorAccessCard({
  role = "Super User",
}: AdministratorAccessCardProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3.5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <ShieldCheck className="size-5" />
        </div>
        <div className="flex flex-col">
          <h4 className="text-sm sm:text-base font-semibold text-slate-900">
            Administrator Access
          </h4>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Your {role} role is shown for account context. Role and permission
            management are not changed from this screen.
          </p>
        </div>
      </div>

      <div className="flex sm:justify-end">
        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
          {role}
        </span>
      </div>
    </div>
  );
}

