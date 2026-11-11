"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Plus,
  Building2,
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Pagination } from "@/components/shared/Pagination";
import { PageHeader } from "@/components/shared/PageHeader";
import SearchInput from "@/components/shared/SearchInput";
import { initialClinics, type ClinicItem } from "./types";

export function ClinicsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredClinics = useMemo(() => {
    if (!searchQuery.trim()) return initialClinics;
    const q = searchQuery.toLowerCase();
    return initialClinics.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.administrator.toLowerCase().includes(q) ||
        c.createdDate.includes(q)
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredClinics.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentClinics = filteredClinics.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleAction = (type: "view" | "edit", clinic: ClinicItem) => {
    toast.info(`${type === "view" ? "Viewing" : "Editing"} ${clinic.name}`);
  };

  return (
    <div className="w-full flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <PageHeader
        title="Device Clinics"
        description="Manage Device Clinic accounts and their associated records."
        action={
          <Link href="/admin/clinics/create">
            <Button className="h-11 px-5">
              <Plus className="size-4" />
              <span>Add Device Clinic</span>
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
              placeholder="Search device clinics by name, administrator, or date created..."
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
                  Device Clinic Name
                </TableHead>
                <TableHead className="py-3 px-4 text-xs font-semibold text-slate-500">
                  Active Records
                </TableHead>
                <TableHead className="py-3 px-4 text-xs font-semibold text-slate-500">
                  Active Users
                </TableHead>
                <TableHead className="py-3 px-4 text-xs font-semibold text-slate-500">
                  Administrator
                </TableHead>
                <TableHead className="py-3 px-4 text-xs font-semibold text-slate-500">
                  Created Date
                </TableHead>
                <TableHead className="py-3 px-4 text-xs font-semibold text-slate-500 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentClinics.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-12 text-center text-slate-400 text-sm"
                  >
                    No device clinics found matching your search.
                  </TableCell>
                </TableRow>
              ) : (
                currentClinics.map((clinic) => (
                  <TableRow
                    key={clinic.id}
                    className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors"
                  >
                    {/* Device Clinic Name with Icon Badge */}
                    <TableCell className="py-4 px-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 shrink-0">
                          <Building2 className="size-4" />
                        </div>
                        <span className="truncate">{clinic.name}</span>
                      </div>
                    </TableCell>

                    {/* Active Records Badge */}
                    <TableCell className="py-4 px-4">
                      <Badge
                        variant="secondary"
                        className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EBF3FC] text-[#173F72] hover:bg-[#EBF3FC] border-0"
                      >
                        {String(clinic.activeRecords).padStart(2, "0")}
                      </Badge>
                    </TableCell>

                    {/* Active Users Badge */}
                    <TableCell className="py-4 px-4">
                      <Badge
                        variant="secondary"
                        className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EBF3FC] text-[#173F72] hover:bg-[#EBF3FC] border-0"
                      >
                        {String(clinic.activeUsers).padStart(2, "0")}
                      </Badge>
                    </TableCell>

                    {/* Administrator */}
                    <TableCell className="py-4 px-4 text-slate-700 text-xs sm:text-sm font-medium">
                      {clinic.administrator}
                    </TableCell>

                    {/* Created Date */}
                    <TableCell className="py-4 px-4 text-slate-600 text-xs sm:text-sm">
                      {clinic.createdDate}
                    </TableCell>

                    {/* Actions: View and Edit */}
                    <TableCell className="py-4 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <Link href={`/admin/clinics/${clinic.id}`}>
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

                        <Link href={`/admin/clinics/${clinic.id}/edit`}>
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
                ))
              )}
            </TableBody>
          </Table>

          {/* Table Footer & Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalData={filteredClinics.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>
    </div>
  );
}

