"use client";

import React from "react";
import { useFormContext, get } from "react-hook-form";
import {
  AppDatePicker,
  AppDatePickerProps,
} from "@/components/shared/inputs/AppDatePicker";

export interface FormDatePickerProps extends Omit<
  AppDatePickerProps,
  "value" | "onChange" | "error"
> {
  name: string;
}

export function FormDatePicker({
  name,
  label,
  description,
  disabled = false,
  placeholder = "Pick a date",
  className,
  triggerClassName,
  formatPattern,
}: FormDatePickerProps) {
  const formContext = useFormContext();

  // Safe fallback if used outside FormProvider
  if (!formContext) {
    return (
      <AppDatePicker
        name={name}
        label={label}
        description={description}
        disabled={disabled}
        placeholder={placeholder}
        className={className}
        triggerClassName={triggerClassName}
        formatPattern={formatPattern}
      />
    );
  }

  const {
    setValue,
    watch,
    formState: { errors },
  } = formContext;

  const error = get(errors, name)?.message as string | undefined;
  const value = watch(name);

  return (
    <AppDatePicker
      name={name}
      label={label}
      description={description}
      disabled={disabled}
      placeholder={placeholder}
      className={className}
      triggerClassName={triggerClassName}
      formatPattern={formatPattern}
      value={value}
      onChange={(date) =>
        setValue(name, date, {
          shouldValidate: true,
          shouldDirty: true,
        })
      }
      error={error}
    />
  );
}

export { AppDatePicker };
export type { AppDatePickerProps };
