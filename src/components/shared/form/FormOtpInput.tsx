"use client";

import React from "react";
import { useFormContext, Controller, get } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";

interface FormOtpInputProps {
  name: string;
  label?: string;
  description?: string;
  length?: number;
  disabled?: boolean;
  className?: string;
}

export function FormOtpInput({
  name,
  label,
  description,
  length = 4,
  disabled = false,
  className,
}: FormOtpInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, name)?.message as string | undefined;

  return (
    <Field className={cn("w-full", className)}>
      {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}

      <FieldContent className="flex justify-center">
        <Controller
          name={name}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputOTP
              id={name}
              maxLength={length}
              value={field.value || ""}
              onChange={field.onChange}
              disabled={disabled}
              containerClassName="justify-center"
            >
              <InputOTPGroup className="gap-3 sm:gap-4 justify-center">
                {Array.from({ length }).map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className={cn(
                      "w-12 h-12 sm:w-14 sm:h-14 rounded-lg border border-slate-200 bg-white text-xl font-bold text-primary shadow-none",
                      "first:rounded-lg last:rounded-lg first:border",

                      error &&
                        "border-red-500 data-[active=true]:border-red-500 data-[active=true]:ring-red-500",
                      disabled && "opacity-50 cursor-not-allowed bg-slate-50",
                    )}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          )}
        />
      </FieldContent>

      {description && <FieldDescription>{description}</FieldDescription>}
      {error && <FieldError className="text-center">{error}</FieldError>}
    </Field>
  );
}
