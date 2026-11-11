import React from "react";
import { AddClinicForm } from "@/components/dashboard/admin/clinics/AddClinicForm";

export const metadata = {
  title: "Add Device Clinic | Admin Dashboard - CorVera Pro",
  description: "Fill in the required information to add a Device Clinic.",
};

export default function AddClinicPage() {
  return <AddClinicForm />;
}

