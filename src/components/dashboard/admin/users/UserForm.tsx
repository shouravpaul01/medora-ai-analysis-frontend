"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageHeader";
import { FormInput } from "@/components/shared/form/FormInput";
import { FormPasswordInput } from "@/components/shared/form/FormPasswordInput";
import { FormSelect } from "@/components/shared/form/FormSelect";
import {
  createUserSchema,
  editUserSchema,
  type CreateUserFormData,
  type EditUserFormData,
} from "@/validation/admin.validation";
import {
  initialAdminUsers,
  clinicOptions,
  roleOptions,
  type AdminUserItem,
} from "./types";

interface UserFormProps {
  userId?: string;
  mode?: "create" | "edit";
}

export function UserForm({ userId, mode }: UserFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEdit = Boolean(userId || mode === "edit");

  // Find existing user if in edit mode
  const currentUser: AdminUserItem | null = useMemo(() => {
    if (!isEdit) return null;
    return (
      initialAdminUsers.find((u) => u.id === userId) || initialAdminUsers[0]
    );
  }, [isEdit, userId]);

  // Extract first and last name for prefill if editing
  const nameParts = currentUser?.name?.split(" ") || [];
  const initialFirstName = nameParts[0] || "";
  const initialLastName = nameParts.slice(1).join(" ") || "";

  const methods = useForm<CreateUserFormData | EditUserFormData>({
    resolver: zodResolver(isEdit ? editUserSchema : createUserSchema),
    defaultValues: isEdit
      ? {
          firstName: initialFirstName,
          lastName: initialLastName,
          email: currentUser?.email || "",
          role: currentUser?.role || "",
          deviceClinic: currentUser?.deviceClinic || "unassigned",
          password: "",
        }
      : {
          firstName: "",
          lastName: "",
          email: "",
          role: "",
          deviceClinic: "unassigned",
          password: "",
        },
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (isEdit) {
        toast.success(
          `User "${data.firstName} ${data.lastName}" updated successfully!`
        );
        router.push(userId ? `/admin/users/${userId}` : "/admin/users");
      } else {
        toast.success(
          `User "${data.firstName} ${data.lastName}" created successfully!`
        );
        router.push("/admin/users");
      }
    } catch {
      toast.error(
        `Failed to ${isEdit ? "update" : "create"} user. Please try again.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDisableUser = () => {
    toast.error(`User "${currentUser?.name}" has been disabled.`);
  };

  const backHref = isEdit && userId ? `/admin/users/${userId}` : "/admin/users";

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 pb-12">
      <PageHeader
        backLink={{ href: backHref, label: "Back to Users" }}
        title={isEdit ? "Edit User" : "Add New User"}
        description={
          isEdit
            ? "Update the user's account details"
            : "Create a new user account"
        }
      />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          {/* Main Card */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-8 shadow-xs">
            {/* Card Header */}
            <div className="flex items-center gap-3.5 mb-8">
              <div className="flex size-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-2xs">
                <User className="size-5" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-base font-semibold text-slate-900">
                  User information
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Assign the user directly to one Device Clinic.
                </p>
              </div>
            </div>

            {/* 2-Column Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="flex flex-col gap-5">
                <FormInput
                  name="firstName"
                  label="First Name"
                  placeholder="e.g., Jamie"
                  containerClassName="h-11 rounded-xl border-slate-200"
                />

                <FormInput
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="name@example.com"
                  containerClassName="h-11 rounded-xl border-slate-200"
                />

                <FormSelect
                  name="deviceClinic"
                  label="Device Clinic"
                  placeholder={
                    isEdit ? "Select Device Clinic" : "Unassigned"
                  }
                  options={clinicOptions}
                  triggerClassName="h-11 rounded-xl border-slate-200 bg-white"
                />
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-5">
                <FormInput
                  name="lastName"
                  label="Last Name"
                  placeholder="e.g., Carter"
                  containerClassName="h-11 rounded-xl border-slate-200"
                />

                <FormSelect
                  name="role"
                  label="Role"
                  placeholder="Select role"
                  options={roleOptions}
                  triggerClassName="h-11 rounded-xl border-slate-200 bg-white"
                />

                <div className="flex flex-col gap-1">
                  <FormPasswordInput
                    name="password"
                    label="Password"
                    placeholder="••••••••••••"
                    containerClassName="h-11 rounded-xl border-slate-200"
                  />
                  <p className="text-[11px] text-rose-500 font-medium">
                    **Must be at least 8 characters, uppercase, lowercase,
                    number & special character.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-slate-100">
              {isEdit && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDisableUser}
                  className="h-11 px-5 rounded-xl border-slate-200 text-slate-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 font-semibold cursor-pointer"
                >
                  Disable User
                </Button>
              )}

              <Link href={backHref}>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 px-5 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold cursor-pointer"
                >
                  Cancel
                </Button>
              </Link>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 px-6 rounded-xl bg-primary hover:bg-[#123258] text-white font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>{isEdit ? "Saving..." : "Creating..."}</span>
                  </>
                ) : (
                  <>
                    <Check className="size-4 stroke-[2.5]" />
                    <span>{isEdit ? "Save Changes" : "Create User"}</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

