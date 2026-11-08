export interface AdminUserItem {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: "Admin" | "Doctor" | "Technician";
  deviceClinic: string;
}

export const initialAdminUsers: AdminUserItem[] = [
  {
    id: "1",
    name: "Jordan Lee",
    initials: "JL",
    email: "jordan.lee@example.com",
    role: "Admin",
    deviceClinic: "North Ridge Cardiology",
  },
  {
    id: "2",
    name: "Kathryn Murphy",
    initials: "KM",
    email: "kathryn.murphy@example.com",
    role: "Doctor",
    deviceClinic: "Harbor Heart Center",
  },
  {
    id: "3",
    name: "Mina Patel",
    initials: "MP",
    email: "mina.patel@example.com",
    role: "Admin",
    deviceClinic: "Harbor Heart Center",
  },
  {
    id: "4",
    name: "Andrew Cole",
    initials: "AC",
    email: "andrew.cole@example.com",
    role: "Doctor",
    deviceClinic: "North Ridge Cardiology",
  },
  {
    id: "5",
    name: "Taylor Reed",
    initials: "TR",
    email: "taylor.reed@example.com",
    role: "Admin",
    deviceClinic: "Evergreen Cardiac Care",
  },
  {
    id: "6",
    name: "Sarah Davis",
    initials: "SD",
    email: "sarah.davis@example.com",
    role: "Doctor",
    deviceClinic: "Evergreen Cardiac Care",
  },
  {
    id: "7",
    name: "Michael Jackson",
    initials: "MJ",
    email: "michael.j@example.com",
    role: "Doctor",
    deviceClinic: "North Ridge Cardiology",
  },
];

export const clinicOptions = [
  { label: "Unassigned", value: "unassigned" },
  { label: "North Ridge Cardiology", value: "North Ridge Cardiology" },
  { label: "Harbor Heart Center", value: "Harbor Heart Center" },
  { label: "Evergreen Cardiac Care", value: "Evergreen Cardiac Care" },
  { label: "Westfield Rhythm Clinic", value: "Westfield Rhythm Clinic" },
  { label: "Summit Device Center", value: "Summit Device Center" },
];

export const roleOptions = [
  { label: "Admin", value: "Admin" },
  { label: "Doctor", value: "Doctor" },
  { label: "Technician", value: "Technician" },
];

