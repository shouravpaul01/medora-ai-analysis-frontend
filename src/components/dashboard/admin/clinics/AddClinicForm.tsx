"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageHeader";
import { FormInput } from "@/components/shared/form/FormInput";
import { FormSelect } from "@/components/shared/form/FormSelect";
import {
  createClinicSchema,
  type CreateClinicFormData,
} from "@/validation/admin.validation";
import { adminOptions } from "./types";

export function AddClinicForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<CreateClinicFormData>({
    resolver: zodResolver(createClinicSchema),
    defaultValues: {
      name: "",
      administrator: "unassigned",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: CreateClinicFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(`Device clinic "${data.name}" added successfully!`);
      router.push("/admin/clinics");
    } catch {
      toast.error("Failed to add device clinic. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 pb-12">
      <PageHeader
        backLink={{
          href: "/admin/clinics",
          label: "Back to Device Clinics",
        }}
        title="Add Device Clinic"
        description="Fill in the required information to add a Device Clinic."
      />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          {/* Main Card */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-8 shadow-xs">
            {/* Card Header */}
            <div className="flex items-center gap-3.5 mb-8">
              <div className="flex size-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-2xs">
                <Building2 className="size-5" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-base font-semibold text-slate-900">
                  Device Clinic information
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Device Clinic is the single administrative entity.
                </p>
              </div>
            </div>

            {/* 2-Column Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Field 1: Device Clinic Name */}
              <FormInput
                name="name"
                label="Device Clinic Name"
                placeholder="e.g., Central Cardiac Device Center"
                containerClassName="h-11 rounded-xl border-slate-200"
              />

              {/* Field 2: Administrator */}
              <FormSelect
                name="administrator"
                label="Administrator"
                placeholder="Unassigned"
                options={adminOptions}
                triggerClassName="h-11 rounded-xl border-slate-200 bg-white"
              />
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-slate-100">
              <Link href="/admin/clinics">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 px-5 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold cursor-pointer"
                >
                  Cancel
                </Button>
              </Link>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 px-6"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <Check className="size-4 stroke-[2.5]" />
                    <span>Add Device Clinic</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

