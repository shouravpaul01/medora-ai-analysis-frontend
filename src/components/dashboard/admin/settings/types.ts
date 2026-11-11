export interface AdminProfileData {
  firstName: string;
  lastName: string;
  email: string;
  accountRole: string;
}

export const initialAdminProfile: AdminProfileData = {
  firstName: "Sam",
  lastName: "Lawson",
  email: "alex.morgan@northridge.example",
  accountRole: "Super User",
};

