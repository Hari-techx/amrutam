import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export function Toast({
  message,
  onDismiss,
}: {
  message: string | null;
  onDismiss: () => void;
}) {
  useEffect(() => {
    if (!message) return undefined;
    const timer = setTimeout(onDismiss, 2500);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);
  if (!message) return null;
  return (
    <View accessible accessibilityRole="alert" style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 24,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#172018",
  },
  text: { color: "#fff", textAlign: "center", fontWeight: "600" },
});
