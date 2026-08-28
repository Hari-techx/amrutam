import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../features/auth/screens/LoginScreen';
import SignUpScreen from '../features/auth/screens/SignUpScreen';
import ForgotPasswordScreen from '../features/auth/screens/ForgotPasswordScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Signup"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
      name="ForgotPassword"
      component={ForgotPasswordScreen}
      options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}