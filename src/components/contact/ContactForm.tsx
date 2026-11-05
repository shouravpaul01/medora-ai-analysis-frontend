"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/shared/form/FormInput";
import { FormTextarea } from "@/components/shared/form/FormTextarea";
import {
  contactSchema,
  type ContactFormData,
} from "@/validation/contact.validation";

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    try {
      // Simulate submission delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success("Thank you! Your message has been sent successfully.");
      methods.reset();
    } catch {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
        {/* Name & Email 2-column row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormInput
            name="fullName"
            label="Full Name"
            required
            placeholder="Enter your full name"
            containerClassName="h-11 rounded-xl border-slate-200"
          />

          <FormInput
            name="email"
            type="email"
            label="Email Address"
            required
            placeholder="name@example.com"
            containerClassName="h-11 rounded-xl border-slate-200"
          />
        </div>

        {/* Subject */}
        <FormInput
          name="subject"
          label="Subject"
          required
          placeholder="What would you like to discuss?"
          containerClassName="h-11 rounded-xl border-slate-200"
        />

        {/* Message */}
        <FormTextarea
          name="message"
          label="Message"
          required
          rows={5}
          placeholder="Tell us how we can help. Please do not include sensitive patient information."
          textareaClassName="rounded-xl border-slate-200 resize-none min-h-[120px]"
        />

        {/* Submit button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-primary hover:bg-[#123258] text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all hover:-translate-y-0.5 cursor-pointer mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>
    </FormProvider>
  );
}

