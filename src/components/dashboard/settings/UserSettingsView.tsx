"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { UserSettingsProfileSidebar } from "./UserSettingsProfileSidebar";
import { UserPersonalInformationCard } from "./UserPersonalInformationCard";
import { UserSecurityCard } from "./UserSecurityCard";
import {
  initialUserProfile,
  type UserProfileData,
} from "./types";

export function UserSettingsView() {
  const [profile, setProfile] = useState<UserProfileData>(initialUserProfile);
  const [activeTab, setActiveTab] = useState<"personal" | "security">("personal");

  const handleUpdateProfile = (updated: Partial<UserProfileData>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  const fullName = `${profile.firstName} ${profile.lastName}`.trim();
  const initials = `${profile.firstName?.[0] || ""}${profile.lastName?.[0] || ""}`.toUpperCase();

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <PageHeader
        title="User Settings"
        description="Manage your personal information, institutional details, and security."
      />

      {/* Main 2-Column Layout */}
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Left Profile Summary Card / Tab Sidebar */}
        <UserSettingsProfileSidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          name={fullName}
          role={profile.institutionalRole}
          initials={initials}
        />

        {/* Right Content Area */}
        <div className="flex-1 w-full flex flex-col gap-6">
          <UserPersonalInformationCard
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
          />

          <UserSecurityCard
            key={activeTab}
            isDefaultOpen={activeTab === "security"}
          />
        </div>
      </div>
    </div>
  );
}

export default UserSettingsView;

