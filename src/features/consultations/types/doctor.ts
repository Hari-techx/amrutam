export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  consultationFee: number;
  image: string;
}

export interface DoctorCardProps {
  doctor: Doctor;
  onPress: (doctor: Doctor) => void;
}
