"use client";

import React, { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  FileText,
  CloudUpload,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldDescription,
} from "@/components/ui/field";
import { FormInput } from "@/components/shared/form/FormInput";
import { FormDatePicker } from "@/components/shared/form/FormDatePicker";
import { PageHeader } from "@/components/shared/PageHeader";
import PdfDropzone from "./PdfDropzone";
import { AnalysisResultsView } from "./analysis-results/AnalysisResultsView";
import type { ReviewData } from "./analysis-results/types";
import {
  importInterrogationSchema,
  type ImportInterrogationFormData,
} from "@/validation/dashboard.validation";
import { cn } from "@/lib/utils";

export default function ImportInterrogationForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);

  const methods = useForm<ImportInterrogationFormData>({
    resolver: zodResolver(importInterrogationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      documentType: "clinic",
    },
    mode: "onChange",
  });

  const {
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { isValid },
  } = methods;

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const dateOfBirth = watch("dateOfBirth");

  // Ready to process when patient info is filled and PDF is selected
  const isFormReady =
    Boolean(firstName && lastName && dateOfBirth && selectedFile);

  const onSubmit = async (data: ImportInterrogationFormData) => {
    if (!selectedFile) {
      toast.error("Please upload an interrogation PDF document.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate document upload & AI extraction
      await new Promise((resolve) => setTimeout(resolve, 900));
      toast.success(
        `Interrogation document "${selectedFile.name}" processed successfully!`
      );

      const initials = `${data.firstName?.[0] || ""}${data.lastName?.[0] || ""}`.toUpperCase();
      const formattedDob =
        data.dateOfBirth instanceof Date
          ? format(data.dateOfBirth, "MM/dd/yyyy")
          : String(data.dateOfBirth);

      setReviewData({
        patientName: `${data.firstName} ${data.lastName}`.trim(),
        patientInitials: initials || "PT",
        dateOfBirth: formattedDob,
        documentType: data.documentType,
        file: selectedFile,
      });
    } catch {
      toast.error("Failed to upload interrogation document. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (reviewData) {
    return (
      <AnalysisResultsView
        data={reviewData}
        onCloseReview={() => setReviewData(null)}
      />
    );
  }

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Page Title & Subtitle */}
      <PageHeader
        title="Import Interrogation"
        description="Enter basic patient information and upload an interrogation document for processing."
      />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* =========================================================================
              Card 1: Patient Information
              ========================================================================= */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-7 shadow-xs">
            {/* Header */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="flex size-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-2xs">
                <User className="size-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Patient information
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  All fields are required.
                </p>
              </div>
            </div>

            {/* Inputs: First Name, Last Name, Date of Birth */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FormInput
                name="firstName"
                label="First Name"
                placeholder="e.g., Olivia"
                containerClassName="h-11 rounded-xl border-slate-200"
              />

              <FormInput
                name="lastName"
                label="Last Name"
                placeholder="e.g., Bennett"
                containerClassName="h-11 rounded-xl border-slate-200"
              />

              <FormDatePicker
                name="dateOfBirth"
                label="Date of Birth"
                placeholder="MM/DD/YYYY"
                triggerClassName="h-11 rounded-xl border-slate-200"
              />
            </div>
          </div>

          {/* =========================================================================
              Card 2: Interrogation Document
              ========================================================================= */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-7 shadow-xs">
            {/* Header */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="flex size-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-2xs">
                <FileText className="size-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Interrogation document
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Choose a document type and add the report PDF.
                </p>
              </div>
            </div>

            {/* Document Type Selector */}
            <Field className="space-y-2.5 mb-6">
              <FieldLabel className="text-xs sm:text-sm font-semibold text-slate-700">
                Document Type
              </FieldLabel>

              <Controller
                name="documentType"
                control={methods.control}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md"
                  >
                    {/* Option 1: Clinic */}
                    <FieldLabel
                      htmlFor="doc-type-clinic"
                      className={cn(
                        "flex w-full items-start gap-3 rounded-xl p-3.5 border transition-all cursor-pointer font-normal select-none",
                        field.value === "clinic"
                          ? "border-2 border-primary bg-blue-50/40 ring-1 ring-primary/20"
                          : "border border-slate-200 bg-white hover:border-slate-300"
                      )}
                    >
                      <RadioGroupItem
                        value="clinic"
                        id="doc-type-clinic"
                        className="mt-0.5"
                      />
                      <FieldContent>
                        <span className="text-sm font-semibold text-slate-900 cursor-pointer">
                          Clinic
                        </span>
                        <FieldDescription className="text-xs text-slate-500 mt-0.5">
                          In-clinic interrogation
                        </FieldDescription>
                      </FieldContent>
                    </FieldLabel>

                    {/* Option 2: Remote */}
                    <FieldLabel
                      htmlFor="doc-type-remote"
                      className={cn(
                        "flex w-full items-start gap-3 rounded-xl p-3.5 border transition-all cursor-pointer font-normal select-none",
                        field.value === "remote"
                          ? "border-2 border-primary bg-blue-50/40 ring-1 ring-primary/20"
                          : "border border-slate-200 bg-white hover:border-slate-300"
                      )}
                    >
                      <RadioGroupItem
                        value="remote"
                        id="doc-type-remote"
                        className="mt-0.5"
                      />
                      <FieldContent>
                        <span className="text-sm font-semibold text-slate-900 cursor-pointer">
                          Remote
                        </span>
                        <FieldDescription className="text-xs text-slate-500 mt-0.5">
                          Remote transmission
                        </FieldDescription>
                      </FieldContent>
                    </FieldLabel>
                  </RadioGroup>
                )}
              />
            </Field>

            {/* PDF Document Upload Area */}
            <div className="space-y-2.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700">
                PDF document
              </label>

              <PdfDropzone
                file={selectedFile}
                onFileSelect={(file) => setSelectedFile(file)}
              />
            </div>
          </div>

          {/* =========================================================================
              Bottom Action Bar
              ========================================================================= */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
            {/* Security Guarantee Note */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck className="size-4 text-slate-400 shrink-0" />
              <span>Original PDF is not retained as a permanent record</span>
            </div>

            {/* Upload & Process Button */}
            <Button
              type="submit"
              disabled={!isFormReady || isSubmitting}
              className="h-12 px-6"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CloudUpload className="size-4" />
                  <span>Upload & Process</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

