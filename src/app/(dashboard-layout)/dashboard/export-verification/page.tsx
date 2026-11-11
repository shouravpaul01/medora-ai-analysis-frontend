import React from "react";
import { ExportVerificationView } from "@/components/dashboard/export-verification/ExportVerificationView";

export const metadata = {
  title: "Export Verification | CorVera Pro",
  description: "View and verify processed reports.",
};

export default function ExportVerificationPage() {
  return <ExportVerificationView />;
}

