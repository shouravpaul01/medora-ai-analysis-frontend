"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  UserPlus,
  Eye,
  Pencil,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Pagination } from "@/components/shared/Pagination";
import { PageHeader } from "@/components/shared/PageHeader";
import SearchInput from "@/components/shared/SearchInput";
import { initialAdminUsers, type AdminUserItem } from "./types";

export function UsersList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter users based on query
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return initialAdminUsers;
    const q = searchQuery.toLowerCase();
    return initialAdminUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q) ||
        u.deviceClinic.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleAction = (type: "view" | "edit", user: AdminUserItem) => {
    toast.info(`${type === "view" ? "Viewing" : "Editing"} ${user.name}`);
  };

  return (
    <div className="w-full flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <PageHeader
        title="Users"
        description="Manage your users and their roles"
        action={
          <Link href="/admin/users/create">
            <Button className="h-11 px-5">
              <UserPlus className="size-4" />
              <span>Create New User</span>
            </Button>
          </Link>
        }
      />

      {/* Main Table Card */}
      <Card className="border-slate-100 bg-white shadow-xs rounded-2xl py-0 overflow-hidden">
        {/* Search Input Bar */}
        <CardHeader className="p-6 pb-2">
          <div className="w-full max-w-md">
            <SearchInput
              value={searchQuery}
              onChange={(val) => {
                setSearchQuery(val);
                setCurrentPage(1);
              }}
              placeholder="Search users by name, role, or assigned device clinic..."
              className="h-10 rounded-xl border-slate-200"
            />
          </div>
        </CardHeader>

        {/* Table Content */}
        <CardContent className="p-6 pt-4">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-slate-100 hover:bg-transparent">
                <TableHead className="py-3 px-4 text-xs font-semibold text-slate-500">
                  Name
                </TableHead>
                <TableHead className="py-3 px-4 text-xs font-semibold text-slate-500">
                  Email
                </TableHead>
                <TableHead className="py-3 px-4 text-xs font-semibold text-slate-500">
                  Role
                </TableHead>
                <TableHead className="py-3 px-4 text-xs font-semibold text-slate-500">
                  Device Clinic
                </TableHead>
                <TableHead className="py-3 px-4 text-xs font-semibold text-slate-500 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-12 text-center text-slate-400 text-sm"
                  >
                    No users found matching your search.
                  </TableCell>
                </TableRow>
              ) : (
                currentUsers.map((user) => {
                  const isAdmin = user.role === "Admin";

                  return (
                    <TableRow
                      key={user.id}
                      className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors"
                    >
                      {/* Name with Avatar */}
                      <TableCell className="py-4 px-4 font-semibold text-slate-900">
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8 bg-slate-100 text-slate-700">
                            <AvatarFallback className="text-xs font-bold bg-slate-100 text-slate-700">
                              {user.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="truncate">{user.name}</span>
                        </div>
                      </TableCell>

                      {/* Email */}
                      <TableCell className="py-4 px-4 text-slate-600 text-xs sm:text-sm">
                        {user.email}
                      </TableCell>

                      {/* Role Badge */}
                      <TableCell className="py-4 px-4">
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
                      </TableCell>

                      {/* Device Clinic */}
                      <TableCell className="py-4 px-4 text-slate-700 text-xs sm:text-sm font-medium">
                        {user.deviceClinic}
                      </TableCell>

                      {/* Actions: View and Edit */}
                      <TableCell className="py-4 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                        <Link href={`/admin/users/${user.id}`}>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                          >
                            <Eye className="size-3.5 text-slate-400 mr-1" />
                            <span>View</span>
                          </Button>
                        </Link>

                        <Link href={`/admin/users/${user.id}/edit`}>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                          >
                            <Pencil className="size-3.5 text-slate-400 mr-1" />
                            <span>Edit</span>
                          </Button>
                        </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>

          {/* Table Footer & Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalData={filteredUsers.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>
    </div>
  );
}

