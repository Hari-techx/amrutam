import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useAppTheme } from "../../../app/providers/AppProviders";
export default function ForgotPasswordScreen() {
  const { theme } = useAppTheme();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Reset password</Text>
      <Text style={{ color: theme.muted, marginBottom: 20 }}>
        Enter your email and we'll send reset instructions.
      </Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
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
      <Pressable
        onPress={() => setSent(true)}
        style={[styles.button, { backgroundColor: theme.primary }]}
      >
        <Text style={styles.buttonText}>Send reset link</Text>
      </Pressable>
      {sent && (
        <Text style={{ color: theme.primary, marginTop: 14 }}>
          Reset instructions sent.
        </Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: { fontSize: 27, fontWeight: "800", marginBottom: 8 },
  input: {
    height: 52,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  button: {
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  buttonText: { color: "#fff", fontWeight: "800" },
});
