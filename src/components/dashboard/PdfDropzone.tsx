"use client";

import React, { useRef, useState } from "react";
import { CloudUpload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface PdfDropzoneProps {
  file: File | null;
  onFileSelect: (file: File | null) => void;
  className?: string;
}

export default function PdfDropzone({
  file,
  onFileSelect,
  className,
}: PdfDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const validateAndSetFile = (selectedFile: File) => {
    if (
      selectedFile.type !== "application/pdf" &&
      !selectedFile.name.toLowerCase().endsWith(".pdf")
    ) {
      toast.error("Please upload a valid PDF document only.");
      return;
    }

    // 20 MB size limit
    if (selectedFile.size > 20 * 1024 * 1024) {
      toast.error("File size exceeds maximum allowed 20 MB.");
      return;
    }

    onFileSelect(selectedFile);
    toast.success(`"${selectedFile.name}" selected`);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={cn("w-full", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      {file ? (
        /* Filled State Card (Matching Image 2) */
        <div className="flex items-center justify-between rounded-xl border border-[#D5E3F5] bg-[#EEF4FB] p-4 transition-all shadow-2xs">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="flex size-10 items-center justify-center rounded-lg bg-white text-primary shadow-xs shrink-0">
              <FileText className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                {file.name}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {formatFileSize(file.size)} · PDF · Ready to process
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="flex size-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition-colors cursor-pointer"
            aria-label="Remove file"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        /* Empty State Dropzone (Matching Image 1) */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 sm:p-10 text-center transition-all cursor-pointer",
            isDragOver
              ? "border-primary bg-blue-50/60 ring-4 ring-primary/10"
              : "border-slate-200 bg-slate-50/40 hover:bg-slate-50/80 hover:border-slate-300"
          )}
        >
          {/* Cloud Upload Icon Badge */}
          <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-3.5 shadow-2xs">
            <CloudUpload className="size-5.5" />
          </div>

          <p className="text-sm sm:text-base font-semibold text-slate-900">
            Drag and drop your PDF here
          </p>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            or choose a file from your computer
          </p>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-9 px-4 rounded-lg bg-white border-slate-200 text-slate-700 font-semibold text-xs shadow-2xs hover:bg-slate-50 cursor-pointer pointer-events-none"
          >
            Browse Files
          </Button>

          <p className="text-[11px] text-slate-400 mt-3 font-normal">
            PDF only · Maximum file size 20 MB
          </p>
        </div>
      )}
    </div>
  );
}

