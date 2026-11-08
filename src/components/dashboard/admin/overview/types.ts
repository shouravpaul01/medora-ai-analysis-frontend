export interface UserItem {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: "Admin" | "Doctor";
  deviceClinic: string;
}

export const sampleUsers: UserItem[] = [
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

