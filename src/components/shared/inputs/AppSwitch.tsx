"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export interface AppSwitchProps {
  id?: string;
  name?: string;
  label?: string;
  description?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
}

export function AppSwitch({
  id,
  name,
  label,
  description,
  checked,
  onCheckedChange,
  disabled = false,
  className,
  labelClassName,
}: AppSwitchProps) {
  const switchId = id || name;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Switch
        id={switchId}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
      {(label || description) && (
        <label
          htmlFor={switchId}
          className={cn("cursor-pointer select-none", labelClassName)}
        >
          {label && description ? (
            <span className="flex flex-col gap-0.5">
              <span className="text-xs sm:text-sm font-medium text-slate-800">
                {label}
              </span>
              <span className="text-xs text-slate-500 font-normal">
                {description}
              </span>
            </span>
          ) : (
            <span className="text-xs sm:text-sm text-slate-500 font-normal">
              {label || description}
            </span>
          )}
        </label>
      )}
    </div>
  );
}
