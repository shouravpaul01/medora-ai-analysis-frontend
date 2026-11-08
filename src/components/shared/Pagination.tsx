"use client";

import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalData?: number;
  itemsPerPage?: number;
  startIndex?: number;
  onPageChange: (page: number) => void;
  // Optional for limit selection
  limit?: number;
  onLimitChange?: (limit: number) => void;
  variant?: "dashboard" | "full";
  className?: string;
  showShowingText?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  totalData,
  itemsPerPage,
  startIndex,
  onPageChange,
  limit,
  onLimitChange,
  variant = "dashboard",
  className,
  showShowingText = true,
}: PaginationProps) {
  const pageSize = itemsPerPage || limit || 10;
  const calculatedStart =
    startIndex !== undefined ? startIndex : (currentPage - 1) * pageSize;
  const from = totalData === 0 ? 0 : calculatedStart + 1;
  const to =
    totalData !== undefined
      ? Math.min(calculatedStart + pageSize, totalData)
      : 0;

  if (variant === "dashboard") {
    return (
      <div
        className={cn(
          "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-5 mt-2 border-t border-slate-100 text-xs text-slate-500",
          className
        )}
      >
        {/* Left: Showing entries count */}
        {showShowingText && totalData !== undefined && (
          <p>
            {totalData === 0
              ? "Showing 0 of 0"
              : `Showing ${from}-${to} of ${totalData}`}
          </p>
        )}

        {/* Right: Page controls */}
        <div className="flex items-center gap-3 self-end sm:self-auto ml-auto sm:ml-0">
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className="size-8 rounded-lg border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
            aria-label="Previous Page"
          >
            <ArrowLeft className="size-3.5" />
          </Button>

          <span className="font-medium text-slate-700 select-none">
            Page {currentPage} of {Math.max(1, totalPages)}
          </span>

          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className="size-8 rounded-lg border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
            aria-label="Next Page"
          >
            <ArrowRight className="size-3.5" />
          </Button>
        </div>
      </div>
    );
  }

  // "full" variant with page numbers and optional limit dropdown
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "ellipsis", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(
        1,
        "ellipsis",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pages.push(
        1,
        "ellipsis",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "ellipsis",
        totalPages
      );
    }

    return pages;
  };

  return (
    <div
      className={cn(
        "mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
        className
      )}
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        {onLimitChange && limit && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Show</span>

            <Select
              value={String(limit)}
              onValueChange={(value) => onLimitChange(Number(value))}
            >
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>

            <span className="text-sm text-muted-foreground">entries</span>
          </div>
        )}

        {totalData !== undefined && (
          <p className="hidden md:block whitespace-nowrap text-sm text-muted-foreground">
            Showing <strong>{from}</strong> - <strong>{to}</strong> of{" "}
            <strong>{totalData}</strong>
          </p>
        )}
      </div>

      {/* Right */}
      {totalPages > 1 && (
        <ShadcnPagination className="justify-end">
          <PaginationContent className="gap-2">
            {/* Previous */}
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  currentPage > 1 && onPageChange(currentPage - 1)
                }
                className={`transition-all h-10 ${
                  currentPage === 1
                    ? "pointer-events-none opacity-40"
                    : "cursor-pointer border bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                }`}
              />
            </PaginationItem>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) =>
              page === "ellipsis" ? (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => onPageChange(page)}
                    className={`cursor-pointer transition-all h-10 ${
                      currentPage === page
                        ? "border bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                        : "hover:bg-primary/10"
                    }`}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            {/* Next */}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  currentPage < totalPages && onPageChange(currentPage + 1)
                }
                className={`transition-all h-10 ${
                  currentPage === totalPages
                    ? "pointer-events-none opacity-40"
                    : "cursor-pointer border bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </ShadcnPagination>
      )}
    </div>
  );
}

export default Pagination;
