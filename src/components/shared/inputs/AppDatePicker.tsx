"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

export interface AppDatePickerProps {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  value?: Date | string | null;
  onChange?: (date: Date | undefined) => void;
  className?: string;
}

export function AppDatePicker({
  id,
  name,
  label,
  placeholder = "Pick a date",
  description,
  error,
  disabled = false,
  value,
  onChange,
  className,
}: AppDatePickerProps) {
  const [open, setOpen] = useState(false);

  const selectedDate = value ? new Date(value) : undefined;
  const isInvalidDate = selectedDate && isNaN(selectedDate.getTime());
  const validDate = isInvalidDate ? undefined : selectedDate;

  return (
    <Field className={className}>
      {label && <FieldLabel>{label}</FieldLabel>}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-between text-left font-normal h-12 bg-white",
              !validDate && "text-muted-foreground"
            )}
          >
            <span>
              {validDate ? format(validDate, "PPP") : placeholder}
            </span>

            <CalendarIcon className="w-4 h-4 text-muted-foreground" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={validDate}
            onSelect={(date) => {
              onChange?.(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>

      {description && <FieldDescription>{description}</FieldDescription>}
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}
