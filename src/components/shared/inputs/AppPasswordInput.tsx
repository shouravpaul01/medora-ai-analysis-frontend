"use client";

import React, { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { AppInput, type AppInputProps } from "./AppInput";

export interface AppPasswordInputProps extends AppInputProps {
  showToggle?: boolean;
  showLockIcon?: boolean;
}

export const AppPasswordInput = React.forwardRef<
  HTMLInputElement,
  AppPasswordInputProps
>(
  (
    {
      showToggle = true,
      showLockIcon = false,
      placeholder = "••••••••••••",
      startIcon,
      endIcon,
      type: _type,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <AppInput
        ref={ref}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        startIcon={showLockIcon ? { icon: LockKeyhole } : startIcon}
        endIcon={
          showToggle
            ? {
                icon: showPassword ? EyeOff : Eye,
                onClick: () => setShowPassword((prev) => !prev),
              }
            : endIcon
        }
        {...props}
      />
    );
  }
);

AppPasswordInput.displayName = "AppPasswordInput";
