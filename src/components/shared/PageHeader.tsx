"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PageHeaderBackLink {
  href: string;
  label?: string;
  className?: string;
}

export interface PageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  backLink?: PageHeaderBackLink;
  action?: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  children?: ReactNode;
}

export function PageHeader({
  title,
  description,
  backLink,
  action,
  className,
  titleClassName,
  descriptionClassName,
  children,
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Optional Back Link */}
      {backLink && (
        <div>
          <Link
            href={backLink.href}
            className={cn(
              "inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors",
              backLink.className
            )}
          >
            <ArrowLeft className="size-4" />
            <span>{backLink.label || "Back"}</span>
          </Link>
        </div>
      )}

      {/* Main Title & Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2
            className={cn(
              "text-2xl sm:text-3xl font-bold tracking-tight text-slate-900",
              titleClassName
            )}
          >
            {title}
          </h2>
          {description && (
            <p
              className={cn(
                "text-slate-500 text-sm sm:text-base",
                descriptionClassName
              )}
            >
              {description}
            </p>
          )}
        </div>

        {/* Action Button / Link / Controls */}
        {(action || children) && (
          <div className="flex items-center gap-3 shrink-0">
            {action}
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export default PageHeader;

