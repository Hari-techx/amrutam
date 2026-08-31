import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "../../../app/providers/AppProviders";
import { useAppDispatch } from "../../../store/hooks";
import { logoutRequest } from "../../../store/slices/authSlice";
import { FEATURE_FLAGS } from "../../../config/featureFlags";
export default function SettingsScreen() {
  const { theme, dark, toggleTheme } = useAppTheme();
  const dispatch = useAppDispatch();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Settings</Text>
      <Pressable
        onPress={toggleTheme}
        style={[
          styles.row,
          { backgroundColor: theme.surface, borderColor: theme.border },
        ]}
      >
        <Text style={{ color: theme.text }}>Dark mode</Text>
        <Text style={{ color: theme.primary, fontWeight: "700" }}>
          {dark ? "On" : "Off"}
        </Text>
      </Pressable>
      <View
        style={[
          styles.row,
          {
            backgroundColor: theme.surface,
            borderColor: theme.border,
          },
        ]}
      >
        <View style={styles.featureContent}>
          <Text style={[styles.featureTitle, { color: theme.text }]}>
            Feature flag
          </Text>

          <Text style={[styles.featureSubtitle, { color: theme.muted }]}>
            Enable/disable to show or hide Version
          </Text>
        </View>

        <Text style={[styles.featureStatus, { color: theme.primary }]}>
          {FEATURE_FLAGS.newCheckout ? "Enabled" : "Disabled"}
        </Text>
      </View>

      <Pressable
        onPress={() => dispatch(logoutRequest())}
        style={[styles.logout, { borderColor: theme.danger }]}
      >
        <Text style={{ color: theme.danger, fontWeight: "800" }}>Log out</Text>
      </Pressable>

      {FEATURE_FLAGS.newCheckout && (
        <Text style={[styles.version, { color: theme.text }]}>
          Version: 1.0.0
        </Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 18,
  },

  row: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  featureContent: {
    flex: 1,
  },

  featureTitle: {
    fontWeight: "600",
  },

  featureSubtitle: {
    fontSize: 12,
    marginTop: 4,
  },

  featureStatus: {
    fontWeight: "700",
    alignSelf: "center",
    marginLeft: 10,
  },

  logout: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },

  version: {
    marginTop: 15,
    textAlign: "center",
  },
});
