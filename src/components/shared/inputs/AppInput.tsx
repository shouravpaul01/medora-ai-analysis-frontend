"use client";

import React, { ElementType } from "react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

export type IconConfig = {
  icon: ElementType;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export interface AppInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: React.ReactNode;
  description?: string;
  error?: string;
  startIcon?: IconConfig;
  endIcon?: IconConfig;
  inputClassName?: string;
  containerClassName?: string;
  required?: boolean;
}

export const AppInput = React.forwardRef<HTMLInputElement, AppInputProps>(
  (
    {
      label,
      id,
      name,
      type = "text",
      placeholder,
      disabled = false,
      description,
      error,
      className,
      inputClassName,
      containerClassName,
      startIcon,
      endIcon,
      required,
      ...props
    },
    ref
  ) => {
    const inputId = id || name;

    const renderIcon = (
      config?: IconConfig,
      align?: "inline-start" | "inline-end"
    ) => {
      if (!config) return null;
      const Icon = config.icon;

      return (
        <InputGroupAddon
          align={align}
          onClick={config.disabled ? undefined : config.onClick}
          className={cn(
            "transition",
            config.onClick &&
              !config.disabled &&
              "cursor-pointer hover:text-primary",
            config.disabled && "opacity-50 cursor-not-allowed",
            config.className
          )}
        >
          <Icon className="text-muted-foreground w-4 h-4" />
        </InputGroupAddon>
      );
    };

    return (
      <Field className={className}>
        {label && (
          <FieldLabel htmlFor={inputId} className="text-xs sm:text-sm font-medium text-slate-700 flex items-center">
            <span>{label}</span>
            {required && <span className="text-rose-500 font-semibold ml-1">*</span>}
          </FieldLabel>
        )}

        <InputGroup className={cn("h-11 bg-white", containerClassName)}>
          {renderIcon(startIcon, "inline-start")}

          <InputGroupInput
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClassName}
            {...props}
          />

          {renderIcon(endIcon, "inline-end")}
        </InputGroup>

        {description && <FieldDescription>{description}</FieldDescription>}
        {error && <FieldError>{error}</FieldError>}
      </Field>
    );
  }
);

AppInput.displayName = "AppInput";
