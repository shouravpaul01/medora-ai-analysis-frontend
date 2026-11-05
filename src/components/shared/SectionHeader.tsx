import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  // Eyebrow / Tagline
  tagline?: ReactNode;
  taglineClassName?: string;
  badge?: ReactNode;
  badgeIcon?: ReactNode;
  badgeClassName?: string;

  // Title
  title: ReactNode;
  titleClassName?: string;
  titleAs?: "h1" | "h2" | "h3";

  // Description & Leads
  highlightLead?: ReactNode;
  highlightLeadClassName?: string;
  description?: ReactNode;
  descriptionClassName?: string;

  // Layout & Theme
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
  children?: ReactNode;
}

export default function SectionHeader({
  tagline,
  taglineClassName,
  badge,
  badgeIcon,
  badgeClassName,
  title,
  titleClassName,
  titleAs: TitleTag = "h2",
  highlightLead,
  highlightLeadClassName,
  description,
  descriptionClassName,
  align = "left",
  theme = "light",
  className,
  children,
}: SectionHeaderProps) {
  const isDark = theme === "dark";
  const isCenter = align === "center";

  const effectiveTagline = tagline || badge;

  return (
    <div
      className={cn(
        "flex flex-col",
        isCenter ? "items-center text-center mx-auto" : "items-start text-left",
        className
      )}
    >
      {/* 1. Tagline / Eyebrow */}
      {effectiveTagline && (
        <div
          className={cn(
            "inline-flex items-center gap-2 mb-2.5",
            taglineClassName ||
              badgeClassName ||
              (isDark
                ? "text-amber-400 font-semibold text-xs sm:text-sm tracking-wide uppercase"
                : "text-primary font-semibold text-xs sm:text-sm tracking-wider uppercase")
          )}
        >
          {badgeIcon}
          <span>{effectiveTagline}</span>
        </div>
      )}

      {/* 2. Main Title */}
      <TitleTag
        className={cn(
          "font-bold tracking-tight",
          isDark ? "text-white" : "text-slate-900",
          titleClassName || "text-3xl sm:text-4xl lg:text-5xl"
        )}
      >
        {title}
      </TitleTag>

      {/* 3. Highlighted Lead Sentence (Optional) */}
      {highlightLead && (
        <p
          className={cn(
            "font-medium text-base sm:text-lg leading-relaxed mt-3.5",
            isDark ? "text-white" : "text-slate-800",
            highlightLeadClassName
          )}
        >
          {highlightLead}
        </p>
      )}

      {/* 4. Subtitle / Description (Optional) */}
      {description && (
        <p
          className={cn(
            "text-sm sm:text-base leading-relaxed mt-2.5",
            isDark ? "text-blue-100/80" : "text-slate-600",
            isCenter && "max-w-3xl",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}

      {/* 5. Extra Custom Content / Children */}
      {children}
    </div>
  );
}
