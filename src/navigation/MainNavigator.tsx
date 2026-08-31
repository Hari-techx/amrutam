import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabs from "./MainTabs";
import DoctorDetailsScreen from "../features/consultations/screens/DoctorDetailsScreen";
import UpcomingConsultationsScreen from "../features/consultations/screens/UpcomingConsultationsScreen";
import ProductDetailsScreen from "../features/shop/screens/ProductDetailsScreen";
import CartScreen from "../features/shop/screens/CartScreen";
import CheckoutScreen from "../features/shop/screens/CheckoutScreen";
import SettingsScreen from "../features/auth/screens/SettingsScreen";
import RecordDetailsScreen from "../features/health-records/screens/RecordDetailsScreen";
import { MainStackParamList } from "./types";
const Stack = createNativeStackNavigator<MainStackParamList>();
export default function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DoctorDetails"
        component={DoctorDetailsScreen}
        options={{ title: "Doctor Details" }}
      />
      <Stack.Screen
        name="UpcomingConsultations"
        component={UpcomingConsultationsScreen}
        options={{ title: "Upcoming Consultations" }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ title: "Product Details" }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: "Cart" }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ title: "Checkout" }}
      />
      <Stack.Screen
        name="RecordDetails"
        component={RecordDetailsScreen}
        options={{ title: "Health Record" }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
    </Stack.Navigator>
  );
}
