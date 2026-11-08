"use client";

import React, { useState } from "react";
import { Eye, Pencil, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { sampleUsers, type UserItem } from "./types";

export function RecentUsersTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(sampleUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = sampleUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleAction = (type: "view" | "edit", user: UserItem) => {
    toast.info(`${type === "view" ? "Viewing" : "Editing"} ${user.name}`);
  };

  return (
    <Card className="border-slate-100 bg-white shadow-xs rounded-2xl py-0 overflow-hidden">
      {/* Card Header */}
      <CardHeader className="p-6 sm:p-7 pb-2 gap-0.5">
        <CardTitle className="text-lg font-bold text-slate-900 tracking-tight">
          Recently Added Users
        </CardTitle>
        <CardDescription className="text-xs text-slate-400">
          The latest user accounts added to CorVera Pro.
        </CardDescription>
      </CardHeader>

      {/* Card Content with shadcn Table */}
      <CardContent className="p-6 sm:p-7 pt-4">
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
            {currentUsers.map((user) => {
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
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAction("view", user)}
                        className="h-8 px-2.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                      >
                        <Eye className="size-3.5 text-slate-400 mr-1" />
                        <span>View</span>
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAction("edit", user)}
                        className="h-8 px-2.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                      >
                        <Pencil className="size-3.5 text-slate-400 mr-1" />
                        <span>Edit</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* Table Footer & Pagination Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-5 mt-2 border-t border-slate-100 text-xs text-slate-500">
          <p>
            Showing {startIndex + 1}–
            {Math.min(startIndex + itemsPerPage, sampleUsers.length)} of{" "}
            {sampleUsers.length}
          </p>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="size-8 rounded-lg border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
              aria-label="Previous Page"
            >
              <ChevronLeft className="size-4" />
            </Button>

            <span className="font-medium text-slate-700">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="size-8 rounded-lg border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
              aria-label="Next Page"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

