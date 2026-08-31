import { Doctor } from "../features/consultations/types/doctor";
import { Product } from "../features/shop/types/product";
import { HealthRecord } from "../features/health-records/types/record";
export type MainStackParamList = {
  HomeTabs: undefined;
  DoctorDetails: { doctor: Doctor };
  UpcomingConsultations: undefined;
  ProductDetails: { product: Product };
  Cart: undefined;
  Checkout: undefined;
  RecordDetails: { record: HealthRecord };
  Settings: undefined;
};
export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};
export type RootStackParamList = { Auth: undefined; Main: undefined };
