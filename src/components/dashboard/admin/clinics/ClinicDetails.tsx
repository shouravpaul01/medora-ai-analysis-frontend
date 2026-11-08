"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Pencil,
  FileText,
  User,
  Building2,
  Search,
  Download,
  ChevronDown,
  FileSpreadsheet,
  ArrowDown,
} from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Pagination } from "@/components/shared/Pagination";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  sampleProcessedReports,
  initialClinics,
  type ReportItem,
  type ClinicItem,
} from "./types";

interface ClinicDetailsProps {
  clinicId?: string;
}

export function ClinicDetails({ clinicId = "1" }: ClinicDetailsProps) {
  const clinic: ClinicItem = useMemo(() => {
    return (
      initialClinics.find((c) => c.id === clinicId) || initialClinics[0]
    );
  }, [clinicId]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>(["2"]); // Default selected 'Cooper, Daniel' matching design
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter reports
  const filteredReports = useMemo(() => {
    if (!searchQuery.trim()) return sampleProcessedReports;
    const q = searchQuery.toLowerCase();
    return sampleProcessedReports.filter(
      (r) =>
        r.patientName.toLowerCase().includes(q) ||
        r.dob.includes(q) ||
        r.dateOfReport.includes(q) ||
        r.userThatProcessed.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReports = filteredReports.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Toggle selection
  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(currentReports.map((r) => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isAllSelected =
    currentReports.length > 0 &&
    currentReports.every((r) => selectedIds.includes(r.id));

  const handleExport = (format: "excel" | "csv") => {
    const count = selectedIds.length || filteredReports.length;
    toast.success(`Exporting ${count} report(s) as .${format === "excel" ? "xlsx" : "csv"}`);
  };

  const handleReview = () => {
    if (selectedIds.length === 0) {
      toast.info("Please select at least one report to review.");
      return;
    }
    toast.info(`Opening review for ${selectedIds.length} selected report(s).`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 pb-12">
      {/* Page Header with Edit Button */}
      <PageHeader
        backLink={{
          href: "/admin/clinics",
          label: "Back to Device Clinics",
        }}
        title={clinic.name}
        description="Device Clinic account details and successfully processed reports"
        action={
          <Link href={`/admin/clinics/${clinic.id}/edit`}>
            <Button className="h-11 px-5 rounded-xl bg-primary hover:bg-[#123258] text-white font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer">
              <Pencil className="size-4" />
              <span>Edit Device Clinic</span>
            </Button>
          </Link>
        }
      />

      {/* =========================================================================
          Top 3 Metric / Stat Cards
          ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Active Records */}
        <Card className="border-slate-100 bg-white shadow-xs rounded-2xl py-0">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="flex size-13 items-center justify-center rounded-2xl bg-[#E8F8F0] text-[#1DB954] shadow-2xs shrink-0">
              <FileText className="size-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-600">
                Active Records
              </span>
              <span className="text-3xl font-bold text-slate-900 tracking-tight mt-0.5">
                {String(clinic.activeRecords).padStart(2, "0")}
              </span>
              <span className="text-xs text-slate-400 mt-1">
                Active Export Verification files
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Administrator */}
        <Card className="border-slate-100 bg-white shadow-xs rounded-2xl py-0">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="flex size-13 items-center justify-center rounded-2xl bg-[#FDF2F2] text-[#E05656] shadow-2xs shrink-0">
              <User className="size-6" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-slate-600">
                Administrator
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-0.5 truncate">
                {clinic.administrator}
              </span>
              <span className="text-xs text-slate-400 mt-1">
                Assigned administrator
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Created Date */}
        <Card className="border-slate-100 bg-white shadow-xs rounded-2xl py-0">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="flex size-13 items-center justify-center rounded-2xl bg-[#EBF3FC] text-[#173F72] shadow-2xs shrink-0">
              <Building2 className="size-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-600">
                Created Date
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-0.5">
                {clinic.createdDate}
              </span>
              <span className="text-xs text-slate-400 mt-1">
                Account creation date
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* =========================================================================
          Card 4: Successfully Processed Reports (Table Card)
          ========================================================================= */}
      <Card className="border-slate-100 bg-white shadow-xs rounded-2xl py-0 overflow-hidden">
        {/* Card Header & Controls */}
        <CardHeader className="p-6 pb-4 flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Successfully Processed Reports
              </h3>
              <p className="text-xs text-slate-400">
                Select report records to export from this Device Clinic.
              </p>
            </div>

            {/* Actions: Selected counter, Export Selected, Review, Download */}
            <div className="flex flex-wrap items-center gap-3">
              {selectedIds.length > 0 && (
                <span className="text-xs sm:text-sm font-medium text-slate-500">
                  {selectedIds.length} selected
                </span>
              )}

              {/* Export Selected Button */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    className="h-10 px-4 rounded-xl bg-primary hover:bg-[#123258] text-white font-semibold flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Download className="size-4" />
                    <span>Export Selected</span>
                    <ChevronDown className="size-3.5 opacity-80" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-xl p-1.5 shadow-md">
                  <DropdownMenuItem
                    onClick={() => handleExport("excel")}
                    className="flex items-center gap-2.5 py-2 px-3 rounded-lg text-xs font-medium cursor-pointer"
                  >
                    <FileSpreadsheet className="size-4 text-emerald-600" />
                    <span>Export to Excel .xlsx</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleExport("csv")}
                    className="flex items-center gap-2.5 py-2 px-3 rounded-lg text-xs font-medium cursor-pointer"
                  >
                    <FileText className="size-4 text-blue-600" />
                    <span>Export to CSV .csv</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Review Button */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleReview}
                className="h-10 px-4 rounded-xl border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 cursor-pointer"
              >
                Review
              </Button>

              {/* Download Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    className="h-10 px-4 rounded-xl bg-primary hover:bg-[#123258] text-white font-semibold flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Download className="size-4" />
                    <span>Download</span>
                    <ChevronDown className="size-3.5 opacity-80" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-xl p-1.5 shadow-md">
                  <DropdownMenuItem
                    onClick={() => handleExport("excel")}
                    className="flex items-center gap-2.5 py-2 px-3 rounded-lg text-xs font-medium cursor-pointer"
                  >
                    <FileSpreadsheet className="size-4 text-emerald-600" />
                    <span>Export to Excel .xlsx</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleExport("csv")}
                    className="flex items-center gap-2.5 py-2 px-3 rounded-lg text-xs font-medium cursor-pointer"
                  >
                    <FileText className="size-4 text-blue-600" />
                    <span>Export to CSV .csv</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by patient name, date of birth, user name, or date created..."
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </CardHeader>

        {/* Reports Table */}
        <CardContent className="p-6 pt-2">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-slate-100 hover:bg-transparent">
                {/* Select All Checkbox */}
                <TableHead className="w-12 py-3 px-4">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={(checked) =>
                      toggleSelectAll(Boolean(checked))
                    }
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead className="py-3 px-4 text-xs font-semibold text-slate-500">
                  Patient Name (Last, First)
                </TableHead>
                <TableHead className="py-3 px-4 text-xs font-semibold text-slate-500">
                  Date Of Birth
                </TableHead>
                <TableHead className="py-3 px-4 text-xs font-semibold text-slate-500">
                  <div className="flex items-center gap-1">
                    <span>Date Of Report</span>
                    <ArrowDown className="size-3.5 text-slate-400" />
                  </div>
                </TableHead>
                <TableHead className="py-3 px-4 text-xs font-semibold text-slate-500">
                  User That Processed
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentReports.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-12 text-center text-slate-400 text-sm"
                  >
                    No processed reports found matching your search.
                  </TableCell>
                </TableRow>
              ) : (
                currentReports.map((report) => {
                  const isChecked = selectedIds.includes(report.id);

                  return (
                    <TableRow
                      key={report.id}
                      className={cn(
                        "border-b border-slate-100 transition-colors",
                        isChecked
                          ? "bg-[#F0F6FF] hover:bg-[#EAF3FF]"
                          : "hover:bg-slate-50/70"
                      )}
                    >
                      {/* Row Checkbox */}
                      <TableCell className="py-4 px-4">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggleSelectOne(report.id)}
                          aria-label={`Select report for ${report.patientName}`}
                        />
                      </TableCell>

                      {/* Patient Name */}
                      <TableCell className="py-4 px-4 font-semibold text-slate-900 text-xs sm:text-sm">
                        {report.patientName}
                      </TableCell>

                      {/* Date of Birth */}
                      <TableCell className="py-4 px-4 text-slate-600 text-xs sm:text-sm">
                        {report.dob}
                      </TableCell>

                      {/* Date of Report */}
                      <TableCell className="py-4 px-4 text-slate-600 text-xs sm:text-sm">
                        {report.dateOfReport}
                      </TableCell>

                      {/* User That Processed */}
                      <TableCell className="py-4 px-4 text-slate-700 text-xs sm:text-sm font-medium">
                        {report.userThatProcessed}
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
            totalData={filteredReports.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>
    </div>
  );
}

