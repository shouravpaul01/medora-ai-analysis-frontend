"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Sparkles,
  Clock,
  SlidersHorizontal,
  MessageSquareText,
  Send,
  Download,
  FileCheck,
  FileText,
  Loader2,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { ReviewData, ReviewPriority, ChatMessage } from "./types";

interface AnalysisResultsViewProps {
  data: ReviewData;
  onCloseReview: () => void;
}

export function AnalysisResultsView({
  data,
  onCloseReview,
}: AnalysisResultsViewProps) {
  const router = useRouter();
  const [priority, setPriority] = useState<ReviewPriority>("Medium");
  const [programmingChanges, setProgrammingChanges] = useState("");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Generate blob URL from the uploaded file
  useEffect(() => {
    if (data.file) {
      const url = URL.createObjectURL(data.file);
      setPdfUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [data.file]);

  const handleDownloadPdf = () => {
    if (pdfUrl && data.file) {
      const a = document.createElement("a");
      a.href = pdfUrl;
      a.download = data.file.name;
      a.click();
    } else {
      toast.info("No source PDF file available to download.");
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isSending) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: question.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setQuestion("");
    setIsSending(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: `Analysis insight: In the interrogation document for ${data.patientName}, lead parameters indicate stable LV pacing with transient RV sensing fluctuation.`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsSending(false);
    }
  };

  const handleFinalize = async () => {
    setIsFinalizing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      toast.success(
        `Report for ${data.patientName} finalized successfully! Added to Export Verification.`
      );
      router.push("/dashboard/export-verification");
    } catch {
      toast.error("Failed to finalize report. Please try again.");
    } finally {
      setIsFinalizing(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 pb-16">
      {/* =========================================================================
          Top Bar: Back Button & Session Status Indicator
          ========================================================================= */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onCloseReview}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="size-4" />
          <span>Close review</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
          <span className="size-2 rounded-full bg-blue-600 animate-pulse" />
          <span>Active review session</span>
        </div>
      </div>

      {/* =========================================================================
          Page Header & Patient Info Pill
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Analysis Results
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            Review source report data and the generated analysis before
            finalizing.
          </p>
        </div>

        {/* Patient Pill */}
        <div className="flex items-center gap-3 bg-white border border-slate-100 rounded-2xl p-2.5 sm:px-4 sm:py-2.5 shadow-xs">
          <Avatar className="size-9 bg-primary text-primary-foreground font-bold text-xs shrink-0">
            <AvatarFallback className="bg-primary text-primary-foreground font-bold">
              {data.patientInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
              {data.patientName}
            </span>
            <span className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5">
              DOB {data.dateOfBirth}
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          Main 2-Column Layout (Left: Source PDF, Right: AI Summary & Actions)
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Source PDF Viewer */}
        <div className="lg:col-span-5 w-full rounded-2xl border border-slate-100 bg-white shadow-xs overflow-hidden flex flex-col h-[780px]">
          {/* PDF Viewer Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-white shrink-0">
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Source document
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-800">
                Interrogation Report
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleDownloadPdf}
                className="size-8 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                title="Download source PDF"
              >
                <Download className="size-4" />
              </Button>
              <span className="text-xs font-medium text-slate-400 px-1">
                1 / 4
              </span>
            </div>
          </div>

          {/* Embedded Native PDF Viewer */}
          <div className="flex-1 w-full bg-slate-50 overflow-hidden relative">
            {pdfUrl ? (
              <iframe
                src={`${pdfUrl}#toolbar=0&navpanes=0`}
                title="Source Interrogation PDF Document"
                className="w-full h-full border-0"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-slate-400 gap-3">
                <div className="size-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                  <FileText className="size-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-slate-700">
                    No PDF file attached
                  </p>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Please upload an interrogation report in the form to preview
                    it here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: AI Summary, Programming Changes, Ask Questions, Finalize */}
        <div className="lg:col-span-7 w-full flex flex-col gap-6">
          {/* Card 1: AI Summary */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-7 shadow-xs flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                  Generated Review
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <Sparkles className="size-4 text-slate-700" />
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    AI Summary
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="size-3.5" />
                <span>Generated on Wed, Oct 28, 2026 3:48 PM</span>
              </div>
            </div>

            {/* Priority Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-semibold text-slate-900">
                  Priority
                </span>
                <span className="text-xs text-slate-400 mt-0.5">
                  Set the review priority for this report.
                </span>
              </div>

              {/* Priority Toggle Buttons */}
              <div className="flex items-center rounded-xl border border-slate-200/80 p-1 bg-white shrink-0">
                {(["High", "Medium", "Low"] as const).map((p) => {
                  const isActive = priority === p;
                  let activeClass = "";
                  if (isActive) {
                    if (p === "High") {
                      activeClass =
                        "bg-rose-50 text-rose-700 font-semibold border border-rose-200/70 shadow-2xs";
                    } else if (p === "Medium") {
                      activeClass =
                        "bg-[#FEF3C7] text-[#92400E] font-semibold border border-amber-200/70 shadow-2xs";
                    } else {
                      activeClass =
                        "bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200/70 shadow-2xs";
                    }
                  } else {
                    activeClass =
                      "text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-transparent";
                  }

                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={cn(
                        "px-3.5 py-1 text-xs rounded-lg transition-all cursor-pointer",
                        activeClass
                      )}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Clinical Summary Text */}
            <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
              <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                Clinical Summary
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                This Boston Scientific RESONATE HF CRT-D device shows adequate
                battery life (&gt;6.5 years). Overall pacing burden is high and
                appropriate, consistent with the clinical CRT indication (atrial
                pacing 84%, robust biventricular pacing ~93-98%). Thoracic
                impedance and patient activity levels are stable, reflecting a
                stable heart failure clinical profile. There is zero
                significant atrial fibrillation burden detected (longest
                historical episode was only 10 seconds). The device recorded
                two brief non-sustained ventricular tachycardia (NSVT)
                episodes, the longest lasting 14 seconds, both spontaneously
                terminating without requiring ATP or shock therapy,
                demonstrating appropriately withheld high-voltage therapy. Lead
                parameters are mostly stable; however, right ventricular (RV)
                intrinsic sensing has dropped to 3.4 mV (generating a &apos;high&apos; risk
                flag), and the RV capture threshold transiently spiked to 1.9 V
                at the last in-office check (moderate risk). Left ventricular
                pacing parameters and ICD shock impedances remain completely
                normal. No immediate device reprogramming or intervention is
                urgently required, but close monitoring of the RV lead parameters
                is recommended given the recent measurement fluctuations.
              </p>
            </div>
          </div>

          {/* Card 2: Programming Changes */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-xs flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="size-4 text-slate-700" />
              <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                Programming Changes
              </h4>
            </div>

            <textarea
              rows={3}
              value={programmingChanges}
              onChange={(e) => setProgrammingChanges(e.target.value)}
              placeholder="Enter programming changes..."
              className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
            />
          </div>

          {/* Card 3: Ask Questions */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-xs flex flex-col gap-3.5">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <MessageSquareText className="size-4 text-slate-700" />
                <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                  Ask Questions
                </h4>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Questions stay with this review session and clear when you close
                or finalize.
              </p>
            </div>

            {/* Input with Send Button */}
            <form onSubmit={handleSendMessage} className="relative flex items-center">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask about this analysis..."
                className="w-full h-11 pl-4 pr-12 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <Button
                type="submit"
                disabled={!question.trim() || isSending}
                className="absolute right-1.5 size-8 rounded-lg p-0 flex items-center justify-center cursor-pointer"
              >
                {isSending ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Send className="size-3.5" />
                )}
              </Button>
            </form>

            {/* Chat History Box */}
            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 min-h-[90px] max-h-52 overflow-y-auto flex flex-col gap-2.5">
              {messages.length === 0 ? (
                <p className="text-xs text-slate-400 my-auto">
                  Chat history will appear here...
                </p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex flex-col max-w-[85%] text-xs p-3 rounded-xl",
                      msg.sender === "user"
                        ? "ml-auto bg-primary text-white"
                        : "mr-auto bg-white border border-slate-200/80 text-slate-800 shadow-2xs"
                    )}
                  >
                    <span className="font-semibold text-[10px] opacity-75 mb-0.5">
                      {msg.sender === "user" ? "You" : "CorVera AI"} •{" "}
                      {msg.timestamp}
                    </span>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Bottom Action: Finalize Button */}
          <div className="flex items-center justify-end">
            <Button
              type="button"
              onClick={handleFinalize}
              disabled={isFinalizing}
              className="h-11 px-6"
            >
              {isFinalizing ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Finalizing...</span>
                </>
              ) : (
                <>
                  <FileCheck className="size-4" />
                  <span>Finalize</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisResultsView;

