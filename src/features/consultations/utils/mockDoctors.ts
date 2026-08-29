import { Doctor } from '../types/doctor';

const specializations = [
  'Ayurvedic Doctor',
  'General Physician',
  'Dermatologist',
  'Panchakarma Specialist',
  'Nutritionist',
];

export const doctors: Doctor[] = Array.from({ length: 5000 }, (_, index) => ({
  id: `doctor-${index + 1}`,
  name: `Dr. Doctor ${index + 1}`,
  specialization: specializations[index % specializations.length],
  experience: 3 + (index % 18),
  rating: Number((4 + ((index % 10) / 10)).toFixed(1)),
  consultationFee: 300 + ((index % 8) * 100),
  image: `https://i.pravatar.cc/150?img=${(index % 70) + 1}`,
}));