import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ConsultationScreen from '../features/consultations/screens/ConsultationScreen';
import DoctorDetailsScreen from '../features/consultations/screens/DoctorDetailsScreen';
import { MainStackParamList } from './types';

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Consultations"
        component={ConsultationScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="DoctorDetails"
        component={DoctorDetailsScreen}
        options={{
          title: 'Doctor Details',
        }}
      />
    </Stack.Navigator>
  );
}