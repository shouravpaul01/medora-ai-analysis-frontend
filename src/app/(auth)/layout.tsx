import AuthBackground from "@/components/auth/AuthBackground";
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AuthBackground>{children}</AuthBackground>;
}

