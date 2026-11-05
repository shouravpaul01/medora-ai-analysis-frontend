"use client";

import React, { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import AuthIconBadge from "@/components/auth/AuthIconBadge";

export default function CheckEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "olivia@untitledui.com";
  const [isResending, setIsResending] = useState(false);

  const handleOpenEmailApp = () => {
    window.location.href = `mailto:${email}`;
  };

  const handleResend = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      toast.success("Password reset link resent successfully! 📩");
    }, 1000);
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 py-12">
      <div className="w-full max-w-[400px] mx-auto text-center">
        {/* Premium Layered Mail Badge */}
        <AuthIconBadge
          icon={<Mail className="size-8 stroke-[2.2] text-primary animate-mail-bounce" />}
        />

        {/* Heading & Subtitle */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Check your email
        </h1>
        <p className="text-sm text-gray-500 mt-2 mb-7 leading-relaxed">
          We sent a password reset link to
          <br />
          <span className="font-medium text-gray-800 break-all">{email}</span>
        </p>

        {/* Action Button */}
        <Button
          onClick={handleOpenEmailApp}
          className="w-full h-11 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm sm:text-base font-semibold shadow-sm transition-all cursor-pointer"
        >
          Open email app
        </Button>

        {/* Quick link to set new password for demonstration / testing */}
        <div className="mt-3">
          <button
            type="button"
            onClick={() => router.push(`/reset-password?email=${encodeURIComponent(email)}`)}
            className="text-xs text-primary/80 hover:text-primary hover:underline cursor-pointer"
          >
            (Proceed to Set New Password screen)
          </button>
        </div>

        {/* Resend Link */}
        <p className="text-sm text-gray-500 mt-6">
          Didn&apos;t receive the email?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="font-medium text-primary hover:underline transition-colors cursor-pointer"
          >
            {isResending ? "Resending..." : "Click to resend"}
          </button>
        </p>

        {/* Back to log in link */}
        <div className="mt-8">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to log in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
