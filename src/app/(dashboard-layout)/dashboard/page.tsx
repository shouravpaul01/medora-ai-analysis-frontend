import React from "react";
import ImportInterrogationForm from "@/components/dashboard/ImportInterrogationForm";

export const metadata = {
  title: "Dashboard | CorVera Pro",
  description: "Import patient interrogation summaries and reports.",
};

export default function DashboardPage() {
  return <ImportInterrogationForm />;
}
