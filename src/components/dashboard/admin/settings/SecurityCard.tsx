"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FormPasswordInput } from "@/components/shared/form/FormPasswordInput";
import {
  adminChangePasswordSchema,
  type AdminChangePasswordFormData,
} from "@/validation/admin.validation";

export function SecurityCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<AdminChangePasswordFormData>({
    resolver: zodResolver(adminChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (_data: AdminChangePasswordFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success("Password updated successfully!");
      methods.reset();
      setIsOpen(false);
    } catch {
      toast.error("Failed to update password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    methods.reset();
    setIsOpen(false);
  };

  const isFormValid =
    Boolean(methods.watch("currentPassword")) &&
    Boolean(methods.watch("newPassword")) &&
    Boolean(methods.watch("confirmNewPassword")) &&
    methods.formState.isValid;

  return (
    <div className="flex flex-col gap-6">
      {/* Top Security Banner Card */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <KeyRound className="size-5" />
          </div>
          <div className="flex flex-col">
            <h4 className="text-sm sm:text-base font-semibold text-slate-900">
              Security
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Update your password regularly to help protect your account.
            </p>
          </div>
        </div>

        <div className="flex sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen((prev) => !prev)}
            className="h-10 px-4 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs sm:text-sm cursor-pointer shadow-2xs"
          >
            Change Password
          </Button>
        </div>
      </div>

      {/* Expanded Change Password Card */}
      {isOpen && (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-8 shadow-xs flex flex-col gap-6 animate-in fade-in-50 duration-200">
          {/* Header */}
          <div className="flex flex-col">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">
              Change Password
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Must be at least 8 characters, uppercase, lowercase, number &
              special character.
            </p>
          </div>

          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* 3 Columns Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <FormPasswordInput
                  name="currentPassword"
                  label="Current Password"
                  placeholder=""
                  showLockIcon={false}
                  containerClassName="h-11 rounded-xl border-slate-200"
                />

                <FormPasswordInput
                  name="newPassword"
                  label="New Password"
                  placeholder=""
                  showLockIcon={false}
                  containerClassName="h-11 rounded-xl border-slate-200"
                />

                <FormPasswordInput
                  name="confirmNewPassword"
                  label="Confirm New Password"
                  placeholder=""
                  showLockIcon={false}
                  containerClassName="h-11 rounded-xl border-slate-200"
                />
              </div>

              {/* Bottom Actions Right Aligned */}
              <div className="flex items-center justify-end gap-3 pt-2">
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
                  disabled={!isFormValid || isSubmitting}
                  className={`h-10 px-6 rounded-xl font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    isFormValid
                      ? "bg-primary hover:bg-[#123258] text-white shadow-xs"
                      : "bg-[#94A3B8] text-white opacity-80 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <span>Update password</span>
                  )}
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      )}
    </div>
  );
}

