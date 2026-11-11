"use client";

import React from "react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string;
}

export interface AppSelectProps {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  description?: string;
  error?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
}

export function AppSelect({
  id,
  name,
  label,
  placeholder = "Select an option",
  description,
  error,
  options,
  value,
  onChange,
  disabled = false,
  className,
  triggerClassName,
}: AppSelectProps) {
  const selectId = id || name;

  return (
    <Field className={className}>
      {label && <FieldLabel htmlFor={selectId}>{label}</FieldLabel>}

      <FieldContent>
        <Select value={value} onValueChange={onChange} disabled={disabled}>
          <SelectTrigger
            id={selectId}
            className={cn("bg-white h-11! w-full", triggerClassName)}
          >
            <SelectValue placeholder={placeholder}>
              {options.find((opt) => opt.value === value)?.label || placeholder}
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            {options
              .filter((option) => Boolean(option.value && option.value.trim()))
              .map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="p-2 cursor-pointer"
                >
                  {option.label}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </FieldContent>

      {description && <FieldDescription>{description}</FieldDescription>}
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}
