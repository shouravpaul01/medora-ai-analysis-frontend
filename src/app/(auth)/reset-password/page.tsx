"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FormPasswordInput } from "@/components/shared/form/FormPasswordInput";
import { resetPasswordSchema } from "@/validation/auth.validation";
import AuthIconBadge from "@/components/auth/AuthIconBadge";
import AuthVisualSide from "@/components/auth/AuthVisualSide";
import Logo from "@/components/shared/Logo";
import z from "zod";

type ResetFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<ResetFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetFormData) => {
    setIsLoading(true);
    try {
      toast.success("Password reset successfully 🎉 Please log in with your new password.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error?.message || "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden grid lg:grid-cols-2">
      {/* LEFT SIDE: Fixed Visual Panel with full background color, Lottie & animated medical icons (Non-scrollable) */}
      <div className="hidden lg:flex h-full w-full overflow-hidden sticky top-0">
        <AuthVisualSide
          borderSide="right"
          srcPaths={[
            "/lottie/reset-password.json",
            "/lottie/login.json",
            "/animations/login.json",
            "/login.json",
          ]}
        />
      </div>

      {/* RIGHT SIDE: Scrollable Form Panel (Only this side is scrollable) */}
      <div className="h-full w-full overflow-y-auto flex flex-col justify-center items-center px-6 py-12 lg:px-16 xl:px-24">
        <div className="w-full max-w-md mx-auto my-auto text-center">
          {/* Logo */}
          <div className="mb-6 flex justify-start sm:justify-center">
            <Logo width={180} height={50} priority />
          </div>

          {/* Premium Animated Key Badge */}
          <AuthIconBadge
            icon={
              <KeyRound className="size-8 stroke-[2.2] text-primary animate-key-wiggle origin-center" />
            }
          />

          {/* Heading & Subtitle */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Set new password
          </h1>
          <p className="text-sm text-gray-500 mt-2 mb-7 leading-relaxed">
            Your new password must be different to
            <br />
            previously used passwords.
          </p>

          {/* Form */}
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 text-left">
              {/* New Password */}
              <div>
                <FormPasswordInput
                  name="password"
                  label="Password"
                  autoComplete="new-password"
                  placeholder="••••••••••••"
                  showLockIcon={false}
                />
                {/* Red helper text from design */}
                <p className="text-xs text-red-500 font-normal leading-relaxed pt-1.5">
                  **Must be at least 8 characters, uppercase, lowercase, number & special character.
                </p>
              </div>

              {/* Confirm Password */}
              <div className="pt-1">
                <FormPasswordInput
                  name="confirmPassword"
                  label="Password"
                  autoComplete="new-password"
                  placeholder="••••••••••••"
                  showLockIcon={false}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm sm:text-base font-semibold shadow-sm transition-all mt-3 cursor-pointer"
              >
                {isLoading ? "Resetting..." : "Reset password"}
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
    </div>
  );
}
