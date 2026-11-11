import React from "react";
import { ClinicsList } from "@/components/dashboard/admin/clinics/ClinicsList";

export const metadata = {
  title: "Device Clinics | Admin Dashboard - CorVera Pro",
  description: "Manage Device Clinic accounts and their associated records.",
};

export default function AdminClinicsPage() {
  return <ClinicsList />;
}

