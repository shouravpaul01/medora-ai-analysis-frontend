import React from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCards } from "./StatCards";
import { RecentUsersTable } from "./RecentUsersTable";

export default function AdminOverview() {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 pb-12">
      {/* Header */}
      <PageHeader
        title="Welcome to CorVera"
        description="Automated Device Management System"
      />

      {/* Stat Cards */}
      <StatCards />

      {/* Recently Added Users Table */}
      <RecentUsersTable />
    </div>
  );
}

