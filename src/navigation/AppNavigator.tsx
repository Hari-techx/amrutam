import React, { useEffect } from "react";
import { Linking } from "react-native";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { hydrateRequest } from "../store/slices/authSlice";
const linking: LinkingOptions<any> = {
  prefixes: ["amrutam://", "https://amrutam.app"],
  config: {
    screens: {
      HomeTabs: {
        screens: {
          Consultations: "consultations",
          Shop: "shop",
          Records: "records",
          Settings: "settings",
        },
      },
      DoctorDetails: "doctor/:id",
      ProductDetails: "product/:id",
      Cart: "cart",
      Checkout: "checkout",
      UpcomingConsultations: "upcoming",
      RecordDetails: "record/:id",
    },
  },
};

export default function AppNavigator() {
  const dispatch = useAppDispatch();
  const { hydrated, isLoggedIn } = useAppSelector((s) => s.auth);
  useEffect(() => {
    dispatch(hydrateRequest());
  }, [dispatch]);
  useEffect(() => {
    const sub = Linking.addEventListener("url", () => {});
    return () => sub.remove();
  }, []);
  if (!hydrated) return null;
  return (
    <NavigationContainer linking={linking}>
      {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
