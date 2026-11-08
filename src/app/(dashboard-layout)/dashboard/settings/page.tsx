import React from "react";
import { UserSettingsView } from "@/components/dashboard/settings/UserSettingsView";

export const metadata = {
  title: "User Settings | CorVera Pro",
  description: "Manage your personal information, institutional details, and security.",
};

export default function UserSettingsPage() {
  return <UserSettingsView />;
}

