"use client";

import React from "react";
import { useFormContext, get } from "react-hook-form";
import { AppInput, AppInputProps } from "@/components/shared/inputs/AppInput";

export interface FormInputProps extends Omit<AppInputProps, "error"> {
  name: string;
}

export function FormInput({
  name,
  type = "text",
  ...props
}: FormInputProps) {
  const formContext = useFormContext();
  const isInsideForm = Boolean(formContext && name);

  const error = isInsideForm
    ? (get(formContext.formState.errors, name)?.message as string | undefined)
    : undefined;

  const registration = isInsideForm
    ? formContext.register(name, {
        setValueAs:
          type === "number"
            ? (val) =>
                val === "" || val === null || val === undefined
                  ? undefined
                  : Number(val)
            : undefined,
      })
    : {};

  return (
    <AppInput
      name={name}
      type={type}
      error={error}
      {...registration}
      {...props}
    />
  );
}

export { AppInput };
export type { AppInputProps };
