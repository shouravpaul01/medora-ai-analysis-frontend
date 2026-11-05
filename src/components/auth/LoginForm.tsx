"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/shared/form/FormInput";
import { FormPasswordInput } from "@/components/shared/form/FormPasswordInput";
import { loginSchema } from "@/validation/auth.validation";
import z from "zod";

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      toast.success("Welcome back! Login successful 🎉");
      router.replace(redirect);
    } catch (error: any) {
      toast.error(error?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5 w-full">
        {/* Email Field */}
        <FormInput
          name="identifier"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
        />

        {/* Password Field */}
        <FormPasswordInput
          name="password"
          label="Password"
          autoComplete="current-password"
          placeholder="••••••••"
          showLockIcon={false}
        />

        {/* Forgot Password Link */}
        <div className="flex justify-end -mt-2">
          <Link
            href="/forgot-password"
            className="text-xs sm:text-sm font-medium text-primary hover:underline"
          >
            Forgot password
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm sm:text-base font-semibold shadow-sm transition-all cursor-pointer"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 pt-2">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </FormProvider>
  );
}
