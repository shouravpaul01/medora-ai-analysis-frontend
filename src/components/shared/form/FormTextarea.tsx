"use client";

import React from "react";
import { useFormContext, get } from "react-hook-form";
import {
  AppTextarea,
  AppTextareaProps,
} from "@/components/shared/inputs/AppTextarea";

export interface FormTextareaProps extends Omit<AppTextareaProps, "error"> {
  name: string;
}

export function FormTextarea({
  name,
  disabled = false,
  ...props
}: FormTextareaProps) {
  const formContext = useFormContext();
  const isInsideForm = Boolean(formContext && name);

  const error = isInsideForm
    ? (get(formContext.formState.errors, name)?.message as string | undefined)
    : undefined;

  const registration = isInsideForm ? formContext.register(name) : {};

  return (
    <AppTextarea
      name={name}
      disabled={disabled}
      error={error}
      {...registration}
      {...props}
    />
  );
}

export { AppTextarea };
export type { AppTextareaProps };