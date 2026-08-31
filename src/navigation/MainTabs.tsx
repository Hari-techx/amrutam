import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ConsultationScreen from "../features/consultations/screens/ConsultationScreen";
import ShopScreen from "../features/shop/screens/ShopScreen";
import HealthRecordsScreen from "../features/health-records/screens/HealthRecordsScreen";
import SettingsScreen from "../features/auth/screens/SettingsScreen";
const Tab = createBottomTabNavigator();
export default function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Consultations"
        component={ConsultationScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="medkit-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Records"
        component={HealthRecordsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
