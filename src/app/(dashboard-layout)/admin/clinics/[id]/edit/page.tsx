import React from "react";
import { EditClinicForm } from "@/components/dashboard/admin/clinics/EditClinicForm";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return {
    title: `Edit Device Clinic | Admin Dashboard - CorVera Pro`,
    description: `Update the Device Clinic account information and AI prompt.`,
  };
}

export default async function EditClinicPage({ params }: Props) {
  const { id } = await params;
  return <EditClinicForm clinicId={id} />;
}

