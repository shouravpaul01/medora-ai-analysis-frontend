"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageHeader";
import { initialAdminUsers, type AdminUserItem } from "./types";
import { cn } from "@/lib/utils";

interface UserDetailsProps {
  userId?: string;
}

export function UserDetails({ userId = "1" }: UserDetailsProps) {
  const user: AdminUserItem = useMemo(() => {
    return (
      initialAdminUsers.find((u) => u.id === userId) || initialAdminUsers[0]
    );
  }, [userId]);

  const isAdmin = user.role === "Admin";

  return (
    <div className="w-full flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <PageHeader
        backLink={{ href: "/admin/users", label: "Back to Users" }}
        title={user.name}
        description="User account details"
        action={
          <Link href={`/admin/users/${user.id}/edit`}>
            <Button className="h-11 px-5">
              <Pencil className="size-4" />
              <span>Edit User</span>
            </Button>
          </Link>
        }
      />

      {/* Main Details Card */}
      <Card className="border-slate-100 bg-white shadow-xs rounded-2xl py-0 overflow-hidden">
        {/* Top Header Section inside card */}
        <div className="p-6 sm:p-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="size-13 bg-slate-100 text-slate-700 shrink-0">
              <AvatarFallback className="text-sm font-bold bg-slate-100 text-slate-700">
                {user.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {user.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {user.email}
              </p>
            </div>
          </div>

          <Badge
            variant="secondary"
            className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold border-0",
              isAdmin
                ? "bg-[#EBF3FC] text-[#173F72] hover:bg-[#EBF3FC]"
                : "bg-[#E8F8F0] text-[#1DB954] hover:bg-[#E8F8F0]"
            )}
          >
            {user.role}
          </Badge>
        </div>

        {/* 2x2 Grid Section */}
        <div className="border-t border-slate-100 grid grid-cols-1 md:grid-cols-2">
          {/* Cell 1: Name */}
          <div className="p-6 sm:p-7 border-b md:border-r border-slate-100 flex flex-col justify-center">
            <span className="text-xs font-medium text-slate-400 mb-1">Name</span>
            <span className="text-sm sm:text-base font-semibold text-slate-900">
              {user.name}
            </span>
          </div>

          {/* Cell 2: Email Address */}
          <div className="p-6 sm:p-7 border-b border-slate-100 flex flex-col justify-center">
            <span className="text-xs font-medium text-slate-400 mb-1">
              Email Address
            </span>
            <span className="text-sm sm:text-base font-semibold text-slate-900">
              {user.email}
            </span>
          </div>

          {/* Cell 3: Role */}
          <div className="p-6 sm:p-7 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col justify-center">
            <span className="text-xs font-medium text-slate-400 mb-1">Role</span>
            <span className="text-sm sm:text-base font-semibold text-slate-900">
              {user.role}
            </span>
          </div>

          {/* Cell 4: Device Clinic */}
          <div className="p-6 sm:p-7 flex flex-col justify-center">
            <span className="text-xs font-medium text-slate-400 mb-1">
              Device Clinic
            </span>
            <span className="text-sm sm:text-base font-semibold text-slate-900">
              {user.deviceClinic}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

