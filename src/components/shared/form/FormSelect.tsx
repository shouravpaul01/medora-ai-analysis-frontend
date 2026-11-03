"use client";

import React from "react";
import { useFormContext, Controller, get } from "react-hook-form";
import {
  AppSelect,
  AppSelectProps,
  SelectOption,
} from "@/components/shared/inputs/AppSelect";

export interface FormSelectProps
  extends Omit<AppSelectProps, "value" | "onChange" | "error"> {
  name: string;
}

export function FormSelect({
  name,
  disabled = false,
  ...props
}: FormSelectProps) {
  const formContext = useFormContext();

  // Graceful fallback if outside FormProvider
  if (!formContext) {
    return <AppSelect name={name} disabled={disabled} {...props} />;
  }

  const {
    control,
    formState: { errors },
  } = formContext;

  const error = get(errors, name)?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <AppSelect
          name={name}
          value={field.value || ""}
          onChange={field.onChange}
          disabled={disabled}
          error={error}
          {...props}
        />
      )}
    />
  );
}

export { AppSelect };
export type { SelectOption };
