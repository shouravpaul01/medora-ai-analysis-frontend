import React from "react";
import { Users, Building2, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {/* Card 1: Total Users */}
      <Card className="group border-slate-100 bg-white shadow-xs hover:shadow-md transition-all cursor-pointer rounded-2xl py-0">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-13 items-center justify-center rounded-2xl bg-[#E8F8F0] text-[#1DB954] shadow-2xs shrink-0">
              <Users className="size-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-600">
                Total Users
              </span>
              <span className="text-3xl font-bold text-slate-900 tracking-tight mt-0.5">
                06
              </span>
              <span className="text-xs text-slate-400 mt-1">
                Managed user accounts
              </span>
            </div>
          </div>

          <div className="flex size-9 items-center justify-center rounded-full text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all shrink-0">
            <ArrowRight className="size-5" />
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Total Device Clinics */}
      <Card className="group border-slate-100 bg-white shadow-xs hover:shadow-md transition-all cursor-pointer rounded-2xl py-0">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-13 items-center justify-center rounded-2xl bg-[#FDF2F2] text-[#E05656] shadow-2xs shrink-0">
              <Building2 className="size-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-600">
                Total Device Clinics
              </span>
              <span className="text-3xl font-bold text-slate-900 tracking-tight mt-0.5">
                09
              </span>
              <span className="text-xs text-slate-400 mt-1">
                Device Clinic accounts
              </span>
            </div>
          </div>

          <div className="flex size-9 items-center justify-center rounded-full text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all shrink-0">
            <ArrowRight className="size-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

