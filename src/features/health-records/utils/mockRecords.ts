import { HealthRecord, RecordKind } from "../types/record";

const kinds: RecordKind[] = [
  "Lab Report",
  "Prescription",
  "Consultation",
  "Vaccination",
  "Allergy",
];

const tags = [
  ["blood", "routine"],
  ["medicine", "follow-up"],
  ["doctor", "consultation"],
  ["immunization", "preventive"],
  ["sensitivity", "important"],
];

/*
 * Generate the date once for each day.
 *
 * Your current implementation can only produce
 * 900 different dates anyway because of:
 *
 * i % 900
 *
 * So there is no need to repeatedly create Date
 * objects for every record.
 */
const dates = Array.from({ length: 900 }, (_, i) => {
  const d = new Date();

  d.setDate(d.getDate() - i);

  const date = d.toISOString().split("T")[0];

  return {
    date,
    month: date.slice(0, 7),
  };
});

/*
 * Generate 10,000 records.
 */
export const records: HealthRecord[] = Array.from({ length: 10000 }, (_, i) => {
  const kind = kinds[i % kinds.length];

  const dateInfo = dates[i % dates.length];

  const recordTags = tags[i % tags.length];

  return {
    id: `record-${i + 1}`,

    patientId: "patient-1",

    kind,

    title: `${kind} record ${i + 1}`,

    date: dateInfo.date,

    month: dateInfo.month,

    tags: recordTags,

    summary:
      `${kind} details for the patient. ` +
      `Review the attached document and clinician notes.`,

    attachment: {
      type: i % 3 === 0 ? "pdf" : "image",

      uri:
        i % 3 === 0
          ? "https://example.invalid/report.pdf"
          : `https://picsum.photos/seed/record-${i}/300/200`,
    },
  };
});
