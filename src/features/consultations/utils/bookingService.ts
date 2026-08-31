import { Booking } from "../types/booking";
import { DoctorSlot } from "../types/slot";
import { Doctor } from "../types/doctor";
import { storage } from "../../../services/storage/storage";
import { enqueueMutation } from "../../../services/sync/syncQueue";

const KEY = "@amrutam/bookings";
const getBookings = () => storage.get<Booking[]>(KEY, []);
const parseSlot = (slot: DoctorSlot) => {
  const date = new Date(`${slot.date}T${to24(slot.startTime)}:00`);
  return date;
};
function to24(time: string) {
  const [hm, ampm] = time.split(" ");
  let [h, m] = hm.split(":").map(Number);
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
export async function createBooking(doctor: Doctor, slot: DoctorSlot) {
  const now = new Date();
  const slotTime = parseSlot(slot);
  if (slotTime <= now)
    throw new Error("This slot has expired. Please choose another slot.");
  const bookings = await getBookings();
  const duplicate = bookings.find(
    (b) => b.status === "upcoming" && b.slot.id === slot.id,
  );
  if (duplicate)
    throw new Error("This slot was just booked by another request.");
  const conflict = bookings.find(
    (b) =>
      b.status === "upcoming" &&
      b.doctor.id === doctor.id &&
      b.slot.date === slot.date &&
      b.slot.startTime === slot.startTime,
  );
  if (conflict) throw new Error("You already have a booking for this time.");
  const booking: Booking = {
    id: `booking-${Date.now()}`,
    doctor,
    slot,
    status: "upcoming",
    createdAt: new Date().toISOString(),
  };
  await storage.set(KEY, [...bookings, booking]);
  await enqueueMutation({
    id: booking.id,
    type: "BOOK_SLOT",
    payload: booking,
    createdAt: booking.createdAt,
  });
  return booking;
}
export async function listUpcoming() {
  const b = await getBookings();
  return b.filter((x) => x.status === "upcoming");
}
export async function cancelBooking(id: string) {
  const b = await getBookings();
  const next = b.map((x) =>
    x.id === id ? { ...x, status: "cancelled" as const } : x,
  );
  await storage.set(KEY, next);
  await enqueueMutation({
    id: `cancel-${id}-${Date.now()}`,
    type: "BOOK_SLOT",
    payload: { bookingId: id, action: "cancel" },
    createdAt: new Date().toISOString(),
  });
}
