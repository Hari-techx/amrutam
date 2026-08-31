import { Doctor } from "./doctor";
import { DoctorSlot } from "./slot";
export interface Booking {
  id: string;
  doctor: Doctor;
  slot: DoctorSlot;
  status: "upcoming" | "cancelled";
  createdAt: string;
}
