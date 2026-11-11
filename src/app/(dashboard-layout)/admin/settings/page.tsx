import React from "react";
import { AdminSettingsView } from "@/components/dashboard/admin/settings";

export const metadata = {
  title: "Admin Settings | CorVera Pro",
  description: "Manage your administrator profile and account security.",
};

export default function AdminSettingsPage() {
  return <AdminSettingsView />;
}

