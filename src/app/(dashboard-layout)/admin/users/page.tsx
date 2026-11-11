import React from "react";
import { UsersList } from "@/components/dashboard/admin/users/UsersList";

export const metadata = {
  title: "Users | Admin Dashboard - CorVera Pro",
  description: "Manage your users and their roles.",
};

export default function AdminUsersPage() {
  return <UsersList />;
}

