"use client";

import React from "react";
import { useFormContext, get } from "react-hook-form";
import {
  AppPasswordInput,
  type AppPasswordInputProps,
} from "@/components/shared/inputs/AppPasswordInput";

export interface FormPasswordInputProps
  extends Omit<AppPasswordInputProps, "error"> {
  name: string;
}

export function FormPasswordInput({
  name,
  showLockIcon = true,
  placeholder = "Password",
  ...props
}: FormPasswordInputProps) {
  const formContext = useFormContext();
  const isInsideForm = Boolean(formContext && name);

  const error = isInsideForm
    ? (get(formContext.formState.errors, name)?.message as string | undefined)
    : undefined;

  const registration = isInsideForm ? formContext.register(name) : {};

  return (
    <AppPasswordInput
      name={name}
      placeholder={placeholder}
      showLockIcon={showLockIcon}
      error={error}
      {...registration}
      {...props}
    />
  );
}

export { AppPasswordInput };
export type { AppPasswordInputProps };
