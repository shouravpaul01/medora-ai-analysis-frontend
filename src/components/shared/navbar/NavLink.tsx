"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  label: string;
  exact?: boolean;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  showUnderline?: boolean;
  underlineClassName?: string;
};

export default function NavLink({
  href,
  label,
  exact = true,
  className,
  activeClassName = "text-slate-900 font-semibold",
  inactiveClassName = "text-slate-600 hover:text-slate-900 font-medium",
  showUnderline = true,
  underlineClassName = "bg-primary",
}: NavLinkProps) {
  const pathname = usePathname();

  // Handle anchor links or route matching
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "relative px-3.5 py-2 text-sm sm:text-[15px] transition-colors inline-flex flex-col items-center",
        isActive ? activeClassName : inactiveClassName,
        className
      )}
    >
      <span>{label}</span>

      {isActive && showUnderline && (
        <span
          className={cn(
            "absolute bottom-0 left-3.5 right-3.5 h-[2.5px] rounded-full",
            underlineClassName
          )}
        />
      )}
    </Link>
  );
}
