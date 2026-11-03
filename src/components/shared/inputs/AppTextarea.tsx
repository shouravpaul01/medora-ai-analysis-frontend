"use client";

import React from "react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export interface AppTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
  error?: string;
  textareaClassName?: string;
}

export const AppTextarea = React.forwardRef<
  HTMLTextAreaElement,
  AppTextareaProps
>(
  (
    {
      id,
      name,
      label,
      placeholder,
      description,
      error,
      rows = 4,
      disabled = false,
      className,
      textareaClassName,
      ...props
    },
    ref
  ) => {
    const textareaId = id || name;

    return (
      <Field className={className}>
        {label && <FieldLabel htmlFor={textareaId}>{label}</FieldLabel>}

        <FieldContent>
          <Textarea
            ref={ref}
            id={textareaId}
            name={name}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            className={cn("bg-white", textareaClassName)}
            {...props}
          />
        </FieldContent>

        {description && <FieldDescription>{description}</FieldDescription>}
        {error && <FieldError>{error}</FieldError>}
      </Field>
    );
  }
);

AppTextarea.displayName = "AppTextarea";
