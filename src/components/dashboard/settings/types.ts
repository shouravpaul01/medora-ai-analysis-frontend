export interface UserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  institutionalRole: string;
  deviceClinic: string;
}

export const initialUserProfile: UserProfileData = {
  firstName: "Alex",
  lastName: "Morgan",
  email: "alex.morgan@northridge.example",
  phoneNumber: "(415) 555-0148",
  institutionalRole: "Technician",
  deviceClinic: "North Ridge Health System",
};

export const institutionalRoleOptions = [
  { label: "Technician", value: "Technician" },
  { label: "Doctor", value: "Doctor" },
  { label: "Admin", value: "Admin" },
  { label: "Nurse", value: "Nurse" },
];

