import React from "react";
import { UserForm } from "@/components/dashboard/admin/users/UserForm";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return {
    title: `Edit User | Admin Dashboard - CorVera Pro`,
    description: `Update the user's account details and permissions.`,
  };
}

export default async function EditUserPage({ params }: Props) {
  const { id } = await params;
  return <UserForm userId={id} mode="edit" />;
}
