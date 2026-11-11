import React from "react";
import { UserDetails } from "@/components/dashboard/admin/users/UserDetails";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return {
    title: `User Details | Admin Dashboard - CorVera Pro`,
    description: `View user account details and permissions.`,
  };
}

export default async function UserDetailsPage({ params }: Props) {
  const { id } = await params;
  return <UserDetails userId={id} />;
}

