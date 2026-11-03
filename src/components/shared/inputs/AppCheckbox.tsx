"use client";

import React from "react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";

export interface CheckboxOption {
  label: string;
  value: string;
}

export interface AppCheckboxProps {
  id?: string;
  name?: string;
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  // Single mode
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  // Multiple mode
  options?: CheckboxOption[];
  values?: string[];
  onValuesChange?: (values: string[]) => void;
}

export function AppCheckbox({
  id,
  name,
  label,
  description,
  error,
  disabled = false,
  className,
  checked,
  onCheckedChange,
  options,
  values = [],
  onValuesChange,
}: AppCheckboxProps) {
  const checkboxId = id || name;

  // Multiple checkboxes mode
  if (options?.length) {
    return (
      <Field className={className}>
        {label && <FieldLabel>{label}</FieldLabel>}

        <div className="flex flex-wrap gap-4">
          {options.map((option) => {
            const isChecked = values.includes(option.value);
            const optId = `${checkboxId}-${option.value}`;

            return (
              <div key={option.value} className="flex items-center gap-2">
                <Checkbox
                  id={optId}
                  checked={isChecked}
                  disabled={disabled}
                  onCheckedChange={(c) => {
                    if (!onValuesChange) return;
                    const updated = c
                      ? [...values, option.value]
                      : values.filter((item) => item !== option.value);
                    onValuesChange(updated);
                  }}
                />
                <FieldLabel
                  htmlFor={optId}
                  className="cursor-pointer font-normal text-sm"
                >
                  {option.label}
                </FieldLabel>
              </div>
            );
          })}
        </div>

        {description && <FieldDescription>{description}</FieldDescription>}
        {error && <FieldError>{error}</FieldError>}
      </Field>
    );
  }

  // Single checkbox mode
  return (
    <Field className={className}>
      <div className="flex items-start gap-3">
        <Checkbox
          id={checkboxId}
          checked={Boolean(checked)}
          disabled={disabled}
          onCheckedChange={(c) => onCheckedChange?.(Boolean(c))}
          className="mt-1"
        />

        <div className="space-y-1">
          {label && (
            <FieldLabel htmlFor={checkboxId} className="cursor-pointer">
              {label}
            </FieldLabel>
          )}
          {description && <FieldDescription>{description}</FieldDescription>}
          {error && <FieldError>{error}</FieldError>}
        </div>
      </div>
    </Field>
  );
}
