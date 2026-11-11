"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { ProfileInformationCard } from "./ProfileInformationCard";
import { AdministratorAccessCard } from "./AdministratorAccessCard";
import { SecurityCard } from "./SecurityCard";
import {
  initialAdminProfile,
  type AdminProfileData,
} from "./types";

export function AdminSettingsView() {
  const [profile, setProfile] =
    useState<AdminProfileData>(initialAdminProfile);

  const handleUpdateProfile = (updated: Partial<AdminProfileData>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  return (
    <div className="w-full flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <PageHeader
        title="Admin Settings"
        description="Manage your administrator profile and account security."
      />

      {/* Profile Information Card */}
      <ProfileInformationCard
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
      />

      {/* Administrator Access Card */}
      <AdministratorAccessCard role={profile.accountRole} />

      {/* Security & Change Password Card */}
      <SecurityCard />
    </div>
  );
}

