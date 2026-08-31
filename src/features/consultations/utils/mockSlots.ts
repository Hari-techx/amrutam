import { DoctorSlot } from "../types/slot";

const times: [string, string][] = [
  ["09:00 AM", "09:30 AM"],
  ["09:30 AM", "10:00 AM"],
  ["10:00 AM", "10:30 AM"],
  ["10:30 AM", "11:00 AM"],
  ["11:00 AM", "11:30 AM"],
  ["11:30 AM", "12:00 PM"],
  ["02:00 PM", "02:30 PM"],
  ["02:30 PM", "03:00 PM"],
  ["03:00 PM", "03:30 PM"],
  ["03:30 PM", "04:00 PM"],
  ["04:00 PM", "04:30 PM"],
  ["04:30 PM", "05:00 PM"],
];

export const generateDoctorSlots = (
  doctorId: string,
  date: string,
): DoctorSlot[] =>
  times.map(([startTime, endTime], index) => ({
    id: `${doctorId}-${date}-${index}`,
    doctorId,
    date,
    startTime,
    endTime,
    isBooked: index === 2 || index === 7,
  }));
