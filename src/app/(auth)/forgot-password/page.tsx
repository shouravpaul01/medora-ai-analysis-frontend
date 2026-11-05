"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/shared/form/FormInput";
import { forgotPasswordSchema } from "@/validation/auth.validation";
import AuthIconBadge from "@/components/auth/AuthIconBadge";
import z from "zod";

type ForgotFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<ForgotFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotFormData) => {
    setIsLoading(true);
    try {
      toast.success("Password reset instructions sent to your email!");
      router.push(`/check-email?email=${encodeURIComponent(data.email)}`);
    } catch (error: any) {
      toast.error(
        error?.message || "Failed to process request. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 py-12">
      <div className="w-full max-w-[400px] mx-auto text-center">
        {/* Premium Layered Key Badge */}
        <AuthIconBadge
          icon={
            <KeyRound className="size-8 stroke-[2.2] text-primary animate-key-wiggle origin-center" />
          }
        />

        {/* Heading & Subtitle */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Forgot password?
        </h1>
        <p className="text-sm text-gray-500 mt-2 mb-7">
          No worries, we&apos;ll send you reset instructions.
        </p>

        {/* Form */}
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-5 text-left"
          >
            <FormInput
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm sm:text-base font-semibold shadow-sm transition-all cursor-pointer"
            >
              {isLoading ? "Sending..." : "Reset password"}
            </Button>
          </form>
        </FormProvider>

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
