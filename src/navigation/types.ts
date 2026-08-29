import { Doctor } from '../features/consultations/types/doctor';

export type MainStackParamList = {
  Consultations: undefined;
  DoctorDetails: {
    doctor: Doctor;
  };
};