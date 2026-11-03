"use client";

import React from "react";
import { get, useFormContext } from "react-hook-form";
import {
  AppCheckbox,
  AppCheckboxProps,
  CheckboxOption,
} from "@/components/shared/inputs/AppCheckbox";

export interface FormCheckboxProps
  extends Omit<
    AppCheckboxProps,
    "checked" | "onCheckedChange" | "values" | "onValuesChange" | "error"
  > {
  name: string;
}

export function FormCheckbox({
  name,
  label,
  description,
  disabled = false,
  options,
  className,
}: FormCheckboxProps) {
  const formContext = useFormContext();

  // Safe fallback if used outside FormProvider
  if (!formContext) {
    return (
      <AppCheckbox
        name={name}
        label={label}
        description={description}
        disabled={disabled}
        options={options}
        className={className}
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

  if (options?.length) {
    return (
      <AppCheckbox
        name={name}
        label={label}
        description={description}
        disabled={disabled}
        options={options}
        values={value || []}
        onValuesChange={(updated) =>
          setValue(name, updated, {
            shouldValidate: true,
            shouldDirty: true,
          })
        }
        error={error}
        className={className}
      />
    );
  }

  return (
    <AppCheckbox
      name={name}
      label={label}
      description={description}
      disabled={disabled}
      checked={Boolean(value)}
      onCheckedChange={(checked) =>
        setValue(name, checked, {
          shouldValidate: true,
          shouldDirty: true,
        })
      }
      error={error}
      className={className}
    />
  );
}

export { AppCheckbox };
export type { CheckboxOption };