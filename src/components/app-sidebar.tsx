"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  FolderDown,
  FileCheck,
  Settings,
  LayoutGrid,
  Users,
  Monitor,
  LogOut,
} from "lucide-react";
import Logo from "./shared/Logo";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/authSlice";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isAdmin = pathname.startsWith("/admin");

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully 👋");
    router.push("/login");
  };

  // User navigation items (Technician: /dashboard)
  const userNavItems = [
    {
      title: "Import Interrogation",
      url: "/dashboard",
      icon: <FolderDown className="size-5 shrink-0" />,
      isActive: pathname === "/dashboard",
    },
    {
      title: "Export Verification",
      url: "/dashboard/export-verification",
      icon: <FileCheck className="size-5 shrink-0" />,
      isActive: pathname.startsWith("/dashboard/export-verification"),
    },
    {
      title: "User Settings",
      url: "/dashboard/settings",
      icon: <Settings className="size-5 shrink-0" />,
      isActive: pathname.startsWith("/dashboard/settings"),
    },
  ];

  // Admin navigation items (/admin/dashboard)
  const adminNavItems = [
    {
      title: "Overview",
      url: "/admin/dashboard",
      icon: <LayoutGrid className="size-5 shrink-0" />,
      isActive: pathname === "/admin/dashboard",
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: <Users className="size-5 shrink-0" />,
      isActive: pathname.startsWith("/admin/users"),
    },
    {
      title: "Device Clinics",
      url: "/admin/clinics",
      icon: <Monitor className="size-5 shrink-0" />,
      isActive: pathname.startsWith("/admin/clinics"),
    },
    {
      title: "Admin Settings",
      url: "/admin/settings",
      icon: <Settings className="size-5 shrink-0" />,
      isActive: pathname.startsWith("/admin/settings"),
    },
  ];

  const currentNavItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-slate-100 bg-white"
      {...props}
    >
      {/* Brand Header */}
      <SidebarHeader className="h-20 flex items-center justify-center px-6 border-b border-slate-50">
        <Logo width={150} height={45} priority />
      </SidebarHeader>

      {/* Nav Menu Content */}
      <SidebarContent className="px-3.5 py-6">
        <SidebarMenu className="space-y-2">
          {currentNavItems.map((item) => {
            const active = item.isActive;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={cn(
                    "w-full h-12 px-4 rounded-xl font-medium transition-all duration-150 flex items-center gap-3.5 cursor-pointer text-sm",
                    active
                      ? "bg-[#173F72] text-white hover:bg-[#123258] hover:text-white font-semibold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  <Link href={item.url}>
                    {item.icon}
                    <span className="truncate">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Bottom Logout Button */}
      <SidebarFooter className="p-4 border-t border-slate-50">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full h-11 px-4 rounded-xl flex items-center gap-2.5 font-semibold text-sm text-[#E11D48] bg-[#FFF1F2] hover:bg-[#FFE4E6] border border-[#FECDD3]/50 transition-colors cursor-pointer group"
        >
          <LogOut className="size-4.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Logout</span>
        </button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
