export type VerificationPriority = "Low" | "Medium" | "High";
export type VerificationDocumentType = "Clinic" | "Remote";
export type VerificationStatus = "Finalized";

export interface VerificationItem {
  id: string;
  priority: VerificationPriority;
  patientName: string;
  patientInitials: string;
  dateOfBirth: string;
  documentType: VerificationDocumentType;
  dateOfReport: string;
  status: VerificationStatus;
}

export const sampleVerifications: VerificationItem[] = [
  {
    id: "1",
    priority: "Medium",
    patientName: "Olivia Bennit",
    patientInitials: "OB",
    dateOfBirth: "10/15/2025",
    documentType: "Clinic",
    dateOfReport: "06/18/2025",
    status: "Finalized",
  },
  {
    id: "2",
    priority: "High",
    patientName: "Daniel Cooper",
    patientInitials: "DC",
    dateOfBirth: "09/22/1949",
    documentType: "Clinic",
    dateOfReport: "06/18/2025",
    status: "Finalized",
  },
  {
    id: "3",
    priority: "Medium",
    patientName: "Maya Thompson",
    patientInitials: "MT",
    dateOfBirth: "12/03/1962",
    documentType: "Remote",
    dateOfReport: "06/17/2025",
    status: "Finalized",
  },
  {
    id: "4",
    priority: "Low",
    patientName: "Robert Ellis",
    patientInitials: "RE",
    dateOfBirth: "02/11/1956",
    documentType: "Clinic",
    dateOfReport: "06/16/2025",
    status: "Finalized",
  },
  {
    id: "5",
    priority: "Medium",
    patientName: "Elena Martinez",
    patientInitials: "EM",
    dateOfBirth: "07/29/1967",
    documentType: "Remote",
    dateOfReport: "06/15/2025",
    status: "Finalized",
  },
  {
    id: "6",
    priority: "Low",
    patientName: "James Wilson",
    patientInitials: "JW",
    dateOfBirth: "10/08/1951",
    documentType: "Clinic",
    dateOfReport: "06/08/2025",
    status: "Finalized",
  },
  {
    id: "7",
    priority: "High",
    patientName: "Sarah Jenkins",
    patientInitials: "SJ",
    dateOfBirth: "04/19/1958",
    documentType: "Remote",
    dateOfReport: "06/05/2025",
    status: "Finalized",
  },
];

