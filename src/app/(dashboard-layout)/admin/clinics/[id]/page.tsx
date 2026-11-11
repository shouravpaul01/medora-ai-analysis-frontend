import React from "react";
import { ClinicDetails } from "@/components/dashboard/admin/clinics/ClinicDetails";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return {
    title: `Device Clinic Details | Admin Dashboard - CorVera Pro`,
    description: `Device Clinic account details and successfully processed reports.`,
  };
}

export default async function ClinicDetailsPage({ params }: Props) {
  const { id } = await params;
  return <ClinicDetails clinicId={id} />;
}

