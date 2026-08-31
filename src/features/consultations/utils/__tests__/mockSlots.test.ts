import { generateDoctorSlots } from "../mockSlots";
test("generates stable slots for a doctor and date", () => {
  const slots = generateDoctorSlots("doctor-1", "2026-08-30");
  expect(slots).toHaveLength(12);
  expect(slots[0].doctorId).toBe("doctor-1");
  expect(slots[2].isBooked).toBe(true);
});
