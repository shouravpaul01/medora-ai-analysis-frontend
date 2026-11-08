"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Building2,
  FileText,
  Sparkles,
  Check,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/shared/form/FormInput";
import { FormSelect } from "@/components/shared/form/FormSelect";
import { Textarea } from "@/components/ui/textarea";
import {
  createClinicSchema,
  type CreateClinicFormData,
} from "@/validation/admin.validation";
import { adminOptions, initialClinics } from "./types";

interface EditClinicFormProps {
  clinicId?: string;
}

const defaultAiPrompt = `Review the uploaded device interrogation report and extract only information supported by the source document.

Organize the report using the established CorVera Pro sections: Device Information, Battery Status, Latest Transmission, Alerts, Events Since Last Reset, Leads, Device Details, Battery, Device Alerts, Device Settings, Device Usage, and Rhythm Summary.

Preserve source values accurately. Clearly identify unavailable information, avoid unsupported clinical conclusions, and do not present the generated analysis as a confirmed medical diagnosis.`;

export function EditClinicForm({ clinicId = "1" }: EditClinicFormProps) {
  const router = useRouter();
  const currentClinic =
    initialClinics.find((c) => c.id === clinicId) || initialClinics[0];

  const [isSavingClinic, setIsSavingClinic] = useState(false);
  const [isSavingPrompt, setIsSavingPrompt] = useState(false);
  const [aiPrompt, setAiPrompt] = useState(defaultAiPrompt);

  const methods = useForm<CreateClinicFormData>({
    resolver: zodResolver(createClinicSchema),
    defaultValues: {
      name: currentClinic.name,
      administrator: currentClinic.administrator,
    },
    mode: "onChange",
  });

  const onSubmitClinic = async (data: CreateClinicFormData) => {
    setIsSavingClinic(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success(`Device clinic "${data.name}" updated successfully!`);
      router.push(`/admin/clinics/${clinicId}`);
    } catch {
      toast.error("Failed to update clinic information.");
    } finally {
      setIsSavingClinic(false);
    }
  };

  const onDeactivate = () => {
    toast.error(`Device clinic "${currentClinic.name}" deactivated.`);
  };

  const onSavePrompt = async () => {
    setIsSavingPrompt(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success("AI Report Prompt configuration saved successfully!");
    } catch {
      toast.error("Failed to save AI report prompt.");
    } finally {
      setIsSavingPrompt(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 pb-12">
      {/* Back to Device Clinics Link */}
      <div>
        <Link
          href={`/admin/clinics/${clinicId}`}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Device Clinics</span>
        </Link>
      </div>

      {/* Page Title */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Edit Device Clinic
        </h2>
        <p className="text-slate-500 text-sm sm:text-base">
          Update the Device Clinic account information.
        </p>
      </div>

      {/* =========================================================================
          Card 1: Device Clinic information
          ========================================================================= */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmitClinic)}>
          <div className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-8 shadow-xs flex flex-col gap-6">
            {/* Card Header */}
            <div className="flex items-center gap-3.5">
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

            {/* 2-Column Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                name="name"
                label="Device Clinic Name"
                placeholder="e.g., Central Cardiac Device Center"
                containerClassName="h-11 rounded-xl border-slate-200"
              />

              <FormSelect
                name="administrator"
                label="Administrator"
                placeholder="Select administrator"
                options={adminOptions}
                triggerClassName="h-11 rounded-xl border-slate-200 bg-white"
              />
            </div>

            {/* Readonly Active Records Warning Banner */}
            <div className="flex items-center gap-2.5 rounded-xl border border-[#D5E3F5] bg-[#EBF3FC]/60 p-3.5 text-xs sm:text-sm text-slate-700">
              <FileText className="size-4.5 text-primary shrink-0" />
              <span>
                <strong>Active Records cannot be edited manually.</strong> It is
                derived from active Export Verification files associated with this
                Device Clinic.
              </span>
            </div>

            {/* Actions: Cancel, Deactivate, Save Changes */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Link href={`/admin/clinics/${clinicId}`}>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 px-5 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold cursor-pointer"
                >
                  Cancel
                </Button>
              </Link>

              <Button
                type="button"
                variant="outline"
                onClick={onDeactivate}
                className="h-11 px-5 rounded-xl border-slate-200 text-slate-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 font-semibold cursor-pointer"
              >
                Deactivate
              </Button>

              <Button
                type="submit"
                disabled={isSavingClinic}
                className="h-11 px-6 rounded-xl bg-primary hover:bg-[#123258] text-white font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                {isSavingClinic ? (
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
          </div>
        </form>
      </FormProvider>

      {/* =========================================================================
          Card 2: AI Report Prompt
          ========================================================================= */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-8 shadow-xs flex flex-col gap-6">
        {/* Card Header */}
        <div className="flex items-center gap-3.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-2xs">
            <Sparkles className="size-5" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-base font-semibold text-slate-900">
              AI Report Prompt
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Configure the prompt used when generating reports for users
              assigned to this Device Clinic.
            </p>
          </div>
        </div>

        {/* Textarea Field */}
        <div className="flex flex-col gap-2">
          <label className="text-xs sm:text-sm font-semibold text-slate-700">
            Report generation prompt
          </label>
          <Textarea
            rows={8}
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            className="w-full rounded-xl border-slate-200 bg-white p-4 text-xs sm:text-sm text-slate-800 leading-relaxed focus-visible:ring-primary/20 resize-y"
          />
          <p className="text-xs text-slate-400">
            This prompt applies to report generation for this Device Clinic.
            Production AI configuration requires backend implementation.
          </p>
        </div>

        {/* Bottom Action: Save Prompt */}
        <div className="flex items-center justify-end pt-4 border-t border-slate-100">
          <Button
            type="button"
            onClick={onSavePrompt}
            disabled={isSavingPrompt}
            className="h-11 px-6 rounded-xl bg-primary hover:bg-[#123258] text-white font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            {isSavingPrompt ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Check className="size-4 stroke-[2.5]" />
                <span>Save Prompt</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

