import React from "react";
import { UserForm } from "@/components/dashboard/admin/users/UserForm";

export const metadata = {
  title: "Add New User | Admin Dashboard - CorVera Pro",
  description: "Create a new user account.",
};

export default function AddUserPage() {
  return <UserForm mode="create" />;
}
