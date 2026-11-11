export interface ClinicItem {
  id: string;
  name: string;
  activeRecords: number;
  activeUsers: number;
  administrator: string;
  createdDate: string;
}

export interface ReportItem {
  id: string;
  patientName: string;
  dob: string;
  dateOfReport: string;
  userThatProcessed: string;
}

export const initialClinics: ClinicItem[] = [
  {
    id: "1",
    name: "North Ridge Cardiology",
    activeRecords: 14,
    activeUsers: 5,
    administrator: "Jordan Lee",
    createdDate: "01/12/2024",
  },
  {
    id: "2",
    name: "Harbor Heart Center",
    activeRecords: 9,
    activeUsers: 3,
    administrator: "Mina Patel",
    createdDate: "03/08/2024",
  },
  {
    id: "3",
    name: "Westfield Rhythm Clinic",
    activeRecords: 6,
    activeUsers: 8,
    administrator: "Chris Morgan",
    createdDate: "06/19/2024",
  },
  {
    id: "4",
    name: "Evergreen Cardiac Care",
    activeRecords: 11,
    activeUsers: 16,
    administrator: "Taylor Reed",
    createdDate: "09/02/2024",
  },
  {
    id: "5",
    name: "Summit Device Center",
    activeRecords: 4,
    activeUsers: 2,
    administrator: "Riley Chen",
    createdDate: "11/21/2024",
  },
  {
    id: "6",
    name: "Valley Heart Specialists",
    activeRecords: 8,
    activeUsers: 4,
    administrator: "Sarah Davis",
    createdDate: "12/04/2024",
  },
  {
    id: "7",
    name: "Metro Device Clinic",
    activeRecords: 12,
    activeUsers: 7,
    administrator: "Alex Morgan",
    createdDate: "01/15/2025",
  },
];

export const sampleProcessedReports: ReportItem[] = [
  {
    id: "1",
    patientName: "Murphy, Kathryn",
    dob: "04/19/1958",
    dateOfReport: "06/18/2025",
    userThatProcessed: "Jordan Lee",
  },
  {
    id: "2",
    patientName: "Cooper, Daniel",
    dob: "09/22/1949",
    dateOfReport: "06/16/2025",
    userThatProcessed: "Andrew Cole",
  },
  {
    id: "3",
    patientName: "Martinez, Elena",
    dob: "07/29/1967",
    dateOfReport: "06/12/2025",
    userThatProcessed: "Jordan Lee",
  },
  {
    id: "4",
    patientName: "Wilson, James",
    dob: "10/08/1951",
    dateOfReport: "06/08/2025",
    userThatProcessed: "Andrew Cole",
  },
  {
    id: "5",
    patientName: "Bennett, Olivia",
    dob: "06/26/1999",
    dateOfReport: "06/02/2025",
    userThatProcessed: "Alex Morgan",
  },
  {
    id: "6",
    patientName: "Smith, Robert",
    dob: "03/14/1962",
    dateOfReport: "05/28/2025",
    userThatProcessed: "Jordan Lee",
  },
  {
    id: "7",
    patientName: "Davis, Emily",
    dob: "11/05/1975",
    dateOfReport: "05/20/2025",
    userThatProcessed: "Andrew Cole",
  },
];

export const adminOptions = [
  { label: "Unassigned", value: "unassigned" },
  { label: "Jordan Lee", value: "Jordan Lee" },
  { label: "Mina Patel", value: "Mina Patel" },
  { label: "Chris Morgan", value: "Chris Morgan" },
  { label: "Taylor Reed", value: "Taylor Reed" },
  { label: "Riley Chen", value: "Riley Chen" },
  { label: "Sam Lawson", value: "Sam Lawson" },
];
