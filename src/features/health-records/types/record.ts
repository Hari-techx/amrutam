export type RecordKind =
  "Lab Report" | "Prescription" | "Consultation" | "Vaccination" | "Allergy";
export interface HealthRecord {
  id: string;
  patientId: string;
  kind: RecordKind;
  title: string;
  date: string;
  month: string;
  tags: string[];
  summary: string;
  attachment?: { type: "image" | "pdf"; uri: string };
}
