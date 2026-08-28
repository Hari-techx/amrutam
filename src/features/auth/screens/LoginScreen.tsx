import React from 'react';
import { View, Text,StyleSheet, Button } from 'react-native';
import { loginRequest } from '../../../store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

export default function LoginScreen() {
  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth);

  const handleLogin = () => {
dispatch(loginRequest()); 
 };

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>

      <Text>
        Logged In: {auth.isLoggedIn ? 'Yes' : 'No'}
      </Text>

      <Text>
        User: {auth.user}
      </Text>

      <Button
        title="Login"
        onPress={handleLogin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});