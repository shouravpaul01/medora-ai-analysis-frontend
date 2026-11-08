"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  FileText,
  CloudUpload,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/shared/form/FormInput";
import PdfDropzone from "./PdfDropzone";
import {
  importInterrogationSchema,
  type ImportInterrogationFormData,
} from "@/validation/dashboard.validation";
import { cn } from "@/lib/utils";

export default function ImportInterrogationForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const currentDocType = watch("documentType");
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
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success(
        `Interrogation document "${selectedFile.name}" uploaded successfully! Processing started.`
      );
      // Reset form and file
      reset();
      setSelectedFile(null);
    } catch {
      toast.error("Failed to upload interrogation document. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-12">
      {/* Page Title & Subtitle */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Import Interrogation
        </h2>
        <p className="text-slate-500 text-sm sm:text-base mt-1.5">
          Enter basic patient information and upload an interrogation document for
          processing.
        </p>
      </div>

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

              <FormInput
                name="dateOfBirth"
                label="Date of Birth"
                placeholder="MM/DD/YYYY"
                containerClassName="h-11 rounded-xl border-slate-200"
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
            <div className="space-y-2.5 mb-6">
              <label className="text-xs sm:text-sm font-semibold text-slate-700">
                Document Type
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
                {/* Option 1: Clinic */}
                <button
                  type="button"
                  onClick={() => setValue("documentType", "clinic")}
                  className={cn(
                    "flex items-start gap-3 rounded-xl p-3.5 text-left transition-all cursor-pointer",
                    currentDocType === "clinic"
                      ? "border-2 border-primary bg-blue-50/40 ring-1 ring-primary/20"
                      : "border border-slate-200 bg-white hover:border-slate-300"
                  )}
                >
                  <div className="mt-0.5 flex size-4.5 items-center justify-center rounded-full border border-slate-300">
                    {currentDocType === "clinic" && (
                      <div className="size-2.5 rounded-full bg-primary" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Clinic
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      In-clinic interrogation
                    </p>
                  </div>
                </button>

                {/* Option 2: Remote */}
                <button
                  type="button"
                  onClick={() => setValue("documentType", "remote")}
                  className={cn(
                    "flex items-start gap-3 rounded-xl p-3.5 text-left transition-all cursor-pointer",
                    currentDocType === "remote"
                      ? "border-2 border-primary bg-blue-50/40 ring-1 ring-primary/20"
                      : "border border-slate-200 bg-white hover:border-slate-300"
                  )}
                >
                  <div className="mt-0.5 flex size-4.5 items-center justify-center rounded-full border border-slate-300">
                    {currentDocType === "remote" && (
                      <div className="size-2.5 rounded-full bg-primary" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Remote
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Remote transmission
                    </p>
                  </div>
                </button>
              </div>
            </div>

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
              className={cn(
                "h-12 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer",
                isFormReady
                  ? "bg-primary hover:bg-[#123258] text-white shadow-xs"
                  : "bg-slate-300 text-white cursor-not-allowed hover:bg-slate-300"
              )}
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

