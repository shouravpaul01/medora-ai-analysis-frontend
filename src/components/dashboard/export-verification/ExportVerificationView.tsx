"use client";

import React, { useState, useMemo } from "react";
import {
  CheckCircle2,
  FileText,
  AlertCircle,
  ShieldCheck,
  Check,
  Download,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/PageHeader";
import { Pagination } from "@/components/shared/Pagination";
import SearchInput from "@/components/shared/SearchInput";
import { AppSelect } from "@/components/shared/inputs/AppSelect";
import {
  sampleVerifications,
  type VerificationItem,
  type VerificationPriority,
} from "./types";

export function ExportVerificationView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter verifications
  const filteredItems = useMemo(() => {
    return sampleVerifications.filter((item) => {
      const matchesSearch =
        item.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.dateOfBirth.includes(searchQuery) ||
        item.dateOfReport.includes(searchQuery) ||
        item.documentType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        typeFilter === "All" || item.documentType === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [searchQuery, typeFilter]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleReview = (item: VerificationItem) => {
    toast.info(`Opening review modal for ${item.patientName}`);
  };

  const handleDownload = (item: VerificationItem) => {
    toast.success(`Downloading report for ${item.patientName}`);
  };

  const renderPriorityBadge = (priority: VerificationPriority) => {
    switch (priority) {
      case "High":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-100">
            <span className="size-1.5 rounded-full bg-rose-500" />
            High
          </span>
        );
      case "Medium":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
            <span className="size-1.5 rounded-full bg-amber-500" />
            Medium
          </span>
        );
      case "Low":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Low
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 pb-12">
      {/* Page Title */}
      <PageHeader title="Export Verification" />

      {/* Notice Banner Card */}
      <div className="rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 shadow-xs flex items-center gap-3.5">
        <CheckCircle2 className="size-5 text-slate-700 shrink-0" />
        <div className="flex flex-col">
          <h4 className="text-sm font-semibold text-slate-900">
            Report finalized
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            The existing record and combined report have been updated. No
            duplicate record was created.
          </p>
        </div>
      </div>

      {/* 3 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1 */}
        <Card className="border-slate-100 bg-white shadow-xs rounded-2xl py-0">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shadow-2xs shrink-0">
              <FileText className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-medium text-slate-600">
                Finalized reports
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-0.5">
                7
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="border-slate-100 bg-white shadow-xs rounded-2xl py-0">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="flex size-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 shadow-2xs shrink-0">
              <AlertCircle className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-medium text-slate-600">
                High priority
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-0.5">
                2
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="border-slate-100 bg-white shadow-xs rounded-2xl py-0">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shadow-2xs shrink-0">
              <ShieldCheck className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-medium text-slate-600">
                Ready to verify
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-0.5">
                7
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="border-slate-100 bg-white shadow-xs rounded-2xl py-0 overflow-hidden">
        <div className="p-6 flex flex-col gap-6">
          {/* Top Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex-1 max-w-md">
              <SearchInput
                value={searchQuery}
                onChange={(val) => {
                  setSearchQuery(val);
                  setCurrentPage(1);
                }}
                placeholder="Search patient name, type, or date..."
                className="h-10 rounded-xl border-slate-200"
              />
            </div>

            <div className="flex items-center gap-3">
              <AppSelect
                value={typeFilter}
                onChange={(val) => {
                  setTypeFilter(val);
                  setCurrentPage(1);
                }}
                options={[
                  { label: "All", value: "All" },
                  { label: "Clinic", value: "Clinic" },
                  { label: "Remote", value: "Remote" },
                ]}
                triggerClassName="w-28 h-10 rounded-xl border-slate-200 bg-white text-xs sm:text-sm font-medium text-slate-700"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto -mx-6">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-slate-100 hover:bg-transparent bg-slate-50/50">
                  <TableHead className="py-3 px-6 text-xs font-semibold text-slate-700 tracking-wider">
                    Priority
                  </TableHead>
                  <TableHead className="py-3 px-4 text-xs font-semibold text-slate-700 tracking-wider">
                    Patient Name
                  </TableHead>
                  <TableHead className="py-3 px-4 text-xs font-semibold text-slate-700 tracking-wider">
                    Date Of Birth
                  </TableHead>
                  <TableHead className="py-3 px-4 text-xs font-semibold text-slate-700 tracking-wider">
                    Document Type
                  </TableHead>
                  <TableHead className="py-3 px-4 text-xs font-semibold text-slate-700 tracking-wider">
                    Date Of Report
                  </TableHead>
                  <TableHead className="py-3 px-4 text-xs font-semibold text-slate-700 tracking-wider">
                    Status
                  </TableHead>
                  <TableHead className="py-3 px-6 text-xs font-semibold text-slate-700 tracking-wider text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedItems.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="py-12 text-center text-sm text-slate-400"
                    >
                      No records found matching your filter criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedItems.map((item) => (
                    <TableRow
                      key={item.id}
                      className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors"
                    >
                      {/* Priority */}
                      <TableCell className="py-4 px-6">
                        {renderPriorityBadge(item.priority)}
                      </TableCell>

                      {/* Patient Name */}
                      <TableCell className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="size-7 bg-blue-100 text-blue-700 shrink-0">
                            <AvatarFallback className="bg-blue-100 text-blue-700 text-[11px] font-bold">
                              {item.patientInitials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                            {item.patientName}
                          </span>
                        </div>
                      </TableCell>

                      {/* Date of Birth */}
                      <TableCell className="py-4 px-4 text-xs sm:text-sm text-slate-600">
                        {item.dateOfBirth}
                      </TableCell>

                      {/* Document Type */}
                      <TableCell className="py-4 px-4 text-xs sm:text-sm text-slate-600">
                        {item.documentType}
                      </TableCell>

                      {/* Date of Report */}
                      <TableCell className="py-4 px-4 text-xs sm:text-sm text-slate-600">
                        {item.dateOfReport}
                      </TableCell>

                      {/* Status */}
                      <TableCell className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                          <Check className="size-3 stroke-[2.5]" />
                          Finalized
                        </span>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReview(item)}
                            className="h-8 px-3 rounded-lg text-xs font-medium border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs"
                          >
                            Review
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownload(item)}
                            className="h-8 px-2.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
                          >
                            <Download className="size-3.5 text-slate-400" />
                            <span>Download</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Table Footer with shared Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalData={filteredItems.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </Card>
    </div>
  );
}

export default ExportVerificationView;

