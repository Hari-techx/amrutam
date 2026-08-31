import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { loginRequest } from "../../../store/slices/authSlice";
import { AuthStackParamList } from "../../../navigation/types";
import { useAppTheme } from "../../../app/providers/AppProviders";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;
export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("demo@amrutam.app");
  const [password, setPassword] = useState("password");
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s) => s.auth);
  const { theme } = useAppTheme();
  const submit = () => dispatch(loginRequest({ email, password }));
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.brand, { color: theme.primary }]}>Amrutam</Text>
      <Text style={[styles.title, { color: theme.text }]}>Welcome back</Text>
      <TextInput
        accessible
        accessibilityLabel="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
        placeholderTextColor={String(theme.muted)}
        style={[
          styles.input,
          {
            color: theme.text,
            borderColor: theme.border,
            backgroundColor: theme.surface,
          },
        ]}
      />
      <TextInput
        accessible
        accessibilityLabel="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Password"
        placeholderTextColor={String(theme.muted)}
        style={[
          styles.input,
          {
            color: theme.text,
            borderColor: theme.border,
            backgroundColor: theme.surface,
          },
        ]}
      />
      {error && (
        <Text style={[styles.error, { color: theme.danger }]}>{error}</Text>
      )}
      <Pressable
        accessibilityRole="button"
        onPress={submit}
        disabled={loading}
        style={[styles.primary, { backgroundColor: theme.primary }]}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.primaryText}>Login</Text>
        )}
      </Pressable>
      <View style={styles.links}>
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text style={{ color: theme.primary }}>Create account</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={{ color: theme.primary }}>Forgot password?</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  brand: { fontSize: 34, fontWeight: "800", marginBottom: 8 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 24 },
  input: {
    height: 52,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  primary: {
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  primaryText: { color: "#fff", fontWeight: "700" },
  error: { marginBottom: 8 },
  links: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
