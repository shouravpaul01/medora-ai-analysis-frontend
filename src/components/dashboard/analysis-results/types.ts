export interface ReviewData {
  patientName: string;
  patientInitials: string;
  dateOfBirth: string;
  documentType: "clinic" | "remote";
  file: File | null;
}

export type ReviewPriority = "High" | "Medium" | "Low";

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

