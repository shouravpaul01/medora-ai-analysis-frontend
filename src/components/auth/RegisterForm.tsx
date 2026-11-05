"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/shared/form/FormInput";
import { FormPasswordInput } from "@/components/shared/form/FormPasswordInput";
import { FormSelect } from "@/components/shared/form/FormSelect";
import { signUpSchema } from "@/validation/auth.validation";
import z from "zod";

type SignUpFormData = z.infer<typeof signUpSchema>;

const clinicOptions = [
  { label: "Choose clinic", value: "" },
  { label: "CorVera Main Clinic", value: "corvera-main" },
  { label: "Metro Health Center", value: "metro-health" },
  { label: "City Cardiology Clinic", value: "city-cardio" },
  { label: "Valley Medical Group", value: "valley-medical" },
  { label: "Other Healthcare Partner", value: "other" },
];

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      organization: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      toast.success("Account created successfully 🎉");
      router.push("/login");
    } catch (error: any) {
      toast.error(error?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 w-full">
        {/* First Name & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            name="firstName"
            label="First Name*"
            placeholder="Enter first name"
          />

          <FormInput
            name="lastName"
            label="Last Name*"
            placeholder="Enter last name"
          />
        </div>

        {/* Email */}
        <FormInput
          name="email"
          label="Email*"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
        />

        {/* Organization */}
        <FormSelect
          name="organization"
          label="Organization*"
          placeholder="Choose clinic"
          options={clinicOptions.filter((opt) => opt.value !== "")}
        />

        {/* Password */}
        <div>
          <FormPasswordInput
            name="password"
            label="Password*"
            autoComplete="new-password"
            placeholder="••••••••••"
            showLockIcon={false}
          />
          {/* Red helper text matching design */}
          <p className="text-xs text-red-500 font-normal leading-relaxed pt-1.5">
            **Must be at least 8 characters, uppercase, lowercase, number & special character.
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm sm:text-base font-semibold shadow-sm transition-all mt-3 cursor-pointer"
        >
          {isLoading ? "Creating account..." : "Get started"}
        </Button>

        {/* Log in link */}
        <p className="text-center text-sm text-gray-600 pt-1">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </FormProvider>
  );
}
