import React from "react";
import { StatCards } from "./StatCards";
import { RecentUsersTable } from "./RecentUsersTable";

export default function AdminOverview() {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Welcome to CorVera
        </h2>
        <p className="text-slate-500 text-sm sm:text-base">
          Automated Device Management System
        </p>
      </div>

      {/* Stat Cards */}
      <StatCards />

      {/* Recently Added Users Table */}
      <RecentUsersTable />
    </div>
  );
}

