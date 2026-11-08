"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/shared/form/FormInput";
import {
  adminProfileSchema,
  type AdminProfileFormData,
} from "@/validation/admin.validation";
import type { AdminProfileData } from "./types";

interface ProfileInformationCardProps {
  profile: AdminProfileData;
  onUpdateProfile: (updated: Partial<AdminProfileData>) => void;
}

export function ProfileInformationCard({
  profile,
  onUpdateProfile,
}: ProfileInformationCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<AdminProfileFormData>({
    resolver: zodResolver(adminProfileSchema),
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: AdminProfileFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      onUpdateProfile(data);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    methods.reset({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
    });
    setIsEditing(false);
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-8 shadow-xs">
      {/* Card Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex flex-col">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">
            Profile Information
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Your administrator account details.
          </p>
        </div>

        {!isEditing && (
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsEditing(true)}
            className="h-10 px-4 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium text-xs sm:text-sm cursor-pointer shadow-2xs"
          >
            <Pencil className="size-4" />
            <span>Edit Profile</span>
          </Button>
        )}
      </div>

      {isEditing ? (
        /* Edit Mode Form */
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <FormInput
                name="firstName"
                label="First Name"
                placeholder="First Name"
                containerClassName="h-11 rounded-xl border-slate-200"
              />

              <FormInput
                name="lastName"
                label="Last Name"
                placeholder="Last Name"
                containerClassName="h-11 rounded-xl border-slate-200"
              />

              <FormInput
                name="email"
                type="email"
                label="Email"
                placeholder="name@example.com"
                containerClassName="h-11 rounded-xl border-slate-200"
              />

              {/* Account Role - Read only */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-sm font-medium text-slate-700">
                  Account Role
                </label>
                <div className="h-11 w-full rounded-xl border border-slate-200/90 bg-slate-50/70 px-4 text-sm font-normal text-slate-500 flex items-center cursor-not-allowed select-none">
                  {profile.accountRole}
                </div>
              </div>
            </div>

            {/* Bottom Actions on Left as shown in design */}
            <div className="flex items-center gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="h-10 px-5 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold cursor-pointer"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-10 px-5 rounded-xl bg-primary hover:bg-[#123258] text-white font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Check className="size-4 stroke-[2.5]" />
                    <span>Save Changes</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      ) : (
        /* View Mode Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs sm:text-sm font-medium text-slate-700">
              First Name
            </span>
            <div className="h-11 w-full rounded-xl border border-slate-200/80 bg-slate-50/70 px-4 text-sm text-slate-700 flex items-center select-none">
              {profile.firstName}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs sm:text-sm font-medium text-slate-700">
              Last Name
            </span>
            <div className="h-11 w-full rounded-xl border border-slate-200/80 bg-slate-50/70 px-4 text-sm text-slate-700 flex items-center select-none">
              {profile.lastName}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs sm:text-sm font-medium text-slate-700">
              Email
            </span>
            <div className="h-11 w-full rounded-xl border border-slate-200/80 bg-slate-50/70 px-4 text-sm text-slate-700 flex items-center select-none">
              {profile.email}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs sm:text-sm font-medium text-slate-700">
              Account Role
            </span>
            <div className="h-11 w-full rounded-xl border border-slate-200/80 bg-slate-50/70 px-4 text-sm text-slate-700 flex items-center select-none">
              {profile.accountRole}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

